import { NextResponse } from "next/server"
import { TemplateService } from "@/lib/template-service"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")

    const templates = await TemplateService.listTemplates(category || undefined)
    return NextResponse.json(templates || [])
  } catch (error) {
    console.error("[Templates API] Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const template = await TemplateService.createTemplate(data)
    return NextResponse.json(template)
  } catch (error) {
    console.error("[Templates API] Error:", error)
    return NextResponse.json(
      { error: "Failed to create template" },
      { status: 500 }
    )
  }
} 