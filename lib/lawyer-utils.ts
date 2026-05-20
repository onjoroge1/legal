export const PRACTICE_AREA_LABELS: Record<string, string> = {
  "business-contracts": "Business Contracts",
  "intellectual-property": "Intellectual Property",
  startups: "Startup Law",
  "real-estate": "Real Estate",
  "landlord-tenant": "Landlord-Tenant",
  "property-management": "Property Management",
  "estate-planning": "Estate Planning",
  "elder-law": "Elder Law",
  probate: "Probate",
  "employment-law": "Employment Law",
  litigation: "Litigation",
  collections: "Debt & Collections",
  "banking-finance": "Banking & Finance",
  "consumer-protection": "Consumer Protection",
  "personal-injury": "Personal Injury",
  immigration: "Immigration",
  "family-law": "Family Law",
}

export const US_STATE_OPTIONS: { abbr: string; name: string }[] = [
  { abbr: "AL", name: "Alabama" },
  { abbr: "AK", name: "Alaska" },
  { abbr: "AZ", name: "Arizona" },
  { abbr: "AR", name: "Arkansas" },
  { abbr: "CA", name: "California" },
  { abbr: "CO", name: "Colorado" },
  { abbr: "CT", name: "Connecticut" },
  { abbr: "DE", name: "Delaware" },
  { abbr: "FL", name: "Florida" },
  { abbr: "GA", name: "Georgia" },
  { abbr: "HI", name: "Hawaii" },
  { abbr: "ID", name: "Idaho" },
  { abbr: "IL", name: "Illinois" },
  { abbr: "IN", name: "Indiana" },
  { abbr: "IA", name: "Iowa" },
  { abbr: "KS", name: "Kansas" },
  { abbr: "KY", name: "Kentucky" },
  { abbr: "LA", name: "Louisiana" },
  { abbr: "ME", name: "Maine" },
  { abbr: "MD", name: "Maryland" },
  { abbr: "MA", name: "Massachusetts" },
  { abbr: "MI", name: "Michigan" },
  { abbr: "MN", name: "Minnesota" },
  { abbr: "MS", name: "Mississippi" },
  { abbr: "MO", name: "Missouri" },
  { abbr: "MT", name: "Montana" },
  { abbr: "NE", name: "Nebraska" },
  { abbr: "NV", name: "Nevada" },
  { abbr: "NH", name: "New Hampshire" },
  { abbr: "NJ", name: "New Jersey" },
  { abbr: "NM", name: "New Mexico" },
  { abbr: "NY", name: "New York" },
  { abbr: "NC", name: "North Carolina" },
  { abbr: "ND", name: "North Dakota" },
  { abbr: "OH", name: "Ohio" },
  { abbr: "OK", name: "Oklahoma" },
  { abbr: "OR", name: "Oregon" },
  { abbr: "PA", name: "Pennsylvania" },
  { abbr: "RI", name: "Rhode Island" },
  { abbr: "SC", name: "South Carolina" },
  { abbr: "SD", name: "South Dakota" },
  { abbr: "TN", name: "Tennessee" },
  { abbr: "TX", name: "Texas" },
  { abbr: "UT", name: "Utah" },
  { abbr: "VT", name: "Vermont" },
  { abbr: "VA", name: "Virginia" },
  { abbr: "WA", name: "Washington" },
  { abbr: "WV", name: "West Virginia" },
  { abbr: "WI", name: "Wisconsin" },
  { abbr: "WY", name: "Wyoming" },
]

export function getPracticeLabel(area: string): string {
  return PRACTICE_AREA_LABELS[area] ?? area.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

export function getStateOptions(): { abbr: string; name: string }[] {
  return US_STATE_OPTIONS
}

export function getStateName(abbr: string): string {
  return US_STATE_OPTIONS.find((s) => s.abbr === abbr)?.name ?? abbr
}
