import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { exit } from "node:process"

const tracked = execFileSync("git", ["ls-files", "-z"], {
  encoding: "utf8",
})
  .split("\0")
  .filter(Boolean)

const forbiddenPaths = tracked.filter((file) => {
  if (file === ".env.example") return false
  return (
    /(^|\/)\.env(?:\.|$)/.test(file) ||
    /(^|\/)backups?\//i.test(file) ||
    /(^|\/)public\/uploads\//i.test(file) ||
    /(^|\/)\.claude\/worktrees\//i.test(file) ||
    /\.(?:db|sqlite|sqlite3)(?:\.|$)/i.test(file) ||
    /\.backup$/i.test(file) ||
    /\.tsbuildinfo$/i.test(file) ||
    /\.new$/i.test(file)
  )
})

if (forbiddenPaths.length > 0) {
  console.error("Sensitive or generated files are tracked:")
  forbiddenPaths.forEach((file) => console.error(`- ${file}`))
  exit(1)
}

const secretPatterns = [
  "sk_live_[A-Za-z0-9]",
  "rk_live_[A-Za-z0-9]",
  "sk-proj-[A-Za-z0-9]",
]

for (const pattern of secretPatterns) {
  try {
    const matches = execFileSync(
      "git",
      ["grep", "-I", "-l", "-E", pattern, "--", ":!scripts/check-sensitive-files.mjs"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    ).trim()

    if (matches) {
      console.error("A tracked file matches a production credential pattern:")
      matches.split("\n").forEach((file) => console.error(`- ${file}`))
      exit(1)
    }
  } catch (error) {
    if (error?.status !== 1) throw error
  }
}

const placeholderPassword = /^(password|postgres|example|changeme|replace_me|your[_-].*|x+)$/i
const databaseUrl = /postgres(?:ql)?:\/\/([^:\s]+):([^@\s]+)@/g
const databaseCredentialFiles = []

for (const file of tracked) {
  let content
  try {
    content = readFileSync(file, "utf8")
  } catch {
    continue
  }

  for (const match of content.matchAll(databaseUrl)) {
    let password = match[2]
    try {
      password = decodeURIComponent(password)
    } catch {}
    if (!placeholderPassword.test(password) && !password.startsWith("${")) {
      databaseCredentialFiles.push(file)
      break
    }
  }
}

if (databaseCredentialFiles.length > 0) {
  console.error("A tracked file appears to contain a database credential:")
  databaseCredentialFiles.forEach((file) => console.error(`- ${file}`))
  exit(1)
}

console.log("Sensitive-file check passed.")
