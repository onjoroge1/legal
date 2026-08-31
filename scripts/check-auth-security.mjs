import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"

const root = process.cwd()
const read = (path) => readFileSync(resolve(root, path), "utf8")
const failures = []
const requireText = (path, pattern, message) => {
  if (!pattern.test(read(path))) failures.push(`${path}: ${message}`)
}
const forbidText = (path, pattern, message) => {
  if (pattern.test(read(path))) failures.push(`${path}: ${message}`)
}

for (const path of [
  "app/api/auth/check-email/route.ts",
  "app/api/settings/2fa/setup/route.ts",
  "app/api/settings/2fa/verify/route.ts",
  "app/api/settings/2fa/disable/route.ts",
]) {
  if (existsSync(resolve(root, path))) failures.push(`${path}: insecure or unenforced endpoint must remain removed`)
}

requireText("lib/auth.ts", /randomUUID\(\)/, "each login must receive a unique session identifier")
requireText("lib/auth.ts", /hasActiveSession/, "JWT validation must enforce per-session revocation")
requireText("proxy.ts", /token\.revoked\s*!==\s*true/, "middleware must reject revoked JWTs")
forbidText("lib/auth.ts", /\brequire\s*\(/, "authentication dependencies must not use runtime fallbacks")
requireText("app/api/auth/reset-password/route.ts", /jwtVersion:\s*\{\s*increment:\s*1\s*\}/, "password resets must invalidate existing JWTs")
requireText("app/api/auth/reset-password/route.ts", /activeSessions:\s*"\[\]"/, "password resets must clear tracked sessions")
forbidText("app/api/settings/route.ts", /twoFactorEnabled|twoFactorSecret/, "general settings must not mutate security controls")
forbidText("app/api/settings/route.ts", /mock|database not configured/i, "settings must fail closed when persistence is unavailable")

if (failures.length) {
  console.error("Authentication security contract failed:\n" + failures.map((item) => `- ${item}`).join("\n"))
  process.exit(1)
}

console.log("Authentication security contract passed")
