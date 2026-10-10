import { getDocumentBySlug, getDocumentByLegacySlug } from "./document-catalog"
import { parseStatePageSlug, US_STATES } from "./state-pages"
import { parseInternationalPageSlug, COUNTRIES } from "./international-pages"
import { parseCityPageSlug, CITIES, CITY_DOC_SLUG } from "./city-pages"
import { getIntentForDocument } from "./intent-registry"

export function resolveDocument(category: string | undefined, slug: string, intent?: string | null, fields: Record<string, unknown> = {}) {
  const statePage = parseStatePageSlug(slug)
  const countryPage = parseInternationalPageSlug(slug)
  const cityPage = parseCityPageSlug(slug)
  const doc = getDocumentBySlug(slug) ?? getDocumentByLegacySlug(slug) ?? getDocumentBySlug(statePage?.doc.slug ?? countryPage?.doc.slug ?? (cityPage ? CITY_DOC_SLUG : ""))
  if (!doc || (category && doc.category !== category)) throw new Error("DOCUMENT_NOT_FOUND")
  const parent = doc.parentSlug ? getDocumentBySlug(doc.parentSlug) : null
  const selected = intent ? getIntentForDocument((parent ?? doc).legacySlug, intent) : null
  if (intent && !selected) throw new Error("UNSUPPORTED_INTENT")
  const inputState = String(fields.state ?? fields.STATE ?? "").trim()
  const inputCountry = String(fields.country ?? "").trim()
  const inputCity = String(fields.city ?? "").trim()
  const city = cityPage?.city ?? CITIES.find(c => c.name.toLowerCase() === inputCity.toLowerCase() || c.slug === inputCity.toLowerCase())
  const state = statePage?.state ?? (city ? US_STATES.find(s => s.name === city.state) : undefined) ?? US_STATES.find(s => s.name.toLowerCase() === inputState.toLowerCase() || s.slug === inputState.toLowerCase() || s.abbr?.toLowerCase() === inputState.toLowerCase())
  const country = countryPage?.country ?? COUNTRIES.find(c => c.name.toLowerCase() === inputCountry.toLowerCase() || c.slug === inputCountry.toLowerCase())
  if (inputState && (!state || ![state.name.toLowerCase(), state.slug, state.abbr?.toLowerCase()].includes(inputState.toLowerCase()))) throw new Error("JURISDICTION_CONFLICT")
  if (inputCountry && !["us", "usa", "united states"].includes(inputCountry.toLowerCase()) && !country) throw new Error("UNSUPPORTED_JURISDICTION")
  if (country && (state || city) || city && inputCity && ![city.name.toLowerCase(), city.slug].includes(inputCity.toLowerCase())) throw new Error("JURISDICTION_CONFLICT")
  if (countryPage && inputCountry && ![countryPage.country.name.toLowerCase(), countryPage.country.slug].includes(inputCountry.toLowerCase())) throw new Error("JURISDICTION_CONFLICT")
  return { doc, sourceSlug: slug, intent: selected?.id ?? null, state: state ?? null, country: country ?? null, city: city ?? null,
    jurisdiction: country?.slug ?? (city ? `${state?.slug ?? 'district-of-columbia'}/${city.slug}` : state?.slug ?? null),
    path: `/documents/${doc.category}/${slug}` }
}
export type ResolvedDocument = ReturnType<typeof resolveDocument>
