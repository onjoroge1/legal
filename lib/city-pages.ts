/**
 * City-specific residential lease agreement pages.
 *
 * ROI principle: only cities where local ordinances materially differ from
 * state law — rent control, just-cause eviction, mandatory local disclosures.
 * No other document types — LLC, POA, wills, non-competes are pure state law
 * and city pages for those would be thin content.
 *
 * URL format: /documents/real-estate/{citySlug}-residential-lease-agreement
 */

// ── The only doc type covered by city pages ──────────────────────────────────
export const CITY_DOC_SLUG = "residential-lease-agreement"
export const CITY_DOC_CATEGORY = "real-estate"
export const CITY_DOC_LEGACY_SLUG = "residential_lease_agreement"
export const CITY_DOC_TITLE = "Residential Lease Agreement"

// ── City registry ─────────────────────────────────────────────────────────────
export interface City {
  name: string       // "New York City"
  slug: string       // "new-york-city"
  state: string      // "New York"
  stateSlug: string  // "new-york"
}

export const CITIES: City[] = [
  { name: "New York City",  slug: "new-york-city",  state: "New York",       stateSlug: "new-york"     },
  { name: "Los Angeles",    slug: "los-angeles",    state: "California",     stateSlug: "california"   },
  { name: "San Francisco",  slug: "san-francisco",  state: "California",     stateSlug: "california"   },
  { name: "Chicago",        slug: "chicago",        state: "Illinois",       stateSlug: "illinois"     },
  { name: "Seattle",        slug: "seattle",        state: "Washington",     stateSlug: "washington"   },
  { name: "Washington DC",  slug: "washington-dc",  state: "District of Columbia", stateSlug: "washington" },
  { name: "Oakland",        slug: "oakland",        state: "California",     stateSlug: "california"   },
  { name: "Portland",       slug: "portland",       state: "Oregon",         stateSlug: "oregon"       },
  { name: "Minneapolis",    slug: "minneapolis",    state: "Minnesota",      stateSlug: "minnesota"    },
  { name: "San Jose",       slug: "san-jose",       state: "California",     stateSlug: "california"   },
  { name: "Santa Monica",   slug: "santa-monica",   state: "California",     stateSlug: "california"   },
  { name: "Berkeley",       slug: "berkeley",       state: "California",     stateSlug: "california"   },
  { name: "Philadelphia",   slug: "philadelphia",   state: "Pennsylvania",   stateSlug: "pennsylvania" },
  { name: "Baltimore",      slug: "baltimore",      state: "Maryland",       stateSlug: "maryland"     },
  { name: "Jersey City",    slug: "jersey-city",    state: "New Jersey",     stateSlug: "new-jersey"   },
  { name: "Newark",         slug: "newark",         state: "New Jersey",     stateSlug: "new-jersey"   },
  { name: "Denver",         slug: "denver",         state: "Colorado",       stateSlug: "colorado"     },
  { name: "Boston",         slug: "boston",         state: "Massachusetts",  stateSlug: "massachusetts" },
  { name: "Long Beach",     slug: "long-beach",     state: "California",     stateSlug: "california"   },
  { name: "San Diego",      slug: "san-diego",      state: "California",     stateSlug: "california"   },
]

// ── Per-city ordinance notes ──────────────────────────────────────────────────
export interface CityPageNotes {
  requirements: string[]
  restrictions: string[]
  noticeRequirements: string
  faq: { question: string; answer: string }[]
}

export const CITY_DOC_NOTES: Record<string, CityPageNotes> = {
  "new-york-city": {
    requirements: [
      "Landlords must register all rental units with the NYC Housing Preservation & Development (HPD) by September 1 each year, including owner contact information and a designated managing agent.",
      "Leases for stabilized units must include a Rent Stabilization Lease Rider disclosing the legal regulated rent, the prior tenant's rent, and the basis for any increase above the preferential rent.",
      "Under the FARE Act (Local Law 18 of 2024), the party who hires a broker bears the broker's fee — landlords may not require tenants to pay broker fees they did not engage.",
      "The Tenant Data Privacy Act requires landlords using smart-access technology (key fobs, apps, facial recognition) to post a data retention policy and obtain tenant consent before collecting biometric data.",
      "Landlords of buildings with three or more units must provide new tenants with a written disclosure of the building's bedbug infestation history for the prior year on a form prescribed by the NYC Department of Housing Preservation and Development.",
    ],
    restrictions: [
      "Rent-stabilized units (pre-1974 buildings with 6+ units) may only increase rent by amounts set annually by the Rent Guidelines Board (RGB); for 2024–2025, RGB approved 2.75% for one-year and 5.25% for two-year leases.",
      "Landlords may not refuse to renew a rent-stabilized lease except for the specific grounds enumerated in the Rent Stabilization Code (RSC §2524.3), such as non-primary residence or owner occupancy.",
      "For market-rate tenants with lease terms of less than one year, landlords must provide 30 days' written notice of non-renewal; 60 days for tenants with one to two years of residency; 90 days for tenants with two or more years of residency, per HSTPA 2019.",
      "Security deposits are capped at one month's rent for all residential tenants statewide (HSTPA 2019, Real Property Law §702); landlords must return the deposit within 14 days of vacancy with an itemized statement.",
      "Landlords of rent-stabilized units may not collect a preferential rent below the legal regulated rent and then increase to the legal regulated rent mid-tenancy except upon lease renewal after the lease term in which the preferential rent was charged expires.",
    ],
    noticeRequirements: "New York City landlords must provide written non-renewal notice of 30 days for tenancies under one year, 60 days for tenancies of one to two years, and 90 days for tenancies of two or more years, and rent-stabilized tenants must receive a renewal lease offer 90 to 150 days before lease expiration.",
    faq: [
      {
        question: "Does rent stabilization apply to my apartment?",
        answer: "Rent stabilization generally covers apartments in buildings with six or more units built before January 1, 1974, unless the building received certain tax benefits that brought newer units under stabilization. You can look up your unit's stabilization status on the NYC Rent Guidelines Board website or request your apartment's rental history from the Division of Housing and Community Renewal (DHCR). Buildings that received 421-a or J-51 tax benefits may also be covered regardless of construction date.",
      },
      {
        question: "Can my landlord charge me a broker fee in New York City?",
        answer: "Under the FARE Act (Local Law 18 of 2024), which took effect June 11, 2025, only the party who hires the broker is responsible for paying the broker's fee — meaning landlords who hire listing agents cannot pass that fee to tenants. If you find an apartment through a landlord's broker without hiring your own agent, you owe no broker fee. Landlords who violate this rule can be fined up to $2,000 per violation.",
      },
      {
        question: "What happens if my landlord fails to return my security deposit within 14 days?",
        answer: "Under HSTPA 2019 (Real Property Law §702), if a landlord fails to return your security deposit (capped at one month's rent) with an itemized written statement of deductions within 14 days of your vacating the unit, the landlord forfeits the right to retain any portion of the deposit. You may pursue the full deposit in Small Claims Court, and willful violations can result in double damages.",
      },
      {
        question: "What notice must a landlord give before entering my apartment?",
        answer: "New York law requires landlords to provide reasonable notice before entering, which courts have generally interpreted as 24 hours except in genuine emergencies. While there is no specific statutory hour requirement for non-emergency entry, entering without notice or consent may constitute harassment under the NYC Rent Stabilization Code (RSC §2525.5), which prohibits landlord conduct intended to force a tenant to vacate.",
      },
    ],
  },
  "los-angeles": {
    requirements: [
      "Landlords subject to the Los Angeles Rent Stabilization Ordinance (RSO) must register each covered rental unit annually with the Los Angeles Housing Department (LAHD) and pay the annual registration fee; failure to register bars the landlord from collecting any rent increase.",
      "Before serving any eviction notice for just cause, landlords must serve tenants with a written statement identifying the specific just cause reason from the 15 enumerated grounds under LAMC §151.09 and any applicable cure period.",
      "For no-fault evictions (owner move-in, substantial rehabilitation, Ellis Act withdrawal), landlords must pay relocation assistance of one to three months' rent depending on unit size and tenant's length of tenancy, per LAMC §151.09(G).",
      "All RSO-covered buildings must post the LAHD-issued Certificate of Rent Stabilization in a conspicuous location in the common area, and landlords must provide tenants with a copy of the RSO tenant rights summary upon request.",
      "Landlords who seek to pass through capital improvement costs must apply to LAHD for a Rent Adjustment application; unilateral surcharges without LAHD approval are prohibited under the RSO.",
    ],
    restrictions: [
      "Annual rent increases for RSO-covered units (buildings with two or more units built before October 1, 1978) are limited to the LAHD-approved allowable increase, which is typically set at 3–8% based on CPI calculations and announced each year; for rent increases effective July 1, 2024 through June 30, 2025, LAHD set the allowable increase at 4%.",
      "Evictions of RSO tenants require one of 15 enumerated just cause grounds under LAMC §151.09, including non-payment, nuisance, refusal to allow lawful entry, and owner/relative move-in; 'no cause' or 'at will' terminations are prohibited.",
      "Under the Ellis Act withdrawal process, landlords who remove all units from the rental market must pay relocation assistance and may not re-rent those units to anyone other than the original tenant for five years; offering units at a higher rent within that period triggers treble damages.",
      "Landlords may not charge application fees exceeding the actual cost of a tenant screening report and must refund any unused portion if the unit is not rented to that applicant, per California Civil Code §1950.6.",
      "Rent increases under the RSO are limited to once per 12-month period per unit, and any increase above the allowable percentage requires a rent adjustment hearing before LAHD; retroactive rent increases are prohibited.",
    ],
    noticeRequirements: "Los Angeles RSO landlords must serve a 3-day notice to pay or quit for non-payment, a 3-day notice to perform or quit for lease violations with a right to cure, and for no-fault terminations (owner move-in, Ellis Act) must provide 60 days' written notice plus simultaneously tender the relocation assistance payment.",
    faq: [
      {
        question: "Is my apartment covered by the Los Angeles RSO?",
        answer: "The RSO generally covers rental units in buildings with two or more units where a certificate of occupancy was issued before October 1, 1978, and which are not otherwise exempt (such as single-family homes, condominiums sold to a bona fide purchaser, or newly constructed units). You can verify RSO coverage by entering your address in the LAHD Rent Registry at housing2.lacity.org. Units subject only to AB 1482 (the statewide Tenant Protection Act) follow different rules with a higher allowable increase and fewer just cause eviction grounds.",
      },
      {
        question: "How much relocation assistance am I owed for a no-fault eviction?",
        answer: "Under LAMC §151.09(G), relocation assistance for a no-fault eviction from an RSO unit equals one month's rent for units with fewer than two bedrooms, two months' rent for two-bedroom units, and three months' rent for units with three or more bedrooms; longer-tenancy tenants (5+ years) and low-income tenants receive an additional month. Relocation must be paid at the time the eviction notice is served, not at move-out. Failure to pay relocation as required renders the eviction notice void.",
      },
      {
        question: "Can my landlord raise my rent after I moved in but the building was exempted?",
        answer: "If your building was covered by the RSO when you moved in and later lost its RSO coverage (e.g., through condominium conversion), any rent increase must still comply with the RSO rules that applied at the time of your tenancy unless LAHD formally exempts the unit. Exemptions based on substantial renovation require an LAHD determination; landlords who claim exemptions without formal approval may still be bound by RSO limits. Always request a copy of any exemption certificate the landlord claims.",
      },
      {
        question: "What are the rules for owner move-in evictions in Los Angeles?",
        answer: "Under LAMC §151.09(A)(8), a landlord may evict a tenant to move in the landlord or a specified immediate family member, but the owner or family member must actually occupy the unit as their primary residence for at least 36 consecutive months. The landlord must serve 60 days' notice and simultaneously pay relocation assistance; re-renting the unit within 36 months at a higher rent triggers liability for three times the rent paid by the displaced tenant as damages plus attorney fees.",
      },
    ],
  },
  "san-francisco": {
    requirements: [
      "Landlords of units subject to the SF Rent Ordinance (buildings with three or more units with a certificate of occupancy issued before June 13, 1979) must register their rental property with the SF Rent Board and pay the annual registration fee; 50% of that fee may be passed through to the tenant as a monthly surcharge.",
      "Landlords must provide tenants with a written Chapter 37A Rent Ordinance disclosure at the commencement of the tenancy, informing them of their right to petition the Rent Board for unlawful rent increases and improper deductions from security deposits.",
      "Before pursuing an owner move-in (OMI) eviction, the landlord must serve a 60-day written notice and simultaneously offer the tenant the right to return to the unit if it becomes available again within a 10-year period, per Rent Ordinance §37.9(a)(8).",
      "Landlords must pay relocation assistance for OMI evictions and certain no-fault evictions; as of 2024, the relocation amount equals the greater of three months' rent or a formula-based amount set by the Rent Board (approximately $7,989 per tenant, $9,988 for elderly/disabled tenants).",
      "Capital improvement petitions must be filed with the Rent Board before any pass-through surcharge may be billed to tenants; landlords cannot unilaterally add surcharges to rent without a Rent Board decision approving the pass-through.",
    ],
    restrictions: [
      "Annual rent increases for covered units are limited to 60% of the regional CPI (San Francisco-Oakland-Hayward area), with a floor of 1% and a ceiling of 7%; for the 2024–2025 period, the Rent Board set the allowable increase at 1.7%.",
      "Evictions of tenants in Rent Ordinance-covered units require one of 15 enumerated just cause grounds under Rent Ordinance §37.9(a); no-fault evictions include OMI, demolition, substantial rehabilitation, and Ellis Act withdrawal, each requiring specific procedures and relocation.",
      "Under Costa-Hawkins, vacancy decontrol applies when a covered unit is voluntarily vacated — the landlord may set the rent for the next tenancy at any amount, but once a new tenant moves in, annual increases revert to the Rent Ordinance cap.",
      "Landlords may not impose lease terms that waive any right under the Rent Ordinance; any lease clause purporting to waive a tenant's right to petition the Rent Board or to receive just cause protections is void and unenforceable under Rent Ordinance §37.9(f).",
      "Ellis Act withdrawals require the landlord to remove all units in the building from the rental market simultaneously; the units may not be re-rented for five years (two years for subsidized units), and former tenants have a right of first refusal at the prior rent if the building is returned to the rental market within 10 years.",
    ],
    noticeRequirements: "San Francisco Rent Ordinance landlords must provide 30 days' notice of a rent increase (60 days if the increase is 10% or more), must serve 60 days' written notice for any no-fault eviction including owner move-in, and must simultaneously tender relocation assistance at the time the OMI or Ellis Act notice is served.",
    faq: [
      {
        question: "How do I know if my unit is covered by the SF Rent Ordinance?",
        answer: "The Rent Ordinance generally covers units in buildings with three or more residential units where the certificate of occupancy was issued before June 13, 1979; single-family homes and condominiums are generally exempt under Costa-Hawkins unless the tenant moved in before January 1, 1996 or the unit was not separately alienable. You can verify coverage at the SF Rent Board's website (sfrentboard.org) by entering your address. Subsidized units, dormitories, and certain government-owned properties are also exempt.",
      },
      {
        question: "Can my landlord evict me so a family member can move in?",
        answer: "Yes, but only under strict conditions set out in Rent Ordinance §37.9(a)(8): the owner or a close family member (parent, child, grandparent, grandchild, sibling, or the spouse/domestic partner of any of those) must intend to occupy the unit as their principal place of residence for at least 36 consecutive months. The tenant must receive 60 days' written notice, relocation assistance must be paid simultaneously, and the landlord must offer the tenant the right to re-occupy at the same rent if the unit becomes available within 10 years.",
      },
      {
        question: "What is the Rent Board annual fee pass-through?",
        answer: "Under Rent Ordinance §37.3(a)(1), the landlord may pass 50% of the annual Rent Board registration fee through to the tenant as a monthly surcharge; for 2024, the fee was $268, making the tenant's share approximately $134 per year or about $11.17 per month. This pass-through is automatic and does not require a Rent Board petition; it is listed on rent receipts or invoices separately from base rent. The remaining 50% is the landlord's responsibility.",
      },
      {
        question: "What happens if my landlord raises my rent above the allowable increase?",
        answer: "You can file a Petition for Unlawful Rent Increase with the SF Rent Board; there is no filing fee. If the Rent Board finds the increase was unlawful, it will order the rent reduced to the legal amount and may require the landlord to refund the excess amounts collected. Chronic overcharging or harassment in connection with unlawful rent increases can also form the basis for a wrongful eviction claim under Rent Ordinance §37.9(a)(15), which provides for treble actual damages, punitive damages, and attorney fees.",
      },
    ],
  },
  "chicago": {
    requirements: [
      "Landlords of buildings with six or more residential units (excluding owner-occupied buildings with six or fewer units) must attach a current City of Chicago summary of the Residential Landlord and Tenant Ordinance (RLTO, Chicago Municipal Code §5-12) to every written lease at the time of execution.",
      "Security deposits must be held in a federally insured interest-bearing account at a Chicago financial institution, and the landlord must pay interest on the deposit at the rate announced annually by the City Comptroller (currently tied to the JPMorgan Chase one-year certificate of deposit rate).",
      "Within 30 days of receiving a security deposit, the landlord must provide the tenant with a written receipt stating the name and address of the financial institution, the account number, and the current interest rate, per RLTO §5-12-080.",
      "Landlords must maintain heating systems capable of providing heat of at least 68°F during the day (8:30 a.m. to 10:30 p.m.) and 66°F at night from October 1 through May 31, per RLTO §5-12-110 and Chicago Municipal Code §13-196-700.",
      "Any lease renewal or modification must be offered in writing no later than the number of days before lease expiration equal to the required notice period for that tenancy length; for month-to-month tenancies, 30 days' written notice is required for any material change.",
    ],
    restrictions: [
      "If a landlord fails to return a security deposit (or provide a written itemized statement of deductions) within 30 days of the tenant vacating, the landlord is liable for twice the amount of the deposit plus attorney's fees and court costs, per RLTO §5-12-080(f).",
      "Landlords may not retaliate against a tenant who complains to a government authority, requests repairs, or exercises any RLTO right by increasing rent, decreasing services, or initiating eviction within one year of the tenant's protected activity, per RLTO §5-12-150.",
      "Before filing an eviction for habitability-related non-payment, a landlord must provide a 14-day written notice specifying the material non-compliance and giving the tenant a reasonable opportunity to cure; if the condition is remedied, the notice is void and eviction may not proceed on that basis (RLTO §5-12-130).",
      "Landlords may not include lease terms that waive any right granted under the RLTO; any lease provision purporting to limit the landlord's RLTO obligations, waive the tenant's right to a jury trial, or require tenants to pay landlord's attorney's fees regardless of outcome is void and unenforceable under RLTO §5-12-140.",
      "Landlords may not charge application fees that exceed the actual costs of processing the application, including the cost of a credit and background check; any excess collected must be refunded if the applicant is not accepted.",
    ],
    noticeRequirements: "Chicago RLTO landlords must give tenants at least 30 days' written notice to terminate a month-to-month tenancy, must provide a 10-day notice to pay rent or quit for non-payment, and must give 14 days to cure any lease violation before filing for eviction for non-rent-related breaches.",
    faq: [
      {
        question: "Does the Chicago RLTO apply to my apartment?",
        answer: "The RLTO applies to most residential rental units in Chicago except owner-occupied buildings with six or fewer units, units in hotels or motels, units in employee housing as a condition of employment, and units in buildings covered by the Chicago Housing Authority. If your landlord lives in the building and the building has six or fewer units total, you are likely not covered. You can contact the Metropolitan Tenants Organization (MTO) or Chicago's Department of Housing for a coverage determination.",
      },
      {
        question: "How much interest does my landlord owe on my security deposit?",
        answer: "Under RLTO §5-12-080, landlords must pay interest on security deposits at the rate set annually by the City Comptroller; the rate is based on the JPMorgan Chase one-year certificate of deposit rate and is typically updated each January. The interest is due annually (not at move-out) and must be paid to you within 30 days after each 12-month period. If your landlord fails to pay interest, you may deduct it from your rent after giving written notice, or sue for $100 plus court costs.",
      },
      {
        question: "What remedies do I have if my landlord fails to make repairs?",
        answer: "Under RLTO §5-12-110, if your landlord fails to make repairs within a reasonable time after written notice, you may repair and deduct (up to $500 or one month's rent, whichever is less), withhold a proportional share of rent, or terminate the lease if the condition materially endangers health or safety. For serious habitability failures (no heat, water, or electricity), you can terminate immediately with written notice and sue for two months' rent or twice actual damages, whichever is greater, plus attorney's fees.",
      },
      {
        question: "Can my landlord lock me out or shut off utilities to force me out?",
        answer: "No — under RLTO §5-12-160, a landlord who unlawfully removes a tenant's possessions, locks out a tenant without a court order, or willfully interrupts essential services (heat, water, electricity, gas) is liable for two months' rent or twice the tenant's actual damages, whichever is greater, plus attorney's fees and court costs. These self-help eviction tactics are illegal in Chicago regardless of the reason for the eviction, and a tenant may immediately seek a court order for re-entry.",
      },
    ],
  },
  "seattle": {
    requirements: [
      "Before denying a rental application, Seattle landlords must provide the applicant with a written adverse action notice stating the specific reason(s) for denial; income, rental history, and credit criteria used in screening must be disclosed in writing to all applicants before accepting any application fee, per SMC 14.09.",
      "Landlords subject to the Seattle Rental Housing Inspection Program (RHIP) must register their rental properties and allow periodic City inspections to verify compliance with minimum housing and maintenance standards; properties in certain geographic areas are subject to mandatory inspection cycles.",
      "All rental properties in Seattle must be registered with the Seattle Department of Construction and Inspections (SDCI), and landlords must maintain a current business license; failure to register bars the landlord from recovering attorney's fees in any eviction proceeding.",
      "For just cause evictions for non-payment of rent, landlords must serve a written 14-day notice to pay or vacate (as required by Washington state law, RCW 59.12.030), but Seattle's Just Cause Eviction Ordinance (SMC 22.206.160) additionally requires the notice to include the specific just cause ground and a statement of tenant rights.",
      "Seattle landlords must accept any lawful source of income as payment of rent, including Housing Choice Vouchers (Section 8); refusing to rent to a voucher holder or setting screening criteria that effectively exclude voucher holders is prohibited under SMC 14.08.020.",
    ],
    restrictions: [
      "Evictions of residential tenants require one of 18 enumerated just cause grounds under SMC 22.206.160, including failure to pay rent, material breach of lease, nuisance, owner move-in, and substantial rehabilitation; no-cause terminations for tenants with 6+ months of tenancy are prohibited.",
      "For owner move-in evictions, Seattle requires 180 days' written notice (not the standard 90 days under state law), and the owner or qualifying family member must actually occupy the unit as their principal residence for at least 60 consecutive days; re-renting within 12 months at a higher price triggers liability for relocation costs and damages.",
      "From December 1 through March 1, evictions of low-income tenants (income at or below 50% of area median income) for non-payment of rent are subject to a winter eviction moratorium under SMC 22.210; landlords may not enforce such evictions during this period even if a court order has been obtained.",
      "Seattle prohibits landlords from using a rental applicant's rental history (including prior evictions more than three years old) as a screening criterion without first considering mitigating circumstances; blanket policies rejecting applicants with any prior eviction history are prohibited under SMC 14.09.025.",
      "Landlords may not charge late fees exceeding $10 per month or 1% of monthly rent (whichever is greater) unless the rent is more than five days past due; late fee clauses that trigger earlier or in higher amounts are void under Seattle Municipal Code.",
    ],
    noticeRequirements: "Seattle landlords must give 20 days' written notice to pay or quit for non-payment of rent (exceeding the 14-day state minimum for certain tenancies), must provide 180 days' notice for owner move-in evictions, and must give at least 20 days' notice for any no-fault termination with a statement identifying the applicable just cause ground under SMC 22.206.160.",
    faq: [
      {
        question: "Does Seattle have rent control?",
        answer: "No — Seattle does not have rent stabilization or rent control for private market units; Washington state law (RCW 35.21.830) preempts local rent control ordinances. However, Seattle's Just Cause Eviction Ordinance provides strong eviction protections that limit a landlord's ability to displace a tenant even without a rent cap. Tenants in subsidized or income-restricted housing are subject to separate federal and program-based rent rules.",
      },
      {
        question: "What are my rights during the winter eviction moratorium?",
        answer: "Under SMC 22.210, Seattle tenants whose income is at or below 50% of the area median income (AMI) cannot be evicted for non-payment of rent between December 1 and March 1. To invoke the moratorium, you must notify your landlord in writing of your income status; the landlord cannot proceed with the eviction until after March 1, but the unpaid rent continues to accrue and must be repaid. You should contact the Tenants Union of Washington State or a legal aid provider for help documenting your income and asserting this right.",
      },
      {
        question: "Can a landlord reject me for a prior eviction on my record?",
        answer: "Seattle's Fair Chance Housing Ordinance (SMC 14.09) significantly limits the use of prior eviction records in tenant screening. Landlords may not use evictions that are more than three years old, evictions that were dismissed or resulted in a judgment for the tenant, or evictions arising from domestic violence situations. For evictions within the past three years, landlords must consider mitigating information before denying an application and must provide written explanation if they deny based on an eviction record.",
      },
      {
        question: "What notice is required before my landlord can enter my unit?",
        answer: "Under RCW 59.18.150 (Washington state law, which Seattle adopts), a landlord must provide at least two days' written notice before entering a rental unit for non-emergency inspections, repairs, or showings, and must enter only at reasonable times. In genuine emergencies (fire, flood, gas leak), the landlord may enter without advance notice. Seattle does not have a local ordinance extending the notice period beyond the state two-day minimum, but landlords who enter without proper notice may be liable for actual damages and up to $100 per violation.",
      },
    ],
  },
  "washington-dc": {
    requirements: [
      "Rental housing providers in DC must register with the Department of Housing and Community Development (DHCD) Rental Accommodations Division (RAD) and obtain a basic business license as a housing provider; unregistered landlords may not pursue eviction or collect rent increases.",
      "Landlords of rent-controlled units must provide tenants with a copy of the RAD Tenant Rights notice and the DC Tenant Bill of Rights (D.C. Official Code §42-3502.22) at the start of each tenancy and upon request.",
      "Before selling a building with two or more rental units, landlords must comply with the Tenant Opportunity to Purchase Act (TOPA, D.C. Official Code §42-3404.02), which requires a written offer of sale to tenants at the same price and terms offered to any third-party buyer; tenants have the right to purchase individually (single-unit buildings), as a group, or to assign their rights to a qualified purchaser.",
      "Landlords must provide tenants with a written Housing Accommodation Registration Certificate (or exemption certificate) and must post a copy in the common area of the building; failure to do so is a defense in any eviction proceeding.",
      "Any notice of rent increase for a rent-controlled unit must be filed with RAD on a RAD-prescribed form simultaneously with service on the tenant; increases not filed with RAD are invalid and may not be collected.",
    ],
    restrictions: [
      "Annual rent increases for rent-controlled units (generally all rental units in DC except those built after 1975, single-family homes, and units exempt by certificate) are limited to the lesser of CPI-W (Washington metro area) plus 2%, or 10% per year; for elderly (62+) and disabled tenants, the cap is CPI-W or 5%, whichever is less, per D.C. Official Code §42-3502.08.",
      "Tenants in rent-controlled units may not be evicted without good cause; permissible grounds under the Rental Housing Act (§42-3505.01) include non-payment, material lease violation, building withdrawal from the rental market, and substantial rehabilitation — but not mere lease expiration or the landlord's desire to re-let at a higher rent.",
      "For no-fault evictions (including housing provider personal use, sale of unit, or building withdrawal), landlords must provide 90 days' written notice and may be required to pay relocation assistance; the amount is set by DHCD and varies by unit type and tenant income.",
      "Landlords may not impose lease terms that waive any right under the DC Rental Housing Act or the TOPA; any such waiver is void under D.C. Official Code §42-3502.19.",
      "For units not subject to rent control, landlords may not increase rent during the first 12 months of a tenancy, and thereafter must give 30 days' written notice before any increase takes effect, per D.C. Official Code §42-3509.02.",
    ],
    noticeRequirements: "DC landlords must provide 30 days' written notice for rent increases in non-controlled units and must file increases in controlled units with RAD simultaneously with tenant service; no-fault evictions require 90 days' written notice, and evictions for non-payment require a 30-day demand for rent before filing in DC Superior Court.",
    faq: [
      {
        question: "How does DC's Tenant Opportunity to Purchase Act (TOPA) work?",
        answer: "Under TOPA (D.C. Official Code §42-3404), when a landlord decides to sell a rental building, tenants have a right of first refusal to purchase the building at the same price and on the same terms being offered to outside buyers. Landlords must serve a written Offer of Sale on all tenants simultaneously; tenants then have specific windows (ranging from 30 to 120 days depending on building size) to organize, negotiate, and exercise or assign their purchase rights. TOPA applies even to buildings with as few as one rental unit.",
      },
      {
        question: "Is my apartment covered by DC rent control?",
        answer: "DC rent control covers most rental units except those in buildings issued a certificate of occupancy after 1975, single-family homes, and units owned by a landlord who owns no more than four rental units in DC; certain subsidized units and government-owned units are also exempt. Your landlord must provide you with a written exemption certificate if claiming any exemption; absent a certificate, the unit is presumed to be rent-controlled. You can verify coverage at the RAD Rental Housing Registry on the DHCD website.",
      },
      {
        question: "What is the maximum rent increase allowed for a rent-controlled unit in DC?",
        answer: "Under D.C. Official Code §42-3502.08, the maximum annual increase for most rent-controlled tenants is CPI-W (Washington metro area) plus 2%, capped at 10%; for tenants who are elderly (62 or older) or have a disability, the cap is CPI-W or 5%, whichever is less. For 2024, DHCD announced an allowable increase of 8.9% for general tenants and 5% for elderly/disabled tenants. Increases above these limits require a hardship petition filed with and approved by RAD.",
      },
      {
        question: "What must a landlord do before evicting a tenant in DC?",
        answer: "DC law requires good cause for all evictions of tenants in covered units; the landlord must first issue the appropriate notice (a 30-day demand for possession for non-payment, or a notice to cure or vacate for lease violations), then file a complaint in DC Superior Court's Landlord & Tenant Branch if the tenant does not comply. Tenants have a right to cure non-payment by paying all rent owed through the court date in most circumstances. Self-help evictions (lock-outs, utility shutoffs) are illegal and subject the landlord to civil liability and criminal penalties under D.C. Official Code §42-3505.02.",
      },
    ],
  },
  "oakland": {
    requirements: [
      "Landlords of units covered by Oakland's Rent Adjustment Program (RAP) must register each covered unit annually with the City of Oakland and pay the annual RAP registration fee; failure to register is a complete defense to any eviction proceeding.",
      "Before initiating any eviction against a covered tenant, landlords must file a Notice of Intent to Evict with the Oakland RAP office and serve the tenant with both the eviction notice and a copy of the RAP Tenant Rights Summary, per Oakland Municipal Code (OMC) §8.22.360.",
      "For owner move-in evictions under the Oakland Just Cause for Eviction Ordinance (OMC §8.22.300), the owner or qualifying relative must have resided in Oakland for at least three years prior to the eviction, must not own comparable vacant units elsewhere in the city, and must actually occupy the unit as their primary residence for at least 36 continuous months.",
      "Landlords must disclose the unit's RAP registration status and whether any pending RAP petitions or outstanding code violations exist in the lease or in a written disclosure provided before lease execution.",
      "Landlords who fail to maintain habitable conditions must remedy any City-cited code violations before serving any rent increase notice; increases served while code violations are pending are voidable upon the tenant's petition to the RAP hearing officer.",
    ],
    restrictions: [
      "Annual rent increases for RAP-covered units (generally buildings with three or more units, or single-family homes and condominiums not exempt under Costa-Hawkins, built before January 1, 1983) are limited to the annual CPI adjustment set by the RAP board; for 2024, the RAP board set the allowable increase at 3.0%.",
      "Evictions of covered tenants require one of the just cause grounds enumerated in OMC §8.22.300, including non-payment, substantial breach, nuisance, owner/relative move-in, substantial rehabilitation, and condominium conversion; 'at will' terminations are prohibited regardless of lease term.",
      "For no-fault evictions (owner move-in, Ellis Act, substantial rehabilitation), landlords must pay four months' rent as relocation assistance at the time the eviction notice is served; for low-income, elderly (62+), disabled, or minor tenants, the relocation amount is six months' rent, per OMC §8.22.350.",
      "Under the Ellis Act withdrawal process (OMC §8.22.500), all units in a building must be simultaneously removed from the rental market; former tenants have a right of first refusal to re-rent at their prior rent if the building returns to the market within 5 years, and landlords must pay all relocation costs regardless of tenant income.",
      "Landlords may not impose rent increases more than once in any 12-month period for RAP-covered units, and any increase above the annual RAP allowable amount requires filing a landlord petition with the RAP hearing officer and obtaining a written decision before the increase may be collected.",
    ],
    noticeRequirements: "Oakland landlords must provide 30 days' written notice for owner move-in evictions (along with simultaneous payment of relocation assistance), must serve tenants with a 3-day notice to pay or quit for non-payment, and must file a copy of all eviction notices with the Oakland RAP office within 3 business days of service on the tenant.",
    faq: [
      {
        question: "What is the Oakland Rent Adjustment Program and does it cover my unit?",
        answer: "Oakland's RAP (OMC Chapter 8.22) provides rent increase limitations and just cause eviction protections for most residential rental units in buildings with three or more units built before January 1, 1983, and some single-family and condominium rentals not exempt under Costa-Hawkins. Single-family homes and condominiums sold to a bona fide purchaser after January 1, 1996 are typically subject only to just cause eviction protections (not the rent increase cap) under Costa-Hawkins. You can check your unit's RAP status at the Oakland RAP website (oaklandca.gov/topics/rent-adjustment-program).",
      },
      {
        question: "How much relocation assistance must my landlord pay for a no-fault eviction?",
        answer: "Under OMC §8.22.350, relocation assistance for a no-fault eviction from a RAP-covered unit is four months' rent; if any member of your household is elderly (62 or older), disabled, or a minor, the amount increases to six months' rent. The relocation assistance must be paid in full at the time the eviction notice is served — not at move-out — and failure to pay renders the notice void. For Ellis Act withdrawals, the same amounts apply plus the landlord must pay moving costs up to a City-set maximum.",
      },
      {
        question: "Can my landlord evict me so a family member can move in?",
        answer: "Yes, but Oakland's requirements for owner move-in (OMI) evictions are stricter than state law: under OMC §8.22.300(A)(9), the owner or relative must have lived in Oakland for at least three years, must not own a comparable vacant unit anywhere in the city, must pay four (or six) months' relocation assistance at the time of notice, and must actually occupy the unit as their primary residence for at least 36 consecutive months. If the unit is re-rented or not occupied within 90 days of the tenant vacating, the landlord is liable for the tenant's reasonable moving costs, rent differential for up to 3 years, and attorney's fees.",
      },
      {
        question: "How does a tenant petition the RAP for a rent increase above the allowable amount?",
        answer: "If your landlord files a petition with the Oakland RAP office seeking a rent increase above the annual CPI allowable amount (due to capital improvements, increased operating expenses, or a fair return claim), you will receive written notice of the petition and an opportunity to respond and appear at a RAP hearing. The RAP hearing officer will evaluate the landlord's evidence and issue a written decision; increases may not be collected until the decision issues. Tenants may also file their own petitions to contest unlawful increases already collected, and the RAP may order refunds of overcharges going back up to three years.",
      },
    ],
  },
  "portland": {
    requirements: [
      "Portland landlords providing a no-fault termination under Portland City Code (PCC) 30.01.085 must include in the termination notice a written statement advising the tenant of their right to receive relocation assistance and the amount they are owed; failure to include this statement in the notice renders it void.",
      "For no-fault terminations (including owner move-in, demolition, substantial renovation, or simple non-renewal without cause), landlords must pay relocation assistance equal to one month's rent for units rented month-to-month and 1.5 months' rent for fixed-term leases not being renewed, payable within 45 days of the notice.",
      "Landlords must provide tenants with written notice of the reason for any termination; for lease violations, the notice must specify the act or omission constituting the violation and inform the tenant of their right to cure within 30 days, per PCC 30.01.085(D).",
      "Under Oregon state law (ORS 90.322), landlords must provide at least 24 hours' written or verbal notice before entering a rental unit for non-emergency repairs or inspections; Portland does not extend this period, but entry must occur at a reasonable time agreed upon by the parties.",
      "Landlords who include drug/crime-free housing addenda in leases may only use such addenda in compliance with the Oregon Residential Landlord and Tenant Act (ORLTA) safe harbor provisions; addenda that automatically terminate tenancies based on a single arrest (without conviction) are unenforceable under Oregon Fair Housing law.",
    ],
    restrictions: [
      "Under PCC 30.01.085, no-fault terminations (non-renewals without cause) require 90 days' written notice for month-to-month tenancies and for fixed-term leases not being renewed; shorter notice periods are prohibited for any tenancy where the tenant has resided for 12 or more months.",
      "Portland landlords may not retaliate against tenants who report housing code violations, join tenant organizations, or exercise any right under the ORLTA or Portland City Code; retaliation within six months of a protected action is presumed, per ORS 90.385.",
      "Landlords may not use a tenant's source of income (including Section 8 vouchers) as a basis for refusing to rent or imposing different rental terms, per Portland's source-of-income protection ordinance (PCC 23.01.080); violators are subject to civil penalties and private lawsuit.",
      "Portland prohibits landlords from requiring a security deposit greater than the equivalent of two months' rent (one month's rent for tenancies subsidized by a government program); any deposit beyond this cap is voidable by the tenant, per ORS 90.300.",
      "For substantial renovation evictions requiring a City building permit, Portland landlords must provide 90 days' notice and pay enhanced relocation assistance; relocation must be paid in full before the tenant is required to vacate, and landlords who fail to pay lose the right to proceed with the renovation-based eviction.",
    ],
    noticeRequirements: "Portland landlords must give 90 days' written notice for any no-fault termination (including non-renewal of a fixed-term lease), must simultaneously disclose the tenant's right to and amount of relocation assistance in the notice, must provide 30 days to cure for lease violations, and must give 24 hours' advance notice before any non-emergency entry.",
    faq: [
      {
        question: "Does Portland have rent control?",
        answer: "No — Oregon state law (ORS 91.225) preempts local rent control ordinances, so Portland cannot cap rent increases. However, Portland's no-fault termination ordinance (PCC 30.01.085) requires 90 days' notice and relocation assistance for non-renewals, which significantly limits a landlord's practical ability to use lease non-renewal as a backdoor rent increase tool. Statewide AB 1482 equivalent protections (SB 608, 2019) limit rent increases for covered tenancies to 7% plus CPI annually.",
      },
      {
        question: "Am I entitled to relocation assistance if my landlord doesn't renew my lease?",
        answer: "Yes — under PCC 30.01.085, if your landlord terminates your tenancy without cause (including non-renewal of a fixed-term lease) and you have lived in the unit for 12 or more months, you are entitled to relocation assistance equal to one month's rent (month-to-month) or 1.5 months' rent (fixed-term non-renewal). The landlord must include this right and the dollar amount in the termination notice itself; an improperly served notice that omits this information is void. The relocation must be paid within 45 days of the notice.",
      },
      {
        question: "What notice must my landlord give before terminating for a lease violation?",
        answer: "Under PCC 30.01.085(D) and ORS 90.392, for most curable lease violations (unauthorized pet, smoking, noise), the landlord must give a 30-day notice specifying the violation and giving you the opportunity to cure; if you remedy the violation within 30 days, the notice is void and eviction may not proceed on that basis. For the same violation committed three or more times within a 12-month period, the landlord may issue a 10-day unconditional quit notice without opportunity to cure.",
      },
      {
        question: "What is the Portland source-of-income protection and how does it affect my application?",
        answer: "Portland's source-of-income ordinance (PCC 23.01.080) prohibits landlords from refusing to rent or imposing different terms based on a rental applicant's lawful source of income, including Housing Choice Vouchers (Section 8), Veterans Affairs Supportive Housing (VASH) vouchers, and other government assistance programs. Landlords must accept voucher holders through their standard application process and may not advertise 'no Section 8' or apply different screening standards to voucher holders. Complaints can be filed with the Portland Bureau of Development Services, and successful complainants may recover actual damages, emotional distress damages, and attorney's fees.",
      },
    ],
  },
  "minneapolis": {
    requirements: [
      "Landlords must obtain a Certificate of Rental Dwelling (CRD) from the City of Minneapolis for each rental unit before renting; the CRD must be renewed annually, and operating without a valid CRD is a misdemeanor and may result in the City ordering the unit vacated, per Minneapolis Code of Ordinances (MCO) §244.1900.",
      "Landlords must provide new tenants with a written disclosure of the building's current CRD status, any outstanding code violations, and notice that Minneapolis has a Rent Stabilization Ordinance limiting annual rent increases; this disclosure must be provided before lease execution.",
      "Under the Tenant Remedies Action (TRA) process (MCO §504B.385), tenants may petition Hennepin County District Court to appoint a neutral administrator to manage repairs and collect rents when a landlord persistently fails to maintain habitable conditions; the landlord must be given written notice and an opportunity to cure before a TRA is filed.",
      "All leases for Minneapolis rental units must include a clause notifying tenants of their right to petition the City for a rent increase above the 3% annual cap under the Rent Stabilization Ordinance and informing them of the City's tenant services resources.",
      "Minneapolis landlords must respond to emergency repair requests (no heat, water leak, broken locks) within 24 hours and non-emergency habitability requests within a reasonable time not exceeding 14 days; failure to respond triggers the tenant's right to withhold rent under MCO §244.1980.",
    ],
    restrictions: [
      "Under the Minneapolis Rent Stabilization Ordinance (voter-approved November 2021, effective May 1, 2022), annual rent increases for most rental units are capped at 3% per year; the 3% cap applies to the unit, not the tenancy, so the cap resets between tenancies only if the vacancy decontrol exemption applies.",
      "New construction units (those that received a certificate of occupancy within the prior 20 years) are exempt from the 3% rent cap; the exemption lasts 20 years from the date of the original certificate of occupancy, after which the unit becomes subject to the ordinance.",
      "Landlords who wish to increase rent above 3% must petition the City of Minneapolis for an exception; allowable grounds include a landlord's right to a fair return on investment, extraordinary increases in operating costs, and capital improvements; the petition must be filed at least 60 days before the proposed increase effective date.",
      "Landlords may not retaliate against tenants who report code violations, contact City inspectors, organize with other tenants, or assert rights under the Rent Stabilization Ordinance; retaliation within 90 days of protected activity creates a rebuttable presumption of retaliatory conduct under MCO §244.2000.",
      "Landlords may not collect a security deposit in excess of the equivalent of one month's rent, per Minnesota Statutes §504B.178; Minneapolis does not exceed this state limit but enforces it strictly, and failure to return the deposit with an itemized statement within 21 days of vacancy entitles the tenant to double the amount wrongfully withheld plus attorney's fees.",
    ],
    noticeRequirements: "Minneapolis landlords must provide at least 30 days' written notice before any rent increase takes effect (including increases within the 3% cap), must give the required statutory notice for lease termination (typically 3 days for non-payment and 14 days for lease violations under Minnesota state law), and must notify tenants of their right to petition the City for any increase above 3%.",
    faq: [
      {
        question: "Does the Minneapolis Rent Stabilization Ordinance apply to my unit?",
        answer: "The ordinance applies to most residential rental units in Minneapolis except units that received a certificate of occupancy within the prior 20 years (new construction exemption), units in buildings used exclusively as a principal residence by the owner with two or fewer additional units, and units already regulated by a separate government affordability agreement. The 20-year new construction exemption is calculated from the original CO date, not the date you moved in, so a building that received its CO in 2003 became subject to rent stabilization in 2023. You can contact the City of Minneapolis 311 office to verify your unit's status.",
      },
      {
        question: "Can my landlord raise my rent more than 3% per year?",
        answer: "Only with City approval. Under the Minneapolis Rent Stabilization Ordinance, landlords must petition the City for an exception and demonstrate one of the approved grounds (fair return, extraordinary cost increases, capital improvements). The petition must be filed at least 60 days before the proposed increase, and tenants receive written notice and an opportunity to respond before the City issues a decision. Until the City approves the exception, the landlord may not collect any increase above 3%; collecting an unauthorized increase exposes the landlord to civil penalties and a tenant's right to recover the overcharge.",
      },
      {
        question: "What is a Tenant Remedies Action and how can I use it?",
        answer: "A Tenant Remedies Action (TRA) is a court proceeding under MCO §504B.385 and Minnesota Statutes §504B.395 through §504B.471 that allows tenants or a group of tenants to ask Hennepin County District Court to appoint a neutral administrator (receiver) to manage and repair a building when the landlord persistently fails to address habitability conditions. The administrator collects rents, makes repairs, and reports to the court; the landlord receives no rent until the violations are cured. A TRA requires at least 10 days' prior written notice to the landlord before filing.",
      },
      {
        question: "What happens if my landlord operates without a Certificate of Rental Dwelling?",
        answer: "Under MCO §244.1900, operating a rental unit without a valid Certificate of Rental Dwelling is a misdemeanor offense and grounds for the City to issue a correction order or order the unit vacated. More importantly for tenants, if a landlord cannot demonstrate a valid CRD, a tenant may assert this as a defense in an eviction proceeding and may be entitled to withhold rent until the CRD is obtained. Tenants can verify CRD status by searching the Minneapolis rental property database at www.minneapolismn.gov/residents/property/rental.",
      },
    ],
  },
  "san-jose": {
    requirements: [
      "Landlords of units covered by the San Jose Apartment Rent Ordinance (ARO) must register each covered unit with the City of San Jose Rent Stabilization Program and pay the annual registration fee; unregistered landlords may not serve a valid rent increase notice, and tenants may withhold any increase until registration is complete.",
      "Landlords must provide every tenant in an ARO-covered unit with a copy of the ARO Summary (a City-prepared plain-language summary of tenant rights and ARO rules) at the commencement of the tenancy and upon request; failure to provide the summary at move-in is a violation subject to City enforcement.",
      "Before serving any eviction notice for a no-fault reason (including Ellis Act withdrawal or substantial rehabilitation), landlords must file a Notice of Intent to Withdraw or Demolish with the City's Rent Stabilization Program and simultaneously serve tenants with both the eviction notice and the City's relocation assistance schedule.",
      "Landlords must maintain the unit in compliance with the San Jose Housing Code and respond to written habitability complaints within a reasonable time; the City's Code Enforcement Division conducts proactive inspections of ARO-covered buildings, and outstanding violations may preclude approval of rent increase petitions.",
      "Any capital improvement petition or operating expense petition submitted to the ARO hearing officer must include documentation of the landlord's actual costs, evidence that improvements were completed and approved by the City's Building Division, and certification that no outstanding code violations exist on the property.",
    ],
    restrictions: [
      "Annual rent increases for ARO-covered units (buildings with three or more units built before September 7, 1979, not exempt under Costa-Hawkins) are limited to the annual allowable increase set by the ARO board, which is CPI-linked and capped at 5%; for 2024, the ARO board set the allowable increase at 3.0%.",
      "Evictions of ARO-covered tenants require one of 12 enumerated just cause grounds under the ARO, including non-payment of rent, material lease violation, nuisance, owner move-in, rehabilitation requiring tenant vacation, and Ellis Act withdrawal; lease expirations alone do not constitute grounds for eviction.",
      "For Ellis Act withdrawals from the San Jose rental market, landlords must pay relocation assistance of two months' rent per household at the time of the notice; this is in addition to any relocation required under California state law and must be paid before the tenant is required to vacate.",
      "Under Costa-Hawkins, vacancy decontrol applies to ARO-covered units — when a tenant voluntarily vacates, the landlord may set the rent for the next tenancy at market rate; once a new tenancy begins, subsequent increases revert to the ARO annual cap.",
      "Landlords may not impose rent increases more than once per 12-month period for ARO-covered units; any increase above the annual ARO allowable amount requires filing a landlord petition, and the increase may not be collected until the ARO hearing officer issues a written approval.",
    ],
    noticeRequirements: "San Jose ARO landlords must provide at least 30 days' written notice for rent increases up to the allowable ARO amount (60 days if 10% or more), must serve a 3-day notice to pay or quit for non-payment, must give 60 days' notice for owner move-in evictions, and must simultaneously pay two months' relocation assistance when serving Ellis Act withdrawal notices.",
    faq: [
      {
        question: "Does the San Jose ARO cover my apartment?",
        answer: "The ARO generally covers rental units in buildings with three or more units where the building's certificate of occupancy was issued before September 7, 1979, and which are not otherwise exempt (e.g., units sold to a bona fide purchaser after January 1, 1996 under Costa-Hawkins). Single-family homes and condominiums are generally exempt from the rent increase cap but may still be subject to just cause eviction protections under California's AB 1482. You can verify ARO coverage by entering your address at the San Jose Rent Stabilization Program website (sanjoseca.gov/rent).",
      },
      {
        question: "How much can my landlord raise my rent each year?",
        answer: "For ARO-covered units, the maximum annual increase is the allowable percentage set by the ARO board each year (CPI-linked, capped at 5%); for 2024, the board set the allowable increase at 3.0%. The landlord may petition for a higher increase based on documented capital improvements, increased operating costs, or a fair return claim, but the higher amount cannot be collected until the ARO hearing officer approves it in writing. For units covered only by AB 1482 (California statewide), the cap is 5% plus local CPI, not to exceed 10%.",
      },
      {
        question: "What relocation assistance am I owed for an Ellis Act eviction?",
        answer: "If your landlord withdraws the building from the rental market under the Ellis Act (California Government Code §7060), San Jose requires payment of two months' rent as relocation assistance under the ARO, in addition to any relocation assistance required by state law. This payment must be tendered at the time the eviction notice is served. Tenants who are elderly (62 or older), disabled, or have minor children are entitled to extended notice periods (up to one year) before being required to vacate under California state law, and the San Jose ARO does not reduce these state protections.",
      },
      {
        question: "What are the owner move-in eviction rules in San Jose?",
        answer: "Under the San Jose ARO, a landlord may evict a tenant so that the landlord or a qualifying family member can occupy the unit as their principal residence, but the landlord must serve 60 days' written notice (not the standard 30 days), the owner or family member must actually move in within 90 days of the tenant vacating and reside there for at least 36 consecutive months, and the landlord may not re-rent the unit to anyone else within that period. Violation of these conditions entitles the evicted tenant to actual damages, three times the monthly rent per month of wrongful re-rental, and attorney's fees under the ARO.",
      },
    ],
  },
  "santa-monica": {
    requirements: [
      "Landlord must register the rental unit annually with the Santa Monica Rent Control Board (SMRB) and pay the required registration fee before collecting rent.",
      "Owner must file for any annual general adjustment petition with the SMRB to apply the board-approved rent increase to covered units.",
      "Landlord must provide tenants in rent-controlled units with the current rent ceiling in writing at the start of tenancy.",
      "No-fault eviction (e.g., owner move-in, demolition) requires payment of relocation assistance equal to three months' rent before the tenant vacates.",
      "Landlord must comply with vacancy decontrol procedures: once a covered unit is vacated, the new initial rent must be established and reported to the SMRB before re-renting.",
    ],
    restrictions: [
      "Rent increases on pre-April 1979 buildings with four or more units are capped at the SMRB's annual general adjustment percentage; unilateral increases above that ceiling are prohibited.",
      "Landlord may not evict a tenant in a rent-controlled unit without one of the just-cause grounds enumerated in the Santa Monica Rent Control Charter Amendment (Article XVIII).",
      "Costa-Hawkins Rental Housing Act prohibits the city from imposing rent control on single-family homes and condominiums, but all other covered units remain subject to Article XVIII.",
      "Owner move-in evictions are restricted: the landlord or a qualified family member must actually occupy the unit for at least one year after the tenant vacates.",
      "Landlord may not demand or accept a rent amount that exceeds the lawful rent ceiling on file with the SMRB, even with tenant consent.",
    ],
    noticeRequirements: "Landlords must provide written notice of any rent increase at least 30 days in advance for increases under 10%, and 90 days in advance for increases of 10% or more, in accordance with California Civil Code §827 as applied within Santa Monica's rent-control framework.",
    faq: [
      {
        question: "Which Santa Monica rental units are covered by rent control?",
        answer: "The Santa Monica Rent Control Charter Amendment (Article XVIII) covers most residential rental units built before April 10, 1979, in buildings with four or more units. Single-family homes, condominiums, and units first rented after April 10, 1979 are generally exempt under the Costa-Hawkins Rental Housing Act. Check the SMRB's online registry if you are unsure whether a specific unit is covered.",
      },
      {
        question: "What happens to the rent when a rent-controlled unit becomes vacant?",
        answer: "Santa Monica applies vacancy decontrol under Costa-Hawkins: when a covered unit is voluntarily vacated or the tenancy ends through an allowable eviction, the landlord may reset the rent to any amount for the new tenancy. However, once the new tenancy begins, the unit re-enters rent control and future increases are again limited to SMRB-approved adjustments.",
      },
      {
        question: "Can a landlord evict a tenant without cause in Santa Monica?",
        answer: "No. Article XVIII of the Santa Monica Rent Control Charter requires just cause for eviction of tenants in covered units. Allowable grounds include nonpayment of rent, lease violations, and owner move-in, among others. For no-fault grounds such as owner move-in or demolition, the landlord must pay relocation assistance equal to three months' rent before the tenant leaves.",
      },
      {
        question: "What is the annual SMRB registration fee and who pays it?",
        answer: "The Santa Monica Rent Control Board sets the annual registration fee each year; the fee is typically split between the landlord and the tenant, with the landlord responsible for filing and paying the full fee to the Board. Failure to register a covered unit can result in the landlord being unable to collect or increase rent legally. Contact the SMRB directly for the current fee schedule.",
      },
    ],
  },
  "berkeley": {
    requirements: [
      "Landlord must register each covered rental unit with the Berkeley Rent Stabilization Board and pay the annual registration fee (currently approximately $280 per unit), with 50% lawfully passed through to the tenant.",
      "Owner must provide each new tenant with a written copy of the Berkeley Rent Stabilization and Arbitration Ordinance summary and the current lawful rent at the start of tenancy.",
      "No-fault evictions (e.g., owner move-in, capital improvements requiring vacancy) require payment of relocation assistance of at least three months' rent before the tenant vacates.",
      "Landlord must maintain the unit in habitable condition and respond to the Berkeley Rent Board's habitability petition process if a tenant files a complaint.",
      "Any rent increase above the board's annual allowable increase must be petitioned through the Berkeley Rent Board's individual adjustment process before being charged.",
    ],
    restrictions: [
      "Annual rent increases for pre-1980 covered units are capped at the Berkeley Rent Board's annual general adjustment, which tracks CPI; increases above this cap without board approval are void.",
      "Eviction of a tenant in a covered unit is prohibited unless one of the twelve just-cause grounds in the Berkeley Rent Stabilization Ordinance (Measure Y) is established.",
      "Costa-Hawkins limits the city's ability to impose vacancy control: upon a lawful vacancy, the landlord may reset rent to market rate for the incoming tenant, after which stabilization applies again.",
      "Owner move-in evictions are restricted to the landlord or specified family members who must occupy the unit as their primary residence for at least 36 consecutive months.",
      "Landlord may not retaliate against a tenant for filing a habitability or rent petition with the Berkeley Rent Board; retaliatory eviction notices are void under the ordinance.",
    ],
    noticeRequirements: "Berkeley requires landlords to give at least 30 days' written notice for rent increases under 10% and 90 days' written notice for increases of 10% or more; notices of eviction for just-cause grounds must also comply with the specific timing requirements in the Berkeley Rent Stabilization Ordinance.",
    faq: [
      {
        question: "Which Berkeley units are covered by rent stabilization?",
        answer: "The Berkeley Rent Stabilization Ordinance (Measure Y, as amended) covers most rental units in buildings constructed before January 1, 1980. Exempt units include single-family homes, condominiums, and units in owner-occupied buildings with four or fewer units. Costa-Hawkins further limits rent control on newly constructed or owner-occupied properties.",
      },
      {
        question: "How is the annual allowable rent increase determined in Berkeley?",
        answer: "The Berkeley Rent Board sets the annual allowable increase each year based on changes in the Consumer Price Index (CPI) for the San Francisco Bay Area. Historically this has been in the range of 1–3%. Landlords who believe their costs justify a higher increase may petition the Rent Board for an individual rent adjustment.",
      },
      {
        question: "What are a tenant's options if the landlord fails to maintain habitability?",
        answer: "A Berkeley tenant may file a habitability petition with the Rent Board, which can result in a reduction of the lawful rent ceiling until defects are corrected. Tenants may also contact the City's Housing Code Enforcement division. The Rent Board's process is separate from and in addition to California state law remedies such as rent withholding under Civil Code §1942.",
      },
      {
        question: "What relocation assistance is required for no-fault evictions in Berkeley?",
        answer: "Under the Berkeley Rent Stabilization Ordinance, landlords pursuing a no-fault eviction—such as owner move-in or substantial rehabilitation—must pay relocation assistance of at least three months' rent. Additional amounts may apply depending on tenant circumstances, such as disability or long-term tenancy. Payment must be made before or at the time the notice to vacate is served.",
      },
    ],
  },
  "philadelphia": {
    requirements: [
      "Landlord must obtain a Rental License from the City of Philadelphia Department of Licenses and Inspections (L&I) before renting any residential unit; a new license is required for each property.",
      "Before a new tenant takes occupancy, landlord must obtain a Certificate of Rental Suitability from L&I confirming the unit passed inspection or meets applicable housing code standards.",
      "Landlord must provide each tenant with a copy of the City of Philadelphia 'Partners in Good Housing' tenant rights summary at lease signing.",
      "For units in buildings constructed before 1978, landlord must provide a lead paint disclosure and obtain a lead-safe or lead-free certification under the Philadelphia Lead Paint Disclosure and Certification Law.",
      "Landlord must disclose in writing any known history of bed bug infestation in the unit or building for the preceding one-year period, as required by Philadelphia's Bed Bug Disclosure Law.",
    ],
    restrictions: [
      "Landlord may not rent a unit without a valid Rental License; renting without a license can result in civil penalties and may limit the landlord's ability to collect rent or pursue eviction.",
      "Landlord may not rent a pre-1978 unit that lacks a valid lead-safe or lead-free certification; leasing such a unit exposes the landlord to significant liability under Philadelphia's Lead Paint Disclosure and Certification Law.",
      "Landlord must provide a receipt for every rent payment made in cash; failure to do so is a violation of Philadelphia's landlord-tenant regulations.",
      "Short-term rental of residential units is prohibited without a separate Short-Term Rental License and compliance with the City's owner-occupancy and registration requirements.",
      "Landlord may not withhold the Certificate of Rental Suitability or refuse to allow L&I inspection as a condition of tenancy; interference with the inspection process is a code violation.",
    ],
    noticeRequirements: "Philadelphia landlords must provide at least 30 days' written notice to terminate a month-to-month tenancy, and the notice must be served in compliance with Philadelphia Municipal Court procedural rules before a landlord-tenant action can be filed.",
    faq: [
      {
        question: "What is the Certificate of Rental Suitability and when is it required?",
        answer: "The Certificate of Rental Suitability is a document issued by Philadelphia's Department of Licenses and Inspections confirming that a residential unit meets the city's basic housing code standards. A landlord must obtain and provide this certificate to the tenant before or at the commencement of each new tenancy. Operating without a valid certificate can expose the landlord to fines and jeopardize the enforceability of the lease.",
      },
      {
        question: "Is a Rental License required for every residential rental in Philadelphia?",
        answer: "Yes. Philadelphia requires all landlords—regardless of the number of units—to obtain a Rental License from the Department of Licenses and Inspections before renting any residential property. The license must be renewed annually and the current license number should appear on the lease. Renting without a valid license is a violation of the Philadelphia Code.",
      },
      {
        question: "What are the lead paint disclosure requirements for older Philadelphia buildings?",
        answer: "Under the Philadelphia Lead Paint Disclosure and Certification Law (Philadelphia Code §6-800), landlords of residential units in buildings constructed before 1978 must obtain a lead-safe or lead-free certification from a certified lead inspector before a new tenancy begins. The landlord must provide a copy of the certification to the tenant. Failure to comply can result in civil penalties and potential liability for lead exposure.",
      },
      {
        question: "What does the Bed Bug Disclosure Law require of Philadelphia landlords?",
        answer: "Philadelphia's Bed Bug Disclosure Law requires landlords to disclose in writing, before lease signing, any known history of bed bug infestation in the rental unit or the building during the preceding 12-month period. The disclosure must be provided even if the infestation has been remediated. This requirement applies to all residential rental units in the city.",
      },
    ],
  },
  "baltimore": {
    requirements: [
      "Landlord must obtain an annual Rental Dwelling License from the Baltimore City Department of Housing and Community Development (DHCD) before renting any residential unit.",
      "For units in buildings constructed before 1950 (or pre-1978 where applicable), landlord must obtain a Risk Reduction Certificate (lead paint inspection) from the Maryland Department of the Environment or a qualified inspector before each new tenancy.",
      "Landlord must hold the tenant's security deposit in a separate interest-bearing account and provide written notice of the financial institution and account number within 30 days of receipt.",
      "Landlord must return the security deposit—with accrued interest—within 45 days after the tenant vacates, along with an itemized written statement of any deductions.",
      "Landlord must provide each tenant with a Truth in Renting notice summarizing tenant rights under Maryland and Baltimore City law at the commencement of tenancy.",
    ],
    restrictions: [
      "Landlord may not rent a unit that lacks a valid Rental Dwelling License; leasing an unlicensed unit can result in civil fines and may void the landlord's right to collect rent.",
      "Landlord may not rent a pre-1950 unit (or applicable pre-1978 unit) without a valid Risk Reduction Certificate; failure to comply exposes the landlord to strict liability for lead paint violations under the Maryland Reduction of Lead Risk in Housing Act.",
      "Under the Baltimore City Rent Escrow Act, if a landlord fails to repair conditions that constitute a substantial and serious threat to health or safety, a tenant may petition the District Court to pay rent into an escrow account until repairs are completed.",
      "Landlord may not deduct from the security deposit for normal wear and tear; only documented damage beyond ordinary use may be charged, and deductions must be itemized in writing.",
      "Landlord may not charge a security deposit exceeding two months' rent under Maryland law (Md. Code, Real Property §8-203), and this cap applies to all Baltimore City residential tenancies.",
    ],
    noticeRequirements: "Baltimore City requires at least 30 days' written notice to terminate a month-to-month residential tenancy, and the notice must be provided to the tenant at the rental unit or by certified mail in compliance with Maryland Real Property §8-402.",
    faq: [
      {
        question: "What is the Baltimore City Rent Escrow Act and when can a tenant use it?",
        answer: "The Baltimore City Rent Escrow Act allows a tenant to petition the District Court to deposit rent into a court-supervised escrow account rather than paying it to the landlord when the rental unit has conditions that constitute a substantial and serious threat to the life, health, or safety of occupants. The court may order the escrowed funds to be used to pay for repairs or may reduce rent until the conditions are corrected. A tenant should document all complaints and the landlord's failure to respond before filing.",
      },
      {
        question: "What lead paint requirements apply in Baltimore City?",
        answer: "Under the Maryland Reduction of Lead Risk in Housing Act and Baltimore City regulations, landlords of residential units in pre-1950 buildings (and some pre-1978 buildings) must obtain a Risk Reduction Certificate from a qualified inspector before each new tenancy. The certificate documents that the property has been inspected and that lead hazards have been treated or are not present. Failure to comply can result in civil liability for lead poisoning and significant fines.",
      },
      {
        question: "How must a landlord handle the security deposit in Baltimore?",
        answer: "Baltimore City landlords must deposit the security deposit in a separate interest-bearing account and provide the tenant with written notice of the institution and account number within 30 days. Upon move-out, the landlord must return the deposit—plus interest—within 45 days, along with a written itemized list of any deductions. Failure to comply can result in the landlord forfeiting the right to retain any portion of the deposit.",
      },
      {
        question: "Is a Rental Dwelling License required for all Baltimore City rentals?",
        answer: "Yes. All residential rental properties in Baltimore City must be licensed annually through the Department of Housing and Community Development. The license must be renewed each year and the landlord must certify that the property meets applicable housing code standards. Renting without a valid license is a violation of Baltimore City Code Article 13 and can result in fines and loss of rent collection rights.",
      },
    ],
  },
  "jersey-city": {
    requirements: [
      "Landlord must register the rental unit with the Jersey City Rent Leveling Office before renting any unit covered by the Jersey City Rent Control Ordinance (buildings with four or more units constructed before November 1987).",
      "Before re-renting a covered unit, landlord must obtain a Certificate of Habitability from the Jersey City Division of Housing Preservation confirming the unit meets applicable housing code standards.",
      "Landlord must apply the annual allowable rent increase set by the Rent Leveling Board (CPI-based) and may not charge an amount above the registered maximum allowable rent.",
      "For no-fault evictions of rent-controlled tenants, landlord must pay relocation assistance equal to two months' rent before the tenant vacates.",
      "Landlord must provide each tenant in a rent-controlled unit with written notice of the registered maximum allowable rent and the tenant's right to petition the Rent Leveling Board.",
    ],
    restrictions: [
      "Rent increases for covered units are limited to the annual allowable increase established by the Rent Leveling Board; increases above this amount without board approval are void and subject to rollback.",
      "Eviction of a tenant in a covered unit requires one of ten just-cause grounds enumerated in the Jersey City Rent Control Ordinance; month-to-month terminations without cause are not permitted for covered tenants.",
      "Landlord may not re-rent a covered unit to a new tenant without first obtaining a Certificate of Habitability; renting without this certificate exposes the landlord to fines.",
      "Landlord may not retaliate against a tenant for reporting housing code violations or filing a petition with the Rent Leveling Board; retaliatory eviction is prohibited under the ordinance.",
      "Landlord may not charge a tenant for the cost of registering the unit with the Rent Leveling Office; registration is solely the landlord's obligation and cost.",
    ],
    noticeRequirements: "Jersey City rent-controlled tenants must receive at least 30 days' written notice for any rent increase, and eviction notices for just-cause grounds must comply with New Jersey Anti-Eviction Act (N.J.S.A. 2A:18-61.1) timing requirements specific to the cause alleged.",
    faq: [
      {
        question: "Which Jersey City rentals are covered by rent control?",
        answer: "The Jersey City Rent Control Ordinance covers residential rental units in buildings with four or more units that were constructed before November 1987. Newly constructed buildings and certain owner-occupied buildings with three or fewer units are generally exempt. Landlords should verify coverage status with the Rent Leveling Office before setting or increasing rent.",
      },
      {
        question: "How is the annual rent increase set in Jersey City?",
        answer: "The Jersey City Rent Leveling Board sets the annual allowable increase based on the Consumer Price Index (CPI) for the New York-Newark-Jersey City metropolitan area. The board announces the allowable percentage each year, and landlords of covered units may not exceed this amount without filing a petition for an additional increase based on documented cost increases. Petitions must be filed with and approved by the Rent Leveling Board.",
      },
      {
        question: "What is the Certificate of Habitability and when is it required?",
        answer: "A Certificate of Habitability is issued by the Jersey City Division of Housing Preservation after an inspector confirms that the rental unit meets minimum housing code standards. It is required before a landlord re-rents a covered unit to a new tenant. The certificate ensures that incoming tenants are not placed in substandard housing and is a prerequisite for lawfully collecting rent on a newly tenanted covered unit.",
      },
      {
        question: "What are the just-cause eviction grounds in Jersey City?",
        answer: "The Jersey City Rent Control Ordinance and the New Jersey Anti-Eviction Act (N.J.S.A. 2A:18-61.1) together provide ten enumerated just-cause grounds for eviction of rent-controlled tenants, including nonpayment of rent, habitual late payment, lease violations, disorderly conduct, willful damage to the unit, and owner move-in for personal use. Landlords must plead the specific just-cause ground in any eviction complaint filed with the court.",
      },
    ],
  },
  "newark": {
    requirements: [
      "Landlord must register the rental property with the Newark Rent Control Board under Ordinance 6S&FE before collecting rent from any covered tenant.",
      "Before each new tenancy, landlord must obtain a Certificate of Code Compliance from the City of Newark confirming the unit meets applicable housing and property maintenance code standards.",
      "Landlord must hold the tenant's security deposit in a separate, interest-bearing bank account and provide the tenant with the name and account number of the institution within 30 days of receipt.",
      "Landlord must apply only the annual allowable rent increase (5% or CPI, whichever is less) and may not charge above the registered maximum rent without board approval.",
      "Landlord must provide covered tenants with written notice of their rights under the Newark Rent Control Ordinance at the commencement of tenancy.",
    ],
    restrictions: [
      "Rent increases for covered multi-family units under Newark Ordinance 6S&FE are capped at the lesser of 5% or the current CPI; any increase above this amount is void without Rent Control Board approval.",
      "Eviction of a tenant in a rent-controlled unit requires just cause as defined by the New Jersey Anti-Eviction Act (N.J.S.A. 2A:18-61.1); no-cause terminations for covered tenants are prohibited.",
      "Landlord may not rent a unit without a valid Certificate of Code Compliance; leasing without the certificate exposes the landlord to municipal fines and potential inability to collect rent.",
      "Security deposits must be maintained in a separate account; commingling of the deposit with the landlord's personal or operating funds is prohibited and subject to penalty.",
      "Landlord may not increase rent during the term of a lease without the tenant's written consent, even if the annual allowable increase date falls within the lease period.",
    ],
    noticeRequirements: "Newark landlords must provide at least 30 days' written notice of any rent increase to covered tenants, and any notice of eviction must comply with the New Jersey Anti-Eviction Act's specific notice requirements for the just-cause ground being asserted.",
    faq: [
      {
        question: "What units does the Newark Rent Control Ordinance cover?",
        answer: "Newark's Rent Control Ordinance (Ordinance 6S&FE) covers most residential rental units in multi-family buildings within the city. Newly constructed buildings and certain owner-occupied small buildings may be exempt. Landlords should register with the Newark Rent Control Board to confirm coverage status and obtain the lawful maximum rent for each unit.",
      },
      {
        question: "How is the annual rent increase calculated in Newark?",
        answer: "The Newark Rent Control Ordinance caps annual rent increases at the lesser of 5% or the percentage change in the Consumer Price Index (CPI). The Rent Control Board publishes the allowable increase annually. Landlords seeking a higher increase due to documented cost increases—such as significant capital improvements—must file a petition with the Board for approval before implementing the higher amount.",
      },
      {
        question: "What is the Certificate of Code Compliance and who issues it?",
        answer: "The Certificate of Code Compliance is issued by the City of Newark's housing inspections division after confirming that the rental unit meets the city's minimum property maintenance and housing code standards. A new certificate is required before each new tenancy. The certificate protects incoming tenants from substandard conditions and is a legal prerequisite for lawfully entering into a new lease in Newark.",
      },
      {
        question: "What are the security deposit rules specific to Newark?",
        answer: "Under both New Jersey state law and the Newark Rent Control Ordinance, security deposits must be held in a separate, interest-bearing bank account distinct from the landlord's personal and operating funds. The landlord must notify the tenant in writing of the institution and account number within 30 days of receiving the deposit. The deposit—with accrued interest—must be returned within 30 days after the tenant vacates, accompanied by an itemized statement of any deductions.",
      },
    ],
  },
  "denver": {
    requirements: [
      "Landlord must comply with Denver's source-of-income anti-discrimination ordinance (Denver Municipal Code §28-173), which prohibits refusing to rent, negotiate, or set different terms based on a prospective tenant's use of Section 8 vouchers or other lawful sources of income.",
      "Before filing an eviction complaint for nonpayment of rent, landlord must offer the tenant participation in the Denver Eviction Diversion Program or connect them with available rental assistance resources.",
      "Landlord must provide a 10-day written notice to cure or quit for nonpayment of rent before initiating eviction proceedings under Colorado law, as applied within Denver.",
      "Landlord must comply with Denver's Fair Housing Ordinance, which expands protected classes beyond state and federal law to include source of income, marital status, sexual orientation, and gender identity.",
      "Landlord must honor any legal aid or Right to Counsel (RTC) representation that a low-income tenant facing eviction has obtained through Denver-funded programs; interference with counsel is prohibited.",
    ],
    restrictions: [
      "Landlord may not refuse to accept housing vouchers (including Section 8/HCV) or impose different lease terms, deposits, or fees based solely on a tenant's use of a housing subsidy, under Denver Municipal Code §28-173.",
      "Landlord may not proceed directly to court for an eviction without first providing the tenant with the required 10-day notice and, where applicable, offering diversion resources; failure to follow this sequence can result in dismissal of the eviction case.",
      "Landlord may not discriminate against any protected class identified in the Denver Fair Housing Ordinance, including source of income; violations are enforceable by the Denver Office of Human Rights.",
      "Landlord may not retaliate against a tenant for reporting housing code violations to Denver's Community Planning and Development or seeking assistance through city eviction diversion programs.",
      "Landlord may not interfere with a tenant's right to seek or obtain legal counsel through Denver's Right to Counsel program or other city-funded legal assistance services.",
    ],
    noticeRequirements: "Denver landlords must serve a 10-day notice to pay rent or quit before filing for eviction for nonpayment, and must provide a 91-day notice (or the statutory period, whichever is greater) for no-fault terminations of tenancies under applicable Colorado and city regulations.",
    faq: [
      {
        question: "Does Denver prohibit discrimination based on source of income?",
        answer: "Yes. Denver Municipal Code §28-173 prohibits landlords from refusing to rent, failing to negotiate, or imposing different terms or conditions based on a prospective or current tenant's lawful source of income, including Section 8 Housing Choice Vouchers, emergency rental assistance, or other housing subsidies. This protection applies to all residential rental housing in Denver and is enforced by the Denver Office of Human Rights.",
      },
      {
        question: "What is the Denver Eviction Diversion Program and does it apply to my property?",
        answer: "The Denver Eviction Diversion Program is a city-funded initiative that connects tenants facing eviction for nonpayment with rental assistance and mediation services. Before filing an eviction complaint in Denver County Court, landlords are expected to inform tenants of available diversion resources and allow time to apply. The program applies broadly to residential tenancies in Denver and is designed to reduce court filings and housing instability.",
      },
      {
        question: "What additional protected classes does Denver's Fair Housing Ordinance cover?",
        answer: "Denver's Fair Housing Ordinance expands on federal and state fair housing law by adding source of income, marital status, sexual orientation, gender identity, and gender expression as protected classes in housing. This means a Denver landlord cannot refuse to rent or impose different conditions on a tenant based on any of these characteristics, in addition to the federally protected classes (race, color, national origin, religion, sex, familial status, disability).",
      },
      {
        question: "What is Denver's Right to Counsel program for tenants?",
        answer: "Denver's Right to Counsel (RTC) program provides free legal representation to income-qualified tenants facing eviction in Denver County Court. Funded by the City and County of Denver, the program connects eligible tenants with legal aid attorneys who can represent them at eviction hearings. Landlords must not interfere with a tenant's access to or participation in this program; doing so could constitute obstruction and affect the outcome of eviction proceedings.",
      },
    ],
  },
  "boston": {
    requirements: [
      "Landlord must ensure the rental unit passes inspection by the Boston Inspectional Services Department (ISD) or the Board of Health upon tenant complaint; violations must be remediated within the timeframes specified in the inspection notice.",
      "For units in buildings constructed before 1978, landlord must provide a lead paint inspection and obtain a letter of full compliance or interim control letter from a licensed lead inspector before a child under six years old resides in the unit.",
      "Last month's rent, if collected, must be held in a separate interest-bearing bank account, and the tenant must receive annual written statements of accrued interest.",
      "Security deposits must be held in a separate interest-bearing account at a Massachusetts bank; within 30 days of receipt, landlord must provide a written receipt with the institution name, account number, and a description of the unit's condition (if deductions are anticipated).",
      "Landlord who operates a short-term rental (STR) through platforms such as Airbnb must be an owner-occupant of the property and hold a valid City of Boston STR license; investor-owned units may not be used as STRs.",
    ],
    restrictions: [
      "Landlord may not commingle last month's rent or a security deposit with personal or operating funds; separate interest-bearing accounts are required for each under Massachusetts General Laws Chapter 186 §15B.",
      "Landlord may not deduct from the security deposit without providing a written itemized list of damages within 30 days of the tenant's departure; failure to comply results in forfeiture of the right to retain any portion of the deposit.",
      "Landlord may not rent or continue to rent a unit that the Boston Board of Health has declared unfit for human habitation; the landlord must remediate conditions before resuming occupancy.",
      "Owner of a non-owner-occupied unit may not operate that unit as a short-term rental under Boston's Short-Term Rental Ordinance (BPDA Ordinance No. 2018); only owner-occupied units and their accessory units may be licensed as STRs.",
      "Landlord may not increase rent or serve an eviction notice in retaliation for a tenant's report of housing code violations to the Boston ISD or Board of Health; retaliatory acts are prohibited under M.G.L. Chapter 186 §18.",
    ],
    noticeRequirements: "Boston landlords must provide at least 30 days' written notice to terminate a month-to-month tenancy (or a notice equal to the rental period, whichever is longer), and any rent increase requires advance written notice consistent with the lease term and Massachusetts General Laws Chapter 186.",
    faq: [
      {
        question: "What are Boston's security deposit rules for residential leases?",
        answer: "Under Massachusetts General Laws Chapter 186 §15B, Boston landlords must hold security deposits in a separate, interest-bearing account at a bank located in Massachusetts. Within 30 days of receiving the deposit, the landlord must provide a written receipt stating the institution name, account number, and the current condition of the unit if the landlord intends to make deductions. The deposit plus accrued interest must be returned within 30 days of move-out, accompanied by an itemized damage list if any deductions are made.",
      },
      {
        question: "What lead paint obligations apply to Boston landlords of pre-1978 buildings?",
        answer: "Massachusetts Lead Law (M.G.L. Chapter 111 §197A) requires landlords to have units in pre-1978 buildings inspected for lead paint hazards when a child under six years old will reside there. A licensed lead inspector must certify either full compliance (all lead removed) or interim control (hazards managed). Boston's Inspectional Services Department enforces this requirement, and landlords who fail to comply face significant civil liability and fines.",
      },
      {
        question: "Can a Boston landlord operate a short-term rental in their investment property?",
        answer: "No. Under Boston's Short-Term Rental Ordinance, only owner-occupants may obtain a STR license for their primary residence and, in some cases, one additional unit on the same property. Investor-owned properties where the owner does not reside are not eligible for a STR license. Unauthorized short-term rentals are subject to fines and enforcement action by the City of Boston.",
      },
      {
        question: "What happens if a tenant reports a housing code violation in Boston?",
        answer: "Tenants may report housing code violations to the Boston Inspectional Services Department (ISD) or the Board of Health, which will inspect the property and issue a violation notice requiring remediation within a specified timeframe. If the landlord fails to remedy serious conditions, the Board of Health may order the unit vacated. Importantly, any rent increase or eviction notice served within six months of a tenant's complaint is presumed retaliatory under M.G.L. Chapter 186 §18, and the landlord bears the burden of proving a non-retaliatory purpose.",
      },
    ],
  },
  "long-beach": {
    requirements: [
      "Landlord must register all residential rental units with the City of Long Beach annually under the Long Beach Rental Housing Inspection Program, paying the required registration fee.",
      "Before issuing a no-fault eviction notice, landlord must pay relocation assistance equal to one month's rent to qualified tenants in covered units under the Long Beach Tenant Protections Ordinance (2021).",
      "Landlord must provide each new tenant with a written notice of their rights under the Long Beach Tenant Protections Ordinance, including information about just-cause eviction protections.",
      "For buildings constructed before 1978 with two or more units, landlord must comply with California's AB1482 statewide just-cause eviction requirements for units not otherwise covered by Long Beach's local ordinance.",
      "Landlord must comply with the 60-day written notice requirement for no-fault terminations when the tenant has resided in the unit for more than one year, as required by the Long Beach Tenant Protections Ordinance.",
    ],
    restrictions: [
      "Eviction of a tenant in a covered unit (pre-1978 building with two or more units) without one of the just-cause grounds listed in the Long Beach Tenant Protections Ordinance is prohibited.",
      "Landlord may not serve a no-fault eviction notice without simultaneously tendering the required one-month relocation assistance payment to qualified tenants.",
      "Landlord may not retaliate against a tenant for exercising rights under the Long Beach Tenant Protections Ordinance, including filing complaints with the city's Code Enforcement division.",
      "Landlord may not impose rent increases that exceed the AB1482 statewide cap (5% + CPI, up to 10%) for units covered by the California Tenant Protection Act; Long Beach has not enacted a separate local rent control ordinance.",
      "Landlord may not evict a tenant for owner move-in without complying with the specific documentation and notice requirements of the Long Beach Tenant Protections Ordinance, including proof of intent to occupy.",
    ],
    noticeRequirements: "Long Beach requires a 60-day written notice for no-fault terminations when the tenant has resided in the unit for more than one year, and a 30-day notice when the tenancy is less than one year; these requirements are in addition to California Civil Code §1946.1 and the Long Beach Tenant Protections Ordinance (2021).",
    faq: [
      {
        question: "Which Long Beach rental units are covered by the Tenant Protections Ordinance?",
        answer: "The Long Beach Tenant Protections Ordinance (adopted 2021) covers residential rental units in buildings constructed before 1978 with two or more units. Single-family homes, condominiums sold separately, and newer construction may be exempt from local just-cause protections but may still be subject to AB1482 statewide protections for buildings 15 or more years old. Tenants and landlords should verify coverage based on the property's construction date and unit count.",
      },
      {
        question: "What relocation assistance is required for no-fault evictions in Long Beach?",
        answer: "Under the Long Beach Tenant Protections Ordinance, qualified tenants who are displaced through a no-fault eviction (such as owner move-in, substantial rehabilitation, or withdrawal of the unit from the rental market) are entitled to relocation assistance equal to one month's rent. The landlord must provide this payment at the time the no-fault eviction notice is served. Failure to pay relocation assistance renders the eviction notice defective.",
      },
      {
        question: "Does Long Beach have its own rent control ordinance?",
        answer: "Long Beach does not have a local rent control ordinance. However, many Long Beach rental units are subject to the California Tenant Protection Act (AB1482), which caps annual rent increases at 5% plus local CPI, up to a maximum of 10%, for covered buildings 15 or more years old. Landlords and tenants should check whether their specific unit falls under AB1482's coverage or is otherwise exempt.",
      },
      {
        question: "What is the annual rental registration requirement in Long Beach?",
        answer: "Long Beach requires landlords to register all residential rental units with the city under the Rental Housing Inspection Program. Registration must be renewed annually, and the registration fee is based on the number of units. The program allows the city to proactively inspect rental properties for code compliance. Failure to register can result in fines and may affect the landlord's ability to enforce lease terms.",
      },
    ],
  },
  "san-diego": {
    requirements: [
      "Landlord must provide all tenants in covered units (buildings with four or more units constructed before July 2022) with a written notice of their rights under the San Diego Renters' Rights Ordinance (local just-cause eviction protection).",
      "For no-fault evictions of tenants who have resided in the unit for one year or more, landlord must provide 60 days' written notice; tenants with less than one year of occupancy are entitled to 30 days' notice.",
      "Landlord must pay relocation assistance equal to one month's rent to tenants displaced through a no-fault eviction under the San Diego Renters' Rights Ordinance.",
      "Landlord must provide each new tenant with a copy of the California Department of Fair Employment and Housing Fair Housing pamphlet at the commencement of tenancy.",
      "Landlord who rents a unit as a short-term rental must obtain a Short-Term Residential Occupancy (STRO) license from the City of San Diego and may only do so for the landlord's primary residence.",
    ],
    restrictions: [
      "Eviction of a tenant in a covered unit (4+ units, pre-July 2022 construction) without one of the just-cause grounds specified in the San Diego Renters' Rights Ordinance is prohibited.",
      "Landlord may not serve a no-fault eviction notice without simultaneously providing the required one-month relocation assistance payment to the displaced tenant.",
      "Landlord may not operate a short-term rental of a non-primary-residence unit without a valid STRO license; unlicensed STR operations are subject to fines enforced by the City of San Diego.",
      "For buildings 15 or more years old not otherwise covered by local just-cause rules, landlord may not impose rent increases exceeding the AB1482 statewide cap (5% + CPI, up to 10% annually).",
      "Landlord may not retaliate against a tenant for reporting housing code violations to the City of San Diego's Development Services Department or for exercising rights under the Renters' Rights Ordinance.",
    ],
    noticeRequirements: "San Diego landlords must provide 30 days' written notice for no-fault termination when the tenant has occupied the unit for less than one year, and 60 days' notice when the tenant has occupied the unit for one year or more, consistent with the San Diego Renters' Rights Ordinance and California Civil Code §1946.1.",
    faq: [
      {
        question: "Which San Diego rentals are covered by the local just-cause eviction ordinance?",
        answer: "The San Diego Renters' Rights Ordinance provides local just-cause eviction protections for tenants in residential units within buildings containing four or more dwelling units that were constructed before July 1, 2022. Units in smaller buildings, newly constructed buildings, and certain owner-occupied properties may be exempt from local protections but may still be covered by AB1482's statewide just-cause rules for buildings 15 or more years old.",
      },
      {
        question: "What relocation assistance must a San Diego landlord pay for no-fault evictions?",
        answer: "Under the San Diego Renters' Rights Ordinance, landlords pursuing a no-fault eviction of a covered tenant—such as owner move-in, demolition, or substantial rehabilitation—must pay relocation assistance equal to one month's rent. This payment must be provided at or before the time the eviction notice is served. Serving a no-fault eviction notice without tendering relocation assistance is a defect that can result in dismissal of any subsequent unlawful detainer action.",
      },
      {
        question: "How does AB1482 interact with San Diego's local ordinance?",
        answer: "San Diego's local Renters' Rights Ordinance and California's AB1482 (Tenant Protection Act of 2019) operate in parallel. AB1482 applies to buildings that are 15 or more years old and imposes a statewide rent cap (5% + CPI, up to 10%) and just-cause eviction requirement for covered units. San Diego's local ordinance covers buildings with four or more units built before July 2022 and provides additional local protections. A unit may be covered by one, both, or neither, depending on building age, size, and ownership type.",
      },
      {
        question: "What are San Diego's short-term rental licensing requirements?",
        answer: "San Diego's Short-Term Residential Occupancy (STRO) ordinance requires all short-term rental operators to obtain a license from the city before listing a unit on platforms like Airbnb or Vrbo. Whole-home short-term rentals are limited to a host's primary residence, and a limited number of non-primary-residence STR licenses are available through a lottery system. Hosts may not operate an STR without a valid STRO license, and violations are subject to daily fines enforced by the City of San Diego.",
      },
    ],
  },
}

// ── Helper functions ──────────────────────────────────────────────────────────

export interface ParsedCityPageSlug {
  city: City
  compositeSlug: string
}

/**
 * Parses a composite city-page slug like "new-york-city-residential-lease-agreement".
 * Returns null if the slug does not match any registered city page.
 */
export function parseCityPageSlug(slug: string): ParsedCityPageSlug | null {
  const suffix = `-${CITY_DOC_SLUG}`
  if (!slug.endsWith(suffix)) return null
  const citySlug = slug.slice(0, -suffix.length)
  const city = CITIES.find((c) => c.slug === citySlug)
  if (!city) return null
  return { city, compositeSlug: slug }
}

/**
 * Returns all { category, slug } pairs for Next.js generateStaticParams.
 */
export function getCityPageStaticParams(): { category: string; slug: string }[] {
  return CITIES.map((city) => ({
    category: CITY_DOC_CATEGORY,
    slug: `${city.slug}-${CITY_DOC_SLUG}`,
  }))
}

/**
 * Returns all the data needed to render a city page.
 */
export function getCityPageData(citySlug: string) {
  const city = CITIES.find((c) => c.slug === citySlug)
  if (!city) return null
  const notes = CITY_DOC_NOTES[citySlug]
  if (!notes) return null

  return {
    city,
    notes,
    pageTitle: `${city.name} Residential Lease Agreement`,
    seoTitle: `${city.name} Residential Lease Agreement — Local Ordinance Compliant Template`,
    metaDescription: `Create a ${city.name} residential lease agreement that complies with local ordinances including rent control, just-cause eviction rules, and required disclosures. Instant PDF & DOCX.`,
  }
}

/**
 * Returns sibling city pages (other cities in the same state) for cross-linking.
 */
export function getSiblingCityPages(currentCitySlug: string) {
  const current = CITIES.find((c) => c.slug === currentCitySlug)
  if (!current) return []
  return CITIES.filter(
    (c) => c.stateSlug === current.stateSlug && c.slug !== currentCitySlug
  )
}
