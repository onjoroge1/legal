import { spawn } from 'node:child_process'
const server = spawn('pnpm', ['exec', 'next', 'start', '--hostname', '127.0.0.1'], { stdio: ['ignore', 'inherit', 'inherit'], env: process.env })
let exited = false
server.on('exit', () => { exited = true })
try {
  let ready = false
  for (let i = 0; i < 90 && !exited; i++) {
    try { ready = (await fetch('http://127.0.0.1:3000', { signal: AbortSignal.timeout(1000) })).ok } catch {}
    if (ready) break
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  if (!ready) throw new Error('Production server failed to become ready')
  for (const script of ['scripts/smoke-tests.mjs', 'scripts/check-seo-rendered.mjs']) {
    const child = spawn(process.execPath, [script], { stdio: 'inherit', env: process.env })
    const code = await new Promise(resolve => child.on('exit', resolve))
    if (code !== 0) process.exitCode = 1
  }
} finally { server.kill('SIGTERM') }
