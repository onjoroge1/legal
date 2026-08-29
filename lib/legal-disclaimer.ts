/**
 * The canonical disclosure shown anywhere a user creates, purchases, downloads,
 * or signs a document. Changing the copy requires a new version so prior
 * acceptances do not silently carry forward.
 */
export const LEGAL_DISCLAIMER_VERSION = "2026-08-29.1"

export const LEGAL_DISCLAIMER_PRIMARY_COPY =
  "LegalLawDocs is a self-help document drafting tool, not a law firm, and does not provide legal advice. Laws vary and change. Review all generated content carefully and consult a licensed attorney in your jurisdiction before relying on, signing, filing, or sending a document."

export const LEGAL_DISCLAIMER_COOKIE = "legallawdocs_disclaimer_acceptance"
export const LEGAL_DISCLAIMER_MAX_AGE_SECONDS = 60 * 60 * 24 * 365

export const LEGAL_DISCLAIMER_REQUIRED_CODE =
  "LEGAL_DISCLAIMER_ACCEPTANCE_REQUIRED"

export interface LegalDisclaimerAcceptanceStatus {
  accepted: boolean
  acceptedAt: string | null
  version: string
  copy: string
}
