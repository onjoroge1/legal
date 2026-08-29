import { createHmac, timingSafeEqual } from "crypto"
import {
  LEGAL_DISCLAIMER_COOKIE,
  LEGAL_DISCLAIMER_MAX_AGE_SECONDS,
  LEGAL_DISCLAIMER_PRIMARY_COPY,
  LEGAL_DISCLAIMER_REQUIRED_CODE,
  LEGAL_DISCLAIMER_VERSION,
  type LegalDisclaimerAcceptanceStatus,
} from "@/lib/legal-disclaimer"

interface AcceptancePayload {
  acceptedAt: string
  version: string
}

function signingSecret(): string {
  const secret =
    process.env.LEGAL_DISCLAIMER_SIGNING_SECRET || process.env.NEXTAUTH_SECRET

  if (secret) return secret

  if (process.env.NODE_ENV !== "production") {
    return "development-only-disclaimer-secret"
  }

  throw new Error(
    "LEGAL_DISCLAIMER_SIGNING_SECRET or NEXTAUTH_SECRET must be configured"
  )
}

function encodePayload(payload: AcceptancePayload): string {
  return Buffer.from(JSON.stringify(payload)).toString("base64url")
}

function signatureFor(encodedPayload: string): string {
  return createHmac("sha256", signingSecret())
    .update(encodedPayload)
    .digest("base64url")
}

export function createLegalDisclaimerAcceptanceToken(
  acceptedAt = new Date().toISOString()
): string {
  const encodedPayload = encodePayload({
    acceptedAt,
    version: LEGAL_DISCLAIMER_VERSION,
  })

  return `${encodedPayload}.${signatureFor(encodedPayload)}`
}

export function verifyLegalDisclaimerAcceptanceToken(
  token: string | undefined
): LegalDisclaimerAcceptanceStatus {
  const rejected: LegalDisclaimerAcceptanceStatus = {
    accepted: false,
    acceptedAt: null,
    version: LEGAL_DISCLAIMER_VERSION,
    copy: LEGAL_DISCLAIMER_PRIMARY_COPY,
  }

  if (!token) return rejected

  try {
    const [encodedPayload, suppliedSignature, extra] = token.split(".")
    if (!encodedPayload || !suppliedSignature || extra) return rejected

    const expected = Buffer.from(signatureFor(encodedPayload))
    const supplied = Buffer.from(suppliedSignature)
    if (
      expected.length !== supplied.length ||
      !timingSafeEqual(expected, supplied)
    ) {
      return rejected
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as AcceptancePayload
    const acceptedAt = new Date(payload.acceptedAt)

    if (
      payload.version !== LEGAL_DISCLAIMER_VERSION ||
      Number.isNaN(acceptedAt.getTime()) ||
      acceptedAt.getTime() > Date.now() + 60_000 ||
      Date.now() - acceptedAt.getTime() >
        LEGAL_DISCLAIMER_MAX_AGE_SECONDS * 1000
    ) {
      return rejected
    }

    return {
      accepted: true,
      acceptedAt: acceptedAt.toISOString(),
      version: LEGAL_DISCLAIMER_VERSION,
      copy: LEGAL_DISCLAIMER_PRIMARY_COPY,
    }
  } catch {
    return rejected
  }
}

function cookieValue(request: Request, name: string): string | undefined {
  const cookieHeader = request.headers.get("cookie")
  if (!cookieHeader) return undefined

  for (const part of cookieHeader.split(";")) {
    const [rawName, ...rawValue] = part.trim().split("=")
    if (rawName === name) {
      try {
        return decodeURIComponent(rawValue.join("="))
      } catch {
        return undefined
      }
    }
  }

  return undefined
}

export function getLegalDisclaimerAcceptance(
  request: Request
): LegalDisclaimerAcceptanceStatus {
  return verifyLegalDisclaimerAcceptanceToken(
    cookieValue(request, LEGAL_DISCLAIMER_COOKIE)
  )
}

export function requireLegalDisclaimerAcceptance(
  request: Request
): Response | null {
  const status = getLegalDisclaimerAcceptance(request)
  if (status.accepted) return null

  return Response.json(
    {
      error: "Accept the current legal disclaimer before continuing.",
      code: LEGAL_DISCLAIMER_REQUIRED_CODE,
      legalDisclaimer: status,
    },
    { status: 428 }
  )
}
