/**
 * Intent Body Content
 *
 * Extended page content for all subroute intent pages.
 * Drives the 2,500-word minimum per page requirement.
 *
 * Key format: {registry_key}_{intent_id}
 * Example: "non_compete_agreement_employee"
 *
 * Content is split across GROUP_A–D files (generated) and merged here.
 */

export interface IntentBodyContent {
  /** 4 paragraphs ~175 words each — complete guide unique to this intent */
  overview: string[]
  /** 5 numbered steps explaining the creation process */
  howItWorks: { step: string; description: string }[]
  /** 4 legal considerations specific to this variant */
  legalConsiderations: { title: string; body: string }[]
  /** 5 common mistakes and how to avoid them */
  commonMistakes: { mistake: string; fix: string }[]
  /** 4 additional FAQs beyond the base faq array */
  extendedFaq: { question: string; answer: string }[]
}

// ── Content maps (populated by parallel generation agents) ───────────────────

/**
 * Lookup body content for an intent page.
 * @param key Format: "{registry_key}_{intent_id}" e.g. "nda_investor"
 */
export function getIntentBodyContent(key: string): IntentBodyContent | undefined {
  return INTENT_BODY_CONTENT[key]
}

// ── Master content map ────────────────────────────────────────────────────────
// Entries added by: GROUP_A (NDA/Employment/Contractor/Service/NonCompete),
//                   GROUP_B (Lease/LLC/Partnership/POA/Purchase),
//                   GROUP_C (LastWill/CeaseDesist/Demand/Complaint/LandlordNotice/Breach),
//                   GROUP_D (PromissoryNote/PaymentPlan/Loan/Affidavit/Release/VehicleBoS)

export const INTENT_BODY_CONTENT: Record<string, IntentBodyContent> = {

  // ── Placeholder — replaced when agents complete ───────────────────────────
  _placeholder: {
    overview: [],
    howItWorks: [],
    legalConsiderations: [],
    commonMistakes: [],
    extendedFaq: [],
  },

}
