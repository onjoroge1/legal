import { readFileSync } from "node:fs"
import { exit } from "node:process"

const expectedCopy =
  "LegalLawDocs is a self-help document drafting tool, not a law firm, and does not provide legal advice. Laws vary and change. Review all generated content carefully and consult a licensed attorney in your jurisdiction before relying on, signing, filing, or sending a document."

const read = (file) => readFileSync(file, "utf8")
const failures = []

if (!read("lib/legal-disclaimer.ts").includes(expectedCopy)) {
  failures.push("The canonical disclaimer copy changed without updating this contract check.")
}

const guardedApis = [
  "app/api/documents/[category]/[slug]/generate/route.ts",
  "app/api/documents/[category]/[slug]/chat/route.ts",
  "app/api/documents/ai-analyze/route.ts",
  "app/api/documents/download/route.ts",
  "app/api/documents/route.ts",
  "app/api/documents/send-for-signature/route.ts",
  "app/api/documents/sign/route.ts",
  "app/api/documents/sign-external/route.ts",
  "app/api/documents/signing-request/route.ts",
  "app/api/payment/create-checkout/route.ts",
  "app/api/payment/add-method/route.ts",
  "app/api/subscription/change/route.ts",
]

for (const file of guardedApis) {
  if (!read(file).includes("requireLegalDisclaimerAcceptance(request)")) {
    failures.push(`${file} does not enforce disclaimer acceptance.`)
  }
}

const gatedPages = [
  "app/documents/[category]/[slug]/generate/page.tsx",
  "app/documents/[category]/[slug]/preview/page.tsx",
  "app/documents/[category]/[slug]/checkout/page.tsx",
  "app/documents/[category]/[slug]/download/page.tsx",
  "app/sign/[token]/page.tsx",
  "app/dashboard/documents/[id]/layout.tsx",
  "app/dashboard/create/layout.tsx",
  "app/dashboard/billing/layout.tsx",
]

for (const file of gatedPages) {
  if (!read(file).includes("LegalDisclaimerAcceptanceGate")) {
    failures.push(`${file} does not render the required acceptance gate.`)
  }
}

for (const file of [
  "app/api/checkout/complete/route.ts",
  "app/api/nda-generate/route.ts",
  "app/api/nda-chat/route.ts",
]) {
  if (!read(file).includes("ENDPOINT_RETIRED")) {
    failures.push(`${file} is expected to remain retired.`)
  }
}

if (failures.length > 0) {
  failures.forEach((failure) => console.error(`- ${failure}`))
  exit(1)
}

console.log("Legal-disclaimer contract check passed.")
