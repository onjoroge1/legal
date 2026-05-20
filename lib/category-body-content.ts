export interface CategoryBodyContent {
  intro: string[]
  whenYouNeed: { situation: string; detail: string }[]
  documentGuide: { docName: string; useWhen: string }[]
  legalConsiderations: { title: string; body: string }[]
  faq: { question: string; answer: string }[]
  trustStats: { stat: string; context: string }[]
}

export const CATEGORY_BODY_CONTENT: Record<string, CategoryBodyContent> = {
  business: {
    intro: [
      "Business agreements form the legal backbone of every commercial relationship. Whether you are forming a new company, bringing on a partner, hiring a vendor, or protecting proprietary information, a properly drafted document converts verbal understandings into enforceable obligations. Courts rely on written contracts to resolve disputes, and without one, you are left arguing over what was said rather than what was agreed.",
      "Small businesses are disproportionately harmed by contract disputes because they often lack in-house counsel and rely on handshake deals. An LLC Operating Agreement clarifies how profits are split and decisions are made before conflict arises. A Service Agreement spells out deliverables, payment schedules, and remedies for non-performance. These documents are not bureaucratic formalities -- they are practical tools that prevent expensive misunderstandings.",
      "Federal and state laws impose baseline requirements on certain business arrangements, but they rarely fill in the specifics that matter most to your situation. A Partnership Agreement, for example, must address capital contributions, management authority, and exit procedures -- details no statute will supply for you. The documents in this category cover the core agreements that most businesses need at formation and throughout their operating life.",
    ],
    whenYouNeed: [
      {
        situation: "Forming an LLC or corporation",
        detail:
          "When two or more people start a business together, an LLC Operating Agreement or Partnership Agreement establishes ownership percentages, voting rights, profit distribution, and what happens if one owner wants to leave. Without it, state default rules govern -- which rarely match what the founders actually intended.",
      },
      {
        situation: "Hiring a vendor, consultant, or agency",
        detail:
          "Any time money changes hands for a service, a written Service Agreement protects both sides. It defines the scope of work, payment terms, intellectual property ownership, and what constitutes acceptable performance. Verbal arrangements leave both parties guessing about their obligations.",
      },
      {
        situation: "Sharing confidential information with a third party",
        detail:
          "Before disclosing trade secrets, client lists, pricing models, or proprietary processes to a potential partner, investor, or contractor, an NDA creates a legal duty of confidentiality and establishes remedies if that information is misused.",
      },
      {
        situation: "Buying or selling a business asset",
        detail:
          "When your business buys equipment, inventory, intellectual property, or another company's assets, a Purchase Agreement documents what is being sold, the price, representations about the asset's condition, and the transfer process. It protects both the buyer and seller from post-sale disputes.",
      },
      {
        situation: "Bringing on a co-founder or business partner",
        detail:
          "Adding a partner mid-stream requires documenting their capital contribution, ownership stake, role, and the conditions under which they can be bought out. A Partnership Agreement or amended Operating Agreement prevents costly disputes when circumstances change.",
      },
    ],
    documentGuide: [
      {
        docName: "NDA vs. Mutual NDA",
        useWhen:
          "Use a standard NDA when only one party is disclosing sensitive information, such as when you share your business plan with an investor. Use a Mutual NDA when both parties will exchange confidential information, such as in a joint venture negotiation where each side reveals proprietary details.",
      },
      {
        docName: "LLC Operating Agreement vs. Partnership Agreement",
        useWhen:
          "Choose an LLC Operating Agreement if your business is organized as a limited liability company -- it governs member rights and company management while preserving liability protection. Choose a Partnership Agreement for general or limited partnerships, which are simpler structures but carry personal liability for general partners.",
      },
      {
        docName: "Service Agreement vs. Purchase Agreement",
        useWhen:
          "A Service Agreement covers ongoing or project-based work -- design, consulting, marketing, maintenance. A Purchase Agreement covers the one-time sale of goods or assets. If a transaction involves both a product and installation or support, you may need elements of both.",
      },
      {
        docName: "Letter of Intent vs. Purchase Agreement",
        useWhen:
          "A Letter of Intent (LOI) signals serious interest in a deal and outlines key terms before full negotiations conclude. It is typically non-binding. A Purchase Agreement is the binding final document once terms are agreed. Use an LOI early in complex transactions to align expectations before drafting the full agreement.",
      },
    ],
    legalConsiderations: [
      {
        title: "Missing consideration renders a contract unenforceable",
        body: "Every enforceable contract requires consideration -- something of value exchanged by each party. A promise to pay money for services qualifies. A one-sided promise where only one party commits to anything generally does not. If you draft an agreement where one party receives nothing in exchange for their obligations, a court may refuse to enforce it. Always make sure both sides are giving and receiving something of value, and state that clearly in the agreement.",
      },
      {
        title: "Vague scope language creates disputes",
        body: "The most common source of business contract litigation is ambiguous scope language. Phrases like 'complete the project to satisfaction' or 'provide ongoing support' invite disagreement. Courts often interpret ambiguous terms against the party who drafted them. Specify deliverables with measurable criteria, deadlines, and acceptance procedures. If a term has multiple reasonable meanings, define it explicitly in a definitions section at the top of the document.",
      },
      {
        title: "State law governs enforceability of non-compete clauses",
        body: "Many business agreements include non-compete provisions to prevent a departing partner or contractor from immediately working for a competitor. These clauses are unenforceable in several states, including California and Minnesota, and heavily restricted in others. Courts evaluate reasonableness based on geographic scope, duration, and the legitimate business interest being protected. A clause that is too broad will be struck down entirely in some jurisdictions, leaving you with no protection at all.",
      },
      {
        title: "Operating agreements must be updated when ownership changes",
        body: "An LLC Operating Agreement reflects the ownership structure at a point in time. When a member joins, leaves, transfers their interest, or dies, the agreement must be amended to reflect the new reality. An outdated agreement can create confusion about voting rights, profit shares, and management authority. Many businesses neglect this maintenance step and face internal disputes years later when someone relies on a document that no longer reflects the actual arrangement among the members.",
      },
    ],
    faq: [
      {
        question: "Does an NDA need to be notarized to be enforceable?",
        answer:
          "No. NDAs do not require notarization to be legally binding in the United States. A signed, written agreement with clear terms and consideration is sufficient. Notarization can help authenticate signatures if a dispute arises, but it is not a legal requirement for enforceability.",
      },
      {
        question: "Can I use one Service Agreement for all my clients?",
        answer:
          "A template Service Agreement is a reasonable starting point, but you should customize the scope, payment terms, and deliverables for each engagement. Core provisions like dispute resolution, IP ownership, and limitation of liability can remain consistent across clients, reducing drafting time while ensuring each agreement accurately reflects the specific engagement.",
      },
      {
        question: "What happens to an LLC if there is no Operating Agreement?",
        answer:
          "Without an Operating Agreement, your LLC is governed entirely by your state's default LLC statutes. These rules often distribute profits equally regardless of capital contributions, grant each member equal voting power, and may require unanimous consent for major decisions. State defaults rarely match what members actually intended, which is why a custom Operating Agreement is essential.",
      },
      {
        question: "Is a verbal business partnership agreement enforceable?",
        answer:
          "Verbal agreements can be enforceable in theory, but proving their terms in court is extremely difficult. Disputes often come down to one person's word against another's. Most courts are skeptical of verbal agreements for significant business arrangements. A written Partnership Agreement eliminates ambiguity and provides a clear reference point if the relationship deteriorates.",
      },
      {
        question: "What is a limitation of liability clause and why does it matter?",
        answer:
          "A limitation of liability clause caps the maximum damages one party can recover from the other, typically to the amount paid under the contract. Without it, a breach could expose a vendor to consequential damages -- lost profits, lost clients, business interruption costs -- that far exceed the contract value. These clauses are standard in commercial agreements and are generally enforceable between businesses.",
      },
    ],
    trustStats: [
      {
        stat: "60% of small businesses experience a contract dispute within their first five years",
        context:
          "The majority of these disputes stem from ambiguous terms or missing written agreements -- problems that a clearly drafted contract would have prevented.",
      },
      {
        stat: "Businesses with written contracts are 3x more likely to recover payment from a non-paying client",
        context:
          "Courts require evidence of the agreed terms to award damages. A signed agreement is the most direct form of that evidence and significantly increases the likelihood of a favorable judgment.",
      },
      {
        stat: "Over 70% of LLC formation disputes involve disagreements about profit distribution",
        context:
          "These disputes are almost always preventable with an Operating Agreement that explicitly sets out each member's share and the conditions under which distributions are made.",
      },
    ],
  },

  employment: {
    intro: [
      "Employment documents define the legal relationship between a business and the people who work for it. Whether a worker is a full-time employee or an independent contractor changes their tax classification, benefit eligibility, and legal protections significantly. Getting this distinction wrong exposes a business to IRS penalties, back wages, and liability for unpaid employment taxes -- often years after the fact when it is difficult and expensive to correct.",
      "An Employment Contract sets clear expectations on both sides: the employer knows what role they are filling and what they owe the employee, and the employee understands their duties, compensation, and what can cause termination. A well-drafted Independent Contractor Agreement, by contrast, documents the arm's-length nature of the relationship and helps establish that the worker is genuinely self-employed. Neither document eliminates risk on its own, but without them, disputes are decided by statutes that may not favor either party.",
      "Non-compete and non-solicitation agreements are increasingly contested in courts and legislatures. Several states have banned them outright for most workers, and the Federal Trade Commission has signaled interest in federal restrictions. Businesses that rely on these clauses to protect customer relationships and trade secrets need agreements calibrated to current law in each jurisdiction where they employ people. A clause valid in Texas may be void in California -- and employment is inherently local.",
    ],
    whenYouNeed: [
      {
        situation: "Hiring a full-time or part-time employee",
        detail:
          "An Employment Contract documents the job title, compensation structure, benefits, start date, reporting structure, and grounds for termination. It protects both parties by setting expectations clearly before work begins and reducing the chance of misunderstandings about what was promised during the hiring process.",
      },
      {
        situation: "Engaging a freelancer, consultant, or gig worker",
        detail:
          "When a worker sets their own hours, uses their own tools, and works for multiple clients, an Independent Contractor Agreement documents the project scope, payment terms, and the independent nature of the relationship. This distinction matters enormously for tax purposes and determines whether the worker is entitled to benefits and labor law protections.",
      },
      {
        situation: "Protecting confidential client information and trade secrets",
        detail:
          "When an employee or contractor will have access to client lists, pricing strategies, proprietary methods, or unreleased products, a Non-Disclosure Agreement or confidentiality clause within the employment contract creates a legal obligation of confidentiality that survives the end of the working relationship.",
      },
      {
        situation: "Preventing a departing employee from competing directly",
        detail:
          "A Non-Compete Agreement restricts a former employee from starting or joining a competing business within a defined geography and time period. These agreements are only appropriate when the employee has access to genuinely valuable confidential information, and they must be carefully tailored to the laws of the applicable state.",
      },
      {
        situation: "Documenting a commission or bonus structure",
        detail:
          "Compensation disputes are a leading cause of employment litigation. When an employee's pay depends on performance metrics, sales commissions, or discretionary bonuses, a written agreement specifying how those amounts are calculated and when they are paid prevents disputes after a deal closes or an employee resigns.",
      },
    ],
    documentGuide: [
      {
        docName: "Employment Contract vs. Offer Letter",
        useWhen:
          "An offer letter is a brief, informal document that confirms a job offer and summarizes key terms. An Employment Contract is a more comprehensive agreement covering duties, termination procedures, IP ownership, and confidentiality. Use an offer letter for at-will employees in simple roles; use an Employment Contract when the position involves sensitive information, a guaranteed term of employment, or complex compensation structures.",
      },
      {
        docName: "Independent Contractor Agreement vs. Employment Contract",
        useWhen:
          "Use an Independent Contractor Agreement when the worker controls how they complete their work, uses their own equipment, sets their own hours, and works for other clients. Use an Employment Contract when the worker is integrated into your business operations, works set hours you control, and uses your tools and workspace. Misclassifying an employee as a contractor is a serious legal risk.",
      },
      {
        docName: "Non-Compete Agreement vs. Non-Solicitation Agreement",
        useWhen:
          "A Non-Compete Agreement broadly restricts a departing worker from working in a competing business. A Non-Solicitation Agreement is narrower -- it only prohibits the former employee from poaching your clients or coworkers. Non-solicitation clauses are more likely to be enforced by courts, especially in states that limit or ban non-competes, making them a useful alternative when a broad restriction would not survive scrutiny.",
      },
      {
        docName: "Contractor Agreement vs. Statement of Work",
        useWhen:
          "A Master Independent Contractor Agreement sets the framework terms for an ongoing relationship -- payment terms, IP ownership, confidentiality, indemnification. A Statement of Work (SOW) describes a specific project within that framework: deliverables, timelines, and fees. If you work with the same contractor repeatedly, use both: the master agreement once, and an SOW for each new project.",
      },
    ],
    legalConsiderations: [
      {
        title: "Worker misclassification carries significant financial penalties",
        body: "The IRS and state labor agencies actively audit businesses for worker misclassification. If the government reclassifies a contractor as an employee, the business owes back payroll taxes, interest, and penalties -- often for multiple years. Beyond taxes, misclassified workers may claim back wages, overtime, and benefits. Courts and agencies use multi-factor tests to determine worker status, and the label you put on the agreement is not determinative. Actual working conditions must match the classification.",
      },
      {
        title: "At-will employment can be undermined by careless contract language",
        body: "Most U.S. employment is at-will, meaning either party can end the relationship at any time for any lawful reason. However, an Employment Contract that promises 'continued employment' or lists only specific grounds for termination can inadvertently create an implied contract, stripping the employer of at-will status. Courts have found implied contracts in employee handbooks and offer letters. Always include an explicit at-will statement and review all company documents for language that promises job security.",
      },
      {
        title: "Non-compete enforceability varies dramatically by state",
        body: "California, North Dakota, Oklahoma, and Minnesota effectively ban non-compete agreements for most workers. Other states enforce them only when they are reasonable in scope, duration, and geographic area, and when there is a legitimate business interest to protect. A clause valid in Florida may be void in Illinois. Businesses with workers in multiple states need jurisdiction-specific agreements, not a single template applied uniformly. Enforcing an overly broad clause can also damage employer-employee trust.",
      },
      {
        title: "IP assignment clauses must be explicit to transfer ownership",
        body: "Work created by an independent contractor does not automatically belong to the hiring company under copyright law, even if the company paid for it. The contractor owns the copyright unless there is a written assignment. Employment contracts typically include IP assignment clauses that transfer ownership of work created during employment to the employer. These clauses must be clear and specifically identify the categories of work covered. Vague language about 'work product' may leave ownership in dispute.",
      },
    ],
    faq: [
      {
        question: "Does an independent contractor need a written agreement?",
        answer:
          "Yes. A written Independent Contractor Agreement is essential for documenting the nature of the working relationship, the project scope, payment terms, and who owns the work product. Without a written agreement, disputes about deliverables, timelines, and ownership are much harder to resolve, and the absence of documentation can weaken your position if the IRS or a labor agency audits the classification.",
      },
      {
        question: "Can I require a non-compete agreement after someone is already employed?",
        answer:
          "Yes, but many states require additional consideration beyond continued employment to make a mid-employment non-compete enforceable. This might mean a promotion, a raise, or a signing bonus. Simply asking an existing employee to sign a non-compete as a condition of keeping their current job may not be sufficient consideration in all states. Consult current state law before introducing non-competes to existing employees.",
      },
      {
        question: "What should an employment contract say about severance?",
        answer:
          "Severance is not legally required in most U.S. states, but many employment contracts include severance provisions to specify the amount, duration, and conditions under which it is paid. A common structure ties severance to length of service and requires the employee to sign a general release of claims. If your contract is silent on severance, you generally owe none -- but making a verbal promise creates potential liability.",
      },
      {
        question: "Can a contractor agreement be used to hire someone long-term?",
        answer:
          "Using a contractor agreement for a worker who functions as a long-term, integrated team member is a major misclassification risk. The length of the relationship is one factor agencies consider when determining worker status. A worker who has been on a contractor agreement for years, works exclusively for you, and performs the same role as employees is likely an employee under the law regardless of what the contract says.",
      },
      {
        question: "Does an employment contract need to be signed before the first day of work?",
        answer:
          "It should be. An employment contract signed before the first day ensures the employee had time to review the terms and agreed to them before the relationship began. Asking someone to sign after they have already started work raises questions about whether they signed under duress, and may affect enforceability of restrictive covenants like non-competes in some states.",
      },
    ],
    trustStats: [
      {
        stat: "Worker misclassification costs U.S. businesses over $8 billion annually in back taxes, penalties, and legal fees",
        context:
          "The IRS and Department of Labor conduct regular audits, and settlements often reach back three to five years, multiplying the original tax liability significantly.",
      },
      {
        stat: "45% of non-compete agreements are unenforceable in the jurisdiction where they are presented",
        context:
          "Many businesses use generic templates that do not account for state-specific restrictions, resulting in clauses that courts refuse to enforce when they are most needed.",
      },
      {
        stat: "Employment-related lawsuits are the most common type of civil litigation filed against small businesses",
        context:
          "Clear written agreements about compensation, duties, and termination procedures are among the most effective ways to reduce exposure to employment claims.",
      },
    ],
  },

  "real-estate": {
    intro: [
      "Real estate documents govern some of the most financially significant agreements in most people's lives. A residential lease is the foundation of the landlord-tenant relationship, setting out rent, maintenance responsibilities, rules of occupancy, and the conditions under which either party can end the tenancy. Getting these terms right at the outset prevents the disputes -- over security deposits, property damage, and unauthorized occupants -- that consume enormous time and money for both landlords and tenants.",
      "Commercial leases are substantially more complex than residential ones. They often run for five, ten, or even twenty years and involve significant tenant improvement buildouts, exclusivity clauses, and negotiated rent escalation formulas. Unlike residential tenancies, which are heavily regulated to protect consumers, commercial leases largely follow freedom of contract principles. A commercial tenant that signs an unfavorable lease has limited recourse if the landlord drafted it entirely in their favor.",
      "The type of lease structure determines who bears the risk of rising operating costs. A gross lease bundles all costs into a fixed rent payment. A triple-net lease shifts property taxes, insurance, and maintenance costs to the tenant, making the landlord's income predictable but exposing the tenant to cost increases they did not anticipate. Understanding which structure you are signing -- and what obligations you are accepting -- is one of the most important steps in any commercial real estate transaction.",
    ],
    whenYouNeed: [
      {
        situation: "Renting out a residential property",
        detail:
          "A Residential Lease Agreement is required before any tenant moves into a house, apartment, or condo. It documents the rent amount, payment due date, late fees, security deposit terms, pet policy, and maintenance responsibilities. Most states require landlords to provide tenants with a written lease and impose specific requirements about what it must contain.",
      },
      {
        situation: "Leasing space for a business",
        detail:
          "A Commercial Lease Agreement governs office, retail, warehouse, or industrial space. Commercial leases require careful negotiation of tenant improvement allowances, permitted use clauses, subletting rights, renewal options, and rent escalation formulas. A poorly negotiated commercial lease can lock a business into unfavorable terms for years.",
      },
      {
        situation: "Renting on a flexible month-to-month basis",
        detail:
          "A Month-to-Month Lease Agreement creates a rental tenancy that renews automatically each month until either party gives proper notice. This structure suits landlords who want flexibility to occupy or sell the property and tenants who are not ready to commit to a fixed term. Notice requirements and rent-change procedures must be spelled out explicitly.",
      },
      {
        situation: "Leasing commercial property under a net lease structure",
        detail:
          "A Triple-Net Lease requires the tenant to pay not only base rent but also property taxes, building insurance, and maintenance costs. This structure is common in retail and industrial real estate and is favorable to landlords because their net income is predictable. Tenants must carefully evaluate estimated operating costs before signing.",
      },
      {
        situation: "Documenting a sublease or lease assignment",
        detail:
          "When a tenant wants to transfer their lease obligations to another party, or sublet part of their space, a sublease agreement or assignment document is needed. Most leases require landlord consent for these transactions. Without proper documentation, the original tenant may remain liable for rent and damages even after vacating the property.",
      },
    ],
    documentGuide: [
      {
        docName: "Residential Lease vs. Month-to-Month Lease",
        useWhen:
          "A Residential Lease runs for a fixed term -- typically one year -- and provides stability for both landlord and tenant. A Month-to-Month Lease renews automatically and allows either party to terminate with proper notice, usually 30 days. Choose a fixed-term lease when you want predictable occupancy; choose month-to-month when flexibility is more important than stability.",
      },
      {
        docName: "Gross Lease vs. Triple-Net Lease",
        useWhen:
          "In a Gross Lease, the tenant pays a single rent amount and the landlord covers operating costs. In a Triple-Net Lease, the tenant pays base rent plus their proportionate share of taxes, insurance, and common area maintenance. Triple-net leases are common for freestanding retail buildings and long-term commercial tenancies. Tenants should model out total occupancy costs before comparing lease options on base rent alone.",
      },
      {
        docName: "Commercial Lease vs. License Agreement",
        useWhen:
          "A Commercial Lease grants the tenant exclusive possession of a defined space for a defined period, creating strong legal tenancy rights. A License Agreement gives a licensee permission to use a space without creating a tenancy -- co-working arrangements and shared studio spaces often use licenses. Licenses are easier to terminate but offer the occupant fewer legal protections.",
      },
      {
        docName: "Standard Lease vs. Lease with Option to Purchase",
        useWhen:
          "A standard lease creates only a rental obligation. A Lease with Option to Purchase gives the tenant the right (but not the obligation) to buy the property at a set price during or at the end of the lease term. Rent-to-own arrangements typically use this structure. The option price, option fee, and credit toward purchase price must all be explicitly stated.",
      },
    ],
    legalConsiderations: [
      {
        title: "Security deposit rules are heavily regulated by state law",
        body: "Every state has specific rules about how much a landlord can collect as a security deposit, how it must be held (sometimes in a dedicated escrow account), what deductions are permissible, and how quickly it must be returned after the tenancy ends. Non-compliance can result in the landlord forfeiting the right to retain any portion of the deposit, paying the tenant double or triple damages, and covering the tenant's attorney fees. These rules must be reflected in the lease agreement itself.",
      },
      {
        title: "Habitability obligations cannot be waived by contract",
        body: "Landlords have a non-waivable duty under state law to maintain residential properties in a habitable condition -- functioning heat, plumbing, weatherproofing, and freedom from serious pest infestations. A lease clause that purports to transfer these obligations entirely to the tenant is unenforceable in most states. Tenants in habitability disputes may withhold rent, repair and deduct, or terminate the lease depending on state law, regardless of what the lease says.",
      },
      {
        title: "Lease termination procedures must be followed precisely",
        body: "Both landlords and tenants must give proper written notice to terminate a lease, and the required notice period varies by state and lease type. Failing to follow the exact procedure -- using the wrong notice period, delivering notice by an improper method, or providing incorrect information -- can delay termination by weeks or months and, for landlords, complicate eviction proceedings. Courts treat notice requirements as mandatory steps, not formalities to be approximated.",
      },
      {
        title: "Personal guarantees in commercial leases create long-term personal liability",
        body: "Landlords frequently require a business owner to personally guarantee a commercial lease, making the individual liable for unpaid rent if the business fails. Personal guarantees can survive bankruptcy and attach to the guarantor's personal assets. Business owners should negotiate the scope of any personal guarantee -- limiting it to a fixed dollar amount, a specific time period, or releasing it once the business reaches certain revenue thresholds -- before signing a commercial lease.",
      },
    ],
    faq: [
      {
        question: "Can a landlord raise rent during a fixed-term lease?",
        answer:
          "Generally no. A fixed-term lease locks in the rent amount for the lease period. The landlord cannot raise rent during the term unless the lease explicitly includes a rent escalation clause. Rent increases are generally only permissible at renewal, and in rent-controlled jurisdictions, even renewal increases may be capped.",
      },
      {
        question: "What is a personal guarantee in a commercial lease and should I sign one?",
        answer:
          "A personal guarantee makes the business owner personally responsible for the company's lease obligations if the business cannot pay. It means your personal assets -- savings, home equity, investments -- can be used to satisfy unpaid rent. You should always try to negotiate limits on the guarantee: a cap on total exposure, a burn-down that reduces liability over time, or a release once the business proves financial stability.",
      },
      {
        question: "Does a lease need to be notarized?",
        answer:
          "Residential leases generally do not require notarization to be valid and enforceable. Some states require notarization for commercial leases that exceed a certain term, typically more than one year. If you intend to record the lease with the county recorder's office -- which is advisable for long commercial leases -- notarization is typically required.",
      },
      {
        question: "What happens if a tenant does not leave when a lease ends?",
        answer:
          "A tenant who stays after a lease expires without a new agreement becomes a 'holdover tenant.' Most states allow landlords to either evict the holdover tenant or accept rent and treat the tenancy as a month-to-month arrangement. Many commercial leases impose holdover rent at 150% or 200% of the prior rent to deter tenants from overstaying. Landlords should respond quickly and consistently to holdover situations to avoid inadvertently creating a new tenancy.",
      },
      {
        question: "Can I sublease my apartment or office space?",
        answer:
          "Only if your lease permits it or your landlord consents in writing. Most residential leases prohibit subleasing without permission. Commercial leases often allow subletting subject to landlord approval, which cannot be unreasonably withheld. Subleasing without permission exposes you to lease termination and potential liability for any damages caused by the subtenant.",
      },
    ],
    trustStats: [
      {
        stat: "Security deposit disputes are the most common landlord-tenant legal claim, affecting 1 in 3 residential tenancies",
        context:
          "Most disputes stem from vague lease language about permissible deductions and landlords who fail to follow state notice and itemization requirements.",
      },
      {
        stat: "Commercial tenants who negotiate their lease terms save an average of 15-20% on total occupancy costs over a 5-year term",
        context:
          "Key negotiation points include tenant improvement allowances, free rent periods, rent escalation caps, and renewal option pricing.",
      },
      {
        stat: "Over 40% of eviction proceedings are delayed or dismissed due to procedural errors in the notice or filing",
        context:
          "Proper documentation in the original lease agreement and strict adherence to notice requirements are the most reliable ways to avoid these delays.",
      },
    ],
  },

  "estate-planning": {
    intro: [
      "Estate planning documents determine what happens to your assets, your healthcare, and your minor children when you are no longer able to make decisions for yourself. A Last Will and Testament directs how your property is distributed after death and names a guardian for your children. A Power of Attorney designates someone to manage your finances and legal affairs if you become incapacitated. Without these documents, courts and state statutes make these decisions -- and the results may not reflect your wishes.",
      "Incapacity planning is just as important as death planning, and it is often more urgent. A medical emergency can leave a competent adult unable to communicate treatment preferences or manage their financial accounts. A Durable Power of Attorney remains effective even if you become incapacitated -- a critical feature because a standard power of attorney automatically terminates upon the principal's incapacity, precisely when it is most needed. A Healthcare Power of Attorney or Medical Directive specifies your treatment preferences and names someone to enforce them.",
      "Many people delay estate planning because it requires confronting uncomfortable topics. The practical cost of that delay can be severe. An estate without a will is distributed under state intestacy laws, which follow a rigid formula that may disinherit a domestic partner, leave a business to unintended heirs, or require court supervision of assets intended for minor children. Estate planning is not about wealth -- it is about making sure the people and causes you care about are protected.",
    ],
    whenYouNeed: [
      {
        situation: "Getting married or having children",
        detail:
          "Marriage and parenthood are the most common triggers for creating a will and powers of attorney. Parents of minor children need a will to name a guardian who will care for those children if both parents die. Without a named guardian, a court will appoint one, and the appointment may not reflect the parents' preferences.",
      },
      {
        situation: "Facing a planned surgery or serious illness",
        detail:
          "A Healthcare Power of Attorney and Medical Directive allow you to specify your treatment preferences and name someone to speak for you if you cannot communicate during medical care. These documents should be completed before any planned procedure, not during a crisis when time and capacity are limited.",
      },
      {
        situation: "Owning real estate or significant financial accounts",
        detail:
          "Property owned in your name alone cannot be transferred without going through probate -- a court-supervised process that is time-consuming and expensive. A will directs how property is distributed, and a Durable Power of Attorney allows someone to manage and transfer property on your behalf while you are alive but incapacitated.",
      },
      {
        situation: "Running a business you want to continue after your death",
        detail:
          "Business owners need estate planning documents that address what happens to their ownership interest when they die. A will can transfer business ownership to heirs or a successor, while a power of attorney ensures the business can continue operating if the owner becomes temporarily incapacitated. Without these documents, a business may be frozen during probate.",
      },
      {
        situation: "Traveling internationally or working in a hazardous profession",
        detail:
          "People who travel frequently, work in high-risk occupations, or spend extended time abroad are at elevated risk of situations where their instructions are needed and they cannot provide them. A complete set of estate planning documents ensures that trusted individuals can act immediately without waiting for court authorization.",
      },
    ],
    documentGuide: [
      {
        docName: "Standard Power of Attorney vs. Durable Power of Attorney",
        useWhen:
          "A standard Power of Attorney allows someone to act on your behalf for specific transactions or during a defined period. It automatically terminates if you become mentally incapacitated. A Durable Power of Attorney includes specific language making it effective even after incapacity -- this is the version you need for incapacity planning. Use a standard POA for specific, limited transactions; use a Durable POA for comprehensive financial management authority.",
      },
      {
        docName: "General Power of Attorney vs. Medical Power of Attorney",
        useWhen:
          "A General (or Financial) Power of Attorney covers financial and legal decisions: signing contracts, managing bank accounts, filing taxes, selling property. A Medical Power of Attorney (also called a Healthcare Proxy) covers healthcare decisions when you cannot make them yourself. Most comprehensive estate plans include both, designating the most appropriate person for each role -- which may or may not be the same individual.",
      },
      {
        docName: "Last Will and Testament vs. Living Trust",
        useWhen:
          "A will takes effect at death and goes through probate. A living trust holds assets during your lifetime and transfers them directly to beneficiaries at death, bypassing probate. Trusts are more expensive to create and require assets to be formally transferred into the trust to function properly. A will is sufficient for many people; a trust is most beneficial for those with substantial assets, real estate in multiple states, or a desire for privacy since trusts are not public records.",
      },
      {
        docName: "Living Will vs. Healthcare Power of Attorney",
        useWhen:
          "A Living Will (also called an Advance Directive) is a written statement of your treatment preferences -- specifying whether you want life-sustaining treatment if you have a terminal illness or are in a persistent vegetative state. A Healthcare Power of Attorney designates a person to make medical decisions for you. Many people create both: the advance directive provides specific instructions, and the healthcare proxy fills in decisions for situations the directive did not anticipate.",
      },
    ],
    legalConsiderations: [
      {
        title: "Witnesses and notarization requirements are strictly enforced",
        body: "Estate planning documents have formal execution requirements that vary by state. A will typically requires two adult witnesses who are not beneficiaries, and some states require notarization as well. Powers of attorney commonly require notarization and sometimes witnesses. A document that does not meet these requirements may be invalid -- meaning it has no legal effect at all. Courts have refused to honor wills signed by interested witnesses, leaving estates to be distributed under intestacy laws instead.",
      },
      {
        title: "Failing to update beneficiary designations defeats your estate plan",
        body: "Beneficiary designations on life insurance policies, retirement accounts, and bank accounts pass assets directly to the named beneficiary, bypassing your will entirely. An outdated beneficiary designation can transfer an IRA to an ex-spouse, disinherit a new child, or direct assets to a deceased person whose share then passes under the account's default rules. You must review and update beneficiary designations separately from your will, particularly after major life events like marriage, divorce, or the birth of a child.",
      },
      {
        title: "A power of attorney cannot override healthcare facility policies",
        body: "Even with a valid Healthcare Power of Attorney, your designated agent may face resistance from medical providers who have their own protocols or from family members who dispute the agent's authority. Keeping original signed documents accessible -- not just in a safe deposit box -- and communicating your wishes to your agent and physicians in advance significantly reduces the likelihood that your directives will be ignored or challenged in a moment of crisis.",
      },
      {
        title: "Dying without a will creates a probate nightmare for your family",
        body: "When someone dies intestate (without a will), their estate must be administered through the probate court. The court appoints an administrator, applies the state's intestacy formula to distribute assets, and supervises the process -- which can take months or years and generate significant legal fees. Intestacy laws do not recognize domestic partners, may not account for blended family situations, and distribute everything to blood relatives regardless of the decedent's actual relationships and wishes.",
      },
    ],
    faq: [
      {
        question: "At what age should I create a will?",
        answer:
          "Any adult who owns property, has dependents, or has strong preferences about medical treatment should have basic estate planning documents. There is no minimum net worth requirement. A 25-year-old with a bank account and a beneficiary they care about has good reason to create a will and a durable power of attorney.",
      },
      {
        question: "Can I write my own will without an attorney?",
        answer:
          "Holographic wills -- entirely handwritten and signed by the testator -- are valid in about half of U.S. states but carry significant risks, including the difficulty of proving they were written voluntarily and without undue influence. Typed wills require witnesses and sometimes notarization. Online will templates reduce the drafting burden significantly, but you must ensure the document is executed properly under the laws of your state.",
      },
      {
        question: "What is the difference between an executor and a power of attorney?",
        answer:
          "A Power of Attorney designates someone to act on your behalf while you are alive. Their authority ends at your death. An executor (or personal representative) is named in your will and manages your estate after you die -- gathering assets, paying debts, and distributing property to beneficiaries. These are distinct roles and can be assigned to different people.",
      },
      {
        question: "Does a power of attorney need to be recorded with the county?",
        answer:
          "A power of attorney generally does not need to be recorded unless it will be used for real estate transactions. If your agent will buy or sell property on your behalf, recording the POA with the county recorder's office gives the public notice of the agent's authority and may be required by title companies before they will insure the transaction.",
      },
      {
        question: "Can I revoke a power of attorney after I sign it?",
        answer:
          "Yes. As long as you are mentally competent, you can revoke a power of attorney at any time by signing a written revocation. You should provide copies of the revocation to your agent and to any third parties -- banks, financial institutions, medical providers -- who were relying on the original document. Simply destroying your copy does not notify institutions that have already seen the original.",
      },
    ],
    trustStats: [
      {
        stat: "67% of American adults do not have a will or basic estate planning documents",
        context:
          "This means the majority of estates are administered under intestacy laws that may not reflect the decedent's wishes, often leaving family members to navigate probate court during an already difficult time.",
      },
      {
        stat: "Probate proceedings cost an average of 3-7% of the gross estate value in legal fees and court costs",
        context:
          "A $300,000 estate can incur $9,000 to $21,000 in probate costs -- money that goes to attorneys and courts rather than beneficiaries. Proper estate planning can significantly reduce or eliminate these costs.",
      },
      {
        stat: "1 in 5 families reports a dispute over estate distribution that could have been avoided with a clear will",
        context:
          "Family conflicts over inheritances are common when the decedent's wishes were unclear or only expressed verbally. A properly executed will provides a definitive legal statement of intent that courts can enforce.",
      },
    ],
  },

  "legal-letters": {
    intro: [
      "Legal letters serve a specific and important function: they create a documented record of a dispute, a demand, or a legal position at a particular point in time. A Demand Letter puts a party on formal notice that you believe they owe you money or have breached an obligation, and gives them a defined period to respond before you pursue other remedies. Courts often look favorably on plaintiffs who attempted to resolve a dispute before filing suit, and the demand letter is evidence of that effort.",
      "A Cease and Desist letter is a written instruction to stop conduct that you believe is unlawful, harmful, or in violation of your rights. These letters are commonly used in intellectual property disputes, harassment situations, debt collection violations, and contract breaches. While a cease and desist letter does not itself have legal force -- only a court order does -- it puts the recipient on notice and demonstrates that you took the matter seriously if the dispute escalates to litigation.",
      "Notice letters of all types -- Notice of Breach, Notice to Vacate, Notice of Default -- share a common purpose: they formally document that the sender identified a problem and gave the recipient an opportunity to cure it before taking more drastic action. Many contracts and statutes require this notice-and-cure step before a party can terminate a contract, initiate eviction proceedings, or pursue legal remedies. Sending the notice correctly -- in writing, to the right address, by the required method -- is as important as the content of the letter itself.",
    ],
    whenYouNeed: [
      {
        situation: "Someone owes you money and is not paying",
        detail:
          "A Demand Letter formally requests payment of a specific amount by a specific deadline and describes the basis for the debt. It creates a paper trail showing the debtor was notified and given an opportunity to pay voluntarily. Many small claims courts expect plaintiffs to have attempted to collect the debt informally before filing, and a demand letter is the standard way to satisfy that expectation.",
      },
      {
        situation: "A business or individual is infringing on your rights",
        detail:
          "A Cease and Desist letter formally notifies the recipient that their conduct -- copying your content, using your trademark, harassing you online, violating a non-compete -- is unlawful and must stop immediately. It documents that you identified the violation and demanded it stop, which is relevant if you later seek an injunction or damages.",
      },
      {
        situation: "A contractor or vendor has failed to perform under a contract",
        detail:
          "A Notice of Breach formally notifies the other party that they have failed to meet their contractual obligations and gives them a specified period to cure the breach. Most contracts and courts require this step before the non-breaching party can claim damages or terminate the agreement. The notice also starts the clock on any cure period specified in the contract.",
      },
      {
        situation: "A tenant needs to be formally requested to vacate a property",
        detail:
          "A Notice to Vacate is the first step in the eviction process and a required legal prerequisite in every state. It formally informs the tenant that their tenancy is being terminated and specifies the date by which they must leave. The notice period, delivery method, and content requirements vary by state and grounds for termination.",
      },
      {
        situation: "Responding to an unfair charge, error, or complaint",
        detail:
          "A formal Complaint Letter to a business, government agency, or regulatory body creates a documented record of your grievance and the response you received. Regulatory agencies often require evidence that you attempted to resolve the matter directly before they will investigate. A dated, written complaint is far stronger evidence than a verbal or informal communication.",
      },
    ],
    documentGuide: [
      {
        docName: "Demand Letter vs. Cease and Desist Letter",
        useWhen:
          "A Demand Letter asks for payment or specific performance -- it is used when you want something done. A Cease and Desist Letter asks for conduct to stop -- it is used when someone is doing something harmful and you need them to stop. If someone owes you money and is also defaming you online, you might send both: a demand letter for the debt and a cease and desist for the defamatory statements.",
      },
      {
        docName: "Notice of Breach vs. Notice of Default",
        useWhen:
          "A Notice of Breach is used in general contract situations to inform the other party they have failed to perform a contractual obligation and to trigger any cure period. A Notice of Default is used specifically in loan and mortgage contexts to notify a borrower that they have missed payments and the lender intends to pursue remedies if the default is not cured. Both require precise language and timely delivery.",
      },
      {
        docName: "Notice to Vacate vs. Eviction Notice",
        useWhen:
          "A Notice to Vacate is the landlord's written notice terminating the tenancy and specifying when the tenant must leave. It is the first step -- not the end step -- of the eviction process. If the tenant does not leave by the notice deadline, the landlord must then file an eviction lawsuit (unlawful detainer) in court. A landlord cannot remove a tenant without going through court, regardless of what the notice says.",
      },
      {
        docName: "Formal Complaint Letter vs. Demand Letter",
        useWhen:
          "A Complaint Letter is addressed to the entity whose conduct you are objecting to and documents your grievance. It may or may not demand specific compensation. A Demand Letter specifically requests payment of a dollar amount or specific performance by a deadline and implies legal action if the demand is not met. Use a complaint letter for service issues and regulatory matters; use a demand letter when you are prepared to sue if payment is not made.",
      },
    ],
    legalConsiderations: [
      {
        title: "Demand letters must state the amount and deadline clearly",
        body: "An effective demand letter states the exact dollar amount owed, the legal basis for the obligation, and a specific deadline for payment -- typically 14 to 30 days. Vague demands ('please address this matter soon') are much less effective and may not qualify as a proper pre-suit demand in jurisdictions that require one. The letter should also specify how payment should be made and where. Ambiguity in any of these elements gives the recipient an excuse not to respond.",
      },
      {
        title: "Defamatory statements in a cease and desist can create liability",
        body: "A cease and desist letter is itself a written communication that could contain defamatory statements if it makes false factual claims about the recipient. This is especially relevant when the letter is sent to third parties -- for example, sending a cease and desist to someone's employer accusing them of theft when no theft occurred. Stick to documented facts, avoid inflammatory characterizations, and do not make legal conclusions (like 'you are committing fraud') unless you are confident the facts support that claim.",
      },
      {
        title: "Notice delivery method and timing affect legal validity",
        body: "Many contracts and statutes specify how notice must be delivered -- certified mail, overnight courier, or personal delivery -- and when it is deemed received. Sending a required notice by email when the contract requires certified mail may mean the notice was legally never given, even if the recipient actually read it. Similarly, a Notice to Vacate sent too far in advance may not satisfy the statutory minimum if the state requires notice calculated from a specific date, like the first of the month.",
      },
      {
        title: "Threatening litigation you do not intend to pursue undermines your position",
        body: "Demand letters and cease and desist letters commonly state that legal action will follow if the demand is not met. If you have no intention of following through, repeated empty threats can damage your credibility and may, in some circumstances, constitute misrepresentation. Before sending a letter that threatens litigation, consider whether you are actually prepared to file. If you are not, the letter may still be useful, but manage expectations about what you will actually do.",
      },
    ],
    faq: [
      {
        question: "Does a cease and desist letter legally require the recipient to stop?",
        answer:
          "No. A cease and desist letter has no legal force by itself. It is a written notice and demand, not a court order. The recipient is not legally required to comply with it. However, the letter creates a documented record that they were put on notice, which is valuable if you later seek an injunction or damages from a court.",
      },
      {
        question: "Should I send a demand letter before filing a lawsuit?",
        answer:
          "Yes, in most cases. Many courts expect plaintiffs to have made a good-faith attempt to resolve the dispute before filing. Some statutes and contracts explicitly require written notice before a lawsuit can be initiated. A demand letter also gives the other party a chance to pay voluntarily, which is faster and cheaper than going to court.",
      },
      {
        question: "How much time should I give in a demand letter?",
        answer:
          "The standard is 14 to 30 days, depending on the complexity of the situation and the amount at issue. Consumer debt demands often use 30 days. Urgent situations involving ongoing harm -- like an active trademark infringement -- may justify a shorter deadline of 7 to 10 days. Giving too short a deadline may make the letter appear unreasonable to a judge; giving too long may delay resolution unnecessarily.",
      },
      {
        question: "Can I send a cease and desist letter without a lawyer?",
        answer:
          "Yes. You do not need a lawyer to write and send a cease and desist letter. A clearly written, factually accurate letter from the affected party directly can be effective. However, for complex intellectual property disputes, harassment situations involving potential criminal conduct, or cases where the recipient is likely to respond aggressively, having an attorney sign the letter can signal that you are serious and prepared to follow through.",
      },
      {
        question: "What should I do if I receive a cease and desist letter?",
        answer:
          "Do not ignore it. Read it carefully to understand exactly what conduct is being objected to. If the claims have merit, stop the conduct and respond acknowledging that you have done so. If you believe the claims are unfounded, respond in writing explaining your position. Ignoring a cease and desist letter often leads to more expensive legal action that could have been avoided.",
      },
    ],
    trustStats: [
      {
        stat: "Over 80% of demand letters result in some form of response or settlement without going to court",
        context:
          "Written demands create accountability and signal serious intent. Most people and businesses prefer to resolve disputes without litigation, and a formal letter often prompts action that informal requests did not.",
      },
      {
        stat: "Eviction cases where landlords used improper notice procedures are dismissed at a rate exceeding 30%",
        context:
          "Courts strictly enforce notice requirements before allowing eviction proceedings to move forward. A procedurally defective notice forces the landlord to restart the process, adding months to the timeline.",
      },
      {
        stat: "Businesses that respond to breach-of-contract notices within the cure period avoid litigation in approximately 65% of cases",
        context:
          "A Notice of Breach creates a defined opportunity to fix the problem before it escalates. Most parties prefer curing a breach over defending a lawsuit, making these notices an effective dispute-resolution tool.",
      },
    ],
  },

  financial: {
    intro: [
      "Financial documents record and enforce monetary obligations between individuals and entities. A Promissory Note is the most fundamental: a written promise by one person to pay a specific amount to another, under defined terms. Courts treat a properly executed promissory note as strong evidence of a debt, making it far more valuable than a verbal agreement or an informal text message when a borrower defaults. These documents protect lenders by creating an enforceable obligation and protect borrowers by clearly documenting the terms they agreed to.",
      "Loan agreements are similar to promissory notes but typically more comprehensive, including provisions for events of default, collateral, prepayment, and the lender's remedies. Payment Plan Agreements are used when a debt already exists and the parties need to formally restructure repayment -- a creditor agrees to accept installments in exchange for the debtor's commitment to pay. These agreements are common in business debt restructuring, medical debt resolution, and personal loan modifications.",
      "Bills of Sale document the transfer of ownership of personal property -- vehicles, equipment, furniture, livestock, and other tangible assets. Unlike real estate, which requires a deed recorded with government authorities, personal property is often transferred informally. A Bill of Sale provides written documentation of what was sold, the price, the condition at the time of transfer, and the identities of the buyer and seller. This documentation matters when title questions arise later, particularly with vehicles and high-value equipment.",
    ],
    whenYouNeed: [
      {
        situation: "Lending money to a friend, family member, or business associate",
        detail:
          "A Promissory Note creates a formal, enforceable record of the loan, the interest rate (if any), the repayment schedule, and the consequences of non-payment. Lending money without documentation is the most common way to lose both money and a relationship. A written note makes the obligation clear and gives the lender legal standing to collect.",
      },
      {
        situation: "Borrowing from a private lender or individual investor",
        detail:
          "A Loan Agreement or Promissory Note protects the borrower by documenting the exact terms -- interest rate, payment schedule, late fees, prepayment rights -- so there is no dispute later about what was agreed. Borrowers sometimes face inflated claims about what they owe when there is no written record of the original terms.",
      },
      {
        situation: "Setting up a payment plan for an existing debt",
        detail:
          "A Payment Plan Agreement restructures an outstanding obligation into an installment schedule both parties can commit to in writing. These agreements are used when a debtor cannot pay a lump sum and the creditor prefers structured repayment over the cost and uncertainty of collections or litigation.",
      },
      {
        situation: "Selling a vehicle, boat, or other titled personal property",
        detail:
          "A Vehicle Bill of Sale documents the sale price, the vehicle's condition at the time of transfer, and the identities and signatures of the buyer and seller. Most states require a Bill of Sale to transfer a vehicle title, and the document protects the seller from future liability for tickets, accidents, or taxes incurred after the sale date.",
      },
      {
        situation: "Selling equipment, furniture, or other high-value personal property",
        detail:
          "A General Bill of Sale records the transfer of personal property and protects both parties by documenting what was sold 'as-is' or with specific representations about condition, and who is responsible for the item from the moment of sale. Without documentation, buyers may claim the seller made warranties they did not intend.",
      },
    ],
    documentGuide: [
      {
        docName: "Promissory Note vs. Loan Agreement",
        useWhen:
          "A Promissory Note is a simpler, one-document promise to repay. It works well for straightforward personal loans and short-term obligations. A Loan Agreement is more comprehensive and is preferable for larger amounts, secured loans, or situations with complex terms like conversion rights or collateral pledges. Use a promissory note for simple arrangements; use a loan agreement when the transaction requires detailed event-of-default procedures or collateral provisions.",
      },
      {
        docName: "Secured vs. Unsecured Promissory Note",
        useWhen:
          "An unsecured promissory note relies solely on the borrower's promise to repay -- if they default, the lender must sue to collect. A secured promissory note ties the obligation to specific collateral (a vehicle, equipment, or real estate) that the lender can claim if the borrower defaults. Secured notes are appropriate for larger loans or borrowers with uncertain credit. The security interest must typically be perfected through a separate filing to be effective against third parties.",
      },
      {
        docName: "Vehicle Bill of Sale vs. General Bill of Sale",
        useWhen:
          "A Vehicle Bill of Sale includes vehicle-specific information: VIN, odometer reading, license plate number, year, make, and model. Most states require this specific information to transfer a vehicle title. A General Bill of Sale is used for any other personal property transaction and captures a description of the item, the price, and the as-is or warranty status. Always use a Vehicle Bill of Sale for any titled motor vehicle, even if the state does not explicitly require one.",
      },
      {
        docName: "Payment Plan Agreement vs. Debt Settlement Agreement",
        useWhen:
          "A Payment Plan Agreement structures full repayment of a debt over time -- the total amount owed does not change, only the timing. A Debt Settlement Agreement reduces the total amount owed in exchange for a lump-sum payment or accelerated repayment schedule. Use a payment plan when the creditor expects to be paid in full but needs flexibility on timing; use a settlement agreement when the creditor is willing to accept less than the full balance to resolve the obligation.",
      },
    ],
    legalConsiderations: [
      {
        title: "Usury laws cap the interest rate you can legally charge",
        body: "Every state has usury laws that impose a maximum legal interest rate on loans. Charging interest above the legal maximum can result in the lender forfeiting all interest or even facing criminal penalties in extreme cases. Personal loans between individuals are subject to these limits just as much as institutional lending. Before setting an interest rate on a promissory note, verify your state's usury cap, which can range from as low as 6% to as high as 24% per year depending on the state and type of loan.",
      },
      {
        title: "Informal family loans without documentation are treated as gifts",
        body: "When money moves between family members without a written promissory note, the IRS and courts often treat the transfer as a gift rather than a loan, particularly if no interest is charged and no repayment occurs. This has tax implications for the giver (gift tax rules may apply to large transfers) and eliminates the lender's ability to pursue collection if the 'borrower' refuses to repay. Even between family members, a signed promissory note with a repayment schedule is essential for the loan to be treated as a loan.",
      },
      {
        title: "A Bill of Sale does not always transfer clean title",
        body: "A Bill of Sale documents the transfer of ownership but does not guarantee that the seller had clear title to convey. If the vehicle or property had undisclosed liens, the buyer may take ownership subject to those liens -- meaning a creditor could repossess the item even after the sale. For vehicles, always run a lien search through your state's DMV before completing a private sale. For other high-value items, ask for written confirmation that the item is free of security interests.",
      },
      {
        title: "Statute of limitations restricts how long you can enforce a debt",
        body: "Every state has a statute of limitations on written contracts that determines the window within which a lender can sue to collect. For promissory notes, this period typically ranges from three to six years from the date of default, though some states provide longer periods. After the statute of limitations expires, the debt is not erased but becomes unenforceable in court. A payment plan agreement that resets the repayment schedule can restart the limitations period, which is an important consideration when restructuring old debts.",
      },
    ],
    faq: [
      {
        question: "Does a promissory note need to be notarized to be enforceable?",
        answer:
          "In most states, a promissory note does not need to be notarized to be enforceable. A signed, written note with the key loan terms is sufficient. Notarization is advisable for large loans because it authenticates the signatures and makes it harder for the borrower to later claim they did not sign the document. If the note will be used as collateral or recorded, check whether your state imposes additional requirements.",
      },
      {
        question: "What interest rate should I charge on a personal loan?",
        answer:
          "Start by checking your state's usury limit, which caps the maximum legal rate. Within that limit, the IRS sets an Applicable Federal Rate (AFR) that family loans should meet to avoid the IRS treating the loan as a gift. The AFR changes monthly but is generally low. You can charge more than the AFR if both parties agree and it is below the usury cap, but charging at or above the AFR protects the lender from gift tax scrutiny.",
      },
      {
        question: "Can I write a promissory note for a loan that has already been made?",
        answer:
          "Yes. A promissory note can be executed after the loan funds have already been transferred. The note should reflect the original loan date and amount, the current outstanding balance if partial repayments have already been made, and the agreed repayment terms going forward. Courts will generally enforce a note for an existing debt as long as the terms are clear and both parties signed it.",
      },
      {
        question: "Do I need a bill of sale when selling a car to a family member?",
        answer:
          "Yes. Even within a family, a Vehicle Bill of Sale protects the seller from future liability for parking tickets, toll violations, accidents, and registration lapses that occur after the sale date. Many states require a Bill of Sale to transfer the vehicle title regardless of the buyer's relationship to the seller. Without it, the sale may be difficult to document for title transfer purposes.",
      },
      {
        question: "What happens if a borrower defaults on a promissory note?",
        answer:
          "The lender can demand immediate repayment of the full outstanding balance (if the note includes an acceleration clause) and, if not paid, sue the borrower in court. A court judgment allows the lender to garnish wages, levy bank accounts, or place a lien on real property, depending on state law. For secured notes, the lender may also be able to repossess the collateral without a court proceeding, subject to state rules on self-help repossession.",
      },
    ],
    trustStats: [
      {
        stat: "Personal loans between individuals without documentation result in non-repayment in approximately 50% of cases",
        context:
          "The absence of a written agreement removes both the borrower's sense of formal obligation and the lender's ability to pursue collection. A signed promissory note significantly improves repayment rates.",
      },
      {
        stat: "The IRS audits family loans at a substantially higher rate when no promissory note exists and no interest is charged",
        context:
          "The IRS treats unstructured family loans as gifts, which can trigger gift tax reporting obligations. A properly documented loan with a market-rate interest rate avoids this scrutiny entirely.",
      },
      {
        stat: "Undisclosed liens affect approximately 1 in 12 private vehicle sales",
        context:
          "A Vehicle Bill of Sale and a pre-purchase lien check through your state's DMV are the two most effective steps buyers can take to avoid inheriting a vehicle with outstanding debt attached to it.",
      },
    ],
  },

  personal: {
    intro: [
      "Personal legal documents cover situations that do not fit neatly into business, real estate, or estate planning categories but carry significant legal weight nonetheless. An Affidavit is a written statement of facts made under oath and signed before a notary or authorized official. Courts, government agencies, and financial institutions rely on affidavits as evidence because the person signing them declares, under penalty of perjury, that the contents are true. The legal significance of this declaration is substantial -- false statements in an affidavit can constitute perjury.",
      "A General Release of Liability is a contractual agreement in which one party waives their right to make legal claims against another, typically in exchange for compensation, access to an activity, or settlement of a dispute. Releases are used in personal injury settlements, employment separations, event participation waivers, and post-accident resolutions. A properly drafted release can extinguish valid legal claims permanently, which is why both parties need to understand what rights are being waived before signing.",
      "Personal legal documents are particularly important in situations involving life changes, disputes with individuals, and interactions with government agencies. Unlike business documents that are reviewed by lawyers on both sides, personal documents are often signed by individuals who are unfamiliar with their legal implications. Understanding what you are signing -- what claims you are releasing, what facts you are declaring, and what legal obligations you are accepting -- is essential before putting your signature on any personal legal document.",
    ],
    whenYouNeed: [
      {
        situation: "Verifying facts for a court, government agency, or financial institution",
        detail:
          "An Affidavit is used when you need to formally attest to facts under oath without appearing in court. Common uses include proving identity after a name change, verifying that a document is authentic, attesting to residency for government benefits, or providing testimony in a legal proceeding where personal appearance is not possible.",
      },
      {
        situation: "Settling a personal injury claim or property damage dispute",
        detail:
          "A General Release of Liability is typically signed by the injured party in exchange for a settlement payment. By signing, the claimant waives their right to pursue any further claims related to the incident. Releases are permanent -- once signed, the settlement is final even if the claimant later discovers the injury was more serious than initially understood.",
      },
      {
        situation: "Participating in a high-risk activity or event",
        detail:
          "Sports clubs, adventure activities, gyms, and event organizers frequently require participants to sign liability waivers before participation. These documents acknowledge the risks of the activity and release the organizer from liability for injuries. The enforceability of these waivers varies by state and depends on whether they clearly identify the risks being assumed.",
      },
      {
        situation: "Separating from an employer with a severance package",
        detail:
          "Employment separation agreements routinely include a general release in which the departing employee releases the employer from all claims -- including potential discrimination, wage, and harassment claims -- in exchange for severance pay. Federal law requires employees over 40 to be given 21 days to consider the release and 7 days to revoke it after signing, and the release must specifically mention ADEA (age discrimination) rights.",
      },
      {
        situation: "Resolving a personal dispute without litigation",
        detail:
          "When two individuals resolve a dispute -- a neighborhod disagreement, a small-dollar personal claim, a misunderstanding involving property damage -- a written release documents that the matter is settled and neither party will pursue further claims. This prevents the other party from returning later with new demands related to the same incident.",
      },
    ],
    documentGuide: [
      {
        docName: "Affidavit vs. Sworn Declaration",
        useWhen:
          "An Affidavit is signed before a notary public or other authorized official who administers an oath. A Sworn Declaration (also called an Unsworn Declaration Under Penalty of Perjury) does not require a notary but contains language affirming that the statements are true under penalty of perjury. Many federal courts accept sworn declarations in place of notarized affidavits. Use an affidavit when the receiving institution specifically requires one; use a sworn declaration when notarization is unavailable or impractical.",
      },
      {
        docName: "General Release vs. Specific Release",
        useWhen:
          "A General Release waives all claims -- known and unknown -- arising from a specific incident or relationship. A Specific Release waives only the claims identified in the document, leaving other potential claims intact. Defendants in settlement negotiations prefer general releases because they eliminate surprise claims. Plaintiffs often resist 'unknown claims' language because they cannot know what they are giving up. Understand the scope of any release before you sign it.",
      },
      {
        docName: "Liability Waiver vs. Indemnification Agreement",
        useWhen:
          "A Liability Waiver is signed by the person assuming risk -- they agree not to hold the other party responsible if they are injured. An Indemnification Agreement obligates one party to compensate the other for losses or claims arising from the first party's actions. Event participants sign waivers; contractors provide indemnification. These documents serve opposite purposes: one releases a claim, the other creates an obligation to pay.",
      },
    ],
    legalConsiderations: [
      {
        title: "False statements in an affidavit constitute perjury",
        body: "An affidavit is a sworn statement -- signing one falsely is not just a civil wrong, it is a crime. Perjury is a felony in most jurisdictions and can result in imprisonment. This means you must be certain that every statement in an affidavit is true to the best of your personal knowledge before signing. If you are uncertain about a fact, the affidavit should reflect that uncertainty rather than asserting the fact as definitively known.",
      },
      {
        title: "Releases of unknown claims are enforceable in most states",
        body: "A general release that includes 'known and unknown claims' language can waive claims the signer did not know existed at the time of signing. California has a specific statute (Civil Code Section 1542) that limits waivers of unknown claims unless the release explicitly references and waives that statutory protection. Other states vary. Before signing a general release for any significant claim, understand whether you are waiving claims you have not yet discovered.",
      },
      {
        title: "Liability waivers cannot protect against gross negligence or intentional misconduct",
        body: "A well-drafted liability waiver can protect an activity organizer from claims arising from ordinary negligence -- typical accidents that happen despite reasonable care. However, courts in most states refuse to enforce waivers that purport to release liability for gross negligence (a serious departure from reasonable care) or intentional misconduct. A gym waiver might protect against a member slipping on a wet floor; it would not protect the gym if staff deliberately created a hazardous condition.",
      },
      {
        title: "Employment releases require specific procedures for older workers",
        body: "Under the Older Workers Benefit Protection Act, employees over 40 must receive specific disclosures, a minimum 21-day review period, and a 7-day revocation period after signing a release of age discrimination claims. The release must specifically reference the Age Discrimination in Employment Act. An employment release that does not follow these procedures is unenforceable as to age discrimination claims regardless of what the employee signed. Employers must strictly comply with these requirements.",
      },
    ],
    faq: [
      {
        question: "Does an affidavit need to be notarized?",
        answer:
          "Yes. An affidavit requires the signature of a notary public or other official authorized to administer oaths. The notary witnesses the signing, verifies the identity of the signer, and certifies that the oath was administered. A document labeled 'affidavit' that was not notarized is not a valid affidavit, though it might still be treated as a written declaration in some contexts.",
      },
      {
        question: "Can I back out of a liability waiver after I sign it?",
        answer:
          "Generally no. A signed liability waiver is a binding contract and cannot be unilaterally rescinded. However, waivers can be challenged if they were signed under duress, if they are unconscionable (extremely one-sided), if the risk that materialized was not covered by the waiver's language, or if the conduct fell outside the scope of what the waiver covers, such as gross negligence. Successfully challenging a waiver requires showing a specific legal defect, not just that you changed your mind.",
      },
      {
        question: "What makes an affidavit legally valid?",
        answer:
          "A valid affidavit must be made by a person with personal knowledge of the facts stated, signed by that person in the presence of a notary public or authorized official, and sworn or affirmed to be true under penalty of perjury. The document should identify the affiant (the person signing), the basis for their knowledge, and the specific facts being attested to. An affidavit containing only opinion or hearsay may be rejected by a court or government agency.",
      },
      {
        question: "Is a liability waiver enforceable for injuries to a minor?",
        answer:
          "Generally no. Minors lack legal capacity to contract, which means a waiver signed by a minor is voidable by the minor upon reaching adulthood. A parent or guardian signing a waiver on a minor's behalf may be enforceable in some states but not others -- several states have held that parents cannot waive a child's future claims. Activity organizers should not rely on parent-signed waivers as complete protection for injuries to children.",
      },
      {
        question: "What is the difference between a release and a settlement agreement?",
        answer:
          "A Release is the portion of a settlement that waives legal claims. A Settlement Agreement is the broader document that also specifies the settlement amount, payment terms, confidentiality obligations, and other conditions. A settlement typically includes a release as one of its components. Sometimes the parties simply use a short-form Release document when the settlement terms are straightforward and nothing else needs to be documented.",
      },
    ],
    trustStats: [
      {
        stat: "More than 25% of personal injury settlements are later disputed by claimants who claim they did not understand what they were releasing",
        context:
          "Courts rarely overturn properly executed general releases, which is why it is critical to read and understand the full scope of any release before signing -- particularly provisions waiving unknown claims.",
      },
      {
        stat: "Affidavits are required in over 40% of government benefit applications and legal proceedings as a substitute for in-person testimony",
        context:
          "The sworn nature of affidavits gives them evidentiary weight comparable to live testimony in many administrative and legal contexts, making them an important tool for documenting facts formally.",
      },
      {
        stat: "Employment separation agreements that comply with OWBPA requirements are upheld in court approximately 90% of the time",
        context:
          "Procedural compliance -- the 21-day review period, the 7-day revocation window, and the explicit ADEA reference -- is the most important factor in determining whether an employment release will be enforced.",
      },
    ],
  },
}

export function getCategoryBodyContent(id: string): CategoryBodyContent | undefined {
  return CATEGORY_BODY_CONTENT[id]
}
