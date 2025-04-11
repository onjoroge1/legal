import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function seedEmploymentNew() {
  console.log('Starting new employment templates seed...')

  // Create templates in batch
  const templates = [
    {
      id: 'employment-termination-letter',
      name: 'Employment Termination Letter',
      description: 'Formal letter for terminating an employee',
      type: 'DOCUMENT',
      content: `# EMPLOYMENT TERMINATION LETTER
[CORPORATION_NAME]
[CORPORATION_ADDRESS]
[DATE]

[EMPLOYEE_NAME]
[EMPLOYEE_ADDRESS]

Dear [EMPLOYEE_NAME],

This letter serves as formal notice of the termination of your employment with [CORPORATION_NAME], effective [TERMINATION_DATE].

## TERMINATION DETAILS
Position: [EMPLOYEE_POSITION]
Department: [EMPLOYEE_DEPARTMENT]
Reason for Termination: [TERMINATION_REASON]
Specific Details: [TERMINATION_DETAILS]

## FINAL COMPENSATION
Final Pay Date: [FINAL_PAY_DATE]
Unused Vacation/PTO: [VACATION_PAY]
Severance Pay: [SEVERANCE_PAY]
Benefits Status: [BENEFITS_STATUS]

## COMPANY PROPERTY
Items to Return: [COMPANY_PROPERTY]
Return Deadline: [RETURN_DEADLINE]

## POST-TERMINATION OBLIGATIONS
Non-Compete Terms: [NON_COMPETE_TERMS]
Confidentiality: [CONFIDENTIALITY_TERMS]

## ADDITIONAL INFORMATION
COBRA Information: [COBRA_INFO]
Contact for Questions: [CONTACT_INFO]
Reference Policy: [REFERENCE_POLICY]

Sincerely,
[COMPANY_REPRESENTATIVE]
[CORPORATION_NAME]`
    },
    {
      id: 'new-hire-checklist',
      name: 'New Hire Checklist',
      description: 'Comprehensive checklist for onboarding new employees',
      type: 'DOCUMENT',
      content: `# NEW HIRE CHECKLIST
[CORPORATION_NAME]

## EMPLOYEE INFORMATION
Name: [EMPLOYEE_NAME]
Start Date: [START_DATE]
Position: [EMPLOYEE_POSITION]
Department: [EMPLOYEE_DEPARTMENT]
Supervisor: [SUPERVISOR_NAME]

## PRE-EMPLOYMENT REQUIREMENTS
Forms to Complete:
- [ ] W-4
- [ ] I-9
- [ ] Direct Deposit Authorization
- [ ] Emergency Contact Information
- [ ] Policy Acknowledgments

## EMPLOYMENT AGREEMENTS
- [ ] Confidentiality Agreement
- [ ] Non-Compete Agreement
- [ ] Other Required Agreements

## BENEFITS ENROLLMENT
- [ ] Health Insurance
- [ ] Dental Insurance
- [ ] Vision Insurance
- [ ] 401(k) Enrollment
- [ ] Other Benefits

## IT SETUP
- [ ] Email Account
- [ ] System Access
- [ ] Software Licenses
- [ ] Phone Setup
- [ ] Other IT Requirements

## EQUIPMENT AND WORKSPACE
- [ ] Computer
- [ ] Phone
- [ ] Office Supplies
- [ ] Workspace Setup
- [ ] Security Badge
- [ ] Keys

## TRAINING AND ORIENTATION
- [ ] Company Orientation
- [ ] Department Orientation
- [ ] Job-Specific Training
- [ ] Safety Training
- [ ] Harassment Prevention Training

## FIRST WEEK PLAN
Day 1:
[DAY_1_PLAN]

Week 1:
[WEEK_1_PLAN]

## GOALS AND EXPECTATIONS
30-Day Goals:
[30_DAY_GOALS]

60-Day Goals:
[60_DAY_GOALS]

90-Day Goals:
[90_DAY_GOALS]

## MENTORSHIP
Mentor/Buddy: [MENTOR_NAME]
Mentorship Plan: [MENTORSHIP_PLAN]

## COMPANY COMMUNICATION
- [ ] Team Introduction
- [ ] Department Announcement
- [ ] Company Directory Update
- [ ] Business Cards Ordered
- [ ] Name Plate Ordered

## REVIEW AND SIGNATURE
This checklist has been completed and reviewed by:

________________________
[HR_REPRESENTATIVE]
Date: [DATE]

________________________
[SUPERVISOR]
Date: [DATE]`
    },
    {
      id: 'progressive-discipline-policy',
      name: 'Progressive Discipline Policy',
      description: 'Comprehensive policy outlining steps and procedures for employee discipline',
      type: 'DOCUMENT',
      content: `# PROGRESSIVE DISCIPLINE POLICY
[COMPANY_NAME]

## PURPOSE
[PURPOSE_STATEMENT]

## SCOPE
This policy applies to [EMPLOYEE_TYPES].

## POLICY OVERVIEW
[POLICY_DESCRIPTION]

## IMMEDIATE TERMINATION OFFENSES
[IMMEDIATE_TERMINATION_BEHAVIORS]

## PROGRESSIVE DISCIPLINE STEPS

### 1. Verbal Warning
[VERBAL_WARNING_PROCESS]

### 2. Written Warning
[WRITTEN_WARNING_PROCESS]

### 3. Final Written Warning
[FINAL_WARNING_PROCESS]

### 4. Suspension (If Applicable)
[SUSPENSION_PROCESS]

### 5. Termination
[TERMINATION_PROCESS]

## DOCUMENTATION REQUIREMENTS
[DOCUMENTATION_REQUIREMENTS]

## RETENTION OF DISCIPLINARY RECORDS
[RECORDS_RETENTION]

## ROLES AND RESPONSIBILITIES
[ROLES_RESPONSIBILITIES]

## APPEAL PROCESS
[APPEAL_PROCESS]

## PERFORMANCE IMPROVEMENT PLANS
[PIP_PROCESS]

## FOLLOW-UP PROCEDURES
[FOLLOW_UP_PROCEDURES]

## POLICY ADMINISTRATION
[POLICY_ADMINISTRATION]

## EMPLOYEE RIGHTS
[EMPLOYEE_RIGHTS]

## DISCLAIMER
[DISCLAIMER]

## AT-WILL EMPLOYMENT STATEMENT
[AT_WILL_STATEMENT]

## POLICY COMMUNICATION AND TRAINING
[POLICY_COMMUNICATION]

## POLICY REVIEW AND UPDATES
[POLICY_UPDATES]`
    },
    {
      id: 'remote-work-policy',
      name: 'Remote Work Policy',
      description: 'Policy governing remote work arrangements and requirements',
      type: 'DOCUMENT',
      content: `# REMOTE WORK POLICY
[COMPANY_NAME]

## PURPOSE
[POLICY_PURPOSE]

## ELIGIBILITY
[ELIGIBLE_POSITIONS]

## REMOTE WORK ARRANGEMENTS
Type: [REMOTE_WORK_TYPE]
Duration: [REMOTE_WORK_DURATION]

## APPROVAL PROCESS
[APPROVAL_PROCESS]
Criteria: [APPROVAL_CRITERIA]

## WORK EXPECTATIONS
### Hours and Availability
[WORK_HOURS_EXPECTATIONS]

### Communication
[COMMUNICATION_EXPECTATIONS]

### Time Tracking
[TIME_TRACKING_REQUIREMENTS]

## EQUIPMENT AND TECHNOLOGY
### Company-Provided Equipment
[COMPANY_EQUIPMENT]

### Employee-Provided Equipment
[EMPLOYEE_EQUIPMENT]

### Home Office Requirements
[HOME_OFFICE_REQUIREMENTS]

### Technology Requirements
[TECH_REQUIREMENTS]

## EXPENSES AND REIMBURSEMENT
[EXPENSE_POLICY]

## SECURITY AND CONFIDENTIALITY
[SECURITY_REQUIREMENTS]
[CONFIDENTIALITY_REQUIREMENTS]

## PERFORMANCE MANAGEMENT
[PERFORMANCE_MONITORING]

## IN-PERSON REQUIREMENTS
[IN_PERSON_EXPECTATIONS]

## POLICY MODIFICATIONS
[MODIFICATION_TERMS]

## LOCATION RESTRICTIONS
[LOCATION_RESTRICTIONS]

## PERSONAL RESPONSIBILITIES
[PERSONAL_RESPONSIBILITIES]

## TECHNICAL SUPPORT
[TECH_SUPPORT_PROCEDURES]

## LEGAL CONSIDERATIONS
### Workers' Compensation
[WORKERS_COMP_POLICY]

### Tax Implications
[TAX_IMPLICATIONS]

### Cross-Border Work
[CROSS_BORDER_POLICY]

## TRAINING AND RESOURCES
[TRAINING_RESOURCES]`
    },
    {
      id: 'resignation-letter',
      name: 'Resignation Letter / Carta de Renuncia',
      description: 'Professional letter template for submitting resignation',
      type: 'DOCUMENT',
      content: `# RESIGNATION LETTER
[DATE]

[MANAGER_NAME]
[MANAGER_TITLE]
[COMPANY_NAME]
[COMPANY_ADDRESS]

Dear [MANAGER_NAME],

I am writing to formally notify you of my resignation from my position as [POSITION] in the [DEPARTMENT] department at [COMPANY_NAME], effective [LAST_WORKING_DAY].

[RESIGNATION_REASON]

During my remaining time at [COMPANY_NAME], I am committed to ensuring a smooth transition of my responsibilities. [TRANSITION_ASSISTANCE]

[PROJECT_HANDOVER]

[POSITIVE_EXPERIENCE]

[APPRECIATION_STATEMENT]

I will ensure all company property is returned by my last day, including [COMPANY_PROPERTY]. Please advise on the process for [FINAL_PAY_BENEFITS].

You can reach me at [CONTACT_INFORMATION] for any future correspondence.

Thank you again for the opportunities for growth and development during my time here.

Sincerely,
[EMPLOYEE_NAME]`
    },
    {
      id: 'resume-template',
      name: 'Resume',
      description: 'Professional resume template with customizable sections',
      type: 'DOCUMENT',
      content: `# [FULL_NAME]
[CONTACT_INFORMATION]

## PROFESSIONAL SUMMARY
[PROFESSIONAL_SUMMARY]

## WORK EXPERIENCE
[EMPLOYMENT_HISTORY]

## EDUCATION
[EDUCATION_BACKGROUND]

## CERTIFICATIONS & LICENSES
[CERTIFICATIONS]

## SKILLS
### Technical Skills
[TECHNICAL_SKILLS]

### Soft Skills
[SOFT_SKILLS]

### Languages
[LANGUAGE_SKILLS]

## PROFESSIONAL ASSOCIATIONS
[PROFESSIONAL_ASSOCIATIONS]

## VOLUNTEER EXPERIENCE
[VOLUNTEER_EXPERIENCE]

## AWARDS & RECOGNITION
[AWARDS_RECOGNITION]

## PUBLICATIONS & PRESENTATIONS
[PUBLICATIONS_PRESENTATIONS]

## PROJECTS
[KEY_PROJECTS]

## REFERENCES
[REFERENCES_STATEMENT]`
    },
    {
      id: 'reference-list',
      name: 'Reference List',
      description: 'Professional reference list template for job applications',
      type: 'DOCUMENT',
      content: `# REFERENCE LIST
[APPLICANT_NAME]
[CONTACT_INFORMATION]

## REFERENCES

### Reference 1
Name: [REFERENCE_1_NAME]
Title: [REFERENCE_1_TITLE]
Company: [REFERENCE_1_COMPANY]
Relationship: [REFERENCE_1_RELATIONSHIP]
Duration Known: [REFERENCE_1_DURATION]
Contact: [REFERENCE_1_CONTACT]
Preferred Contact Method: [REFERENCE_1_PREFERRED_METHOD]
Best Time to Contact: [REFERENCE_1_BEST_TIME]
Projects/Achievements: [REFERENCE_1_PROJECTS]
Can Speak To: [REFERENCE_1_CAN_SPEAK_TO]

### Reference 2
Name: [REFERENCE_2_NAME]
Title: [REFERENCE_2_TITLE]
Company: [REFERENCE_2_COMPANY]
Relationship: [REFERENCE_2_RELATIONSHIP]
Duration Known: [REFERENCE_2_DURATION]
Contact: [REFERENCE_2_CONTACT]
Preferred Contact Method: [REFERENCE_2_PREFERRED_METHOD]
Best Time to Contact: [REFERENCE_2_BEST_TIME]
Projects/Achievements: [REFERENCE_2_PROJECTS]
Can Speak To: [REFERENCE_2_CAN_SPEAK_TO]

### Reference 3
Name: [REFERENCE_3_NAME]
Title: [REFERENCE_3_TITLE]
Company: [REFERENCE_3_COMPANY]
Relationship: [REFERENCE_3_RELATIONSHIP]
Duration Known: [REFERENCE_3_DURATION]
Contact: [REFERENCE_3_CONTACT]
Preferred Contact Method: [REFERENCE_3_PREFERRED_METHOD]
Best Time to Contact: [REFERENCE_3_BEST_TIME]
Projects/Achievements: [REFERENCE_3_PROJECTS]
Can Speak To: [REFERENCE_3_CAN_SPEAK_TO]

[CONFIDENTIALITY_STATEMENT]`
    },
    {
      id: 'termination-agreement',
      name: 'Termination Agreement',
      description: 'Comprehensive agreement for employee termination',
      type: 'DOCUMENT',
      content: `# TERMINATION AGREEMENT

This Termination Agreement ("Agreement") is made and entered into as of [DATE] by and between:

[EMPLOYER_NAME]
[EMPLOYER_ADDRESS]
("Employer")

and

[EMPLOYEE_NAME]
[EMPLOYEE_ADDRESS]
("Employee")

## 1. TERMINATION
Employee's employment with Employer will terminate effective [TERMINATION_DATE]. The reason for termination is [TERMINATION_REASON].

## 2. SEVERANCE PAYMENT
Employer agrees to provide Employee with severance in the amount of [SEVERANCE_AMOUNT], payable according to the following schedule: [PAYMENT_SCHEDULE].

## 3. BENEFITS
### 3.1 Continuation of Benefits
[BENEFITS_CONTINUATION]

### 3.2 COBRA
[COBRA_INFORMATION]

## 4. RETURN OF COMPANY PROPERTY
Employee agrees to return all company property by [RETURN_DEADLINE], including but not limited to:
[COMPANY_PROPERTY]

## 5. RESTRICTIVE COVENANTS
### 5.1 Confidentiality
[CONFIDENTIALITY_PROVISIONS]

### 5.2 Non-Disparagement
[NON_DISPARAGEMENT_PROVISIONS]

### 5.3 Non-Solicitation
[NON_SOLICITATION_PROVISIONS]

### 5.4 Non-Compete
[NON_COMPETE_PROVISIONS]

## 6. RELEASE OF CLAIMS
[RELEASE_OF_CLAIMS]

## 7. EXCLUDED CLAIMS
[EXCLUDED_CLAIMS]

## 8. REVOCATION PERIOD
[REVOCATION_PERIOD]

## 9. LEGAL COUNSEL
[LEGAL_COUNSEL_RIGHTS]

## 10. CONSIDERATION
[CONSIDERATION_DETAILS]

## 11. OUTPLACEMENT SERVICES
[OUTPLACEMENT_SERVICES]

## 12. REFERENCES
[REFERENCES_POLICY]

## 13. UNEMPLOYMENT BENEFITS
[UNEMPLOYMENT_BENEFITS]

## 14. FUTURE LITIGATION
[FUTURE_LITIGATION]

## 15. GOVERNING LAW
[GOVERNING_LAW]

## 16. DISPUTE RESOLUTION
[DISPUTE_RESOLUTION]

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

EMPLOYER:
________________________
[EMPLOYER_REPRESENTATIVE]
Title: [REPRESENTATIVE_TITLE]
Date: [SIGNATURE_DATE]

EMPLOYEE:
________________________
[EMPLOYEE_NAME]
Date: [SIGNATURE_DATE]`
    },
    {
      id: 'notice-of-termination',
      name: 'Notice of Termination',
      description: 'Formal notice of employee termination',
      type: 'DOCUMENT',
      content: `# NOTICE OF TERMINATION
[EMPLOYER_NAME]
[EMPLOYER_ADDRESS]
[DATE]

[EMPLOYEE_NAME]
[EMPLOYEE_ADDRESS]

Dear [EMPLOYEE_NAME],

This letter serves as formal notice of the termination of your employment with [EMPLOYER_NAME], effective [TERMINATION_DATE].

## TERMINATION DETAILS
Position: [EMPLOYEE_POSITION]
Department: [EMPLOYEE_DEPARTMENT]
Reason for Termination: [TERMINATION_REASON]
Specific Incidents: [TERMINATION_INCIDENTS]
Prior Warnings: [PRIOR_WARNINGS]

## FINAL COMPENSATION
Final Pay: [FINAL_PAY_DETAILS]
Unused Vacation/PTO: [VACATION_PAYOUT]
Benefits Status: [BENEFITS_STATUS]
COBRA Information: [COBRA_INFO]

## COMPANY PROPERTY
Items to Return: [COMPANY_PROPERTY]
Return Deadline: [RETURN_DEADLINE]
Expense Reimbursements: [EXPENSE_STATUS]

## CONTINUING OBLIGATIONS
[CONTINUING_OBLIGATIONS]

## SEVERANCE
[SEVERANCE_TERMS]

## RE-HIRE ELIGIBILITY
[REHIRE_ELIGIBILITY]

## CONTACT INFORMATION
For questions, please contact: [CONTACT_INFO]

## DELIVERY METHOD
This notice is being delivered: [DELIVERY_METHOD]

## EXIT INTERVIEW
[EXIT_INTERVIEW_INFO]

## UNEMPLOYMENT BENEFITS
[UNEMPLOYMENT_INFO]

Sincerely,
[COMPANY_REPRESENTATIVE]
[EMPLOYER_NAME]`
    }
  ]

  // Create questionnaires in batch
  const questionnaires = [
    {
      id: 'employment-termination-letter-questions',
      name: 'Employment Termination Letter Questionnaire',
      description: 'Questions for creating an employment termination letter',
      templateId: 'employment-termination-letter',
      questions: [
        {
          label: 'What is the full legal name of the company?',
          type: 'text',
          required: true,
          section: 'Company Information'
        },
        {
          label: 'What is the company\'s address?',
          type: 'text',
          required: true,
          section: 'Company Information'
        },
        {
          label: 'What is the date of the termination letter?',
          type: 'date',
          required: true,
          section: 'Company Information'
        },
        {
          label: 'What is the full name of the employee being terminated?',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What is the employee\'s address?',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What is the employee\'s position/title?',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What is the employee\'s department?',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What is the effective date of termination?',
          type: 'date',
          required: true,
          section: 'Termination Details'
        },
        {
          label: 'What is the reason for termination?',
          type: 'select',
          required: true,
          section: 'Termination Details',
          options: [
            { value: 'performance', label: 'Performance' },
            { value: 'misconduct', label: 'Misconduct' },
            { value: 'layoff', label: 'Layoff' },
            { value: 'other', label: 'Other' }
          ]
        },
        {
          label: 'If for cause, what specific policy violations or performance issues led to termination?',
          type: 'textarea',
          required: false,
          section: 'Termination Details'
        },
        {
          label: 'If a layoff, what business circumstances necessitated the termination?',
          type: 'textarea',
          required: false,
          section: 'Termination Details'
        },
        {
          label: 'What prior warnings or disciplinary actions were issued?',
          type: 'textarea',
          required: false,
          section: 'Termination Details'
        },
        {
          label: 'What final pay will the employee receive and when?',
          type: 'text',
          required: true,
          section: 'Final Compensation'
        },
        {
          label: 'Will the employee receive payment for unused vacation or PTO?',
          type: 'select',
          required: true,
          section: 'Final Compensation',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          label: 'What happens to the employee\'s benefits upon termination?',
          type: 'textarea',
          required: true,
          section: 'Final Compensation'
        },
        {
          label: 'Is the employee eligible for severance pay? If so, what are the terms?',
          type: 'textarea',
          required: true,
          section: 'Final Compensation'
        },
        {
          label: 'Is the employee eligible for unemployment benefits?',
          type: 'select',
          required: true,
          section: 'Final Compensation',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          label: 'What company property must be returned?',
          type: 'textarea',
          required: true,
          section: 'Company Property'
        },
        {
          label: 'What is the deadline for returning company property?',
          type: 'date',
          required: true,
          section: 'Company Property'
        },
        {
          label: 'What are the terms of any non-compete or confidentiality agreements that survive termination?',
          type: 'textarea',
          required: true,
          section: 'Post-Termination Obligations'
        },
        {
          label: 'What is the status of any pending expense reimbursements?',
          type: 'textarea',
          required: true,
          section: 'Final Compensation'
        },
        {
          label: 'Will the company provide a reference?',
          type: 'select',
          required: true,
          section: 'Additional Information',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          label: 'What information about COBRA continuation coverage should be included?',
          type: 'textarea',
          required: true,
          section: 'Additional Information'
        },
        {
          label: 'Who should the employee contact with questions about final pay or benefits?',
          type: 'text',
          required: true,
          section: 'Additional Information'
        },
        {
          label: 'Is the termination letter being delivered in person, by mail, or electronically?',
          type: 'select',
          required: true,
          section: 'Additional Information',
          options: [
            { value: 'in-person', label: 'In Person' },
            { value: 'mail', label: 'Mail' },
            { value: 'electronic', label: 'Electronically' }
          ]
        }
      ]
    },
    {
      id: 'new-hire-checklist-questions',
      name: 'New Hire Checklist Questionnaire',
      description: 'Questions for creating a new hire checklist',
      templateId: 'new-hire-checklist',
      questions: [
        {
          label: 'What is the full name of the new employee?',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What is the employee\'s start date?',
          type: 'date',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What is the employee\'s position/title?',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What department will the employee work in?',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'Who is the employee\'s supervisor/manager?',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What forms must be completed before the start date?',
          type: 'multiselect',
          required: true,
          section: 'Pre-Employment Requirements',
          options: [
            { value: 'w4', label: 'W-4' },
            { value: 'i9', label: 'I-9' },
            { value: 'direct-deposit', label: 'Direct Deposit' },
            { value: 'emergency-contact', label: 'Emergency Contact' },
            { value: 'policy-acknowledgment', label: 'Policy Acknowledgment' }
          ]
        },
        {
          label: 'What company policies must be reviewed and acknowledged?',
          type: 'multiselect',
          required: true,
          section: 'Pre-Employment Requirements',
          options: [
            { value: 'code-of-conduct', label: 'Code of Conduct' },
            { value: 'harassment', label: 'Harassment Prevention' },
            { value: 'safety', label: 'Safety' },
            { value: 'it-security', label: 'IT Security' },
            { value: 'social-media', label: 'Social Media' }
          ]
        },
        {
          label: 'What employment agreements must be signed?',
          type: 'multiselect',
          required: true,
          section: 'Employment Agreements',
          options: [
            { value: 'confidentiality', label: 'Confidentiality Agreement' },
            { value: 'non-compete', label: 'Non-Compete Agreement' },
            { value: 'ip-assignment', label: 'IP Assignment Agreement' }
          ]
        },
        {
          label: 'What benefits enrollment forms need to be completed?',
          type: 'multiselect',
          required: true,
          section: 'Benefits Enrollment',
          options: [
            { value: 'health', label: 'Health Insurance' },
            { value: 'dental', label: 'Dental Insurance' },
            { value: 'vision', label: 'Vision Insurance' },
            { value: '401k', label: '401(k) Enrollment' },
            { value: 'life', label: 'Life Insurance' }
          ]
        },
        {
          label: 'What IT accounts need to be set up?',
          type: 'multiselect',
          required: true,
          section: 'IT Setup',
          options: [
            { value: 'email', label: 'Email Account' },
            { value: 'vpn', label: 'VPN Access' },
            { value: 'intranet', label: 'Intranet Access' },
            { value: 'phone', label: 'Phone System' },
            { value: 'software', label: 'Software Licenses' }
          ]
        },
        {
          label: 'What equipment needs to be ordered or prepared?',
          type: 'multiselect',
          required: true,
          section: 'Equipment and Workspace',
          options: [
            { value: 'computer', label: 'Computer' },
            { value: 'monitor', label: 'Monitor(s)' },
            { value: 'phone', label: 'Phone' },
            { value: 'headset', label: 'Headset' },
            { value: 'office-supplies', label: 'Office Supplies' }
          ]
        },
        {
          label: 'What workspace preparations are needed?',
          type: 'textarea',
          required: true,
          section: 'Equipment and Workspace'
        },
        {
          label: 'What orientation or training sessions should be scheduled?',
          type: 'multiselect',
          required: true,
          section: 'Training and Orientation',
          options: [
            { value: 'company', label: 'Company Orientation' },
            { value: 'department', label: 'Department Orientation' },
            { value: 'safety', label: 'Safety Training' },
            { value: 'harassment', label: 'Harassment Prevention' },
            { value: 'it-security', label: 'IT Security' }
          ]
        },
        {
          label: 'Who should be notified of the new hire?',
          type: 'multiselect',
          required: true,
          section: 'Company Communication',
          options: [
            { value: 'team', label: 'Team Members' },
            { value: 'department', label: 'Department' },
            { value: 'company', label: 'Company-wide' },
            { value: 'it', label: 'IT Department' },
            { value: 'hr', label: 'HR Department' }
          ]
        },
        {
          label: 'What introductory meetings should be scheduled?',
          type: 'textarea',
          required: true,
          section: 'Training and Orientation'
        },
        {
          label: 'What is the plan for the employee\'s first day?',
          type: 'textarea',
          required: true,
          section: 'First Week Plan'
        },
        {
          label: 'What is the plan for the employee\'s first week?',
          type: 'textarea',
          required: true,
          section: 'First Week Plan'
        },
        {
          label: 'What job-specific training is required?',
          type: 'textarea',
          required: true,
          section: 'Training and Orientation'
        },
        {
          label: 'What company-wide training is required?',
          type: 'multiselect',
          required: true,
          section: 'Training and Orientation',
          options: [
            { value: 'safety', label: 'Safety Training' },
            { value: 'harassment', label: 'Harassment Prevention' },
            { value: 'diversity', label: 'Diversity and Inclusion' },
            { value: 'compliance', label: 'Compliance Training' }
          ]
        },
        {
          label: 'What access credentials need to be issued?',
          type: 'multiselect',
          required: true,
          section: 'Equipment and Workspace',
          options: [
            { value: 'badge', label: 'Security Badge' },
            { value: 'keys', label: 'Keys' },
            { value: 'parking', label: 'Parking Pass' },
            { value: 'building', label: 'Building Access' }
          ]
        },
        {
          label: 'What software licenses need to be assigned?',
          type: 'multiselect',
          required: true,
          section: 'IT Setup',
          options: [
            { value: 'office', label: 'Microsoft Office' },
            { value: 'adobe', label: 'Adobe Creative Suite' },
            { value: 'project', label: 'Project Management' },
            { value: 'crm', label: 'CRM Software' }
          ]
        },
        {
          label: 'What business cards or name plates need to be ordered?',
          type: 'multiselect',
          required: true,
          section: 'Company Communication',
          options: [
            { value: 'business-cards', label: 'Business Cards' },
            { value: 'name-plate', label: 'Name Plate' },
            { value: 'desk-sign', label: 'Desk Sign' }
          ]
        },
        {
          label: 'What company directory information needs to be updated?',
          type: 'multiselect',
          required: true,
          section: 'Company Communication',
          options: [
            { value: 'email', label: 'Email Directory' },
            { value: 'phone', label: 'Phone Directory' },
            { value: 'org-chart', label: 'Organization Chart' },
            { value: 'intranet', label: 'Intranet Profile' }
          ]
        },
        {
          label: 'What mentorship or buddy system will be implemented?',
          type: 'textarea',
          required: true,
          section: 'Mentorship'
        },
        {
          label: 'What 30/60/90 day goals should be established?',
          type: 'textarea',
          required: true,
          section: 'Goals and Expectations'
        }
      ]
    },
    {
      id: 'progressive-discipline-policy-questions',
      name: 'Progressive Discipline Policy Questionnaire',
      description: 'Questions for creating a progressive discipline policy',
      templateId: 'progressive-discipline-policy',
      questions: [
        {
          label: 'What is the company name?',
          type: 'text',
          required: true,
          section: 'Basic Information'
        },
        {
          label: 'What is the purpose statement for the policy?',
          type: 'textarea',
          required: true,
          section: 'Purpose'
        },
        {
          label: 'What types of performance or conduct issues does the policy address?',
          type: 'textarea',
          required: true,
          section: 'Scope'
        },
        {
          label: 'What behaviors might warrant immediate termination, bypassing progressive steps?',
          type: 'textarea',
          required: true,
          section: 'Immediate Termination'
        },
        {
          label: 'What are the steps in the progressive discipline process?',
          type: 'textarea',
          required: true,
          section: 'Process Steps'
        },
        {
          label: 'What does the verbal warning stage include?',
          type: 'textarea',
          required: true,
          section: 'Verbal Warning'
        },
        {
          label: 'What does the written warning stage include?',
          type: 'textarea',
          required: true,
          section: 'Written Warning'
        },
        {
          label: 'What does the final written warning stage include?',
          type: 'textarea',
          required: true,
          section: 'Final Warning'
        },
        {
          label: 'What does the suspension stage include, if applicable?',
          type: 'textarea',
          required: false,
          section: 'Suspension'
        },
        {
          label: 'What does the termination stage include?',
          type: 'textarea',
          required: true,
          section: 'Termination'
        },
        {
          label: 'How long do disciplinary actions remain active in an employee\'s file?',
          type: 'text',
          required: true,
          section: 'Records'
        },
        {
          label: 'Who is responsible for administering the policy?',
          type: 'textarea',
          required: true,
          section: 'Administration'
        },
        {
          label: 'What documentation is required at each stage?',
          type: 'textarea',
          required: true,
          section: 'Documentation'
        },
        {
          label: 'What appeal process is available to employees?',
          type: 'textarea',
          required: true,
          section: 'Appeals'
        },
        {
          label: 'How are performance improvement plans incorporated into the process?',
          type: 'textarea',
          required: true,
          section: 'Performance Improvement'
        },
        {
          label: 'What follow-up procedures exist for each disciplinary stage?',
          type: 'textarea',
          required: true,
          section: 'Follow-up'
        },
        {
          label: 'How is consistent application of the policy ensured?',
          type: 'textarea',
          required: true,
          section: 'Consistency'
        },
        {
          label: 'What role does HR play in the disciplinary process?',
          type: 'textarea',
          required: true,
          section: 'HR Role'
        },
        {
          label: 'What rights do employees have during the disciplinary process?',
          type: 'textarea',
          required: true,
          section: 'Employee Rights'
        },
        {
          label: 'How does the policy apply to different types of employees?',
          type: 'textarea',
          required: true,
          section: 'Application'
        },
        {
          label: 'What disclaimer should be included about the company\'s right to skip steps?',
          type: 'textarea',
          required: true,
          section: 'Disclaimer'
        },
        {
          label: 'What statement about at-will employment should be included?',
          type: 'textarea',
          required: true,
          section: 'At-Will Statement'
        },
        {
          label: 'How will employees be informed about this policy?',
          type: 'textarea',
          required: true,
          section: 'Communication'
        },
        {
          label: 'What training will managers receive on implementing this policy?',
          type: 'textarea',
          required: true,
          section: 'Training'
        },
        {
          label: 'What is the process for reviewing and updating this policy?',
          type: 'textarea',
          required: true,
          section: 'Updates'
        }
      ]
    },
    {
      id: 'remote-work-policy-questions',
      name: 'Remote Work Policy Questionnaire',
      description: 'Questions for creating a remote work policy',
      templateId: 'remote-work-policy',
      questions: [
        {
          label: 'What is the company name?',
          type: 'text',
          required: true,
          section: 'Basic Information'
        },
        {
          label: 'What is the purpose of the remote work policy?',
          type: 'textarea',
          required: true,
          section: 'Purpose'
        },
        {
          label: 'Which positions are eligible for remote work?',
          type: 'textarea',
          required: true,
          section: 'Eligibility'
        },
        {
          label: 'Is remote work full-time, part-time, or occasional?',
          type: 'select',
          required: true,
          section: 'Arrangements',
          options: [
            { value: 'full-time', label: 'Full-time' },
            { value: 'part-time', label: 'Part-time' },
            { value: 'occasional', label: 'Occasional' },
            { value: 'hybrid', label: 'Hybrid' }
          ]
        },
        {
          label: 'What is the approval process for remote work arrangements?',
          type: 'textarea',
          required: true,
          section: 'Approval Process'
        },
        {
          label: 'What criteria are used to approve remote work requests?',
          type: 'textarea',
          required: true,
          section: 'Approval Process'
        },
        {
          label: 'What are the expectations for work hours and availability?',
          type: 'textarea',
          required: true,
          section: 'Work Hours'
        },
        {
          label: 'What are the expectations for communication and responsiveness?',
          type: 'textarea',
          required: true,
          section: 'Communication'
        },
        {
          label: 'How will remote workers track and report their time?',
          type: 'textarea',
          required: true,
          section: 'Time Tracking'
        },
        {
          label: 'What equipment will the company provide for remote workers?',
          type: 'textarea',
          required: true,
          section: 'Equipment'
        },
        {
          label: 'What equipment must employees provide themselves?',
          type: 'textarea',
          required: true,
          section: 'Equipment'
        },
        {
          label: 'What is the policy on reimbursement for home office expenses?',
          type: 'textarea',
          required: true,
          section: 'Expenses'
        },
        {
          label: 'What are the home office requirements?',
          type: 'textarea',
          required: true,
          section: 'Home Office'
        },
        {
          label: 'What technological requirements must be met?',
          type: 'textarea',
          required: true,
          section: 'Technology'
        },
        {
          label: 'What information security requirements must be followed?',
          type: 'textarea',
          required: true,
          section: 'Security'
        },
        {
          label: 'What is the policy on data protection and confidentiality?',
          type: 'textarea',
          required: true,
          section: 'Security'
        },
        {
          label: 'How will performance be measured and monitored for remote workers?',
          type: 'textarea',
          required: true,
          section: 'Performance'
        },
        {
          label: 'What are the expectations for attendance at in-person meetings or events?',
          type: 'textarea',
          required: true,
          section: 'In-Person Requirements'
        },
        {
          label: 'What circumstances might require temporary in-office work?',
          type: 'textarea',
          required: true,
          section: 'In-Person Requirements'
        },
        {
          label: 'How can a remote work arrangement be modified or terminated?',
          type: 'textarea',
          required: true,
          section: 'Modifications'
        },
        {
          label: 'What is the policy on working from public locations?',
          type: 'textarea',
          required: true,
          section: 'Location'
        },
        {
          label: 'What is the policy on working while traveling?',
          type: 'textarea',
          required: true,
          section: 'Location'
        },
        {
          label: 'What is the policy on childcare or other personal responsibilities during work hours?',
          type: 'textarea',
          required: true,
          section: 'Personal Responsibilities'
        },
        {
          label: 'What training will be provided for remote workers and their managers?',
          type: 'textarea',
          required: true,
          section: 'Training'
        },
        {
          label: 'What are the procedures for addressing technical issues?',
          type: 'textarea',
          required: true,
          section: 'Technical Support'
        },
        {
          label: 'What workers\' compensation and liability considerations apply?',
          type: 'textarea',
          required: true,
          section: 'Legal'
        },
        {
          label: 'What tax implications should employees be aware of?',
          type: 'textarea',
          required: true,
          section: 'Legal'
        },
        {
          label: 'What is the policy on remote work from different states or countries?',
          type: 'textarea',
          required: true,
          section: 'Legal'
        }
      ]
    },
    {
      id: 'resignation-letter-questions',
      name: 'Resignation Letter Questionnaire',
      description: 'Questions for creating a resignation letter',
      templateId: 'resignation-letter',
      questions: [
        {
          label: 'What is the full name of the employee resigning?',
          type: 'text',
          required: true,
          section: 'Personal Information'
        },
        {
          label: 'What is the employee\'s current position/title?',
          type: 'text',
          required: true,
          section: 'Position Details'
        },
        {
          label: 'What is the employee\'s department?',
          type: 'text',
          required: true,
          section: 'Position Details'
        },
        {
          label: 'Who is the letter addressed to? (Manager\'s name and title)',
          type: 'text',
          required: true,
          section: 'Recipient Information'
        },
        {
          label: 'What is the date of the resignation letter?',
          type: 'date',
          required: true,
          section: 'Basic Information'
        },
        {
          label: 'What is the employee\'s last working day?',
          type: 'date',
          required: true,
          section: 'Resignation Details'
        },
        {
          label: 'What is the reason for resignation?',
          type: 'textarea',
          required: false,
          section: 'Resignation Details'
        },
        {
          label: 'What specific projects or responsibilities need to be transferred?',
          type: 'textarea',
          required: true,
          section: 'Transition'
        },
        {
          label: 'Is the employee willing to assist with the transition? If so, how?',
          type: 'textarea',
          required: true,
          section: 'Transition'
        },
        {
          label: 'What positive aspects of the job experience should be mentioned?',
          type: 'textarea',
          required: false,
          section: 'Appreciation'
        },
        {
          label: 'What appreciation should be expressed to the employer?',
          type: 'textarea',
          required: true,
          section: 'Appreciation'
        },
        {
          label: 'What contact information should be provided for future correspondence?',
          type: 'text',
          required: true,
          section: 'Contact Information'
        },
        {
          label: 'What personal belongings need to be retrieved?',
          type: 'textarea',
          required: false,
          section: 'Administrative'
        },
        {
          label: 'What company property needs to be returned?',
          type: 'textarea',
          required: true,
          section: 'Administrative'
        },
        {
          label: 'What information about final pay and benefits would the employee like to request?',
          type: 'textarea',
          required: true,
          section: 'Administrative'
        }
      ]
    },
    {
      id: 'resume-template-questions',
      name: 'Resume Questionnaire',
      description: 'Questions for creating a professional resume',
      templateId: 'resume-template',
      questions: [
        {
          label: 'What is the full name of the individual?',
          type: 'text',
          required: true,
          section: 'Personal Information'
        },
        {
          label: 'What contact information should be included?',
          type: 'textarea',
          required: true,
          section: 'Contact Information'
        },
        {
          label: 'Should a professional summary or objective statement be included?',
          type: 'textarea',
          required: false,
          section: 'Summary'
        },
        {
          label: 'What is the individual\'s employment history?',
          type: 'textarea',
          required: true,
          section: 'Work Experience'
        },
        {
          label: 'What key achievements should be highlighted for each position?',
          type: 'textarea',
          required: true,
          section: 'Work Experience'
        },
        {
          label: 'What educational background should be included?',
          type: 'textarea',
          required: true,
          section: 'Education'
        },
        {
          label: 'What professional certifications or licenses should be included?',
          type: 'textarea',
          required: false,
          section: 'Certifications'
        },
        {
          label: 'What technical skills should be listed?',
          type: 'textarea',
          required: true,
          section: 'Skills'
        },
        {
          label: 'What soft skills should be emphasized?',
          type: 'textarea',
          required: true,
          section: 'Skills'
        },
        {
          label: 'What languages does the individual speak and at what proficiency?',
          type: 'textarea',
          required: false,
          section: 'Skills'
        },
        {
          label: 'What professional associations or memberships should be listed?',
          type: 'textarea',
          required: false,
          section: 'Professional Associations'
        },
        {
          label: 'What volunteer experience should be included?',
          type: 'textarea',
          required: false,
          section: 'Volunteer Experience'
        },
        {
          label: 'What awards or recognitions should be mentioned?',
          type: 'textarea',
          required: false,
          section: 'Awards'
        },
        {
          label: 'What publications or presentations should be listed?',
          type: 'textarea',
          required: false,
          section: 'Publications'
        },
        {
          label: 'What projects should be highlighted?',
          type: 'textarea',
          required: false,
          section: 'Projects'
        },
        {
          label: 'Should references be included or noted as "available upon request"?',
          type: 'select',
          required: true,
          section: 'References',
          options: [
            { value: 'include', label: 'Include References' },
            { value: 'upon-request', label: 'Available Upon Request' },
            { value: 'none', label: 'No Reference Section' }
          ]
        },
        {
          label: 'What is the preferred resume format?',
          type: 'select',
          required: true,
          section: 'Format',
          options: [
            { value: 'chronological', label: 'Chronological' },
            { value: 'functional', label: 'Functional' },
            { value: 'combination', label: 'Combination' }
          ]
        },
        {
          label: 'What industry or position is the resume targeting?',
          type: 'text',
          required: true,
          section: 'Target'
        },
        {
          label: 'Are there specific keywords that should be included for ATS optimization?',
          type: 'textarea',
          required: false,
          section: 'Keywords'
        },
        {
          label: 'What is the preferred resume length?',
          type: 'select',
          required: true,
          section: 'Format',
          options: [
            { value: '1-page', label: '1 Page' },
            { value: '2-page', label: '2 Pages' },
            { value: '3-page', label: '3 Pages' }
          ]
        }
      ]
    },
    {
      id: 'reference-list-questions',
      name: 'Reference List Questionnaire',
      description: 'Questions for creating a professional reference list',
      templateId: 'reference-list',
      questions: [
        {
          label: 'What is the full name of the job applicant?',
          type: 'text',
          required: true,
          section: 'Applicant Information'
        },
        {
          label: 'What contact information should be included for the applicant?',
          type: 'textarea',
          required: true,
          section: 'Applicant Information'
        },
        {
          label: 'How many references should be included?',
          type: 'select',
          required: true,
          section: 'References',
          options: [
            { value: '3', label: '3 References' },
            { value: '4', label: '4 References' },
            { value: '5', label: '5 References' }
          ]
        },
        {
          label: 'For each reference, what is their full name?',
          type: 'textarea',
          required: true,
          section: 'References'
        },
        {
          label: 'For each reference, what is their current job title?',
          type: 'textarea',
          required: true,
          section: 'References'
        },
        {
          label: 'For each reference, what company do they work for?',
          type: 'textarea',
          required: true,
          section: 'References'
        },
        {
          label: 'For each reference, what is their relationship to the applicant?',
          type: 'textarea',
          required: true,
          section: 'References'
        },
        {
          label: 'For each reference, how long have they known the applicant?',
          type: 'textarea',
          required: true,
          section: 'References'
        },
        {
          label: 'For each reference, what is their phone number?',
          type: 'textarea',
          required: true,
          section: 'References'
        },
        {
          label: 'For each reference, what is their email address?',
          type: 'textarea',
          required: true,
          section: 'References'
        },
        {
          label: 'For each reference, what is their preferred contact method?',
          type: 'textarea',
          required: true,
          section: 'References'
        },
        {
          label: 'For each reference, what is the best time to contact them?',
          type: 'textarea',
          required: true,
          section: 'References'
        },
        {
          label: 'Has each reference been notified that they may be contacted?',
          type: 'select',
          required: true,
          section: 'References',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          label: 'Are there any specific projects or achievements the applicant worked on with each reference?',
          type: 'textarea',
          required: false,
          section: 'References'
        },
        {
          label: 'Should the reference list be formatted to match the resume?',
          type: 'select',
          required: true,
          section: 'Formatting',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          label: 'Should a brief statement be included about what each reference can speak to?',
          type: 'select',
          required: true,
          section: 'Formatting',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          label: 'Are there any references from different types of relationships?',
          type: 'textarea',
          required: false,
          section: 'References'
        },
        {
          label: 'Should any references be designated as primary or secondary?',
          type: 'select',
          required: true,
          section: 'References',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          label: 'Should the reference list include a header with the applicant\'s name and contact information?',
          type: 'select',
          required: true,
          section: 'Formatting',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          label: 'Should any statement about confidentiality be included?',
          type: 'select',
          required: true,
          section: 'Formatting',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        }
      ]
    },
    {
      id: 'termination-agreement-questions',
      name: 'Termination Agreement Questionnaire',
      description: 'Questions for creating a termination agreement',
      templateId: 'termination-agreement',
      questions: [
        {
          label: 'What is the full legal name of the employer/company?',
          type: 'text',
          required: true,
          section: 'Employer Information'
        },
        {
          label: 'What is the employer\'s complete address?',
          type: 'textarea',
          required: true,
          section: 'Employer Information'
        },
        {
          label: 'What is the full legal name of the employee being terminated?',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What is the employee\'s address?',
          type: 'textarea',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What is the employee\'s position/title?',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What is the date of the agreement?',
          type: 'date',
          required: true,
          section: 'Basic Information'
        },
        {
          label: 'What is the effective date of termination?',
          type: 'date',
          required: true,
          section: 'Termination Details'
        },
        {
          label: 'What is the stated reason for termination?',
          type: 'textarea',
          required: true,
          section: 'Termination Details'
        },
        {
          label: 'What severance payment will be provided?',
          type: 'textarea',
          required: true,
          section: 'Severance'
        },
        {
          label: 'What is the severance period duration?',
          type: 'text',
          required: true,
          section: 'Severance'
        },
        {
          label: 'What happens to unused vacation, sick leave, or PTO?',
          type: 'textarea',
          required: true,
          section: 'Benefits'
        },
        {
          label: 'What continuation of benefits will be provided?',
          type: 'textarea',
          required: true,
          section: 'Benefits'
        },
        {
          label: 'For how long will benefits continue?',
          type: 'text',
          required: true,
          section: 'Benefits'
        },
        {
          label: 'What COBRA information should be included?',
          type: 'textarea',
          required: true,
          section: 'Benefits'
        },
        {
          label: 'What company property must be returned?',
          type: 'textarea',
          required: true,
          section: 'Property'
        },
        {
          label: 'What deadline exists for returning company property?',
          type: 'date',
          required: true,
          section: 'Property'
        },
        {
          label: 'What confidentiality provisions should be included?',
          type: 'textarea',
          required: true,
          section: 'Restrictions'
        },
        {
          label: 'What non-disparagement provisions should be included?',
          type: 'textarea',
          required: true,
          section: 'Restrictions'
        },
        {
          label: 'What non-solicitation provisions should be included?',
          type: 'textarea',
          required: true,
          section: 'Restrictions'
        },
        {
          label: 'What non-compete provisions should be included?',
          type: 'textarea',
          required: true,
          section: 'Restrictions'
        },
        {
          label: 'What release of claims is the employee providing?',
          type: 'textarea',
          required: true,
          section: 'Release'
        },
        {
          label: 'What claims are excluded from the release?',
          type: 'textarea',
          required: true,
          section: 'Release'
        },
        {
          label: 'What is the revocation period for the agreement?',
          type: 'text',
          required: true,
          section: 'Legal'
        },
        {
          label: 'Does the employee have the right to consult with legal counsel?',
          type: 'select',
          required: true,
          section: 'Legal',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          label: 'Is the employee receiving consideration beyond what they\'re already entitled to?',
          type: 'select',
          required: true,
          section: 'Consideration',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          label: 'Are there any outplacement services being offered?',
          type: 'textarea',
          required: false,
          section: 'Services'
        },
        {
          label: 'What references or service letters will be provided?',
          type: 'textarea',
          required: true,
          section: 'References'
        },
        {
          label: 'What is the policy regarding inquiries from prospective employers?',
          type: 'textarea',
          required: true,
          section: 'References'
        },
        {
          label: 'What provisions address unemployment benefits?',
          type: 'textarea',
          required: true,
          section: 'Benefits'
        },
        {
          label: 'What provisions address future litigation or cooperation?',
          type: 'textarea',
          required: true,
          section: 'Legal'
        },
        {
          label: 'What governing law applies to the agreement?',
          type: 'text',
          required: true,
          section: 'Legal'
        },
        {
          label: 'What dispute resolution method will be used for agreement-related disputes?',
          type: 'textarea',
          required: true,
          section: 'Legal'
        },
        {
          label: 'What signatures are required to execute the agreement?',
          type: 'textarea',
          required: true,
          section: 'Execution'
        }
      ]
    },
    {
      id: 'notice-of-termination-questions',
      name: 'Notice of Termination Questionnaire',
      description: 'Questions for creating a notice of termination',
      templateId: 'notice-of-termination',
      questions: [
        {
          label: 'What is the full legal name of the employer/company?',
          type: 'text',
          required: true,
          section: 'Employer Information'
        },
        {
          label: 'What is the employer\'s complete address?',
          type: 'textarea',
          required: true,
          section: 'Employer Information'
        },
        {
          label: 'What is the full name of the employee being terminated?',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What is the employee\'s address?',
          type: 'textarea',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What is the employee\'s position/title?',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What is the employee\'s department?',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What is the date of the termination notice?',
          type: 'date',
          required: true,
          section: 'Basic Information'
        },
        {
          label: 'What is the effective date of termination?',
          type: 'date',
          required: true,
          section: 'Termination Details'
        },
        {
          label: 'What is the reason for termination?',
          type: 'select',
          required: true,
          section: 'Termination Details',
          options: [
            { value: 'performance', label: 'Performance' },
            { value: 'misconduct', label: 'Misconduct' },
            { value: 'layoff', label: 'Layoff' },
            { value: 'other', label: 'Other' }
          ]
        },
        {
          label: 'If for cause, what specific incidents or violations led to termination?',
          type: 'textarea',
          required: false,
          section: 'Termination Details'
        },
        {
          label: 'What prior warnings or disciplinary actions were issued?',
          type: 'textarea',
          required: false,
          section: 'Termination Details'
        },
        {
          label: 'What is the status of final pay?',
          type: 'textarea',
          required: true,
          section: 'Compensation'
        },
        {
          label: 'Will unused vacation or PTO be paid out? If so, how much?',
          type: 'textarea',
          required: true,
          section: 'Compensation'
        },
        {
          label: 'What happens to employee benefits upon termination?',
          type: 'textarea',
          required: true,
          section: 'Benefits'
        },
        {
          label: 'What COBRA information should be included?',
          type: 'textarea',
          required: true,
          section: 'Benefits'
        },
        {
          label: 'What company property must be returned?',
          type: 'textarea',
          required: true,
          section: 'Property'
        },
        {
          label: 'What is the deadline for returning company property?',
          type: 'date',
          required: true,
          section: 'Property'
        },
        {
          label: 'What is the status of any expense reimbursements?',
          type: 'textarea',
          required: true,
          section: 'Compensation'
        },
        {
          label: 'Are there any continuing obligations?',
          type: 'textarea',
          required: true,
          section: 'Obligations'
        },
        {
          label: 'Will severance be offered? If so, what are the terms?',
          type: 'textarea',
          required: true,
          section: 'Severance'
        },
        {
          label: 'Is the employee eligible for re-hire?',
          type: 'select',
          required: true,
          section: 'Re-hire',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'case-by-case', label: 'Case by Case' }
          ]
        },
        {
          label: 'Who should the employee contact with questions?',
          type: 'textarea',
          required: true,
          section: 'Contact'
        },
        {
          label: 'What is the method of delivery for this notice?',
          type: 'select',
          required: true,
          section: 'Delivery',
          options: [
            { value: 'in-person', label: 'In Person' },
            { value: 'mail', label: 'Mail' },
            { value: 'email', label: 'Email' }
          ]
        },
        {
          label: 'Will an exit interview be conducted?',
          type: 'select',
          required: true,
          section: 'Exit',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          label: 'What information about unemployment benefits should be included?',
          type: 'textarea',
          required: true,
          section: 'Benefits'
        }
      ]
    }
  ]

  try {
    // Create or update templates
    for (const template of templates) {
      await prisma.documentTemplate.upsert({
        where: { id: template.id },
        update: {
          name: template.name,
          description: template.description,
          content: template.content,
          type: template.type,
          categoryId: 'employment'
        },
        create: {
          id: template.id,
          name: template.name,
          description: template.description,
          content: template.content,
          type: template.type,
          categoryId: 'employment'
        }
      })
    }

    // Create or update questionnaires
    for (const questionnaire of questionnaires) {
      await prisma.questionnaire.upsert({
        where: { id: questionnaire.id },
        update: {
          name: questionnaire.name,
          description: questionnaire.description,
          templateId: questionnaire.templateId
        },
        create: {
          id: questionnaire.id,
          name: questionnaire.name,
          description: questionnaire.description,
          templateId: questionnaire.templateId
        }
      })

      // Create or update questions
      for (const question of questionnaire.questions) {
        // First find if the question exists
        const existingQuestion = await prisma.question.findFirst({
          where: {
            questionnaireId: questionnaire.id,
            label: question.label
          }
        });

        const createdQuestion = await prisma.question.upsert({
          where: {
            id: existingQuestion?.id || 'new-question'
          },
          update: {
            type: question.type,
            required: question.required,
            section: question.section
          },
          create: {
            label: question.label,
            type: question.type,
            required: question.required,
            section: question.section,
            questionnaireId: questionnaire.id
          }
        });

        // Create options for select and multiselect questions
        if (question.options) {
          for (const option of question.options) {
            // First find if the option exists
            const existingOption = await prisma.questionOption.findFirst({
              where: {
                questionId: createdQuestion.id,
                value: option.value
              }
            });

            await prisma.questionOption.upsert({
              where: {
                id: existingOption?.id || 'new-option'
              },
              update: {
                label: option.label
              },
              create: {
                value: option.value,
                label: option.label,
                questionId: createdQuestion.id
              }
            });
          }
        }
      }
    }

    console.log('Successfully seeded new employment templates')
  } catch (error) {
    console.error('Error seeding employment templates:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Execute the seed function
seedEmploymentNew()
  .then(() => {
    console.log('Successfully seeded employment templates')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Failed to seed employment templates:', error)
    process.exit(1)
  }) 