export type EmergencyFeature =
  | "ENABLE_AI_GENERATION"
  | "ENABLE_PAYMENTS"
  | "ENABLE_ELECTRONIC_SIGNING"
  | "ENABLE_DOCUMENT_MUTATIONS"

/** Fail closed in every environment; only the exact string "true" opts in. */
export function isEmergencyFeatureEnabled(feature: EmergencyFeature): boolean {
  return process.env[feature] === "true"
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
