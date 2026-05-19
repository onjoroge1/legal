import { IntentBodyContent } from './intent-body-content-types'

export const GROUP_A12: Record<string, IntentBodyContent> = {
  promissory_note_family_loan: {
    overview: [
      'A family loan promissory note is a formal written agreement between relatives—parents and children, siblings, grandparents and grandchildren, aunts and uncles and their nieces and nephews—documenting the terms of a monetary loan within the family. Family loans are common vehicles for helping relatives purchase their first home, start a business, pay for education, bridge a financial gap, or recover from a financial setback. While the desire to help family members is genuine and admirable, undocumented family loans are a leading cause of post-mortem estate disputes, sibling conflict, and family estrangement. A formally documented promissory note transforms a well-meaning gesture into a clear, legally enforceable agreement that protects everyone involved.',
      'The distinction between a loan and a gift becomes legally and financially significant in multiple contexts. If a parent lends money to one child without documentation, other children may claim at the parent\'s death that the loan was actually a gift—or, conversely, that the loan should be repaid to the estate and treated as an advance on the borrowing child\'s inheritance. The IRS treats undocumented loans between family members with suspicion—if the transfer looks more like a gift than a loan (no repayment has occurred, no promissory note was signed, no interest was charged), the IRS may recharacterize it as a gift and assess gift tax if the cumulative gift amount exceeds the annual exclusion. A signed promissory note with a reasonable repayment schedule and interest rate is the primary evidence that a transfer was a genuine loan.',
      'Family loan promissory notes serve a protective function for both the lender and the borrower. For the lender, the note creates a legally enforceable claim that can be pursued if the relationship sours, if the borrower becomes financially irresponsible, or if the lender needs to document the loan as an asset in their own estate. For the borrower, the note creates clarity about their obligation—they know exactly how much they owe, when payments are due, and what happens if they miss a payment—reducing anxiety about an undefined or open-ended family obligation. Clear documentation often preserves relationships better than informal arrangements that breed resentment and misunderstanding.',
      'The interest rate on a family loan must meet IRS minimum requirements to avoid imputed interest treatment. The IRS publishes monthly Applicable Federal Rates (AFRs) at short-term, mid-term, and long-term maturities. Loans with terms of three years or less use the short-term AFR; loans of three to nine years use the mid-term AFR; loans of more than nine years use the long-term AFR. If the family loan charges interest at or above the applicable AFR, the IRS will not impute additional interest or treat the forgone interest as a gift. AFRs are relatively low compared to commercial lending rates, making them accessible while satisfying IRS requirements. For loans of $10,000 or less between family members, the imputed interest rules do not apply.',
    ],
    howItWorks: [
      {
        step: 'Agree on Loan Amount, Term, and Interest Rate',
        description: 'Decide the principal amount, the loan term (how long the borrower has to repay), and the interest rate. Check the current IRS Applicable Federal Rate for the appropriate term (short, mid, or long-term) to ensure the rate meets minimum IRS requirements. The rate can be higher than the AFR if the lender wishes to charge a fair market rate, but cannot be zero or below the AFR for larger loans without triggering imputed interest consequences.',
      },
      {
        step: 'Calculate and Document the Repayment Schedule',
        description: 'Calculate the regular payment amount using the principal, interest rate, and term. For installment loans, prepare an amortization schedule showing each payment date, payment amount, interest component, principal component, and remaining balance. Attach the amortization schedule to the note as an exhibit. For lump-sum loans, state the single due date and the total amount due (principal plus any accrued interest). Both parties should understand and agree to the schedule before signing.',
      },
      {
        step: 'Address the Treatment of Loan Balance in the Lender\'s Estate',
        description: 'Consider how the outstanding loan balance will be treated in the lender\'s estate plan. Options include: the borrower repays the full balance before the lender\'s death; the lender\'s will forgives any outstanding balance as a specific bequest; the outstanding balance is counted as part of the borrower\'s inheritance share (an advancement); or the loan continues as an estate asset that the executor must collect. State the lender\'s intent in the note or in their estate planning documents to prevent ambiguity.',
      },
      {
        step: 'Include Default Provisions Appropriate for the Family Context',
        description: 'Default provisions in a family loan context are sensitive—the goal is clarity, not weaponization. Include a reasonable grace period for missed payments. For modest amounts, a demand for full repayment upon default may be disproportionate; consider a modified payment plan as the first remedy. State that the lender may pursue legal collection as a last resort, but also indicate a preference for communication and resolution before enforcement. The note should be firm enough to be enforceable but drafted with the family relationship in mind.',
      },
      {
        step: 'Execute and Maintain Records',
        description: 'Both parties should sign the note; the lender keeps the original and the borrower keeps a copy. Maintain records of every payment: amounts, dates, method, and running balance. Issue a receipt for each payment or maintain a shared spreadsheet. At year-end, calculate any interest paid (for the borrower\'s potential deduction if the loan is for a business or investment purpose) and any interest received by the lender (which is taxable income). This recordkeeping discipline demonstrates to the IRS that the loan is genuine.',
      },
    ],
    legalConsiderations: [
      {
        title: 'Annual Gift Tax Exclusion and Forgiveness of Loan Balances',
        body: 'Each year, a lender may forgive up to the annual gift tax exclusion amount ($18,000 per recipient in 2024) of the outstanding loan principal without gift tax consequences. This allows a parent, for example, to forgive $18,000 of a $100,000 family loan each year, effectively reducing the obligation over time as a planned giving strategy. If the forgiveness exceeds the annual exclusion in any year, the excess reduces the lender\'s lifetime unified gift and estate tax exemption. Document each annual forgiveness in a written letter to maintain a clear record of the loan balance and the forgiveness history.',
      },
      {
        title: 'Medicaid Look-Back Period and Family Loans',
        body: 'When an elderly family member makes a loan to a younger relative—particularly if the lender might need nursing home care within five years—Medicaid\'s five-year look-back period is a critical consideration. Medicaid eligibility reviewers examine all financial transfers within the five years preceding the application for long-term care benefits. An undocumented transfer will be treated as a gift, creating a disqualification period. A properly documented promissory note with commercial terms (reasonable interest rate, fixed repayment schedule) may be treated as a legitimate loan rather than a gift transfer, preserving the lender\'s Medicaid eligibility. This area of law is complex and state-specific; consult an elder law attorney.',
      },
      {
        title: 'Estate Advancement and Equalization Among Heirs',
        body: 'When one child receives a family loan that another child does not, estate equalization issues arise at the lender\'s death. If the loan is outstanding at death and the estate plan does not address it, the estate must decide whether to call the loan (collect from the borrowing child) or forgive it—while other children receive full shares of the estate without the benefit the borrowing child received. A well-planned promissory note should coordinate with the lender\'s will: either requiring repayment to the estate (reducing the borrowing child\'s inheritance by the loan balance) or forgiving the balance through a specific will bequest that is charged against the borrowing child\'s share.',
      },
      {
        title: 'Bankruptcy Preference Period for Family Loan Repayments',
        body: 'If a family member borrower files for bankruptcy within one year of making repayments to a family lender, those repayments may be subject to recovery as "preferential transfers." A bankruptcy trustee can "claw back" payments made to family members (insider creditors) within the one-year period before bankruptcy, while the look-back period for non-insiders is only 90 days. This means that repayments made in good faith to a family lender may be demanded back by the bankruptcy trustee. Family lenders receiving repayments should be aware of this risk, particularly if the borrower is in financial distress.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Setting a Below-AFR Interest Rate Without Understanding the Tax Consequences',
        fix: 'Charging below the Applicable Federal Rate (or no interest at all) on a family loan above $10,000 triggers IRS imputed interest rules that treat the forgone interest as a gift from the lender to the borrower each year. This creates income for the lender (who must report the imputed interest even though they did not receive it) and a gift from the lender that counts against the annual exclusion. Check the current AFR and charge at least that rate to avoid these consequences.',
      },
      {
        mistake: 'Making Loan Payments Informally Without Records',
        fix: 'Family loan payments made in cash without receipts, or as parts of larger transactions (mixed with birthday gifts or holiday transfers), are impossible to document accurately. The IRS may question whether payments were made at all, and estate beneficiaries may dispute the loan balance at the lender\'s death. Use bank transfers with memo lines identifying the payment, or write checks, and maintain a running payment log. Issue annual statements of the outstanding balance to the borrower.',
      },
      {
        mistake: 'Not Distinguishing the Loan from Other Financial Support',
        fix: 'When parents provide both loans and gifts to a child simultaneously—paying for a wedding while also making a business loan—the lines blur. Keep the promissory note transactions strictly separate from gift-giving: different accounts, clear payment references, and distinct paperwork. Commingled records make it impossible to distinguish loan repayments from gift receipts, which creates both tax and estate administration problems.',
      },
      {
        mistake: 'Failing to Review the Note After Major Life Changes',
        fix: 'A family loan promissory note signed when a borrower was financially stable may become unworkable if the borrower loses their job, divorces, or faces a medical crisis. Rather than allowing the note to default, proactively review and modify the terms: extend the repayment period, reduce payments temporarily, or restructure the balance. Document modifications in a written amendment signed by both parties.',
      },
      {
        mistake: 'Not Coordinating the Note with the Lender\'s Estate Plan',
        fix: 'A promissory note that survives the lender\'s death becomes an estate asset that the executor must pursue—even within the family. If the lender intended to forgive the balance, that intent must be expressed in the will. If the lender intended the balance to reduce the borrower\'s inheritance share, the will must state this. Without coordination, the executor may be legally obligated to collect the loan against the lender\'s implicit forgiveness intentions.',
      },
    ],
    extendedFaq: [
      {
        question: 'Can I forgive a family loan in my will?',
        answer: 'Yes. A will can include a specific provision forgiving any outstanding balance on a named family loan at the time of the testator\'s death. This bequest can be structured as an outright forgiveness (the balance is cancelled), as a charge against the borrower\'s inheritance share (reducing what they receive from the estate by the forgiven amount), or as a forgiveness only if the borrower has made timely payments throughout the loan term. Coordinating the note with your will is the most important estate planning step for family loans.',
      },
      {
        question: 'Does a family loan affect the borrower\'s credit score?',
        answer: 'Generally no—family loans are not typically reported to credit bureaus. The borrower\'s credit score is unaffected by timely repayments or defaults on a family loan. If establishing credit history is a goal for the borrower, a co-signed bank loan may be more appropriate than a family promissory note.',
      },
      {
        question: 'What interest rate should I charge on a family loan?',
        answer: 'At minimum, charge the Applicable Federal Rate published monthly by the IRS for the appropriate term (short-term for up to 3 years, mid-term for 3-9 years, long-term for over 9 years). These rates are typically much lower than commercial lending rates but satisfy IRS requirements. You may charge more than the AFR if you choose—the lender must report all actual interest received as income, and the borrower may deduct it if the loan funds a business or investment.',
      },
      {
        question: 'What should I do if my family member refuses to repay the loan?',
        answer: 'Start with a conversation—family loan defaults often result from financial hardship, not bad faith. If the borrower is genuinely unable to pay, consider modifying the terms. If the borrower can pay but refuses, your options include pursuing legal action (small claims or civil court, depending on the amount), treating the debt as a gift for tax purposes and adjusting the estate plan accordingly, or forgiving the debt and counting it against the borrower\'s future inheritance. Consult an attorney before filing suit against a family member to understand all the implications.',
      },
    ],
  },

  promissory_note_business_loan: {
    overview: [
      'A business loan promissory note is a formal instrument executed between a lender and a business entity—or between a business and an individual principal who personally guarantees the obligation—documenting the terms of a commercial loan used to finance business operations, acquisition, expansion, or capital needs. Unlike personal promissory notes, business loan notes operate in a more sophisticated legal environment: the borrower is typically a legal entity (LLC, corporation, or partnership) whose principals may or may not be personally liable; the loan may be secured by business assets; regulatory requirements may apply depending on the lender type; and the financial covenants, representations and warranties, and default provisions are generally more extensive than in personal lending contexts.',
      'Business loan promissory notes vary enormously in complexity depending on the parties, the loan amount, and the intended use of funds. A simple note between two business partners for a short-term cash advance may be a one-page document with basic terms. A commercial real estate loan from a private lender to an LLC may involve a multi-page promissory note supported by a deed of trust, a personal guarantee from the LLC\'s members, an operating agreement that authorizes the borrowing, and detailed financial covenants requiring the business to maintain specific ratios. Understanding which level of documentation is appropriate for a given transaction requires assessment of the loan amount, the parties\' relationship, the collateral, and the business context.',
      'The personal guarantee is one of the most important and most negotiated provisions in a business loan promissory note. When a bank or private lender makes a loan to an LLC or corporation, the limited liability protection of the entity means that—without a guarantee—the lender\'s recourse upon default is limited to the business\'s assets. Most commercial lenders require the business\'s principal owners (those with 20% or more ownership) to sign personal guarantees, making themselves personally liable for the business debt. The guarantee may be unlimited (the guarantor is liable for the entire debt) or limited (capped at a specific dollar amount or percentage). Guarantors should understand that signing a personal guarantee puts their personal assets—home, savings, investments—at risk if the business defaults.',
      'Financial covenants are a distinctive feature of commercial promissory notes. These are ongoing obligations the borrower business must maintain throughout the loan term—financial ratios like debt-to-equity, debt service coverage, or minimum cash reserves; obligations to provide periodic financial statements; requirements to maintain certain insurance coverage; restrictions on additional borrowing or asset disposal without lender consent; and limitations on distributions to owners that might impair the business\'s ability to service the debt. Covenant violations—even if the borrower is current on payments—can constitute events of default under the loan documents. Businesses must understand and track their covenant compliance obligations from the outset.',
    ],
    howItWorks: [
      {
        step: 'Verify the Borrowing Entity\'s Authority to Borrow',
        description: 'Before executing a business loan promissory note, confirm that the business entity (LLC, corporation, or partnership) has legal authority to enter into the loan. For LLCs, the operating agreement may require member or manager approval for loans above a threshold amount. For corporations, the board of directors must typically authorize borrowing by resolution. Attach a copy of the authorizing resolution or operating agreement provision to the loan documents. Without proper corporate authorization, the note may be unenforceable against the entity.',
      },
      {
        step: 'Define the Loan Purpose and Disbursement Conditions',
        description: 'State the purpose of the loan—working capital, equipment acquisition, real estate purchase, acquisition financing—and any conditions that must be satisfied before disbursement. Lenders providing construction or acquisition loans often structure disbursements in tranches tied to project milestones. For revolving credit facilities, define the maximum credit limit, the drawdown procedure, and the repayment and reborrowing mechanics.',
      },
      {
        step: 'State All Financial Terms: Principal, Rate, Payments, and Fees',
        description: 'Include the principal amount, the interest rate (fixed or variable—if variable, specify the benchmark index and the spread), compounding frequency, payment amounts and due dates, any origination or commitment fees, prepayment premium provisions, and the final maturity date. For variable-rate loans, state the maximum rate cap if applicable and the adjustment frequency. Include the complete amortization schedule or the formula for calculating payments.',
      },
      {
        step: 'Include Financial Covenants and Reporting Obligations',
        description: 'Define any financial covenants the borrower must maintain throughout the loan term—minimum debt service coverage ratio, maximum leverage ratio, minimum liquidity. State the financial reporting obligations: annual audited financials, quarterly unaudited statements, monthly cash flow reports. Specify the cure period for covenant violations before the lender can exercise remedies and the lender\'s right to inspect the borrower\'s books and records upon request.',
      },
      {
        step: 'Obtain Personal Guarantees and Perfect Security Interests',
        description: 'If the lender requires personal guarantees, execute separate guarantee agreements signed by each guarantor. If the loan is secured, execute UCC financing statements for personal property collateral and record mortgages or deeds of trust for real property collateral. File and record all security documents before disbursing funds. Confirm that the security interests cover all required collateral and are properly described to support enforcement.',
      },
    ],
    legalConsiderations: [
      {
        title: 'Loan Authorization and Ultra Vires Concerns',
        body: 'A business entity can only take actions within the scope of its legal authority (intra vires). Borrowing money is within the ordinary scope of most business entities, but the entity\'s governing documents may impose restrictions or approval requirements on large borrowings. If a manager or officer executes a promissory note without required board or member approval, the note may be voidable by the entity as an ultra vires act. Lenders protect against this risk by requiring a corporate resolution or member consent as a closing condition and reviewing the entity\'s governing documents for borrowing restrictions.',
      },
      {
        title: 'Usury Laws for Commercial Loans',
        body: 'Most states have usury laws setting maximum interest rates for loans. Commercial loan usury limits are typically higher than consumer loan limits, and many states have broad commercial loan exemptions that allow parties to contract for any interest rate. Some states have stricter commercial usury limits. Confirm the applicable usury limit in your state before setting the interest rate on a commercial promissory note. Variable-rate loans may exceed fixed usury caps during rate increases—include a provision stating that the rate will not exceed the maximum legally permitted rate.',
      },
      {
        title: 'Lender Liability for Overreaching Conduct',
        body: 'Lenders who exercise aggressive control over a borrower\'s business—interfering with management decisions, requiring specific operational practices, or dominating the business beyond a normal lender relationship—may face "lender liability" claims if the business subsequently fails. Courts have imposed liability on lenders who crossed the line from legitimate loan oversight to tortious interference with business operations. Commercial loan documents should be drafted to ensure the lender\'s rights are protective (receiving financial reports, covenant compliance) rather than operational (directing which vendors to use or requiring specific personnel decisions).',
      },
      {
        title: 'Workouts and Loan Modifications',
        body: 'When a business borrower faces financial difficulty that makes repayment of the original terms impossible, lenders and borrowers may negotiate a "workout"—a modification of the loan terms to reflect the borrower\'s current capacity. Workouts may include interest rate reductions, principal deferrals, extended maturity dates, debt-for-equity conversions, or partial forgiveness. Modifications must be documented in signed written amendments to the original promissory note and any security documents, as oral modifications of written loan agreements are typically unenforceable. Partial forgiveness may result in cancellation of debt income to the borrower, with tax consequences.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Failing to Obtain Proper Corporate Authorization Before Executing the Note',
        fix: 'A promissory note signed by an LLC manager or corporate officer who lacked authority to bind the entity may be unenforceable against the entity—leaving the lender with claims against the individual signer but not the business. Require a board resolution or member consent as a condition precedent to closing, and review the entity\'s governing documents for borrowing restrictions or required approval thresholds.',
      },
      {
        mistake: 'Not Perfecting Security Interests Before Disbursing Funds',
        fix: 'Disbursing loan proceeds before perfecting the security interest—filing the UCC-1, recording the mortgage—leaves the lender unsecured during the gap period. If the borrower files for bankruptcy or takes on additional secured debt between disbursement and perfection, the lender may lose priority. File UCC financing statements on the day of closing. For real property, coordinate with a title company to ensure simultaneous recording.',
      },
      {
        mistake: 'Using Personal Loan Forms for Business Lending',
        fix: 'Personal promissory note forms typically lack the financial covenants, representations and warranties, event of default definitions, and cross-default provisions appropriate for business loans. Using a personal form for a business loan creates gaps in the lender\'s rights and may not adequately reflect the complexity of the commercial lending relationship. Use a business-specific promissory note that includes appropriate commercial loan provisions.',
      },
      {
        mistake: 'Setting Financial Covenants the Borrower Cannot Realistically Maintain',
        fix: 'Covenants set at levels the borrower cannot maintain in ordinary operations create perpetual default risk—the lender is constantly in a position to accelerate the loan, creating legal uncertainty and operational distraction for the borrower. Set covenants based on the borrower\'s historical financial performance and realistic projections, with reasonable headroom. Tight covenants serve the lender\'s interest in monitoring credit quality; covenants that are immediately violated serve no one.',
      },
      {
        mistake: 'Omitting a Governing Law and Dispute Resolution Clause',
        fix: 'Business loans between parties in different states require a governing law provision designating which state\'s law governs the note. Without it, choice-of-law disputes add cost and uncertainty to any enforcement action. Include a clear governing law provision and, for larger loans, a mandatory arbitration or forum selection clause specifying where disputes will be resolved.',
      },
    ],
    extendedFaq: [
      {
        question: 'Do I need a separate security agreement or can collateral be included in the promissory note?',
        answer: 'For personal property collateral, the security agreement can be incorporated into the promissory note—a combined note and security agreement is common for smaller business loans. For real property collateral, the security instrument (mortgage or deed of trust) must always be a separate recorded document. For complex multi-collateral business loans, separate security agreements and loan agreements are typically used, with the promissory note referencing and incorporating them.',
      },
      {
        question: 'What is a cross-default provision and should it be included?',
        answer: 'A cross-default provision declares an event of default under one loan agreement when the borrower defaults under any other loan agreement. For lenders, cross-default ensures they can take protective action before the borrower exhausts its assets servicing other debts first. For borrowers, cross-default creates risk that a minor default under one loan cascades into defaults across all their debt. The appropriateness of cross-default depends on the lender\'s risk tolerance and the borrower\'s overall debt structure.',
      },
      {
        question: 'Can an LLC member be personally liable for a business loan without signing a personal guarantee?',
        answer: 'Generally no—the limited liability protection of an LLC prevents personal liability for business debts unless the member signed a personal guarantee, personally guaranteed the debt through some other mechanism, or the corporate veil is pierced (an extraordinary remedy requiring proof of fraud or complete disregard of corporate formalities). Lenders who want personal recourse must obtain signed guarantee agreements from each individual they want to hold liable.',
      },
      {
        question: 'What happens to a business loan promissory note if the business is sold?',
        answer: 'Business purchase transactions must address outstanding promissory notes. In asset sales, the buyer does not automatically assume the seller\'s liabilities—outstanding notes remain the seller\'s obligation unless the buyer expressly assumes them with the lender\'s consent. In stock or membership interest sales, the business entity (and its obligations) transfer to the new owner. Lenders must be notified of and may have consent rights over business sales under the loan\'s change-of-control provisions. Personal guarantees from selling principals may not extend to the new owners.',
      },
    ],
  },

  promissory_note_vehicle_loan: {
    overview: [
      'A vehicle loan promissory note is a written promise by a borrower to repay funds advanced for the purchase or refinancing of a motor vehicle—car, truck, motorcycle, RV, boat, or other vehicle—with the vehicle pledged as collateral securing the lender\'s interest. Private party vehicle loans are common when a buyer cannot obtain conventional financing, when the seller is financing the transaction directly, or when a family member is lending the purchase funds. Unlike a bank auto loan, where standard forms and federal compliance infrastructure are in place, a private party vehicle loan requires the parties to draft their own documentation to create a legally enforceable obligation and a valid security interest in the vehicle.',
      'The mechanics of a vehicle loan note involve two interdependent legal documents: the promissory note (the borrower\'s promise to repay) and the security agreement (the pledge of the vehicle as collateral). For vehicles, the security interest is perfected differently than for other personal property—rather than filing a UCC-1 financing statement, vehicle security interests are perfected by noting the lienholder on the vehicle\'s certificate of title issued by the state DMV. This title notation gives the lender priority over subsequent creditors and prevents the borrower from selling the vehicle with a clean title until the lender is paid off and releases the lien. The lien notation is not automatic—the lender must take the steps to have the lien noted on the title within the time allowed by state law.',
      'Interest rates on private party vehicle loans must comply with state usury laws, which generally set maximum rates for consumer loans. Many states have specific maximum rates for motor vehicle installment contracts that differ from general consumer loan limits. Unlike mortgages, which are heavily regulated by federal disclosure requirements, private party vehicle loans between individuals may or may not be subject to federal consumer lending disclosure requirements depending on whether the lender is in the business of making consumer loans. Parties should understand the applicable usury limits and whether federal disclosures are required before finalizing the interest rate terms.',
      'Repossession rights upon default are among the most practically important provisions in a vehicle promissory note. Under most state laws and UCC Article 9, a secured creditor can repossess a vehicle without a court order if the repossession can be accomplished without breaching the peace—meaning without any confrontation, threat, or physical contact with the borrower. However, the borrower must be given the opportunity to redeem the vehicle by paying the full outstanding balance before the lender disposes of it, and the lender must provide notice of any proposed sale and account for the proceeds. Lenders who violate these procedural requirements face significant statutory damages, sometimes including actual damages plus attorney\'s fees.',
    ],
    howItWorks: [
      {
        step: 'Document the Vehicle Being Financed',
        description: 'Identify the vehicle precisely in the promissory note and security agreement: year, make, model, vehicle identification number (VIN), odometer reading, and current title information. This identification ensures that the security interest attaches to the correct vehicle and that the lien notation on the title covers the right property. Obtain a copy of the current title to verify ownership, any existing liens, and the title\'s status (clean, salvage, rebuilt).',
      },
      {
        step: 'Set the Loan Amount, Interest Rate, and Payment Schedule',
        description: 'State the principal amount advanced, the annual interest rate, and the complete payment schedule—due date, payment amount, and final maturity. For a simple vehicle loan, create an amortization table showing how each payment is divided between interest and principal. Include the total of payments over the loan term and the total interest cost. State the grace period for late payments and the late fee amount (within applicable state law limits).',
      },
      {
        step: 'Establish the Security Interest and Lien Process',
        description: 'Create the security agreement—either as a separate document or incorporated into the promissory note—granting the lender a security interest in the vehicle. After loan closing, promptly submit the appropriate DMV forms to have the lender\'s name noted as a lienholder on the certificate of title. Until the lien is noted, the security interest is not perfected. Retain the original title or arrange for it to be held by an escrow party until the loan is paid off.',
      },
      {
        step: 'Address Insurance Requirements',
        description: 'Require the borrower to maintain comprehensive and collision insurance on the vehicle throughout the loan term, naming the lender as a loss payee. This ensures that if the vehicle is damaged or destroyed, insurance proceeds are paid to the lender first to satisfy the outstanding loan balance. Specify minimum coverage amounts, the obligation to provide proof of insurance annually, and the lender\'s right to obtain force-placed insurance at the borrower\'s expense if coverage lapses.',
      },
      {
        step: 'Define Default Events and Repossession Rights',
        description: 'Define defaults: missed payment after the grace period, lapse in required insurance, unauthorized sale or encumbrance of the vehicle, or material misrepresentation in the loan application. State the lender\'s rights upon default: acceleration of the full balance, repossession of the vehicle, right to dispose of the vehicle by public or private sale, and right to seek a deficiency judgment for any shortfall between sale proceeds and the outstanding balance. Include required statutory notices.',
      },
    ],
    legalConsiderations: [
      {
        title: 'Title Lien Notation and Priority',
        body: 'Perfecting a security interest in a motor vehicle requires noting the lien on the certificate of title, not filing a UCC-1 financing statement. A lien noted on the title has priority over subsequent liens and prevents the borrower from transferring clean title until the lender releases the lien. If the lender fails to have the lien noted—and the borrower sells the vehicle to a bona fide purchaser who takes without notice of the lien—the bona fide purchaser takes the vehicle free of the lender\'s security interest in most states. Lenders must act promptly to perfect title liens.',
      },
      {
        title: 'Anti-Deficiency Protections for Vehicle Loans',
        body: 'If a vehicle is repossessed and sold for less than the outstanding loan balance, the lender may seek a deficiency judgment against the borrower for the difference. Some states limit deficiency judgments on consumer vehicle loans—requiring commercially reasonable repossession procedures, adequate notice of the sale, and in some cases prohibiting deficiency claims entirely if the vehicle was sold for less than fair market value. The promissory note should reference the applicable state law procedures to ensure that the lender\'s conduct at repossession and sale preserves deficiency rights.',
      },
      {
        title: 'Federal Truth in Lending Act Applicability',
        body: 'The federal Truth in Lending Act (TILA/Regulation Z) requires specific written disclosures—APR, finance charge, total of payments, amount financed—for consumer credit transactions. Whether TILA applies to a private vehicle loan depends on whether the lender is regularly engaged in the business of extending consumer credit. Individual lenders who make occasional family or private vehicle loans may not be subject to TILA. However, if there is any uncertainty, including standard TILA disclosures in the loan documentation reduces regulatory risk and demonstrates transparency to the borrower.',
      },
      {
        title: 'Lemon Law Implications for Financed Vehicles',
        body: 'If a buyer finances the purchase of a new or certified used vehicle and the vehicle has defects covered by a state lemon law, the lemon law remedy may include rescission of the purchase transaction—which affects the loan secured by the vehicle. In most cases, lemon law remedies flow through the vehicle manufacturer or dealer, not through the lender; the lender\'s security interest survives any lemon law claim against the dealer and the borrower remains obligated to repay the loan. However, if the lender is also the seller (in a seller-financing arrangement), lemon law claims may affect the loan directly.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Not Having the Lien Noted on the Certificate of Title',
        fix: 'Skipping the title lien notation—either because the parties do not know it is required or to save time and DMV fees—leaves the lender\'s security interest unperfected. An unperfected lien can be extinguished if the borrower sells the vehicle to a good-faith buyer or files for bankruptcy. Complete the DMV title application to note the lien within the state\'s deadline, typically within 30 days of the loan closing.',
      },
      {
        mistake: 'Financing a Vehicle with a Salvage or Rebuilt Title Without Adjusting the Terms',
        fix: 'Salvage and rebuilt title vehicles have significantly lower market value than clean title vehicles of the same year, make, and model—typically 20%-40% less. If the borrower defaults and the lender must sell a salvage title vehicle to satisfy the debt, the proceeds will likely be insufficient to cover the outstanding balance. Loan terms for salvage title vehicles should reflect the lower collateral value: smaller loan amounts, higher down payments, or shorter terms.',
      },
      {
        mistake: 'Allowing the Borrower to Hold the Certificate of Title',
        fix: 'If the borrower holds the title certificate with the lender\'s lien noted, the borrower can present the title to a DMV with a forged lien release and obtain a clean title—then sell the vehicle free of the lender\'s interest. For significant loans, the lender should hold the original title certificate until the loan is fully repaid, then sign and deliver the lien release. Some states allow electronic title systems where the lender holds an electronic lien notation.',
      },
      {
        mistake: 'Setting Interest Rates Above State Usury Limits',
        fix: 'Vehicle loans are consumer loans subject to state usury laws. Charging interest above the applicable usury ceiling—even by one percentage point—can result in the loan being deemed usurious, potentially voiding the interest obligation and in some states voiding the entire note. Research your state\'s maximum interest rate for consumer vehicle loans before setting the rate.',
      },
      {
        mistake: 'Not Requiring Continuous Insurance Coverage',
        fix: 'Insurance requirements are often included in vehicle loan agreements but not actively monitored. If the borrower\'s insurance lapses—common if the borrower cancels the policy to save money during financial difficulty—the lender\'s collateral is at risk. Include a provision allowing the lender to obtain force-placed insurance at the borrower\'s expense, and consider requesting annual proof-of-insurance as a covenant.',
      },
    ],
    extendedFaq: [
      {
        question: 'Can I finance a vehicle being sold between private parties with a promissory note?',
        answer: 'Yes. Private party vehicle sales frequently involve seller financing where the seller accepts a down payment and takes a promissory note for the balance, retaining a lien on the vehicle title until the balance is paid. The seller-financer should: document the loan in a signed promissory note and security agreement; retain the title or have the lien noted immediately with the DMV; and require insurance naming the seller as loss payee. This structure is common when the buyer cannot obtain conventional financing.',
      },
      {
        question: 'What happens if the borrower sells the vehicle before paying off the loan?',
        answer: 'If the lender\'s lien is properly noted on the title, the borrower cannot transfer clean title without the lender\'s release—a buyer doing a proper title search will discover the lien. If the borrower sells without the lender\'s knowledge (using a forged release or in a state with weak title protections), the lender can pursue the borrower for the outstanding balance and in some states may have recourse against the buyer. Include a provision in the note prohibiting sale without lender consent and declaring unauthorized sale an immediate default.',
      },
      {
        question: 'How do I release the lien when the vehicle loan is paid off?',
        answer: 'When the loan is fully repaid, sign and deliver a lien release to the borrower—the specific form varies by state but typically is a written statement that the debt is satisfied and the lien is released. The borrower takes the lien release to the DMV to obtain a clean title. In electronic lien states, the lender electronically releases the lien. Retain a copy of the lien release and proof that the final payment was received. Some states require the release to be notarized.',
      },
      {
        question: 'Can I include a GPS tracking device requirement in the vehicle loan agreement?',
        answer: 'Yes—lenders, particularly those financing higher-risk borrowers, may require the installation of a GPS starter interrupt device as a loan condition. These devices allow lenders to locate and remotely disable the vehicle if the borrower defaults. If this is a loan condition, it must be clearly disclosed in the promissory note, and the borrower must consent to the device\'s installation and operation. State laws on GPS tracking devices and remote disabling vary—confirm compliance with your state\'s law before requiring such a device.',
      },
    ],
  },

  promissory_note_real_estate_note: {
    overview: [
      'A real estate promissory note is the core debt instrument in a real property financing transaction, representing the borrower\'s unconditional written promise to repay a specified sum of money with interest, secured by a mortgage or deed of trust on real property. This note is distinct from—but inseparable from—the mortgage or deed of trust, which is the security instrument recorded against the property title. Together, the note and the mortgage create a secured real estate loan: the note is the borrower\'s personal promise to repay (creating personal liability) and the mortgage gives the lender the right to foreclose on the property if the borrower defaults (creating the security interest). The note travels with the debt; the mortgage travels with the property.',
      'Real estate notes occupy a unique position in the broader debt markets. Unlike most promissory notes, real estate notes are routinely bought and sold in secondary markets—a lender who makes a private real estate loan may sell the note to an investor who then becomes the new noteholder and is owed the debt. This negotiability creates important legal considerations: the terms of the note must be clear and complete because subsequent purchasers will rely entirely on the note\'s terms; the note must comply with applicable federal and state requirements that affect its salability; and the borrower must be notified when the note is transferred so they know where to direct future payments. Real estate notes that do not meet secondary market standards may be difficult to sell, affecting the lender\'s liquidity.',
      'The economic terms of a real estate promissory note vary widely based on the loan type. Purchase money notes—used to finance the acquisition of a property—are often structured with fixed rates, standard amortization, and a 15- or 30-year term. Hard money notes—short-term bridge loans made by private lenders on real property—typically carry higher interest rates (8%-15%), interest-only payments during the term, and balloon payments due within one to five years. Seller carry-back notes—where the seller extends financing to the buyer—may have negotiated terms that reflect the seller\'s equity position and the buyer\'s creditworthiness. Each structure requires a note tailored to its specific terms and risk profile.',
      'Federal regulations impose disclosure requirements on many real estate loans that affect the content and structure of the promissory note. The Truth in Lending Act requires lenders who regularly extend consumer real estate credit to provide specific written disclosures before loan consummation, including the APR, finance charge, and total payments. RESPA governs the settlement process for many residential real estate loans. For non-institutional private lenders making occasional loans secured by real property, some federal requirements may not apply—but state laws may impose additional requirements. The Dodd-Frank Act\'s ability-to-repay rule applies to most residential mortgage credit extensions, regardless of whether the lender is institutional or private. Understanding the applicable regulatory framework is essential before executing a real estate promissory note.',
    ],
    howItWorks: [
      {
        step: 'Specify the Property and Loan Purpose',
        description: 'Identify the real property securing the note by legal description—the same description that will appear in the mortgage or deed of trust. State the purpose of the loan: purchase of the property, refinancing of existing debt, cash-out refinancing, or construction financing. The loan purpose may affect which regulations apply and may be relevant to the borrower\'s tax treatment of the interest paid.',
      },
      {
        step: 'Define All Financial Terms with Precision',
        description: 'State the principal amount, the interest rate (fixed or adjustable—if adjustable, specify the index, margin, rate caps, and adjustment frequency), the payment amount, the payment due date, the application of payments (interest first, then principal), the amortization period, and the final maturity date. For balloon payment notes, clearly state the balloon amount and due date. For interest-only periods, define when amortization begins. For adjustable-rate notes, provide the calculation methodology for payment adjustments.',
      },
      {
        step: 'Include Due-on-Sale, Prepayment, and Transfer Provisions',
        description: 'Include a due-on-sale clause requiring full repayment of the note if the property is sold or transferred without the lender\'s consent—this protects the lender from having the loan assumed by an unknown buyer. Specify prepayment rights: can the borrower prepay without penalty? If there is a prepayment premium, specify the formula (yield maintenance, step-down premium, or fixed penalty). Address the lender\'s right to transfer the note and the borrower\'s right to notice of transfer.',
      },
      {
        step: 'Define Events of Default and Acceleration',
        description: 'Enumerate events that constitute defaults: missed payments after the grace period, failure to pay property taxes or insurance, waste or material damage to the property, unauthorized transfer of the property, insolvency, and other matters that impair the security. Include an acceleration clause allowing the lender to declare the entire balance immediately due upon default. For residential loans, federal and state law may require specific notice and cure periods before acceleration—incorporate these requirements into the default provisions.',
      },
      {
        step: 'Execute the Note Consistent with Recording Requirements',
        description: 'The promissory note itself is typically not recorded—only the mortgage or deed of trust is recorded. The note must be signed by the borrower (and any co-borrowers). The lender should retain the original signed note, as it is a negotiable instrument; the original must be produced to enforce the debt in court. Execute the mortgage or deed of trust simultaneously, have it notarized, and record it with the county recorder\'s office immediately after closing.',
      },
    ],
    legalConsiderations: [
      {
        title: 'Holder in Due Course Doctrine and Note Transfers',
        body: 'A promissory note is a negotiable instrument under UCC Article 3, which means it can be transferred to a subsequent holder who may take it free of certain defenses. A "holder in due course" (HDC)—someone who takes the note in good faith, for value, and without notice of any defects or claims—can enforce the note even if the borrower has defenses against the original lender. This doctrine allows real estate notes to be freely traded in secondary markets, but it also means that borrowers may be unable to raise defenses against a secondary market purchaser that they could have raised against the originating lender. Federal mortgage servicing regulations require the borrower to be notified when their mortgage loan is transferred.',
      },
      {
        title: 'Foreclosure Procedures and Non-Judicial vs. Judicial Foreclosure',
        body: 'The enforcement of a real estate note upon default follows the foreclosure procedures applicable in the state where the property is located. States using deeds of trust allow non-judicial foreclosure (trustee sale) without a court proceeding—faster and less expensive for the lender. States using mortgages typically require judicial foreclosure—a court action that takes months or years. Some states allow both. The promissory note\'s default provisions should reference the security instrument\'s foreclosure rights and the applicable state law. Anti-deficiency statutes in some states limit or prohibit the lender\'s ability to seek a personal judgment against the borrower for any shortfall after foreclosure sale.',
      },
      {
        title: 'Ability-to-Repay Rule and Qualified Mortgage Standards',
        body: 'Under the Dodd-Frank Act\'s ability-to-repay rule, lenders extending residential mortgage credit must make a reasonable, good-faith determination that the borrower can repay the loan. This requirement applies to most residential mortgage lenders, including some private party lenders. Qualified Mortgage (QM) status provides a safe harbor from liability—loans meeting QM standards are presumed to comply with the ability-to-repay rule. Non-QM loans (such as those with balloon payments, negative amortization, or interest-only periods) face stricter regulatory scrutiny. Private party lenders should consult counsel about whether the ability-to-repay rule applies to their lending activity.',
      },
      {
        title: 'Usury and the Farm Loans Exception',
        body: 'Real estate loans are subject to state usury laws, but several important exceptions and exemptions exist. Most states have exemptions for loans secured by first mortgages on residential real property above a threshold amount. Some states exempt loans made by or to corporate entities. Federal law preempts state usury limits for certain federally chartered lenders. For private party real estate loans between individuals, the applicable usury limit is typically the state\'s general usury rate or the specific real estate loan exemption threshold. Confirm the applicable rate before setting the loan\'s interest rate.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Separating the Note from the Mortgage and Losing One Document',
        fix: 'The note and mortgage are interdependent documents—one creates the debt obligation, the other creates the security interest. Losing the original promissory note creates significant enforcement problems; some courts require the lost note to be recreated through an indemnity agreement. Keep the original note secure. For note holders who purchase notes in secondary markets, verify that the complete original note (with all endorsements) is transferred and retained.',
      },
      {
        mistake: 'Including Provisions That Violate State Due-Process Foreclosure Requirements',
        fix: 'Real estate note provisions that purport to waive the borrower\'s right to notice before foreclosure, or that allow self-help remedies against real property (changing the locks, entering the property without a court order), are typically void and unenforceable. Foreclosure must follow the specific procedures prescribed by state law, regardless of what the note says. Include language consistent with applicable state law requirements, not provisions attempting to contract around them.',
      },
      {
        mistake: 'Not Including a Due-on-Sale Clause',
        fix: 'Without a due-on-sale clause, the buyer of the property can assume the seller\'s existing note without lender approval—substituting a potentially less creditworthy borrower without the lender\'s consent. For most real estate lenders, this is unacceptable. Include a due-on-sale clause requiring payoff of the note or formal assumption approval before the property can be transferred.',
      },
      {
        mistake: 'Failing to Require Property Tax and Insurance Escrows',
        fix: 'If the borrower fails to pay property taxes, a tax lien may be imposed on the property that takes priority over the mortgage—the government gets paid first. If the borrower lets insurance lapse and the property burns down, the lender\'s collateral is lost. Many real estate notes require monthly escrow payments collected with the mortgage payment to cover annual property taxes and insurance premiums. This ensures the lender knows these obligations are being met.',
      },
      {
        mistake: 'Structuring an Owner-Financed Sale Without Understanding the Dodd-Frank Implications',
        fix: 'Sellers who finance buyer purchases through real estate promissory notes may be subject to Dodd-Frank\'s ability-to-repay and loan originator requirements if they are not exempt. Seller-financers who own fewer than three properties and sell only one per year to owner-occupants may qualify for the private seller exemption—but the exemption has specific conditions. Review the Dodd-Frank seller-financer exemption with a real estate attorney before structuring an owner-financed transaction.',
      },
    ],
    extendedFaq: [
      {
        question: 'What is a balloon payment and why is it used in real estate notes?',
        answer: 'A balloon payment is a large lump-sum payment due at the end of a relatively short loan term—often five, seven, or ten years—even though the payment schedule was calculated based on a longer amortization period. Balloon notes are used when the lender wants to limit the commitment to a fixed interest rate, when the borrower expects to sell or refinance before maturity, or when bridge financing is needed while permanent financing is arranged. Borrowers who cannot refinance or sell before the balloon is due face a serious financial problem—the entire outstanding balance becomes immediately due.',
      },
      {
        question: 'Can I sell my real estate promissory note to an investor?',
        answer: 'Yes. Real estate notes are commonly bought and sold in private note markets. The sale price depends on the note\'s terms (interest rate, remaining term, balloon date), the borrower\'s payment history, the property\'s loan-to-value ratio, and the property type and location. Notes with higher interest rates, shorter remaining terms, and lower LTV ratios sell at prices closer to par. Notes with low interest rates, long remaining terms, or problematic payment history may sell at significant discounts. Note brokers facilitate these transactions for a fee.',
      },
      {
        question: 'Does my real estate promissory note need to be recorded?',
        answer: 'The promissory note itself is generally not recorded—it is a private document between the parties. The mortgage or deed of trust securing the note must be recorded in the county property records to establish and perfect the lender\'s security interest in the property. Recorded mortgages provide constructive notice to subsequent purchasers and creditors. An unrecorded mortgage may be subordinate to later-recorded instruments even if executed first.',
      },
      {
        question: 'What is the difference between a purchase money note and a hard money note?',
        answer: 'A purchase money note is given by a buyer to a seller as partial consideration for the property\'s purchase price—the seller is financing part of the sale rather than receiving full cash at closing. Anti-deficiency protections may apply to purchase money notes in some states. A hard money note is a loan from a private investor or hard money lender, typically secured by the property, carrying higher interest rates and shorter terms than conventional financing, used when conventional financing is unavailable. The collateral and enforceability rules are the same; the economic terms and regulatory treatment differ.',
      },
    ],
  },
}
