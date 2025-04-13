import { NextResponse } from "next/server"
import OpenAI from "openai"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in environment variables")
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    console.log("[Document Generation] Starting document generation process")
    
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      console.error("[Document Generation] No session found")
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    console.log("[Document Generation] Session found for user:", session.user.id)

    const body = await req.json()
    console.log("[Document Generation] Request body:", JSON.stringify(body, null, 2))

    const { title, type, category, jurisdiction, description, state, parties } = body

    if (!title || !type || !category || !jurisdiction || !description || !state || !parties) {
      console.error("[Document Generation] Missing required fields:", {
        title: !title,
        type: !type,
        category: !category,
        jurisdiction: !jurisdiction,
        description: !description,
        state: !state,
        parties: !parties
      })
      return NextResponse.json(
        { 
          error: "Missing required fields",
          details: {
            title: !title,
            type: !type,
            category: !category,
            jurisdiction: !jurisdiction,
            description: !description,
            state: !state,
            parties: !parties
          }
        },
        { status: 400 }
      )
    }

    // Create the prompt for OpenAI
    const prompt = `You are a legal assistant responsible for drafting a comprehensive, ironclad, and professional ${type} document. Follow these rules explicitly:

1. The document should be appropriate for ${jurisdiction} jurisdiction.
2. The document should be categorized under ${category}.
3. The document should be governed by the laws of ${state}.
4. Include all necessary parties: ${parties.map((p: any) => `${p.name} (${p.type})`).join(", ")}.
5. Format the document with proper legal document structure including:
   - Title centered at the top
   - Current date of execution (${new Date().toLocaleDateString()})
   - Parties section with full details
   - Recitals/Whereas clauses
   - Numbered sections with clear headings
   - Definitions section if needed
   - Proper spacing and indentation
   - Signature blocks at the end with current date
6. Include standard and necessary legal language customary in ${type} documents to ensure enforceability.
7. Maintain clarity, precision, and a professional tone throughout.
8. The document should adhere strictly to best legal practices for ${type} documents.
9. Use the current date for all date references.

Document Description:
${description}

Generate a complete legal document following the guidelines above. Ensure all necessary sections are included and the document is ready for use. Format the output with proper spacing, indentation, and section breaks to make it look like a professional legal document.`

    console.log("[Document Generation] Calling OpenAI API with prompt:", prompt)
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a legal document generation assistant specializing in ${type} documents. Generate professional, comprehensive, and legally sound documents based on the provided information. Format the output to look like a professional legal document with proper spacing, indentation, and section breaks.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    console.log("[Document Generation] OpenAI API response received")
    const generatedContent = completion.choices[0].message.content
    console.log("[Document Generation] Generated content length:", generatedContent?.length)

    if (!generatedContent) {
      console.error("[Document Generation] No content generated from OpenAI")
      return NextResponse.json(
        { error: "No content generated" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      content: generatedContent,
      message: "Document generated successfully"
    })

  } catch (error) {
    console.error("[Document Generation] Error:", error instanceof Error ? error.message : 'Unknown error')
    console.error("[Document Generation] Error stack:", error instanceof Error ? error.stack : 'No stack trace')
    
    // Handle OpenAI API quota errors specifically
    if (error instanceof Error && error.message.includes('429')) {
      return NextResponse.json(
        { 
          error: "OpenAI API quota exceeded",
          details: "Please check your OpenAI API billing and quota settings. You may need to add payment information or upgrade your plan."
        },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { 
        error: "Failed to generate document",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
} 