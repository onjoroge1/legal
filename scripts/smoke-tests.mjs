import { createRequire } from 'node:module'
import { mkdirSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
const require = createRequire(import.meta.url)
const { load } = require('../tests/route-loader.cjs')
const { documentCatalog } = load('lib/document-catalog.ts')
const base = new URL(process.env.BASE_URL || 'http://127.0.0.1:3000')
if (!['localhost', '127.0.0.1'].includes(base.hostname)) throw new Error('Fixture smoke tests are local-only; do not send fixture requests to production.')
const { createLegalDisclaimerAcceptanceToken } = load('lib/legal-disclaimer-server.ts')
const { LEGAL_DISCLAIMER_COOKIE } = load('lib/legal-disclaimer.ts')
// Synthetic local fixture only; never records acceptance for a real person.
const cookie = `${LEGAL_DISCLAIMER_COOKIE}=${createLegalDisclaimerAcceptanceToken()}`
const results = []
async function check(path, expected, method = 'GET', body) {
  const response = await fetch(new URL(path, base), { method, redirect: 'manual', signal: AbortSignal.timeout(30000), ...(body && { headers: { 'content-type': 'application/json', cookie }, body: JSON.stringify(body) }) })
  results.push({ path, method, status: response.status, expected })
  if (!expected.includes(response.status)) throw new Error(`${method} ${path}: got ${response.status}; expected ${expected}`)
}
try {
  for (const path of ['/', '/documents', '/login', '/signup', '/privacy', '/terms', '/sitemap.xml', '/robots.txt']) await check(path, [200])
  for (const doc of documentCatalog) await check(`/documents/${doc.category}/${doc.slug}`, [200])
  await check('/documents/nda', [301, 308])
  await check('/dashboard', [302, 307])
  await check('/api/checkout/complete', [410], 'POST', { paymentType: 'professional', email: 'fixture@example.invalid' })
  await check('/api/payment/create-checkout', [503], 'POST', {})
  await check('/api/documents/business/non-disclosure-agreement/generate', [503], 'POST', {})
  await check('/api/documents/business/non-disclosure-agreement/chat', [503], 'POST', {})
  await check('/api/webhooks/stripe', [400], 'POST', {})
  await check('/audit-route-that-does-not-exist', [404])
  console.log(`Smoke checks passed: ${results.length}`)
} finally {
  mkdirSync('test-results', { recursive: true })
  writeFileSync('test-results/smoke.json', JSON.stringify({ sha: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), results }, null, 2))
}
