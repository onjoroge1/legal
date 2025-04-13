import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import OpenAI from "openai"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in environment variables")
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Common document types and their descriptions
const DOCUMENT_TYPES = [
  { type: "Non-Disclosure Agreement", description: "Confidentiality agreement between parties" },
  { type: "Service Agreement", description: "Contract for services to be provided" },
  { type: "Employment Contract", description: "Agreement between employer and employee" },
  { type: "Lease Agreement", description: "Contract for renting property" },
  { type: "Purchase Agreement", description: "Contract for buying goods or services" },
  { type: "Partnership Agreement", description: "Agreement between business partners" },
  { type: "Independent Contractor Agreement", description: "Contract for freelance or consulting work" },
  { type: "Loan Agreement", description: "Contract for lending money" },
  { type: "Settlement Agreement", description: "Resolution of a dispute" },
  { type: "License Agreement", description: "Permission to use intellectual property" },
  { type: "Franchise Agreement", description: "Contract for operating a franchise" },
  { type: "Joint Venture Agreement", description: "Collaboration between businesses" },
  { type: "Memorandum of Understanding", description: "Non-binding agreement outlining terms" },
  { type: "Letter of Intent", description: "Preliminary agreement before formal contract" },
  { type: "Power of Attorney", description: "Authorization to act on someone's behalf" },
  { type: "Will and Testament", description: "Document outlining asset distribution after death" },
  { type: "Trust Agreement", description: "Document establishing a trust" },
  { type: "Privacy Policy", description: "Policy for handling personal information" },
  { type: "Terms of Service", description: "Rules for using a service" },
  { type: "End User License Agreement", description: "License for software use" },
]

export async function POST(req: Request) {
  try {
    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set")
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      )
    }

    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { query } = await req.json()
    if (!query) {
      return NextResponse.json({ suggestions: [] })
    }

    // First, try to match against our predefined document types
    const exactMatches = DOCUMENT_TYPES.filter(doc => 
      doc.type.toLowerCase().includes(query.toLowerCase()) ||
      doc.description.toLowerCase().includes(query.toLowerCase())
    ).map(doc => doc.type)

    // If we have exact matches, return them
    if (exactMatches.length > 0) {
      return NextResponse.json({ suggestions: exactMatches.slice(0, 5) })
    }

    try {
      // If no exact matches, use OpenAI to generate suggestions
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a legal document expert. Based on the user's description, suggest relevant document types. 
            Consider the following document types as examples: ${DOCUMENT_TYPES.map(doc => doc.type).join(",")}.
            Return only the document type names, separated by commas.`
          },
          {
            role: "user",
            content: `Based on this description, what document types might be relevant? "${query}"`
          }
        ],
        temperature: 0.7,
        max_tokens: 150,
      })

      const suggestions = completion.choices[0].message.content
        ?.split(",")
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .slice(0, 5) || []

      return NextResponse.json({ suggestions })
    } catch (openaiError) {
      console.error("OpenAI API error:", openaiError)
      // If OpenAI fails, return the most common document types
      return NextResponse.json({
        suggestions: DOCUMENT_TYPES
          .slice(0, 5)
          .map(doc => doc.type)
      })
    }
  } catch (error) {
    console.error("Error in suggest-types endpoint:", error)
    return NextResponse.json(
      { 
        error: "Failed to get document type suggestions",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
} 