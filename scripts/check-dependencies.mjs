import { spawnSync } from 'node:child_process'
import { readFileSync, mkdirSync, writeFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
const exceptions = JSON.parse(readFileSync('docs/launch/dependency-exceptions.json', 'utf8'))
const result = spawnSync('pnpm', ['audit', '--json'], { encoding: 'utf8' })
const start = result.stdout.indexOf('{\n')
if (start < 0 || ![0, 1].includes(result.status)) throw new Error('Dependency audit unavailable; refusing to pass')
const audit = JSON.parse(result.stdout.slice(start))
if (!audit.metadata?.vulnerabilities || !audit.advisories) throw new Error('Unexpected audit response')
mkdirSync('test-results', { recursive: true })
writeFileSync('test-results/dependency-audit.json', JSON.stringify(audit, null, 2))
const now = new Date().toISOString().slice(0, 10)
if (exceptions.some(e => now >= e.expires)) throw new Error('Dependency exception expired; repeat reachability review')
function walk(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]) }
for (const file of [...walk('app'), ...walk('lib')].filter(f => /\.[jt]sx?$/.test(f))) {
  const source = readFileSync(file, 'utf8')
  if (/next-auth\/providers\/email|from ["'](?:nodemailer|mailparser|braces|micromatch|fast-glob)["']|require\(["'](?:nodemailer|mailparser|braces|micromatch|fast-glob)["']|\.emails\.receiving/.test(source)) throw new Error(`Exception reachability changed: ${file}`)
}
const unresolved = Object.values(audit.advisories).filter(a => ['high', 'critical'].includes(a.severity) && !exceptions.some(e => e.id === a.github_advisory_id && e.package === a.module_name))
if (unresolved.length) throw new Error(`Unreviewed high/critical advisories: ${unresolved.map(a => a.github_advisory_id).join(', ')}`)
console.log(`Dependency gate passed with ${exceptions.length} explicitly expiring advisory exceptions; full audit retained.`)
