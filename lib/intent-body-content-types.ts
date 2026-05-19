/**
 * Shared type definitions for intent body content.
 * Imported by both the master content map and each batch file
 * to avoid circular dependencies.
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
