const baseUrl = process.env.BASE_URL || "http://localhost:3000"

const slugs = [
  "nda",
  "llc_operating_agreement",
  "employment_contract",
  "residential_lease_agreement",
  "independent_contractor_agreement",
  "partnership_agreement",
  "power_of_attorney",
  "last_will_testament",
  "commercial_lease_agreement",
  "service_agreement",
  "purchase_agreement",
  "non_compete_agreement",
]

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

async function getJson(path, options) {
  const res = await fetch(`${baseUrl}${path}`, options)
  const text = await res.text()
  let json
  try {
    json = text ? JSON.parse(text) : null
  } catch {
    json = null
  }
  return { res, json, text }
}

async function checkServer() {
  try {
    const res = await fetch(baseUrl)
    return res.ok
  } catch {
    return false
  }
}

async function run() {
  console.log(`Running smoke tests against ${baseUrl}`)

  const serverUp = await checkServer()
  if (!serverUp) {
    throw new Error(
      `Cannot reach ${baseUrl}. Start the app first (npm run dev) or set BASE_URL to the running host.`
    )
  }

  for (const slug of slugs) {
    const template = await getJson(`/api/templates/${slug}`)
    assert(template.res.ok, `Template fetch failed for ${slug}: ${template.res.status}`)

    const questionnaires = await getJson(`/api/templates/${slug}/questionnaires`)
    assert(questionnaires.res.ok, `Questionnaires fetch failed for ${slug}: ${questionnaires.res.status}`)
    assert(
      Array.isArray(questionnaires.json) && questionnaires.json.length > 0,
      `No questionnaires found for ${slug}`
    )

    const intents = await getJson(`/api/templates/${slug}/intents`)
    assert(intents.res.ok, `Intents fetch failed for ${slug}: ${intents.res.status}`)
  }

  // Dry-run generation test (no AI call)
  const dryRunPayload = {
    formData: {
      state: "California",
      disclosingParty: "Alpha LLC",
      receivingParty: "Beta Inc.",
      relationship: "Business discussions",
      confidentialInfo: "Financials and product roadmap",
      duration: "2 years",
      nonSolicitation: "no",
      nonCompete: "no",
      additional: "",
    },
    intent: "mutual",
  }
  const dryRun = await getJson(`/api/documents/nda/generate?dryRun=1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-dry-run": "1",
    },
    body: JSON.stringify(dryRunPayload),
  })
  assert(dryRun.res.ok, `Dry-run generation failed: ${dryRun.res.status}`)
  assert(
    typeof dryRun.json?.document === "string" && dryRun.json.document.length > 50,
    "Dry-run generation returned empty document"
  )

  console.log("Smoke tests passed.")
}

run().catch((error) => {
  console.error("Smoke tests failed:", error.message)
  process.exit(1)
})
