import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export const maxDuration = 60

export async function POST(req: Request) {
  const { ndaData } = await req.json()

  const state = ndaData.STATE || "California"
  const type = ndaData.TYPE || "mutual"
  const disclosingParty = ndaData.DISCLOSING_PARTY || "Party A"
  const receivingParty = ndaData.RECEIVING_PARTY || "Party B"
  const relationship = ndaData.RELATIONSHIP || "business relationship"
  const confidentialInfo = ndaData.CONFIDENTIAL_INFO || "business information"
  const duration = ndaData.DURATION || "2 years"
  const nonSolicitation = ndaData.NON_SOLICITATION || "no"
  const nonCompete = ndaData.NON_COMPETE || "no"
  const additional = ndaData.ADDITIONAL || "none"

  const result = await generateText({
    model: google("gemini-2.5-flash"),
    prompt: `Generate a complete, professional, legally compliant Non-Disclosure Agreement (NDA) based on these details:

State/Jurisdiction: ${state}
NDA Type: ${type}
Disclosing Party: ${disclosingParty}
Receiving Party: ${receivingParty}
Business Relationship: ${relationship}
Confidential Information: ${confidentialInfo}
Duration: ${duration}
Non-Solicitation Clause: ${nonSolicitation}
Non-Compete Clause: ${nonCompete}
Additional Provisions: ${additional}

REQUIREMENTS:
- Write a complete, formal legal document with proper section numbering
- Include ${state}-specific legal citations and statutes
- Use proper legal language and formatting
- Include these sections at minimum:
  1. Recitals / Preamble
  2. Definition of Confidential Information
  3. Obligations of the Receiving Party
  4. Exclusions from Confidential Information
  5. Term and Duration
  6. Return of Materials
  7. Remedies and Injunctive Relief
  ${nonSolicitation.toLowerCase() === "yes" ? "8. Non-Solicitation Clause" : ""}
  ${nonCompete.toLowerCase() === "yes" ? "9. Non-Compete Clause (with state-specific enforceability notes)" : ""}
  - Governing Law and Jurisdiction
  - Miscellaneous Provisions (severability, entire agreement, amendments)
  - Signature Block
- Reference actual ${state} statutes where applicable
- Make it professionally formatted and ready to sign
- Use the current date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}

Output ONLY the NDA document text. No commentary before or after.`,
  })

  return Response.json({ document: result.text })
}
