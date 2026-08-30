import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTypeScript from "eslint-config-next/typescript"

const reactDebtRules = {
  "react/no-unescaped-entities": "warn",
  "react-hooks/immutability": "warn",
  "react-hooks/refs": "warn",
  "react-hooks/set-state-in-effect": "warn",
  "react-hooks/static-components": "warn",
}

const typeScriptDebtRules = {
  "@typescript-eslint/no-explicit-any": "warn",
  "@typescript-eslint/no-require-imports": "warn",
}

export default defineConfig([
  // Keep inherited debt visible in `pnpm run lint:report` while CI blocks
  // correctness and framework errors. These warnings should be burned down
  // in focused PRs instead of hidden with inline disables.
  ...nextVitals.map((config) =>
    config.name === "next"
      ? { ...config, rules: { ...config.rules, ...reactDebtRules } }
      : config
  ),
  ...nextTypeScript.map((config) =>
    config.name === "typescript-eslint/recommended"
      ? { ...config, rules: { ...config.rules, ...typeScriptDebtRules } }
      : config
  ),
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
])
