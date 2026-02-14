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
}

export function getDocumentDetailContent(slug: string): DocumentDetailContent | null {
  return detailContentBySlug[slug] || null
}
