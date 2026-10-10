import { spawnSync } from 'node:child_process'
// Metadata-only comparison. Never applies SQL or resolves migration history.
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required from the authorized environment')
const result = spawnSync(process.execPath, ['node_modules/prisma/build/index.js', 'migrate', 'diff', '--from-schema-datasource', 'prisma/schema.prisma', '--to-schema-datamodel', 'prisma/schema.prisma', '--exit-code'], { encoding: 'utf8', env: process.env })
if (result.status === 0) console.log('Database schema matches checked-in Prisma schema.')
else {
  // Do not print connection errors/URLs; inspect privately in the authorized environment.
  console.error(result.status === 2 ? 'Schema drift detected. Stop deployment and review a private schema-only diff.' : 'Could not inspect schema. Check authorized connection and Prisma status privately.')
  process.exit(1)
}
