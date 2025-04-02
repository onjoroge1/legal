"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface TemplatePreviewProps {
  templateType: string
}

export default function TemplatePreview({ templateType }: TemplatePreviewProps) {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    )
  }

  // Return the appropriate template preview based on the template type
  switch (templateType) {
    case "nda":
      return <NonDisclosureAgreementPreview />
    case "service":
      return <ServiceAgreementPreview />
    case "employment":
      return <EmploymentContractPreview />
    case "llc":
      return <LLCOperatingAgreementPreview />
    case "privacy":
      return <PrivacyPolicyPreview />
    case "terms":
      return <TermsOfServicePreview />
    case "contractor":
      return <IndependentContractorPreview />
    case "lease":
      return <LeaseAgreementPreview />
    case "trademark":
      return <TrademarkAssignmentPreview />
    default:
      return <GenericDocumentPreview />
  }
}

function NonDisclosureAgreementPreview() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">NON-DISCLOSURE AGREEMENT</h2>

      <p>This Non-Disclosure Agreement (the "Agreement") is entered into as of [DATE] by and between:</p>

      <p>
        <strong>Disclosing Party:</strong> [DISCLOSING PARTY NAME], with an address at [ADDRESS] (the "Disclosing
        Party"); and
      </p>

      <p>
        <strong>Receiving Party:</strong> [RECEIVING PARTY NAME], with an address at [ADDRESS] (the "Receiving Party").
      </p>

      <p>
        <strong>1. Purpose.</strong> The Disclosing Party wishes to disclose certain confidential and proprietary
        information to the Receiving Party for the purpose of [PURPOSE OF DISCLOSURE] (the "Purpose").
      </p>

      <p>
        <strong>2. Definition of Confidential Information.</strong> "Confidential Information" means any information
        disclosed by the Disclosing Party to the Receiving Party, either directly or indirectly, in writing, orally or
        by inspection of tangible objects, that is designated as "Confidential," "Proprietary" or some similar
        designation, or that should reasonably be understood to be confidential given the nature of the information and
        the circumstances of disclosure.
      </p>

      <p>
        <strong>3. Obligations of Receiving Party.</strong> The Receiving Party shall:
      </p>

      <ul className="list-disc pl-8 space-y-2">
        <li>Hold the Confidential Information in strict confidence;</li>
        <li>Use the Confidential Information solely for the Purpose;</li>
        <li>Not disclose such Confidential Information to any third party;</li>
        <li>
          Take reasonable measures to protect the secrecy of and avoid disclosure and unauthorized use of the
          Confidential Information;
        </li>
        <li>
          Immediately notify the Disclosing Party in the event of any unauthorized use or disclosure of the Confidential
          Information.
        </li>
      </ul>

      <p>
        <strong>4. Term.</strong> The obligations of the Receiving Party under this Agreement shall survive until such
        time as all Confidential Information disclosed hereunder becomes publicly known and made generally available
        through no action or inaction of the Receiving Party.
      </p>

      <div className="text-center text-sm text-muted-foreground mt-8 border-t pt-4">
        <p>
          This is a preview of the template. Additional clauses include: Exclusions, Return of Materials, No Rights
          Granted, No Warranty, Remedies, and more.
        </p>
      </div>
    </div>
  )
}

function ServiceAgreementPreview() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">SERVICE AGREEMENT</h2>

      <p>This Service Agreement (the "Agreement") is entered into as of [DATE] by and between:</p>

      <p>
        <strong>Client:</strong> [CLIENT NAME], with an address at [ADDRESS] (the "Client"); and
      </p>

      <p>
        <strong>Service Provider:</strong> [SERVICE PROVIDER NAME], with an address at [ADDRESS] (the "Service
        Provider").
      </p>

      <p>
        <strong>1. Services.</strong> Service Provider shall provide the following services to Client (the "Services"):
      </p>

      <p className="pl-4 border-l-2 border-gray-200">[DESCRIPTION OF SERVICES]</p>

      <p>
        <strong>2. Term.</strong> This Agreement shall commence on [START DATE] and shall continue until [END DATE],
        unless earlier terminated as provided herein.
      </p>

      <p>
        <strong>3. Compensation.</strong> In consideration for the Services, Client shall pay Service Provider as
        follows:
      </p>

      <p className="pl-4 border-l-2 border-gray-200">[PAYMENT TERMS, RATES, SCHEDULE]</p>

      <p>
        <strong>4. Independent Contractor Relationship.</strong> Service Provider is an independent contractor, and
        nothing contained in this Agreement shall be construed to create a partnership, joint venture, agency, or
        employment relationship between Client and Service Provider.
      </p>

      <p>
        <strong>5. Confidentiality.</strong> Service Provider acknowledges that during the engagement, Service Provider
        may have access to and become acquainted with confidential information belonging to Client. Service Provider
        agrees not to disclose any such information without Client's prior written consent.
      </p>

      <div className="text-center text-sm text-muted-foreground mt-8 border-t pt-4">
        <p>
          This is a preview of the template. Additional clauses include: Intellectual Property, Warranties, Limitation
          of Liability, Termination, and more.
        </p>
      </div>
    </div>
  )
}

function EmploymentContractPreview() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">EMPLOYMENT AGREEMENT</h2>

      <p>This Employment Agreement (the "Agreement") is made and entered into as of [DATE], by and between:</p>

      <p>
        <strong>Employer:</strong> [EMPLOYER NAME], with its principal place of business at [ADDRESS] (the "Employer");
        and
      </p>

      <p>
        <strong>Employee:</strong> [EMPLOYEE NAME], residing at [ADDRESS] (the "Employee").
      </p>

      <p>
        <strong>1. Employment.</strong> Employer hereby employs Employee, and Employee hereby accepts employment with
        Employer, upon the terms and conditions set forth in this Agreement.
      </p>

      <p>
        <strong>2. Position and Duties.</strong> Employee shall serve as [POSITION TITLE] and shall perform such duties
        as are customarily performed by others in similar positions, and as may be assigned from time to time by
        Employer.
      </p>

      <p>
        <strong>3. Term.</strong> The term of this Agreement shall commence on [START DATE] and shall continue until
        terminated in accordance with the provisions of this Agreement.
      </p>

      <p>
        <strong>4. Compensation.</strong> As compensation for the services to be rendered by Employee hereunder,
        Employer shall pay to Employee a base salary of [SALARY AMOUNT] per [PERIOD], payable in accordance with
        Employer's normal payroll procedures.
      </p>

      <p>
        <strong>5. Benefits.</strong> Employee shall be entitled to the following benefits:
      </p>

      <ul className="list-disc pl-8 space-y-2">
        <li>[HEALTH INSURANCE DETAILS]</li>
        <li>[RETIREMENT PLAN DETAILS]</li>
        <li>[PAID TIME OFF DETAILS]</li>
        <li>[OTHER BENEFITS]</li>
      </ul>

      <div className="text-center text-sm text-muted-foreground mt-8 border-t pt-4">
        <p>
          This is a preview of the template. Additional clauses include: Confidentiality, Non-Competition, Termination,
          Severance, and more.
        </p>
      </div>
    </div>
  )
}

function LLCOperatingAgreementPreview() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">LLC OPERATING AGREEMENT</h2>

      <p className="text-center">
        <strong>[COMPANY NAME], LLC</strong>
        <br />A [STATE] Limited Liability Company
      </p>

      <p>
        This Limited Liability Company Operating Agreement (the "Agreement") is made and entered into as of [DATE] (the
        "Effective Date") by and among the Members listed on Schedule A attached hereto.
      </p>

      <p>
        <strong>ARTICLE I - ORGANIZATION</strong>
      </p>

      <p>
        <strong>1.1 Formation.</strong> The Members have formed a limited liability company under the name [COMPANY
        NAME], LLC (the "Company") on [DATE] by filing the Articles of Organization with the [STATE] Secretary of State
        in accordance with the [STATE] Limited Liability Company Act (the "Act"). The rights and obligations of the
        Members shall be as provided in the Act except as otherwise expressly provided in this Agreement.
      </p>

      <p>
        <strong>1.2 Name.</strong> The business of the Company shall be conducted under the name [COMPANY NAME], LLC or
        such other name as the Members may determine.
      </p>

      <p>
        <strong>1.3 Principal Place of Business.</strong> The principal place of business of the Company shall be
        located at [ADDRESS], or such other place as the Members may determine.
      </p>

      <p>
        <strong>1.4 Purpose.</strong> The purpose of the Company is to engage in any lawful act or activity for which
        limited liability companies may be formed under the Act.
      </p>

      <div className="text-center text-sm text-muted-foreground mt-8 border-t pt-4">
        <p>
          This is a preview of the template. Additional articles include: Members, Management, Distributions, Tax
          Provisions, Transfer Restrictions, Dissolution, and more.
        </p>
      </div>
    </div>
  )
}

function PrivacyPolicyPreview() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">PRIVACY POLICY</h2>

      <p>Last Updated: [DATE]</p>

      <p>
        This Privacy Policy describes how [COMPANY NAME] ("we," "us," or "our") collects, uses, and discloses your
        personal information when you visit our website [WEBSITE URL] (the "Site") or use our services.
      </p>

      <p>
        <strong>1. INFORMATION WE COLLECT</strong>
      </p>

      <p>We may collect the following types of information:</p>

      <p>
        <strong>Personal Information:</strong> This includes information that can be used to identify you, such as your
        name, email address, postal address, phone number, and payment information.
      </p>

      <p>
        <strong>Usage Information:</strong> We collect information about how you use our Site and services, including
        your IP address, browser type, referring/exit pages, operating system, date/time stamps, and clickstream data.
      </p>

      <p>
        <strong>2. HOW WE USE YOUR INFORMATION</strong>
      </p>

      <p>We may use the information we collect for various purposes, including:</p>

      <ul className="list-disc pl-8 space-y-2">
        <li>To provide, maintain, and improve our services</li>
        <li>To process transactions and send related information</li>
        <li>To send administrative information, such as updates, security alerts, and support messages</li>
        <li>To respond to your comments, questions, and requests</li>
        <li>To personalize your experience on our Site</li>
        <li>For marketing purposes, such as sending promotional materials</li>
      </ul>

      <div className="text-center text-sm text-muted-foreground mt-8 border-t pt-4">
        <p>
          This is a preview of the template. Additional sections include: Information Sharing, Cookies and Tracking
          Technologies, Your Rights, Security, International Transfers, and more.
        </p>
      </div>
    </div>
  )
}

function TermsOfServicePreview() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">TERMS OF SERVICE</h2>

      <p>Last Updated: [DATE]</p>

      <p>
        Please read these Terms of Service ("Terms") carefully before using [WEBSITE URL] (the "Site") operated by
        [COMPANY NAME] ("we," "us," or "our").
      </p>

      <p>
        By accessing or using the Site, you agree to be bound by these Terms. If you disagree with any part of the
        Terms, you may not access the Site.
      </p>

      <p>
        <strong>1. USE OF THE SITE</strong>
      </p>

      <p>
        <strong>1.1 Eligibility.</strong> You must be at least 18 years old to use our Site. By using our Site, you
        represent and warrant that you are at least 18 years old.
      </p>

      <p>
        <strong>1.2 Account Registration.</strong> To access certain features of the Site, you may be required to
        register for an account. You agree to provide accurate, current, and complete information during the
        registration process and to update such information to keep it accurate, current, and complete.
      </p>

      <p>
        <strong>1.3 Account Security.</strong> You are responsible for safeguarding your password and for all activities
        that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
      </p>

      <p>
        <strong>2. INTELLECTUAL PROPERTY</strong>
      </p>

      <p>
        <strong>2.1 Site Content.</strong> The Site and its original content, features, and functionality are owned by
        [COMPANY NAME] and are protected by international copyright, trademark, patent, trade secret, and other
        intellectual property or proprietary rights laws.
      </p>

      <div className="text-center text-sm text-muted-foreground mt-8 border-t pt-4">
        <p>
          This is a preview of the template. Additional sections include: User Content, Prohibited Uses, Disclaimer of
          Warranties, Limitation of Liability, Indemnification, and more.
        </p>
      </div>
    </div>
  )
}

function IndependentContractorPreview() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">INDEPENDENT CONTRACTOR AGREEMENT</h2>

      <p>
        This Independent Contractor Agreement (the "Agreement") is made and entered into as of [DATE], by and between:
      </p>

      <p>
        <strong>Client:</strong> [CLIENT NAME], with its principal place of business at [ADDRESS] (the "Client"); and
      </p>

      <p>
        <strong>Contractor:</strong> [CONTRACTOR NAME], with its principal place of business at [ADDRESS] (the
        "Contractor").
      </p>

      <p>
        <strong>1. Services.</strong> Contractor agrees to perform the following services for Client (the "Services"):
      </p>

      <p className="pl-4 border-l-2 border-gray-200">[DESCRIPTION OF SERVICES]</p>

      <p>
        <strong>2. Term.</strong> This Agreement shall commence on [START DATE] and shall continue until [END DATE] or
        until terminated as provided herein.
      </p>

      <p>
        <strong>3. Compensation.</strong> Client shall pay Contractor as follows:
      </p>

      <p className="pl-4 border-l-2 border-gray-200">[PAYMENT TERMS, RATES, SCHEDULE]</p>

      <p>
        <strong>4. Independent Contractor Status.</strong> The parties intend that Contractor is an independent
        contractor and not an employee of Client. Contractor shall be responsible for all taxes, insurance, and other
        expenses related to Contractor's business.
      </p>

      <p>
        <strong>5. Equipment and Expenses.</strong> Contractor shall be responsible for providing all equipment, tools,
        materials, and supplies necessary to perform the Services, unless otherwise agreed in writing.
      </p>

      <div className="text-center text-sm text-muted-foreground mt-8 border-t pt-4">
        <p>
          This is a preview of the template. Additional clauses include: Confidentiality, Intellectual Property,
          Representations and Warranties, Termination, Indemnification, and more.
        </p>
      </div>
    </div>
  )
}

function LeaseAgreementPreview() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">LEASE AGREEMENT</h2>

      <p>This Lease Agreement (the "Agreement") is made and entered into as of [DATE], by and between:</p>

      <p>
        <strong>Landlord:</strong> [LANDLORD NAME], with an address at [ADDRESS] (the "Landlord"); and
      </p>

      <p>
        <strong>Tenant:</strong> [TENANT NAME], with an address at [ADDRESS] (the "Tenant").
      </p>

      <p>
        <strong>1. Premises.</strong> Landlord hereby leases to Tenant, and Tenant hereby leases from Landlord, the
        premises located at [PROPERTY ADDRESS] (the "Premises").
      </p>

      <p>
        <strong>2. Term.</strong> The term of this Agreement shall be for [LEASE TERM] beginning on [START DATE] and
        ending on [END DATE] (the "Term").
      </p>

      <p>
        <strong>3. Rent.</strong> Tenant shall pay to Landlord as rent for the Premises the sum of [RENT AMOUNT] per
        month, due on the [DAY] day of each month during the Term.
      </p>

      <p>
        <strong>4. Security Deposit.</strong> Upon execution of this Agreement, Tenant shall deposit with Landlord the
        sum of [DEPOSIT AMOUNT] as a security deposit (the "Security Deposit").
      </p>

      <p>
        <strong>5. Utilities.</strong> Tenant shall be responsible for the payment of the following utilities and
        services to the Premises:
      </p>

      <p className="pl-4 border-l-2 border-gray-200">[LIST OF UTILITIES]</p>

      <div className="text-center text-sm text-muted-foreground mt-8 border-t pt-4">
        <p>
          This is a preview of the template. Additional clauses include: Use of Premises, Maintenance and Repairs, Rules
          and Regulations, Default, Quiet Enjoyment, and more.
        </p>
      </div>
    </div>
  )
}

function TrademarkAssignmentPreview() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">TRADEMARK ASSIGNMENT</h2>

      <p>
        This Trademark Assignment (the "Assignment") is made and entered into as of [DATE] (the "Effective Date"), by
        and between:
      </p>

      <p>
        <strong>Assignor:</strong> [ASSIGNOR NAME], with an address at [ADDRESS] (the "Assignor"); and
      </p>

      <p>
        <strong>Assignee:</strong> [ASSIGNEE NAME], with an address at [ADDRESS] (the "Assignee").
      </p>

      <p>
        <strong>WHEREAS,</strong> Assignor is the owner of the trademark(s) identified in Exhibit A attached hereto (the
        "Trademark(s)"); and
      </p>

      <p>
        <strong>WHEREAS,</strong> Assignor desires to transfer all of its right, title, and interest in and to the
        Trademark(s) to Assignee, and Assignee desires to accept such assignment.
      </p>

      <p>
        <strong>NOW, THEREFORE,</strong> for good and valuable consideration, the receipt and sufficiency of which are
        hereby acknowledged, the parties agree as follows:
      </p>

      <p>
        <strong>1. Assignment.</strong> Assignor hereby irrevocably assigns, transfers, and conveys to Assignee all of
        Assignor's right, title, and interest in and to the Trademark(s), together with the goodwill of the business
        symbolized by the Trademark(s), all registrations and applications therefor, and all rights to sue for past,
        present, and future infringement of the Trademark(s).
      </p>

      <p>
        <strong>2. Consideration.</strong> In consideration for the assignment of the Trademark(s), Assignee shall pay
        to Assignor the sum of [AMOUNT] upon execution of this Assignment.
      </p>

      <div className="text-center text-sm text-muted-foreground mt-8 border-t pt-4">
        <p>
          This is a preview of the template. Additional clauses include: Representations and Warranties, Further
          Assurances, Governing Law, Entire Agreement, and more.
        </p>
      </div>
    </div>
  )
}

function GenericDocumentPreview() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">[DOCUMENT TITLE]</h2>

      <p>This [DOCUMENT TYPE] (the "Agreement") is made and entered into as of [DATE], by and between:</p>

      <p>
        <strong>Party 1:</strong> [PARTY 1 NAME], with an address at [ADDRESS] (the "[PARTY 1 DESIGNATION]"); and
      </p>

      <p>
        <strong>Party 2:</strong> [PARTY 2 NAME], with an address at [ADDRESS] (the "[PARTY 2 DESIGNATION]").
      </p>

      <p>
        <strong>1. [FIRST SECTION TITLE].</strong> [SECTION CONTENT]
      </p>

      <p>
        <strong>2. [SECOND SECTION TITLE].</strong> [SECTION CONTENT]
      </p>

      <p>
        <strong>3. [THIRD SECTION TITLE].</strong> [SECTION CONTENT]
      </p>

      <div className="text-center text-sm text-muted-foreground mt-8 border-t pt-4">
        <p>
          This is a preview of the template. The full document includes additional sections and clauses specific to your
          needs.
        </p>
      </div>
    </div>
  )
}

