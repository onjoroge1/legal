import { NextResponse } from "next/server"
import OpenAI from "openai"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

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
    console.log("[Document Generation] Request body:", body)

    const { templateId, formData } = body

    // Check if template exists
    let template = await prisma.documentTemplate.findUnique({
      where: { id: templateId }
    })

    // If template doesn't exist, create sample templates
    if (!template) {
      console.log("[Document Generation] Template not found, creating sample templates")
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/templates/sample`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      if (!response.ok) {
        console.error("[Document Generation] Failed to create sample templates")
        return NextResponse.json(
          { error: "Failed to create sample templates" },
          { status: 500 }
        )
      }

      // Fetch the template again after creating sample templates
      template = await prisma.documentTemplate.findUnique({
        where: { id: templateId }
      })

      if (!template) {
        console.error("[Document Generation] Template still not found after creating samples")
        return NextResponse.json(
          { error: "Template not found" },
          { status: 404 }
        )
      }
    }

    console.log("[Document Generation] Template found:", template.id)

    // Create the prompt for OpenAI
    const prompt = `You are a legal assistant responsible for drafting a comprehensive, ironclad, and professional residential lease agreement based on the provided template and user-supplied form data. Follow these rules explicitly:

1. Integrate all form data into the provided template placeholders accurately.
2. Verify the completeness of each field; if any required field is missing, clearly state which field is missing and request its completion.
3. Ensure the final document is professionally formatted, consistently structured, and error-free.
4. Include standard and necessary legal language customary in residential lease agreements to ensure enforceability.
5. Maintain clarity, precision, and a professional tone throughout.
6. The document should adhere strictly to best legal practices for residential leases.

TEMPLATE:
${template.content}

FORM DATA (JSON):
${JSON.stringify(formData, null, 2)}

GENERATE:
Now generate the complete legal document strictly following the guidelines above. The output must seamlessly blend the provided form data into the lease agreement template, filling in all placeholders. Ensure no placeholders remain unfilled, and clearly state if any mandatory information is missing.`

    console.log("[Document Generation] Calling OpenAI API")
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a legal document generation assistant specializing in residential lease agreements. Generate professional, comprehensive, and legally sound documents based on templates and form data."
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

    // Save the document to the database
    const document = await prisma.document.create({
      data: {
        title: `${template.name} - ${new Date().toLocaleDateString()}`,
        content: generatedContent || "",
        status: "draft",
        type: template.type,
        templateId: template.id,
        userId: session.user.id,
        metadata: {
          templateName: template.name,
          templateType: template.type,
          formData: formData
        }
      }
    })

    console.log("[Document Generation] Document saved to database:", document.id)

    return NextResponse.json({
      message: "Document generated successfully",
      documentId: document.id
    })

  } catch (error) {
    console.error("[Document Generation] Error:", error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { error: "Failed to generate document" },
      { status: 500 }
    )
  }
} 