import { ESLint } from "eslint"

// Temporary ceilings for inherited warnings. A focused cleanup PR should
// lower these values whenever it removes debt; new warning categories fail.
const warningLimits = Object.freeze({
  "@next/next/no-img-element": 3,
  "@typescript-eslint/no-explicit-any": 81,
  "@typescript-eslint/no-require-imports": 45,
  "@typescript-eslint/no-unused-vars": 105,
  "react-hooks/exhaustive-deps": 12,
  "react-hooks/immutability": 7,
  "react-hooks/refs": 2,
  "react-hooks/set-state-in-effect": 16,
  "react-hooks/static-components": 2,
  "react/no-unescaped-entities": 20,
})

const results = await new ESLint().lintFiles(["."])
const warningCounts = new Map()
const errors = []

for (const result of results) {
  for (const message of result.messages) {
    const rule = message.ruleId ?? "fatal"
    if (message.severity === 2) {
      errors.push(
        `${result.filePath}:${message.line}:${message.column} ${rule} ${message.message}`
      )
      continue
    }

    warningCounts.set(rule, (warningCounts.get(rule) ?? 0) + 1)
  }
}

const exceededWarnings = [...warningCounts]
  .filter(([rule, count]) => count > (warningLimits[rule] ?? 0))
  .map(
    ([rule, count]) =>
      `${rule}: ${count} warning(s), allowed ${warningLimits[rule] ?? 0}`
  )

if (errors.length > 0 || exceededWarnings.length > 0) {
  if (errors.length > 0) {
    console.error(`ESLint found ${errors.length} blocking error(s):`)
    console.error(errors.join("\n"))
  }
  if (exceededWarnings.length > 0) {
    console.error("ESLint warning baseline increased:")
    console.error(exceededWarnings.join("\n"))
  }
  process.exit(1)
}

const warningTotal = [...warningCounts.values()].reduce(
  (total, count) => total + count,
  0
)

console.log(
  `ESLint baseline passed: 0 errors, ${warningTotal} ratcheted warning(s) across ${warningCounts.size} rule(s).`
)
