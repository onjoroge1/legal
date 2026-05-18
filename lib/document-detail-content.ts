export interface DocumentFaqItem {
  question: string
  answer: string
}

export interface DocumentKeySection {
  title: string
  description: string
}

export interface DocumentDetailContent {
  overview: {
    title: string
    body: string
  }
  whyItMatters: string[]
  keySections: DocumentKeySection[]
  process: DocumentKeySection[]
  stateConsiderations: DocumentKeySection[]
  mistakesToAvoid: string[]
  faq: DocumentFaqItem[]
}

const ndaDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Non-Disclosure Agreement (NDA)?",
    body:
      "An NDA is a legal agreement that protects confidential information shared between parties. It defines what is confidential, how it can be used, and what happens if it is disclosed improperly. A well‑drafted NDA reduces legal risk, preserves trade secrets, and sets clear expectations before sensitive discussions begin.",
  },
  whyItMatters: [
    "Protects sensitive business, financial, or technical information.",
    "Sets clear expectations on confidentiality and permitted use.",
    "Reduces the risk of trade secret loss and litigation.",
    "Provides enforceable remedies if confidentiality is breached.",
    "Builds trust during negotiations and partnerships.",
  ],
  keySections: [
    {
      title: "Definition of Confidential Information",
      description:
        "Clarifies what information is protected, including written, oral, and digital disclosures.",
    },
    {
      title: "Permitted Use",
      description:
        "Limits how the receiving party can use the confidential information.",
    },
    {
      title: "Exclusions",
      description:
        "Carves out information that is public, independently developed, or legally obtained.",
    },
    {
      title: "Term and Duration",
      description:
        "Defines how long confidentiality obligations last and when they end.",
    },
    {
      title: "Remedies",
      description:
        "Specifies injunctive relief and legal remedies in case of breach.",
    },
  ],
  process: [
    {
      title: "Step 1: Identify Parties",
      description:
        "List the disclosing and receiving parties with accurate legal names.",
    },
    {
      title: "Step 2: Define Purpose",
      description:
        "Explain the business relationship or project requiring confidentiality.",
    },
    {
      title: "Step 3: Describe Confidential Info",
      description:
        "Specify categories of information that should be protected.",
    },
    {
      title: "Step 4: Set Term",
      description:
        "Select a reasonable confidentiality duration based on your needs.",
    },
    {
      title: "Step 5: Execute Properly",
      description:
        "Have both parties sign and retain a copy for enforcement.",
    },
  ],
  stateConsiderations: [
    {
      title: "Non-Compete Restrictions",
      description:
        "Some states restrict non‑compete clauses; NDAs must comply with local law.",
    },
    {
      title: "Trade Secret Statutes",
      description:
        "State trade secret laws affect enforceability and remedies.",
    },
    {
      title: "Duration Limits",
      description:
        "Certain states limit NDA duration; avoid unreasonably long terms.",
    },
  ],
  mistakesToAvoid: [
    "Defining confidential information too broadly or vaguely.",
    "Omitting exclusions for public or independently developed info.",
    "Using non‑compete clauses that violate state law.",
    "Failing to specify the purpose and permitted use.",
    "Not collecting signatures from authorized representatives.",
  ],
  faq: [
    {
      question: "Do I need an NDA before sharing my idea?",
      answer:
        "If your idea involves confidential details, an NDA is a strong protective step. It clarifies expectations and provides legal remedies if the information is misused.",
    },
    {
      question: "What is the difference between mutual and unilateral NDAs?",
      answer:
        "A mutual NDA applies to both parties disclosing information, while a unilateral NDA protects information from only one party.",
    },
    {
      question: "How long should an NDA last?",
      answer:
        "Most NDAs last 1–5 years depending on the type of information. Some states restrict longer durations.",
    },
    {
      question: "Can I include a non‑compete in an NDA?",
      answer:
        "You can, but enforceability depends on state law. Many states restrict or prohibit non‑competes.",
    },
    {
      question: "Is an NDA enforceable without notarization?",
      answer:
        "Yes. NDAs generally require signatures only; notarization is not typically required.",
    },
    {
      question: "What happens if someone breaches the NDA?",
      answer:
        "You can pursue damages and injunctive relief depending on the agreement and state law.",
    },
  ],
}

const llcDetail: DocumentDetailContent = {
  overview: {
    title: "What Is an LLC Operating Agreement?",
    body:
      "An LLC Operating Agreement is the internal rulebook for your company. It defines ownership percentages, management structure, voting rights, profit distributions, and what happens if a member leaves. Even in states that don’t require it, an operating agreement is essential for liability protection and clarity.",
  },
  whyItMatters: [
    "Protects limited liability by separating business from personal affairs.",
    "Defines ownership and financial rights to prevent disputes.",
    "Clarifies management authority and voting rules.",
    "Sets procedures for member exit, transfer, or dissolution.",
    "Helps with banking, investors, and audits.",
  ],
  keySections: [
    {
      title: "Members and Ownership",
      description:
        "Lists members and their ownership percentages or units.",
    },
    {
      title: "Capital Contributions",
      description:
        "Specifies initial and future funding obligations.",
    },
    {
      title: "Management Structure",
      description:
        "Defines member‑managed vs manager‑managed operations.",
    },
    {
      title: "Distributions",
      description:
        "Explains how profits and losses are allocated.",
    },
    {
      title: "Transfers and Dissolution",
      description:
        "Controls how ownership can change and how the LLC can wind down.",
    },
  ],
  process: [
    {
      title: "Step 1: Identify Members",
      description:
        "List all owners and their contributions.",
    },
    {
      title: "Step 2: Select Management Type",
      description:
        "Decide between member‑managed or manager‑managed.",
    },
    {
      title: "Step 3: Define Voting Rights",
      description:
        "Outline how decisions are made and thresholds required.",
    },
    {
      title: "Step 4: Set Financial Rules",
      description:
        "Establish profit, loss, and distribution rules.",
    },
    {
      title: "Step 5: Execute Agreement",
      description:
        "Members sign to make the agreement binding.",
    },
  ],
  stateConsiderations: [
    {
      title: "State Filing Requirements",
      description:
        "Some states require an operating agreement for compliance or banking.",
    },
    {
      title: "Default LLC Statutes",
      description:
        "Without an agreement, state default rules apply, which may not fit your needs.",
    },
    {
      title: "Publication Rules",
      description:
        "Certain states impose publication requirements after formation.",
    },
  ],
  mistakesToAvoid: [
    "Failing to define ownership and voting rights clearly.",
    "Omitting rules for member exit or disputes.",
    "Not aligning distributions with tax strategy.",
    "Using a generic template that conflicts with state law.",
    "Not updating the agreement after ownership changes.",
  ],
  faq: [
    {
      question: "Is an operating agreement required by law?",
      answer:
        "Some states require it, while others don’t. Even if not required, it is strongly recommended to protect liability and prevent disputes.",
    },
    {
      question: "Can a single‑member LLC have an operating agreement?",
      answer:
        "Yes. Single‑member LLCs benefit from written rules that strengthen liability protection and banking credibility.",
    },
    {
      question: "Can I update my operating agreement later?",
      answer:
        "Yes. It should be reviewed whenever members, ownership, or management structure changes.",
    },
    {
      question: "What if we don’t have an operating agreement?",
      answer:
        "State default rules will apply, which may not reflect your intended ownership or management structure.",
    },
    {
      question: "Does it need to be notarized?",
      answer:
        "Not typically. Most operating agreements only require member signatures.",
    },
    {
      question: "Does the operating agreement affect taxes?",
      answer:
        "It doesn’t change tax classification, but it can influence distributions and allocations.",
    },
  ],
}

const employmentDetail: DocumentDetailContent = {
  overview: {
    title: "What Is an Employment Contract?",
    body:
      "An employment contract defines the terms of employment between an employer and an employee, including duties, pay, benefits, confidentiality, and termination. It protects both parties by setting expectations and reducing misunderstandings.",
  },
  whyItMatters: [
    "Clarifies compensation, benefits, and job responsibilities.",
    "Defines confidentiality and intellectual property ownership.",
    "Sets termination rules and notice requirements.",
    "Reduces disputes by documenting expectations.",
    "Supports compliance with state employment laws.",
  ],
  keySections: [
    {
      title: "Position and Duties",
      description:
        "Outlines the role, responsibilities, and reporting structure.",
    },
    {
      title: "Compensation and Benefits",
      description:
        "Defines salary, bonuses, equity, and benefits.",
    },
    {
      title: "Term and Termination",
      description:
        "Specifies at‑will or fixed‑term status and termination conditions.",
    },
    {
      title: "Confidentiality and IP",
      description:
        "Protects trade secrets and assigns IP created during employment.",
    },
    {
      title: "Dispute Resolution",
      description:
        "Sets rules for arbitration, mediation, or litigation.",
    },
  ],
  process: [
    {
      title: "Step 1: Define the Role",
      description:
        "Clarify the position, responsibilities, and expectations.",
    },
    {
      title: "Step 2: Set Compensation",
      description:
        "Outline salary, bonuses, equity, and benefits.",
    },
    {
      title: "Step 3: Choose Employment Type",
      description:
        "At‑will, fixed‑term, or executive contract.",
    },
    {
      title: "Step 4: Add Protective Clauses",
      description:
        "Include confidentiality, IP, and non‑compete where legal.",
    },
    {
      title: "Step 5: Execute Agreement",
      description:
        "Sign and store copies for compliance.",
    },
  ],
  stateConsiderations: [
    {
      title: "At‑Will Rules",
      description:
        "Most states allow at‑will employment, but contracts can limit termination rights.",
    },
    {
      title: "Restrictive Covenant Limits",
      description:
        "Non‑competes are restricted in many states and for certain wage levels.",
    },
    {
      title: "Wage and Hour Compliance",
      description:
        "Overtime and classification rules vary by state.",
    },
  ],
  mistakesToAvoid: [
    "Failing to clarify at‑will vs fixed‑term status.",
    "Including unenforceable non‑compete clauses.",
    "Leaving compensation or bonus terms vague.",
    "Not addressing IP ownership or confidentiality.",
    "Ignoring state wage and hour laws.",
  ],
  faq: [
    {
      question: "Do I need an employment contract for at‑will employees?",
      answer:
        "Not required, but a contract clarifies expectations and protects both parties. It can also include confidentiality and IP clauses.",
    },
    {
      question: "Are non‑competes enforceable?",
      answer:
        "Enforceability depends on state law. Some states prohibit or limit non‑competes, especially for lower‑wage workers.",
    },
    {
      question: "Can I change the contract later?",
      answer:
        "Yes, but changes should be in writing and signed by both parties.",
    },
    {
      question: "What should an executive contract include?",
      answer:
        "Executive contracts typically include bonuses, severance, and change‑in‑control provisions.",
    },
    {
      question: "Does the contract need to be notarized?",
      answer:
        "Generally no; signatures from both parties are sufficient.",
    },
    {
      question: "What happens if there’s a dispute?",
      answer:
        "The contract should specify how disputes are resolved (mediation, arbitration, or court).",
    },
  ],
}

const residentialLeaseDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Residential Lease Agreement?",
    body:
      "A residential lease agreement is a legally binding contract between a landlord and tenant that outlines rent, term, responsibilities, and rules for a rental property. It protects both parties by setting clear expectations and legal remedies.",
  },
  whyItMatters: [
    "Documents rent amount, payment dates, and penalties.",
    "Defines landlord and tenant responsibilities for repairs.",
    "Clarifies rules on pets, smoking, and occupancy.",
    "Provides legal remedies for non‑payment or violations.",
    "Ensures compliance with state and local tenant laws.",
  ],
  keySections: [
    {
      title: "Property and Term",
      description:
        "Defines the rental address and start/end dates.",
    },
    {
      title: "Rent and Deposits",
      description:
        "Specifies rent amount, due date, and security deposit rules.",
    },
    {
      title: "Maintenance Responsibilities",
      description:
        "Clarifies who handles repairs and upkeep.",
    },
    {
      title: "Rules and Occupancy",
      description:
        "Covers pets, guests, smoking, and occupancy limits.",
    },
    {
      title: "Termination and Renewal",
      description:
        "Outlines notice requirements and renewal terms.",
    },
  ],
  process: [
    {
      title: "Step 1: Identify Parties",
      description:
        "List landlord and tenant names with contact details.",
    },
    {
      title: "Step 2: Define Property",
      description:
        "Include full address and unit details.",
    },
    {
      title: "Step 3: Set Rent Terms",
      description:
        "Specify rent amount, due date, and payment method.",
    },
    {
      title: "Step 4: Add Policies",
      description:
        "Include rules for pets, smoking, and maintenance.",
    },
    {
      title: "Step 5: Sign and Distribute",
      description:
        "Both parties sign and retain copies.",
    },
  ],
  stateConsiderations: [
    {
      title: "Security Deposit Limits",
      description:
        "Many states limit the amount and require specific return timelines.",
    },
    {
      title: "Required Disclosures",
      description:
        "Lead paint and other disclosures may be required by law.",
    },
    {
      title: "Eviction Procedures",
      description:
        "States require specific notices and timelines before eviction.",
    },
  ],
  mistakesToAvoid: [
    "Leaving payment terms or late fees vague.",
    "Failing to include required state disclosures.",
    "Not documenting move‑in condition.",
    "Ignoring local rent control rules.",
    "Missing signatures or dates.",
  ],
  faq: [
    {
      question: "Do I need a lease for month‑to‑month rentals?",
      answer:
        "Yes. A written lease protects both parties and clarifies rent, policies, and notice periods.",
    },
    {
      question: "Can I charge any security deposit amount?",
      answer:
        "No. Many states cap security deposits; check local regulations.",
    },
    {
      question: "What should be included in a move‑in checklist?",
      answer:
        "Document the property condition with photos and notes to avoid disputes.",
    },
    {
      question: "Can I change the rent mid‑lease?",
      answer:
        "Not unless the lease allows it or both parties agree in writing.",
    },
    {
      question: "Do I need to provide a copy to the tenant?",
      answer:
        "Yes. Both parties should receive signed copies for records.",
    },
    {
      question: "Are electronic signatures valid?",
      answer:
        "In most states, yes, provided both parties consent.",
    },
  ],
}

const contractorDetail: DocumentDetailContent = {
  overview: {
    title: "What Is an Independent Contractor Agreement?",
    body:
      "An independent contractor agreement defines the working relationship between a client and a contractor. It outlines scope, payment, IP ownership, and confirms the contractor is not an employee. This protects both parties and reduces misclassification risk.",
  },
  whyItMatters: [
    "Clarifies scope of work and deliverables.",
    "Establishes payment terms and milestones.",
    "Defines IP ownership and usage rights.",
    "Helps avoid employment misclassification.",
    "Sets termination and dispute resolution terms.",
  ],
  keySections: [
    {
      title: "Scope of Services",
      description:
        "Defines services, deliverables, and timelines.",
    },
    {
      title: "Payment Terms",
      description:
        "Outlines rates, billing, and reimbursement.",
    },
    {
      title: "IP Ownership",
      description:
        "Specifies who owns work product and rights.",
    },
    {
      title: "Confidentiality",
      description:
        "Protects sensitive business information.",
    },
    {
      title: "Contractor Status",
      description:
        "Confirms contractor is not an employee.",
    },
  ],
  process: [
    {
      title: "Step 1: Define Scope",
      description:
        "List tasks, deliverables, and acceptance criteria.",
    },
    {
      title: "Step 2: Set Payment",
      description:
        "Choose hourly, fixed fee, or milestone payments.",
    },
    {
      title: "Step 3: IP and Confidentiality",
      description:
        "Clarify ownership and confidentiality obligations.",
    },
    {
      title: "Step 4: Term and Termination",
      description:
        "Define contract length and termination rights.",
    },
    {
      title: "Step 5: Sign",
      description:
        "Execute the agreement and keep copies.",
    },
  ],
  stateConsiderations: [
    {
      title: "Worker Classification",
      description:
        "States apply different tests to determine contractor vs employee status.",
    },
    {
      title: "Non‑Compete Rules",
      description:
        "Some states restrict restrictive covenants for contractors.",
    },
    {
      title: "Tax Withholding",
      description:
        "Contractors handle their own taxes; agreements should reflect that.",
    },
  ],
  mistakesToAvoid: [
    "Leaving scope or deliverables undefined.",
    "Using employee‑style supervision that conflicts with contractor status.",
    "Omitting IP ownership terms.",
    "Failing to specify payment schedule.",
    "Ignoring local classification rules.",
  ],
  faq: [
    {
      question: "Is a contractor agreement required?",
      answer:
        "Not legally required in all states, but strongly recommended to protect both parties and clarify expectations.",
    },
    {
      question: "Who owns the work product?",
      answer:
        "Ownership depends on the agreement. Without clear terms, disputes are common.",
    },
    {
      question: "Can I include a non‑compete?",
      answer:
        "Some states restrict non‑competes for contractors. Check local law.",
    },
    {
      question: "How should payment be structured?",
      answer:
        "Common options include hourly, fixed fee, or milestone‑based payments.",
    },
    {
      question: "What if the contractor doesn’t deliver?",
      answer:
        "Termination and remedies provisions define how disputes are handled.",
    },
    {
      question: "Is a W‑9 required?",
      answer:
        "Typically yes, for tax reporting purposes.",
    },
  ],
}

const partnershipDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Partnership Agreement?",
    body:
      "A partnership agreement defines how partners share ownership, profits, responsibilities, and decision‑making. It reduces disputes by outlining financial contributions, management authority, and what happens if a partner exits.",
  },
  whyItMatters: [
    "Clarifies profit and loss sharing.",
    "Defines partner roles and decision‑making authority.",
    "Sets rules for new partners or exit.",
    "Reduces legal disputes and uncertainty.",
    "Creates enforceable terms for the partnership.",
  ],
  keySections: [
    {
      title: "Capital Contributions",
      description:
        "Specifies how much each partner invests and when.",
    },
    {
      title: "Profit/Loss Allocation",
      description:
        "Defines how profits and losses are split.",
    },
    {
      title: "Management and Voting",
      description:
        "Clarifies decision‑making processes and authority.",
    },
    {
      title: "Partner Exit",
      description:
        "Sets buyout or dissolution rules.",
    },
    {
      title: "Dispute Resolution",
      description:
        "Defines how partners handle disagreements.",
    },
  ],
  process: [
    {
      title: "Step 1: Identify Partners",
      description:
        "List all partners and ownership percentages.",
    },
    {
      title: "Step 2: Define Contributions",
      description:
        "Clarify financial and non‑financial contributions.",
    },
    {
      title: "Step 3: Set Profit Split",
      description:
        "Define how profits and losses are shared.",
    },
    {
      title: "Step 4: Establish Governance",
      description:
        "Define voting rules and management responsibilities.",
    },
    {
      title: "Step 5: Sign Agreement",
      description:
        "All partners sign and retain copies.",
    },
  ],
  stateConsiderations: [
    {
      title: "Default Partnership Rules",
      description:
        "Without an agreement, state default rules control profit splits and management.",
    },
    {
      title: "Tax Treatment",
      description:
        "Partnerships are pass‑through entities; agreements should align with tax strategy.",
    },
    {
      title: "Fiduciary Duties",
      description:
        "States impose fiduciary duties unless modified by agreement.",
    },
  ],
  mistakesToAvoid: [
    "Assuming equal splits without documenting percentages.",
    "Failing to define decision‑making authority.",
    "Not including exit and buyout terms.",
    "Ignoring tax implications of profit allocations.",
    "Skipping written signatures.",
  ],
  faq: [
    {
      question: "Do partnerships require a written agreement?",
      answer:
        "Not always, but a written agreement prevents misunderstandings and disputes.",
    },
    {
      question: "Can partners have unequal ownership?",
      answer:
        "Yes. The agreement should specify the exact percentages.",
    },
    {
      question: "How do we remove a partner?",
      answer:
        "The agreement should include exit and buyout provisions to avoid conflict.",
    },
    {
      question: "What happens if we don’t have an agreement?",
      answer:
        "State default rules control profit splits and management, which may not reflect your intent.",
    },
    {
      question: "Is a partnership the same as an LLC?",
      answer:
        "No. LLCs provide liability protection; partnerships generally do not.",
    },
    {
      question: "Do we need to register a partnership?",
      answer:
        "Some partnerships require registration depending on the type and state.",
    },
  ],
}

const poaDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Power of Attorney (POA)?",
    body:
      "A Power of Attorney authorizes someone to act on your behalf in legal, financial, or healthcare matters. It can be limited or broad and can take effect immediately or upon incapacity.",
  },
  whyItMatters: [
    "Allows trusted agents to act if you are unavailable or incapacitated.",
    "Prevents court delays in urgent situations.",
    "Clarifies scope of authority to reduce misuse.",
    "Supports financial, legal, or healthcare decisions.",
    "Can be revoked or limited to specific tasks.",
  ],
  keySections: [
    {
      title: "Principal and Agent",
      description:
        "Identifies the person granting authority and the person receiving it.",
    },
    {
      title: "Scope of Powers",
      description:
        "Defines which powers are granted and any limitations.",
    },
    {
      title: "Effective Date",
      description:
        "States when the POA becomes active.",
    },
    {
      title: "Durability",
      description:
        "Specifies whether authority continues after incapacity.",
    },
    {
      title: "Revocation",
      description:
        "Explains how the POA can be revoked.",
    },
  ],
  process: [
    {
      title: "Step 1: Choose an Agent",
      description:
        "Select a reliable person with good judgment.",
    },
    {
      title: "Step 2: Define Powers",
      description:
        "List powers that the agent may exercise.",
    },
    {
      title: "Step 3: Set Effective Date",
      description:
        "Decide whether it begins immediately or upon incapacity.",
    },
    {
      title: "Step 4: Execute Properly",
      description:
        "Sign with required witnesses and/or notarization.",
    },
    {
      title: "Step 5: Distribute Copies",
      description:
        "Provide copies to the agent and relevant institutions.",
    },
  ],
  stateConsiderations: [
    {
      title: "Witness and Notary Rules",
      description:
        "Many states require notarization or witnesses for validity.",
    },
    {
      title: "Durable vs Non‑Durable",
      description:
        "State law may specify how durability is established.",
    },
    {
      title: "Healthcare vs Financial POA",
      description:
        "Some states require separate forms for healthcare decisions.",
    },
  ],
  mistakesToAvoid: [
    "Naming an unreliable agent.",
    "Failing to limit powers when needed.",
    "Not complying with witness or notary requirements.",
    "Not informing relevant institutions.",
    "Neglecting to revoke outdated POAs.",
  ],
  faq: [
    {
      question: "Can I limit the powers granted?",
      answer:
        "Yes. A limited POA can restrict authority to specific tasks or timeframes.",
    },
    {
      question: "Does a POA survive incapacity?",
      answer:
        "Only if it is designated as durable; otherwise it may terminate.",
    },
    {
      question: "Do I need a lawyer to create a POA?",
      answer:
        "Not required, but complex situations may benefit from review.",
    },
    {
      question: "When does a POA become effective?",
      answer:
        "It can be immediate or springing, depending on how it is drafted.",
    },
    {
      question: "Can I revoke a POA?",
      answer:
        "Yes, as long as you are competent. Revocation should be in writing.",
    },
    {
      question: "Is notarization required?",
      answer:
        "Many states require it; check your state’s rules.",
    },
  ],
}

const lastWillDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Last Will & Testament?",
    body:
      "A Last Will & Testament is a legal document that states how your assets should be distributed after you die, who will manage your estate, and who will care for minor children. A valid will reduces probate delays, prevents disputes, and ensures your wishes are legally enforceable.",
  },
  whyItMatters: [
    "Names an executor to handle probate, taxes, and asset distribution.",
    "Protects family members by clearly stating who receives which assets.",
    "Lets you appoint guardians for minor children.",
    "Reduces the risk of court disputes and costly delays.",
    "Allows you to update plans as your life changes.",
  ],
  keySections: [
    {
      title: "Executor Appointment",
      description:
        "The executor is responsible for filing the will, paying debts, and distributing assets. Choosing a reliable executor is critical.",
    },
    {
      title: "Beneficiary Distributions",
      description:
        "You can specify gifts to people or organizations and define how remaining assets are divided.",
    },
    {
      title: "Guardianship",
      description:
        "If you have minor children, you can name a guardian to provide care and make decisions on their behalf.",
    },
    {
      title: "Debt and Tax Handling",
      description:
        "Clear instructions help your executor pay obligations in the correct order before distributing assets.",
    },
    {
      title: "Residue Clause",
      description:
        "This handles any assets not explicitly listed, avoiding partial intestacy.",
    },
  ],
  process: [
    {
      title: "Step 1: Identify Your Assets",
      description:
        "List property, bank accounts, investments, and personal items you want to distribute.",
    },
    {
      title: "Step 2: Choose Beneficiaries",
      description:
        "Decide who receives each asset and how the remaining estate is divided.",
    },
    {
      title: "Step 3: Select an Executor",
      description:
        "Pick someone trustworthy who can manage probate responsibilities.",
    },
    {
      title: "Step 4: Name Guardians (If Needed)",
      description:
        "Provide guardianship for minor children to avoid court appointment.",
    },
    {
      title: "Step 5: Sign and Witness",
      description:
        "Follow your state’s execution rules to make the will legally valid.",
    },
  ],
  stateConsiderations: [
    {
      title: "Witness Requirements",
      description:
        "Most states require two witnesses. Some allow notarization as an alternative.",
    },
    {
      title: "Self-Proving Affidavit",
      description:
        "Adding a self-proving affidavit can speed up probate in many states.",
    },
    {
      title: "Community Property Rules",
      description:
        "Community property states treat marital assets differently; distributions must reflect that.",
    },
  ],
  mistakesToAvoid: [
    "Leaving assets unassigned (no residue clause).",
    "Naming an executor who is unwilling or unable to serve.",
    "Failing to update the will after life changes (marriage, children, divorce).",
    "Not complying with witness or notarization requirements.",
    "Using vague or conflicting beneficiary designations.",
  ],
  faq: [
    {
      question: "Do I need a lawyer to create a Last Will & Testament?",
      answer:
        "A lawyer is not required in most states, but complex estates may benefit from legal review. A well‑structured will can be created online if you follow your state’s execution requirements.",
    },
    {
      question: "What happens if I die without a will?",
      answer:
        "Your estate is distributed under state intestacy laws. That can result in outcomes that do not match your wishes and can increase delays or disputes among family members.",
    },
    {
      question: "How often should I update my will?",
      answer:
        "Update your will whenever major life events occur, such as marriage, divorce, birth of a child, or acquiring significant assets.",
    },
    {
      question: "Can I name a guardian for my children in my will?",
      answer:
        "Yes. A will is the primary way to name a guardian for minor children. Courts generally follow this designation unless it is not in the child’s best interest.",
    },
    {
      question: "Do I need witnesses to sign my will?",
      answer:
        "Most states require two witnesses to sign. Some states allow notarization or a self‑proving affidavit to reduce probate delays.",
    },
    {
      question: "Is a digital or online will legally valid?",
      answer:
        "Validity depends on state law. Some states accept electronic wills under specific rules, while others require paper documents and in‑person witnesses.",
    },
  ],
}

const commercialLeaseDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Commercial Lease Agreement?",
    body:
      "A commercial lease agreement sets the terms for renting business property. It outlines rent, term, permitted use, maintenance responsibilities, and remedies. Strong commercial leases reduce disputes and protect both landlord and tenant.",
  },
  whyItMatters: [
    "Clarifies permitted business use and occupancy.",
    "Defines rent, CAM charges, and other expenses.",
    "Allocates maintenance and repair responsibilities.",
    "Sets default and termination rights.",
    "Helps avoid costly lease disputes.",
  ],
  keySections: [
    {
      title: "Permitted Use",
      description:
        "Defines the business activities allowed in the property.",
    },
    {
      title: "Rent and Expenses",
      description:
        "Specifies base rent, CAM, and other charges.",
    },
    {
      title: "Term and Renewal",
      description:
        "Defines lease length and renewal options.",
    },
    {
      title: "Maintenance and Repairs",
      description:
        "Allocates responsibilities between landlord and tenant.",
    },
    {
      title: "Default and Remedies",
      description:
        "Outlines remedies for breach or non‑payment.",
    },
  ],
  process: [
    {
      title: "Step 1: Identify Property",
      description:
        "Specify address, unit, and permitted use.",
    },
    {
      title: "Step 2: Define Rent",
      description:
        "Include base rent, escalations, and CAM charges.",
    },
    {
      title: "Step 3: Clarify Repairs",
      description:
        "Assign maintenance obligations in writing.",
    },
    {
      title: "Step 4: Define Term",
      description:
        "Set lease term and renewal rights.",
    },
    {
      title: "Step 5: Execute Agreement",
      description:
        "Sign and store copies for enforcement.",
    },
  ],
  stateConsiderations: [
    {
      title: "Disclosure Requirements",
      description:
        "Some states require specific disclosures for commercial leases.",
    },
    {
      title: "Tenant Improvement Rules",
      description:
        "Local codes can affect build‑out and permits.",
    },
    {
      title: "Remedy Limitations",
      description:
        "Certain states restrict or enforce lease remedies differently.",
    },
  ],
  mistakesToAvoid: [
    "Not defining permitted use clearly.",
    "Ignoring CAM or pass‑through expenses.",
    "Failing to specify maintenance obligations.",
    "Leaving renewal terms undefined.",
    "Not addressing improvements and alterations.",
  ],
  faq: [
    {
      question: "What is CAM in a commercial lease?",
      answer:
        "CAM stands for common area maintenance; it covers shared expenses like landscaping, security, and utilities.",
    },
    {
      question: "Can a landlord increase rent during the term?",
      answer:
        "Only if the lease allows it. Rent escalation clauses should be explicit.",
    },
    {
      question: "Who pays for repairs?",
      answer:
        "The lease should specify which repairs are landlord vs tenant responsibilities.",
    },
    {
      question: "Can I sublease the space?",
      answer:
        "Subleasing depends on the lease terms; many require landlord consent.",
    },
    {
      question: "Is a commercial lease negotiable?",
      answer:
        "Yes. Most commercial leases are negotiable, especially on term, rent, and improvements.",
    },
    {
      question: "Do I need insurance?",
      answer:
        "Commercial leases typically require tenant insurance; the lease should specify limits.",
    },
  ],
}

const serviceAgreementDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Service Agreement?",
    body:
      "A service agreement defines the scope, fees, and responsibilities for professional services. It protects both parties by clarifying deliverables, timelines, and payment structure.",
  },
  whyItMatters: [
    "Defines scope and deliverables to prevent disputes.",
    "Sets payment terms and schedules.",
    "Clarifies IP ownership and confidentiality.",
    "Outlines termination and refund rules.",
    "Helps enforce service quality expectations.",
  ],
  keySections: [
    {
      title: "Scope of Services",
      description:
        "Details what work will be performed and by when.",
    },
    {
      title: "Fees and Payment",
      description:
        "Defines rates, billing frequency, and payment terms.",
    },
    {
      title: "Intellectual Property",
      description:
        "Specifies who owns deliverables and work product.",
    },
    {
      title: "Confidentiality",
      description:
        "Protects sensitive business or client data.",
    },
    {
      title: "Termination",
      description:
        "Explains how either party can end the agreement.",
    },
  ],
  process: [
    {
      title: "Step 1: Define Services",
      description:
        "List deliverables, timelines, and responsibilities.",
    },
    {
      title: "Step 2: Choose Fee Model",
      description:
        "Fixed fee, retainer, or hourly billing.",
    },
    {
      title: "Step 3: Set Ownership",
      description:
        "Define ownership rights for work product.",
    },
    {
      title: "Step 4: Add Protections",
      description:
        "Include confidentiality and liability clauses.",
    },
    {
      title: "Step 5: Sign and Execute",
      description:
        "Both parties sign to make it enforceable.",
    },
  ],
  stateConsiderations: [
    {
      title: "Retainer Rules",
      description:
        "Some states require clarity on retainers and refundability.",
    },
    {
      title: "Licensing Requirements",
      description:
        "Certain services may require state licensing.",
    },
    {
      title: "Consumer Protection",
      description:
        "States may impose protections for clients in consumer contexts.",
    },
  ],
  mistakesToAvoid: [
    "Leaving scope undefined.",
    "Unclear payment schedules.",
    "Not addressing IP ownership.",
    "Omitting termination rights.",
    "Ignoring retainer refund rules.",
  ],
  faq: [
    {
      question: "Should I use a service agreement for small jobs?",
      answer:
        "Yes. Even small projects benefit from clear scope and payment terms.",
    },
    {
      question: "What’s the difference between a contract and an agreement?",
      answer:
        "A service agreement is a contract; both terms are used interchangeably.",
    },
    {
      question: "Can I bill hourly and cap the total?",
      answer:
        "Yes. Agreements can include hourly rates with maximum caps.",
    },
    {
      question: "Who owns the work product?",
      answer:
        "Ownership depends on the agreement; without clarity, disputes can arise.",
    },
    {
      question: "Are retainers refundable?",
      answer:
        "It depends on state rules and agreement terms; clearly define refundability.",
    },
    {
      question: "Do I need to include liability limits?",
      answer:
        "Limiting liability is common and can protect service providers from excessive risk.",
    },
  ],
}

const purchaseAgreementDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Purchase Agreement?",
    body:
      "A purchase agreement is a contract that documents the sale of goods, assets, or property. It outlines the purchase price, payment terms, closing conditions, and remedies if the transaction fails.",
  },
  whyItMatters: [
    "Defines the exact item or property being sold.",
    "Locks in purchase price and payment terms.",
    "Sets conditions for closing and delivery.",
    "Clarifies warranties and representations.",
    "Provides remedies if a party defaults.",
  ],
  keySections: [
    {
      title: "Item Description",
      description:
        "Specifies what is being purchased and included in the sale.",
    },
    {
      title: "Purchase Price",
      description:
        "Defines the price and payment structure.",
    },
    {
      title: "Closing Conditions",
      description:
        "Outlines when and how the transaction closes.",
    },
    {
      title: "Representations",
      description:
        "Provides assurances from both buyer and seller.",
    },
    {
      title: "Default Remedies",
      description:
        "Defines remedies if the deal falls through.",
    },
  ],
  process: [
    {
      title: "Step 1: Identify the Item",
      description:
        "Describe the goods, assets, or property in detail.",
    },
    {
      title: "Step 2: Set Price",
      description:
        "Define the purchase price and payment terms.",
    },
    {
      title: "Step 3: Add Conditions",
      description:
        "Include inspections, financing, or delivery conditions.",
    },
    {
      title: "Step 4: Define Closing",
      description:
        "Set the closing date and required actions.",
    },
    {
      title: "Step 5: Execute Agreement",
      description:
        "Both parties sign and retain copies.",
    },
  ],
  stateConsiderations: [
    {
      title: "Disclosure Requirements",
      description:
        "Certain sales require state‑specific disclosures.",
    },
    {
      title: "Consumer Protection",
      description:
        "States may impose protections for consumer transactions.",
    },
    {
      title: "Title Transfer Rules",
      description:
        "Some assets require special transfer procedures.",
    },
  ],
  mistakesToAvoid: [
    "Vague description of items purchased.",
    "Missing conditions for closing or delivery.",
    "Unclear payment terms.",
    "Ignoring warranties or representations.",
    "No remedies for breach.",
  ],
  faq: [
    {
      question: "Do I need a purchase agreement for small transactions?",
      answer:
        "Small transactions may not require one, but for significant assets, a written agreement is strongly recommended.",
    },
    {
      question: "Can I include contingencies?",
      answer:
        "Yes. Contingencies like financing or inspections are common.",
    },
    {
      question: "What happens if the buyer backs out?",
      answer:
        "The agreement should specify remedies, such as forfeited deposits or damages.",
    },
    {
      question: "Are warranties required?",
      answer:
        "Warranties are not always required, but they clarify expectations and risk.",
    },
    {
      question: "Do I need notarization?",
      answer:
        "Usually no, unless required by state law or specific assets.",
    },
    {
      question: "Can this be used for service purchases?",
      answer:
        "Yes, but service agreements are often better suited for that purpose.",
    },
  ],
}

const nonCompeteDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Non‑Compete Agreement?",
    body:
      "A non‑compete agreement restricts an individual from competing with a business for a defined time, geography, and scope. These agreements are heavily regulated and must comply with state law to be enforceable.",
  },
  whyItMatters: [
    "Protects trade secrets and customer relationships.",
    "Prevents unfair competition after employment or contract ends.",
    "Clarifies restrictions to reduce disputes.",
    "Supports business stability and investment.",
    "Must comply with strict state rules to be enforceable.",
  ],
  keySections: [
    {
      title: "Restricted Activities",
      description:
        "Defines what competitive actions are prohibited.",
    },
    {
      title: "Duration and Geography",
      description:
        "Sets time limits and geographic scope.",
    },
    {
      title: "Consideration",
      description:
        "Explains what the individual receives in exchange for restrictions.",
    },
    {
      title: "Enforceability",
      description:
        "Acknowledges state law limitations and reasonableness.",
    },
    {
      title: "Remedies",
      description:
        "Defines legal remedies for breach.",
    },
  ],
  process: [
    {
      title: "Step 1: Define the Role",
      description:
        "Identify the relationship (employee or contractor).",
    },
    {
      title: "Step 2: Set Boundaries",
      description:
        "Limit time and geography to reasonable terms.",
    },
    {
      title: "Step 3: Provide Consideration",
      description:
        "Ensure a clear benefit in exchange for restrictions.",
    },
    {
      title: "Step 4: Review State Law",
      description:
        "Check enforceability requirements in your state.",
    },
    {
      title: "Step 5: Execute Agreement",
      description:
        "Sign and retain copies for enforcement.",
    },
  ],
  stateConsiderations: [
    {
      title: "State Prohibitions",
      description:
        "Some states prohibit non‑competes outright for employees.",
    },
    {
      title: "Income Thresholds",
      description:
        "Certain states allow non‑competes only above wage thresholds.",
    },
    {
      title: "Notice Requirements",
      description:
        "Some states require advance written notice for enforceability.",
    },
  ],
  mistakesToAvoid: [
    "Overly broad geographic or time restrictions.",
    "Failing to provide consideration.",
    "Ignoring state‑specific bans.",
    "Applying non‑competes to low‑wage roles.",
    "Omitting enforceability clauses.",
  ],
  faq: [
    {
      question: "Are non‑competes enforceable in California?",
      answer:
        "Generally no. California prohibits most non‑compete agreements for employees.",
    },
    {
      question: "How long should a non‑compete last?",
      answer:
        "Typically 6–24 months; longer durations may be unenforceable.",
    },
    {
      question: "Do contractors need non‑competes?",
      answer:
        "Sometimes, but many states restrict non‑competes for contractors as well.",
    },
    {
      question: "Can a court modify an overbroad non‑compete?",
      answer:
        "Some states allow modification; others may invalidate the clause entirely.",
    },
    {
      question: "Is consideration required?",
      answer:
        "Yes. The agreement must provide something of value in exchange for restrictions.",
    },
    {
      question: "Should I use an NDA instead?",
      answer:
        "In many cases, NDAs and non‑solicitations provide protection without enforceability risks.",
    },
  ],
}

const demandLetterDetail: DocumentDetailContent = {
  overview: {
    title: "Demand Letter",
    body: "A demand letter is a formal written notice sent to an individual or business demanding they fulfill a legal obligation—pay a debt, stop an infringing activity, or remedy a breach—before you escalate to litigation. Courts expect parties to attempt resolution first, and a well-drafted demand letter demonstrates that good faith. It also establishes a paper trail, documents the dispute's timeline, and often prompts payment or settlement without costly court proceedings.",
  },
  whyItMatters: [
    "Establishes a formal record that you requested resolution before filing suit.",
    "Often triggers prompt payment or negotiation, saving significant legal costs.",
    "Sets a clear deadline that strengthens your position if litigation follows.",
    "Required by law in some jurisdictions before filing certain small-claims actions.",
    "Signals seriousness and can deter the other party from ignoring your claim.",
  ],
  keySections: [
    {
      title: "Statement of Facts",
      description: "A concise, chronological account of the relevant events—what happened, when, and the resulting harm or debt owed.",
    },
    {
      title: "Legal Basis for the Claim",
      description: "The specific contract provision, statute, or common-law principle that entitles you to the relief requested.",
    },
    {
      title: "Amount or Action Demanded",
      description: "A precise figure (including interest or fees) or a specific action the recipient must take to resolve the matter.",
    },
    {
      title: "Response Deadline",
      description: "A firm date—typically 7 to 30 days—by which the recipient must respond or face further legal action.",
    },
  ],
  process: [
    {
      title: "Gather Supporting Evidence",
      description: "Collect contracts, invoices, correspondence, photographs, or any other documentation that supports your claim.",
    },
    {
      title: "Calculate the Total Amount Owed",
      description: "Add principal, interest, late fees, and any direct costs caused by the breach or nonpayment.",
    },
    {
      title: "Draft and Send the Letter",
      description: "Write a professional, factual letter and send it via certified mail with return receipt requested so delivery is documented.",
    },
    {
      title: "Wait for the Response Deadline",
      description: "Allow the stated deadline to pass. Keep copies of all communications and note any partial offers or admissions.",
    },
    {
      title: "Escalate if Necessary",
      description: "If the recipient fails to respond satisfactorily, proceed with filing a lawsuit or referring the matter to an attorney.",
    },
  ],
  stateConsiderations: [
    {
      title: "Pre-Suit Notice Requirements",
      description: "Florida, Texas, and several other states require written demand before filing certain consumer-protection or construction claims.",
    },
    {
      title: "Statute of Limitations",
      description: "Each state sets its own deadline for filing suit. A demand letter does not pause the clock, so track filing deadlines carefully.",
    },
    {
      title: "Attorney's Fees Provisions",
      description: "Some states (e.g., California consumer protection statutes) allow recovery of attorney's fees when demand is ignored, making the letter even more powerful.",
    },
  ],
  mistakesToAvoid: [
    "Using threatening or harassing language that could expose you to counter-claims.",
    "Demanding an amount you cannot substantiate with documentation.",
    "Sending the letter without keeping a copy and delivery proof.",
    "Setting an unreasonably short deadline that appears in bad faith.",
    "Disclosing confidential settlement offers in a way that could harm later litigation.",
  ],
  faq: [
    {
      question: "Does a demand letter have to be written by an attorney?",
      answer: "No. Anyone can write a demand letter. However, a letter on attorney letterhead is often taken more seriously and may prompt faster resolution.",
    },
    {
      question: "How long should I give the other party to respond?",
      answer: "Typically 10 to 30 days is standard, depending on the urgency and complexity of the matter. Emergency situations may warrant a shorter window.",
    },
    {
      question: "Is a demand letter legally binding?",
      answer: "The letter itself is not a contract, but any written response accepting your terms can create a binding agreement.",
    },
    {
      question: "Can the recipient use my demand letter against me in court?",
      answer: "The facts stated in the letter can be reviewed by a court, so accuracy is critical. Do not make admissions or concessions you do not intend.",
    },
    {
      question: "What if the recipient ignores the letter?",
      answer: "You may file a lawsuit in small claims court (for smaller amounts) or civil court. The ignored letter strengthens your case by showing good-faith effort.",
    },
  ],
}

const ceaseAndDesistDetail: DocumentDetailContent = {
  overview: {
    title: "Cease and Desist Letter",
    body: "A cease and desist letter formally demands that an individual or organization immediately stop an activity you claim is unlawful—trademark infringement, copyright violation, harassment, defamation, or breach of a non-compete, among others. While not a court order, it puts the recipient on notice of your rights, creates a legal record, and often resolves disputes before expensive litigation. If ignored, the letter forms part of the evidentiary foundation for an injunction or damages claim.",
  },
  whyItMatters: [
    "Puts the recipient on clear, documented notice that their conduct is unlawful.",
    "Often stops harmful activity immediately without court involvement.",
    "Demonstrates to a court that you took reasonable pre-litigation steps.",
    "Can support a claim for enhanced (willful) damages if the behavior continues.",
    "Preserves your rights while giving the other party a chance to self-correct.",
  ],
  keySections: [
    {
      title: "Identification of the Infringing Activity",
      description: "A specific description of what the recipient is doing and why it violates your rights, including dates and examples.",
    },
    {
      title: "Legal Rights Asserted",
      description: "Citation of the trademark registration, copyright, contract clause, or statute that underpins your claim.",
    },
    {
      title: "Demand to Cease",
      description: "An explicit directive to immediately stop the identified conduct, often accompanied by a demand to destroy infringing materials.",
    },
    {
      title: "Consequences of Non-Compliance",
      description: "A statement of the legal remedies you will pursue—injunction, damages, attorney's fees—if the activity continues.",
    },
  ],
  process: [
    {
      title: "Identify and Document the Violation",
      description: "Capture screenshots, obtain certified copies, or otherwise preserve evidence of the infringing or unlawful conduct.",
    },
    {
      title: "Confirm Your Legal Basis",
      description: "Verify that you own the intellectual property, that the contract is valid, or that a statute applies before making the demand.",
    },
    {
      title: "Draft the Letter Precisely",
      description: "State facts clearly without exaggeration. Overstating your rights can expose you to a declaratory-judgment counter-suit.",
    },
    {
      title: "Send via Certified Mail",
      description: "Use certified mail with return receipt or a process server to create a delivery record courts will recognize.",
    },
    {
      title: "Evaluate the Response",
      description: "If the recipient complies, confirm in writing. If they refuse or ignore the letter, proceed with legal action promptly.",
    },
  ],
  stateConsiderations: [
    {
      title: "Anti-SLAPP Statutes",
      description: "California, Texas, and about 30 other states have laws protecting free speech. A poorly aimed cease and desist can trigger an anti-SLAPP motion and fee-shifting against you.",
    },
    {
      title: "Defamation vs. Opinion",
      description: "State law varies on what qualifies as actionable defamation. Statements of opinion are generally protected; consult local precedent before demanding retraction.",
    },
    {
      title: "Trademark Registration",
      description: "Federal registration strengthens your rights nationwide, but common-law trademark rights vary by geography and must be asserted state by state.",
    },
  ],
  mistakesToAvoid: [
    "Sending a letter for conduct that is actually protected speech or fair use.",
    "Making factual errors about your own rights (e.g., claiming registration you do not have).",
    "Including personal insults or emotional language that undercuts your professional credibility.",
    "Failing to specify exactly what the recipient must do and by when.",
    "Ignoring the letter if no response comes—act on your stated deadline.",
  ],
  faq: [
    {
      question: "Is a cease and desist letter a court order?",
      answer: "No. It is a private demand with no legal force on its own. Only a court-issued injunction compels compliance under penalty of contempt.",
    },
    {
      question: "What happens if the recipient ignores it?",
      answer: "You may file for a temporary restraining order or preliminary injunction in court. The ignored letter helps establish willfulness, which can increase available damages.",
    },
    {
      question: "Can the recipient publish my cease and desist letter?",
      answer: "Generally yes—letters are not automatically confidential. In fact, recipients sometimes publish them to rally public support. Draft accordingly.",
    },
    {
      question: "Do I need an attorney to send one?",
      answer: "Not legally, but intellectual property and defamation claims are complex. An attorney's review helps ensure you are asserting valid rights and not inadvertently creating liability.",
    },
    {
      question: "How long should I give them to comply?",
      answer: "Typically 7 to 14 days for urgent matters such as ongoing infringement. More complex situations may allow 30 days for a full written response.",
    },
  ],
}

const noticeOfBreachDetail: DocumentDetailContent = {
  overview: {
    title: "Notice of Breach of Contract",
    body: "A notice of breach of contract is a formal written communication informing a contracting party that they have failed to meet one or more contractual obligations. Most contracts and many state laws require you to provide written notice of a breach before you can terminate the agreement or seek damages. The notice preserves your rights, starts any cure period the contract specifies, and creates a clear record for litigation if the breach is not remedied.",
  },
  whyItMatters: [
    "Many contracts and statutes require notice as a condition precedent to termination.",
    "Triggers any contractual cure period, giving the breaching party a chance to fix the problem.",
    "Creates an indisputable record of the date you discovered and reported the breach.",
    "Protects you from claims that you waived the breach by remaining silent.",
    "Strengthens your damages claim by documenting the harm caused by the breach.",
  ],
  keySections: [
    {
      title: "Identification of the Contract",
      description: "The full name of the agreement, the parties' names, and the effective date so there is no ambiguity about which contract is at issue.",
    },
    {
      title: "Description of the Breach",
      description: "A specific account of which obligation was not met, when it was due, and what actually occurred (or failed to occur).",
    },
    {
      title: "Cure Period",
      description: "The time frame within which the breaching party must remedy the failure, as specified in the contract or allowed by applicable law.",
    },
    {
      title: "Remedies Reserved",
      description: "A statement that you reserve all rights and remedies under the contract and at law, including termination and damages.",
    },
  ],
  process: [
    {
      title: "Review the Contract's Notice Provisions",
      description: "Confirm how and where notice must be sent (email, certified mail, specific address) and whether a particular form is required.",
    },
    {
      title: "Document the Breach",
      description: "Gather evidence—missed deliverables, unpaid invoices, failed inspections—that demonstrates the breach clearly.",
    },
    {
      title: "Quantify the Harm",
      description: "Calculate any monetary damages or losses caused by the breach to date.",
    },
    {
      title: "Draft and Deliver the Notice",
      description: "Send the notice exactly as the contract specifies, retaining proof of delivery.",
    },
    {
      title: "Monitor the Cure Period",
      description: "Track the deadline and document any partial remedies or communications during the cure period.",
    },
  ],
  stateConsiderations: [
    {
      title: "Cure Period Length",
      description: "Statutes in states like California and New York impose minimum cure periods for certain contract types even when the contract is silent.",
    },
    {
      title: "Material vs. Minor Breach",
      description: "States differ on what constitutes a material breach justifying termination versus a minor breach entitling you only to damages.",
    },
    {
      title: "Construction Contracts",
      description: "Many states have specific notice requirements for construction defect claims, often requiring notice well in advance of any repair or litigation.",
    },
  ],
  mistakesToAvoid: [
    "Failing to send notice in the manner specified by the contract (e.g., ignoring a certified-mail requirement).",
    "Continuing to accept performance after the breach without reserving rights.",
    "Overstating the breach or including inaccurate facts that the other party can use against you.",
    "Not allowing the contractual cure period to expire before declaring termination.",
    "Forgetting to include a reservation of rights clause in the notice.",
  ],
  faq: [
    {
      question: "What happens after I send a notice of breach?",
      answer: "The breaching party typically has a set cure period to fix the problem. If they cure, the contract continues. If they do not, you can terminate and/or sue for damages.",
    },
    {
      question: "Can I terminate the contract immediately without notice?",
      answer: "Only if the breach is so severe (a 'material breach' or the contract allows immediate termination) that a cure is impossible or the contract explicitly waives notice.",
    },
    {
      question: "Does sending notice waive my right to damages?",
      answer: "No. Providing an opportunity to cure does not waive your right to recover losses already caused by the breach.",
    },
    {
      question: "What if the other party disputes that a breach occurred?",
      answer: "The dispute may need to go to mediation, arbitration, or court as specified in your contract. The notice itself is important evidence of when you raised the issue.",
    },
    {
      question: "How specific does the notice have to be?",
      answer: "Specific enough that the other party can understand exactly what they need to fix. Vague notices may be challenged as legally insufficient.",
    },
  ],
}

const complaintLetterDetail: DocumentDetailContent = {
  overview: {
    title: "Complaint Letter",
    body: "A formal complaint letter is a structured written communication addressed to a business, government agency, or individual, documenting a grievance and requesting a specific remedy. When addressed to a company, it sets the stage for a refund, replacement, or service correction. When filed with a regulatory body (consumer protection agency, licensing board, BBB), it initiates an official investigation. A well-organized complaint letter is factual, specific, and action-oriented rather than emotional.",
  },
  whyItMatters: [
    "Creates a written record of your complaint and the response (or lack thereof).",
    "Often triggers prompt resolution because businesses want to avoid escalation.",
    "Provides evidence if you later file a regulatory complaint or small-claims action.",
    "Regulatory agencies use complaint data to identify patterns and take enforcement action.",
    "Required by some dispute-resolution processes before you can escalate further.",
  ],
  keySections: [
    {
      title: "Incident Description",
      description: "A factual, chronological account of what happened, including dates, product or service details, and the names of representatives you dealt with.",
    },
    {
      title: "Evidence References",
      description: "Reference to attached documentation—receipts, photographs, correspondence, warranties—that supports your account.",
    },
    {
      title: "Specific Remedy Requested",
      description: "A clear statement of what you want: a refund, replacement, repair, apology, policy change, or other concrete action.",
    },
    {
      title: "Response Deadline",
      description: "A reasonable date by which you expect a reply, and what you will do if the matter is not resolved.",
    },
  ],
  process: [
    {
      title: "Organize Your Facts and Evidence",
      description: "Gather all receipts, contracts, photos, and correspondence before writing so your account is accurate and complete.",
    },
    {
      title: "Identify the Right Recipient",
      description: "Address the letter to the specific person or department with authority to resolve your issue (customer relations manager, compliance officer, etc.).",
    },
    {
      title: "Write Clearly and Professionally",
      description: "Keep the tone firm but respectful. Emotional or accusatory language reduces your credibility and may invite a defensive rather than helpful response.",
    },
    {
      title: "Send and Follow Up",
      description: "Send the letter via email (requesting read receipt) or certified mail. Follow up if you receive no response by the stated deadline.",
    },
  ],
  stateConsiderations: [
    {
      title: "Consumer Protection Agencies",
      description: "Each state has its own consumer protection office. Filing a complaint there can trigger investigations and sometimes access to state-specific remedies not available federally.",
    },
    {
      title: "Lemon Laws",
      description: "Automotive complaints in most states are governed by lemon laws that require formal written notice before any buyback or replacement process begins.",
    },
    {
      title: "Cooling-Off Periods",
      description: "Some states require businesses to honor cancellations within 3 to 5 business days of certain contracts (door-to-door sales, health clubs). Reference the applicable state statute in your complaint.",
    },
  ],
  mistakesToAvoid: [
    "Including irrelevant details that obscure the core complaint.",
    "Using inflammatory language that allows the business to dismiss you as unreasonable.",
    "Failing to attach copies (not originals) of supporting evidence.",
    "Making threats you are not prepared to follow through on.",
    "Not keeping a copy of the letter and any response received.",
  ],
  faq: [
    {
      question: "Who should I send the complaint to first?",
      answer: "Start with the business itself (customer service or a supervisor). If they do not resolve it, escalate to a consumer protection agency, licensing board, or small-claims court.",
    },
    {
      question: "How long should I wait for a response?",
      answer: "Give the recipient at least 10 to 15 business days to respond, unless the matter is time-sensitive. Regulatory agencies may take longer.",
    },
    {
      question: "Can a complaint letter lead to a lawsuit?",
      answer: "If the business does not resolve the matter, you may file in small-claims court for amounts within its jurisdictional limit, or in civil court for larger claims.",
    },
    {
      question: "Do I need an attorney to write a complaint letter?",
      answer: "No. Most individuals write their own complaint letters effectively. An attorney becomes valuable only if the dispute involves significant money or legal complexity.",
    },
    {
      question: "Will my complaint be kept confidential?",
      answer: "Complaints filed with government agencies are often public records. Complaints sent directly to a business are generally treated as private correspondence.",
    },
  ],
}

const finalNoticeDetail: DocumentDetailContent = {
  overview: {
    title: "Final Notice Before Legal Action",
    body: "A final notice before legal action is the last formal written warning sent to a debtor or non-complying party before you initiate court proceedings or refer the matter to a collections agency. It signals that all prior requests have been exhausted and that litigation is imminent. Courts and creditors recognize this letter as evidence of the creditor's good-faith efforts, and it often prompts payment when earlier communications did not.",
  },
  whyItMatters: [
    "Clearly communicates that the next step is legal action, which motivates many debtors to pay.",
    "Demonstrates to a court or arbitrator that you gave the other party every reasonable opportunity.",
    "Creates a definitive record of your final pre-litigation attempt.",
    "May be required before reporting a debt to a collection agency or credit bureau.",
    "Gives both parties one final chance to avoid costly and time-consuming litigation.",
  ],
  keySections: [
    {
      title: "Summary of Prior Attempts",
      description: "A brief recitation of previous invoices, demands, or notices sent and the responses (or lack thereof) received.",
    },
    {
      title: "Total Amount Owed",
      description: "The final sum including principal, accrued interest, late fees, and any costs incurred as a result of the non-payment.",
    },
    {
      title: "Imminent Legal Action Warning",
      description: "A direct statement that if payment is not received by the stated deadline, you will file suit, engage a collection agency, or pursue other legal remedies.",
    },
    {
      title: "Final Payment Deadline",
      description: "A specific, short deadline—typically 5 to 10 days—leaving no ambiguity about the urgency.",
    },
  ],
  process: [
    {
      title: "Review All Prior Communications",
      description: "Compile every invoice, reminder, and demand previously sent so you can reference them accurately in the final notice.",
    },
    {
      title: "Calculate the Final Balance",
      description: "Include all accrued interest, fees, and costs to date so the debtor knows exactly what is needed to resolve the matter.",
    },
    {
      title: "Draft the Final Notice",
      description: "Write in a firm, professional tone. The letter should be short and unambiguous—this is not the time for negotiation language.",
    },
    {
      title: "Send via Certified Mail and Email",
      description: "Use multiple delivery methods to ensure receipt is documented and cannot be disputed.",
    },
    {
      title: "File Suit or Refer to Collections",
      description: "If no response is received by the deadline, proceed immediately as stated in the letter to maintain credibility.",
    },
  ],
  stateConsiderations: [
    {
      title: "Fair Debt Collection Practices Act",
      description: "If you are a debt collector (not the original creditor), federal and state laws strictly govern what you can say in collection letters, required disclosures, and prohibited conduct.",
    },
    {
      title: "Small Claims Limits",
      description: "Small claims courts handle amounts ranging from $2,500 (Kentucky) to $25,000 (some states). Know your jurisdiction's limit before deciding where to file.",
    },
    {
      title: "Interest Rate Caps",
      description: "States set maximum allowable interest rates on unpaid debts. Ensure the interest you claim does not exceed the legal maximum in the debtor's state.",
    },
  ],
  mistakesToAvoid: [
    "Setting a deadline and then not following through—this destroys your credibility.",
    "Including collection charges that exceed what your contract or state law allows.",
    "Using threatening or abusive language that could violate the FDCPA or state debt-collection laws.",
    "Failing to verify the correct current address of the debtor before sending.",
    "Demanding payment of a debt that is past the applicable statute of limitations.",
  ],
  faq: [
    {
      question: "How is a final notice different from a regular demand letter?",
      answer: "A final notice explicitly states that prior demands have been ignored and that litigation or collections will follow immediately—there is no further negotiation implied.",
    },
    {
      question: "Should I still accept payment after sending a final notice?",
      answer: "Yes. If the debtor pays in full before the deadline, accept it and confirm receipt in writing. You can always accept payment even after filing suit.",
    },
    {
      question: "Can I add legal fees to the amount demanded?",
      answer: "Only if your contract includes a fee-shifting clause or if the applicable statute provides for fee recovery. Otherwise, you can seek fees after winning in court.",
    },
    {
      question: "What if the debtor offers partial payment?",
      answer: "Do not accept partial payment as 'payment in full' without a written agreement. Otherwise the debtor may claim the debt is settled.",
    },
    {
      question: "How soon can I file suit after sending the final notice?",
      answer: "After the stated deadline passes without satisfactory response, you can file immediately. Keep the letter and proof of delivery as exhibits.",
    },
  ],
}

const debtSettlementLetterDetail: DocumentDetailContent = {
  overview: {
    title: "Debt Settlement Letter",
    body: "A debt settlement letter is a written proposal from a debtor (or their representative) to a creditor offering to pay a lump-sum amount—typically less than the full balance—in exchange for the creditor's agreement to consider the debt paid in full and to stop collection activity. When accepted, both parties sign or exchange letters confirming the settlement terms. Settlements allow creditors to recover something rather than risk recovering nothing, and allow debtors to resolve obligations they cannot fully pay.",
  },
  whyItMatters: [
    "Can reduce the total debt owed by 20 to 60 percent in many cases.",
    "Stops ongoing collection calls, lawsuits, and wage garnishment threats.",
    "Provides a definitive end to the creditor-debtor relationship when executed properly.",
    "May prevent a judgment that could lien property or garnish wages.",
    "Gives creditors certainty of recovery rather than the risk of a protracted dispute.",
  ],
  keySections: [
    {
      title: "Account Identification",
      description: "The account number, original creditor, current holder, and the outstanding balance as of a specific date.",
    },
    {
      title: "Settlement Offer Amount",
      description: "The specific lump-sum or structured payment the debtor proposes and the deadline by which it will be paid.",
    },
    {
      title: "Conditions of Acceptance",
      description: "A statement that acceptance means the creditor will report the account as 'settled' or 'paid' and will not pursue the remaining balance.",
    },
    {
      title: "Tax Consequences Acknowledgment",
      description: "A note that forgiven debt over $600 may be reported to the IRS on Form 1099-C, creating taxable income for the debtor.",
    },
  ],
  process: [
    {
      title: "Assess Your Financial Position",
      description: "Determine the maximum lump sum you can realistically pay, keeping in mind that creditors rarely accept less than 40-60% without evidence of hardship.",
    },
    {
      title: "Request Validation of the Debt",
      description: "Before settling, confirm the balance is accurate and that the creditor has the legal right to collect.",
    },
    {
      title: "Send the Offer in Writing",
      description: "Submit your offer by certified mail. Never make verbal settlement agreements—always get the terms in writing before paying.",
    },
    {
      title: "Negotiate if Necessary",
      description: "The first offer may not be accepted. Creditors often counter. Be patient and stick to what you can genuinely afford.",
    },
    {
      title: "Get Written Confirmation Before Paying",
      description: "Obtain a signed settlement agreement or a written acceptance letter before sending any money.",
    },
  ],
  stateConsiderations: [
    {
      title: "Statute of Limitations",
      description: "Making any payment on a time-barred debt can restart the statute of limitations in some states, renewing the creditor's right to sue.",
    },
    {
      title: "State Income Tax on Forgiven Debt",
      description: "Several states treat forgiven debt as taxable income just as the federal government does. Check your state's rules before finalizing.",
    },
    {
      title: "Debt Collection Licensing",
      description: "Third-party debt collectors must be licensed in many states. Confirm the collector's legitimacy before settling with them.",
    },
  ],
  mistakesToAvoid: [
    "Paying before receiving a written acceptance of your settlement terms.",
    "Making any payment on a time-barred debt without understanding the statute of limitations implications.",
    "Agreeing to terms without understanding the credit reporting consequences.",
    "Failing to account for the tax liability on forgiven amounts over $600.",
    "Settling with a collector who does not own or have authority over the debt.",
  ],
  faq: [
    {
      question: "Will settling hurt my credit score?",
      answer: "Yes, 'settled for less than full amount' is reported and is negative, but less damaging than an unpaid collection or judgment.",
    },
    {
      question: "Can I negotiate a pay-for-delete agreement?",
      answer: "Some creditors will agree to delete the negative entry in exchange for payment, but credit bureaus discourage the practice and not all creditors will agree.",
    },
    {
      question: "How much can I realistically negotiate off?",
      answer: "On older or charged-off debts, 40 to 60 percent reductions are common. On recently defaulted debts, creditors are less flexible.",
    },
    {
      question: "Do I need to hire a debt settlement company?",
      answer: "Not necessarily. You can negotiate directly. Debt settlement companies charge fees (15-25% of the settled amount) and carry risks, so research carefully.",
    },
    {
      question: "What is a 1099-C and will I owe taxes?",
      answer: "If a creditor forgives $600 or more, they must issue a 1099-C, and the forgiven amount is generally taxable income unless you qualify for an insolvency exclusion under IRS rules.",
    },
  ],
}

const landlordNoticeToVacateDetail: DocumentDetailContent = {
  overview: {
    title: "Landlord Notice to Vacate",
    body: "A landlord's notice to vacate is a formal written document informing a tenant that they must leave the rental property by a specified date. Depending on the reason—nonpayment of rent, lease violation, end of tenancy, or no-fault termination—the notice period and required content vary significantly by state. Serving a proper notice is almost always a legal prerequisite before a landlord can file an eviction (unlawful detainer) action in court. Errors in the notice can delay the eviction by weeks.",
  },
  whyItMatters: [
    "Required by law before filing an eviction lawsuit in every U.S. jurisdiction.",
    "Starts the clock on the tenant's deadline to cure the issue or vacate.",
    "Protects the landlord from claims of wrongful or self-help eviction.",
    "Creates a formal record of the landlord-tenant dispute timeline.",
    "Incorrect notice format or period can result in dismissal of the eviction case.",
  ],
  keySections: [
    {
      title: "Reason for Notice",
      description: "Whether the notice is for nonpayment of rent, lease violation, end of lease, or a no-fault termination (e.g., owner move-in).",
    },
    {
      title: "Cure or Quit Provision",
      description: "For certain violations, tenants may have the right to cure (e.g., pay rent owed or fix a lease violation) within the notice period.",
    },
    {
      title: "Vacate Deadline",
      description: "The specific date by which the tenant must vacate, calculated according to the applicable state or local notice period.",
    },
    {
      title: "Service Instructions",
      description: "How the notice was served (personal delivery, posting plus mail, etc.) and by whom, as required by state law.",
    },
  ],
  process: [
    {
      title: "Identify the Correct Notice Type",
      description: "Nonpayment requires a 3- to 14-day pay-or-quit notice in most states. Lease violations require a notice to cure. No-fault terminations require 30 to 90 days.",
    },
    {
      title: "Comply with Local Rent Control Rules",
      description: "Cities with rent control (San Francisco, Los Angeles, New York City) impose additional restrictions on eviction grounds and notice periods.",
    },
    {
      title: "Draft the Notice Correctly",
      description: "Use the exact statutory language, notice period, and format required by your state. Errors are grounds for dismissal in eviction court.",
    },
    {
      title: "Serve the Notice Properly",
      description: "Follow your state's service rules—personal service, substituted service, or posting plus mailing—and document the method used.",
    },
    {
      title: "File for Eviction if Tenant Does Not Vacate",
      description: "After the notice period expires, file an unlawful detainer action in the appropriate court if the tenant has not vacated or cured.",
    },
  ],
  stateConsiderations: [
    {
      title: "Notice Periods",
      description: "California requires 3 days for nonpayment, but 30 or 60 days for no-fault terminations depending on tenancy length. New York requires 14 days for nonpayment. Always check current state law.",
    },
    {
      title: "Just Cause Eviction Laws",
      description: "Many cities and some states (Oregon, California) require landlords to have a legally recognized 'just cause' to terminate a tenancy, limiting no-fault evictions.",
    },
    {
      title: "COVID-19 and Local Protections",
      description: "Some localities still have post-pandemic tenant protections layered on top of state law. Verify local ordinances before serving any notice.",
    },
    {
      title: "Lead Paint and Habitability Disclosures",
      description: "Failure to provide required disclosures (lead paint in pre-1978 buildings, habitability notices) can defeat an otherwise valid eviction case in many states.",
    },
  ],
  mistakesToAvoid: [
    "Using the wrong notice period for the reason for eviction.",
    "Failing to serve the notice by the legally required method.",
    "Accepting partial rent after serving a pay-or-quit notice without a written reservation of rights.",
    "Ignoring local rent control or just-cause-eviction ordinances.",
    "Attempting self-help eviction (changing locks, removing belongings) instead of following the court process.",
  ],
  faq: [
    {
      question: "How many days notice do I have to give a tenant?",
      answer: "It depends on the reason and your state. Nonpayment notices range from 3 to 14 days. Month-to-month terminations typically require 30 to 60 days. Check your specific state statute.",
    },
    {
      question: "Can I evict a tenant without a notice?",
      answer: "No. Every state requires proper written notice before you can file for eviction. Skipping this step will result in dismissal of your case.",
    },
    {
      question: "What if the tenant pays the rent after I serve a notice?",
      answer: "If you accept full rent without reserving rights, you generally waive the eviction for that nonpayment. You would need to restart the process if they default again.",
    },
    {
      question: "Can a tenant contest the notice?",
      answer: "Yes, in eviction court. Common defenses include improper service, retaliation, habitability issues, and discrimination. A properly drafted notice reduces but does not eliminate these risks.",
    },
    {
      question: "Do I need an attorney to evict a tenant?",
      answer: "Not required in most states, but eviction law is procedurally strict. An error in the notice or filing can delay the process significantly, making legal assistance worthwhile.",
    },
  ],
}

const promissoryNoteDetail: DocumentDetailContent = {
  overview: {
    title: "Promissory Note",
    body: "A promissory note is a written, legally binding promise by one party (the maker or borrower) to pay a specific sum of money to another party (the payee or lender) on demand or by a specified date, with or without interest. Unlike a full loan agreement, a promissory note is typically simpler and focuses on the repayment obligation. It is used for personal loans between friends or family, business financing, real estate seller financing, and student loans, among many other situations.",
  },
  whyItMatters: [
    "Converts an informal loan into a legally enforceable obligation.",
    "Specifies exact repayment terms, eliminating disputes about what was agreed.",
    "Establishes the interest rate and calculation method, preventing disagreements.",
    "Provides the lender with a document that can be used in court or sold to a third party.",
    "IRS may treat undocumented family loans as gifts—a promissory note helps establish the transaction as a genuine loan.",
  ],
  keySections: [
    {
      title: "Principal Amount",
      description: "The exact sum of money being borrowed, stated in both numerals and words to prevent alteration disputes.",
    },
    {
      title: "Interest Rate and Calculation",
      description: "Whether interest is simple or compound, the annual percentage rate, and how it accrues (daily, monthly, etc.).",
    },
    {
      title: "Repayment Schedule",
      description: "Whether repayment is in a lump sum, installments, or on demand, and the due date(s) for each payment.",
    },
    {
      title: "Default and Acceleration",
      description: "What constitutes default and whether the full balance becomes due immediately upon default (acceleration clause).",
    },
  ],
  process: [
    {
      title: "Agree on the Core Terms",
      description: "Decide the principal, interest rate, repayment schedule, and consequences of late payment before drafting.",
    },
    {
      title: "Check Usury Limits",
      description: "Verify your state's maximum allowable interest rate (usury limit) to ensure the agreed rate is legal.",
    },
    {
      title: "Draft the Promissory Note",
      description: "Include all required elements: parties, principal, rate, schedule, default terms, and governing law.",
    },
    {
      title: "Sign in the Presence of a Notary",
      description: "While not always required, notarization strengthens enforceability, especially for large amounts or real estate transactions.",
    },
    {
      title: "Keep the Original Secure",
      description: "The lender should retain the original signed note. Upon full repayment, the note should be marked 'paid in full' and returned to the borrower.",
    },
  ],
  stateConsiderations: [
    {
      title: "Usury Laws",
      description: "Most states cap the maximum interest rate. Rates above the cap can make the note voidable or result in forfeiture of all interest (or more) in some states.",
    },
    {
      title: "Statute of Limitations",
      description: "The time to sue on a defaulted promissory note ranges from 3 to 6 years in most states, starting from the date of default.",
    },
    {
      title: "Negotiability",
      description: "A promissory note meeting UCC Article 3 requirements is a negotiable instrument that can be sold or transferred. Non-compliant notes are enforceable but not negotiable.",
    },
  ],
  mistakesToAvoid: [
    "Setting an interest rate above the state usury limit.",
    "Omitting a clear repayment schedule, leaving repayment terms ambiguous.",
    "Not dating the document or leaving blank fields that could be altered.",
    "Failing to specify governing law and venue for disputes.",
    "Neglecting to mark the note 'paid in full' upon repayment, which could lead to a lost note being presented against the borrower later.",
  ],
  faq: [
    {
      question: "What is the difference between a promissory note and a loan agreement?",
      answer: "A promissory note is a simpler promise to pay. A loan agreement is a more comprehensive contract covering representations, warranties, covenants, and detailed conditions. Large or complex loans use both.",
    },
    {
      question: "Does a promissory note need to be notarized?",
      answer: "Not generally, but notarization is advisable for large sums or when the note is secured by real property.",
    },
    {
      question: "Can a promissory note be transferred to someone else?",
      answer: "If it meets UCC Article 3 requirements, yes. The holder can endorse and deliver it to a new payee.",
    },
    {
      question: "What happens if the borrower defaults?",
      answer: "The lender can demand immediate payment of the full balance (if there is an acceleration clause), pursue the borrower in court, and—if the note is secured—foreclose on the collateral.",
    },
    {
      question: "Is interest on family loans taxable?",
      answer: "Yes. The IRS requires that loans between related parties charge at least the Applicable Federal Rate (AFR). Below-market loans may result in imputed interest income for the lender.",
    },
  ],
}

const loanAgreementDetail: DocumentDetailContent = {
  overview: {
    title: "Loan Agreement",
    body: "A loan agreement is a comprehensive contract between a lender and a borrower that documents all terms of a loan—principal amount, interest rate, repayment schedule, collateral (if any), representations and warranties, conditions precedent to disbursement, events of default, and remedies. Unlike a simple promissory note, a loan agreement is a bilateral contract binding both parties with detailed obligations and protections. It is used for business loans, personal loans, real estate financing, and any transaction where the parties need more than a basic repayment promise.",
  },
  whyItMatters: [
    "Provides comprehensive legal protection for both lender and borrower.",
    "Specifies exactly when, how, and in what currency repayment must occur.",
    "Defines events of default beyond simple nonpayment, protecting the lender.",
    "Documents collateral arrangements and the lender's security interest.",
    "Reduces litigation risk by leaving no material term open to dispute.",
  ],
  keySections: [
    {
      title: "Loan Amount and Disbursement",
      description: "The principal amount, how and when funds will be disbursed, and any conditions the borrower must meet before receiving the money.",
    },
    {
      title: "Interest Rate and Fees",
      description: "The annual percentage rate, whether it is fixed or variable, the basis for any variable rate (e.g., Prime plus margin), origination fees, and late fees.",
    },
    {
      title: "Repayment Terms",
      description: "Payment amount, frequency, due dates, application of payments (interest first or principal first), and any balloon payment at maturity.",
    },
    {
      title: "Events of Default and Remedies",
      description: "A comprehensive list of default triggers (nonpayment, insolvency, material misrepresentation) and the lender's remedies, including acceleration and collateral enforcement.",
    },
  ],
  process: [
    {
      title: "Conduct Due Diligence",
      description: "Lenders should review the borrower's financial statements, credit history, and business plan before committing to terms.",
    },
    {
      title: "Negotiate Core Terms",
      description: "Agree on rate, maturity, collateral requirements, financial covenants, and prepayment rights before drafting.",
    },
    {
      title: "Draft the Agreement",
      description: "Include all representations, covenants, conditions precedent, and default provisions appropriate for the size and risk of the loan.",
    },
    {
      title: "Perfect Any Security Interest",
      description: "File a UCC-1 financing statement if the collateral is personal property, or record a mortgage/deed of trust for real property.",
    },
    {
      title: "Execute and Fund",
      description: "Both parties sign; the lender disburses funds upon satisfaction of all conditions precedent.",
    },
  ],
  stateConsiderations: [
    {
      title: "Usury and Licensing",
      description: "Lenders (especially non-bank entities) may need state lending licenses. Interest-rate caps vary by state and loan type.",
    },
    {
      title: "UCC Filings",
      description: "To perfect a security interest in personal property collateral, file a UCC-1 in the state where the borrower is organized (for businesses) or resides (for individuals).",
    },
    {
      title: "Real Property Security",
      description: "Loans secured by real estate require state-specific mortgage or deed-of-trust documents recorded in the county where the property is located.",
    },
  ],
  mistakesToAvoid: [
    "Failing to perfect the security interest, leaving collateral vulnerable to other creditors.",
    "Omitting financial covenants that would provide early warning of borrower distress.",
    "Ignoring state usury and lending license requirements.",
    "Using a simple promissory note when the complexity of the deal requires a full loan agreement.",
    "Neglecting to include a governing law clause specifying which state's law applies.",
  ],
  faq: [
    {
      question: "When do I need a full loan agreement instead of just a promissory note?",
      answer: "Use a full loan agreement for business loans, secured loans, loans with financial covenants, or any transaction above a modest personal-loan threshold where detailed protections are warranted.",
    },
    {
      question: "Can individuals (non-banks) make loans?",
      answer: "Yes, but state licensing laws may apply to regular or commercial lending activity. Occasional personal loans generally do not require a license.",
    },
    {
      question: "What is a balloon payment?",
      answer: "A large lump-sum payment due at the end of the loan term, after a period of smaller regular payments. Common in commercial real estate loans.",
    },
    {
      question: "What happens to collateral if the borrower defaults?",
      answer: "The lender may repossess and sell personal property collateral (following UCC Article 9 procedures) or foreclose on real property, depending on the security instrument.",
    },
    {
      question: "Can the borrower prepay the loan?",
      answer: "Only if the agreement allows it. Some agreements include prepayment penalties to compensate the lender for lost interest income.",
    },
  ],
}

const paymentPlanAgreementDetail: DocumentDetailContent = {
  overview: {
    title: "Payment Plan Agreement",
    body: "A payment plan agreement (also called an installment agreement) is a contract between a creditor and a debtor that formalizes a schedule for repaying an existing debt in periodic installments rather than a single lump sum. It is used when the debtor cannot pay in full immediately but both parties prefer an agreed repayment structure over collections or litigation. Payment plans are common in medical billing, business-to-business disputes, consumer debt, tax obligations (IRS installment agreements), and landlord-tenant arrears.",
  },
  whyItMatters: [
    "Converts an overdue obligation into a structured, manageable repayment schedule.",
    "Stops or prevents collection activity while the debtor remains in compliance.",
    "Protects the creditor by documenting exact amounts, due dates, and default consequences.",
    "Reduces the likelihood of bankruptcy or uncollectable judgment scenarios.",
    "Can include provisions for interest, fees, or reporting that protect the creditor's position.",
  ],
  keySections: [
    {
      title: "Total Amount Owed",
      description: "The outstanding balance as of the agreement date, including any agreed interest, fees, or costs that will be paid through the plan.",
    },
    {
      title: "Installment Schedule",
      description: "The amount of each payment, the due date for each installment, and the method of payment (check, ACH, credit card).",
    },
    {
      title: "Default and Acceleration",
      description: "What constitutes a missed payment and whether the entire remaining balance becomes immediately due if the debtor misses an installment.",
    },
    {
      title: "Reporting Obligations",
      description: "Whether the creditor will update credit bureau reporting, refrain from additional collection activity, or defer reporting during the plan period.",
    },
  ],
  process: [
    {
      title: "Verify the Debt Amount",
      description: "Both parties should confirm the exact balance owed, including any interest and fees, before drafting the agreement.",
    },
    {
      title: "Set a Realistic Payment Schedule",
      description: "Base installment amounts on the debtor's demonstrated ability to pay. Plans that are too aggressive often result in default.",
    },
    {
      title: "Draft and Sign the Agreement",
      description: "Put all terms in writing and have both parties sign. A witnessed or notarized agreement carries added weight.",
    },
    {
      title: "Make Timely Payments",
      description: "The debtor should use automatic payments or calendar reminders to avoid missing due dates.",
    },
    {
      title: "Get a Paid-in-Full Receipt",
      description: "Upon completion, the creditor should issue written confirmation that the obligation is fully satisfied.",
    },
  ],
  stateConsiderations: [
    {
      title: "Interest Rate Limits",
      description: "Any interest added to the repayment plan must comply with state usury laws.",
    },
    {
      title: "Medical Debt Regulations",
      description: "Several states (Colorado, Minnesota, New York) have enacted laws restricting interest and fees on medical debt payment plans.",
    },
    {
      title: "Tax Installment Agreements",
      description: "IRS and state tax authority installment agreements follow specific government procedures separate from private contracts and include additional statutory protections.",
    },
  ],
  mistakesToAvoid: [
    "Agreeing to installment amounts the debtor realistically cannot sustain.",
    "Omitting a default clause with clear acceleration terms.",
    "Failing to get a signed agreement before pausing collection efforts.",
    "Not specifying the payment method, which can lead to disputes about whether payments were timely.",
    "Forgetting to provide a payoff statement or receipt upon final payment.",
  ],
  faq: [
    {
      question: "Can a payment plan agreement include interest?",
      answer: "Yes, as long as the rate does not exceed your state's usury limit. The interest rate should be clearly stated in the agreement.",
    },
    {
      question: "What happens if the debtor misses a payment?",
      answer: "Depending on the agreement, a missed payment may trigger a default, and the entire remaining balance may become immediately due. The creditor can then resume collection activity.",
    },
    {
      question: "Is a payment plan agreement the same as debt settlement?",
      answer: "No. A payment plan agrees to pay the full amount (or the full agreed amount) over time. Debt settlement reduces the total owed in exchange for lump-sum payment.",
    },
    {
      question: "Can I set up a payment plan for a judgment?",
      answer: "Some courts allow judgment payment plans. You can also negotiate a voluntary plan directly with the judgment creditor to avoid garnishment.",
    },
    {
      question: "Does a payment plan stop collection calls?",
      answer: "If a third-party collector is involved, a payment plan should include a provision suspending collection calls during compliance. Original creditors may agree to similar terms.",
    },
  ],
}

const billOfSaleDetail: DocumentDetailContent = {
  overview: {
    title: "Bill of Sale",
    body: "A bill of sale is a legal document that records the transfer of ownership of personal property from a seller to a buyer for a stated price. It serves as proof of the transaction, documents the agreed-upon terms, and can protect both parties from future disputes about whether a sale occurred and on what terms. Bills of sale are commonly used for vehicles, boats, equipment, furniture, electronics, livestock, and other tangible personal property. Many states require a bill of sale to transfer title to certain types of property.",
  },
  whyItMatters: [
    "Provides clear proof of ownership transfer that protects both buyer and seller.",
    "Required by some states as part of the vehicle or watercraft title transfer process.",
    "Establishes the sale price, which affects tax calculations and liability.",
    "Protects the seller from claims that the property was stolen or is still the seller's responsibility.",
    "Protects the buyer from the seller later claiming ownership or demanding the property back.",
  ],
  keySections: [
    {
      title: "Property Description",
      description: "A detailed description of the item being sold, including make, model, serial number, VIN (for vehicles), condition, and any notable features or defects.",
    },
    {
      title: "Purchase Price",
      description: "The exact consideration paid, whether cash, other property, or a combination. Some states base sales tax on this stated amount.",
    },
    {
      title: "As-Is vs. Warranty",
      description: "Whether the seller makes any representations about the property's condition or sells it 'as is' with no warranties.",
    },
    {
      title: "Signatures and Date",
      description: "Dated signatures of both buyer and seller (and witnesses or notary where required by state law).",
    },
  ],
  process: [
    {
      title: "Agree on Terms",
      description: "Confirm the price, what is included in the sale, and any representations the seller is making about the property.",
    },
    {
      title: "Complete the Bill of Sale",
      description: "Fill in all fields accurately. Errors in serial numbers or VINs can create title problems.",
    },
    {
      title: "Sign and Notarize",
      description: "Both parties sign. Some states (Alabama, Louisiana, West Virginia) require notarization for vehicle bills of sale.",
    },
    {
      title: "Exchange Property and Payment",
      description: "Hand over the property and receive confirmed payment simultaneously when possible.",
    },
    {
      title: "File with the DMV or Relevant Agency",
      description: "For vehicles, boats, or other titled property, submit the bill of sale along with title transfer documents to the appropriate state agency.",
    },
  ],
  stateConsiderations: [
    {
      title: "Notarization Requirements",
      description: "Alabama, Louisiana, Montana, Oklahoma, and West Virginia require notarized bills of sale for vehicle transfers.",
    },
    {
      title: "Sales Tax Reporting",
      description: "The stated purchase price determines the sales tax owed. Some states have minimum valuations for used vehicles regardless of the stated price.",
    },
    {
      title: "Odometer Disclosure",
      description: "Federal law requires odometer disclosure on vehicles under 10 years old. Many states incorporate this directly into the bill of sale.",
    },
  ],
  mistakesToAvoid: [
    "Leaving the purchase price blank, which can create tax problems.",
    "Failing to describe the property precisely enough to identify it uniquely.",
    "Not including an 'as is' disclaimer when selling property without warranty.",
    "Forgetting to include the date of sale.",
    "Failing to check whether the item has a lien before completing the sale.",
  ],
  faq: [
    {
      question: "Is a bill of sale the same as a title?",
      answer: "No. A title is the official government document proving ownership. A bill of sale records the sale transaction. For titled property like cars, you need both.",
    },
    {
      question: "Do I need a bill of sale for a private vehicle sale?",
      answer: "Most states require or strongly recommend it. It protects both parties and may be needed for tax purposes or to release the seller from future liability.",
    },
    {
      question: "What happens if the seller did not actually own the property?",
      answer: "A bill of sale does not cure a defective title. The true owner can reclaim the property. The buyer's recourse is against the seller for fraud or breach of warranty.",
    },
    {
      question: "Can I write a bill of sale by hand?",
      answer: "Yes. A handwritten bill of sale is generally valid as long as it contains the essential terms and is signed by both parties.",
    },
    {
      question: "How long should I keep a bill of sale?",
      answer: "Keep it permanently for real or major personal property. For vehicles, keep it until you sell the car again. It can be crucial if ownership is later disputed.",
    },
  ],
}

const debtSettlementAgreementDetail: DocumentDetailContent = {
  overview: {
    title: "Debt Settlement Agreement",
    body: "A debt settlement agreement is a binding contract between a creditor and a debtor that formally documents their agreement to resolve an outstanding debt for a specified amount—typically less than the full balance owed—in exchange for the creditor releasing the debtor from any further obligation. Unlike the informal debt settlement letter that initiates the negotiation, the agreement is the signed, enforceable contract that finalizes the deal. Once both parties sign and payment is made, the debt is legally extinguished.",
  },
  whyItMatters: [
    "Legally extinguishes the debt and prevents the creditor from pursuing the remaining balance.",
    "Protects the debtor from future lawsuits or collection activity on the settled debt.",
    "Gives the creditor certainty of recovery and a clean close to the account.",
    "Can be filed as evidence if either party later disputes whether the debt was settled.",
    "Allows both parties to move forward without the ongoing cost and stress of litigation.",
  ],
  keySections: [
    {
      title: "Parties and Account Identification",
      description: "Full legal names, addresses, and the account number and original creditor associated with the debt.",
    },
    {
      title: "Settlement Amount and Payment Terms",
      description: "The exact amount to be paid, the payment method, and the deadline for payment.",
    },
    {
      title: "Release of Claims",
      description: "The creditor's agreement to release all claims against the debtor related to this account upon receipt of the settlement payment.",
    },
    {
      title: "Credit Reporting Obligations",
      description: "How the creditor will report the account to credit bureaus following settlement (e.g., 'settled,' 'paid,' or deletion if negotiated).",
    },
  ],
  process: [
    {
      title: "Confirm Settlement Terms in Writing",
      description: "Ensure all terms—amount, payment method, credit reporting, and release—are reflected in the agreement before signing.",
    },
    {
      title: "Review the Release Language",
      description: "Make sure the release is mutual (if applicable) and covers all related claims, not just the principal debt.",
    },
    {
      title: "Sign the Agreement",
      description: "Both parties execute the agreement. The debtor should not pay until the signed agreement is received.",
    },
    {
      title: "Make the Settlement Payment",
      description: "Pay by certified check, money order, or bank wire—payment methods that create irrefutable proof of payment.",
    },
    {
      title: "Retain All Documentation",
      description: "Keep the signed agreement and payment confirmation permanently in case the creditor later claims the debt is unpaid.",
    },
  ],
  stateConsiderations: [
    {
      title: "Statute of Limitations",
      description: "Settling an old debt could restart the limitations period in some states. Confirm whether the debt is time-barred before agreeing to any payment.",
    },
    {
      title: "Tax Implications",
      description: "Creditors must issue IRS Form 1099-C for forgiven amounts of $600 or more. Debtors may be taxable on the forgiven amount unless insolvent.",
    },
    {
      title: "Consumer Protection Laws",
      description: "Third-party debt settlement companies are regulated in most states. Agreements negotiated by unlicensed companies may be challenged.",
    },
  ],
  mistakesToAvoid: [
    "Paying before the signed agreement is in hand.",
    "Accepting an agreement that does not include a clear, unconditional release of all related claims.",
    "Failing to understand the credit reporting consequences before signing.",
    "Not planning for the potential tax liability on the forgiven amount.",
    "Settling with a collector who cannot prove they own or are authorized to collect the debt.",
  ],
  faq: [
    {
      question: "How is a debt settlement agreement different from a debt settlement letter?",
      answer: "The letter initiates or proposes the settlement. The agreement is the signed, binding contract that finalizes it. Always get a signed agreement before paying.",
    },
    {
      question: "Can the creditor sue me after I pay the settlement?",
      answer: "If you have a properly executed agreement with a full release, and payment is confirmed, the creditor cannot pursue the settled amount. Keep your documentation.",
    },
    {
      question: "Does settling a debt remove it from my credit report?",
      answer: "Not automatically. 'Settled' accounts remain on your credit report for up to 7 years. A negotiated pay-for-delete agreement can remove it, but creditors are not obligated to agree.",
    },
    {
      question: "What if I owe the debt to multiple creditors?",
      answer: "You must settle each debt separately with each creditor or their authorized agent.",
    },
    {
      question: "Should I get legal advice before signing a settlement agreement?",
      answer: "For large debts (over $10,000), consulting a consumer law attorney or credit counselor is advisable to ensure the terms are fair and legal.",
    },
  ],
}

const affidavitDetail: DocumentDetailContent = {
  overview: {
    title: "Affidavit",
    body: "An affidavit is a written statement of facts made voluntarily and confirmed by the affiant's oath or affirmation before a notary public or other authorized official. Because the affiant swears or affirms that the contents are true to the best of their knowledge, the document carries legal weight and can be submitted as evidence in court proceedings, administrative hearings, and various official filings. Affidavits are used in litigation, estate proceedings, real estate transactions, immigration cases, business dealings, and many other contexts.",
  },
  whyItMatters: [
    "Provides sworn testimony in writing, which courts accept as evidence.",
    "Creates a legal record of facts that can be used when a witness cannot appear in person.",
    "False statements in an affidavit constitute perjury, a serious criminal offense.",
    "Required for many court filings, government applications, and official transactions.",
    "Can be used in lieu of live testimony in many administrative and civil proceedings.",
  ],
  keySections: [
    {
      title: "Affiant's Identification",
      description: "The full legal name, address, and capacity (personal knowledge, expert, etc.) of the person making the sworn statement.",
    },
    {
      title: "Statement of Facts",
      description: "Numbered paragraphs stating each fact the affiant swears to be true. Each paragraph should contain a single, specific fact.",
    },
    {
      title: "Oath or Affirmation Clause",
      description: "Language stating that the affiant swears or affirms, under penalty of perjury, that the information is true and correct.",
    },
    {
      title: "Notarization Block",
      description: "The notary public's signature, seal, and statement confirming the affiant appeared, was identified, and was sworn in.",
    },
  ],
  process: [
    {
      title: "Identify What Facts Must Be Proven",
      description: "Determine what the affidavit needs to establish and what the affiant personally knows (as opposed to hearsay).",
    },
    {
      title: "Draft Clear, Numbered Paragraphs",
      description: "Write each factual statement as a separate, numbered paragraph. Avoid legal conclusions; state observable facts.",
    },
    {
      title: "Review for Accuracy",
      description: "Every statement must be true and within the affiant's personal knowledge. Speculation and hearsay can undermine the affidavit's value.",
    },
    {
      title: "Sign Before a Notary",
      description: "Do NOT sign the affidavit before appearing before a notary. The affiant must sign in the notary's presence after being sworn in.",
    },
    {
      title: "File or Deliver as Required",
      description: "Submit the notarized affidavit to the court, agency, or party that requires it, retaining a copy for your records.",
    },
  ],
  stateConsiderations: [
    {
      title: "Jurat vs. Acknowledgment",
      description: "Some states require a jurat (the affiant swears to the truth of the contents) rather than a simple acknowledgment (the affiant confirms their signature). These serve different legal purposes.",
    },
    {
      title: "Electronic Notarization",
      description: "Over 40 states permit remote online notarization (RON), allowing affidavits to be executed via video conference. Requirements vary by state.",
    },
    {
      title: "Self-Proving Affidavits",
      description: "In estate law, a self-proving affidavit attached to a will allows the will to be admitted to probate without requiring witnesses to testify.",
    },
  ],
  mistakesToAvoid: [
    "Signing the affidavit before appearing before a notary (invalidates the oath).",
    "Including hearsay or speculation rather than firsthand, personally known facts.",
    "Using vague language like 'I believe' when you actually know the fact to be true.",
    "Failing to number the paragraphs, which makes referencing specific statements difficult.",
    "Making false statements—perjury carries criminal penalties including imprisonment.",
  ],
  faq: [
    {
      question: "Who can notarize an affidavit?",
      answer: "Any commissioned notary public in the state where the affidavit is signed. Judges, clerks of court, and some other officials may also administer oaths.",
    },
    {
      question: "Can an affidavit be used instead of testifying in court?",
      answer: "In some proceedings (administrative hearings, summary judgment motions) yes. In most trials, live testimony is required, though affidavits may still be used for limited purposes.",
    },
    {
      question: "What happens if I lie in an affidavit?",
      answer: "You may be charged with perjury, a felony in most jurisdictions, punishable by fines and imprisonment.",
    },
    {
      question: "Can someone else write the affidavit for me?",
      answer: "Yes—attorneys and others often draft affidavits for clients. But the affiant must review it carefully and only sign if every statement is true and within their personal knowledge.",
    },
    {
      question: "How long is an affidavit valid?",
      answer: "There is no universal expiration date, but courts and agencies may reject outdated affidavits if the facts could have changed. Draft affidavits as close to their use date as practical.",
    },
  ],
}

const generalReleaseDetail: DocumentDetailContent = {
  overview: {
    title: "General Release of Liability",
    body: "A general release of liability is a legal agreement in which one party (the releasor) voluntarily waives all present and future claims against another party (the releasee) arising out of a specific event, relationship, or set of circumstances. In exchange, the releasee typically provides consideration—a payment, a service, or mutual releases. Releases are used to settle personal injury claims, resolve business disputes, close out litigation, and conclude contractual relationships. A properly drafted general release provides finality and prevents the releasor from re-litigating settled matters.",
  },
  whyItMatters: [
    "Provides the releasee with certainty that the releasor cannot sue over the released claims.",
    "Brings finality to disputes without the cost of litigation.",
    "Is often the final document exchanged in a settlement, making the peace legally binding.",
    "Protects businesses and event organizers from participant injury claims.",
    "Can be mutual, releasing both parties from claims against each other.",
  ],
  keySections: [
    {
      title: "Identification of the Parties",
      description: "Full legal names of all releasors and all releasees, including affiliated entities if the release is to protect a corporate family.",
    },
    {
      title: "Scope of the Release",
      description: "A precise description of the claims being released—whether arising from a specific incident, a contract, or all claims of any nature between the parties.",
    },
    {
      title: "Consideration",
      description: "The payment or benefit the releasor receives in exchange for giving the release. Without consideration, the release may not be enforceable.",
    },
    {
      title: "Unknown Claims Waiver",
      description: "Language waiving unknown claims (in states like California, a Civil Code §1542 waiver is required to release unknown claims).",
    },
  ],
  process: [
    {
      title: "Identify All Claims to Be Released",
      description: "Be specific about which incidents, time periods, and legal theories are covered. Overly broad language may be challenged; overly narrow language may leave claims open.",
    },
    {
      title: "Confirm Consideration",
      description: "Ensure there is clear, adequate consideration for the release. A settlement payment is the most common form.",
    },
    {
      title: "Include Unknown Claims Waiver if Needed",
      description: "If releasing California claims, explicitly reference and waive Civil Code §1542. Other states have similar provisions.",
    },
    {
      title: "Have Both Parties Sign",
      description: "The releasor and (if mutual) the releasee should both sign. Witnesses or notarization strengthen enforceability.",
    },
    {
      title: "Exchange Consideration and Release Simultaneously",
      description: "Deliver the signed release at the same time consideration is received to avoid any dispute about sequencing.",
    },
  ],
  stateConsiderations: [
    {
      title: "California Civil Code §1542",
      description: "California requires an explicit waiver of unknown claims. Without it, a California releasor may not be bound by the release as to claims they did not know about at the time of signing.",
    },
    {
      title: "Workers' Compensation Releases",
      description: "Releases of workers' comp claims typically require approval by a Workers' Compensation Appeals Board or equivalent state body to be valid.",
    },
    {
      title: "ADEA Waivers",
      description: "Releases of federal age discrimination claims (ADEA) by employees age 40+ must include specific disclosures, a 21-day consideration period, and a 7-day revocation window under federal law.",
    },
  ],
  mistakesToAvoid: [
    "Failing to include an unknown claims waiver in states like California that require it.",
    "Omitting key affiliated parties (subsidiaries, officers, agents) from the release.",
    "Signing a release under duress or without adequate time to review—courts may void such releases.",
    "Failing to consult an attorney before signing a release of significant personal injury claims.",
    "Using a one-sided release when a mutual release is more appropriate.",
  ],
  faq: [
    {
      question: "Can I release claims I do not yet know about?",
      answer: "Yes, with proper waiver language. In most states, a general release covers all known and unknown claims. California and a few other states require explicit waiver language for unknown claims.",
    },
    {
      question: "What is the difference between a release and an indemnity?",
      answer: "A release eliminates existing or potential claims between parties. An indemnity shifts the obligation to cover future claims or losses to the indemnifying party.",
    },
    {
      question: "Can a release be voided?",
      answer: "Courts can void releases obtained through fraud, duress, material misrepresentation, or lack of consideration, or releases that violate public policy.",
    },
    {
      question: "Can I release claims on behalf of a minor?",
      answer: "Generally, only a court can approve a settlement and release binding on a minor. A parent's signature alone is usually insufficient to bind a minor's claims.",
    },
    {
      question: "Should I get legal advice before signing a general release?",
      answer: "Strongly recommended if the release covers personal injury, employment discrimination, or significant financial claims. A signed release is very difficult to undo.",
    },
  ],
}

const vehicleBillOfSaleDetail: DocumentDetailContent = {
  overview: {
    title: "Vehicle Bill of Sale",
    body: "A vehicle bill of sale is a specialized legal document that records the private-party sale and transfer of a motor vehicle—car, truck, motorcycle, RV, or other registered vehicle—from seller to buyer for a stated price. It captures the vehicle's identifying information (VIN, make, model, year, odometer reading), the terms of the sale, and any representations or 'as is' disclaimers. Most state DMVs require a bill of sale as part of the title transfer process, and it protects the seller from liability for the vehicle after the sale.",
  },
  whyItMatters: [
    "Required by most states as part of transferring vehicle title at the DMV.",
    "Releases the seller from liability for accidents, tickets, and fees after the sale date.",
    "Documents the odometer reading, protecting the buyer from odometer fraud claims.",
    "Establishes the sale price for sales tax calculation purposes.",
    "Protects both parties if there is a later dispute about what was sold and for how much.",
  ],
  keySections: [
    {
      title: "Vehicle Identification",
      description: "Year, make, model, body style, color, VIN (17-character Vehicle Identification Number), and current odometer reading.",
    },
    {
      title: "Sale Price and Payment Method",
      description: "The agreed purchase price and how it was paid (cash, cashier's check, financing). The stated price affects sales tax.",
    },
    {
      title: "Odometer Disclosure",
      description: "Federal law (49 U.S.C. § 32705) requires the seller to certify the odometer reading for vehicles under 10 model years old.",
    },
    {
      title: "As-Is Statement",
      description: "A disclaimer stating the vehicle is sold in its current condition with no warranties, express or implied, unless the seller is providing one.",
    },
  ],
  process: [
    {
      title: "Run a Vehicle History Report",
      description: "The buyer should obtain a CARFAX or similar report to check for accidents, salvage title, and odometer rollback before completing the purchase.",
    },
    {
      title: "Confirm the Title is Clean and in the Seller's Name",
      description: "Verify the seller is the legal owner and that no liens are recorded against the vehicle.",
    },
    {
      title: "Complete the Bill of Sale",
      description: "Fill in all vehicle details accurately. The VIN must match the title and the physical plate on the vehicle.",
    },
    {
      title: "Sign and Notarize",
      description: "Both parties sign. Some states require notarization—check your state's DMV requirements.",
    },
    {
      title: "Transfer the Title and Register",
      description: "Submit the bill of sale, signed title, and other required documents to the DMV. The buyer must register and insure the vehicle promptly.",
    },
  ],
  stateConsiderations: [
    {
      title: "Notarization Requirements",
      description: "Alabama, Louisiana, Montana, Oklahoma, West Virginia, and a few others require notarized vehicle bills of sale. Others do not.",
    },
    {
      title: "Lien Release",
      description: "If the vehicle has a financed lien, the seller must obtain a lien release from the lender before transferring a clean title to the buyer.",
    },
    {
      title: "Sales Tax Rates",
      description: "Sales tax on private vehicle sales varies widely by state (0% to over 9%) and is typically based on the stated purchase price. Some states use NADA values if the stated price seems too low.",
    },
    {
      title: "Emission and Safety Inspection",
      description: "Some states require passing an emissions or safety inspection before transfer. Confirm local requirements before closing the sale.",
    },
  ],
  mistakesToAvoid: [
    "Failing to record the exact VIN from the vehicle—errors cause title problems.",
    "Not including the odometer reading, violating federal law for qualifying vehicles.",
    "Accepting personal checks from unknown buyers—use cash or a certified/cashier's check.",
    "Transferring the title before receiving payment in full.",
    "Forgetting to remove license plates in states where they belong to the seller.",
  ],
  faq: [
    {
      question: "Does the seller need to notify the DMV after selling a vehicle?",
      answer: "Yes, in most states the seller must submit a notice of sale or release of liability to the DMV to stop accumulating liability for the vehicle after the sale date.",
    },
    {
      question: "What if the seller cannot find the title?",
      answer: "The seller must apply for a duplicate title before completing the sale. Selling without a title creates significant problems for both parties.",
    },
    {
      question: "Can I sell a vehicle with a lien on it?",
      answer: "Yes, but the lien must be paid off at or before closing, and the lender must release the title. The buyer's funds are often used to pay off the lien.",
    },
    {
      question: "How do I sell a vehicle with a rebuilt or salvage title?",
      answer: "Disclose the title status clearly in the bill of sale. Many states require rebuilt-title vehicles to pass a special inspection before retitling.",
    },
    {
      question: "What taxes does the buyer pay?",
      answer: "The buyer typically pays sales tax (or use tax), title and registration fees, and any local surcharges when registering at the DMV.",
    },
  ],
}

const personalPropertyAgreementDetail: DocumentDetailContent = {
  overview: {
    title: "Personal Property Agreement",
    body: "A personal property agreement is a flexible legal document that governs the transfer, use, loan, storage, or shared ownership of tangible personal property—furniture, electronics, tools, artwork, equipment, collectibles, or other movable items. Unlike a vehicle bill of sale (which handles titled vehicles) or a real estate contract (which covers land and buildings), a personal property agreement is used for everything in between. It can document a sale, a loan of property, a co-ownership arrangement, or a transfer between family members in an estate planning context.",
  },
  whyItMatters: [
    "Prevents disputes about who owns, is responsible for, or has the right to use specific property.",
    "Documents transfers between family members for estate planning or Medicaid planning purposes.",
    "Creates a record of valuable item loans between friends or businesses.",
    "Can serve as the basis for insurance claims if property is lost or damaged.",
    "Establishes conditions for co-owned property—who maintains it, who can sell it, how proceeds are divided.",
  ],
  keySections: [
    {
      title: "Property Description",
      description: "A precise description of the property, including make, model, serial number, size, quantity, condition, and any distinguishing features.",
    },
    {
      title: "Nature of the Transfer or Arrangement",
      description: "Whether the agreement is a sale, a gift, a loan, co-ownership, bailment, or another type of arrangement.",
    },
    {
      title: "Consideration",
      description: "What the recipient pays or provides in exchange, even if it is nominal consideration (one dollar) for a gift or transfer.",
    },
    {
      title: "Responsibilities and Return Conditions",
      description: "For property loans or co-ownership, who is responsible for maintenance, insurance, storage, and the conditions under which property must be returned.",
    },
  ],
  process: [
    {
      title: "Identify and Describe the Property",
      description: "List all items clearly. For valuable items, consider having an appraisal done and attaching it to the agreement.",
    },
    {
      title: "Define the Nature of the Transaction",
      description: "Be explicit about whether ownership transfers, is shared, or remains with one party while the other has use rights.",
    },
    {
      title: "Set Out Responsibilities",
      description: "Specify who bears the risk of loss or damage, who is responsible for maintenance and insurance, and what happens if the property is damaged.",
    },
    {
      title: "Sign and Date the Agreement",
      description: "Both parties should sign and date. A notary or witness adds enforceability, especially for high-value items.",
    },
    {
      title: "Photograph the Property",
      description: "Attach photographs documenting the condition of items at the time of transfer. This is critical for loaned or shared property.",
    },
  ],
  stateConsiderations: [
    {
      title: "Uniform Commercial Code (UCC)",
      description: "Sales of goods are governed by UCC Article 2 in every state. Certain implied warranties apply unless expressly disclaimed.",
    },
    {
      title: "Estate and Gift Tax Implications",
      description: "Transferring property of significant value as a 'gift' may have gift tax consequences. Consult a tax advisor for transfers exceeding the annual exclusion ($18,000 in 2024).",
    },
    {
      title: "Medicaid Asset Transfers",
      description: "Transferring property to a family member within 5 years of a Medicaid application can trigger a Medicaid penalty period. Proper documentation and planning are essential.",
    },
  ],
  mistakesToAvoid: [
    "Failing to describe items precisely enough to distinguish them from similar property.",
    "Not addressing who bears the risk of loss or damage during a loan or co-ownership period.",
    "Neglecting to photograph items before transfer or loan.",
    "Gifting property to a family member without considering Medicaid or gift tax implications.",
    "Assuming a verbal agreement is sufficient for valuable personal property.",
  ],
  faq: [
    {
      question: "Do I need a personal property agreement for a gift to a family member?",
      answer: "For low-value items, no. For valuable items—jewelry, art, collectibles, vehicles—a written agreement documents the transfer and can be important for estate, tax, and Medicaid planning.",
    },
    {
      question: "What is a bailment?",
      answer: "A bailment is when one party (the bailor) temporarily delivers property to another (the bailee) for a specific purpose, with the expectation that it will be returned. Lending a friend your truck is a bailment.",
    },
    {
      question: "Can I use a personal property agreement to co-own something?",
      answer: "Yes. The agreement should specify each party's ownership percentage, decision-making authority, and how the property will be divided or sold if the co-ownership ends.",
    },
    {
      question: "Is a handshake deal enough for personal property?",
      answer: "Legally, oral contracts for personal property sales under $500 are generally enforceable under the UCC (the threshold varies by state). But for anything of value, a written agreement prevents disputes.",
    },
    {
      question: "What happens if loaned property is lost or destroyed?",
      answer: "The agreement should specify whether the borrower is liable for the full replacement value or only for losses caused by their negligence. Without a written term, the answer depends on state law and the nature of the bailment.",
    },
  ],
}

const mutualNdaDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Mutual Non-Disclosure Agreement?",
    body:
      "A Mutual Non-Disclosure Agreement (mutual NDA or bilateral NDA) binds both parties to confidentiality obligations simultaneously. Unlike a one-way NDA, each party agrees to protect the other's sensitive information. Mutual NDAs are the standard choice for negotiations, joint ventures, and partnerships where both sides share proprietary data, trade secrets, or business strategies.",
  },
  whyItMatters: [
    "Ensures both parties' confidential information is equally protected.",
    "Sets the legal foundation for open negotiations and due-diligence discussions.",
    "Creates enforceable remedies — including injunctive relief — if either party breaches.",
    "Signals professionalism and good faith before a business relationship begins.",
    "Reduces the risk of misappropriated trade secrets or competitive intelligence.",
  ],
  keySections: [
    {
      title: "Mutual Confidentiality Obligations",
      description: "Binds both parties to keep the other's information confidential and limits how it may be used.",
    },
    {
      title: "Definition of Confidential Information",
      description: "Specifies what categories of information are protected — written, oral, digital, or marked as confidential.",
    },
    {
      title: "Exclusions",
      description: "Carves out information that is already public, independently developed, or lawfully obtained from a third party.",
    },
    {
      title: "Term and Duration",
      description: "Sets how long confidentiality obligations last after the agreement ends.",
    },
  ],
  process: [
    {
      title: "Step 1: Identify Both Parties",
      description: "List the full legal names and addresses of both disclosing/receiving parties.",
    },
    {
      title: "Step 2: Define the Purpose",
      description: "State the specific business relationship or transaction triggering the NDA.",
    },
    {
      title: "Step 3: Specify Confidential Information",
      description: "Describe the categories of information each party will share.",
    },
    {
      title: "Step 4: Set the Term",
      description: "Choose a confidentiality period appropriate to the sensitivity of the information (typically 2–5 years).",
    },
    {
      title: "Step 5: Execute with Both Signatures",
      description: "Both authorized representatives sign and each party retains a copy.",
    },
  ],
  stateConsiderations: [
    {
      title: "Trade Secret Statutes",
      description: "All states have adopted trade secret laws based on the Uniform Trade Secrets Act or the federal Defend Trade Secrets Act — your NDA's definitions should align with these.",
    },
    {
      title: "Non-Compete Carve-Outs",
      description: "If the NDA includes non-solicitation or non-compete clauses, state law governs enforceability (e.g., California bans most non-competes).",
    },
    {
      title: "Duration Limits",
      description: "Some states disfavor indefinite or unreasonably long confidentiality terms; keep the term proportional to the sensitivity of the information.",
    },
  ],
  mistakesToAvoid: [
    "Making confidentiality obligations asymmetric in a document labeled 'mutual.'",
    "Defining confidential information so broadly that exclusions are swallowed.",
    "Omitting the specific purpose — overly broad NDAs are harder to enforce.",
    "Forgetting to get signatures from authorized representatives (not just employees).",
    "Setting an indefinite term without a review mechanism.",
  ],
  faq: [
    {
      question: "When should I use a mutual NDA instead of a one-way NDA?",
      answer: "Use a mutual NDA whenever both parties will be sharing sensitive information — such as in merger discussions, joint ventures, or co-development agreements. Use a one-way NDA when only one party is disclosing.",
    },
    {
      question: "Can a mutual NDA include a non-compete clause?",
      answer: "Yes, but enforceability depends on your state. California, for example, bans most non-compete clauses. A non-solicitation clause is generally more enforceable across states.",
    },
    {
      question: "How long should a mutual NDA last?",
      answer: "Most mutual NDAs last 2–5 years from the date of signing or from the date information is disclosed. The right term depends on how long the information remains competitively sensitive.",
    },
    {
      question: "Does a mutual NDA need to be notarized?",
      answer: "Not typically. Mutual NDAs are enforceable with authorized signatures alone. Notarization is not required but can add formality.",
    },
    {
      question: "What remedies are available if the mutual NDA is breached?",
      answer: "Remedies include monetary damages for losses caused by the breach and injunctive relief to immediately stop further disclosure. Courts often grant injunctions in NDA cases because damages can be hard to quantify.",
    },
  ],
}

const unilateralNdaDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Unilateral Non-Disclosure Agreement?",
    body:
      "A Unilateral Non-Disclosure Agreement (one-way NDA) creates confidentiality obligations only for the receiving party. The disclosing party shares proprietary information — trade secrets, business plans, financial data — while the recipient is legally bound to keep it confidential and use it only for the agreed purpose. This is the most common NDA structure for vendor relationships, pre-employment screening, and investor presentations.",
  },
  whyItMatters: [
    "Protects sensitive information you share with vendors, candidates, or investors.",
    "Creates a legally enforceable obligation on the receiving party only.",
    "Provides clear remedies if the recipient discloses or misuses your information.",
    "Keeps the agreement simple when only one side is sharing sensitive data.",
    "Demonstrates professionalism and seriousness before sharing proprietary information.",
  ],
  keySections: [
    {
      title: "One-Way Confidentiality Obligation",
      description: "Only the receiving party is bound — the disclosing party retains freedom to share information as needed.",
    },
    {
      title: "Definition of Confidential Information",
      description: "Specifies what information the receiving party must protect.",
    },
    {
      title: "Permitted Use",
      description: "Limits how the recipient may use the information to the specific stated purpose.",
    },
    {
      title: "Return or Destruction",
      description: "Requires the recipient to return or destroy materials at the end of the engagement.",
    },
  ],
  process: [
    {
      title: "Step 1: Identify the Parties",
      description: "Name the disclosing party and the receiving party with full legal names.",
    },
    {
      title: "Step 2: Define the Purpose",
      description: "State the specific reason the information is being shared.",
    },
    {
      title: "Step 3: Describe the Information",
      description: "Be specific about what categories of information are protected.",
    },
    {
      title: "Step 4: Set the Term",
      description: "Choose a confidentiality period appropriate to the sensitivity (typically 1–3 years).",
    },
    {
      title: "Step 5: Execute",
      description: "Both parties sign; the receiving party's signature is the key enforcement element.",
    },
  ],
  stateConsiderations: [
    {
      title: "Trade Secret Overlap",
      description: "Information that qualifies as a trade secret may be protected even without an NDA under the Defend Trade Secrets Act. An NDA provides additional, clearer contractual remedies.",
    },
    {
      title: "Employee NDAs",
      description: "Some states (e.g., California) restrict what employers can require employees to keep confidential. Employee-focused NDAs must be carefully drafted.",
    },
  ],
  mistakesToAvoid: [
    "Using mutual NDA language in a one-way NDA — this creates unintended obligations on the disclosing party.",
    "Defining confidential information so vaguely that it is unenforceable.",
    "Failing to specify the permitted use — courts scrutinize NDAs that restrict recipients without clear purpose.",
    "Not requiring the recipient's signature before sharing information.",
    "Omitting a return-or-destroy clause.",
  ],
  faq: [
    {
      question: "What is the difference between a unilateral and mutual NDA?",
      answer: "A unilateral NDA binds only the receiving party. A mutual NDA binds both parties. Use unilateral when only you are sharing sensitive information.",
    },
    {
      question: "Can I use a unilateral NDA for an employee?",
      answer: "Yes. Employer-to-employee NDAs are typically unilateral. However, state law may limit what can be covered — particularly in California, which restricts many employment-related confidentiality agreements.",
    },
    {
      question: "Do I need an NDA before a pitch or investor meeting?",
      answer: "It depends. Many investors refuse to sign NDAs before initial pitches. For detailed technical disclosures or post-term sheet due diligence, a unilateral NDA is appropriate.",
    },
    {
      question: "How long is a unilateral NDA enforceable?",
      answer: "Typically 1–5 years. The appropriate term depends on how long the information retains competitive value. Trade secrets can sometimes be protected longer.",
    },
    {
      question: "Is a unilateral NDA enforceable in court?",
      answer: "Yes, if it is properly drafted, signed, and supported by consideration. Courts generally enforce clear, specific NDAs where the receiving party received something of value.",
    },
  ],
}

const singleMemberLlcDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Single-Member LLC Operating Agreement?",
    body:
      "A Single-Member LLC Operating Agreement is the governing document for a limited liability company with exactly one owner. While many states do not legally require it, this document is essential for maintaining the liability shield between you and your business, satisfying bank and lender requirements, and establishing tax treatment elections. Without one, your LLC may be treated as a sole proprietorship or subjected to state default rules.",
  },
  whyItMatters: [
    "Reinforces the legal separation between you and your LLC — protecting personal assets.",
    "Required by most banks to open a business account.",
    "Establishes whether your LLC is taxed as a sole proprietor, S-Corp, or C-Corp.",
    "Documents management authority and operational procedures.",
    "Protects you if the LLC structure is challenged in court.",
  ],
  keySections: [
    {
      title: "Member and Ownership",
      description: "Confirms the single member's identity and 100% ownership interest.",
    },
    {
      title: "Capital Contributions",
      description: "Documents the initial capital invested by the member.",
    },
    {
      title: "Management and Authority",
      description: "Grants full management authority to the sole member.",
    },
    {
      title: "Distributions and Tax Treatment",
      description: "Sets distribution rules and records any tax election.",
    },
  ],
  process: [
    {
      title: "Step 1: Confirm LLC Formation",
      description: "Ensure your Articles of Organization are filed with the state before executing the operating agreement.",
    },
    {
      title: "Step 2: Document Your Information",
      description: "Provide your legal name, address, LLC name, and state of formation.",
    },
    {
      title: "Step 3: Record Capital Contribution",
      description: "State the amount and date of your initial capital investment.",
    },
    {
      title: "Step 4: Set Tax Treatment",
      description: "Elect how the LLC will be treated for federal tax purposes (disregarded entity is default for single-member LLCs).",
    },
    {
      title: "Step 5: Sign and Store",
      description: "Sign the agreement and keep a copy with your LLC's formation documents.",
    },
  ],
  stateConsiderations: [
    {
      title: "States That Require an Operating Agreement",
      description: "California, New York, Missouri, Maine, and Delaware require LLCs to have an operating agreement. Even where not required, it is strongly advisable.",
    },
    {
      title: "Default State Rules",
      description: "Without an operating agreement, your LLC's governance is controlled by your state's default LLC statute — which may not reflect your intentions.",
    },
    {
      title: "Annual Report Requirements",
      description: "Most states require LLCs to file annual or biennial reports to maintain active status. Your operating agreement does not replace this requirement.",
    },
  ],
  mistakesToAvoid: [
    "Skipping the operating agreement because you are the only member.",
    "Failing to update the operating agreement when the business changes significantly.",
    "Commingling personal and business funds — this undermines your liability shield regardless of the operating agreement.",
    "Not specifying successor provisions for what happens to the LLC if you become incapacitated or die.",
    "Using a multi-member template that creates obligations that don't apply.",
  ],
  faq: [
    {
      question: "Does a single-member LLC need an operating agreement?",
      answer: "Legally, most states do not require one, but practically every bank, lender, and investor will ask for it. It also protects your liability shield and documents your tax elections.",
    },
    {
      question: "How is a single-member LLC taxed?",
      answer: "By default, a single-member LLC is treated as a 'disregarded entity' — income and losses are reported on Schedule C of your personal tax return. You can elect S-Corp or C-Corp treatment by filing with the IRS.",
    },
    {
      question: "Can I convert my single-member LLC to a multi-member LLC later?",
      answer: "Yes. You would amend your operating agreement, file any required state paperwork, and issue membership interests to the new members. This should be done with legal guidance.",
    },
    {
      question: "Do I need to notarize the operating agreement?",
      answer: "Most states do not require notarization of an operating agreement. Your signature is sufficient. However, some states may require it to record real property transactions through the LLC.",
    },
    {
      question: "What happens if I don't have an operating agreement?",
      answer: "Your LLC will be governed by your state's default LLC statute. This can lead to unexpected outcomes regarding distributions, management, and dissolution.",
    },
  ],
}

const multiMemberLlcDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Multi-Member LLC Operating Agreement?",
    body:
      "A Multi-Member LLC Operating Agreement governs an LLC with two or more members. It is the foundational document defining each member's ownership percentage, capital contributions, voting rights, profit distributions, and what happens when a member wants to exit or transfer their interest. Unlike a partnership agreement or corporate bylaws, an LLC operating agreement offers maximum flexibility in structuring the relationship.",
  },
  whyItMatters: [
    "Defines each member's ownership stake and capital contribution.",
    "Prevents disputes by establishing voting, management, and distribution rules in advance.",
    "Controls who can become a member and how interests are transferred.",
    "Provides a buyout mechanism when a member leaves.",
    "Protects all members from unexpected personal liability.",
  ],
  keySections: [
    {
      title: "Members and Ownership Table",
      description: "Lists all members with ownership percentages and initial capital contributions.",
    },
    {
      title: "Management Structure",
      description: "Determines whether the LLC is member-managed or manager-managed.",
    },
    {
      title: "Voting Rights",
      description: "Sets voting thresholds for ordinary and major business decisions.",
    },
    {
      title: "Transfer Restrictions",
      description: "Limits who can acquire membership interests and grants rights of first refusal.",
    },
  ],
  process: [
    {
      title: "Step 1: Confirm All Members",
      description: "Collect legal names, addresses, and ownership percentages of all members.",
    },
    {
      title: "Step 2: Choose Management Style",
      description: "Decide whether day-to-day management will be handled by all members or a designated manager.",
    },
    {
      title: "Step 3: Set Voting Rules",
      description: "Define what percentage of membership interests are needed to approve ordinary vs. extraordinary decisions.",
    },
    {
      title: "Step 4: Define Exit Provisions",
      description: "Agree on how a departing member's interest will be valued and purchased.",
    },
    {
      title: "Step 5: Execute and Distribute",
      description: "All members sign the agreement and each retains a copy.",
    },
  ],
  stateConsiderations: [
    {
      title: "State Mandatory Provisions",
      description: "Some states have mandatory operating agreement provisions that cannot be waived — review your state's LLC act before finalizing.",
    },
    {
      title: "Tax Classification",
      description: "A multi-member LLC is treated as a partnership for federal tax purposes by default. Members must file Schedule K-1 and may elect S-Corp treatment.",
    },
    {
      title: "Transfer and Assignment Rules",
      description: "Many states distinguish between transferring economic rights (allowed) and transferring full membership (requiring all members' consent). Make sure your agreement addresses this clearly.",
    },
    {
      title: "Deadlock Resolution",
      description: "When members hold equal ownership, deadlocks are a real risk. Consider appointing a tiebreaker manager or including a buy-sell (shotgun) clause.",
    },
  ],
  mistakesToAvoid: [
    "Failing to specify voting thresholds for major decisions like adding members, taking on debt, or dissolving the LLC.",
    "Not including a buyout or right-of-first-refusal clause when a member exits.",
    "Leaving profit distribution rules ambiguous — specify whether distributions are pro-rata or discretionary.",
    "Using a single-member template for a multi-member LLC.",
    "Forgetting to update the agreement when membership interests change.",
    "Not addressing what happens if a member dies, becomes incapacitated, or files for bankruptcy.",
  ],
  faq: [
    {
      question: "Do all members need to sign the operating agreement?",
      answer: "Yes. All members should sign the operating agreement to make it binding. A member who does not sign is not bound by its terms.",
    },
    {
      question: "Can one member be removed from the LLC?",
      answer: "This depends on the operating agreement and state law. A well-drafted agreement will specify the grounds and process for involuntary removal — typically requiring a supermajority vote.",
    },
    {
      question: "How are profits distributed in a multi-member LLC?",
      answer: "By default, profits are distributed proportionally to ownership percentage. The operating agreement can change this to reflect different economic arrangements.",
    },
    {
      question: "What is the difference between a member-managed and manager-managed LLC?",
      answer: "In a member-managed LLC, all members have authority to bind the company. In a manager-managed LLC, only designated managers (who may or may not be members) have management authority.",
    },
    {
      question: "What is a buy-sell agreement and should my LLC have one?",
      answer: "A buy-sell agreement sets the terms under which a departing member's interest must be sold. It is strongly recommended for any multi-member LLC to prevent deadlock and forced dissolution.",
    },
  ],
}

const durablePoaDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Durable Power of Attorney?",
    body:
      "A Durable Power of Attorney (DPOA) grants a trusted agent the authority to manage your financial, legal, and property affairs — and unlike a standard POA, this authority remains effective even if you become mentally incapacitated. The 'durable' feature is critical for elder-care planning: without it, a general POA automatically terminates when you lose capacity, leaving your family unable to manage your affairs without going to court.",
  },
  whyItMatters: [
    "Remains effective if you become mentally incapacitated due to illness, accident, or cognitive decline.",
    "Allows your agent to manage finances, pay bills, file taxes, and handle real estate without court intervention.",
    "Avoids the expensive and time-consuming court process of establishing a guardianship or conservatorship.",
    "Gives you control over who manages your affairs rather than leaving it to a court-appointed guardian.",
    "Provides peace of mind for both you and your family in the event of a medical emergency.",
  ],
  keySections: [
    {
      title: "Durability Clause",
      description: "The statutory language declaring that the POA survives the principal's incapacity — without this, the POA terminates when incapacity occurs.",
    },
    {
      title: "Scope of Financial Powers",
      description: "Enumerates the specific financial and legal actions the agent is authorized to take, from banking to real estate transactions.",
    },
    {
      title: "Successor Agent",
      description: "Names an alternate agent if the primary agent is unable or unwilling to serve.",
    },
    {
      title: "Effective Date",
      description: "Specifies whether the DPOA is immediately effective or 'springing' — only taking effect upon a physician's certification of incapacity.",
    },
  ],
  process: [
    {
      title: "Step 1: Choose Your Agent",
      description: "Select a trusted person — spouse, adult child, or close friend — with the financial literacy and integrity to manage your affairs.",
    },
    {
      title: "Step 2: Define the Scope",
      description: "Decide which financial powers to grant: banking, real estate, investments, tax filing, and/or gifting.",
    },
    {
      title: "Step 3: Select Effective Date",
      description: "Choose between immediate effectiveness or a 'springing' DPOA triggered by incapacity.",
    },
    {
      title: "Step 4: Execute Properly",
      description: "Sign before a notary and the required number of witnesses as specified by your state's law.",
    },
    {
      title: "Step 5: Distribute Copies",
      description: "Provide your agent and relevant institutions (banks, title companies) with certified copies.",
    },
  ],
  stateConsiderations: [
    {
      title: "Statutory Short Form",
      description: "Many states (New York, California, Illinois, etc.) have a statutory short-form DPOA that financial institutions are required to honor. Using the exact statutory language is critical in these states.",
    },
    {
      title: "Witness and Notarization Requirements",
      description: "Most states require notarization and one or two witnesses. Some states prohibit the agent from serving as a witness.",
    },
    {
      title: "Hot Powers",
      description: "Certain powers (making gifts, amending trusts, changing beneficiary designations) require express authorization in many states — they are not included by default.",
    },
    {
      title: "Gifting Limits",
      description: "Some states limit the agent's gifting authority to the annual IRS gift-tax exclusion unless the principal expressly authorizes larger gifts.",
    },
  ],
  mistakesToAvoid: [
    "Using a general POA (non-durable) when you need protection against incapacity.",
    "Failing to include the required statutory durability language.",
    "Granting powers too broadly without understanding the agent's obligations.",
    "Not naming a successor agent in case your primary agent is unavailable.",
    "Failing to properly execute the document (missing notarization or required witnesses).",
    "Not updating the DPOA after major life changes such as divorce or the death of the named agent.",
  ],
  faq: [
    {
      question: "What is the difference between a durable and a general power of attorney?",
      answer: "A general power of attorney automatically terminates if you become incapacitated. A durable power of attorney continues in force during incapacity — which is its key purpose.",
    },
    {
      question: "Can I revoke a durable power of attorney?",
      answer: "Yes. As long as you are mentally competent, you can revoke a DPOA at any time by executing a written revocation and notifying your agent and any institutions relying on it.",
    },
    {
      question: "What is a 'springing' durable power of attorney?",
      answer: "A springing DPOA only takes effect upon the occurrence of a specified event — typically a physician's written certification that you lack capacity. This limits the agent's authority until it is needed.",
    },
    {
      question: "Does a DPOA give my agent control over healthcare decisions?",
      answer: "Not unless you specify it. For healthcare decisions, you need a separate Medical Power of Attorney (or Healthcare Proxy). A DPOA typically covers financial and property matters.",
    },
    {
      question: "Do I need a lawyer to create a durable power of attorney?",
      answer: "You are not legally required to use a lawyer, but the document must precisely follow your state's statutory requirements. An improperly executed DPOA may be rejected by banks or courts.",
    },
  ],
}

const medicalPoaDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Medical Power of Attorney?",
    body:
      "A Medical Power of Attorney (MPOA) — also called a Healthcare Proxy or Healthcare Power of Attorney — designates a trusted person (your healthcare agent) to make medical decisions on your behalf if you become unable to do so. It is one of the most important estate-planning documents you can have, ensuring your healthcare preferences are honored by someone you trust rather than left to medical staff, default hospital policies, or a court-appointed guardian.",
  },
  whyItMatters: [
    "Ensures your medical decisions are made by someone who knows your values and wishes.",
    "Avoids conflict among family members about medical treatment choices.",
    "Allows your agent to access your medical records and communicate with providers under HIPAA.",
    "Prevents costly and slow court proceedings to appoint a healthcare guardian.",
    "Can specify your wishes regarding life-sustaining treatment, resuscitation, and organ donation.",
  ],
  keySections: [
    {
      title: "Agent Designation",
      description: "Names the person authorized to make healthcare decisions and any successor agent.",
    },
    {
      title: "Scope of Authority",
      description: "Defines what medical decisions the agent can make, including treatment refusals and end-of-life care.",
    },
    {
      title: "HIPAA Authorization",
      description: "Grants the agent access to your protected health information so they can communicate effectively with providers.",
    },
    {
      title: "Principal's Preferences",
      description: "Documents your specific wishes regarding life-sustaining treatment, resuscitation, and organ donation.",
    },
  ],
  process: [
    {
      title: "Step 1: Choose Your Healthcare Agent",
      description: "Select someone who knows your values and can advocate firmly on your behalf under pressure.",
    },
    {
      title: "Step 2: Define the Scope",
      description: "Specify any limitations on your agent's authority or specific treatment preferences.",
    },
    {
      title: "Step 3: Include HIPAA Authorization",
      description: "Authorize your agent to access and discuss your medical records with providers.",
    },
    {
      title: "Step 4: Sign Before Witnesses",
      description: "Execute the document with the witnesses or notarization required by your state.",
    },
    {
      title: "Step 5: Distribute to Providers",
      description: "Give copies to your healthcare agent, primary care physician, hospital, and any specialists.",
    },
  ],
  stateConsiderations: [
    {
      title: "State Statutory Forms",
      description: "Many states provide a statutory healthcare proxy form. Using the state's form or language ensures hospitals and providers will honor it without question.",
    },
    {
      title: "Witness Restrictions",
      description: "Most states prohibit your healthcare agent, heirs, or treating physician from serving as a witness to the MPOA.",
    },
    {
      title: "Mental Health Treatment",
      description: "Some states have separate documents or specific requirements for authorizing mental health treatment decisions. A general MPOA may not cover psychiatric hospitalization.",
    },
    {
      title: "Integration with Living Will",
      description: "An MPOA works best alongside a living will (advance directive), which provides specific instructions your agent can reference. Many states combine both into a single advance healthcare directive.",
    },
  ],
  mistakesToAvoid: [
    "Naming a healthcare agent without discussing your wishes with them in detail.",
    "Forgetting to name a successor agent in case your primary agent is unavailable.",
    "Failing to execute with the correct witnesses or notarization.",
    "Not providing copies to your primary care physician and hospital.",
    "Assuming a general durable power of attorney covers healthcare decisions — it typically does not.",
    "Not updating the document after major life events such as divorce, the death of your named agent, or a significant change in your health wishes.",
  ],
  faq: [
    {
      question: "What is the difference between a medical power of attorney and a living will?",
      answer: "A medical POA designates a person to make decisions. A living will (advance directive) provides written instructions about specific treatments. Both are recommended — the agent can use the living will as guidance.",
    },
    {
      question: "Who should I choose as my healthcare agent?",
      answer: "Choose someone you trust deeply who can advocate firmly, understands your values, is available in an emergency, and can handle emotional medical situations. Geographic proximity can be important.",
    },
    {
      question: "Can my doctor refuse to follow my agent's instructions?",
      answer: "A provider can decline to follow instructions that violate their professional ethics, but they must allow transfer to another provider. Clear documentation reduces these conflicts significantly.",
    },
    {
      question: "Does a medical power of attorney expire?",
      answer: "Most MPOAs do not have an automatic expiration date. They remain effective until revoked or until you regain capacity. Some states add expiration provisions; review your state's law.",
    },
    {
      question: "Can I revoke a medical power of attorney?",
      answer: "Yes. You can revoke an MPOA at any time while you have mental capacity by notifying your agent and any healthcare providers who have a copy on file.",
    },
  ],
}

const monthToMonthLeaseDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Month-to-Month Lease Agreement?",
    body:
      "A Month-to-Month Lease Agreement (also called a periodic tenancy) is a rental contract that automatically renews each month until either the landlord or tenant provides proper written notice to terminate. Unlike a fixed-term lease, it offers maximum flexibility for both parties — the tenant can move with shorter notice, and the landlord can adjust terms or reclaim the property more easily. However, this flexibility comes with less stability than an annual lease.",
  },
  whyItMatters: [
    "Provides flexibility for tenants who cannot commit to a full-year lease.",
    "Allows landlords to adjust rent or reclaim the property with proper notice.",
    "Documents all rental terms clearly to prevent disputes.",
    "Ensures compliance with state notice period requirements.",
    "Protects both parties with enforceable terms for security deposits and maintenance.",
  ],
  keySections: [
    {
      title: "Notice to Terminate",
      description: "Specifies the number of days' written notice required to end the tenancy — typically 30 days in most states, but ranging from 7 to 90 days depending on jurisdiction.",
    },
    {
      title: "Rent and Increases",
      description: "Sets the monthly rent amount, due date, and the required notice for any rent increases.",
    },
    {
      title: "Security Deposit",
      description: "Documents deposit amount, permitted deductions, and the state-mandated return timeline.",
    },
    {
      title: "Tenant and Landlord Responsibilities",
      description: "Defines maintenance, repair, and habitability obligations for each party.",
    },
  ],
  process: [
    {
      title: "Step 1: Set Rental Terms",
      description: "Agree on rent amount, due date, acceptable payment methods, and late fee policy.",
    },
    {
      title: "Step 2: Define Notice Requirements",
      description: "Specify how many days' notice each party must give to terminate the tenancy — ensure compliance with state law.",
    },
    {
      title: "Step 3: Document Deposit Terms",
      description: "Record the deposit amount, conditions for deductions, and the timeline for return.",
    },
    {
      title: "Step 4: Add Policies",
      description: "Include rules on pets, smoking, guests, and alterations.",
    },
    {
      title: "Step 5: Sign and Conduct Move-In Inspection",
      description: "Both parties sign, conduct and document a move-in inspection, and each retains a copy.",
    },
  ],
  stateConsiderations: [
    {
      title: "Notice Period Requirements",
      description: "Notice requirements vary widely — California requires 30 days' notice (60 days if the tenant has lived there over a year), while other states require as little as 7 days. Confirm your state's rule.",
    },
    {
      title: "Rent Increase Notice",
      description: "Many states require 30–90 days' advance notice before a rent increase on a month-to-month tenancy. Some localities have rent control ordinances that limit the amount of increases.",
    },
    {
      title: "Security Deposit Limits",
      description: "Most states cap security deposits at 1–2 months' rent and require return within 14–30 days of move-out with an itemized deduction statement.",
    },
  ],
  mistakesToAvoid: [
    "Using notice periods shorter than your state's legal minimum.",
    "Failing to document the property's condition at move-in.",
    "Not including late fee provisions and grace periods.",
    "Ignoring local rent control ordinances that apply to month-to-month tenancies.",
    "Failing to provide state-required disclosures (lead paint, bedbug history, etc.).",
    "Allowing oral rent increases instead of providing proper written notice.",
  ],
  faq: [
    {
      question: "How much notice does a landlord need to give to end a month-to-month lease?",
      answer: "It depends on your state. Most states require 30 days. California requires 60 days if the tenant has lived there more than one year. Always check your local law.",
    },
    {
      question: "Can a landlord raise rent on a month-to-month lease?",
      answer: "Yes, but most states require advance written notice — typically 30–60 days. Rent control areas may limit the amount of any increase.",
    },
    {
      question: "Is a month-to-month lease better than a fixed-term lease?",
      answer: "It depends on your situation. Month-to-month offers flexibility but less stability. Fixed-term leases lock in rent and terms but penalize early termination.",
    },
    {
      question: "Can a tenant leave without notice on a month-to-month lease?",
      answer: "No. Tenants are legally required to give the notice period specified in the lease (and at minimum, the notice required by state law). Leaving without notice can result in liability for unpaid rent.",
    },
    {
      question: "Do month-to-month leases need to be in writing?",
      answer: "In most states, a lease for less than one year can be oral. However, a written lease is always strongly advisable — it documents all terms and prevents he-said/she-said disputes.",
    },
  ],
}

const atWillEmploymentDetail: DocumentDetailContent = {
  overview: {
    title: "What Is an At-Will Employment Contract?",
    body:
      "An At-Will Employment Contract formalizes the employment relationship in the default employment arrangement in most U.S. states: either the employer or the employee may end the relationship at any time, for any lawful reason, without advance notice. While at-will employment does not require a written contract, documenting compensation, job duties, and company policies in writing protects both parties and reduces the risk of disputes about what was agreed.",
  },
  whyItMatters: [
    "Documents compensation, benefits, and job duties to prevent disputes.",
    "Explicitly preserves the at-will nature of the relationship, preventing implied contract claims.",
    "Sets expectations for confidentiality, IP assignment, and non-compete terms.",
    "Provides a professional onboarding document that employees sign.",
    "Reduces exposure to wrongful termination claims based on implied employment contracts.",
  ],
  keySections: [
    {
      title: "At-Will Statement",
      description: "Explicitly states that employment is at-will and may be terminated by either party at any time for any lawful reason.",
    },
    {
      title: "Compensation and Benefits",
      description: "Documents salary, pay frequency, bonus eligibility, and benefit entitlements.",
    },
    {
      title: "Job Duties and Reporting",
      description: "Describes the role, responsibilities, and organizational reporting structure.",
    },
    {
      title: "Confidentiality and IP Assignment",
      description: "Requires the employee to keep company information confidential and assigns intellectual property created during employment to the employer.",
    },
  ],
  process: [
    {
      title: "Step 1: Define the Role",
      description: "Describe the position title, duties, reporting structure, and work location.",
    },
    {
      title: "Step 2: Set Compensation",
      description: "Document salary, pay period, bonus structure, and any equity or commission arrangements.",
    },
    {
      title: "Step 3: Include Key Policies",
      description: "Cover confidentiality, IP assignment, acceptable use of company property, and any non-compete or non-solicitation obligations.",
    },
    {
      title: "Step 4: Add At-Will Disclaimer",
      description: "Ensure the contract explicitly states the at-will nature and that no promises of continued employment are being made.",
    },
    {
      title: "Step 5: Execute Before Start Date",
      description: "Have the employee sign before or on their first day. Provide a copy for their records.",
    },
  ],
  stateConsiderations: [
    {
      title: "At-Will Exceptions",
      description: "All states recognize the at-will doctrine, but exceptions exist — including public policy exceptions (you can't fire someone for jury duty), implied contract exceptions (be careful with handbook language), and good-faith covenant exceptions recognized in some states.",
    },
    {
      title: "Non-Compete Enforceability",
      description: "Many states significantly restrict or ban employee non-compete agreements. California effectively bans them. Review your state's law before including a non-compete.",
    },
    {
      title: "Wage and Hour Compliance",
      description: "Ensure the contract complies with state minimum wage laws, overtime requirements, and meal/rest break rules. These cannot be waived by contract.",
    },
  ],
  mistakesToAvoid: [
    "Using language that implies a guarantee of continued employment (e.g., 'permanent position').",
    "Including an unenforceable non-compete that undermines the rest of the contract.",
    "Failing to get the signed contract before the employee starts — this weakens its enforceability.",
    "Using a fixed-term employment contract template when the intent is at-will employment.",
    "Not specifying compensation clearly — vague compensation terms lead to disputes.",
    "Neglecting to include an integration clause stating that the written contract is the entire agreement.",
  ],
  faq: [
    {
      question: "Do I need a written contract for at-will employees?",
      answer: "Not legally, but it is strongly advisable. A written at-will contract documents compensation, policies, and IP rights — and prevents the employee from claiming an implied fixed-term contract based on verbal representations.",
    },
    {
      question: "Can an at-will employee be fired for any reason?",
      answer: "For any lawful reason. Unlawful reasons include discrimination (race, sex, religion, disability), retaliation (for whistleblowing, taking protected leave), or violating public policy. Employment at-will does not override federal and state labor laws.",
    },
    {
      question: "How is an at-will contract different from a fixed-term employment contract?",
      answer: "A fixed-term contract runs for a set period and can only be terminated early for cause (or with a buyout). An at-will contract has no fixed term — either party can end it at any time.",
    },
    {
      question: "If I have an at-will contract, am I owed notice before termination?",
      answer: "No, unless the contract specifies a notice period. However, the federal WARN Act requires 60 days' notice for mass layoffs. Some state laws add additional notice requirements.",
    },
    {
      question: "Can a non-compete be included in an at-will contract?",
      answer: "Yes, but enforceability varies by state. The at-will nature of the agreement does not automatically invalidate non-compete clauses, but state law limits on scope, duration, and geographic reach still apply.",
    },
  ],
}

const tripleNetLeaseDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Triple Net (NNN) Lease Agreement?",
    body:
      "A Triple Net (NNN) Lease Agreement is a commercial lease structure in which the tenant pays base rent plus three additional 'nets': property taxes, building insurance, and maintenance costs. This is the dominant lease structure for free-standing retail properties, bank branches, fast-food restaurants, and single-tenant commercial buildings. NNN leases transfer most ownership-related costs to the tenant, providing landlords with a predictable, largely passive income stream.",
  },
  whyItMatters: [
    "Provides landlords with predictable net income by shifting property expenses to the tenant.",
    "Eliminates landlord responsibility for most day-to-day maintenance and operating costs.",
    "Gives tenants more control over their occupancy costs and property condition.",
    "Creates a long-term, stable leasing relationship appropriate for anchor tenants.",
    "Is the standard lease structure for investment-grade commercial real estate.",
  ],
  keySections: [
    {
      title: "Base Rent and Escalation",
      description: "Sets the fixed base rent and annual escalation schedule (typically CPI-based or fixed percentage increases).",
    },
    {
      title: "Tenant NNN Obligations",
      description: "Defines the tenant's responsibility for property taxes, building insurance, and maintenance — the three 'nets.'",
    },
    {
      title: "CAM Reconciliation",
      description: "Establishes the process for estimating, billing, and reconciling common area maintenance charges annually.",
    },
    {
      title: "Landlord's Expense Cap",
      description: "May limit tenant liability for certain capital expenditures or roof/structure repairs that remain the landlord's responsibility in modified NNN leases.",
    },
  ],
  process: [
    {
      title: "Step 1: Define the Premises",
      description: "Describe the leased space precisely, including any exclusive use provisions and permitted-use restrictions.",
    },
    {
      title: "Step 2: Set Rent and Escalation",
      description: "Agree on base rent, annual escalation method, and any rent abatement periods for build-out.",
    },
    {
      title: "Step 3: Allocate NNN Expenses",
      description: "Specify exactly which costs the tenant will bear — taxes, insurance, maintenance — and any caps or exclusions.",
    },
    {
      title: "Step 4: Document CAM Procedures",
      description: "Establish how operating expenses will be estimated, billed monthly, and reconciled annually.",
    },
    {
      title: "Step 5: Include Renewal Options",
      description: "Specify renewal option terms, rent at renewal, and the process for exercising the option.",
    },
  ],
  stateConsiderations: [
    {
      title: "Property Tax Proration",
      description: "How property taxes are calculated and passed through varies by state and county. Some jurisdictions reassess property on sale, which can significantly increase tenant NNN costs after a sale.",
    },
    {
      title: "Assignment and Subletting",
      description: "State law and local custom affect how freely NNN tenants can assign or sublease. For franchise tenants, franchisor consent may also be required.",
    },
    {
      title: "Environmental Liability",
      description: "NNN leases often address environmental indemnification. State environmental laws affect who bears remediation costs for existing or discovered contamination.",
    },
  ],
  mistakesToAvoid: [
    "Failing to define exactly which expenses are included in the NNN obligation — ambiguity leads to disputes.",
    "Not capping tenant liability for large capital expenditures like roof replacement or structural repairs.",
    "Omitting an annual CAM reconciliation process and audit rights for the tenant.",
    "Not specifying rent during option periods — avoid leaving renewal rent to 'fair market value' without a floor and ceiling.",
    "Failing to address property reassessment risk after a sale.",
    "Not requiring the tenant to provide certificates of insurance before occupancy.",
  ],
  faq: [
    {
      question: "What does 'triple net' mean?",
      answer: "The three 'nets' are property taxes, building insurance, and maintenance. The tenant pays these in addition to base rent, leaving the landlord with a 'net' income stream largely free of operating costs.",
    },
    {
      question: "How is a triple net lease different from a gross lease?",
      answer: "In a gross lease, the landlord pays operating expenses and the tenant pays one all-inclusive rent. In an NNN lease, the tenant pays base rent plus actual operating expenses.",
    },
    {
      question: "What is a 'modified' or 'double net' lease?",
      answer: "A double net (NN) lease has the tenant paying taxes and insurance but not maintenance. A modified gross lease may pass through certain expenses but not others. NNN (triple net) is the most common for single-tenant retail.",
    },
    {
      question: "Who is responsible for major repairs in a NNN lease?",
      answer: "It depends on the lease. True NNN leases make the tenant responsible for everything including structural repairs. Many NNN leases carve out roof, structure, and foundation as landlord responsibilities.",
    },
    {
      question: "How long are triple net leases typically?",
      answer: "NNN leases are typically long-term: 10–25 years for investment-grade tenants (fast food, banks, drug stores). Longer terms provide more stable income and higher property valuations.",
    },
  ],
}

// ── New catalog documents ─────────────────────────────────────────────────────

const employeeNdaDetail: DocumentDetailContent = {
  overview: {
    title: "What Is an Employee Non-Disclosure Agreement?",
    body:
      "An Employee NDA (confidentiality agreement) is signed by employees at onboarding to protect the company's trade secrets, client information, pricing, software, and proprietary processes. Unlike a general NDA, it is tailored to the employment relationship and typically survives the end of employment.",
  },
  whyItMatters: [
    "Protects trade secrets and proprietary business information from departing employees.",
    "Provides a legal remedy if a former employee leaks confidential information.",
    "Strengthens IP ownership by pairing confidentiality with an assignment clause.",
    "Deters competitors from using your employees to obtain insider knowledge.",
    "Demonstrates to investors and partners that your IP is protected.",
  ],
  keySections: [
    { title: "Definition of Confidential Information", description: "Broadly defines protected information including trade secrets, client lists, pricing, software source code, and business strategies." },
    { title: "Confidentiality Obligations", description: "Requires the employee to keep all confidential information secret during and after the employment relationship." },
    { title: "IP Assignment", description: "Assigns to the employer all inventions, works, and discoveries created during employment." },
    { title: "Non-Disparagement", description: "Prohibits the employee from making harmful public statements about the company." },
    { title: "Return of Materials", description: "Requires return of all company documents, devices, and confidential materials upon termination." },
  ],
  process: [
    { title: "Present at Onboarding", description: "Have the employee sign before their first day or at the start of employment." },
    { title: "Provide Copy to Employee", description: "Give the signed copy to the employee for their records." },
    { title: "Store Securely", description: "Keep the executed agreement in the employee's personnel file." },
    { title: "Review Annually", description: "Update the agreement if business operations or trade secrets change significantly." },
  ],
  stateConsiderations: [
    { title: "California", description: "California limits confidentiality agreements — they cannot restrict lawful discussion of working conditions or wages. Consult counsel." },
    { title: "Non-Compete Restrictions", description: "Do not include non-compete clauses in states where they are void (CA, ND, MN). Keep this agreement confidentiality-focused only." },
    { title: "Trade Secret Laws", description: "Most states have adopted the Uniform Trade Secrets Act (UTSA) providing additional legal protection beyond the NDA itself." },
  ],
  mistakesToAvoid: [
    "Signing after the employee starts work — consideration issues may arise.",
    "Defining confidential information too narrowly and leaving key assets unprotected.",
    "Including unenforceable non-compete clauses in states where they are banned.",
    "Failing to include an IP assignment clause alongside the confidentiality obligation.",
    "Not providing the employee a copy of the signed agreement.",
  ],
  faq: [
    { question: "Can an employer require an existing employee to sign an NDA?", answer: "Yes, but additional consideration (a raise, bonus, or continued employment in at-will states) may be required to make it enforceable depending on the state." },
    { question: "How long does an employee NDA last?", answer: "Confidentiality of trade secrets is typically indefinite. Other confidential information is often protected for 2–5 years post-employment." },
    { question: "Does an employee NDA replace a non-compete agreement?", answer: "No. They serve different purposes. An NDA protects information; a non-compete restricts where the employee can work. Many employers use both." },
    { question: "Is an employee NDA enforceable if the employee was not paid extra to sign it?", answer: "In most at-will states, employment itself is sufficient consideration at onboarding. Post-hire signing may require additional consideration." },
  ],
}

const assetPurchaseAgreementDetail: DocumentDetailContent = {
  overview: {
    title: "What Is an Asset Purchase Agreement?",
    body:
      "An Asset Purchase Agreement governs the sale of specific business assets — equipment, inventory, intellectual property, customer lists, or goodwill — rather than the business entity itself. The buyer selects which assets to acquire and which liabilities (if any) to assume, making it a flexible alternative to a stock or entity purchase.",
  },
  whyItMatters: [
    "Allows buyers to cherry-pick assets without assuming unwanted liabilities.",
    "Requires IRS asset allocation (Form 8594) which affects tax treatment for both parties.",
    "Provides representations and warranties protecting the buyer from undisclosed defects.",
    "Includes clear title transfer for each asset category.",
    "Governs post-closing obligations such as transition assistance and non-solicitation.",
  ],
  keySections: [
    { title: "Asset Schedule", description: "Lists every asset being purchased with sufficient description to identify each item (equipment serial numbers, IP registrations, inventory counts)." },
    { title: "Purchase Price & Allocation", description: "States the total consideration and allocates it among asset classes per IRS Form 8594 requirements." },
    { title: "Assumed Liabilities", description: "Specifies which liabilities (if any) the buyer is taking on — all others remain with the seller." },
    { title: "Representations & Warranties", description: "Seller confirms title, no hidden liens, accuracy of financials, and completeness of the asset list." },
    { title: "Closing Conditions", description: "Sets out what must occur before the transaction closes — consents, approvals, and deliverables." },
  ],
  process: [
    { title: "Negotiate Asset List", description: "Agree on exactly which assets are included and excluded before drafting." },
    { title: "Conduct Due Diligence", description: "Verify title, lien searches, and condition of key assets." },
    { title: "Draft & Negotiate Agreement", description: "Include all schedules, representations, and any escrow or holdback provisions." },
    { title: "Close & Transfer", description: "Execute bills of sale, IP assignments, and any required third-party consents on closing day." },
  ],
  stateConsiderations: [
    { title: "Bulk Sales Laws", description: "Some states require notice to creditors before a bulk asset sale. Check your state's bulk transfer requirements." },
    { title: "Real Property", description: "If real estate is included, a separate deed and recording is required." },
    { title: "Liquor & Professional Licenses", description: "Certain licenses cannot be transferred — the buyer must apply for new licenses." },
  ],
  mistakesToAvoid: [
    "Failing to list every asset explicitly — assets not listed are NOT transferred.",
    "Ignoring IRS Form 8594 allocation requirements — misallocation can trigger audits.",
    "Assuming liabilities accidentally by including vague language.",
    "Not searching for UCC liens and other encumbrances on assets before closing.",
    "Omitting transition assistance provisions for customer and vendor relationships.",
  ],
  faq: [
    { question: "What is the difference between an asset purchase and a stock purchase?", answer: "In an asset purchase, you buy specific assets and choose which liabilities to assume. In a stock purchase, you buy the entity itself and inherit all liabilities." },
    { question: "Do I need to notify employees of an asset sale?", answer: "Generally no automatic notification is required, but the WARN Act applies to larger layoffs. Employment contracts must be reviewed for assignability." },
    { question: "Is goodwill included in an asset purchase?", answer: "Goodwill can be included as a purchased asset and must be allocated a value in the IRS Form 8594 allocation." },
    { question: "Can I buy a business's customer contracts in an asset purchase?", answer: "Only if the contracts are assignable. Many contracts require the other party's consent to assign — this must be obtained before closing." },
  ],
}

const masterServiceAgreementDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Master Service Agreement (MSA)?",
    body:
      "A Master Service Agreement establishes the standard terms and conditions that govern an ongoing business relationship between a service provider and a client. Rather than renegotiating core legal terms for each project, the parties execute a single MSA and then issue project-specific Statements of Work (SOWs) referencing it.",
  },
  whyItMatters: [
    "Eliminates the need to renegotiate standard terms for every new project.",
    "Provides consistent liability, IP, and confidentiality protections across engagements.",
    "Speeds up deal closure — parties only need to agree on project-specific SOW terms.",
    "Creates a predictable legal framework that reduces disputes.",
    "Signals professionalism to enterprise and institutional clients.",
  ],
  keySections: [
    { title: "Services Framework", description: "Describes the general nature of services with individual SOWs defining project-specific scope, timelines, and deliverables." },
    { title: "IP Ownership", description: "Defines who owns work product — whether it is a work-for-hire assigned to the client or licensed from the provider." },
    { title: "Limitation of Liability", description: "Caps the provider's total liability, typically at fees paid in the prior 12 months." },
    { title: "Indemnification", description: "Each party indemnifies the other for claims arising from their own acts or negligence." },
    { title: "Term & Termination", description: "Sets the MSA duration (often 1–3 years, auto-renewing) and termination rights for convenience or cause." },
  ],
  process: [
    { title: "Negotiate MSA Terms", description: "Agree on liability caps, IP ownership model, and payment terms before signing." },
    { title: "Execute the MSA", description: "Both parties sign the MSA — this governs the relationship going forward." },
    { title: "Issue SOWs Per Project", description: "For each new engagement, issue a Statement of Work referencing the MSA." },
    { title: "Review Annually", description: "Review and renew or update the MSA at each anniversary." },
  ],
  stateConsiderations: [
    { title: "Choice of Law", description: "MSAs often specify Delaware or New York law for predictable commercial interpretation." },
    { title: "International Use", description: "For international clients, consider GDPR data processing addenda and dispute resolution in a neutral forum." },
    { title: "Software & SaaS", description: "Tech companies often pair an MSA with a separate Terms of Service for software access rights." },
  ],
  mistakesToAvoid: [
    "Allowing SOWs to contradict MSA terms without an explicit amendment clause.",
    "Failing to specify who owns deliverables — IP ownership disputes are the most common MSA litigation.",
    "Setting liability caps too low, leaving the provider exposed for large engagements.",
    "Omitting a change-order process for scope creep.",
    "Using the same MSA for both domestic and international clients without modification.",
  ],
  faq: [
    { question: "What is the difference between an MSA and a service agreement?", answer: "A service agreement covers a single engagement. An MSA is an umbrella agreement governing multiple projects, with each project addressed in a SOW." },
    { question: "Who typically drafts the MSA?", answer: "The service provider usually drafts the first version. Enterprise clients may insist on using their own paper." },
    { question: "Can an MSA be terminated early?", answer: "Yes, typically with 30–90 days written notice. Active SOWs may continue to completion even after MSA termination, depending on the terms." },
    { question: "Is an MSA the same as a framework agreement?", answer: "Essentially yes — framework agreement is the term more commonly used in the UK and Europe for the same concept." },
  ],
}

const generalPartnershipAgreementDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a General Partnership Agreement?",
    body:
      "A General Partnership Agreement is a contract between two or more individuals who agree to operate a business together as general partners. All general partners share management authority, profits, losses, and personal liability for partnership debts. Without a written agreement, state default partnership laws govern the relationship.",
  },
  whyItMatters: [
    "Prevents costly disputes by documenting each partner's rights and obligations from the start.",
    "Overrides unfavorable state default rules on profit sharing and management authority.",
    "Provides a clear process for partner exits, buyouts, and dissolution.",
    "Protects minority partners by setting voting thresholds for major decisions.",
    "Essential for opening business bank accounts and establishing business credit.",
  ],
  keySections: [
    { title: "Capital Contributions", description: "Documents each partner's initial and future capital obligations and the process for additional contributions." },
    { title: "Profit & Loss Allocation", description: "Sets how profits and losses are divided — equally by default but can be customized." },
    { title: "Management Rights", description: "Defines each partner's authority to bind the partnership and make decisions." },
    { title: "Partner Withdrawal & Buyout", description: "Establishes the process and valuation method when a partner exits the business." },
    { title: "Dissolution", description: "Sets out the steps for winding up the partnership including asset distribution and creditor payment." },
  ],
  process: [
    { title: "Agree on Business Structure", description: "Confirm all partners want a general partnership (vs. LLC) and agree on basic terms." },
    { title: "Draft the Agreement", description: "Document capital contributions, profit splits, management rules, and exit provisions." },
    { title: "Execute & Notarize", description: "All partners sign; consider notarization for added legal weight." },
    { title: "Register If Required", description: "Some states require filing a partnership certificate with the state. Check your state's requirements." },
  ],
  stateConsiderations: [
    { title: "Revised Uniform Partnership Act", description: "Most states have adopted RUPA which provides default rules when a written agreement is silent." },
    { title: "State Filing Requirements", description: "Some states require a DBA (doing business as) filing or partnership certificate registration." },
    { title: "Joint and Several Liability", description: "All general partners are personally liable for partnership debts — an LLC may provide better protection." },
  ],
  mistakesToAvoid: [
    "Operating without a written agreement and relying on state default rules.",
    "Not specifying how partner disputes will be resolved — consider a mediator clause.",
    "Failing to include a right of first refusal when a partner wants to sell their interest.",
    "Overlooking what happens if a partner dies, becomes incapacitated, or goes bankrupt.",
    "Not including a non-compete provision during the partnership term.",
  ],
  faq: [
    { question: "Do general partners have personal liability?", answer: "Yes. All general partners are personally liable for the debts and obligations of the partnership. An LLC provides liability protection that a general partnership does not." },
    { question: "How is a general partnership different from an LLC?", answer: "A general partnership offers no liability protection. An LLC limits members' personal liability to their investment. Many partnerships convert to LLCs as the business grows." },
    { question: "Do we need to register our general partnership?", answer: "Requirements vary by state. Some states require a partnership certificate or DBA filing. Check your state's Secretary of State requirements." },
    { question: "Can a general partnership have more than two partners?", answer: "Yes, a general partnership can have any number of partners. The agreement should address voting thresholds as the partner count increases." },
  ],
}

const fixedTermEmploymentDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Fixed-Term Employment Contract?",
    body:
      "A Fixed-Term Employment Contract is an employment agreement with a defined start and end date. Unlike at-will employment, the employer commits to employ the individual through the term and cannot terminate without cause (unless specified). Common uses include seasonal roles, project-based hires, maternity cover, and government or grant-funded positions.",
  },
  whyItMatters: [
    "Provides certainty for both employer and employee about the duration of employment.",
    "Allows employers to fill temporary needs without creating permanent headcount.",
    "Protects employees from arbitrary termination before the contract term ends.",
    "Defines clear compensation and benefits for a specific period.",
    "Useful for grant-funded, project-based, or seasonal staffing needs.",
  ],
  keySections: [
    { title: "Defined Start & End Date", description: "Clearly states the employment term with exact dates — the primary feature distinguishing this from at-will employment." },
    { title: "Compensation & Benefits", description: "Documents salary or hourly rate, bonus eligibility, and benefits during the fixed term." },
    { title: "Early Termination", description: "Defines what constitutes cause for early termination by either party and the consequences." },
    { title: "Renewal or Extension", description: "States whether the contract automatically expires, is renewable, or converts to permanent employment at term end." },
    { title: "IP & Confidentiality", description: "Includes standard IP assignment and confidentiality obligations that survive the contract term." },
  ],
  process: [
    { title: "Define the Scope & Term", description: "Determine the exact start date, end date, role, and compensation before drafting." },
    { title: "Draft the Contract", description: "Include all required fields — duties, pay, termination rights, and post-employment obligations." },
    { title: "Execute Before Start Date", description: "Have the employee sign before they begin work to avoid consideration issues." },
    { title: "Track the Term", description: "Set calendar reminders for renewal discussions well before the contract expires." },
  ],
  stateConsiderations: [
    { title: "At-Will States", description: "In most U.S. states, employment is at-will by default. A fixed-term contract expressly overrides this presumption." },
    { title: "Termination Damages", description: "If you terminate early without cause, the employee may be entitled to the remainder of the contract salary — be explicit about early termination rights." },
    { title: "Benefits Continuation", description: "Some states require benefit continuation for the full contract term even if work ends early. Review state law." },
  ],
  mistakesToAvoid: [
    "Including at-will language in a fixed-term contract — it creates contradictory terms.",
    "Not specifying what constitutes 'cause' for early termination.",
    "Failing to address what happens at expiration — automatic end vs. conversion to at-will.",
    "Using a fixed-term contract to avoid providing benefits required for permanent employees.",
    "Rolling over fixed-term contracts repeatedly — some states treat serial renewals as permanent employment.",
  ],
  faq: [
    { question: "Can a fixed-term employee be terminated before the end date?", answer: "Yes, if the contract specifies grounds for early termination. Without cause provisions, the employer may owe the employee the remaining contract salary." },
    { question: "Does a fixed-term contract automatically renew?", answer: "Only if the contract contains an auto-renewal clause. Without one, the contract expires on the end date and employment ends unless a new agreement is executed." },
    { question: "Are fixed-term employees entitled to the same benefits as permanent employees?", answer: "Generally yes for statutory benefits. Discretionary benefits (bonuses, stock options) depend on the contract terms." },
    { question: "What is the difference between a fixed-term contract and a probationary period?", answer: "A probationary period is a trial phase of otherwise permanent (at-will) employment. A fixed-term contract is a defined-duration arrangement that ends on a specified date." },
  ],
}

const contractorAgreement1099Detail: DocumentDetailContent = {
  overview: {
    title: "What Is a 1099 Contractor Agreement?",
    body:
      "A 1099 Contractor Agreement (independent contractor agreement) formalizes the working relationship between a business and a self-employed contractor. It establishes that the contractor is not an employee, defines the scope of services, payment terms, IP ownership, and confidentiality. Proper documentation reduces the risk of costly worker misclassification.",
  },
  whyItMatters: [
    "Reduces the risk of IRS or state worker misclassification penalties.",
    "Clearly assigns ownership of work product created by the contractor.",
    "Protects confidential business information shared with the contractor.",
    "Defines payment terms and invoicing to prevent billing disputes.",
    "Creates a professional framework for the business relationship.",
  ],
  keySections: [
    { title: "Independent Contractor Status", description: "Expressly states the contractor is not an employee and controls how they perform services." },
    { title: "Scope of Services", description: "Describes the specific deliverables, milestones, and expected outputs." },
    { title: "IP Work-for-Hire Assignment", description: "Assigns all work product to the client as a work made for hire or by assignment." },
    { title: "No Tax Withholding", description: "States the client will not withhold taxes and the contractor is responsible for self-employment tax." },
    { title: "Confidentiality", description: "Protects the client's proprietary information disclosed to the contractor." },
  ],
  process: [
    { title: "Draft Before Work Begins", description: "Execute the agreement before the contractor starts any work to avoid retroactive classification issues." },
    { title: "Collect W-9 Form", description: "Obtain a completed W-9 from the contractor for 1099 reporting purposes." },
    { title: "Set Up Invoicing Process", description: "Agree on invoice cadence, format, and payment terms." },
    { title: "Issue 1099-NEC at Year End", description: "If you pay $600 or more in a calendar year, issue a 1099-NEC by January 31 of the following year." },
  ],
  stateConsiderations: [
    { title: "California AB5", description: "California uses the ABC test for worker classification — many workers classified as contractors elsewhere are employees under California law." },
    { title: "Massachusetts & New Jersey", description: "Both states apply strict classification tests similar to California. Consult local counsel for contractors in these states." },
    { title: "Non-Solicitation Limits", description: "Non-solicitation clauses are limited or void in some states (CA, ND, MN). Check state law before including them." },
  ],
  mistakesToAvoid: [
    "Treating contractors like employees (fixed hours, required tools, single client) — behavior matters as much as the contract.",
    "Forgetting to get IP assignment in writing — verbal work-for-hire claims are difficult to enforce.",
    "Failing to issue 1099-NEC forms — IRS penalties apply.",
    "Using the same agreement for both domestic and international contractors without modification.",
    "Not specifying deliverables clearly — vague scope leads to payment disputes.",
  ],
  faq: [
    { question: "What is the difference between a 1099 contractor and a W-2 employee?", answer: "A W-2 employee has taxes withheld, receives benefits, and the employer controls how they work. A 1099 contractor controls how they work, pays their own taxes, and typically does not receive benefits." },
    { question: "Does a 1099 agreement protect me from misclassification claims?", answer: "The agreement helps, but courts look at the actual work relationship — not just what the contract says. Substance matters more than labels." },
    { question: "Who owns the work product created by a contractor?", answer: "By default, the contractor owns their work product. A written work-for-hire or IP assignment clause is required to transfer ownership to the client." },
    { question: "Do I need a 1099 agreement for every contractor?", answer: "Yes — any paid contractor relationship should be documented in writing, regardless of project size or duration." },
  ],
}

const roomRentalAgreementDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Room Rental Agreement?",
    body:
      "A Room Rental Agreement documents the terms when a landlord or primary tenant rents a single room — rather than an entire unit — to a tenant. It covers rent, shared space access, house rules, utilities, and termination notice requirements. Because the landlord typically lives in or manages the same property, the rules are more detailed than a standard lease.",
  },
  whyItMatters: [
    "Protects both parties with clear rules for shared spaces and house conduct.",
    "Documents rent, security deposit, and utility responsibilities in writing.",
    "Provides a legal framework for termination if house rules are violated.",
    "Reduces conflict between housemates by setting expectations upfront.",
    "Required by many local ordinances for short-term or room rental arrangements.",
  ],
  keySections: [
    { title: "Room Description", description: "Identifies the specific room being rented and any storage areas included." },
    { title: "Shared Space Rules", description: "Sets expectations for kitchen, bathroom, living room, and laundry use." },
    { title: "Utility Allocation", description: "States how utilities (electricity, internet, gas, water) are divided or included in rent." },
    { title: "House Rules", description: "Covers noise levels, overnight guests, smoking, pets, and cleaning responsibilities." },
    { title: "Termination Notice", description: "Sets the notice period required by either party to end the arrangement, per state law." },
  ],
  process: [
    { title: "Screen the Tenant", description: "Run a background check and verify income before offering the room." },
    { title: "Walk Through the Property", description: "Document the room's condition and note any existing damage before move-in." },
    { title: "Sign the Agreement", description: "Execute the agreement before the tenant moves in and collect the security deposit." },
    { title: "Provide Required Disclosures", description: "Deliver any state or city required disclosures (lead paint, habitability notices)." },
  ],
  stateConsiderations: [
    { title: "Security Deposit Limits", description: "Many states cap security deposits (e.g., 2 months rent in California) and require return within a set timeline." },
    { title: "Owner-Occupied Exemptions", description: "Owner-occupied single-family rentals may be exempt from some rent control and eviction protections." },
    { title: "Local Rental Licensing", description: "Many cities require a rental license or permit for room rentals — check local requirements." },
  ],
  mistakesToAvoid: [
    "Not documenting the room's condition with photos before move-in.",
    "Omitting house rules — disputes about cleanliness and noise are the most common issues.",
    "Failing to specify how shared utility bills will be divided.",
    "Not including a written notice requirement for termination — oral notice is hard to prove.",
    "Charging a security deposit that exceeds state law limits.",
  ],
  faq: [
    { question: "Is a room rental agreement legally binding?", answer: "Yes, a signed room rental agreement is a legally binding contract enforceable in court. It provides the legal basis for eviction if the tenant violates its terms." },
    { question: "Can I evict a room renter?", answer: "Yes, but you must follow your state's eviction procedures even for room renters. The notice period and process depend on the reason for eviction." },
    { question: "Does a room renter have rights against the primary tenant?", answer: "Yes. The subtenant-landlord relationship creates legal obligations even if the 'landlord' is a fellow tenant. The arrangement should be documented in writing." },
    { question: "Do I need a separate lease and house rules document?", answer: "A single well-drafted room rental agreement can cover both. Alternatively, a brief agreement with a house rules addendum is also common." },
  ],
}

const subleaseAgreementDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Sublease Agreement?",
    body:
      "A Sublease Agreement allows a current tenant (the sublessor) to rent their leased property — or a portion of it — to a new tenant (the sublessee) for a defined period. The sublessor remains responsible to the original landlord under the master lease. The sublessee's rights are limited by the terms of both the sublease and the original lease.",
  },
  whyItMatters: [
    "Allows a tenant to offset rent costs when they cannot occupy the space.",
    "Provides legal documentation for the sublease relationship.",
    "Protects the sublessor who remains liable to the original landlord.",
    "Defines the sublessee's obligations and house/unit rules.",
    "Often required by the original lease — documents landlord's consent.",
  ],
  keySections: [
    { title: "Landlord Consent", description: "References or attaches the original landlord's written consent to sublease." },
    { title: "Original Lease Compliance", description: "Requires the sublessee to comply with all terms of the original lease." },
    { title: "Sublease Rent & Security Deposit", description: "States the monthly rent and security deposit terms between sublessor and sublessee." },
    { title: "Sublessor's Retained Liability", description: "Confirms the sublessor remains primarily liable to the original landlord." },
    { title: "Term & Termination", description: "Defines the sublease period and termination rights if the sublessee defaults." },
  ],
  process: [
    { title: "Obtain Landlord Permission", description: "Review your original lease for subletting clauses and get written permission from the landlord." },
    { title: "Screen the Sublessee", description: "Run a background and credit check on prospective sublessees." },
    { title: "Draft & Execute the Sublease", description: "Sign the sublease agreement before the sublessee takes occupancy." },
    { title: "Provide Copies to All Parties", description: "Give copies to the sublessee and optionally to the original landlord." },
  ],
  stateConsiderations: [
    { title: "Landlord Consent Requirements", description: "Many states require landlord consent before subleasing. Subleasing without permission may be grounds for eviction." },
    { title: "Rent Control Protections", description: "In rent-controlled jurisdictions, sublessees may be entitled to the same rent control protections as primary tenants." },
    { title: "Security Deposit Returns", description: "The sublessor must return the sublessee's deposit within the state-required timeline after the sublease ends." },
  ],
  mistakesToAvoid: [
    "Subleasing without reading your original lease's subletting restrictions.",
    "Failing to get written landlord consent when required.",
    "Charging the sublessee more than the original lease rent (often prohibited in rent-controlled units).",
    "Not documenting the property's condition before the sublessee moves in.",
    "Assuming the sublessee's default automatically excuses your rent obligations to the original landlord.",
  ],
  faq: [
    { question: "Can I sublease my apartment without my landlord's permission?", answer: "It depends on your lease. Most leases prohibit subleasing without written consent. Violating this can result in eviction." },
    { question: "If the sublessee doesn't pay rent, do I still owe rent to the landlord?", answer: "Yes. The sublessor remains fully liable to the original landlord. You must pay your rent regardless of whether the sublessee pays you." },
    { question: "Can I charge more rent to my sublessee than I pay to the landlord?", answer: "In most cases yes, unless you're in a rent-controlled jurisdiction. Check your local rent control laws." },
    { question: "What happens to the sublease if the original lease ends?", answer: "If the master lease terminates, the sublease typically terminates as well. The sublessee has no right to occupy beyond the master lease term." },
  ],
}

const livingWillDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Living Will?",
    body:
      "A Living Will (also called an advance directive or directive to physicians) is a legal document that records your preferences for medical treatment if you become unable to communicate. It guides doctors and family members regarding life-sustaining treatments, resuscitation, and end-of-life care so your wishes are respected even when you cannot speak for yourself.",
  },
  whyItMatters: [
    "Ensures your medical treatment wishes are followed if you become incapacitated.",
    "Relieves family members from having to make difficult healthcare decisions under duress.",
    "Prevents unwanted life-sustaining treatments that conflict with your values.",
    "Reduces family conflict by documenting your wishes clearly.",
    "Legally recognized in all 50 states — hospitals must honor valid directives.",
  ],
  keySections: [
    { title: "Resuscitation Preferences", description: "States whether you want CPR attempted if your heart or breathing stops." },
    { title: "Mechanical Ventilation", description: "Documents your wishes regarding breathing machines if you cannot breathe independently." },
    { title: "Artificial Nutrition & Hydration", description: "Specifies whether tube feeding and IV fluids should be used to prolong life." },
    { title: "Comfort Care Instructions", description: "Requests palliative care, pain management, and comfort measures even if curative treatment is declined." },
    { title: "Organ & Tissue Donation", description: "States your preference for organ, tissue, and body donation." },
  ],
  process: [
    { title: "Reflect on Your Wishes", description: "Consider your values and what quality of life means to you before completing the form." },
    { title: "Complete the Document", description: "Fill out all sections clearly and specifically — vague language leads to uncertainty." },
    { title: "Sign with Witnesses", description: "Sign in front of the state-required number of witnesses (typically two) who are not beneficiaries or healthcare providers." },
    { title: "Distribute Copies", description: "Give copies to your doctor, healthcare agent, hospital records, and family members." },
  ],
  stateConsiderations: [
    { title: "State-Specific Forms", description: "Many states have statutory forms that are automatically recognized. Using the state form ensures immediate hospital acceptance." },
    { title: "Witness Requirements", description: "Most states require two witnesses. Restrictions on who can witness vary — often excluding family members and healthcare providers." },
    { title: "Notarization", description: "Some states (e.g., Louisiana, Alabama) require notarization in addition to witnesses." },
  ],
  mistakesToAvoid: [
    "Being vague — specify exactly what treatments you do and do not want.",
    "Not updating after a serious diagnosis — your wishes may change.",
    "Keeping the document in a place no one can find in an emergency.",
    "Having a family member witness the document (prohibited in many states).",
    "Confusing a living will with a healthcare power of attorney — they serve different purposes.",
  ],
  faq: [
    { question: "Is a living will the same as a healthcare power of attorney?", answer: "No. A living will states your treatment preferences. A healthcare power of attorney (medical POA) appoints someone to make decisions for you. Many people execute both." },
    { question: "Can I change my living will?", answer: "Yes. You can revoke or update a living will at any time while you have capacity. Notify your doctor and family of any changes." },
    { question: "Will doctors follow my living will?", answer: "Yes, legally recognized living wills must be honored. However, they are only effective when you cannot communicate your wishes directly." },
    { question: "Does a living will expire?", answer: "Generally no — a properly executed living will remains valid indefinitely. Some states suggest periodic review and re-signing every 5–7 years." },
  ],
}

const simpleWillDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Simple Will?",
    body:
      "A Simple Will (simple last will and testament) is a streamlined estate planning document for individuals with uncomplicated estates. It appoints an executor to administer your estate, names beneficiaries for your assets, designates guardians for minor children, and provides instructions for paying debts. It is the foundation of any estate plan.",
  },
  whyItMatters: [
    "Ensures your assets go to the people you choose rather than state intestacy laws.",
    "Designates a guardian for minor children — critical for parents.",
    "Appoints a trusted executor to administer your estate.",
    "Avoids delays and costs of dying intestate (without a will).",
    "Provides peace of mind that your wishes will be honored.",
  ],
  keySections: [
    { title: "Executor Appointment", description: "Names a trusted person (and an alternate) to manage your estate, pay debts, and distribute assets." },
    { title: "Specific Bequests", description: "Leaves specific assets (a house, car, jewelry, savings account) to named individuals." },
    { title: "Residuary Clause", description: "Distributes all remaining property not specifically mentioned to a residuary beneficiary." },
    { title: "Guardian Designation", description: "Names a guardian (and alternate) for minor children — one of the most important decisions in any will." },
    { title: "Attestation & Witnesses", description: "State-required witness signatures that make the will legally valid." },
  ],
  process: [
    { title: "Inventory Your Assets", description: "List all significant assets and decide who should receive each one." },
    { title: "Choose Your Executor & Guardian", description: "Select trusted individuals and confirm they are willing to serve." },
    { title: "Draft the Will", description: "Include all required provisions and use clear, unambiguous language for each distribution." },
    { title: "Execute with Witnesses", description: "Sign in front of the required number of witnesses (typically 2) who are not beneficiaries." },
    { title: "Store Safely", description: "Keep the original in a fireproof safe or with your attorney and tell your executor where it is." },
  ],
  stateConsiderations: [
    { title: "Witness Requirements", description: "Most states require two adult witnesses who are not beneficiaries. Louisiana has different formality requirements." },
    { title: "Holographic Wills", description: "Some states accept handwritten wills without witnesses but simple typed wills with witnesses are more reliable." },
    { title: "Community Property States", description: "In community property states (CA, TX, AZ, NV, etc.), you can only bequeath your half of marital property." },
  ],
  mistakesToAvoid: [
    "Not updating the will after major life events (marriage, divorce, birth of children, death of beneficiaries).",
    "Naming beneficiaries with incomplete or incorrect legal names.",
    "Having a beneficiary serve as a witness — this can void their gift.",
    "Not naming alternate beneficiaries in case the primary predeceases you.",
    "Keeping the will in a safe deposit box that requires probate court approval to open.",
  ],
  faq: [
    { question: "Does a will avoid probate?", answer: "No. A will must go through probate court to be administered. Trusts, joint tenancy, and beneficiary designations avoid probate." },
    { question: "Do I need a lawyer to write a will?", answer: "Not legally required, but an attorney ensures the will meets all state formalities and is less likely to be contested." },
    { question: "Can I write my own will?", answer: "Yes, in most states. A simple typed and witnessed will is legally valid. Online tools and templates can assist — but complex estates should use an attorney." },
    { question: "What happens if I die without a will?", answer: "Your estate passes under your state's intestacy laws — typically to a spouse, then children, then other relatives — regardless of your wishes." },
  ],
}

const demandLetterInvoiceDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Demand Letter for Unpaid Invoice?",
    body:
      "A Demand Letter for Unpaid Invoice is a formal written notice sent to a client or customer who has failed to pay an invoice. It states the amount owed, references the invoice, sets a final payment deadline, and warns of legal consequences if payment is not received. It is often the last step before filing a lawsuit or sending the debt to collections.",
  },
  whyItMatters: [
    "Often prompts immediate payment without the cost and time of a lawsuit.",
    "Creates a formal record of the payment demand for court proceedings.",
    "Required by some states as evidence of pre-litigation notice.",
    "Demonstrates professionalism and seriousness to the non-paying party.",
    "May entitle the sender to attorney's fees in some jurisdictions.",
  ],
  keySections: [
    { title: "Invoice Reference", description: "Identifies the specific invoice(s) by number, date, and amount." },
    { title: "Amount Owed", description: "States the exact amount outstanding, including any late fees or interest." },
    { title: "Payment Deadline", description: "Sets a firm final deadline — typically 10–14 days from the date of the letter." },
    { title: "Payment Instructions", description: "Provides specific instructions for how and where to send payment." },
    { title: "Legal Action Warning", description: "States clearly that failure to pay will result in legal action — small claims, civil suit, or collections." },
  ],
  process: [
    { title: "Gather Documentation", description: "Compile the original invoice, contract, prior payment reminders, and any communications." },
    { title: "Draft the Letter", description: "Be specific about amounts, dates, and consequences — vagueness undermines effectiveness." },
    { title: "Send via Certified Mail", description: "Send by certified mail with return receipt for proof of delivery." },
    { title: "Follow Up", description: "If no payment or response within the deadline, proceed to small claims court or hire a collection agency." },
  ],
  stateConsiderations: [
    { title: "Attorney's Fees Clauses", description: "Many states and contracts allow recovery of attorney's fees for the prevailing party in payment disputes." },
    { title: "Statute of Limitations", description: "Written contract claims are typically 4–6 years depending on the state. Do not delay past the deadline." },
    { title: "Small Claims Limits", description: "Small claims court limits vary by state ($2,500–$25,000). A demand letter is often required before filing." },
  ],
  mistakesToAvoid: [
    "Being vague about the amount — specify the exact invoice total, late fees, and interest.",
    "Setting an unrealistically short deadline (less than 7 days) which may be ignored.",
    "Threatening criminal action for civil non-payment — stick to civil remedies.",
    "Sending by email only — certified mail provides documented proof of receipt.",
    "Not following up if the deadline passes without payment or response.",
  ],
  faq: [
    { question: "Does a demand letter guarantee payment?", answer: "No, but it significantly increases the likelihood of payment. Studies show most small business payment disputes are resolved after a formal demand letter." },
    { question: "Can I write a demand letter myself?", answer: "Yes. A well-written, specific demand letter from the creditor themselves is often just as effective as one from an attorney." },
    { question: "What if the client ignores the demand letter?", answer: "File in small claims court if the amount is within the limit, hire a collections agency, or consult an attorney about a civil lawsuit." },
    { question: "Can I add interest and late fees to the demand?", answer: "Yes, if your contract or invoice includes late fee and interest provisions. State the per-day or monthly rate clearly." },
  ],
}

const smallClaimsDemandLetterDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Small Claims Demand Letter?",
    body:
      "A Small Claims Demand Letter is a formal written notice sent before initiating a small claims court case. Many states require or strongly recommend this pre-litigation notice as evidence that the plaintiff made a good-faith attempt to resolve the dispute before filing. It states the claim, amount demanded, resolution deadline, and notice of intent to file.",
  },
  whyItMatters: [
    "Required by many states as evidence of pre-litigation good-faith effort.",
    "Often resolves the dispute without the need for a court appearance.",
    "Demonstrates to the court that you attempted resolution before filing.",
    "Creates a paper trail documenting the dispute timeline.",
    "Inexpensive and quick to prepare — no attorney required.",
  ],
  keySections: [
    { title: "Dispute Description", description: "A concise, factual description of what happened and why you are owed money." },
    { title: "Dollar Amount Claimed", description: "States the exact amount demanded including any applicable damages or fees." },
    { title: "Resolution Deadline", description: "Gives the respondent a clear deadline to pay or respond — typically 10–14 days." },
    { title: "Small Claims Court Notice", description: "Explicitly states the specific court where you will file if the demand is not met." },
    { title: "No Further Notice Statement", description: "Advises the respondent that no additional notice will be given before filing." },
  ],
  process: [
    { title: "Research Your State's Small Claims Limit", description: "Confirm your claim falls within your state's small claims court dollar limit before drafting." },
    { title: "Draft the Letter", description: "Be factual and specific — include dates, amounts, and the basis of your claim." },
    { title: "Send Certified Mail", description: "Send by certified mail with return receipt to prove the respondent received it." },
    { title: "File if Unanswered", description: "If no payment or resolution by the deadline, file your claim at the small claims court." },
  ],
  stateConsiderations: [
    { title: "Filing Limits by State", description: "Small claims limits range from $2,500 (Kentucky) to $25,000 (Tennessee). Verify your state's current limit." },
    { title: "Mandatory Demand Requirement", description: "Some states (e.g., Texas, California) require or strongly encourage a pre-filing demand. Bring evidence of this demand to court." },
    { title: "Businesses vs. Individuals", description: "Some states have different limits for businesses suing vs. individuals suing. Check your state's rules." },
  ],
  mistakesToAvoid: [
    "Demanding an amount that exceeds your state's small claims limit — you will need to file in a higher court.",
    "Being overly emotional — stick to facts, dates, and dollar amounts.",
    "Not referencing any prior communications about the dispute.",
    "Sending by email only — certified mail provides proof of receipt for the court.",
    "Threatening jail or criminal charges — small claims is a civil venue.",
  ],
  faq: [
    { question: "Is a small claims demand letter legally required?", answer: "Requirements vary by state. Some states require it; others strongly recommend it. Bringing it to court demonstrates good faith." },
    { question: "How long should I give the respondent to respond?", answer: "10–14 days is standard. Longer for larger amounts; shorter if the matter is time-sensitive." },
    { question: "Can I sue for more than the small claims limit?", answer: "You can waive the excess and limit your claim to the small claims limit, or file in a higher court. You cannot split one claim into multiple small claims filings." },
    { question: "Do I need an attorney for small claims court?", answer: "No — attorneys are often not permitted in small claims court. The process is designed for individuals to represent themselves." },
  ],
}

const securedPromissoryNoteDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Secured Promissory Note?",
    body:
      "A Secured Promissory Note is a written promise to repay a loan backed by specific collateral. If the borrower defaults, the lender has the legal right to seize and sell the collateral to recover the debt. This gives lenders significantly more protection than an unsecured note and often results in lower interest rates for borrowers.",
  },
  whyItMatters: [
    "Gives the lender priority rights to collateral in case of borrower default.",
    "Reduces the lender's risk compared to unsecured lending.",
    "Often results in more favorable interest rates for the borrower.",
    "Provides a clear legal remedy without a lengthy lawsuit.",
    "Required for most asset-backed private lending arrangements.",
  ],
  keySections: [
    { title: "Collateral Description", description: "Identifies the specific collateral securing the note — property address, vehicle VIN, equipment serial number." },
    { title: "Security Interest Grant", description: "Grants the lender a security interest in the collateral under UCC Article 9 (personal property) or state foreclosure law (real estate)." },
    { title: "Principal & Interest", description: "States the loan amount, interest rate, payment schedule, and maturity date." },
    { title: "Default & Cure", description: "Defines what constitutes a default and any cure period before the lender can enforce." },
    { title: "Lender's Enforcement Rights", description: "Describes the lender's right to repossess, sell, or foreclose on collateral after default." },
  ],
  process: [
    { title: "Agree on Terms", description: "Negotiate principal, interest rate, repayment schedule, and collateral." },
    { title: "Draft the Note", description: "Include all required fields — collateral description, security interest grant, and default provisions." },
    { title: "Perfect the Security Interest", description: "File a UCC-1 financing statement (personal property) or mortgage/deed of trust (real estate) to perfect the lender's priority." },
    { title: "Execute & Disburse", description: "Both parties sign the note before the lender transfers funds." },
  ],
  stateConsiderations: [
    { title: "UCC Filing", description: "For personal property collateral, file a UCC-1 financing statement in the state where the borrower is located." },
    { title: "Real Estate", description: "For real property collateral, a mortgage or deed of trust must be recorded with the county recorder's office." },
    { title: "Usury Laws", description: "States set maximum interest rate limits. Exceeding usury limits may void the interest provision." },
  ],
  mistakesToAvoid: [
    "Failing to perfect the security interest — an unperfected interest may be subordinate to other creditors.",
    "Describing collateral too vaguely — a precise description is essential for enforceability.",
    "Charging interest above your state's usury limit.",
    "Not including a cure period for default — courts often require reasonable notice before enforcement.",
    "Confusing a promissory note with a mortgage — real property requires a separate security instrument.",
  ],
  faq: [
    { question: "What is the difference between a secured and unsecured promissory note?", answer: "A secured note is backed by collateral the lender can seize if the borrower defaults. An unsecured note has no collateral — the lender must sue to recover." },
    { question: "Do I need to file anything to secure the collateral?", answer: "Yes. For personal property, file a UCC-1 financing statement. For real estate, record a mortgage or deed of trust." },
    { question: "Can I use a vehicle as collateral for a promissory note?", answer: "Yes. Include the VIN, make, model, and year. Some states require a lien notation on the vehicle title." },
    { question: "What happens to the collateral if the borrower pays in full?", answer: "The lender must release the security interest (file a UCC-3 termination or release the mortgage) and remove any lien notation from the title." },
  ],
}

const personalLoanAgreementDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a Personal Loan Agreement?",
    body:
      "A Personal Loan Agreement formalizes a loan between two individuals — friends, family members, or acquaintances. It documents the loan amount, repayment schedule, interest rate (if any), and consequences of default. A written agreement protects both the lender and borrower and prevents the memory differences and misunderstandings that destroy personal relationships.",
  },
  whyItMatters: [
    "Prevents misunderstandings about repayment terms between friends and family.",
    "Creates a legally enforceable record of the loan.",
    "Establishes whether the transaction is a loan or a gift for tax purposes.",
    "Protects the lender's estate by documenting a debt owed.",
    "Demonstrates good faith by both parties regarding repayment intent.",
  ],
  keySections: [
    { title: "Loan Amount & Disbursement", description: "States the amount lent and how and when the money was or will be transferred." },
    { title: "Interest Rate", description: "Specifies the interest rate or explicitly states that the loan is interest-free. IRS rules (AFR) apply to interest-free family loans over $10,000." },
    { title: "Repayment Schedule", description: "Documents the payment amounts, due dates, and method of payment." },
    { title: "Default Provisions", description: "States what constitutes a default and what the lender can do to collect." },
    { title: "Death of Lender", description: "Clarifies whether the debt must be repaid to the lender's estate or is forgiven upon the lender's death." },
  ],
  process: [
    { title: "Agree on Terms", description: "Discuss and agree on the amount, interest (if any), and repayment schedule before drafting." },
    { title: "Draft the Agreement", description: "Document all terms clearly — ambiguity causes disputes later." },
    { title: "Sign & Keep Copies", description: "Both parties sign; each keeps a copy. Consider having signatures witnessed." },
    { title: "Transfer Funds", description: "Transfer the loan amount by check or bank transfer to create a paper trail." },
  ],
  stateConsiderations: [
    { title: "IRS Applicable Federal Rate (AFR)", description: "Family loans over $10,000 with below-market interest may have imputed interest for tax purposes. Consider charging at least the AFR." },
    { title: "Statute of Limitations", description: "The time to sue on a written loan agreement varies by state (3–10 years). Document everything promptly." },
    { title: "Usury Limits", description: "Even personal loans are subject to state usury laws. Verify your state's maximum interest rate." },
  ],
  mistakesToAvoid: [
    "Making the loan without any written documentation — even a short email confirmation is better than nothing.",
    "Being vague about the repayment schedule — specify exact dates and amounts.",
    "Ignoring IRS rules on interest-free loans to family members over $10,000.",
    "Not tracking payments — keep records of every payment received.",
    "Lending more than you can afford to lose — even with a written agreement, collection is not guaranteed.",
  ],
  faq: [
    { question: "Do I need to charge interest on a family loan?", answer: "No, but for loans over $10,000 the IRS may impute interest at the Applicable Federal Rate (AFR) even if you charge nothing. Consider charging at least the AFR to avoid tax complications." },
    { question: "Is a personal loan agreement legally enforceable?", answer: "Yes. A signed personal loan agreement is a legally binding contract. The lender can sue in court to collect if the borrower defaults." },
    { question: "What if the borrower cannot pay back the loan?", answer: "You can negotiate a new repayment plan, forgive the debt (which may be treated as a taxable gift), or pursue collection through the courts." },
    { question: "Should I notarize a personal loan agreement?", answer: "Not required in most states but recommended for larger amounts. Notarization helps establish the document's authenticity." },
  ],
}

const generalAffidavitDetail: DocumentDetailContent = {
  overview: {
    title: "What Is a General Affidavit?",
    body:
      "A General Affidavit is a written statement of facts made under oath and signed before a notary public. The affiant (the person making the statement) swears or affirms that the facts stated are true. Affidavits are used in a wide variety of legal, financial, administrative, and personal contexts as a sworn substitute for live testimony.",
  },
  whyItMatters: [
    "Provides a legally admissible sworn statement for courts and agencies.",
    "Substitutes for in-person testimony when the affiant cannot appear.",
    "Establishes facts in the official record with the weight of an oath.",
    "Required for many government, legal, and financial processes.",
    "False statements in an affidavit constitute perjury — a serious crime.",
  ],
  keySections: [
    { title: "Affiant Identification", description: "Identifies the person making the sworn statement — full legal name, address, and state." },
    { title: "Factual Statements", description: "Numbered paragraphs containing specific, personal-knowledge facts stated in first person." },
    { title: "Oath or Affirmation Clause", description: "States that the affiant swears or affirms the truth of the statements under penalty of perjury." },
    { title: "Signature Block", description: "Signed by the affiant in the presence of the notary public." },
    { title: "Notary Acknowledgment", description: "Completed by a licensed notary public who witnesses the signature and administers the oath." },
  ],
  process: [
    { title: "Identify the Purpose", description: "Determine what facts need to be sworn to and for which proceeding or institution." },
    { title: "Draft the Factual Statements", description: "Write clear, numbered paragraphs of facts within your personal knowledge — no legal conclusions." },
    { title: "Appear Before a Notary", description: "Do not sign until you are in front of a notary public who will administer the oath." },
    { title: "Submit to the Recipient", description: "Deliver the executed affidavit to the court, agency, or institution that requested it." },
  ],
  stateConsiderations: [
    { title: "Notary Requirements", description: "All states require a licensed notary public to witness the signing and administer the oath." },
    { title: "Caption & Jurisdiction", description: "If the affidavit is for a court proceeding, include the exact case caption (court, case number, parties)." },
    { title: "Unsworn Declaration", description: "Federal courts and some state courts accept unsworn declarations under 28 U.S.C. § 1746 without a notary — check the specific requirement." },
  ],
  mistakesToAvoid: [
    "Including legal conclusions or opinions — affidavits should contain only facts within the affiant's personal knowledge.",
    "Signing the affidavit before appearing before the notary.",
    "Making statements about things you do not personally know — qualify uncertain facts with 'I believe' or use a different format.",
    "Using vague language — courts require clear, specific, first-person factual statements.",
    "Submitting a false affidavit — perjury charges can result in criminal prosecution.",
  ],
  faq: [
    { question: "What is the difference between an affidavit and a declaration?", answer: "An affidavit is sworn before a notary public. A declaration is an unsworn statement that can be used in some federal courts under 28 U.S.C. § 1746 without a notary." },
    { question: "Can anyone write an affidavit?", answer: "Yes, any competent adult can execute an affidavit. The statements must be within the affiant's personal knowledge and sworn before a notary." },
    { question: "Can I use an affidavit instead of testifying in court?", answer: "Only if the court permits it. Courts generally prefer live testimony so the witness can be cross-examined. Check with the court or your attorney." },
    { question: "How do I find a notary public?", answer: "Notaries are available at banks, UPS stores, libraries, and law offices. Many states allow remote online notarization (RON) via video call." },
  ],
}

const detailContentBySlug: Record<string, DocumentDetailContent> = {
  nda: ndaDetail,
  llc_operating_agreement: llcDetail,
  employment_contract: employmentDetail,
  residential_lease_agreement: residentialLeaseDetail,
  independent_contractor_agreement: contractorDetail,
  partnership_agreement: partnershipDetail,
  power_of_attorney: poaDetail,
  last_will_testament: lastWillDetail,
  commercial_lease_agreement: commercialLeaseDetail,
  service_agreement: serviceAgreementDetail,
  purchase_agreement: purchaseAgreementDetail,
  non_compete_agreement: nonCompeteDetail,
  demand_letter: demandLetterDetail,
  cease_and_desist_letter: ceaseAndDesistDetail,
  notice_of_breach: noticeOfBreachDetail,
  complaint_letter: complaintLetterDetail,
  final_notice_before_legal_action: finalNoticeDetail,
  debt_settlement_letter: debtSettlementLetterDetail,
  landlord_notice_to_vacate: landlordNoticeToVacateDetail,
  promissory_note: promissoryNoteDetail,
  loan_agreement: loanAgreementDetail,
  payment_plan_agreement: paymentPlanAgreementDetail,
  bill_of_sale: billOfSaleDetail,
  debt_settlement_agreement: debtSettlementAgreementDetail,
  affidavit: affidavitDetail,
  general_release_of_liability: generalReleaseDetail,
  vehicle_bill_of_sale: vehicleBillOfSaleDetail,
  personal_property_agreement: personalPropertyAgreementDetail,
  // ── Tier 1 Standalone Intent Documents ────────────────────────────────────
  mutual_nda: mutualNdaDetail,
  unilateral_nda: unilateralNdaDetail,
  single_member_llc: singleMemberLlcDetail,
  multi_member_llc: multiMemberLlcDetail,
  durable_power_of_attorney: durablePoaDetail,
  medical_power_of_attorney: medicalPoaDetail,
  month_to_month_lease: monthToMonthLeaseDetail,
  at_will_employment_contract: atWillEmploymentDetail,
  triple_net_lease: tripleNetLeaseDetail,
  // ── New catalog documents ─────────────────────────────────────────────────
  employee_nda: employeeNdaDetail,
  asset_purchase_agreement: assetPurchaseAgreementDetail,
  master_service_agreement: masterServiceAgreementDetail,
  general_partnership_agreement: generalPartnershipAgreementDetail,
  fixed_term_employment_contract: fixedTermEmploymentDetail,
  "1099_contractor_agreement": contractorAgreement1099Detail,
  room_rental_agreement: roomRentalAgreementDetail,
  sublease_agreement: subleaseAgreementDetail,
  living_will: livingWillDetail,
  simple_will: simpleWillDetail,
  demand_letter_unpaid_invoice: demandLetterInvoiceDetail,
  small_claims_demand_letter: smallClaimsDemandLetterDetail,
  secured_promissory_note: securedPromissoryNoteDetail,
  personal_loan_agreement: personalLoanAgreementDetail,
  general_affidavit: generalAffidavitDetail,
}

export function getDocumentDetailContent(slug: string): DocumentDetailContent | null {
  return detailContentBySlug[slug] || null
}
