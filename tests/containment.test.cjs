const { test } = require('node:test');
const assert = require('node:assert/strict');
const { load } = require('./route-loader.cjs');

test('flags fail closed in production, preview, test and development', () => {
  const flags = load('lib/feature-flags.ts');
  const feature = 'ENABLE_DOCUMENT_MUTATIONS';
  for (const environment of ['production', 'development', 'test']) {
    process.env.NODE_ENV = environment;
    for (const value of [undefined, '', 'false', 'TRUE', '1']) {
      if (value === undefined) delete process.env[feature];
      else process.env[feature] = value;
      assert.equal(flags.isEmergencyFeatureEnabled(feature), false);
    }
    process.env[feature] = 'true';
    assert.equal(flags.isEmergencyFeatureEnabled(feature), true);
  }
  delete process.env[feature];
});

test('legacy completion cannot grant access, including malformed requests', async () => {
  const route = load('app/api/checkout/complete/route.ts');
  for (const body of ['{}', '{"paymentType":"professional","email":"fixture@example.invalid"}', 'not json']) {
    const response = await route.POST(new Request('http://localhost/api/checkout/complete', { method: 'POST', body }));
    assert.equal(response.status, 410);
  }
});

const mocks = {
  'next-auth': { getServerSession: async () => { throw new Error('must not reach auth'); } },
  '@/lib/auth': { authOptions: {} },
  '@/lib/prisma': { prisma: new Proxy({}, { get() { throw new Error('must not access database'); } }) },
  '@/lib/legal-disclaimer-server': { requireLegalDisclaimerAcceptance() { throw new Error('must not parse request'); } },
};
for (const [path, method] of [
  ['app/api/documents/route.ts', 'POST'],
  ['app/api/documents/draft/route.ts', 'POST'],
  ['app/api/documents/by-id/[id]/route.ts', 'PATCH'],
]) {
  test(`${method} ${path} freezes writes before auth, input or database access`, async () => {
    delete process.env.ENABLE_DOCUMENT_MUTATIONS;
    const route = load(path, mocks);
    const response = await route[method](new Request('http://localhost/api/documents', { method, body: 'invalid JSON' }), { params: Promise.resolve({ id: 'signed-fixture' }) });
    assert.equal(response.status, 503);
    assert.equal((await response.json()).code, 'FEATURE_TEMPORARILY_DISABLED');
    assert.equal(typeof route.GET, 'function');
  });
}

test('Stripe intake stays outside payment feature gate and still verifies signatures', () => {
  const fs = require('node:fs');
  const source = fs.readFileSync('app/api/webhooks/stripe/route.ts', 'utf8');
  assert.doesNotMatch(source, /requireEmergencyFeature/);
  assert.match(source, /constructEvent/);
});
