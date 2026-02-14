/**
 * Non-Disclosure Agreement Template
 * This is a standard NDA template with variables that will be filled by user input
 * and enhanced by AI with state-specific provisions
 */

export interface NDATemplateData {
  contractDate: string
  state: string
  type: "mutual" | "unilateral"
  disclosingParty: string
  receivingParty: string
  relationship: string
  confidentialInfo: string
  duration: string
  nonSolicitation: "yes" | "no"
  nonCompete: "yes" | "no"
  additional?: string
}

export function getNDATemplate(data: NDATemplateData): string {
  const partyALabel = data.type === "mutual" ? "Party A" : "Disclosing Party"
  const partyBLabel = data.type === "mutual" ? "Party B" : "Receiving Party"
  const partyAName = data.type === "mutual" ? data.disclosingParty : data.disclosingParty
  const partyBName = data.type === "mutual" ? data.receivingParty : data.receivingParty

  const template = `
NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on ${data.contractDate}, between:

${partyAName} ("${partyALabel}")
and
${partyBName} ("${partyBLabel}")

RECITALS

WHEREAS, the parties are engaged in discussions regarding ${data.relationship} (the "Purpose"); and

WHEREAS, in connection with the Purpose, ${partyALabel} may disclose certain confidential and proprietary information to ${partyBLabel}; and

WHEREAS, the parties desire to protect the confidentiality of such information;

NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:

1. DEFINITION OF CONFIDENTIAL INFORMATION

For purposes of this Agreement, "Confidential Information" means all non-public, proprietary, or confidential information disclosed by ${partyALabel} to ${partyBLabel}, whether orally, in writing, or in any other form, including but not limited to:

${data.confidentialInfo}

Confidential Information also includes any notes, analyses, compilations, studies, or other documents prepared by ${partyBLabel} that contain, reflect, or are based upon, in whole or in part, the information furnished to ${partyBLabel} by ${partyALabel}.

2. OBLIGATIONS OF ${partyBLabel.toUpperCase()}

${partyBLabel} agrees to:
(a) Hold and maintain the Confidential Information in strict confidence;
(b) Not disclose the Confidential Information to any third party without the prior written consent of ${partyALabel};
(c) Use the Confidential Information solely for the Purpose and for no other purpose;
(d) Take all reasonable precautions to protect the confidentiality of the Confidential Information;
(e) Not make any copies of the Confidential Information except as necessary for the Purpose; and
(f) Immediately notify ${partyALabel} upon discovery of any unauthorized use or disclosure of the Confidential Information.

${data.type === "mutual" ? `
3. OBLIGATIONS OF ${partyALabel.toUpperCase()}

${partyALabel} agrees to:
(a) Hold and maintain the Confidential Information disclosed by ${partyBLabel} in strict confidence;
(b) Not disclose such Confidential Information to any third party without the prior written consent of ${partyBLabel};
(c) Use such Confidential Information solely for the Purpose and for no other purpose;
(d) Take all reasonable precautions to protect the confidentiality of such Confidential Information; and
(e) Immediately notify ${partyBLabel} upon discovery of any unauthorized use or disclosure of such Confidential Information.

4. EXCLUSIONS FROM CONFIDENTIAL INFORMATION
` : `
3. EXCLUSIONS FROM CONFIDENTIAL INFORMATION
`}

The obligations set forth in Section 2${data.type === "mutual" ? " and Section 3" : ""} shall not apply to information that:
(a) Is or becomes publicly available through no breach of this Agreement by ${partyBLabel}${data.type === "mutual" ? " or " + partyALabel : ""};
(b) Was rightfully known by ${partyBLabel}${data.type === "mutual" ? " or " + partyALabel : ""} prior to disclosure;
(c) Is rightfully received from a third party without breach of any confidentiality obligation;
(d) Is independently developed by ${partyBLabel}${data.type === "mutual" ? " or " + partyALabel : ""} without use of or reference to the Confidential Information; or
(e) Is required to be disclosed by law or court order, provided that ${partyBLabel}${data.type === "mutual" ? " or " + partyALabel : ""} gives ${partyALabel}${data.type === "mutual" ? " or " + partyBLabel : ""} prompt notice of such requirement and cooperates in any effort to obtain a protective order.

${data.type === "mutual" ? "5" : "4"}. RETURN OF MATERIALS

Upon termination of this Agreement or upon written request by ${partyALabel}${data.type === "mutual" ? " or " + partyBLabel : ""}, ${partyBLabel}${data.type === "mutual" ? " and " + partyALabel : ""} shall promptly return or destroy all documents, materials, and other tangible manifestations of Confidential Information and all copies thereof.

${data.type === "mutual" ? "6" : "5"}. TERM AND DURATION

This Agreement shall remain in effect for ${data.duration === "indefinite" ? "an indefinite period" : data.duration}. The obligations of confidentiality set forth herein shall survive termination of this Agreement and shall continue for ${data.duration === "indefinite" ? "an indefinite period" : data.duration} after the date of termination, or until such time as the Confidential Information becomes publicly available through no breach of this Agreement.

${data.type === "mutual" ? "7" : "6"}. REMEDIES AND INJUNCTIVE RELIEF

${partyBLabel}${data.type === "mutual" ? " and " + partyALabel : ""} acknowledges that any breach of this Agreement may cause irreparable harm to ${partyALabel}${data.type === "mutual" ? " or " + partyBLabel : ""} for which monetary damages would be inadequate. Therefore, ${partyALabel}${data.type === "mutual" ? " or " + partyBLabel : ""} shall be entitled to seek injunctive relief and other equitable remedies in addition to any other remedies available at law or in equity.

${data.nonSolicitation === "yes" ? `
${data.type === "mutual" ? "8" : "7"}. NON-SOLICITATION

During the term of this Agreement and for a period of ${data.duration === "indefinite" ? "two (2) years" : data.duration} thereafter, neither party shall, directly or indirectly, solicit, recruit, or hire any employee, consultant, or contractor of the other party without the prior written consent of such other party.
` : ""}

${data.nonCompete === "yes" ? `
${data.nonSolicitation === "yes" ? (data.type === "mutual" ? "9" : "8") : (data.type === "mutual" ? "8" : "7")}. NON-COMPETE

During the term of this Agreement and for a period of ${data.duration === "indefinite" ? "two (2) years" : data.duration} thereafter, ${partyBLabel}${data.type === "mutual" ? " and " + partyALabel : ""} agrees not to engage in any business activity that competes with the business of ${partyALabel}${data.type === "mutual" ? " or " + partyBLabel : ""} in the same geographic area and market segment.

NOTE: Non-compete clauses may not be enforceable in all jurisdictions, including but not limited to California. This clause is included subject to applicable state law.
` : ""}

${data.additional ? `
${getNextSectionNumber(data)}. ADDITIONAL PROVISIONS

${data.additional}
` : ""}

${getFinalSectionNumber(data)}. GOVERNING LAW AND JURISDICTION

This Agreement shall be governed by and construed in accordance with the laws of the State of ${data.state}, without regard to its conflict of law principles. Any disputes arising out of or relating to this Agreement shall be subject to the exclusive jurisdiction of the state and federal courts located in ${data.state}.

${getFinalSectionNumber(data) + 1}. MISCELLANEOUS PROVISIONS

(a) Entire Agreement. This Agreement constitutes the entire agreement between the parties concerning the subject matter hereof and supersedes all prior agreements, understandings, negotiations, and discussions, whether oral or written.

(b) Amendments. This Agreement may not be amended except by a written instrument signed by both parties.

(c) Severability. If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.

(d) Waiver. No waiver of any provision of this Agreement shall be effective unless in writing and signed by the party against whom such waiver is sought to be enforced.

(e) Assignment. This Agreement may not be assigned by either party without the prior written consent of the other party.

(f) Notices. All notices required or permitted under this Agreement shall be in writing and delivered to the addresses set forth above or such other address as may be designated in writing by either party.

(g) Counterparts. This Agreement may be executed in counterparts, each of which shall be deemed an original, but all of which together shall constitute one and the same instrument.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

${partyAName}

By: _________________________
Name: _______________________
Title: ______________________
Date: _______________________

${partyBName}

By: _________________________
Name: _______________________
Title: ______________________
Date: _______________________
`

  return template.trim()
}

function getNextSectionNumber(data: NDATemplateData): number {
  let section = data.type === "mutual" ? 8 : 7
  if (data.nonSolicitation === "yes") section++
  if (data.nonCompete === "yes") section++
  return section
}

function getFinalSectionNumber(data: NDATemplateData): number {
  let section = data.type === "mutual" ? 8 : 7
  if (data.nonSolicitation === "yes") section++
  if (data.nonCompete === "yes") section++
  if (data.additional) section++
  return section
}




