export interface BlogPost {
  slug: string
  title: string
  description: string
  category: string
  publishedAt: string
  readingTimeMinutes: number
  content: string
  relatedDocSlugs: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "are-non-compete-agreements-enforceable",
    title: "Are Non-Compete Agreements Enforceable?",
    description:
      "Non-compete enforceability varies dramatically by state. Learn which states ban them outright, what courts look for when they do enforce them, and how the FTC weighed in.",
    category: "Employment Law",
    publishedAt: "2025-04-15",
    readingTimeMinutes: 6,
    relatedDocSlugs: ["non-compete-agreement", "employment-contract"],
    content: `Non-compete agreements are among the most litigated employment documents in the country — and for good reason. Whether they'll hold up in court depends almost entirely on where you live and work. Before signing or presenting one, it's worth understanding the legal landscape.

## States That Ban Non-Competes Outright

A growing number of states have declared non-compete agreements against public policy and refuse to enforce them at all. California leads the pack: under California Business and Professions Code § 16600, virtually every non-compete is void regardless of what the contract says. The California Supreme Court has repeatedly reinforced this, even refusing to apply other states' laws when a California employee is at issue.

Minnesota joined California in 2023, enacting a flat ban on non-competes for employment relationships entered into after January 1, 2023. North Dakota and Oklahoma have long-standing bans on similar grounds. In these states, you can sign a non-compete and it is simply unenforceable — courts will not give it legal effect.

## The FTC's 2024 Rule — and What Happened Next

In April 2024, the Federal Trade Commission issued a sweeping rule that would have banned nearly all non-compete agreements nationwide, affecting roughly 30 million workers. The FTC framed it as a competition issue: when workers can't change jobs freely, wages stagnate and innovation slows.

The rule was challenged almost immediately. A federal judge in Texas struck it down in August 2024, holding that the FTC lacked statutory authority to issue such a broad rule. As of this writing, the nationwide ban is not in effect, and the matter remains in litigation. Employers and employees are back to state law.

## What Courts Look For When They Do Enforce Non-Competes

In states that permit non-competes — including Texas, Florida, Illinois, New York, and most others — courts apply a reasonableness test. A non-compete that is overbroad in scope, duration, or geography will often be modified (a doctrine called "blue-penciling") or thrown out entirely.

**Geographic scope** should match where you actually do business. A non-compete covering "the entire United States" for a sales rep who only worked in Ohio will likely be cut down or voided. A 50-mile radius around the employer's offices is far more defensible.

**Duration** should reflect the legitimate need to protect confidential information or customer relationships. Six months to two years is the typical enforceable range. Anything beyond three years raises serious red flags in most courts.

**Scope of work** must be tied to what the employee actually did. A non-compete preventing a former marketing manager from working in any capacity for any competitor is almost certainly overbroad. One that prevents soliciting the specific clients they managed is far more defensible.

**Legitimate business interest** is the threshold requirement. Employers must show they're protecting real assets: trade secrets, confidential customer lists, specialized training they invested in, or other genuine competitive advantages. Pure restrictions on competition for its own sake rarely survive challenge.

## Garden Leave and Other Alternatives

Some employers are moving away from traditional non-competes and toward "garden leave" arrangements, where departing employees are paid their full salary during the restricted period but do not work. Courts view garden leave far more favorably because the employee is being compensated for the restriction — not simply locked out of their profession without pay.

Similarly, well-drafted non-solicitation agreements (preventing poaching of clients or coworkers) are generally more enforceable than broad non-competes and achieve much of the same protective goal.

## What This Means Practically

If you're an employer in a state that permits non-competes, narrow scope is your best protection. Courts are increasingly skeptical of broad agreements, and the trend in state legislatures is toward more employee-friendly rules. If you're an employee being asked to sign one, the state you'll be working in matters more than the state whose law the contract names — courts routinely apply local public policy over a choice-of-law clause when the restriction is against local law.

Either way, a well-drafted, reasonable non-compete agreement that matches what the law in your state actually permits is far more useful than an aggressive form that a court will simply void.`,
  },
  {
    slug: "llc-operating-agreement-what-to-include",
    title: "What Should an LLC Operating Agreement Include?",
    description:
      "An LLC operating agreement is the internal rulebook for your company. Here are the 8 essential sections every agreement should cover — and why skipping any of them creates risk.",
    category: "Business",
    publishedAt: "2025-04-22",
    readingTimeMinutes: 7,
    relatedDocSlugs: ["llc-operating-agreement", "partnership-agreement"],
    content: `An LLC operating agreement is the foundational document that governs how your limited liability company actually runs. Most states don't require one to form an LLC — but every serious LLC should have one. Without it, you're relying on your state's default LLC statutes, which were written for a generic company, not yours.

## 1. Member Information and Capital Contributions

The agreement should identify every member by full legal name and specify exactly what each member contributed to the company: cash, property, services, or some combination. This matters for two reasons. First, it establishes the baseline ownership record. Second, it determines what each member gets back in a dissolution — members are typically entitled to the return of their contributions before profits are distributed.

Be specific about dollar amounts and asset valuations. Vague language like "contributed services of value" creates disputes later.

## 2. Ownership Percentages and Membership Interests

Membership interest represents ownership in the LLC. It may or may not correspond directly to capital contributions. Some founders give sweat equity that exceeds their cash investment; others bring in investors at a different valuation. Whatever the agreement is, it must be written down explicitly.

This section should also address what happens to membership interests: can members sell them? To whom? Under what conditions? (See buy-sell provisions below.)

## 3. Profit and Loss Allocation

How the LLC's profits and losses are divided among members is one of the most negotiated provisions in any operating agreement. The default under most state statutes is that profits and losses follow ownership percentages — if you own 40%, you get 40% of the profits. But members can agree to any allocation they want, subject to IRS "substantial economic effect" rules for tax purposes.

Preferred returns, tiered distributions, and priority distributions are all common in investment-oriented LLCs. The key is that the allocation rules are in writing and understood by all members.

## 4. Voting Rights and Decision-Making

Not all decisions are made the same way. A well-drafted operating agreement distinguishes between decisions that require unanimous consent (admitting new members, amending the agreement, selling the company), decisions that require a supermajority, and day-to-day decisions that managers can make alone.

Failure to define this creates paralysis. If every decision requires a meeting and a vote, the company can't operate efficiently. If one managing member can do anything unilaterally, minority members are unprotected.

## 5. Management Structure: Member-Managed vs. Manager-Managed

LLCs can be structured two ways: member-managed (all owners participate in running the business) or manager-managed (designated managers — who may or may not be members — run day-to-day operations). This choice must match how you actually intend to operate and should be reflected consistently in the agreement, the articles of organization, and how you present the company to banks and counterparties.

## 6. Buy-Sell Provisions

What happens when a member wants to leave? Dies? Gets divorced? Goes bankrupt? Without buy-sell provisions, these events can force the company to deal with unwanted co-owners — a deceased member's estate, an ex-spouse, or a creditor who received a charging order against the membership interest.

A right of first refusal (ROFR) gives remaining members the right to purchase a departing member's interest before it can be transferred to an outsider. A buyout formula (book value, EBITDA multiple, or independent appraisal) removes the need to negotiate a price under distress. These provisions are far easier to agree on now than when someone is actually trying to leave.

## 7. Meetings and Record-Keeping

Even if your LLC doesn't hold formal annual meetings like a corporation, the operating agreement should specify how members communicate about company affairs, what records are kept, and how members access those records. This protects the liability shield: courts that pierce the corporate veil often cite a failure to maintain basic corporate formalities.

## 8. Dissolution and Winding Up

How does the LLC end? The agreement should specify what events trigger dissolution (unanimous vote, death of the sole member, expiration of a defined term), how assets are distributed on winding up, and who is responsible for filing dissolution documents with the state.

State default rules typically require paying creditors first, then returning capital contributions, then distributing remaining profits. If your members want something different, spell it out.

## Why the Default Rules Aren't Enough

Most state LLC statutes were written to be a backstop — a set of rules that apply when there's no agreement. They're not designed to reflect the nuanced arrangements that members actually negotiate. A generic operating agreement is better than nothing. A properly drafted one tailored to your actual ownership structure, management style, and exit plans is far better still.`,
  },
  {
    slug: "tenant-rights-rent-control-cities",
    title: "Tenant Rights in Rent-Controlled Cities",
    description:
      "Rent control varies significantly city by city. Here's what tenants and landlords need to know about the rules in New York, Los Angeles, San Francisco, and Chicago.",
    category: "Real Estate",
    publishedAt: "2025-04-28",
    readingTimeMinutes: 8,
    relatedDocSlugs: ["residential-lease-agreement"],
    content: `Rent control is one of the most misunderstood areas of landlord-tenant law — and one of the most consequential. If you're a tenant in a controlled unit, your rights go far beyond what a standard lease says. If you're a landlord, failing to understand the local ordinance can result in substantial fines, mandatory rent reductions, and even criminal liability in some jurisdictions.

## New York City: Rent Stabilization and Rent Control

New York has two overlapping systems. Rent control — the older, stricter system — applies to a small number of units in buildings built before 1947 where the tenant has lived continuously since before 1974. These units have Maximum Base Rents calculated by the city, and rent increases are tightly capped.

Rent stabilization covers a much larger share of the market: roughly one million apartments, generally in buildings with six or more units built before 1974, or newer buildings that received certain tax benefits. The Rent Guidelines Board sets allowable percentage increases each year; recent years have seen increases in the 3–5% range.

The Housing Stability and Tenant Protection Act of 2019 significantly strengthened tenant protections. Key provisions: preferential rents (below-market deals landlords gave certain tenants) are now largely permanent — landlords cannot reset them to the "legal" rent on renewal. High-rent vacancy decontrol was eliminated. Owners must give 30 to 90 days' notice of non-renewal depending on tenancy length. And tenants now have the right to a rent history going back six years, which has helped uncover widespread overcharges.

## Los Angeles: Rent Stabilization Ordinance (RSO)

The Los Angeles RSO applies to most residential units built before October 1, 1978. Covered units cannot be raised more than 3–8% per year (tied to the local CPI), and landlords cannot increase rent more than once in any 12-month period. Tenants also have just-cause eviction protections: landlords must have a qualifying reason (non-payment, lease violation, owner move-in, or certain redevelopment situations) to remove a tenant.

In 2023, Los Angeles expanded protections further. Following a temporary moratorium during COVID, the city adopted a permanent just-cause eviction ordinance covering most rentals — including many not covered by the RSO — for tenants who have lived in the unit for at least 12 months.

Relocation assistance rules apply when landlords evict for no-fault reasons (like owner move-in). The amount varies but can equal one to three months' rent.

## San Francisco: Rent Ordinance

San Francisco's Rent Ordinance covers most buildings with two or more units built before June 13, 1979. Allowable rent increases are tied to 60% of the local CPI (recently around 2–3% annually). San Francisco also has extremely strong just-cause eviction protections — one of the strongest in the country.

The Ellis Act, a state law, allows landlords to exit the rental business entirely by removing all units in a building from the rental market. But San Francisco imposes significant restrictions on Ellis Act evictions: substantial relocation payments (often $20,000+ per tenant), a two-year waiting period before re-renting, and first-right-of-return requirements if the units come back to market.

## Chicago: Residential Landlord and Tenant Ordinance (RLTO)

Chicago does not have rent control — Illinois state law actually prohibits it. But the RLTO provides robust tenant protections that go well beyond state baseline rules. Landlords must disclose the RLTO summary to tenants, provide written notice of any rent increase at least 30 days in advance (60 days for 6+ month tenancies), and maintain properties to a detailed habitability standard.

Security deposit rules are particularly strict: deposits must be held in a federally insured interest-bearing account, and tenants must receive written notification of where the deposit is held within 14 days. Failure to comply with security deposit rules entitles the tenant to the full return of the deposit plus 2x the deposit as a penalty.

Chicago also has a robust retaliation protection: landlords cannot increase rent, decrease services, or initiate eviction proceedings in retaliation for a tenant complaining about conditions.

## What Landlords Cannot Do in Controlled Cities

Across all these cities, certain landlord behaviors are universally prohibited: retaliatory rent increases, harassment to force tenants out of controlled units (sometimes called "buyout harassment"), illegal lockouts, and unilateral removal of services. Many cities also restrict what landlords can do with rent increases between tenancies — the practice of banking unused increases or applying prior increases to new tenants.

If you're a landlord managing property in any of these cities, the local ordinance is as important as the state landlord-tenant code. A standard lease agreement should be supplemented with the required local disclosures and should reflect the locally allowable terms.`,
  },
  {
    slug: "power-of-attorney-types-explained",
    title: "The 4 Types of Power of Attorney Explained",
    description:
      "Not all powers of attorney are the same. This guide explains general, durable, springing, and limited powers of attorney — and when you need each one.",
    category: "Estate Planning",
    publishedAt: "2025-05-01",
    readingTimeMinutes: 6,
    relatedDocSlugs: ["power-of-attorney", "durable-power-of-attorney", "medical-power-of-attorney"],
    content: `A power of attorney (POA) is a legal document that authorizes someone else — called your agent or attorney-in-fact — to act on your behalf in legal, financial, or medical matters. What powers you grant, and when those powers take effect, depends on which type you use. Getting this wrong can leave a family scrambling during a crisis or give an agent broader authority than you intended.

## 1. General Power of Attorney

A general POA grants broad authority over financial and legal matters: banking, investing, real estate transactions, signing contracts, managing business interests, and filing taxes. It's a powerful document with wide reach.

The critical limitation: a general POA automatically terminates if you become incapacitated. This makes it unsuitable for long-term planning or situations where incapacity is a real possibility. It's better suited to specific, time-limited situations — such as authorizing a family member to close on a real estate sale while you're abroad — where you are fully competent and simply unavailable.

## 2. Durable Power of Attorney

A durable POA contains specific language that makes it survive incapacity: typically phrased as "this power of attorney shall not be affected by my subsequent disability or incapacity." This single difference makes it the right tool for most estate planning purposes.

With a durable POA in place, your agent can continue managing your finances if you suffer a stroke, develop dementia, or are otherwise unable to manage your own affairs — without going to court for a guardianship or conservatorship proceeding. The court process is expensive, time-consuming, public, and removes control from the family. A durable POA avoids all of that.

Most financial institutions, banks, and real estate title companies will accept a durable POA for transactions. Some require their own forms, so it's worth contacting your bank in advance to confirm what they'll honor.

## 3. Springing Power of Attorney

A springing POA doesn't take effect immediately — it "springs" into effect only when a specified triggering event occurs, typically incapacity as certified by one or two physicians. The idea is to preserve your autonomy: the agent can only act when you truly cannot.

In practice, springing POAs can create real-world friction. Banks and title companies may refuse to accept the document without current medical certification of incapacity, which takes time to obtain. If the situation is urgent — a bill needs to be paid, a contract signed — the delay can cause real harm.

Many estate planning attorneys now recommend against springing POAs for this reason, preferring an immediately effective durable POA with a trusted agent. Others use them for peace of mind when there are concerns about the agent acting prematurely. The right choice depends on your family situation and your level of trust in your chosen agent.

## 4. Limited (Special) Power of Attorney

A limited or special POA grants authority over one specific transaction or a defined category of tasks. Examples: authorizing a real estate agent to sign closing documents on a specific property sale, allowing a business partner to sign one specific contract, or permitting a family member to manage a single bank account.

Limited POAs are useful precisely because they're narrow. They expire when the specific task is complete or on a set date, and they cannot be used for anything outside their defined scope. If you need someone to handle a specific matter on your behalf without giving them broad ongoing authority, a limited POA is the right tool.

## What Happens Without a POA

If you become incapacitated without a power of attorney in place, your family has no automatic legal authority to manage your finances. Your spouse may not be able to access accounts held solely in your name. Paying your bills, managing your investments, and handling your real estate may require a court-ordered conservatorship — a process that can take months, cost thousands of dollars, and requires ongoing court supervision.

Even young, healthy adults benefit from having a durable POA and healthcare proxy in place. Accidents happen. Planning ahead is far less painful than dealing with the alternatives.

## The Agent's Obligations

Whichever type you use, your agent has a legal obligation to act in your best interest — called a fiduciary duty. They cannot use your assets for their personal benefit, must keep your money separate from their own, and must maintain records of everything they do on your behalf. Most state POA statutes now include explicit provisions about agent liability and grounds for removal.

Choose your agent carefully. The document gives them significant power, and while legal remedies exist for abuse, preventing abuse is easier than recovering from it.`,
  },
  {
    slug: "independent-contractor-vs-employee",
    title: "Independent Contractor vs Employee: How the IRS and States Classify Workers",
    description:
      "The difference between contractor and employee status has major legal and tax consequences. Here's how the IRS and key states like California, New Jersey, and Massachusetts make the determination.",
    category: "Employment Law",
    publishedAt: "2025-05-06",
    readingTimeMinutes: 7,
    relatedDocSlugs: ["independent-contractor-agreement", "employment-contract"],
    content: `Worker classification is one of the most consequential decisions a business makes — and one of the most commonly gotten wrong. Classifying an employee as an independent contractor to avoid payroll taxes, benefits obligations, and employment law protections is both widespread and heavily policed. The consequences of misclassification can be severe: back taxes, penalties, class action exposure, and personal liability for business owners.

## Why It Matters

Employees trigger a long list of employer obligations: payroll tax withholding (Social Security, Medicare, federal income tax), unemployment insurance contributions, workers' compensation coverage, minimum wage and overtime obligations under the Fair Labor Standards Act, anti-discrimination law protections, and often benefits under ERISA and the ACA.

Independent contractors, by contrast, are responsible for their own taxes (self-employment tax), their own insurance, and their own benefits. The business pays the agreed rate and issues a 1099 at year-end. No withholding, no payroll tax match, no benefits.

The savings for businesses can be substantial — which is why the incentive to misclassify is real, and why enforcement agencies look for it.

## The IRS Approach: Behavioral, Financial, and Type-of-Relationship Factors

The IRS uses a three-part analysis. The core question is always whether the business controls or has the right to control how the worker does their work, not just the result.

**Behavioral control** factors include: Does the business tell the worker when and where to work? Does it control the tools, equipment, or order of work? Does it provide training? The more the business dictates the *how*, the more the relationship looks like employment.

**Financial control** factors include: Is the worker paid by the hour (employee) or by the project (contractor)? Does the worker have a significant investment in their own tools or facilities? Can the worker profit or lose money based on their own business judgment? Contractors generally have more financial independence.

**Type-of-relationship** factors include: Is there a written contract? Are there employee-type benefits (insurance, pension, vacation pay)? Is the relationship permanent or for a defined project? Is the work central to the business's regular operations? A programmer hired long-term by a software company to do its core development looks a lot more like an employee than a freelance designer brought in for one marketing campaign.

## California's ABC Test: The Strictest Standard

California uses the ABC test under Assembly Bill 5 (AB5), which creates a presumption that workers are employees. To classify someone as an independent contractor, a business must prove all three:

**(A)** The worker is free from the control and direction of the business in performing the work, both by contract and in fact.

**(B)** The worker performs work that is outside the usual course of the hiring entity's business. This is the hardest prong: a ride-sharing company cannot classify its drivers as contractors if driving is the company's core business.

**(C)** The worker is customarily engaged in an independently established trade, occupation, or business of the same nature as the work performed.

California's test is deliberately harder to satisfy than the IRS standard. Uber, Lyft, and DoorDash spent over $200 million on Proposition 22 specifically to carve out gig economy drivers from AB5's requirements.

New Jersey and Massachusetts use similar ABC tests. Massachusetts' version, applied to the wage and hour context, has been particularly aggressively enforced.

## Consequences of Misclassification

Federal consequences include: back payroll taxes (including the employer's share of FICA), interest and penalties, and potentially fraud penalties if the IRS finds willful misclassification. The IRS's Voluntary Classification Settlement Program allows businesses to come forward proactively, paying a reduced tax rate on prior compensation.

State consequences include: back unemployment insurance contributions, workers' compensation premium assessments, and — in states with wage and hour enforcement — back pay for missed overtime and minimum wage violations. California's Private Attorneys General Act (PAGA) allows workers to sue on behalf of all similarly situated employees, creating class-wide exposure.

## Practical Guidance

Using an independent contractor agreement is an important starting point — but it's not enough on its own. Courts and agencies look past the label to the reality of the relationship. The safest contractor relationships are ones where: the contractor sets their own hours and methods, works for multiple clients simultaneously, has their own business entity (LLC or sole proprietorship), provides their own tools, and is hired for a discrete project outside your core business operations.

If the reality is that you need someone working set hours, following your direction, doing your core work, and relying primarily on you for income — you almost certainly need to classify them as an employee.`,
  },
  {
    slug: "how-to-write-a-demand-letter",
    title: "How to Write a Demand Letter That Gets Results",
    description:
      "A well-written demand letter resolves disputes without litigation. Learn the structure, tone, and key elements that make demand letters effective — and what to do if the other party ignores it.",
    category: "Business",
    publishedAt: "2025-05-09",
    readingTimeMinutes: 6,
    relatedDocSlugs: ["demand-letter", "notice-of-breach"],
    content: `A demand letter is often the most effective legal tool you'll never have to take to court. It puts the other party on formal notice of your claim, creates a paper trail, and gives them the opportunity to resolve the matter before litigation. Many disputes — unpaid invoices, security deposit disputes, minor contract breaches — settle immediately after a well-written demand letter arrives.

## The Purpose of a Demand Letter

Before writing a word, understand what you're trying to accomplish. You want the recipient to take a specific action: pay a specific amount by a specific date, stop doing something, or fulfill a specific contractual obligation. Everything in the letter should point toward that result.

A demand letter is not a place to vent frustration, relitigate every grievance, or make threats you can't follow through on. It's a professional, factual document. Tone matters: attorneys know how to write demand letters that feel authoritative without sounding unhinged, and courts can read letters later if the dispute escalates.

## Structure of an Effective Demand Letter

**Opening paragraph:** State who you are, who the recipient is, and that this is a formal demand letter. Get to the point immediately. "I am writing to formally demand payment of $3,200 that you owe under our contract dated January 15, 2025."

**Statement of facts:** Provide a clear, chronological account of the relevant facts. Reference dates, amounts, contract provisions, and communications. Keep it factual — avoid characterizing the other party's behavior as "fraudulent" or "criminal" unless you're prepared to back it up legally.

**Legal basis for your demand:** You don't need a law degree, but you should identify the basis for your claim. For unpaid invoices: the contract terms or quantum meruit (fair payment for services rendered). For security deposit disputes: your state's landlord-tenant code, which typically specifies the return deadline and the penalty for non-compliance.

**The specific demand:** Be precise. State exactly what you want: a dollar amount, return of specific property, cessation of specific conduct. Ambiguous demands get ignored or lead to counteroffers that are off-base.

**The deadline:** Give a specific, reasonable date — typically 14 to 30 days. "Respond by June 15, 2025" is far more compelling than "in a timely fashion." The deadline signals you're serious and creates urgency.

**Consequences of non-compliance:** State what you will do if the demand is not met. Common consequences include: filing in small claims court, initiating civil litigation, reporting to a licensing board, or pursuing any statutory remedies available under state law (for example, double or treble damages for security deposit violations in many states). Only threaten what you're actually prepared to do.

## How to Send It

Send your demand letter in a way that creates a paper trail: certified mail with return receipt requested, plus a regular first-class copy. This proves delivery and starts the clock on your deadline. Email can be used in addition, but physical mail with certified delivery is the gold standard for demand letters that may later be submitted to a court.

Keep copies of everything: the letter, the certified mail receipt, and the return receipt card.

## If the Letter Is Ignored

If the deadline passes with no response or an unsatisfactory response, you have several options depending on the amount at stake:

**Small claims court** is ideal for disputes under $5,000–$15,000 (the limit varies by state). No attorney is required. The filing fee is typically $50–$150. The demand letter you sent establishes that you attempted to resolve the matter before litigating, which courts view favorably.

**Civil court** is appropriate for larger claims. At this stage, most people retain an attorney, though you can proceed pro se. Your demand letter will be exhibit A.

**Alternative dispute resolution** — mediation or arbitration — may be required under a contract clause or may be preferable as a faster, cheaper alternative to litigation.

## Common Mistakes to Avoid

Don't make threats you won't follow through on — they undermine your credibility. Don't demand more than you're actually owed — inflated demands look like bad faith. Don't use threatening or abusive language — it shifts the narrative away from your legitimate claim. And don't wait too long: every state has a statute of limitations on contract and personal injury claims, and demand letters sent close to the deadline give the recipient less incentive to settle quickly.

A demand letter costs almost nothing to send and frequently gets results. It's almost always worth trying before filing a lawsuit.`,
  },
  {
    slug: "last-will-vs-living-trust",
    title: "Last Will vs Living Trust: Which Do You Need?",
    description:
      "Wills and trusts both transfer assets at death, but they work very differently. This guide explains probate, privacy, cost, and the scenarios where each makes sense.",
    category: "Estate Planning",
    publishedAt: "2025-05-12",
    readingTimeMinutes: 8,
    relatedDocSlugs: ["last-will-and-testament"],
    content: `The most common question in estate planning is also one of the most contested: should you have a will, a living trust, or both? The answer depends on the size and complexity of your estate, the states where you own property, your privacy preferences, and how much you want to simplify things for your heirs.

## How a Last Will and Testament Works

A will is a written document that specifies how you want your assets distributed after you die. It names your beneficiaries, designates an executor (the person responsible for carrying out your wishes), and — critically — names a guardian for minor children if you have them.

The catch: a will goes through probate. Probate is the court-supervised process of validating the will, inventorying assets, paying debts and taxes, and distributing what's left. Probate is public (anyone can look up the filings), takes time (typically six months to two years), and costs money (court fees and often attorney fees, which in some states can be a percentage of the estate).

For simple estates — a house, bank accounts, some personal property, all in one state — probate is manageable. For more complex estates or families who value privacy, it's a significant burden.

## How a Living Trust Works

A revocable living trust is a legal entity you create during your lifetime. You transfer assets into the trust, typically naming yourself as the initial trustee (retaining full control while alive) and naming a successor trustee to take over if you become incapacitated or die. You also name beneficiaries who receive the trust assets at your death.

The key advantage: assets in a trust do not go through probate. At your death, the successor trustee distributes the assets according to the trust terms — no court involvement, no public filing, no 12-month wait. This is why trusts are the preferred vehicle for larger estates, estates with real estate in multiple states, and families who want to keep their affairs private.

A revocable living trust also acts as a disability plan. If you become incapacitated, your successor trustee can immediately step in to manage trust assets — without going to court for conservatorship. A durable power of attorney covers non-trust assets, but a trust is cleaner for assets held in it.

## What a Trust Doesn't Do

A trust only controls assets that are actually in it — what estate planners call a "funded" trust. If you create a trust and never transfer your house, bank accounts, or investments into it, those assets still go through probate. Funding a trust is the step most DIY estate planners forget.

A trust also doesn't name guardians for minor children — only a will can do that. For this reason, most people with children use both: a trust to handle the assets, and a "pour-over will" that catches anything not in the trust and names guardians.

## The Probate Question by State

Probate costs and complexity vary enormously by state. California's probate system is notoriously expensive: attorney fees are set by statute at a percentage of the gross estate value (1–4%, declining as the estate grows), and the process routinely takes 12–18 months. Florida has simplified probate for smaller estates but can be lengthy for larger ones. Texas probate is relatively simple and fast — many Texas families find a will with a muniment of title perfectly adequate.

If you own real estate in multiple states, you face "ancillary probate" in each state where property is located. A trust avoids this entirely; the trust owns the property, not you personally.

## Cost Comparison

A basic will typically costs $300–$800 if drafted by an attorney, or far less with an online tool. A revocable living trust package (trust, pour-over will, powers of attorney, healthcare directives) typically costs $1,500–$3,000 with an attorney.

The upfront cost of a trust pays off if it avoids probate costs that would otherwise eat into the estate. At rough California probate rates, an estate with a $600,000 house could easily spend $15,000–$18,000 in attorney fees — far more than a trust would have cost.

## Which Do You Need?

A will alone is likely sufficient if you're young, have a simple estate, own property in one state, and live in a state with a streamlined probate process.

A living trust is worth the additional cost if your estate is larger or complex, you own real estate in multiple states, privacy is important to you, you want to plan for incapacity as well as death, or you live in a state where probate is expensive and slow.

In either case, there is no substitute for having something in writing. Dying intestate (without a will) means state default rules determine who gets your assets — which may bear no resemblance to what you would have chosen.`,
  },
  {
    slug: "commercial-lease-negotiation-tips",
    title: "10 Things to Negotiate Before Signing a Commercial Lease",
    description:
      "Commercial leases are heavily negotiated documents — but tenants often don't know what's on the table. Here are the 10 provisions every business should push on before signing.",
    category: "Real Estate",
    publishedAt: "2025-05-15",
    readingTimeMinutes: 7,
    relatedDocSlugs: ["commercial-lease-agreement"],
    content: `Commercial leases are not like residential leases. They're longer (typically 3–10 years), the stakes are higher, and virtually every term is negotiable. Landlords present standard form leases as if they're fixed, but experienced commercial tenants know that most provisions can be modified — and the ones that can't often depend on market conditions and how much the landlord wants you as a tenant.

Here are the 10 provisions worth the most attention before you sign.

## 1. Personal Guarantee Scope

Most commercial leases require a personal guarantee, meaning if the business can't pay rent, the landlord can come after your personal assets. This is often non-negotiable for newer businesses, but the scope is negotiable. Push for a "good guy" guarantee: if you vacate and surrender the space in good condition with proper notice, your personal liability ends on the day you leave — rather than running through the end of the lease term. Also negotiate to limit the guarantee to a specific dollar amount or time period.

## 2. Common Area Maintenance (CAM) Caps

In NNN and gross leases, you'll often be required to pay a pro-rata share of building operating expenses — insurance, taxes, maintenance, management fees. These can vary wildly and are not predictable. Negotiate an annual cap on CAM increases (typically 3–5% per year, compounded) and a hard cap on what can be included. Management fees above 5–6% of base rent, capital improvements, and owner's equity costs should typically be excluded from CAM pass-throughs.

## 3. Tenant Improvement Allowance (TI)

The landlord's contribution to buildout costs is often the most significant financial negotiation in the deal. TI allowances are typically expressed as a dollar amount per rentable square foot. In a soft market, you can often negotiate substantial allowances — $50–$100/SF is common in office markets — to cover walls, flooring, electrical, and HVAC modifications. Get the TI in writing as part of the lease; don't rely on verbal assurances.

## 4. Rent Abatement

Free rent at the beginning of the lease is common, especially in markets with significant vacancy. Push for two to six months of free rent during your buildout period at minimum. From a landlord's perspective, abated rent is better than a lower base rent because their valuation is tied to the headline rent number.

## 5. Renewal Options and Rent Reset

A renewal option gives you the right to extend the lease at the end of the initial term. Negotiate for at least one option, with the renewal rent either fixed, capped at a percentage increase, or tied to CPI. Avoid "fair market rent" renewal provisions without a floor-and-ceiling mechanism — "fair market" is subjective and gives you no certainty.

## 6. Subletting and Assignment Rights

Life changes. You may need to sell the business, downsize, or bring in a partner. A lease that prohibits subletting or assignment without landlord consent (or with consent that the landlord can withhold arbitrarily) traps you. Negotiate for landlord consent not to be "unreasonably withheld, conditioned, or delayed" — a standard phrase in commercial real estate that gives you practical flexibility.

## 7. Co-Tenancy and Anchor Tenant Protection

If you're in a retail center and an anchor tenant (the big store that drives traffic) leaves, your business suffers. Co-tenancy clauses give you the right to reduce rent or terminate the lease if anchor occupancy falls below a threshold. These are common in retail leases and absolutely worth fighting for if you depend on foot traffic.

## 8. Exclusivity Clause

For retail and service businesses, an exclusivity provision prevents the landlord from leasing space in the same center or building to a direct competitor. Define "competitor" carefully — you want narrow enough language that it's enforceable, but broad enough to cover the competition you actually care about. Exclusivity is hard to get but sometimes available in markets where the landlord wants your brand.

## 9. Force Majeure and Termination Rights

Post-pandemic, tenants should insist on a meaningful force majeure clause that addresses government-ordered closures — not just natural disasters. Also negotiate for a termination right if the space becomes unusable for an extended period due to casualty, condemnation, or prolonged landlord-caused conditions.

## 10. HVAC and Systems Responsibility

The lease should clearly specify who maintains the HVAC system and who pays for replacement. Tenants often assume maintenance means small repairs, then discover they're responsible for a $15,000 compressor replacement. If you're responsible for HVAC, negotiate for the landlord to warrant the system is in good working order at lease commencement and cap your replacement obligation for equipment over a certain age.

## Final Word

Get everything in writing and in the lease document itself — not in a side letter, not in an email, not in a verbal conversation. If it's not in the lease, it's not enforceable. Before signing any commercial lease, having a real estate attorney review it is worth every dollar — the protections you get (or miss) will affect your business for years.`,
  },
  {
    slug: "promissory-note-vs-loan-agreement",
    title: "Promissory Note vs Loan Agreement: What's the Difference?",
    description:
      "Both documents evidence a debt, but they serve different purposes. Learn when to use a promissory note versus a full loan agreement, and what happens if you use the wrong one.",
    category: "Business",
    publishedAt: "2025-05-18",
    readingTimeMinutes: 5,
    relatedDocSlugs: ["promissory-note", "loan-agreement"],
    content: `Both a promissory note and a loan agreement are written evidence that one party owes money to another. Both are legally binding. But they're different documents designed for different situations, and using one when you need the other can create real problems.

## What Is a Promissory Note?

A promissory note is a written promise by one party (the maker or borrower) to pay a specific sum of money to another party (the payee or lender) on specified terms. It's a simple, unilateral document: the borrower signs it promising to pay, and the lender doesn't necessarily sign at all.

Promissory notes are governed in most states by Article 3 of the Uniform Commercial Code (UCC), which treats them as negotiable instruments. This means a promissory note can be transferred to a third party (endorsed, like a check), and that third party can enforce it even if they weren't the original lender. This is why promissory notes are common in mortgage transactions — your mortgage note may be sold to a different servicer and they can still collect on it.

A basic promissory note specifies: the principal amount, the interest rate (if any), the repayment schedule, what happens on default, and whether the note is secured by collateral. It's a streamlined document — typically one to three pages.

## What Is a Loan Agreement?

A loan agreement is a bilateral contract signed by both the lender and the borrower. It's more comprehensive than a promissory note and typically covers the full relationship between the parties: conditions for disbursement, representations and warranties the borrower makes, covenants (things the borrower must or must not do during the loan), events of default (which may include non-payment but also other breaches), remedies available to the lender, and the lender's right to accelerate the entire balance.

Loan agreements are standard in commercial lending: bank loans, SBA loans, real estate financing, and private credit facilities. They're also appropriate for larger private loans between individuals or entities where the lender wants more control and more protections.

Unlike a promissory note, a loan agreement is generally not a negotiable instrument under the UCC — it's a contract, governed by contract law, and typically not transferable without both parties' consent (unless the agreement says otherwise).

## When to Use a Promissory Note

Use a promissory note when:
- The loan structure is simple (fixed amount, fixed repayment schedule)
- You want a streamlined document
- The note may be transferred to a third party
- The loan is between individuals (family, friends, business partners) and the relationship is informal
- The amount is relatively small and the terms straightforward

A promissory note is also commonly paired with a security agreement when the loan is collateralized — the note is the payment promise, and the security agreement creates the lien on collateral. Together they cover what a secured loan agreement would cover in a single document.

## When to Use a Loan Agreement

Use a loan agreement when:
- The loan is large or complex
- The lender wants covenants restricting the borrower's behavior (no additional debt, maintain certain financial ratios, require prior approval for major expenditures)
- There are conditions to disbursement (the funds are released in tranches or upon hitting milestones)
- The lender needs representations and warranties (the borrower certifies their financial condition, ownership, legal standing)
- You're dealing with an institutional lender who has their own form
- The relationship between the parties is commercial and at arm's length

## Secured vs. Unsecured

Both promissory notes and loan agreements can be unsecured (backed only by the borrower's promise) or secured (backed by specific collateral). For secured arrangements, additional documentation is needed: a security agreement describing the collateral, plus a UCC-1 financing statement filed with the state to perfect the lender's security interest and give notice to other creditors.

For real estate, the equivalent of the UCC financing statement is a deed of trust or mortgage recorded in the county where the property is located.

## The Consequences of Using the Wrong Document

The main risk of using a simple promissory note when you needed a loan agreement: you lose the benefit of covenants and early warning systems. You won't know the borrower has taken on additional debt that jeopardizes repayment until they actually default on your payment.

The main risk of overcomplicating a simple personal loan with a full loan agreement: you impose unnecessary costs, create negotiating friction, and may create tax or legal complications where a simple note would have sufficed.

Match the document to the complexity of the transaction, and make sure whichever you use is signed, dated, and kept somewhere both parties can find it.`,
  },
  {
    slug: "employment-contract-must-have-clauses",
    title: "7 Must-Have Clauses in Every Employment Contract",
    description:
      "A vague employment contract creates disputes. These 7 clauses protect both employer and employee by clearly defining the terms of the working relationship before day one.",
    category: "Employment Law",
    publishedAt: "2025-05-21",
    readingTimeMinutes: 6,
    relatedDocSlugs: ["employment-contract", "at-will-employment-contract"],
    content: `Employment contracts are often one of the most neglected documents in a business's legal toolkit. Small businesses in particular tend to rely on offer letters and handshakes, while larger companies use overly complex forms that nobody reads. Both approaches leave gaps. A well-drafted employment contract protects the employer's legitimate interests while giving the employee clarity and security — reducing disputes before they start.

## 1. At-Will Statement (or Its Absence)

In most U.S. states, employment is "at-will" by default — either party can end the relationship at any time for any lawful reason. If you want the employment to be at-will, say so explicitly. Courts and employees often infer wrongful termination claims from contract language suggesting permanence or just-cause requirements.

If you do want to provide a term of employment or a just-cause termination requirement (common for executives or in heavily unionized industries), that also needs to be stated with precision — including what constitutes "cause" and what process is required before termination.

## 2. Compensation and Benefits

State the base salary or hourly wage explicitly, along with the pay frequency. For employees who receive commissions, bonuses, or profit-sharing, describe the calculation methodology in the contract or attach a written plan. Ambiguous bonus language is one of the most litigated employment issues — if the employer has discretion, say so. If the bonus is earned upon achieving specific targets, describe the targets.

Benefits — health insurance, retirement, PTO, vacation accrual, sick leave — should be described or cross-referenced to a written plan. Don't just say "standard benefits package" without specifying what that means.

## 3. Job Duties and Reporting Structure

Define the position: title, primary responsibilities, and who the employee reports to. This doesn't need to be an exhaustive job description, but it should be specific enough that both parties understand the scope of the role. This matters when disputes arise over whether the employer can unilaterally change duties — courts look at what the contract describes when assessing whether a "constructive discharge" occurred.

## 4. Intellectual Property Assignment

Any work created by an employee within the scope of their employment is typically "work for hire" under federal copyright law — the employer owns it. But "within the scope of employment" has limits, and in many industries the lines are blurry.

An IP assignment clause eliminates ambiguity: the employee agrees that inventions, software, designs, works of authorship, and other intellectual property created in connection with their employment belong to the employer. Most IP assignment clauses also require the employee to promptly disclose and assign any potentially relevant inventions.

Important caveat: California Labor Code sections 2870–2872 limit IP assignment clauses — employees cannot be required to assign inventions they develop entirely on their own time with no company resources and unrelated to the company's business. A compliant California IP clause must include this carve-out.

## 5. Confidentiality Obligations

The employment contract should include a confidentiality provision protecting the employer's trade secrets, proprietary information, and confidential business data. This obligation typically survives the end of employment.

Define "confidential information" broadly enough to be meaningful but precisely enough to be enforceable. Avoid overly broad language like "all information the employee encounters" — that can be void for vagueness. Courts are comfortable enforcing provisions that identify the categories of protected information: customer lists, pricing, product roadmaps, financial data, technical processes.

Note that confidentiality clauses cannot prohibit employees from discussing wages and working conditions with coworkers — that's protected by the National Labor Relations Act.

## 6. Dispute Resolution

How will disputes be resolved? The two most common provisions are arbitration clauses and forum selection clauses.

Arbitration clauses require disputes to be resolved through private arbitration rather than court. They can include class action waivers, which prevent employees from joining class or collective actions. Note that these provisions face increasing legal scrutiny: the NLRB has challenged mandatory individual arbitration of NLRA claims, and some states have enacted restrictions on arbitration of employment discrimination and sexual harassment claims (the Ending Forced Arbitration of Sexual Assault and Sexual Harassment Act, enacted federally in 2022, prohibits mandatory arbitration of these claims).

A forum selection clause specifying the state and county where disputes must be litigated is simpler and less controversial, and is useful for employers with remote employees in multiple states.

## 7. Termination Provisions and Severance

Clearly define what happens when employment ends: what notice is required (by either party), what payments are due (final paycheck timing is actually governed by state law, often strictly), what happens to unvested equity or accrued PTO, and whether the employer has the right to place the departing employee on garden leave.

If severance is offered in certain situations, define the conditions precisely — otherwise employees may argue they're entitled to it in scenarios you didn't intend. If severance is conditioned on a release of claims, note that the release must be a separate agreement signed at the time of departure (not pre-signed at hire) to be effective under the ADEA and most other employment statutes.`,
  },
]
