const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');
const { PGlite } = require('@electric-sql/pglite');
const folders = fs.readdirSync('prisma/migrations').filter(n => /^\d/.test(n)).sort();
const migrations = folders.map(n => fs.readFileSync(`prisma/migrations/${n}/migration.sql`, 'utf8'));
async function shape(db) {
  const columns = await db.query(`SELECT table_name,column_name,data_type,is_nullable,column_default FROM information_schema.columns WHERE table_schema='public' ORDER BY table_name,column_name`);
  const constraints = await db.query(`SELECT c.relname AS table_name, con.conname, pg_get_constraintdef(con.oid) AS definition FROM pg_constraint con JOIN pg_class c ON c.oid=con.conrelid JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='public' ORDER BY c.relname,con.conname`);
  const indexes = await db.query(`SELECT tablename,indexname,indexdef FROM pg_indexes WHERE schemaname='public' ORDER BY tablename,indexname`);
  return { columns: columns.rows, constraints: constraints.rows, indexes: indexes.rows };
}
const fixture = `INSERT INTO "User" (id,name,email,password,"updatedAt") VALUES ('fixture-user','Synthetic','fixture@example.invalid','!disabled',now());
INSERT INTO "Document" (id,title,type,status,content,"userId","updatedAt") VALUES ('legacy-doc','Synthetic signed contract','nda','signed','Original immutable evidence','fixture-user',now());
INSERT INTO "DocumentSignature" (id,"documentId","userId",signature) VALUES ('legacy-signature','legacy-doc','fixture-user','Synthetic evidence only');
INSERT INTO "UserDocument" (id,title,type,content,"userId","updatedAt") VALUES ('current-doc','Synthetic draft','nda','Preserve current content','fixture-user',now());`;

test('fresh migration chain matches every target column, constraint and index without dropping legacy evidence', { timeout: 120000 }, async () => {
  const actual = new PGlite(); const expected = new PGlite();
  try {
    for (const sql of migrations) await actual.exec(sql);
    const targetSql = execFileSync(process.execPath, ['node_modules/prisma/build/index.js','migrate','diff','--from-empty','--to-schema-datamodel','prisma/schema.prisma','--script'], { encoding: 'utf8', env: { ...process.env, DATABASE_URL: 'postgresql://build:example@127.0.0.1:5432/legal_test' } });
    await expected.exec(targetSql);
    assert.deepEqual(await shape(actual), await shape(expected));
    const tables = (await actual.query("SELECT tablename FROM pg_tables WHERE schemaname='public'")).rows.map(r => r.tablename);
    for (const table of ['BlogPost','IngestSchedule','LawyerListing','Notification','Team','TeamInvitation','TeamMember','VerifiedFact','Document','DocumentSignature']) assert.ok(tables.includes(table), table);
  } finally { await actual.close(); await expected.close(); }
});

test('populated legacy upgrade preserves data and a snapshot restores to the same schema and records', { timeout: 120000 }, async () => {
  const db = new PGlite(); let restored;
  try {
    await db.exec(migrations[0]); await db.exec(fixture);
    for (const sql of migrations.slice(1)) await db.exec(sql);
    assert.equal((await db.query('SELECT content FROM "Document" WHERE id=\'legacy-doc\'')).rows[0].content, 'Original immutable evidence');
    assert.equal((await db.query('SELECT "jwtVersion" FROM "User"')).rows[0].jwtVersion, 0);
    assert.equal((await db.query('SELECT count(*)::int AS n FROM "DocumentSignature"')).rows[0].n, 1);
    const backup = await db.dumpDataDir();
    restored = new PGlite({ loadDataDir: backup });
    assert.deepEqual(await shape(restored), await shape(db));
    for (const table of ['User','Document','DocumentSignature','UserDocument']) assert.deepEqual((await restored.query(`SELECT * FROM "${table}" ORDER BY id`)).rows, (await db.query(`SELECT * FROM "${table}" ORDER BY id`)).rows);
    await assert.rejects(restored.exec(migrations.at(-1)), e => ["42P07", "42704", "42701"].includes(e.code)); // Deliberately fails on unreviewed pre-existing schema; never hides drift with IF NOT EXISTS.
  } finally { await db.close(); if (restored) await restored.close(); }
});


test('delivery migration preserves existing queued fulfillment jobs and backfills unique keys', async () => {
 const db = new PGlite();
 try {
  const deliveryIndex = migrations.findIndex(sql => sql.includes('ADD COLUMN     "dedupeKey"') || sql.includes('ADD COLUMN "dedupeKey"'));
  assert.ok(deliveryIndex > 0);
  for (const sql of migrations.slice(0, deliveryIndex)) await db.exec(sql);
  await db.exec(`INSERT INTO "DeliveryOutbox" (id,"orderId",kind) VALUES ('job-fixture','order-fixture','document_ready')`);
  await db.exec(migrations[deliveryIndex]);
  const row = (await db.query(`SELECT "dedupeKey",status,attempts FROM "DeliveryOutbox" WHERE id='job-fixture'`)).rows[0];
  assert.deepEqual(row,{dedupeKey:'fulfillment:order-fixture',status:'pending',attempts:0});
 } finally { await db.close(); }
});
