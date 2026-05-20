/**
 * International document pages
 *
 * URL pattern:  /documents/{category}/{country}-{docSlug}
 * Example:      /documents/employment/uk-employment-contract
 *
 * Launch batch: 4 countries × 10 document types = 40 pages
 */

// ── Countries ─────────────────────────────────────────────────────────────────

export interface Country {
  name: string        // "United Kingdom"
  slug: string        // "uk"
  code: string        // "GB"
  legalSystem: string // "English common law"
  currency: string    // "GBP (£)"
  flag: string        // "🇬🇧"
}

export const COUNTRIES: Country[] = [
  {
    name: "United Kingdom",
    slug: "uk",
    code: "GB",
    legalSystem: "English common law (Scots law in Scotland)",
    currency: "GBP (£)",
    flag: "🇬🇧",
  },
  {
    name: "Canada",
    slug: "canada",
    code: "CA",
    legalSystem: "Canadian common law (civil law in Quebec)",
    currency: "CAD ($)",
    flag: "🇨🇦",
  },
  {
    name: "Australia",
    slug: "australia",
    code: "AU",
    legalSystem: "Australian common law",
    currency: "AUD ($)",
    flag: "🇦🇺",
  },
  {
    name: "India",
    slug: "india",
    code: "IN",
    legalSystem: "Indian common law (personal laws apply in some matters)",
    currency: "INR (₹)",
    flag: "🇮🇳",
  },
]

export const INTL_LAUNCH_SLUGS = ["uk", "canada", "australia", "india"]

// ── International-eligible documents ─────────────────────────────────────────

export interface IntlEligibleDoc {
  slug: string       // catalog slug: "employment-contract"
  legacySlug: string // "employment_contract"
  category: string   // "employment"
  title: string      // "Employment Contract"
  intlTitle: string  // "{Country} Employment Contract"
}

export const INTL_ELIGIBLE_DOCS: IntlEligibleDoc[] = [
  {
    slug: "residential-lease-agreement",
    legacySlug: "residential_lease_agreement",
    category: "real-estate",
    title: "Residential Lease Agreement",
    intlTitle: "{Country} Residential Lease Agreement",
  },
  {
    slug: "llc-operating-agreement",
    legacySlug: "llc_operating_agreement",
    category: "business",
    title: "LLC Operating Agreement",
    intlTitle: "{Country} Business Entity Agreement",
  },
  {
    slug: "employment-contract",
    legacySlug: "employment_contract",
    category: "employment",
    title: "Employment Contract",
    intlTitle: "{Country} Employment Contract",
  },
  {
    slug: "power-of-attorney",
    legacySlug: "power_of_attorney",
    category: "estate-planning",
    title: "Power of Attorney",
    intlTitle: "{Country} Power of Attorney",
  },
  {
    slug: "last-will-and-testament",
    legacySlug: "last_will_testament",
    category: "estate-planning",
    title: "Last Will and Testament",
    intlTitle: "{Country} Last Will and Testament",
  },
  {
    slug: "non-compete-agreement",
    legacySlug: "non_compete_agreement",
    category: "employment",
    title: "Non-Compete Agreement",
    intlTitle: "{Country} Non-Compete Agreement",
  },
  {
    slug: "independent-contractor-agreement",
    legacySlug: "independent_contractor_agreement",
    category: "employment",
    title: "Independent Contractor Agreement",
    intlTitle: "{Country} Independent Contractor Agreement",
  },
  {
    slug: "commercial-lease-agreement",
    legacySlug: "commercial_lease_agreement",
    category: "real-estate",
    title: "Commercial Lease Agreement",
    intlTitle: "{Country} Commercial Lease Agreement",
  },
  {
    slug: "promissory-note",
    legacySlug: "promissory_note",
    category: "financial",
    title: "Promissory Note",
    intlTitle: "{Country} Promissory Note",
  },
  {
    slug: "demand-letter",
    legacySlug: "demand_letter",
    category: "legal-letters",
    title: "Demand Letter",
    intlTitle: "{Country} Demand Letter",
  },
]

// ── Country × Document law notes ──────────────────────────────────────────────

export const INTL_DOC_NOTES: Record<string, Record<string, {
  requirements: string[]
  restrictions: string[]
  noticeRequirements?: string
  faq: { question: string; answer: string }[]
}>> = {

  // ── United Kingdom ────────────────────────────────────────────────────────
  uk: {
    "residential-lease-agreement": {
      requirements: [
        "Assured Shorthold Tenancy (AST) is the default form under the Housing Act 1988",
        "Deposit must be protected in a government-approved scheme within 30 days (TDP regulations)",
        "Prescribed information about deposit protection must be given to tenant within 30 days",
        "Energy Performance Certificate (EPC) rating of at least E required before letting",
        "Gas Safety Certificate required annually and copy provided to tenant before move-in",
        "Electrical Installation Condition Report (EICR) required every 5 years",
        "How to Rent guide must be provided to tenant at start of tenancy",
      ],
      restrictions: [
        "Tenant Fees Act 2019: landlords may only charge rent, deposit (max 5 weeks), holding deposit (max 1 week), and specified default fees",
        "No fees for referencing, administration, inventory, or professional cleaning permitted",
        "Section 21 'no-fault' eviction notices are being phased out under the Renters (Reform) Bill",
        "Rent increases for periodic tenancies require a Section 13 notice (minimum 1 month notice)",
      ],
      noticeRequirements: "Section 21: 2 months' written notice (where still available). Section 8 (fault-based): 2 weeks to 2 months depending on grounds.",
      faq: [
        {
          question: "Does a UK tenancy agreement need to be in writing?",
          answer: "Legally no, but all ASTs should be in writing. The Deregulation Act 2015 requires landlords to provide prescribed information in writing. A written agreement protects both parties and is standard practice.",
        },
        {
          question: "How much deposit can a landlord charge in the UK?",
          answer: "Under the Tenant Fees Act 2019, the security deposit is capped at 5 weeks' rent (or 6 weeks if annual rent exceeds £50,000). The holding deposit is capped at 1 week's rent.",
        },
        {
          question: "What is an Assured Shorthold Tenancy?",
          answer: "An AST is the most common form of residential tenancy in England and Wales. It gives tenants the right to live in the property for the agreed term and protects them from eviction without proper notice and court proceedings.",
        },
        {
          question: "Are landlords required to perform safety checks in the UK?",
          answer: "Yes. Landlords must provide an annual Gas Safety Certificate, an Electrical Installation Condition Report (EICR) every 5 years, and an EPC (valid for 10 years) with a minimum E rating. Smoke and CO alarms are also required.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "UK does not have LLCs — the equivalent is a Private Limited Company (Ltd) under Companies Act 2006",
        "Incorporation via Companies House (online registration typically same-day)",
        "Articles of Association are the constitutional document (equivalent to an operating agreement)",
        "A Shareholders' Agreement governs ownership rights, voting, and exit terms between members",
        "Annual Confirmation Statement (CS01) must be filed with Companies House",
        "Corporation tax returns filed with HMRC; 19–25% rate depending on profits",
        "At least one director and one shareholder required; registered office must be in the UK",
      ],
      restrictions: [
        "Limited Liability Partnerships (LLPs) are available as an alternative for professional firms",
        "Company name must not be the same as or too similar to an existing registered name",
        "Persons with Significant Control (PSC) must be registered on the public PSC register",
        "Dividend payments to shareholders require sufficient distributable reserves",
      ],
      faq: [
        {
          question: "What is the UK equivalent of an LLC?",
          answer: "The closest UK equivalent is a Private Limited Company (Ltd), which provides limited liability for shareholders. Limited Liability Partnerships (LLPs) are also available, particularly for professional services firms.",
        },
        {
          question: "What is a Shareholders' Agreement in the UK?",
          answer: "A Shareholders' Agreement is a private contract between the shareholders of a UK company that supplements the Articles of Association. It governs voting rights, dividend policy, share transfers, and dispute resolution — and unlike the Articles, it is not publicly filed.",
        },
        {
          question: "How is a UK company taxed?",
          answer: "UK companies pay Corporation Tax on their profits: 19% for profits up to £50,000, 25% for profits over £250,000, with a marginal rate in between. Companies must also register for VAT if turnover exceeds £90,000.",
        },
        {
          question: "Is a Shareholders' Agreement legally required?",
          answer: "No. The Companies Act 2006 provides default rules, and Articles of Association are mandatory. But a Shareholders' Agreement is strongly recommended to set bespoke terms around decision-making, share transfers, and exit mechanisms.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "Written statement of particulars must be provided on or before first day of employment (Employment Rights Act 1996 as amended)",
        "Must include: employer/employee details, job title, start date, pay, hours, holiday entitlement, notice periods, sick pay",
        "National Living Wage (NLW): £11.44/hour for workers aged 21+ (April 2024)",
        "Statutory minimum holiday: 5.6 weeks (28 days) per year including bank holidays",
        "Statutory Sick Pay (SSP): £116.75/week for up to 28 weeks (2024)",
        "Employees gain unfair dismissal rights after 2 years' continuous employment",
        "Auto-enrolment pension contributions required: 3% employer, 5% employee minimum",
      ],
      restrictions: [
        "Post-termination restrictive covenants must be reasonable in scope and duration to be enforceable",
        "Discrimination clauses prohibited under the Equality Act 2010 (9 protected characteristics)",
        "Zero-hours contracts permitted but workers retain right to request guaranteed hours after 26 weeks",
        "Settlement agreements must be signed with independent legal advice to be binding",
      ],
      noticeRequirements: "Statutory minimum: 1 week per year of service (max 12 weeks). Notice period runs from the week following notice.",
      faq: [
        {
          question: "What must a UK employment contract include?",
          answer: "The Employment Rights Act 1996 requires a written statement of particulars from day one, covering pay, hours, holiday, notice, job description, sick pay, and pension. A full contract adds confidentiality, IP assignment, and restrictive covenants.",
        },
        {
          question: "Can UK employers use zero-hours contracts?",
          answer: "Yes, zero-hours contracts are legal in the UK. However, workers on such contracts must receive at least the National Living Wage, statutory holiday pay, and rest breaks. The Employment Rights Bill 2024 proposed stronger rights for these workers.",
        },
        {
          question: "How much holiday must a UK employer provide?",
          answer: "The statutory minimum is 5.6 weeks (28 days) per year for a full-time worker, which may include bank holidays. Many employers offer more as part of a competitive benefits package.",
        },
        {
          question: "When can an employee claim unfair dismissal in the UK?",
          answer: "Employees need 2 years of continuous employment to claim ordinary unfair dismissal. However, certain automatic unfair dismissal claims (e.g., whistleblowing, pregnancy) have no qualifying period.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Lasting Power of Attorney (LPA) is the standard form under the Mental Capacity Act 2005",
        "Two types: Property and Financial Affairs LPA, and Health and Welfare LPA",
        "Must be signed by the donor, certificate provider, and attorney(s)",
        "Must be registered with the Office of the Public Guardian (OPG) before use — registration takes up to 20 weeks",
        "Registration fee: £82 per LPA (fee reduction available for low income)",
        "Certificate provider must confirm donor understands document and is not under pressure",
        "Ordinary Power of Attorney (not lasting) is also available for property matters when donor has capacity",
      ],
      restrictions: [
        "An LPA for Health and Welfare can only be used when the donor lacks mental capacity",
        "An attorney must act in the donor's best interests under the Mental Capacity Act 2005",
        "Attorneys cannot benefit themselves at the donor's expense without express authority",
        "Joint attorneys must act unanimously unless the LPA specifies 'jointly and severally'",
      ],
      faq: [
        {
          question: "What is the difference between an LPA and an ordinary power of attorney in the UK?",
          answer: "An ordinary Power of Attorney only works while the donor has mental capacity and becomes invalid if the donor loses capacity. A Lasting Power of Attorney (LPA) continues to work even if the donor loses mental capacity, making it more protective for long-term planning.",
        },
        {
          question: "How long does it take to register an LPA in the UK?",
          answer: "As of 2024, the Office of the Public Guardian (OPG) takes approximately 20 weeks to register an LPA. You should plan well in advance — an LPA cannot be used until registered.",
        },
        {
          question: "Can I make my own LPA without a solicitor?",
          answer: "Yes. The OPG provides a free online LPA tool. However, given the complexity and importance of the document, many people use a solicitor, which costs £300–£500 per LPA. A certificate provider (a professional or someone who has known you for 2+ years) is required regardless.",
        },
        {
          question: "Do I need separate LPAs for financial and health decisions?",
          answer: "Yes. UK law provides two separate LPA types: one for Property and Financial Affairs and one for Health and Welfare. You may create one or both depending on your circumstances.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Governed by the Wills Act 1837 in England and Wales (Succession (Scotland) Act 1964 in Scotland)",
        "Must be in writing and signed by the testator",
        "Must be witnessed by two independent witnesses who are present at the same time",
        "Witnesses must not be beneficiaries or spouses/civil partners of beneficiaries",
        "Testator must be 18 or older (16 in Scotland) and have testamentary capacity",
        "Probate required if estate exceeds £5,000 or includes property",
        "Inheritance Tax (IHT) threshold: £325,000 nil-rate band; 40% tax above this (2024)",
      ],
      restrictions: [
        "Marriage/civil partnership automatically revokes a previous will in England and Wales",
        "Divorce does not revoke a will but treats ex-spouse as having predeceased",
        "Spouses and civil partners cannot be excluded from the estate under the Inheritance Act 1975",
        "Dependants may apply to court for 'reasonable financial provision' under the Inheritance Act 1975",
      ],
      faq: [
        {
          question: "How many witnesses are required for a UK will?",
          answer: "Two witnesses are required under the Wills Act 1837. Both must be present when the testator signs. Witnesses cannot be beneficiaries or married to beneficiaries, or their inheritance will be void (though the will itself remains valid).",
        },
        {
          question: "What is the inheritance tax threshold in the UK?",
          answer: "The standard IHT nil-rate band is £325,000. Estates above this are taxed at 40%. An additional residence nil-rate band of up to £175,000 applies when a main home is left to direct descendants, potentially taking the total to £500,000 per person.",
        },
        {
          question: "Does a will need to be registered in the UK?",
          answer: "No, registration is not required, but the National Will Register offers a voluntary registration service. The original will should be stored safely — executors will need it for the probate process.",
        },
        {
          question: "What happens if I die without a will in the UK?",
          answer: "The intestacy rules apply (Administration of Estates Act 1925 in England and Wales). Your estate passes to relatives in a fixed legal order: spouse/civil partner first, then children, then other relatives. Unmarried partners have no automatic rights under intestacy.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Post-termination restrictive covenants must be reasonable in scope, geography, and duration",
        "Courts apply a two-stage test: (1) is there a legitimate business interest to protect? (2) is the restriction reasonable?",
        "Legitimate interests include: trade secrets, confidential information, customer connections, and stable workforce",
        "Garden leave clauses are commonly used to prevent departing employees from immediately joining competitors",
        "Covenants should be drafted specifically by role — generic blanket restrictions are routinely struck down",
        "Blue-pencilling: UK courts may sever unreasonable parts and enforce the remainder",
      ],
      restrictions: [
        "Non-competes that are too wide in geography, time, or scope will be unenforceable",
        "Non-competes cannot prevent an employee from earning a living in their area of expertise",
        "Consideration is required — restrictions added after employment starts need fresh consideration (e.g., promotion, bonus)",
        "The government proposed banning non-competes exceeding 3 months in 2023 (consultation ongoing as of 2024)",
      ],
      faq: [
        {
          question: "Are non-compete clauses enforceable in the UK?",
          answer: "Yes, if they are reasonable. UK courts assess whether the clause protects a legitimate business interest and whether the restriction goes no further than necessary. Overly broad restrictions are regularly struck down.",
        },
        {
          question: "What is garden leave in the UK?",
          answer: "Garden leave is a period where an employee is required to stay at home (not come into work) during their notice period, remaining on full pay. It serves a similar purpose to a non-compete by keeping the employee away from competitors during a transition period.",
        },
        {
          question: "How long can a UK non-compete last?",
          answer: "Typical enforceable periods range from 3 to 12 months depending on seniority and industry. The UK government consulted on capping non-competes at 3 months in 2023, though legislation had not passed as of 2024.",
        },
        {
          question: "Can a non-compete be added after an employee starts work?",
          answer: "Yes, but it requires fresh consideration — some benefit given to the employee in exchange, such as a pay rise, promotion, or bonus payment. Simply continuing employment is not sufficient consideration in England and Wales.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "IR35 off-payroll working rules determine whether contractors are genuinely self-employed for tax purposes",
        "From April 2021, medium/large private sector clients are responsible for determining IR35 status",
        "Status Determination Statement (SDS) must be provided by the client to the contractor and the fee-payer",
        "Contractors working through a Personal Service Company (PSC) must assess each engagement separately",
        "VAT registration required if taxable turnover exceeds £90,000 (2024 threshold)",
        "Agreement should clearly define: deliverables, control, right of substitution, and equipment provision",
      ],
      restrictions: [
        "If IR35 applies, the contractor's company must deduct PAYE income tax and National Insurance on fees",
        "False self-employment (disguised employment) carries back-tax liability plus penalties and interest",
        "Contractors do not have statutory employment rights (sick pay, holiday pay, unfair dismissal protection)",
        "HMRC's CEST tool can be used to assess IR35 status, though its conclusions are not legally binding",
      ],
      faq: [
        {
          question: "What is IR35 and does it affect my contractor agreement?",
          answer: "IR35 is UK tax legislation that determines whether a contractor working through an intermediary (like a limited company) should be taxed as an employee. If the working arrangement resembles employment, PAYE tax and National Insurance apply. Your agreement should clearly reflect genuine contractor characteristics.",
        },
        {
          question: "What makes a UK contractor genuinely self-employed?",
          answer: "Key factors include: the right of substitution (can send a substitute), no mutuality of obligation (no requirement to offer or accept ongoing work), control (client does not control how work is done), financial risk, and provision of own equipment.",
        },
        {
          question: "Who is responsible for IR35 compliance?",
          answer: "For engagements with medium and large private sector clients (since April 2021) and all public sector clients (since 2017), the client determines IR35 status. Small private sector clients place the responsibility on the contractor's own company.",
        },
        {
          question: "Does a UK contractor need to register for VAT?",
          answer: "Contractors must register for VAT if their taxable turnover in the past 12 months exceeds £90,000 (2024 threshold). Many contractors register voluntarily to reclaim VAT on expenses. If registered, VAT must be charged on invoices to clients.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "Commercial leases in England and Wales are governed by the Landlord and Tenant Act 1954 unless contracted out",
        "The 1954 Act gives business tenants security of tenure — the right to renew at lease end",
        "RICS Code for Leasing Business Premises 2020 provides guidance on fair leasing practices",
        "Energy Performance Certificate (EPC) required with minimum E rating (improving to B by 2030 proposed)",
        "Heads of Terms should be agreed before full lease drafting — typically non-binding",
        "Stamp Duty Land Tax (SDLT) payable on leases above the nil-rate threshold",
      ],
      restrictions: [
        "Landlords must serve a Section 25 notice to terminate a lease protected by the 1954 Act",
        "Tenants must serve a Section 26 notice to request a new lease before the contractual end date",
        "The 1954 Act can be excluded by agreement before the lease is executed (requires court order or simple notice procedure)",
        "Service charge provisions must be clearly drafted — unreasonable service charges can be challenged",
      ],
      faq: [
        {
          question: "What is security of tenure under the Landlord and Tenant Act 1954?",
          answer: "Business tenants in England and Wales have a statutory right to renew their lease at the end of the term under the 1954 Act, unless the landlord can establish one of the statutory grounds for opposition (e.g., wanting to redevelop). Leases can be 'contracted out' of the Act by agreement.",
        },
        {
          question: "What is a break clause in a UK commercial lease?",
          answer: "A break clause gives the landlord, tenant, or both the right to terminate the lease before the contractual end date by serving notice. Strict conditions often attach (e.g., no rent arrears, compliance with covenants). Courts strictly enforce these conditions.",
        },
        {
          question: "What taxes apply to UK commercial leases?",
          answer: "Stamp Duty Land Tax (SDLT) applies to leases with a net present value of rent above £150,000 (England) and leases in Wales are subject to Land Transaction Tax (LTT). VAT at 20% may also apply if the landlord has opted to tax the property.",
        },
        {
          question: "Who pays for repairs in a UK commercial lease?",
          answer: "This depends on the lease structure. Full repairing and insuring (FRI) leases make the tenant responsible for all repairs and insurance. Shorter leases often use internal repairing terms. The schedule of condition and dilapidations provisions are critical.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Governed by the Bills of Exchange Act 1882 in the UK",
        "Must contain: unconditional promise to pay, specific sum, name of payee, and maker's signature",
        "No formal stamp duty on promissory notes since Finance Act 1971 abolished ad valorem duty on loan instruments",
        "Interest clauses should state: rate, whether simple or compound, and calculation method",
        "Consumer credit promissory notes may be regulated by the Consumer Credit Act 1974 (credit above £25,000 triggers CCA)",
        "Written confirmation of loan terms aids enforceability and prevents disputes over repayment terms",
      ],
      restrictions: [
        "Interest rate must not be unconscionable — extremely high rates risk challenge under the Consumer Credit Act 1974 or common law",
        "Limitation period to sue on a promissory note is 6 years from date of default (Limitation Act 1980)",
        "A note payable on demand triggers the limitation period when demand is made",
        "Bearer notes are negotiable instruments — whoever holds them can claim payment",
      ],
      faq: [
        {
          question: "Is a promissory note legally enforceable in the UK?",
          answer: "Yes. A promissory note that meets the requirements of the Bills of Exchange Act 1882 is a negotiable instrument and legally enforceable. The creditor can sue in the county court or High Court for the outstanding amount plus interest.",
        },
        {
          question: "Does a UK promissory note need to be witnessed?",
          answer: "Witnessing is not legally required for a promissory note, but it is good practice. A signed, dated note is generally enforceable. For larger sums, independent legal advice and formal execution (as a deed if secured) is recommended.",
        },
        {
          question: "How long do I have to enforce a UK promissory note?",
          answer: "The limitation period is 6 years from the date the cause of action arose (i.e., the date of default or demand) under the Limitation Act 1980. After 6 years, the debt becomes 'statute-barred' and cannot be enforced in court.",
        },
        {
          question: "Does a promissory note attract stamp duty in the UK?",
          answer: "No. Stamp duty on promissory notes and loan instruments was abolished by the Finance Act 1971. There is no stamp duty payable on a standard UK promissory note.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "Civil Procedure Rules (CPR) pre-action protocols set out requirements before issuing proceedings",
        "The Pre-Action Protocol for Debt Claims requires: a 30-day response period before court proceedings",
        "Debt letter must include: full debt breakdown, interest calculation, name of creditor and debtor",
        "An Information Sheet and Reply Form must be enclosed for personal debt claims (individual debtors)",
        "Letter before action must state: intention to issue court proceedings if payment is not made",
        "Commercial disputes: reference to the Practice Direction on Pre-Action Conduct (PDPAC) applies",
      ],
      restrictions: [
        "Threatening court proceedings without genuine intention to issue them may constitute harassment",
        "Letters purporting to be from a court or enforcement agency when they are not are illegal",
        "Debt collection activity is regulated by the FCA (Financial Conduct Authority) if the creditor is authorised",
        "Limitation Act 1980: creditors cannot demand payment of statute-barred debts or imply legal action is possible",
      ],
      faq: [
        {
          question: "How long must I give a debtor to respond to a UK demand letter?",
          answer: "Under the Pre-Action Protocol for Debt Claims, you must allow at least 30 days for the debtor to respond before issuing court proceedings. For other commercial disputes, the Practice Direction on Pre-Action Conduct requires a reasonable time (typically 14 days for straightforward matters).",
        },
        {
          question: "Does a UK demand letter need to include anything specific?",
          answer: "For debt claims against individuals, the letter must include: a full breakdown of the debt, an Information Sheet, a Reply Form, a Financial Statement Form, and contact details. For commercial claims, clear identification of the dispute and proposed resolution steps are required.",
        },
        {
          question: "Can I claim interest in a UK demand letter?",
          answer: "Yes. Under the Late Payment of Commercial Debts Act 1998, businesses can claim statutory interest at 8% above the Bank of England base rate on commercial debts. Alternatively, you may claim contractual interest if your agreement provides for it.",
        },
        {
          question: "What happens if I ignore the pre-action protocol?",
          answer: "Courts take a dim view of parties who ignore pre-action protocols. The court may impose costs penalties on a non-compliant claimant or defendant, even if they win the case. Following the protocol properly demonstrates good faith and can influence costs orders.",
        },
      ],
    },
  },

  // ── Canada ────────────────────────────────────────────────────────────────
  canada: {
    "residential-lease-agreement": {
      requirements: [
        "Residential tenancies are governed by provincial legislation — Ontario's Residential Tenancies Act (RTA) 2006 is the most comprehensive",
        "Ontario mandates use of the Standard Form of Lease for most residential tenancies since 2018",
        "British Columbia: Residential Tenancy Act requires written tenancy agreements provided to tenants",
        "Alberta: Residential Tenancies Act governs most rental agreements in Alberta",
        "Quebec: specific Civil Code provisions govern rental (bail) agreements — French language may be required",
        "Security deposits capped at half a month's rent in Ontario; no deposit permitted in Manitoba",
      ],
      restrictions: [
        "Landlords cannot include clauses that waive tenant rights under the applicable RTA",
        "Most provinces prohibit 'no pets' clauses in residential leases (Ontario, BC)",
        "Rent increases: Ontario rent increase guideline (2.5% for 2024); BC maximum 3.5% in 2024",
        "Landlords must provide proper notice before entering: 24 hours in Ontario, 24 hours in BC",
      ],
      noticeRequirements: "Ontario: 60 days' written notice from tenant to end a monthly tenancy. BC: 1 month written notice from tenant. Alberta: varies by tenancy type.",
      faq: [
        {
          question: "Is a standard lease form required in Ontario?",
          answer: "Yes. Ontario's Standard Form of Lease (Form LTB-3) has been mandatory since April 30, 2018 for most private residential tenancies. Landlords who fail to provide the standard form when requested by a tenant may owe the tenant one month's rent.",
        },
        {
          question: "What is the maximum security deposit in Canada?",
          answer: "It varies by province. Ontario caps deposits at one month's rent (last month's rent deposit only). BC allows a half-month security deposit. Alberta allows one month's rent. Some provinces prohibit security deposits entirely. Pet deposits are separately regulated.",
        },
        {
          question: "Can a landlord refuse to rent to someone with pets in Canada?",
          answer: "In Ontario and BC, 'no pets' clauses in leases are void and unenforceable. Landlords cannot refuse a tenant solely because they have pets, though they can claim damages if a pet causes harm. Alberta allows no-pets clauses.",
        },
        {
          question: "How much notice must a Canadian landlord give to increase rent?",
          answer: "Ontario requires 90 days' written notice for any rent increase, limited to the provincial guideline (2.5% in 2024). BC requires 3 months' notice, capped at the government-set maximum (3.5% in 2024). Alberta requires 3 months' notice with no cap.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Canada has no LLC structure — Canadian businesses use federal or provincial corporations or limited partnerships",
        "Federal incorporation under the Canada Business Corporations Act (CBCA) provides national operating rights",
        "Provincial incorporation (e.g., Ontario Business Corporations Act, BCBCA, Alberta Business Corporations Act) is sufficient for local operations",
        "Shareholders' Agreement governs ownership and governance — the Canadian equivalent of an LLC operating agreement",
        "Annual return filings required federally (Corporations Canada) and provincially",
        "GST/HST registration required when taxable supplies exceed $30,000 in any 12-month period",
        "At least 25% of directors must be Canadian residents for federally incorporated companies",
      ],
      restrictions: [
        "Quebec companies may need French-language articles; business names must comply with the Charter of the French Language",
        "Corporations must maintain a registered office and records in Canada",
        "Professional corporations (law, medicine, accounting) face additional provincial licensing requirements",
        "Share transfers are restricted if the articles or shareholders' agreement include right of first refusal provisions",
      ],
      faq: [
        {
          question: "Why doesn't Canada have LLCs?",
          answer: "Canada's corporate law evolved differently from the US. While Canada does not have LLCs, the Canadian Limited Partnership (LP) or a corporation with a properly drafted Shareholders' Agreement achieves similar results. Some provinces allow 'unlimited liability companies' (ULCs) used for US tax-planning purposes.",
        },
        {
          question: "What is a Shareholders' Agreement in Canada?",
          answer: "A Shareholders' Agreement is a private contract between the shareholders of a Canadian corporation that supplements the articles of incorporation and by-laws. It sets out rights on share transfers, voting, dividends, management control, and dispute resolution — functioning like an LLC operating agreement.",
        },
        {
          question: "Should I incorporate federally or provincially in Canada?",
          answer: "Federal (CBCA) incorporation gives you the right to operate under your corporate name in all provinces and is better for businesses with national ambitions. Provincial incorporation is cheaper and simpler if you operate mainly within one province. Both offer limited liability protection.",
        },
        {
          question: "What are the annual maintenance requirements for a Canadian corporation?",
          answer: "Canadian corporations must file an annual return, hold at least one annual meeting of shareholders, keep corporate records (minutes, share register), and file corporate income tax returns. Federal corporations pay $12 for the annual return; provincial fees vary.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "Federal employees are covered by the Canada Labour Code; provincial employees by their province's Employment Standards Act (ESA)",
        "Ontario ESA 2000: minimum standards include minimum wage ($17.20/hour in 2024), vacation pay, overtime, and termination notice",
        "Written employment contracts should specify: role, compensation, benefits, hours, and termination provisions",
        "Common law reasonable notice significantly exceeds statutory minimums — typically 1 month per year of service",
        "Non-compete clauses for Ontario employees earning below $150,000: void and unenforceable (since October 2021)",
        "Employers must provide paid sick leave: 3 days Ontario; federally 10 days for federally regulated employees",
      ],
      restrictions: [
        "Ontario Bill 27 (2021) banned non-compete agreements for employees earning below executive-level compensation",
        "Employers cannot contract out of ESA minimum standards — any clause providing less is void",
        "Human Rights Code (provincial/federal) prohibits discrimination in employment",
        "Domestic workers and agricultural workers have additional and separate protections",
      ],
      noticeRequirements: "Ontario ESA: 1 week per year of service (max 8 weeks). Common law reasonable notice: typically 1 month per year of service for senior employees. Written contracts limiting notice to ESA minimums are enforceable if clearly drafted.",
      faq: [
        {
          question: "Are non-compete clauses enforceable in Canada?",
          answer: "It depends on the province. Ontario banned non-compete clauses for most employees (those not in 'C-suite' positions) in 2021. In other provinces, non-competes are assessed for reasonableness in scope, geography, and duration. Courts are generally reluctant to enforce them broadly.",
        },
        {
          question: "What is reasonable notice of termination in Canada?",
          answer: "Common law reasonable notice significantly exceeds the Employment Standards Act minimums. Courts typically award 1 month per year of service, subject to factors like age, seniority, and ease of finding comparable employment. A well-drafted contract limiting notice to the ESA minimum is enforceable if it meets specific drafting requirements.",
        },
        {
          question: "What is the minimum wage in Canada?",
          answer: "Minimum wage is set provincially. Ontario's minimum wage is $17.20/hour (October 2024). Federally regulated employees earn at least $17.30/hour (April 2024). British Columbia: $17.40/hour. Alberta: $15.00/hour. Always verify the current rate for your province.",
        },
        {
          question: "Must employment contracts be in writing in Canada?",
          answer: "No statutory requirement mandates written contracts, but written agreements are strongly recommended. Without one, the common law implied terms apply — including common law reasonable notice of termination, which can be very costly for employers.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Powers of attorney are governed by provincial legislation — Ontario's Substitute Decisions Act 1992 is the most comprehensive",
        "Ontario recognizes two types: Continuing Power of Attorney for Property (CPAP) and Power of Attorney for Personal Care (PAPC)",
        "A Continuing POA must be in the prescribed form, signed by the grantor and two witnesses",
        "Witnesses cannot be: the attorney, the attorney's spouse/partner, the grantor's spouse/partner, or a person under 18",
        "British Columbia: Representation Agreement Act governs personal care decisions",
        "Alberta: Personal Directives Act and Powers of Attorney Act govern the two forms",
        "Quebec uses the term 'mandate given in anticipation of incapacity' (mandat de protection) under the Civil Code",
      ],
      restrictions: [
        "Healthcare providers, care facility operators, and paid caregivers cannot act as attorneys for personal care in Ontario",
        "A POA can be revoked at any time while the grantor has capacity by signing a written revocation",
        "Attorneys must keep grantor's property separate from their own and maintain records",
        "Attorneys cannot make gifts or loans from the grantor's property unless expressly authorized",
      ],
      faq: [
        {
          question: "What is a Continuing Power of Attorney in Canada?",
          answer: "A Continuing Power of Attorney (CPOA) for Property is a legal document that authorizes someone (the attorney) to manage your financial and property matters. In Ontario, it 'continues' or comes into effect when you lose mental capacity, unlike a non-continuing POA which becomes invalid upon incapacity.",
        },
        {
          question: "Do I need separate powers of attorney for property and health in Canada?",
          answer: "Yes. Most provinces require separate documents: one for financial/property decisions and one for personal care/health decisions. Ontario calls these the Continuing Power of Attorney for Property and the Power of Attorney for Personal Care.",
        },
        {
          question: "Does a Canadian power of attorney need to be notarized?",
          answer: "Notarization is not universally required, but it is often recommended for real estate transactions and is required by some financial institutions. In Quebec, a mandate given in anticipation of incapacity must be notarized or witnessed by two witnesses to be homologated by a court.",
        },
        {
          question: "Who can witness a power of attorney in Ontario?",
          answer: "Two witnesses are required for an Ontario Continuing POA. They must be adults (18+) who are not the named attorney, not the attorney's spouse or partner, not the grantor's spouse or partner, and not a person whose property is being managed under the Substitute Decisions Act.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Wills are governed by provincial succession legislation — Ontario's Succession Law Reform Act, RSBC 1996 in BC, etc.",
        "Ontario: must be in writing, signed at the end by the testator, and witnessed by two persons who are not beneficiaries",
        "British Columbia: allows 'wills-compliant' electronic wills under the Wills, Estates and Succession Act 2009 (judge may validate defective wills)",
        "Quebec: Three valid forms — notarial will (before a notary), holographic will (entirely handwritten and signed), or will before witnesses",
        "Probate required in most provinces — fee varies: Ontario uses a tiered system on estate value",
        "Federal and provincial income taxes due in year of death — terminal tax return required",
        "Spousal RRSP/RRIF rollovers available tax-free under Income Tax Act",
      ],
      restrictions: [
        "Marriage in common-law provinces does not automatically revoke a will (Ontario changed this in 2022 — marriage no longer revokes a will)",
        "Surviving spouses and common-law partners may have election rights against the will",
        "Dependants' relief claims available in most provinces for inadequately provided dependants",
        "Foreign assets may be subject to the law of the jurisdiction where they are located",
      ],
      faq: [
        {
          question: "Is a holographic will valid in Canada?",
          answer: "Yes, in most Canadian provinces. A holographic will must be entirely written and signed in the testator's own handwriting — no typed portions and no witnesses are required. Quebec expressly allows holographic wills. They are valid but risky as they are easy to challenge.",
        },
        {
          question: "What is probate in Canada and how much does it cost?",
          answer: "Probate is the court process that validates a will and authorizes the executor to administer the estate. Ontario charges an estate administration tax: 0.5% on the first $50,000 and 1.5% on the remainder. BC charges a fee capped at 1.4% of the estate above $50,000. Alberta has a flat fee structure.",
        },
        {
          question: "Does a Canadian will cover assets in other countries?",
          answer: "Your Canadian will may be recognized abroad, but real property is generally governed by the law of the jurisdiction where it sits. Many Canadians with US real estate draft a separate US will for those assets. It is advisable to consult a lawyer in each jurisdiction where you hold significant assets.",
        },
        {
          question: "Can I leave everything to whoever I want in Canada?",
          answer: "Largely yes, but dependants (spouse, children) may have rights to make a dependants' relief claim against the estate if inadequately provided for. Ontario's Family Law Act also gives a surviving spouse the right to elect against the will and take their equalization payment instead.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Non-compete clauses are governed by common law principles in all provinces except Quebec (civil law)",
        "Courts require: legitimate proprietary interest to protect, geographical and temporal reasonableness",
        "Ontario Working for Workers Act 2021 (Bill 27): non-competes void for all Ontario employees except C-suite executives",
        "Employment non-solicitation clauses (for clients and employees) are permitted but must be reasonable",
        "Sale-of-business non-competes are held to a higher standard of enforceability (buyer paid for goodwill)",
        "Consideration is required — must be provided at the start of employment or with fresh consideration if added later",
      ],
      restrictions: [
        "Ontario employees (except executives) cannot be bound by non-compete clauses effective October 25, 2021",
        "Quebec courts apply civil law reasonableness tests; overly broad restrictions are reduced or voided",
        "Courts sever unreasonable clauses — they do not typically rewrite them",
        "Non-solicitation clauses that prevent all contact with former clients are treated like non-competes if they go too far",
      ],
      faq: [
        {
          question: "Are non-compete agreements legal in Ontario?",
          answer: "No — for most employees. Ontario's Working for Workers Act 2021 made non-compete agreements void for all Ontario employees except those in 'C-suite' positions (executives). Non-solicitation agreements (not restricting competition per se) remain enforceable if reasonable.",
        },
        {
          question: "What is the difference between a non-compete and a non-solicitation clause in Canada?",
          answer: "A non-compete prevents the former employee from working in the same industry or starting a competing business. A non-solicitation clause prevents them from approaching former clients or colleagues. In Ontario, non-competes are banned for most employees, but non-solicitation clauses remain valid if reasonable.",
        },
        {
          question: "Are non-competes enforceable in a business sale in Canada?",
          answer: "Yes — courts apply more lenient standards to non-compete clauses in business sales because the seller is being paid for goodwill. Wider geographic scope and longer duration (up to 5 years) may be acceptable. The clause must still be reasonable given the nature of the business sold.",
        },
        {
          question: "What happens if a non-compete clause is unreasonable in Canada?",
          answer: "Canadian courts will typically strike out the entire clause rather than modify it (unlike some US courts). Courts will not 'blue-pencil' a clause by simply deleting words to make it reasonable — the clause must stand or fall as written.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Canada Revenue Agency (CRA) determines worker status based on a multi-factor test established in Wiebe Door Services v MNR (1986)",
        "Key factors: control, ownership of tools, chance of profit/risk of loss, integration into the business",
        "GST/HST registration required when taxable supplies (income) exceed $30,000 in a 12-month period",
        "Contractors must remit their own income tax by quarterly installments if tax owing exceeds $3,000",
        "Quebec: workers presumed to be employees under the Civil Code unless clearly demonstrated otherwise",
        "Personal Services Business (PSB) rules: incorporated contractors who work principally for one client may be taxed as employees",
      ],
      restrictions: [
        "Misclassifying an employee as a contractor can result in CRA assessments for unpaid CPP/EI and income tax",
        "Provincial employment standards may still apply to genuine independent contractors in some industries",
        "Ontario's Employment Standards Act: contracts labeled 'independent contractor' but showing employment indicia will be treated as employment",
        "Ontario's digital platform workers (rideshare, delivery) have new rights under the Digital Platform Workers' Rights Act 2022",
      ],
      faq: [
        {
          question: "How does the CRA determine if a worker is an employee or contractor?",
          answer: "The CRA uses a four-factor test from the Wiebe Door case: (1) degree of control, (2) who owns the tools, (3) chance of profit and risk of loss, and (4) integration. No single factor is determinative — the relationship is assessed as a whole. The CRA's RC4110 guide provides further detail.",
        },
        {
          question: "Does a Canadian contractor need to register for GST/HST?",
          answer: "Yes, once taxable supplies exceed $30,000 over four consecutive quarters. Some contractors voluntarily register below this threshold to reclaim input tax credits on expenses. Registration thresholds differ in Quebec, where the Ministère du Revenu du Québec administers QST separately.",
        },
        {
          question: "What is a Personal Services Business in Canada?",
          answer: "A PSB occurs when an incorporated contractor performs services primarily for one company and would otherwise be considered an employee of that company. PSB income is taxed at higher corporate rates with no access to the small business deduction — essentially the same tax as employment income.",
        },
        {
          question: "Can a contractor sue for wrongful dismissal in Canada?",
          answer: "True independent contractors cannot claim wrongful dismissal — the common law notice period applies only to employees. However, courts look past contract labels: if the actual working arrangement reflects employment, the worker may succeed in an employment claim. The classification matters enormously.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "Commercial leases in Canada are governed by provincial Commercial Tenancies Acts (Ontario CTA, BC Commercial Tenancy Act, etc.)",
        "No standard lease form required — parties negotiate terms freely",
        "REALPAC (Real Property Association of Canada) publishes model commercial lease forms used as industry standards",
        "HST/GST applies to commercial rents (typically tenant's responsibility via additional rent clause)",
        "Net, gross, and modified-gross lease structures common — specify clearly which expenses tenant bears",
        "Personal guarantees from principals often required for new or small businesses",
      ],
      restrictions: [
        "Unlike residential tenancies, commercial tenants have limited statutory protections — contract terms govern",
        "Ontario: commercial landlords have the right to distrain (seize goods) for unpaid rent under the Landlord and Tenant Act",
        "No automatic right of renewal in most commercial leases — options to renew must be expressly negotiated",
        "Assignment and subletting usually require landlord consent — not to be unreasonably withheld under many provincial Acts",
      ],
      faq: [
        {
          question: "Is there a standard commercial lease form in Canada?",
          answer: "No mandatory form exists for commercial leases in Canada. The REALPAC model lease is widely used as a starting point for office and industrial properties. Retail leases often use ICSC (International Council of Shopping Centers) standard forms. All terms are ultimately negotiated between landlord and tenant.",
        },
        {
          question: "What is a net lease in Canada?",
          answer: "In a net lease, the tenant pays base rent plus a proportionate share of operating expenses (taxes, insurance, maintenance). A 'triple net' (NNN or TMI) lease requires the tenant to pay base rent plus property taxes, maintenance, and insurance. This is the most common structure for industrial and retail properties.",
        },
        {
          question: "Does GST/HST apply to commercial rent in Canada?",
          answer: "Yes. Commercial rent in Canada is generally subject to GST (5%) federally, plus provincial sales tax where applicable (HST in Ontario, BC, etc.). The lease should specify whether base rent is inclusive or exclusive of HST. GST/HST-registered tenants can typically recover these amounts as input tax credits.",
        },
        {
          question: "What happens if a commercial tenant doesn't pay rent in Canada?",
          answer: "Provincial Commercial Tenancies Acts typically allow landlords to: (1) distrain (seize tenant's goods) for arrears, (2) pursue the tenant for damages, or (3) re-enter and terminate the lease. The right to distrain is being abolished in some provinces. A well-drafted lease specifies remedies and cure periods.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Governed by the Bills of Exchange Act (Canada), R.S.C. 1985, c. B-4",
        "Must include: unconditional promise to pay, fixed sum certain, payee's name or 'bearer', maker's signature",
        "Interest provisions should specify rate, calculation method, and compounding period",
        "Consumer notes may be subject to provincial Consumer Protection Acts (Ontario CPA 2002 requires disclosure of borrowing cost)",
        "Limitation period: 2 years from date of default in most provinces under provincial Limitations Acts",
        "For amounts under $35,000 in Ontario, collection can be pursued through Small Claims Court",
      ],
      restrictions: [
        "Criminal interest rate under the Criminal Code: effective annual rate cannot exceed 60% — exceeded rates are void",
        "Consumer protection legislation may cap fees and require cost-of-credit disclosure for consumer loans",
        "Quebec promissory notes used as consumer credit agreements require prescribed disclosures under the Consumer Protection Act",
        "A note that is not properly stamped (if applicable provincially) may be inadmissible as evidence",
      ],
      faq: [
        {
          question: "Is a promissory note enforceable in Canada?",
          answer: "Yes. A properly executed promissory note that meets the requirements of the Bills of Exchange Act is a negotiable instrument enforceable in Canadian courts. The creditor can sue for the outstanding principal plus agreed interest within the applicable limitation period.",
        },
        {
          question: "What is the maximum interest rate on a Canadian promissory note?",
          answer: "Section 347 of the Criminal Code prohibits charging an effective annual interest rate exceeding 60%. This includes all fees and charges. Note: the federal government proposed reducing this cap to 35% effective annual rate for most consumer loans in 2023.",
        },
        {
          question: "How long do I have to collect on a promissory note in Canada?",
          answer: "Most provinces have a 2-year basic limitation period from the date the debt became due. Ontario's Limitations Act 2002 imposes a 2-year limit from when the claimant discovered (or ought to have discovered) the claim. The ultimate limitation period is 15 years.",
        },
        {
          question: "Does a Canadian promissory note need to be notarized?",
          answer: "Notarization is not legally required for a promissory note to be enforceable under the Bills of Exchange Act. However, notarization may be required by lenders, financial institutions, or for cross-border enforceability. Witnesses are also not required by statute but are recommended for large amounts.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No federal legislation mandates a pre-litigation demand letter, but provincial Rules of Civil Procedure expect good-faith attempts to resolve disputes",
        "Ontario Rules of Civil Procedure (R.R.O. 1990, Reg. 194): parties should comply with the Practice Direction on e-Discovery and case management requirements",
        "Ontario Small Claims Court: no mandatory demand letter but advisable — claims under $35,000",
        "Commercial debts: clearly state: amount owing, basis of claim, due date, and consequence of non-payment",
        "Contract-based demands should cite the specific clause breached and remedy sought",
        "Late payment interest under the Prompt Payment for Construction Act (Ontario, 2020) must reference the applicable statutory rate",
      ],
      restrictions: [
        "Threatening criminal proceedings to collect a debt (extortion) is a criminal offence under the Criminal Code",
        "False or misleading statements about legal consequences constitute deceptive trade practices under provincial consumer protection laws",
        "Collection agencies must be licensed in each province; their communications are regulated (Ontario's Collection and Debt Settlement Services Act)",
        "Limitations Act 2002 (Ontario): commencing litigation before any payment, acknowledgement, or partial payment within 2 years tolls the clock — demand letters alone do not toll the limitation period",
      ],
      faq: [
        {
          question: "Is a demand letter required before suing in Canada?",
          answer: "A demand letter is not legally required in most Canadian jurisdictions before filing a lawsuit, but it is strongly recommended. Courts look favourably on parties who made good-faith efforts to resolve disputes. Some contracts also contain mandatory notice provisions that must be followed before litigation.",
        },
        {
          question: "Can I claim interest in a Canadian demand letter?",
          answer: "Yes. You can claim contractual interest (if your agreement specifies a rate) or pre-judgment interest under provincial law. Ontario's Courts of Justice Act provides for pre-judgment interest at rates set by the Attorney General. Commercial debts may also attract interest under the Late Payment Act.",
        },
        {
          question: "How long should I give someone to respond to a demand letter in Canada?",
          answer: "A reasonable response period is typically 10 to 30 days for commercial matters, depending on the complexity of the dispute. For consumer matters, longer notice periods are courteous and demonstrate good faith. Always state the deadline clearly in the letter.",
        },
        {
          question: "Does sending a demand letter stop the limitation period in Canada?",
          answer: "No. Sending a demand letter alone does not toll (pause) the limitation period. You must commence legal proceedings within the applicable period (2 years in most provinces under modern Limitations Acts). However, written acknowledgement of the debt by the debtor or part payment may restart the clock.",
        },
      ],
    },
  },

  // ── Australia ─────────────────────────────────────────────────────────────
  australia: {
    "residential-lease-agreement": {
      requirements: [
        "Residential tenancies are governed by state/territory legislation — NSW Residential Tenancies Act 2010, VIC Residential Tenancies Act 1997 (as amended 2018), QLD Residential Tenancies and Rooming Accommodation Act 2008",
        "NSW: mandatory use of the standard tenancy agreement form for most residential tenancies",
        "VIC: minimum standards for rental properties including heating, locks, and weatherproofing apply since 2021",
        "Bond must be lodged with the relevant state authority (Fair Trading NSW, Consumer Affairs VIC, RTA QLD) within 10 business days",
        "Condition reports must be completed and provided to the tenant before or at commencement",
        "Gas and electrical safety checks required in VIC (every 2 years)",
      ],
      restrictions: [
        "Bond capped at 4 weeks' rent in NSW; VIC: 1 month for monthly tenancies; QLD: 4 weeks for rent ≤$700/week",
        "VIC: landlords cannot ban pets without permission from VCAT (Residential Tenancies Act amendment 2020)",
        "NSW: rent increases permitted once per 12 months only; landlord must give 60 days' notice",
        "Retaliatory evictions are prohibited in all Australian states",
      ],
      noticeRequirements: "NSW: 30 days' notice to terminate a periodic tenancy (tenant); 90 days' notice to terminate without grounds (landlord, with reforms ongoing). VIC: 28 days (tenant periodic); 60 days (landlord without reason under Residential Tenancies Act 2018).",
      faq: [
        {
          question: "Is there a standard residential lease form in Australia?",
          answer: "Each state has its own requirements. NSW mandates the standard residential tenancy agreement for most leases. VIC requires a lease agreement in plain language. QLD uses a standard Form 18a. The specific form must comply with the applicable state Residential Tenancies Act.",
        },
        {
          question: "How is the bond handled in Australia?",
          answer: "The bond (security deposit) must be lodged with the relevant state authority — not held by the landlord. NSW: NSW Fair Trading (via RBO or agent). VIC: Consumer Affairs VIC (RTBA). QLD: Rental Tenancy Authority. The bond is returned at end of tenancy once any claims are resolved.",
        },
        {
          question: "Can a landlord ban pets in Australia?",
          answer: "Varies by state. Victoria amended its Residential Tenancies Act in 2020 to require landlords to have reasonable grounds to refuse pets. NSW still allows landlords to refuse pets. Queensland and ACT have moved to allow pets with reasonable conditions. The trend nationally is toward allowing pets.",
        },
        {
          question: "How much notice must an Australian landlord give to end a tenancy?",
          answer: "Varies by state and reason. NSW: 90 days without grounds (landlord), 30 days with grounds. VIC: 60 days without reason. QLD: 2 months without grounds. All states are implementing reforms to reduce 'no-grounds' evictions, so check current state legislation.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "Australia has no LLC structure — the equivalent is a Proprietary Limited Company (Pty Ltd) registered with ASIC",
        "Corporations Act 2001 (Cth) governs all companies — federal legislation applies uniformly",
        "A company can adopt a Constitution or rely on the Replaceable Rules in the Corporations Act",
        "Shareholders' Agreement supplements the Constitution and governs private ownership arrangements",
        "Company must have at least one director who ordinarily resides in Australia",
        "Annual review fee payable to ASIC: $310 for proprietary companies (2024)",
        "Company tax rate: 25% for base rate entities with turnover below $50 million; 30% for others",
      ],
      restrictions: [
        "Proprietary companies are limited to 50 non-employee shareholders and cannot offer shares to the public",
        "Directors owe statutory duties under the Corporations Act 2001: duty of care, good faith, no conflicts of interest, no improper use of position",
        "Insolvent trading: directors can be personally liable for debts incurred while company is insolvent",
        "Share transfers typically require board approval unless the Constitution provides otherwise",
      ],
      faq: [
        {
          question: "What is the Australian equivalent of an LLC?",
          answer: "The closest equivalent is a Proprietary Limited Company (Pty Ltd). It provides limited liability for shareholders and is the most common business structure in Australia. Unlike LLCs, Australian Pty Ltd companies are governed by the federal Corporations Act 2001 uniformly across all states.",
        },
        {
          question: "What is the difference between a Constitution and Replaceable Rules in Australia?",
          answer: "The Corporations Act 2001 provides default 'Replaceable Rules' that govern company operations if no Constitution is adopted. A company can also adopt its own Constitution, which overrides the Replaceable Rules. A Shareholders' Agreement is a private contract between shareholders that supplements either document.",
        },
        {
          question: "What are Australian directors' duties?",
          answer: "Directors of Australian companies owe duties under the Corporations Act 2001: duty of care and diligence, duty of good faith, duty not to use position or information improperly, and duty to prevent insolvent trading. ASIC actively enforces these duties, and breach can result in civil penalties or criminal liability.",
        },
        {
          question: "How is an Australian Pty Ltd taxed?",
          answer: "Eligible base rate entities (turnover below $50 million) pay 25% company tax. Other companies pay 30%. Shareholders pay personal income tax on dividends. Australia's dividend imputation system allows shareholders to receive a franking credit for company tax already paid, avoiding double taxation.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "The Fair Work Act 2009 (Cth) establishes the national workplace relations system covering most employees",
        "National Employment Standards (NES): 11 minimum entitlements that cannot be contracted out of, including 4 weeks' annual leave, 10 days personal/carer's leave, parental leave, and flexible work requests",
        "Modern Awards set minimum pay rates and conditions for specific industries and occupations",
        "Written employment contracts are not legally required but are strongly recommended",
        "Casual employees: from October 2024, casual conversion rights exist after 12 months of regular employment",
        "Fair Work Commission sets the National Minimum Wage annually: $23.23/hour (July 2024)",
      ],
      restrictions: [
        "Employment contracts cannot provide less than NES or applicable Modern Award entitlements",
        "Sham contracting: knowingly misrepresenting employment as contracting is a civil penalty offence under the Fair Work Act",
        "Unfair dismissal protection applies after 6 months of employment (12 months for small businesses under 15 employees)",
        "Right to disconnect: employees have a statutory right to refuse unreasonable out-of-hours contact since August 2024",
      ],
      noticeRequirements: "Minimum notice under Fair Work Act: 1 week (0–1 year service), 2 weeks (1–3 years), 3 weeks (3–5 years), 4 weeks (5+ years). Add 1 week for employees over 45 with 2+ years of service.",
      faq: [
        {
          question: "What are the National Employment Standards in Australia?",
          answer: "The NES are 11 minimum employment entitlements under the Fair Work Act 2009 that apply to all national system employees. They include maximum weekly hours (38 + reasonable additional), 4 weeks' annual leave, 10 days personal/carer's leave, 12 months' unpaid parental leave, notice of termination, and redundancy pay.",
        },
        {
          question: "Does Australia have a minimum wage?",
          answer: "Yes. The Fair Work Commission sets the National Minimum Wage annually. From July 1, 2024, it is $23.23 per hour ($882.80/week for 38-hour week). Modern Award minimum rates may be higher for specific industries and must be paid if applicable.",
        },
        {
          question: "What is the difference between award and above-award pay in Australia?",
          answer: "Modern Awards set minimum pay rates for specific industries and occupations. Employers must pay at least the award rate. Above-award contracts can provide better pay and conditions than the award floor, but cannot undercut the award. Enterprise agreements can also apply where they pass the Better Off Overall Test (BOOT).",
        },
        {
          question: "What is unfair dismissal in Australia?",
          answer: "Under the Fair Work Act, an employee dismissed in a manner that is harsh, unjust, or unreasonable can apply to the Fair Work Commission for unfair dismissal. A remedy period of 21 days after dismissal applies to lodge the application. Remedies include reinstatement or compensation up to 26 weeks' pay.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Powers of attorney are governed by state and territory legislation — Powers of Attorney Act 2014 (VIC), Powers of Attorney Act 2003 (NSW), Powers of Attorney Act 1998 (QLD)",
        "Most states distinguish between: General/Enduring Power of Attorney (financial matters) and Medical Treatment Decision Maker / Advance Care Directive (health matters)",
        "An Enduring Power of Attorney (EPA) continues to operate if the principal loses mental capacity",
        "VIC: EPA must be signed before a witness who is an approved witness (solicitor, medical practitioner, or other prescribed person)",
        "NSW: EPA must be signed before an approved witness (solicitor, barrister, or licensed conveyancer)",
        "Registration on the Public Register may be required for real estate transactions",
      ],
      restrictions: [
        "Healthcare decisions are typically governed by separate legislation and may require a separate document",
        "NSW: an attorney acting under an EPA must not give gifts or confer benefits unless specifically authorised",
        "QLD: the attorney must act in the principal's best interests, considering the principal's wishes, values, and current circumstances",
        "Revocation: an EPA can be revoked at any time while the principal has capacity by signing and registering a revocation",
      ],
      faq: [
        {
          question: "What is an Enduring Power of Attorney in Australia?",
          answer: "An Enduring Power of Attorney is a legal document that appoints someone (the attorney) to make financial and property decisions on your behalf. Unlike a general POA, it 'endures' (remains valid) even if you lose mental capacity. Each state has its own requirements and form.",
        },
        {
          question: "Who can witness a power of attorney in Australia?",
          answer: "Witnessing requirements vary by state. NSW requires a solicitor, barrister, or licensed conveyancer. VIC requires an approved witness such as a solicitor, medical practitioner, or other prescribed persons. In QLD, a JP, commissioner for declarations, or notary public can witness. Family members are generally excluded.",
        },
        {
          question: "Do I need a separate document for medical decisions in Australia?",
          answer: "Yes. An Enduring Power of Attorney covers financial decisions. Medical and personal decisions are governed by separate documents: in VIC, a Medical Treatment Decision Maker appointment; in NSW, an Enduring Guardianship; in QLD, an Enduring Power of Attorney (personal/health) under the Powers of Attorney Act 1998.",
        },
        {
          question: "Can an attorney in Australia give themselves gifts from my estate?",
          answer: "Generally no. Unless the power of attorney document expressly authorises gifts, an attorney must not benefit themselves or give gifts from the principal's assets. Unauthorised gifts by an attorney can be challenged and may constitute financial abuse — a serious concern addressed by state legislation.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Wills are governed by state succession legislation — Succession Act 2006 (NSW), Succession Act 2010 (QLD), Wills Act 1997 (VIC), Wills Act 2008 (TAS)",
        "Must be in writing, signed by the testator, and witnessed by two persons present at the same time",
        "Witnesses must not be beneficiaries or spouses of beneficiaries",
        "Testator must be 18 or older and have testamentary capacity",
        "Probate required in most states for estates above a threshold (typically $15,000–$50,000 depending on state)",
        "Estate duty/death taxes were abolished in Australia nationally in 1979",
        "Capital Gains Tax on deceased estates: assets transferred to beneficiaries retain the deceased's cost base for CGT purposes",
      ],
      restrictions: [
        "Family provision claims: eligible persons (spouse, children, dependants) can apply to court if left without adequate provision",
        "Marriage does not revoke a will made after December 2008 in NSW and most other states following reforms",
        "Divorce revokes gifts to a former spouse and their appointment as executor in most Australian jurisdictions",
        "Superannuation does not automatically form part of the estate — nomination of beneficiaries through the super fund is required",
      ],
      faq: [
        {
          question: "Are there death taxes in Australia?",
          answer: "No. Australia abolished federal estate duty in 1979 and all state death duties were phased out by 1981. However, capital gains tax may apply on certain assets sold by the estate during administration, and superannuation paid to non-dependants may be subject to tax.",
        },
        {
          question: "Does superannuation automatically go to my estate in Australia?",
          answer: "No. Superannuation is held in trust and does not automatically form part of your estate. To control who receives your super, you must make a valid binding death benefit nomination (BDBN) with your super fund. Without one, the trustee has discretion to pay eligible beneficiaries, which may not reflect your wishes.",
        },
        {
          question: "What is a family provision claim in Australia?",
          answer: "Any eligible person who believes they have not been adequately provided for in a will can make a family provision claim (testator's family maintenance claim in some states) to the Supreme Court. Eligible persons typically include spouses, domestic partners, and children. The court can vary the will to make adequate provision.",
        },
        {
          question: "Does marriage or divorce affect my Australian will?",
          answer: "Post-2008 reforms: marriage alone no longer automatically revokes a will in NSW and most other states. Divorce (finalised dissolution) revokes gifts and appointments to the former spouse in most Australian jurisdictions. You should review and update your will after any major change in relationship status.",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Governed by the common law doctrine of restraint of trade — courts apply a reasonableness test",
        "NSW Restraints of Trade Act 1976: courts may read down (reduce) an unreasonable restraint to a reasonable scope",
        "Post-employment restraints must protect a legitimate proprietary interest: trade secrets, confidential information, or customer connections",
        "Restraints must be reasonable in: duration, geographic scope, and the activities restrained",
        "Senior employees with significant customer relationships or access to trade secrets: wider restraints more likely enforced",
        "Consideration is required — restraints should be agreed at the start of employment",
      ],
      restrictions: [
        "Courts will not enforce a restraint that is simply designed to prevent competition without protecting a real interest",
        "NSW courts can 'read down' overly broad restraints using cascading clauses (different time/geography options)",
        "Cascading clauses are enforceable in NSW under the Restraints of Trade Act but not universally in other states",
        "Injunctive relief is the most common remedy — damages must be proven and can be difficult to quantify",
      ],
      faq: [
        {
          question: "Are non-compete agreements enforceable in Australia?",
          answer: "Yes, if reasonable. Australian courts follow the common law doctrine of restraint of trade. The restraint must protect a legitimate proprietary interest (e.g., confidential information, customer relationships) and go no further than reasonably necessary. Courts balance the interests of both parties.",
        },
        {
          question: "What is a cascading restraint clause in Australian employment contracts?",
          answer: "A cascading clause sets out multiple combinations of scope (e.g., 12 months or 6 months or 3 months) and geography (e.g., Australia or NSW or within 50km of the business). Under NSW's Restraints of Trade Act 1976, courts can select and enforce the most reasonable combination, giving the clause a better chance of survival.",
        },
        {
          question: "How long can an Australian non-compete last?",
          answer: "There is no fixed maximum, but courts assess reasonableness based on the employee's seniority, access to confidential information, and the time needed to protect legitimate interests. For senior employees with significant client relationships, 6–12 months is typically enforceable. Longer periods face greater scrutiny.",
        },
        {
          question: "Can an employer seek an injunction for breach of a non-compete in Australia?",
          answer: "Yes. An injunction (court order preventing the former employee from breaching the restraint) is the most common and effective remedy. The employer must demonstrate a prima facie case and that damages would be inadequate. Courts act quickly in urgent cases to prevent ongoing harm.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "The Fair Work Act 2009 governs sham contracting provisions — misrepresenting employment as contracting is a civil penalty offence",
        "Multi-factor test used: control, integration, financial dependence, tools and equipment, ability to profit/loss",
        "High Court of Australia decision (CFMMEU v Personnel Contracting, 2022): focus on the contract terms, not just the conduct of parties",
        "Contractors providing personal services are taxed under the PAYG system if PSI rules apply (Personal Services Income)",
        "Superannuation Guarantee Act 1992: contractors paid wholly or principally for their labour must receive 11.5% super contributions (2024)",
        "ABN (Australian Business Number) registration recommended for all contractors doing business",
      ],
      restrictions: [
        "Sham contracting: employers cannot misrepresent an employment relationship as a contracting arrangement — $12,600+ per contravention (2024)",
        "Unfair contracts: The Federal Court can review 'unfair' independent contractor terms under the Independent Contractors Act 2006",
        "Owner-drivers: various state legislation (e.g., NSW Owner Drivers and Forestry Contractors Act) provides additional protections",
        "Gig economy workers: High Court decisions and Fair Work Act reforms are expanding protections for certain platform workers",
      ],
      faq: [
        {
          question: "Are contractors entitled to superannuation in Australia?",
          answer: "Yes, if the contractor is engaged principally for their labour (not the results of their work). Under the Superannuation Guarantee Act 1992, the engager must pay 11.5% super (2024–25) on the contractor's ordinary time earnings. This applies even if the contractor has an ABN and is not incorporated.",
        },
        {
          question: "What is the Personal Services Income (PSI) rule in Australia?",
          answer: "PSI rules apply when 80%+ of a contractor's income comes from one client. The ATO may require the income to be attributed to the individual contractor (not their company), reducing tax benefits of operating through a company structure. The contractor's entity can apply for a PSI determination to avoid this.",
        },
        {
          question: "What is sham contracting in Australia?",
          answer: "Sham contracting occurs when an employer presents what is really an employment relationship as an independent contracting arrangement, usually to avoid employment entitlements. The Fair Work Act imposes civil penalties of up to $12,600 per contravention for individuals and $63,000 for companies. The ATO may also back-assess PAYG withholding.",
        },
        {
          question: "How does the 2022 High Court decision affect contractor classification in Australia?",
          answer: "In CFMMEU v Personnel Contracting (2022), the High Court held that the classification of a worker as employee or contractor should be determined primarily by the terms of the written contract, rather than the subsequent conduct of parties. This makes well-drafted contractor agreements more important than ever in accurately reflecting the intended relationship.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "Retail leases governed by state retail tenancy legislation: Retail Leases Act 1994 (NSW), Retail Leases Act 2003 (VIC), Retail Shop Leases Act 1994 (QLD)",
        "Retail Leases Acts apply to retail premises below a certain area or rent threshold — check current thresholds per state",
        "Disclosure Statement required: landlord must provide to prospective tenant at least 7 days before signing",
        "Retail leases: minimum 5-year term may be required for certain circumstances (e.g., tenant fit-out costs over $10,000 in NSW)",
        "Bank guarantee or bond typically required: 3–6 months' rent for commercial leases",
        "Heads of Agreement are commonly used — should state whether binding or non-binding",
      ],
      restrictions: [
        "Retail Leases Acts restrict landlord ability to pass on certain costs (e.g., land tax, sinking funds in NSW)",
        "Landlords of retail premises cannot terminate for redevelopment without adequate compensation in some states",
        "Option clauses: landlords must notify tenants of their option renewal rights within prescribed timeframes",
        "Unconscionable conduct in leasing arrangements is prohibited under the Australian Consumer Law",
      ],
      faq: [
        {
          question: "What is a disclosure statement in an Australian commercial lease?",
          answer: "For retail leases governed by state Retail Leases Acts, landlords must provide a prescribed Disclosure Statement to prospective tenants at least 7 days before the lease is signed. It sets out key lease terms, estimated outgoings, and other material information. Failure to provide a compliant disclosure can allow the tenant to rescind the lease.",
        },
        {
          question: "What is a bank guarantee in an Australian commercial lease?",
          answer: "A bank guarantee is a commitment by the tenant's bank to pay the landlord a specified amount if the tenant defaults. It is the most common form of security for commercial and retail leases, typically set at 3–6 months' rent. Unlike a cash bond, the tenant obtains it from their bank (often requiring a cash deposit or credit facility).",
        },
        {
          question: "What is a make-good obligation in an Australian lease?",
          answer: "At lease end, tenants are typically required to 'make good' — restoring the premises to the condition they were in at lease commencement (or as specified in the lease). This can include removing fit-out, repainting, and repairing damage. The cost of make-good can be significant — negotiate the scope carefully before signing.",
        },
        {
          question: "Does GST apply to commercial rent in Australia?",
          answer: "Yes. Commercial rent is a taxable supply under the GST Act. Landlords registered for GST must charge GST (10%) on commercial rent unless the supply is input-taxed. The lease should clearly state whether the rent is exclusive of GST. GST-registered tenants can claim an input tax credit for the GST paid on rent.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Governed by the Cheques Act 1986 (Cth) and Cheques Regulations 2018; bills of exchange are covered by the Bills of Exchange Act 1909 (Cth)",
        "Must contain: unconditional promise to pay, sum certain in money, payee, and signature of the maker",
        "Interest provisions should specify: rate, type (simple or compound), and default rate",
        "Consumer credit: if the promissory note is part of a consumer credit contract, the National Consumer Credit Protection Act 2009 applies",
        "Limitation Act 1969 (NSW) / Limitation of Actions Act 1958 (VIC): 6-year limitation period from date of default",
        "Stamp duty: most states have abolished or significantly reduced stamp duty on loan instruments — check current state rules",
      ],
      restrictions: [
        "Unconscionable interest rates may be challenged under the Australian Consumer Law (ACL)",
        "National Credit Code: credit contracts for personal, domestic, or household purposes over $2,000 require licensed creditor and prescribed disclosures",
        "Interest rates on small amount credit contracts are capped under National Credit Code amendments",
        "Promissory notes must not be used to circumvent the National Consumer Credit Protection Act 2009 for regulated lending",
      ],
      faq: [
        {
          question: "Is a promissory note legally enforceable in Australia?",
          answer: "Yes. A promissory note that meets the requirements of the Bills of Exchange Act 1909 or Cheques Act 1986 is a valid legal instrument enforceable in Australian courts. Creditors can sue for the outstanding amount within the applicable limitation period (6 years in most states).",
        },
        {
          question: "Does Australia's National Consumer Credit Protection Act apply to promissory notes?",
          answer: "It can. If the promissory note is linked to a consumer credit contract (for personal, domestic, or household purposes), the National Credit Code provisions of the NCCP Act 2009 may apply. This requires the lender to hold an Australian Credit Licence, disclose credit costs, and comply with responsible lending obligations.",
        },
        {
          question: "What is the limitation period for a promissory note in Australia?",
          answer: "The limitation period is 6 years from the date the cause of action arose (date of default or demand) in most states under state Limitation Acts. After 6 years, the debt is statute-barred. Partial payment or written acknowledgement of the debt can restart the limitation period.",
        },
        {
          question: "Do I need to pay stamp duty on a promissory note in Australia?",
          answer: "Stamp duty obligations on promissory notes vary by state and most have been abolished or significantly reduced for standard loan instruments. Check with your state revenue office. NSW and VIC generally exempt most loan and credit instruments from stamp duty, but always verify current rules.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "No national law mandates a pre-litigation demand letter, but courts expect parties to attempt resolution before filing",
        "Practice Notes in state Supreme Courts and Federal Court require parties to follow applicable pre-action protocols",
        "Small claims: NCAT (NSW), VCAT (VIC), QCAT (QLD) — most matters below $25,000–$100,000 (threshold varies) go to these tribunals",
        "Calderbank letters: a formal offer to settle 'without prejudice save as to costs' — court can award indemnity costs if better offer refused",
        "Debt claims: clearly state the amount, basis, and due date; give reasonable time to respond (typically 14–28 days)",
        "Australian Consumer Law (ACL): misleading or deceptive conduct in collection letters is prohibited",
      ],
      restrictions: [
        "Debt collectors must be licensed under state laws; ASIC regulates debt collection by financial services licensees",
        "ACCC and state consumer protection agencies enforce the prohibition on unconscionable or misleading debt collection conduct",
        "Australian Consumer Law: do not threaten legal action unless genuinely intended and legally available",
        "Personal insolvency: if the debtor may be bankrupt, different rules apply — debt collection must comply with the Bankruptcy Act 1966",
      ],
      faq: [
        {
          question: "What is a Calderbank letter in Australia?",
          answer: "A Calderbank letter is an offer to settle a dispute 'without prejudice save as to costs.' If the other party rejects the offer and the court ultimately awards less (or more, if the defendant makes the offer), the court may order indemnity costs against the rejecting party. It is a tactical tool to encourage settlement.",
        },
        {
          question: "How long should I give someone to pay after an Australian demand letter?",
          answer: "14 to 28 days is standard for commercial debts. Courts consider whether the claimant gave reasonable opportunity to respond. For consumer debts, ASIC's Regulatory Guide 96 (Debt Collection Guideline) recommends allowing sufficient time and not making demands in unreasonable circumstances.",
        },
        {
          question: "Can I add interest and costs to my demand letter in Australia?",
          answer: "Yes. You can claim interest under the contract, or under state legislation (e.g., Civil Procedure Act 2005 in NSW, s.100) for pre-judgment interest. You can also claim reasonable costs incurred in pursuing the debt. Some states allow recovery of legal costs for debt demands through specific court rules.",
        },
        {
          question: "What happens if I ignore pre-action requirements in Australia?",
          answer: "Courts have discretion to impose costs penalties on a party who failed to attempt resolution or follow pre-action protocols before commencing proceedings. Federal Court Practice Notes and state court rules increasingly require genuine pre-litigation engagement. Non-compliance can affect costs orders even if you win.",
        },
      ],
    },
  },

  // ── India ─────────────────────────────────────────────────────────────────
  india: {
    "residential-lease-agreement": {
      requirements: [
        "Governed by the Transfer of Property Act 1882 and relevant state Rent Control Acts",
        "The Model Tenancy Act 2021 provides a modern framework (adopted by states individually — check your state's adoption status)",
        "Lease agreements for terms of 12 months or more must be registered under the Registration Act 1908",
        "Stamp duty payable on registered leases — rate varies by state (e.g., Maharashtra: 0.25% of total rent for residential leases)",
        "Notarized Leave and Licence agreements are popular in Maharashtra and other states — different legal nature than a lease",
        "Rent receipts important for TDS: if monthly rent exceeds ₹50,000, tenant must deduct TDS at 5% (Section 194-IB of Income Tax Act)",
      ],
      restrictions: [
        "State Rent Control Acts in many states (Delhi Rent Control Act, Maharashtra Rent Control Act) protect sitting tenants from eviction and cap rent increases",
        "Properties covered by Rent Control Acts: landlord's ability to increase rent or evict is significantly constrained",
        "Leave and Licence agreements are designed to avoid the application of tenancy laws — carefully distinguish from a lease",
        "Model Tenancy Act 2021: security deposit capped at 2 months for residential properties (in states that have adopted it)",
      ],
      noticeRequirements: "Registration Act mandates: leases for 12+ months must be registered. Notice requirements vary by state and Rent Control Act — typically 1–3 months for termination.",
      faq: [
        {
          question: "What is the difference between a lease and a Leave and Licence in India?",
          answer: "A lease creates a transferable interest in the property and may give the tenant strong statutory protections under Rent Control Acts. A Leave and Licence agreement grants only a personal right to occupy (a licence) and is easier to terminate. Landlords in commercial cities like Mumbai often prefer Leave and Licence to retain flexibility.",
        },
        {
          question: "Must a residential lease be registered in India?",
          answer: "Yes, if the term is 12 months or more. Section 17 of the Registration Act 1908 requires mandatory registration. Unregistered leases for 12+ months cannot be used as evidence in court proceedings. Registration involves paying stamp duty and registration fees at the Sub-Registrar's office.",
        },
        {
          question: "How much stamp duty do I pay on a residential lease in India?",
          answer: "Stamp duty varies by state. Maharashtra charges 0.25% of total rent for residential leases up to 60 months (minimum ₹100). Delhi charges 2% of average annual rent for leases up to 5 years. Always check the current rate with your state's stamp duty authority before executing the agreement.",
        },
        {
          question: "When must a tenant deduct TDS on rent in India?",
          answer: "Individual tenants paying rent exceeding ₹50,000 per month must deduct TDS at 5% under Section 194-IB of the Income Tax Act. The TDS must be deposited using Form 26QC within 30 days of the end of the month. A TDS certificate (Form 16C) must be issued to the landlord.",
        },
      ],
    },
    "llc-operating-agreement": {
      requirements: [
        "India does not have an LLC structure — the equivalents are Private Limited Companies (Pvt Ltd) under the Companies Act 2013 and Limited Liability Partnerships (LLPs) under the LLP Act 2008",
        "Private Limited Companies: incorporated with the Registrar of Companies (ROC) under MCA21 portal",
        "LLP: incorporated under the Limited Liability Partnership Act 2008; annual filings (Form 11 and Form 8) required with the MCA",
        "LLP Agreement governs partner rights, profit sharing, and governance — the equivalent of an LLC operating agreement",
        "Minimum 2 partners for LLP (no maximum); minimum 2 directors and 2 shareholders for Pvt Ltd",
        "Digital Signature Certificates (DSC) and Director Identification Numbers (DIN) required for company/LLP formation",
      ],
      restrictions: [
        "FDI restrictions: certain sectors are restricted or prohibited for foreign ownership in Indian companies",
        "Pvt Ltd companies cannot invite the public to subscribe to shares",
        "LLPs with turnover above ₹40 lakh must have their accounts audited by a Chartered Accountant",
        "Annual compliance: Pvt Ltd must file MGT-7 (annual return), AOC-4 (financial statements) with MCA annually",
      ],
      faq: [
        {
          question: "What is the Indian equivalent of an LLC?",
          answer: "India offers two primary alternatives: a Private Limited Company (Pvt Ltd) under the Companies Act 2013, which provides limited liability for shareholders, or a Limited Liability Partnership (LLP) under the LLP Act 2008, which combines partnership flexibility with limited liability. LLPs are often preferred for smaller businesses due to lower compliance costs.",
        },
        {
          question: "What is an LLP Agreement in India?",
          answer: "An LLP Agreement is the constitutional document of a Limited Liability Partnership that governs the rights, duties, profit-sharing ratio, and management of the LLP. It must be executed on stamp paper and filed with the MCA within 30 days of LLP incorporation. If no agreement is filed, the default rules of Schedule I of the LLP Act apply.",
        },
        {
          question: "How is a Private Limited Company taxed in India?",
          answer: "Indian Pvt Ltd companies pay corporate tax at 22% (base rate) under the new optional tax regime (Section 115BAA), or 25% for companies with turnover below ₹400 crore. Start-ups eligible under Section 80-IAC may receive a 3-year tax holiday. Add surcharge and cess for the effective rate.",
        },
        {
          question: "Can a foreigner own a company in India?",
          answer: "Yes, subject to FDI policy. Most sectors allow 100% foreign ownership under the automatic route (no prior government approval). Some sectors (e.g., defence, retail trading, insurance) have caps or require government approval. A company with any foreign shareholding is classified as a Foreign Owned or Controlled Company (FOCC) with additional compliance requirements.",
        },
      ],
    },
    "employment-contract": {
      requirements: [
        "The four Labour Codes (2019–2020) consolidate 44 central labour laws: Code on Wages, Industrial Relations Code, Social Security Code, and Occupational Safety Code",
        "Implementation of Labour Codes is deferred state by state — many states had not fully implemented as of 2024",
        "Offer letter and appointment letter are standard; formal employment contracts are common for managerial and executive roles",
        "Fixed-term employment contracts recognised under Industrial Relations Code 2020",
        "EPF (Employees' Provident Fund): mandatory for establishments with 20+ employees; 12% each from employer and employee",
        "ESI (Employees' State Insurance): mandatory for employees earning ≤ ₹21,000/month in applicable establishments",
        "Gratuity: payable after 5 years of continuous service at rate of 15 days' wages per year (Payment of Gratuity Act 1972)",
      ],
      restrictions: [
        "Industrial Disputes Act 1947 (until replaced by Industrial Relations Code): restrictions on retrenchment in establishments with 100+ workers without government permission",
        "Scheduled employment under the Minimum Wages Act — minimum wage varies by state and occupation",
        "Standing Orders (Industrial Employment Act) govern conditions of employment for 'workmen' in industrial establishments",
        "Non-compete clauses: Indian courts have held post-employment non-competes largely unenforceable under Section 27 of the Contract Act 1872",
      ],
      noticeRequirements: "Depends on employment classification. For non-workmen (managerial): as per contract (typically 1–3 months). For workmen: Industrial Relations Code specifies 15–90 days depending on establishment size.",
      faq: [
        {
          question: "Are non-compete clauses enforceable in India?",
          answer: "Generally no. Section 27 of the Indian Contract Act 1872 declares 'every agreement by which anyone is restrained from exercising a lawful profession, trade or business' void. Indian courts have consistently struck down post-employment non-competes. Only non-solicitation clauses limited in time are sometimes upheld as partial restraints.",
        },
        {
          question: "What is EPF and who must contribute?",
          answer: "The Employees' Provident Fund and Miscellaneous Provisions Act 1952 mandates that establishments with 20+ employees contribute to the EPF. Both employer and employee contribute 12% of basic wages. The employee's share goes to the PF account; the employer's share is split between EPF and EPS (Employees' Pension Scheme).",
        },
        {
          question: "What are India's new Labour Codes and when do they apply?",
          answer: "India consolidated 44 central labour laws into four codes (2019–2020): Code on Wages, Industrial Relations Code, Social Security Code, and Occupational Safety, Health and Working Conditions Code. States must enact their own rules to implement the codes. As of 2024, full national implementation is still pending, so existing Acts continue to apply in many states.",
        },
        {
          question: "Is gratuity mandatory in India?",
          answer: "Yes, for establishments with 10 or more employees. Under the Payment of Gratuity Act 1972, an employee who completes 5 years of continuous service is entitled to gratuity at the rate of 15 days' wages (based on last drawn salary) for each completed year of service, up to a maximum of ₹20 lakh.",
        },
      ],
    },
    "power-of-attorney": {
      requirements: [
        "Governed by the Powers of Attorney Act 1882 and the Registration Act 1908",
        "A Power of Attorney involving immovable property must be registered under the Registration Act 1908",
        "Registration requires: stamp duty (varies by state), presence before Sub-Registrar, and two witnesses",
        "General Power of Attorney authorises broad powers; Specific/Special PoA is limited to defined transactions",
        "For NRI (Non-Resident Indian) donors: PoA must be notarised and attested by Indian Consulate/Embassy abroad before use in India",
        "Stamp duty on PoA for property transactions varies significantly by state — e.g., Maharashtra charges ₹100–500 for general PoA",
      ],
      restrictions: [
        "Supreme Court of India (2011 judgment — Suraj Lamp Industries case): PoA cannot be used to transfer immovable property as a substitute for a registered sale deed",
        "PoA for registration of sale deeds: valid if properly executed and registered, but the PoA itself must be registered",
        "An irrevocable PoA is only truly irrevocable if it is coupled with an interest (the attorney has an interest in the subject matter)",
        "PoA automatically terminates on death, insolvency, or insanity of the donor (unless coupled with an interest)",
      ],
      faq: [
        {
          question: "Must a power of attorney be registered in India?",
          answer: "Not all PoAs require registration. A PoA relating to immovable property (e.g., authorising sale, lease, or mortgage) must be registered under Section 17 of the Registration Act 1908. Other PoAs may be notarised without registration. An unregistered PoA for property transactions may not be accepted by the Sub-Registrar.",
        },
        {
          question: "How does an NRI create a valid power of attorney for use in India?",
          answer: "An NRI can execute a PoA outside India by signing it before a Notary Public in the country of residence. The PoA is then apostilled (if the country is an Hague Convention signatory) or attested by the Indian Consulate/Embassy. On arrival in India, it should be adjudicated (stamp duty paid) and may need registration for property-related transactions.",
        },
        {
          question: "Can a PoA be used to sell property in India?",
          answer: "Yes, but with limitations. After the Supreme Court's 2011 ruling (Suraj Lamp Industries), a PoA sale is not a substitute for a registered sale deed. The attorney can sign and register a sale deed on behalf of the principal, but the transaction must be completed through a proper registered sale deed — not just a PoA transfer.",
        },
        {
          question: "What is an irrevocable power of attorney in India?",
          answer: "An irrevocable PoA is one that cannot be cancelled by the donor — but it is only truly irrevocable in Indian law if it is given as security or if the attorney has a direct interest in the subject matter (a PoA 'coupled with an interest'). A bare PoA declared irrevocable can still be revoked by the donor, and terminates on death.",
        },
      ],
    },
    "last-will-and-testament": {
      requirements: [
        "Governed by the Indian Succession Act 1925 for Hindus, Buddhists, Sikhs, Jains, and Christians (personal law governs Muslims)",
        "Must be in writing and signed or marked by the testator in the presence of at least two witnesses",
        "Witnesses must attest the will in the presence of the testator — but witnesses need not be present at the same time",
        "Testator must be of sound mind (testamentary capacity) and at least 21 years old (Indian Succession Act)",
        "Probate required in High Court jurisdictions (Bombay, Calcutta, Madras presidencies and notified territories) for estates above ₹500",
        "No inheritance tax in India since 1985; estate transfers at death are generally not taxable as income",
        "Agricultural land in most states cannot be transferred by will to non-agriculturists",
      ],
      restrictions: [
        "Muslim personal law (Hanafi school): a Muslim can only will up to one-third of the estate to non-heirs; mandatory shares go to heirs (Islamic inheritance)",
        "Hindu Undivided Family (HUF) property: a coparcener cannot will their interest independently — governed by rules of succession",
        "Foreign nationals wishing to bequeath property in India face restrictions under FEMA 1999 on immovable property",
        "A will by a person who lacks testamentary capacity, or was made under coercion or undue influence, can be challenged in Probate Court",
      ],
      faq: [
        {
          question: "Does a will need to be registered in India?",
          answer: "Registration is not mandatory for a will to be valid — an unregistered, properly signed and witnessed will is enforceable under the Indian Succession Act 1925. However, registering a will with the Sub-Registrar provides a public record, reduces the risk of forgery disputes, and can make the probate process smoother.",
        },
        {
          question: "What is probate in India and when is it required?",
          answer: "Probate is a court-issued certificate that the will is genuine and the executor is authorised to administer the estate. It is mandatory in the original Presidency towns (Mumbai, Kolkata, Chennai) and certain notified areas under Section 213 of the Indian Succession Act 1925. In other areas, probate is optional but may be required by banks and registrars.",
        },
        {
          question: "Can a Hindu will away all their property in India?",
          answer: "A Hindu can will their self-acquired property to anyone. However, the interest of a coparcener in a Hindu Undivided Family (HUF) is governed by the Hindu Succession Act 1956 and may not be freely willed — it passes by survivorship to other coparceners. After the 2005 amendment, daughters are also coparceners with equal rights.",
        },
        {
          question: "Is there an inheritance tax in India?",
          answer: "No. India abolished estate duty (inheritance tax) in 1985. Assets inherited at death are generally not subject to income tax. However, if inherited assets are subsequently sold, capital gains tax applies (with the cost computed from the original purchase price of the deceased, not the date of inheritance under most interpretations).",
        },
      ],
    },
    "non-compete-agreement": {
      requirements: [
        "Section 27 of the Indian Contract Act 1872 declares every agreement in restraint of trade to be void",
        "Post-employment non-competes are generally not enforceable in India under this provision",
        "Courts allow limited exceptions: non-competes during employment, and in sale-of-business transactions",
        "Non-solicitation of clients and employees (as opposed to non-competition per se) are more likely to be upheld",
        "Trade secret and confidentiality provisions survive termination and are enforceable independently",
        "Employers should rely on well-drafted confidentiality and trade secret protections rather than post-employment non-competes",
      ],
      restrictions: [
        "No post-employment non-compete has survived full judicial scrutiny in the Supreme Court of India",
        "Garden leave clauses with pay during the notice period offer a practical alternative to post-employment restraints",
        "Non-competes in business sale agreements (seller agrees not to compete) are more favourably viewed by courts — they protect goodwill paid for",
        "Geographical restriction alone does not rescue an otherwise void restraint under Section 27",
      ],
      faq: [
        {
          question: "Are non-compete clauses enforceable in India?",
          answer: "No, as a general rule. Section 27 of the Indian Contract Act 1872 renders post-employment non-compete clauses void. Indian courts consistently refuse to enforce them. The clause may survive in an employment context only during active employment, not after termination.",
        },
        {
          question: "What protection can an Indian employer realistically get?",
          answer: "Indian employers should focus on: (1) strong confidentiality and trade secret clauses (enforceable under Contract Act and Information Technology Act), (2) non-solicitation of clients and employees (partially upheld by courts), (3) garden leave during the notice period, and (4) IP assignment clauses ensuring all work product belongs to the employer.",
        },
        {
          question: "Are non-competes in business sale agreements enforceable in India?",
          answer: "Yes, to a greater extent. When a business is sold, a non-compete by the seller is viewed as protecting the goodwill the buyer has paid for. Courts are more willing to enforce such clauses if they are reasonable in scope, geography, and duration — typically up to 3–5 years and within a defined geographic area.",
        },
        {
          question: "Can an employer use garden leave instead of a non-compete in India?",
          answer: "Yes. Garden leave (requiring the employee to serve out their notice period at home on full pay, without access to clients or work) is a practical and enforceable alternative. During this period, the employee remains employed and cannot join a competitor without breaching their employment contract.",
        },
      ],
    },
    "independent-contractor-agreement": {
      requirements: [
        "Contract Labour (Regulation and Abolition) Act 1970 governs use of contract workers in principal establishments with 20+ workmen",
        "Principal employer must obtain a Registration Certificate; contractor must obtain a Licence from the Labour Commissioner",
        "Contractor must provide statutory benefits (PF, ESI, gratuity) to workmen employed — or principal employer bears liability",
        "TDS (Tax Deducted at Source): Section 194C of Income Tax Act requires deduction of TDS at 1% (individual/HUF) or 2% (others) on contract payments exceeding ₹30,000 per transaction or ₹1 lakh per year",
        "GST: contractors with turnover above ₹20 lakh must register for GST and charge applicable GST on services",
        "Agreement should specify: deliverables, payment milestones, IP ownership, and confidentiality obligations",
      ],
      restrictions: [
        "Contract Labour Act prohibits use of contract labour for perennial core activities (notified under the Act)",
        "Courts and labour tribunals look past contract labels — if workers are integrated into the principal's operations, they may be treated as employees",
        "Principal employer remains liable for contractor's statutory obligations if contractor defaults",
        "The gig worker debate: Draft Code on Social Security 2020 proposes extending some protections to gig and platform workers",
      ],
      faq: [
        {
          question: "Does India's Contract Labour Act apply to my business?",
          answer: "The Contract Labour (Regulation and Abolition) Act 1970 applies to establishments employing 20 or more contract workmen on any day in the preceding 12 months, and to contractors employing 20 or more workmen. If applicable, the principal employer must register and the contractor must be licensed — failing which both face penalties.",
        },
        {
          question: "What TDS must be deducted on contractor payments in India?",
          answer: "Section 194C of the Income Tax Act 1961 requires TDS deduction at 1% for payments to individual/HUF contractors and 2% for companies or firms, when payments exceed ₹30,000 per contract or ₹1 lakh in aggregate per year. TDS must be deposited by the 7th of the following month and reported in Form 26Q.",
        },
        {
          question: "Does a contractor need to register for GST in India?",
          answer: "Yes, if annual taxable turnover exceeds ₹20 lakh (₹10 lakh for special category states). GST-registered contractors must issue tax invoices and charge the applicable GST rate (18% for most professional services). The principal can claim input tax credit on the GST paid to registered contractors.",
        },
        {
          question: "Who is responsible if a contractor doesn't pay PF/ESI to workers in India?",
          answer: "Under the Contract Labour Act, the principal employer bears ultimate liability if the contractor fails to provide statutory benefits (PF, ESI). Courts have repeatedly held that where a contractor defaults, the principal employer must step in. This makes it essential to include indemnity clauses in contractor agreements and verify compliance regularly.",
        },
      ],
    },
    "commercial-lease-agreement": {
      requirements: [
        "Governed by the Transfer of Property Act 1882 and the Registration Act 1908",
        "Commercial leases for 12 months or more must be registered under the Registration Act 1908",
        "Stamp duty on commercial leases is significantly higher than residential — varies by state (e.g., Maharashtra: stamp duty on commercial lease based on rental value and term)",
        "Shops and Establishment Acts (state-specific) regulate working conditions in commercial premises — register the establishment within 30 days of commencing business",
        "Local body permissions, trade licences, and No Objection Certificates (NOCs) may be required for specific commercial activities",
        "Service tax/GST: commercial rent is taxable under GST at 18% — landlord must invoice and the tenant can claim ITC if registered",
      ],
      restrictions: [
        "Pre-existing tenants protected under state Rent Control Acts may resist eviction even from commercial premises",
        "Certain commercial properties (shops, offices) in older areas may be governed by state Rent Control Acts that restrict rent increases and eviction",
        "Courts apply Section 106 of the Transfer of Property Act for notice periods unless the lease specifies otherwise",
        "Subletting typically requires express landlord consent — implied consent is insufficient for registered leases",
      ],
      faq: [
        {
          question: "Does GST apply to commercial rent in India?",
          answer: "Yes. Commercial rent (renting of immovable property for business) is a taxable supply under the GST Act. GST at 18% applies if the landlord's aggregate turnover exceeds ₹20 lakh (registration threshold). GST-registered tenants can claim input tax credit on the GST paid, reducing the effective cost.",
        },
        {
          question: "Must a commercial lease be registered in India?",
          answer: "Yes, if the lease term is 12 months or more under Section 17 of the Registration Act 1908. Registration requires executing the lease on stamp paper (correct denomination) and presenting it at the Sub-Registrar's office. An unregistered long-term lease cannot be used as evidence in civil court proceedings.",
        },
        {
          question: "What are typical rent escalation clauses in Indian commercial leases?",
          answer: "Most Indian commercial leases include an annual rent escalation of 5–15%, or lock-in periods (typically 3–5 years) with rent revision every 3 years. Market practice in metros like Mumbai and Bengaluru is 5% per annum compounded, or 15% every 3 years. The lease should specify the escalation mechanism, base year, and any cap.",
        },
        {
          question: "What is a security deposit in an Indian commercial lease?",
          answer: "Commercial security deposits in India are typically 3–10 months' rent (higher than residential), held interest-free by the landlord. In Mumbai and Bengaluru, 6–10 months is common. The deposit is refundable at lease end (less deductions for damages). Unlike the UK or Australia, there is no statutory scheme governing commercial security deposits.",
        },
      ],
    },
    "promissory-note": {
      requirements: [
        "Governed by the Negotiable Instruments Act 1881 (NI Act)",
        "Must contain: unconditional promise in writing to pay a definite sum, signed by the maker, to a specified payee or bearer",
        "Stamp duty is mandatory under the Indian Stamp Act 1899 — rate varies by state and note value",
        "Unstamped or inadequately stamped promissory notes are inadmissible in Indian courts as evidence",
        "Interest must be specified clearly — compound interest requires express agreement in writing",
        "Limitation period: 3 years from the date the note falls due (Limitation Act 1963, Article 37)",
      ],
      restrictions: [
        "Section 138 of the NI Act: dishonour of a cheque is a criminal offence; the same does not apply directly to a promissory note dishonour (civil remedy only)",
        "A promissory note payable to bearer on demand is treated as currency and is regulated by the RBI Act",
        "Usurious Loans Act 1918: courts may reopen loans with excessive interest — applicable in some states",
        "Notes executed outside India must meet the stamp requirements of the state where they are first used in India",
      ],
      faq: [
        {
          question: "Is stamp duty required on a promissory note in India?",
          answer: "Yes. The Indian Stamp Act 1899 mandates that promissory notes be stamped at the prescribed rate, which varies by state and the amount of the note. An unstamped or inadequately stamped promissory note cannot be admitted as evidence in civil court proceedings, making it effectively unenforceable until stamp duty and penalty are paid.",
        },
        {
          question: "What is the limitation period for a promissory note in India?",
          answer: "Under the Limitation Act 1963, Article 37, the limitation period for a suit on a promissory note payable at a fixed time is 3 years from the date the note falls due. For a demand note, the period starts from the date of the note. Part payment or written acknowledgement of the debt before expiry restarts the limitation period.",
        },
        {
          question: "Can interest be claimed on a promissory note in India?",
          answer: "Yes, if stated in the note. Simple interest can be included expressly. Compound interest requires explicit written agreement — it is not implied. Courts may grant simple interest under Section 34 of the Code of Civil Procedure even if not specified in the note, but compound interest requires the note to provide for it.",
        },
        {
          question: "Does the NI Act Section 138 apply to promissory notes?",
          answer: "No. Section 138 of the Negotiable Instruments Act (which creates a criminal offence for cheque dishonour) applies only to cheques, not to promissory notes. If a promissory note is dishonoured, the holder's remedy is a civil suit for money due within the limitation period. There is no criminal exposure for the maker of a dishonoured note.",
        },
      ],
    },
    "demand-letter": {
      requirements: [
        "The Code of Civil Procedure 1908 (CPC) does not mandate a pre-suit demand letter for most civil claims",
        "Section 80 of CPC: mandatory 2-month notice before suing the Government of India or a public officer — a Section 80 notice serves as the demand letter",
        "Legal notices for specific statutes: Negotiable Instruments Act (Section 138 cheque dishonour), Consumer Protection Act 2019, RERA 2016, and IBC 2016 each require prescribed notices",
        "Section 138 NI Act cheque dishonour notice: must be sent within 30 days of receiving cheque dishonour memo; debtor has 15 days to pay before criminal complaint can be filed",
        "IBC demand notice (CIRP initiation): demand for payment of operational debt must give 10 days to repay before filing at NCLT",
        "Letter should state: specific amount, basis of claim, documents relied on, and deadline for payment",
      ],
      restrictions: [
        "Section 80 CPC notices against government bodies: strict compliance required — defective notices result in suit dismissal",
        "Threatening criminal proceedings (e.g., FIR for cheating) to coerce payment of a commercial debt can amount to criminal intimidation or extortion",
        "Consumer court demand: notice must comply with Consumer Protection (Consumer Disputes Redressal Commissions) Rules 2020",
        "Defamatory statements in legal notices can expose the sender to a defamation claim — stick to facts",
      ],
      faq: [
        {
          question: "Is a demand letter mandatory before suing in India?",
          answer: "Not generally for private civil disputes. However, specific statutes require prior notice: Section 80 CPC mandates a 2-month government notice; Section 138 of the NI Act requires a 30-day cheque dishonour notice; RERA and IBC have their own prescribed notice requirements. It is always good practice to send a demand letter to establish a record of non-payment.",
        },
        {
          question: "What is a Section 80 CPC notice in India?",
          answer: "Section 80 of the Code of Civil Procedure requires a person who wishes to sue the Government of India, a state government, or a public officer in their official capacity to give at least 2 months' written notice before filing the suit. The notice must state the cause of action, relief sought, and name/address of the claimant. Suit filed without this notice is dismissed.",
        },
        {
          question: "How do I write a legal notice for cheque dishonour in India?",
          answer: "Under Section 138 of the Negotiable Instruments Act 1881, once a cheque is dishonoured, the payee must send written notice to the drawer within 30 days of the bank's dishonour memo. The notice must demand payment of the cheque amount within 15 days. If unpaid, a criminal complaint can be filed before a magistrate within 30 days of the notice period expiring.",
        },
        {
          question: "What are the legal notice requirements under RERA in India?",
          answer: "Under the Real Estate (Regulation and Development) Act 2016, aggrieved buyers or allottees must file a complaint before the RERA Authority or Adjudicating Officer. A pre-complaint demand notice to the promoter/builder (specifying the default and demanding remedy within a specified period) is strongly recommended before filing, though not always mandatory depending on the state RERA rules.",
        },
      ],
    },
  },
}

// ── Parsed slug type ──────────────────────────────────────────────────────────

export interface ParsedIntlPageSlug {
  country: Country
  doc: IntlEligibleDoc
  countrySlug: string
  docSlug: string
}

// ── Helper functions ──────────────────────────────────────────────────────────

/**
 * Parse a URL slug like "uk-employment-contract" into
 * { country, doc, countrySlug, docSlug }.
 * Returns null if the slug doesn't match a known country + doc combination.
 */
export function parseInternationalPageSlug(slug: string): ParsedIntlPageSlug | null {
  for (const country of COUNTRIES) {
    if (!slug.startsWith(country.slug + "-")) continue
    const docSlug = slug.slice(country.slug.length + 1)
    const doc = INTL_ELIGIBLE_DOCS.find((d) => d.slug === docSlug)
    if (doc) {
      return { country, doc, countrySlug: country.slug, docSlug }
    }
  }
  return null
}

/**
 * Generate all static params for international pages.
 * Returns category/slug pairs for the existing [category]/[slug] route.
 */
export function getInternationalPageStaticParams(): { category: string; slug: string }[] {
  const params: { category: string; slug: string }[] = []
  for (const countrySlug of INTL_LAUNCH_SLUGS) {
    const country = COUNTRIES.find((c) => c.slug === countrySlug)
    if (!country) continue
    for (const doc of INTL_ELIGIBLE_DOCS) {
      params.push({
        category: doc.category,
        slug: `${country.slug}-${doc.slug}`,
      })
    }
  }
  return params
}

/**
 * Get a generic fallback note set for a country × doc combination
 * that doesn't have a custom entry yet.
 */
function getGenericIntlNotes(countryName: string, docTitle: string, legalSystem: string) {
  return {
    requirements: [
      `${docTitle} requirements in ${countryName} are governed by ${legalSystem}`,
      "Ensure the document is executed in accordance with local formality requirements",
      "Both parties should retain signed originals; translations may be required for official use",
      "Seek local legal counsel to confirm jurisdictional compliance before signing",
    ],
    restrictions: [
      "Local consumer protection and mandatory law provisions may override contract terms",
      "Cross-border disputes may require choice of law and jurisdiction clauses",
    ],
    faq: [
      {
        question: `Is this document valid in ${countryName}?`,
        answer: `A properly drafted and executed ${docTitle} can be valid in ${countryName} if it meets local legal requirements under ${legalSystem}. We recommend having a local lawyer review the document before execution.`,
      },
      {
        question: `Does a ${docTitle} need to be notarized in ${countryName}?`,
        answer: `Notarization requirements vary by document type and use case in ${countryName}. Some official transactions require notarized copies. Consult a local practitioner for your specific situation.`,
      },
      {
        question: `What language must a ${docTitle} be in ${countryName}?`,
        answer: `${countryName} has its own official language requirements for legal documents. In certain jurisdictions bilingual documents may be required. Verify requirements with a local legal professional.`,
      },
      {
        question: `How long is a ${docTitle} valid in ${countryName}?`,
        answer: `Validity periods depend on the specific terms of the document and the applicable statute of limitations under ${legalSystem}. Keep signed originals in a safe location and review the document periodically.`,
      },
    ],
  }
}

/**
 * Get all page data for a country × doc page.
 * Returns null if the country is not in the launch batch.
 */
export function getInternationalPageData(countrySlug: string, docSlug: string) {
  const country = COUNTRIES.find((c) => c.slug === countrySlug)
  if (!country) return null

  const doc = INTL_ELIGIBLE_DOCS.find((d) => d.slug === docSlug)
  if (!doc) return null

  const countryNotes = INTL_DOC_NOTES[countrySlug]?.[docSlug]
  const notes = countryNotes ?? getGenericIntlNotes(country.name, doc.title, country.legalSystem)

  const docDisplayTitle = doc.intlTitle.replace("{Country}", country.name)
  const pageTitle = docDisplayTitle
  const seoTitle = `${country.name} ${doc.title} Template | LegalLawDocs.com`
  const metaDescription = `Create a ${country.name} ${doc.title.toLowerCase()} online. AI-generated and tailored to ${country.legalSystem}. Instant PDF & DOCX download.`

  return {
    country,
    doc,
    pageTitle,
    seoTitle,
    metaDescription,
    h1: pageTitle,
    notes,
  }
}

/**
 * Returns the canonical URL for an international page.
 */
export function getInternationalPageUrl(
  countrySlug: string,
  docSlug: string,
  docCategory: string
): string {
  return `/documents/${docCategory}/${countrySlug}-${docSlug}`
}

/**
 * Returns sibling country pages (same doc, different countries) for cross-linking.
 */
export function getSiblingCountryPages(
  docSlug: string,
  currentCountrySlug: string
): { countryName: string; countrySlug: string; url: string; category: string; flag: string }[] {
  const doc = INTL_ELIGIBLE_DOCS.find((d) => d.slug === docSlug)
  if (!doc) return []
  return INTL_LAUNCH_SLUGS
    .filter((slug) => slug !== currentCountrySlug)
    .map((slug) => {
      const country = COUNTRIES.find((c) => c.slug === slug)!
      return {
        countryName: country.name,
        countrySlug: slug,
        url: getInternationalPageUrl(slug, docSlug, doc.category),
        category: doc.category,
        flag: country.flag,
      }
    })
}
