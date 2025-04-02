import { NextResponse } from "next/server"
import { TemplateService } from "@/lib/template-service"
import { TemplateRenderer } from "@/lib/template-renderer"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const template = await TemplateService.getTemplate(params.id)
    if (!template) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      )
    }

    const { variables } = await req.json()
    const result = await TemplateRenderer.render(template, variables)

    return NextResponse.json(result)
  } catch (error) {
    console.error("[Template Render API] Error:", error)
    return NextResponse.json(
      { error: "Failed to render template" },
      { status: 500 }
    )
  }
} 