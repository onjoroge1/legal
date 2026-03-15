import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { generateRateLimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit"

export const maxDuration = 60

/**
 * Generic document generation endpoint
 * POST /api/documents/generate
 *
 * Used by the "Create New Document" page (/dashboard/create) for
 * free-form document generation (not template-based).
 *
 * For template-based generation, use POST /api/documents/[slug]/generate.
 */
export async function POST(request: Request) {
  // Rate limit: 5 requests per 10 minutes
  const ip = getClientIp(request)
  const limit = generateRateLimit(ip)
  if (!limit.success) return rateLimitResponse(limit.resetAt) as any

  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, type, category, jurisdiction, description, state, parties } = body

    // Validate required fields
    if (!title || !type || !category || !jurisdiction || !description) {
      return NextResponse.json(
        { error: "Missing required fields: title, type, category, jurisdiction, description" },
        { status: 400 }
      )
    }

    if (!parties || !Array.isArray(parties) || parties.length < 2) {
      return NextResponse.json(
        { error: "At least two parties are required" },
        { status: 400 }
      )
    }

    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Map state abbreviation to full name for the prompt
    const stateMap: Record<string, string> = {
      al: "Alabama", ak: "Alaska", az: "Arizona", ar: "Arkansas",
      ca: "California", co: "Colorado", ct: "Connecticut", de: "Delaware",
      fl: "Florida", ga: "Georgia", hi: "Hawaii", id: "Idaho",
      il: "Illinois", in: "Indiana", ia: "Iowa", ks: "Kansas",
      ky: "Kentucky", la: "Louisiana", me: "Maine", md: "Maryland",
      ma: "Massachusetts", mi: "Michigan", mn: "Minnesota", ms: "Mississippi",
      mo: "Missouri", mt: "Montana", ne: "Nebraska", nv: "Nevada",
      nh: "New Hampshire", nj: "New Jersey", nm: "New Mexico", ny: "New York",
      nc: "North Carolina", nd: "North Dakota", oh: "Ohio", ok: "Oklahoma",
      or: "Oregon", pa: "Pennsylvania", ri: "Rhode Island", sc: "South Carolina",
      sd: "South Dakota", tn: "Tennessee", tx: "Texas", ut: "Utah",
      vt: "Vermont", va: "Virginia", wa: "Washington", wv: "West Virginia",
      wi: "Wisconsin", wy: "Wyoming", dc: "District of Columbia",
    }

    const stateName = stateMap[state?.toLowerCase()] || state || "California"

    // Build parties description
    const partiesDescription = parties
      .map(
        (p: { name: string; type: string; address?: string; email?: string }, i: number) =>
          `Party ${i + 1}: ${p.name} (${p.type})${p.address ? `, Address: ${p.address}` : ""}${p.email ? `, Email: ${p.email}` : ""}`
      )
      .join("\n")

    const result = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `Generate a complete, professional, legally compliant ${type} document based on the following details:

Title: ${title}
Document Type: ${type}
Category: ${category}
Jurisdiction: ${jurisdiction}
Governing State: ${stateName}
Description: ${description}
Date: ${currentDate}

PARTIES INVOLVED:
${partiesDescription}

REQUIREMENTS:
- Write a complete, formal legal document with proper section numbering
- Include ${stateName}-specific legal citations and statutes where applicable
- Use proper legal language and formatting throughout
- Include all standard sections for a ${type} document
- Include signature blocks for all parties listed above
- Make it professionally formatted and ready to sign
- Reference actual ${stateName} statutes where applicable
- The effective date should be ${currentDate}
- Include definitions, obligations, representations, warranties, indemnification, and governing law sections as appropriate
- End with proper execution/signature blocks

Output ONLY the document text. No commentary, preamble, or markdown formatting before or after.`,
    })

    return NextResponse.json({ content: result.text })
  } catch (error) {
    console.error("Document generation error:", error)

    const message =
      error instanceof Error ? error.message : "Internal server error"
    const isRateLimit =
      message.includes("rate") || message.includes("quota") || message.includes("limit")

    return NextResponse.json(
      {
        error: "Failed to generate document",
        details: isRateLimit
          ? "AI generation rate limit reached. Please try again in a moment."
          : message,
      },
      { status: isRateLimit ? 429 : 500 }
    )
  }
}
