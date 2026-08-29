import { NextResponse } from "next/server"
import {
  LEGAL_DISCLAIMER_COOKIE,
  LEGAL_DISCLAIMER_MAX_AGE_SECONDS,
  LEGAL_DISCLAIMER_PRIMARY_COPY,
  LEGAL_DISCLAIMER_VERSION,
} from "@/lib/legal-disclaimer"
import {
  createLegalDisclaimerAcceptanceToken,
  getLegalDisclaimerAcceptance,
} from "@/lib/legal-disclaimer-server"

export async function GET(request: Request) {
  try {
    return NextResponse.json(getLegalDisclaimerAcceptance(request), {
      headers: { "Cache-Control": "no-store" },
    })
  } catch (error) {
    console.error("Legal disclaimer verification error:", error)
    return NextResponse.json(
      { error: "Unable to verify legal disclaimer acceptance." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (
      body?.accepted !== true ||
      body?.version !== LEGAL_DISCLAIMER_VERSION
    ) {
      return NextResponse.json(
        {
          error: "The current legal disclaimer must be accepted.",
          version: LEGAL_DISCLAIMER_VERSION,
          copy: LEGAL_DISCLAIMER_PRIMARY_COPY,
        },
        { status: 400 }
      )
    }

    const acceptedAt = new Date().toISOString()
    const response = NextResponse.json({
      accepted: true,
      acceptedAt,
      version: LEGAL_DISCLAIMER_VERSION,
      copy: LEGAL_DISCLAIMER_PRIMARY_COPY,
    })

    response.cookies.set({
      name: LEGAL_DISCLAIMER_COOKIE,
      value: createLegalDisclaimerAcceptanceToken(acceptedAt),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: LEGAL_DISCLAIMER_MAX_AGE_SECONDS,
    })
    response.headers.set("Cache-Control", "no-store")

    return response
  } catch (error) {
    console.error("Legal disclaimer acceptance error:", error)
    return NextResponse.json(
      { error: "Unable to record legal disclaimer acceptance." },
      { status: 503 }
    )
  }
}
