export type EmergencyFeature =
  | "ENABLE_AI_GENERATION"
  | "ENABLE_PAYMENTS"
  | "ENABLE_ELECTRONIC_SIGNING"

/**
 * Sensitive features fail closed in production until explicitly enabled.
 * Local development remains usable unless a flag is explicitly set to false.
 */
export function isEmergencyFeatureEnabled(feature: EmergencyFeature): boolean {
  const configured = process.env[feature]
  if (configured === "true") return true
  if (configured === "false") return false
  return process.env.NODE_ENV !== "production"
}

export function requireEmergencyFeature(
  feature: EmergencyFeature,
  label: string
): Response | null {
  if (isEmergencyFeatureEnabled(feature)) return null

  return Response.json(
    {
      error: `${label} is temporarily unavailable while we complete a security review.`,
      code: "FEATURE_TEMPORARILY_DISABLED",
    },
    { status: 503 }
  )
}
