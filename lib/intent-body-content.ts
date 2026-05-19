/**
 * Intent Body Content
 *
 * Extended page content for all subroute intent pages.
 * Drives the 2,500-word minimum per page requirement.
 *
 * Key format: {registry_key}_{intent_id}
 * Example: "non_compete_agreement_employee"
 *
 * Content is split across GROUP_A1–A15 batch files and merged here.
 */

export type { IntentBodyContent } from './intent-body-content-types'
import type { IntentBodyContent } from './intent-body-content-types'

// ── Batch content imports ─────────────────────────────────────────────────────
// Each file covers ~7–10 intents and exports a GROUP_Ax record.

import { GROUP_A1 } from './intent-body-content-a1'
import { GROUP_A2 } from './intent-body-content-a2'
import { GROUP_A3 } from './intent-body-content-a3'
import { GROUP_A4 } from './intent-body-content-a4'
import { GROUP_A5 } from './intent-body-content-a5'
import { GROUP_A6 } from './intent-body-content-a6'
import { GROUP_A7 } from './intent-body-content-a7'
import { GROUP_A8 } from './intent-body-content-a8'
import { GROUP_A9 } from './intent-body-content-a9'
import { GROUP_A10 } from './intent-body-content-a10'
import { GROUP_A11 } from './intent-body-content-a11'
import { GROUP_A12 } from './intent-body-content-a12'
import { GROUP_A13 } from './intent-body-content-a13'
import { GROUP_A14 } from './intent-body-content-a14'
import { GROUP_A15 } from './intent-body-content-a15'

// ── Master content map ────────────────────────────────────────────────────────
// Groups cover all 102 intent pages.
// A1 : NDA (4) + Employment Contract (3)
// A2 : Employment Contract (4) + Independent Contractor Agreement (6)
// A3 : Service Agreement (5) + Non-Compete Agreement (2)
// A4 : Non-Compete Agreement (3) + Residential Lease Agreement (4)
// A5 : Commercial Lease Agreement (5) + LLC Operating Agreement (1) + Partnership Agreement (3)
// A6 : Power of Attorney (6)
// A7 : Purchase Agreement (3) + Last Will & Testament (2)
// A8 : Last Will & Testament (2) + Cease and Desist Letter (3)
// A9 : Cease and Desist Letter (4) + Demand Letter (3)
// A10: Service Agreement (1) + Purchase Agreement (2) + Last Will (2) + Complaint Letter (4)
// A11: Complaint Letter (1) + Landlord Notice to Vacate (2) + Notice of Breach (3) + Promissory Note (2)
// A12: Promissory Note (4)
// A13: Payment Plan Agreement (4)
// A14: Loan Agreement (4) + Affidavit (3)
// A15: General Release of Liability (3) + Vehicle Bill of Sale (4)

export const INTENT_BODY_CONTENT: Record<string, IntentBodyContent> = {
  ...GROUP_A1,
  ...GROUP_A2,
  ...GROUP_A3,
  ...GROUP_A4,
  ...GROUP_A5,
  ...GROUP_A6,
  ...GROUP_A7,
  ...GROUP_A8,
  ...GROUP_A9,
  ...GROUP_A10,
  ...GROUP_A11,
  ...GROUP_A12,
  ...GROUP_A13,
  ...GROUP_A14,
  ...GROUP_A15,
}

/**
 * Lookup body content for an intent page.
 * @param key Format: "{registry_key}_{intent_id}" e.g. "nda_investor"
 */
export function getIntentBodyContent(key: string): IntentBodyContent | undefined {
  return INTENT_BODY_CONTENT[key]
}
