import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function seedEmploymentTemplates() {
  console.log('Starting employment templates seed...')

  // Get or create the Employment & HR category
  const category = await prisma.category.upsert({
    where: { id: 'cm9bh3u2e0000vbcg33mxuc64' },
    update: {
      name: 'Employment & HR',
      slug: 'employment',
      description: 'Employment contracts, offer letters, NDAs, and other HR documents'
    },
    create: {
      id: 'cm9bh3u2e0000vbcg33mxuc64',
      name: 'Employment & HR',
      slug: 'employment',
      description: 'Employment contracts, offer letters, NDAs, and other HR documents'
    }
  })
  console.log('Created/Updated category:', category.name)

  const templates = [
    {
      id: 'cm9bh3u2e0001vbcg33mxuc65',
      name: 'Employee Handbook',
      description: 'Comprehensive guide to company policies and procedures',
      content: `# EMPLOYEE HANDBOOK

## COMPANY OVERVIEW
Company Name: [COMPANY_NAME]
Mission Statement: [MISSION_STATEMENT]
Core Values: [CORE_VALUES]
Company History: [COMPANY_HISTORY]
Organizational Structure: [ORGANIZATIONAL_STRUCTURE]

## EMPLOYMENT POLICIES
At-Will Employment: [AT_WILL_STATEMENT]
Equal Employment Opportunity: [EEO_STATEMENT]
Anti-Harassment and Discrimination: [ANTI_HARASSMENT_POLICY]

## WORK SCHEDULE AND CONDITIONS
Standard Working Hours: [WORKING_HOURS]
Meal and Break Policy: [MEAL_BREAK_POLICY]
Attendance and Punctuality: [ATTENDANCE_POLICY]
Dress Code: [DRESS_CODE]

## TIME OFF AND LEAVE
Paid Time Off (PTO): [PTO_POLICY]
Company Holidays: [HOLIDAYS]
Sick Leave: [SICK_LEAVE_POLICY]
Time Off Request Procedure: [TIME_OFF_REQUEST]
Family and Medical Leave: [FMLA_POLICY]
Other Leave Types: [OTHER_LEAVE]

## BENEFITS
Health Insurance: [HEALTH_INSURANCE]
Retirement Benefits: [RETIREMENT_BENEFITS]
Other Benefits: [OTHER_BENEFITS]

## COMPENSATION
Pay Schedule: [PAY_SCHEDULE]
Overtime Policy: [OVERTIME_POLICY]

## PERFORMANCE AND DEVELOPMENT
Performance Reviews: [PERFORMANCE_REVIEWS]
Promotion and Transfer: [PROMOTION_POLICY]
Employee Development: [DEVELOPMENT_POLICY]

## DISCIPLINE AND TERMINATION
Disciplinary Procedure: [DISCIPLINARY_PROCEDURE]
Grounds for Termination: [TERMINATION_GROUNDS]
Resignation Procedure: [RESIGNATION_PROCEDURE]

## WORKPLACE POLICIES
Confidentiality: [CONFIDENTIALITY_POLICY]
Conflict of Interest: [CONFLICT_INTEREST_POLICY]
Company Property: [COMPANY_PROPERTY_POLICY]
Communication Systems: [COMMUNICATION_POLICY]
Social Media: [SOCIAL_MEDIA_POLICY]
Drug and Alcohol: [DRUG_ALCOHOL_POLICY]
Workplace Safety: [SAFETY_POLICY]
Emergency Procedures: [EMERGENCY_PROCEDURES]
Workplace Violence: [VIOLENCE_POLICY]
Visitors: [VISITORS_POLICY]
Employee Relationships: [EMPLOYEE_RELATIONSHIPS]

## ACKNOWLEDGMENT
Employee Acknowledgment: [EMPLOYEE_ACKNOWLEDGMENT]
Handbook Revision Disclaimer: [HANDBOOK_DISCLAIMER]`
    },
    {
      id: 'cm9bh3u2e0002vbcg33mxuc66',
      name: 'Employee Privacy Policy',
      description: 'Policy outlining how employee personal information is handled',
      content: `# EMPLOYEE PRIVACY POLICY

## COMPANY INFORMATION
Company Name: [COMPANY_NAME]

## INFORMATION COLLECTION
Types of Information: [INFORMATION_TYPES]
Collection Methods: [COLLECTION_METHODS]
Collection Purpose: [COLLECTION_PURPOSE]

## INFORMATION USAGE
Usage of Information: [INFORMATION_USAGE]
Internal Access: [INTERNAL_ACCESS]
Third-Party Sharing: [THIRD_PARTY_SHARING]
Retention Period: [RETENTION_PERIOD]

## SECURITY MEASURES
Security Protocols: [SECURITY_PROTOCOLS]

## MONITORING POLICIES
Email Monitoring: [EMAIL_MONITORING]
Internet Usage: [INTERNET_MONITORING]
Telephone/Voicemail: [TELEPHONE_MONITORING]
Video Surveillance: [VIDEO_SURVEILLANCE]
Location Tracking: [LOCATION_TRACKING]
Biometric Data: [BIOMETRIC_DATA]
Drug Testing: [DRUG_TESTING]
Background Checks: [BACKGROUND_CHECKS]

## EMPLOYEE RIGHTS
Access to Files: [FILE_ACCESS]
Information Correction: [INFORMATION_CORRECTION]
Privacy Concerns: [PRIVACY_CONCERNS]

## POLICY ADMINISTRATION
Privacy Officer: [PRIVACY_OFFICER]
Policy Updates: [POLICY_UPDATES]
Violation Consequences: [VIOLATION_CONSEQUENCES]

## SPECIAL PROVISIONS
Sensitive Information: [SENSITIVE_INFORMATION]
Legal Compliance: [LEGAL_COMPLIANCE]`
    },
    {
      id: 'cm9bh3u2e0003vbcg33mxuc67',
      name: 'Employee Warning Letter',
      description: 'Formal documentation of employee performance or conduct issues',
      content: `# EMPLOYEE WARNING LETTER

## EMPLOYEE INFORMATION
Employee Name: [EMPLOYEE_NAME]
Position: [EMPLOYEE_POSITION]
Department: [EMPLOYEE_DEPARTMENT]
Supervisor: [EMPLOYEE_SUPERVISOR]
Date: [WARNING_DATE]

## WARNING DETAILS
Warning Type: [WARNING_TYPE]
Previous Warnings: [PREVIOUS_WARNINGS]
Policy Violation: [POLICY_VIOLATION]
Incident Description: [INCIDENT_DESCRIPTION]
Impact: [INCIDENT_IMPACT]

## EXPECTATIONS AND TIMELINE
Future Expectations: [FUTURE_EXPECTATIONS]
Improvement Timeline: [IMPROVEMENT_TIMELINE]
Consequences: [CONSEQUENCES]
Support Provided: [SUPPORT_PROVIDED]

## FOLLOW-UP
Follow-up Meeting: [FOLLOW_UP_MEETING]
Performance Improvement Plan: [PIP_DETAILS]
Probation Period: [PROBATION_PERIOD]
Required Training: [REQUIRED_TRAINING]

## ACKNOWLEDGMENT
Employee Response: [EMPLOYEE_RESPONSE]
Employee Signature: [EMPLOYEE_SIGNATURE]
Distribution: [LETTER_DISTRIBUTION]
Company Form: [COMPANY_FORM]`
    },
    {
      id: 'cm9bh3u2e0004vbcg33mxuc68',
      name: 'Employment Offer Letter',
      description: 'Formal job offer with terms and conditions of employment',
      content: `# EMPLOYMENT OFFER LETTER

## COMPANY INFORMATION
Company Name: [COMPANY_NAME]
Company Address: [COMPANY_ADDRESS]
Date: [OFFER_DATE]

## CANDIDATE INFORMATION
Candidate Name: [CANDIDATE_NAME]
Candidate Address: [CANDIDATE_ADDRESS]

## POSITION DETAILS
Position: [POSITION_TITLE]
Department: [DEPARTMENT]
Reporting To: [REPORTING_TO]
Employment Type: [EMPLOYMENT_TYPE]
Overtime Status: [OVERTIME_STATUS]
Start Date: [START_DATE]

## COMPENSATION
Salary/Wage: [SALARY_WAGE]
Payment Frequency: [PAYMENT_FREQUENCY]
Bonuses/Commissions: [BONUSES_COMMISSIONS]

## BENEFITS
Benefits Offered: [BENEFITS_OFFERED]
Eligibility Date: [BENEFITS_ELIGIBILITY]

## ADDITIONAL TERMS
Probationary Period: [PROBATIONARY_PERIOD]
Relocation Assistance: [RELOCATION_ASSISTANCE]
Offer Contingencies: [OFFER_CONTINGENCIES]
Additional Agreements: [ADDITIONAL_AGREEMENTS]

## ACCEPTANCE
Acceptance Deadline: [ACCEPTANCE_DEADLINE]
Acceptance Method: [ACCEPTANCE_METHOD]
At-Will Disclaimer: [AT_WILL_DISCLAIMER]

## ONBOARDING
Orientation Process: [ORIENTATION_PROCESS]
Contact Information: [CONTACT_INFORMATION]
Working Hours: [WORKING_HOURS]`
    }
  ]

  const questionnaires = [
    {
      id: 'employee-handbook-questions',
      name: 'Employee Handbook Questionnaire',
      description: 'Questions for creating an employee handbook',
      templateId: 'cm9bh3u2e0001vbcg33mxuc65',
      questions: [
        {
          label: 'What is the company name?',
          type: 'text',
          required: true,
          section: 'Company Overview'
        },
        {
          label: 'What is the company\'s mission statement?',
          type: 'textarea',
          required: true,
          section: 'Company Overview'
        },
        {
          label: 'What are the company\'s core values?',
          type: 'textarea',
          required: true,
          section: 'Company Overview'
        },
        {
          label: 'What is the company\'s history? (Brief overview)',
          type: 'textarea',
          required: true,
          section: 'Company Overview'
        },
        {
          label: 'What is the organizational structure of the company?',
          type: 'textarea',
          required: true,
          section: 'Company Overview'
        },
        {
          label: 'What is the at-will employment statement?',
          type: 'textarea',
          required: true,
          section: 'Employment Policies'
        },
        {
          label: 'What equal employment opportunity statement should be included?',
          type: 'textarea',
          required: true,
          section: 'Employment Policies'
        },
        {
          label: 'What is the company\'s anti-harassment and discrimination policy?',
          type: 'textarea',
          required: true,
          section: 'Employment Policies'
        },
        {
          label: 'What are the company\'s standard working hours?',
          type: 'text',
          required: true,
          section: 'Work Schedule and Conditions'
        },
        {
          label: 'What is the meal and break policy?',
          type: 'textarea',
          required: true,
          section: 'Work Schedule and Conditions'
        },
        {
          label: 'What is the attendance and punctuality policy?',
          type: 'textarea',
          required: true,
          section: 'Work Schedule and Conditions'
        },
        {
          label: 'What is the dress code policy?',
          type: 'textarea',
          required: true,
          section: 'Work Schedule and Conditions'
        },
        {
          label: 'What is the company\'s paid time off (PTO) policy?',
          type: 'textarea',
          required: true,
          section: 'Time Off and Leave'
        },
        {
          label: 'What holidays does the company observe?',
          type: 'textarea',
          required: true,
          section: 'Time Off and Leave'
        },
        {
          label: 'What is the sick leave policy?',
          type: 'textarea',
          required: true,
          section: 'Time Off and Leave'
        },
        {
          label: 'What is the policy for requesting time off?',
          type: 'textarea',
          required: true,
          section: 'Time Off and Leave'
        },
        {
          label: 'What family and medical leave benefits are offered?',
          type: 'textarea',
          required: true,
          section: 'Time Off and Leave'
        },
        {
          label: 'What other types of leave are available? (Bereavement, jury duty, military, etc.)',
          type: 'textarea',
          required: true,
          section: 'Time Off and Leave'
        },
        {
          label: 'What health insurance benefits are offered?',
          type: 'textarea',
          required: true,
          section: 'Benefits'
        },
        {
          label: 'What retirement benefits are offered?',
          type: 'textarea',
          required: true,
          section: 'Benefits'
        },
        {
          label: 'What other benefits are provided? (Life insurance, disability, etc.)',
          type: 'textarea',
          required: true,
          section: 'Benefits'
        },
        {
          label: 'What is the pay schedule and method of payment?',
          type: 'textarea',
          required: true,
          section: 'Compensation'
        },
        {
          label: 'What is the overtime policy?',
          type: 'textarea',
          required: true,
          section: 'Compensation'
        },
        {
          label: 'What is the performance review process and schedule?',
          type: 'textarea',
          required: true,
          section: 'Performance and Development'
        },
        {
          label: 'What is the promotion and transfer policy?',
          type: 'textarea',
          required: true,
          section: 'Performance and Development'
        },
        {
          label: 'What is the employee development and training policy?',
          type: 'textarea',
          required: true,
          section: 'Performance and Development'
        },
        {
          label: 'What is the disciplinary procedure?',
          type: 'textarea',
          required: true,
          section: 'Discipline and Termination'
        },
        {
          label: 'What are the grounds for immediate termination?',
          type: 'textarea',
          required: true,
          section: 'Discipline and Termination'
        },
        {
          label: 'What is the resignation procedure?',
          type: 'textarea',
          required: true,
          section: 'Discipline and Termination'
        },
        {
          label: 'What is the policy on confidentiality and non-disclosure?',
          type: 'textarea',
          required: true,
          section: 'Workplace Policies'
        },
        {
          label: 'What is the conflict of interest policy?',
          type: 'textarea',
          required: true,
          section: 'Work Workplace Policies'
        },
        {
          label: 'What is the policy on company property and equipment?',
          type: 'textarea',
          required: true,
          section: 'Workplace Policies'
        },
        {
          label: 'What is the communication systems policy? (Email, internet, phone use)',
          type: 'textarea',
          required: true,
          section: 'Workplace Policies'
        },
        {
          label: 'What is the social media policy?',
          type: 'textarea',
          required: true,
          section: 'Workplace Policies'
        },
        {
          label: 'What is the drug and alcohol policy?',
          type: 'textarea',
          required: true,
          section: 'Workplace Policies'
        },
        {
          label: 'What is the workplace safety policy?',
          type: 'textarea',
          required: true,
          section: 'Workplace Policies'
        },
        {
          label: 'What are the emergency procedures?',
          type: 'textarea',
          required: true,
          section: 'Workplace Policies'
        },
        {
          label: 'What is the policy on workplace violence?',
          type: 'textarea',
          required: true,
          section: 'Workplace Policies'
        },
        {
          label: 'What is the policy on visitors in the workplace?',
          type: 'textarea',
          required: true,
          section: 'Workplace Policies'
        },
        {
          label: 'What is the policy on employee relationships?',
          type: 'textarea',
          required: true,
          section: 'Workplace Policies'
        },
        {
          label: 'What acknowledgment statement should employees sign?',
          type: 'textarea',
          required: true,
          section: 'Acknowledgment'
        },
        {
          label: 'What disclaimer should be included about handbook revisions?',
          type: 'textarea',
          required: true,
          section: 'Acknowledgment'
        }
      ]
    },
    {
      id: 'employee-privacy-policy-questions',
      name: 'Employee Privacy Policy Questionnaire',
      description: 'Questions for creating an employee privacy policy',
      templateId: 'cm9bh3u2e0002vbcg33mxuc66',
      questions: [
        {
          label: 'What is the company name?',
          type: 'text',
          required: true,
          section: 'Company Information'
        },
        {
          label: 'What types of personal information does the company collect from employees?',
          type: 'textarea',
          required: true,
          section: 'Information Collection'
        },
        {
          label: 'How is employee personal information collected?',
          type: 'textarea',
          required: true,
          section: 'Information Collection'
        },
        {
          label: 'What is the purpose for collecting employee personal information?',
          type: 'textarea',
          required: true,
          section: 'Information Collection'
        },
        {
          label: 'How is employee personal information used?',
          type: 'textarea',
          required: true,
          section: 'Information Usage'
        },
        {
          label: 'Who has access to employee personal information within the company?',
          type: 'textarea',
          required: true,
          section: 'Information Usage'
        },
        {
          label: 'Under what circumstances might employee information be shared with third parties?',
          type: 'textarea',
          required: true,
          section: 'Information Usage'
        },
        {
          label: 'How long is employee personal information retained?',
          type: 'textarea',
          required: true,
          section: 'Information Usage'
        },
        {
          label: 'What security measures are in place to protect employee information?',
          type: 'textarea',
          required: true,
          section: 'Security Measures'
        },
        {
          label: 'What is the company\'s policy on email monitoring?',
          type: 'textarea',
          required: true,
          section: 'Monitoring Policies'
        },
        {
          label: 'What is the company\'s policy on internet usage monitoring?',
          type: 'textarea',
          required: true,
          section: 'Monitoring Policies'
        },
        {
          label: 'What is the company\'s policy on telephone/voicemail monitoring?',
          type: 'textarea',
          required: true,
          section: 'Monitoring Policies'
        },
        {
          label: 'What is the company\'s policy on video surveillance?',
          type: 'textarea',
          required: true,
          section: 'Monitoring Policies'
        },
        {
          label: 'What is the company\'s policy on GPS or location tracking?',
          type: 'textarea',
          required: true,
          section: 'Monitoring Policies'
        },
        {
          label: 'What is the company\'s policy on biometric data collection?',
          type: 'textarea',
          required: true,
          section: 'Monitoring Policies'
        },
        {
          label: 'What is the company\'s policy on drug testing?',
          type: 'textarea',
          required: true,
          section: 'Monitoring Policies'
        },
        {
          label: 'What is the company\'s policy on background checks?',
          type: 'textarea',
          required: true,
          section: 'Monitoring Policies'
        },
        {
          label: 'What access do employees have to their personnel files?',
          type: 'textarea',
          required: true,
          section: 'Employee Rights'
        },
        {
          label: 'How can employees request corrections to their personal information?',
          type: 'textarea',
          required: true,
          section: 'Employee Rights'
        },
        {
          label: 'What is the procedure for reporting privacy concerns or violations?',
          type: 'textarea',
          required: true,
          section: 'Employee Rights'
        },
        {
          label: 'Who is responsible for overseeing employee privacy?',
          type: 'text',
          required: true,
          section: 'Policy Administration'
        },
        {
          label: 'How will employees be notified of changes to the privacy policy?',
          type: 'textarea',
          required: true,
          section: 'Policy Administration'
        },
        {
          label: 'What are the consequences for violating the employee privacy policy?',
          type: 'textarea',
          required: true,
          section: 'Policy Administration'
        },
        {
          label: 'What special provisions apply for sensitive personal information?',
          type: 'textarea',
          required: true,
          section: 'Special Provisions'
        },
        {
          label: 'What provisions apply to comply with specific privacy laws? (GDPR, CCPA, etc.)',
          type: 'textarea',
          required: true,
          section: 'Special Provisions'
        }
      ]
    },
    {
      id: 'employee-warning-letter-questions',
      name: 'Employee Warning Letter Questionnaire',
      description: 'Questions for creating an employee warning letter',
      templateId: 'cm9bh3u2e0003vbcg33mxuc67',
      questions: [
        {
          label: 'What is the full name of the employee?',
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
          label: 'Who is the employee\'s supervisor?',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What is the date of the warning?',
          type: 'date',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'Is this a verbal warning, first written warning, final written warning, or other?',
          type: 'select',
          required: true,
          section: 'Warning Details',
          options: {
            create: [
              { value: 'Verbal Warning', label: 'Verbal Warning' },
              { value: 'First Written Warning', label: 'First Written Warning' },
              { value: 'Final Written Warning', label: 'Final Written Warning' },
              { value: 'Other', label: 'Other' }
            ]
          }
        },
        {
          label: 'What previous warnings has the employee received? (Dates and reasons)',
          type: 'textarea',
          required: true,
          section: 'Warning Details'
        },
        {
          label: 'What specific company policy or work rule was violated?',
          type: 'textarea',
          required: true,
          section: 'Warning Details'
        },
        {
          label: 'What specific incident or behavior prompted this warning? (Include dates, times, locations)',
          type: 'textarea',
          required: true,
          section: 'Warning Details'
        },
        {
          label: 'How has this behavior impacted the workplace, coworkers, or business operations?',
          type: 'textarea',
          required: true,
          section: 'Warning Details'
        },
        {
          label: 'What are the specific expectations for future behavior?',
          type: 'textarea',
          required: true,
          section: 'Expectations and Timeline'
        },
        {
          label: 'What is the timeline for improvement?',
          type: 'textarea',
          required: true,
          section: 'Expectations and Timeline'
        },
        {
          label: 'What will happen if the behavior continues or the issue is not resolved?',
          type: 'textarea',
          required: true,
          section: 'Expectations and Timeline'
        },
        {
          label: 'What support or resources will be provided to help the employee improve?',
          type: 'textarea',
          required: true,
          section: 'Expectations and Timeline'
        },
        {
          label: 'Will there be a follow-up meeting? If so, when?',
          type: 'textarea',
          required: true,
          section: 'Follow-up'
        },
        {
          label: 'Is the employee being placed on a performance improvement plan (PIP)?',
          type: 'select',
          required: true,
          section: 'Follow-up',
          options: {
            create: [
              { value: 'Yes', label: 'Yes' },
              { value: 'No', label: 'No' }
            ]
          }
        },
        {
          label: 'Is the employee being placed on probation? If so, for how long?',
          type: 'textarea',
          required: true,
          section: 'Follow-up'
        },
        {
          label: 'Is any specific training required as a result of this incident?',
          type: 'textarea',
          required: true,
          section: 'Follow-up'
        },
        {
          label: 'Does the employee have an opportunity to respond in writing?',
          type: 'select',
          required: true,
          section: 'Acknowledgment',
          options: {
            create: [
              { value: 'Yes', label: 'Yes' },
              { value: 'No', label: 'No' }
            ]
          }
        },
        {
          label: 'What acknowledgment statement should the employee sign?',
          type: 'textarea',
          required: true,
          section: 'Acknowledgment'
        },
        {
          label: 'Who will receive copies of this warning? (HR, personnel file, etc.)',
          type: 'textarea',
          required: true,
          section: 'Acknowledgment'
        },
        {
          label: 'Does the company have a specific form for warning letters?',
          type: 'select',
          required: true,
          section: 'Acknowledgment',
          options: {
            create: [
              { value: 'Yes', label: 'Yes' },
              { value: 'No', label: 'No' }
            ]
          }
        }
      ]
    },
    {
      id: 'employment-offer-letter-questions',
      name: 'Employment Offer Letter Questionnaire',
      description: 'Questions for creating an employment offer letter',
      templateId: 'cm9bh3u2e0004vbcg33mxuc68',
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
          label: 'What is the date of the offer letter?',
          type: 'date',
          required: true,
          section: 'Company Information'
        },
        {
          label: 'What is the full name of the prospective employee?',
          type: 'text',
          required: true,
          section: 'Candidate Information'
        },
        {
          label: 'What is the prospective employee\'s address?',
          type: 'text',
          required: true,
          section: 'Candidate Information'
        },
        {
          label: 'What position is being offered?',
          type: 'text',
          required: true,
          section: 'Position Details'
        },
        {
          label: 'What department will the employee work in?',
          type: 'text',
          required: true,
          section: 'Position Details'
        },
        {
          label: 'Who will the employee report to?',
          type: 'text',
          required: true,
          section: 'Position Details'
        },
        {
          label: 'Is the position full-time or part-time? If part-time, how many hours per week?',
          type: 'textarea',
          required: true,
          section: 'Position Details'
        },
        {
          label: 'Is the position exempt or non-exempt from overtime?',
          type: 'select',
          required: true,
          section: 'Position Details',
          options: {
            create: [
              { value: 'Exempt', label: 'Exempt' },
              { value: 'Non-exempt', label: 'Non-exempt' }
            ]
          }
        },
        {
          label: 'What is the proposed start date?',
          type: 'date',
          required: true,
          section: 'Position Details'
        },
        {
          label: 'What is the offered salary or hourly wage?',
          type: 'text',
          required: true,
          section: 'Compensation'
        },
        {
          label: 'How often will the employee be paid? (Weekly, bi-weekly, monthly)',
          type: 'select',
          required: true,
          section: 'Compensation',
          options: {
            create: [
              { value: 'Weekly', label: 'Weekly' },
              { value: 'Bi-weekly', label: 'Bi-weekly' },
              { value: 'Monthly', label: 'Monthly' }
            ]
          }
        },
        {
          label: 'Will the employee be eligible for bonuses or commissions? If so, what are the terms?',
          type: 'textarea',
          required: true,
          section: 'Compensation'
        },
        {
          label: 'What benefits will be offered and when will the employee become eligible?',
          type: 'textarea',
          required: true,
          section: 'Benefits'
        },
        {
          label: 'Will there be a probationary period? If so, how long?',
          type: 'textarea',
          required: true,
          section: 'Additional Terms'
        },
        {
          label: 'Will relocation assistance be provided? If so, what are the terms?',
          type: 'textarea',
          required: true,
          section: 'Additional Terms'
        },
        {
          label: 'Are there any contingencies to this offer? (Background check, reference check, drug test, etc.)',
          type: 'textarea',
          required: true,
          section: 'Additional Terms'
        },
        {
          label: 'Will the employee be required to sign any additional agreements? (Non-compete, confidentiality, etc.)',
          type: 'textarea',
          required: true,
          section: 'Additional Terms'
        },
        {
          label: 'What is the deadline for accepting the offer?',
          type: 'date',
          required: true,
          section: 'Acceptance'
        },
        {
          label: 'How should the candidate indicate acceptance? (Sign and return, email confirmation, etc.)',
          type: 'textarea',
          required: true,
          section: 'Acceptance'
        },
        {
          label: 'What at-will employment disclaimer should be included?',
          type: 'textarea',
          required: true,
          section: 'Acceptance'
        },
        {
          label: 'Will there be an orientation or onboarding process?',
          type: 'textarea',
          required: true,
          section: 'Onboarding'
        },
        {
          label: 'Who should the candidate contact with questions about the offer?',
          type: 'text',
          required: true,
          section: 'Onboarding'
        },
        {
          label: 'What standard working hours/days are expected?',
          type: 'textarea',
          required: true,
          section: 'Onboarding'
        }
      ]
    }
  ]

  // Create or update the Employee Handbook template
  const employeeHandbook = await prisma.documentTemplate.upsert({
    where: { id: 'cm9bh3u2e0001vbcg33mxuc65' },
    update: {
      categoryId: category.id,
      name: 'Employee Handbook',
      description: 'A comprehensive guide outlining company policies and procedures',
      type: 'DOCUMENT'
    },
    create: {
      id: 'cm9bh3u2e0001vbcg33mxuc65',
      categoryId: category.id,
      name: 'Employee Handbook',
      description: 'A comprehensive guide outlining company policies and procedures',
      type: 'DOCUMENT'
    }
  })

  // Create or update the Offer Letter template
  const offerLetter = await prisma.documentTemplate.upsert({
    where: { id: 'cm9bh3u2e0002vbcg33mxuc66' },
    update: {
      categoryId: category.id,
      name: 'Offer Letter',
      description: 'A formal job offer document outlining employment terms',
      type: 'DOCUMENT'
    },
    create: {
      id: 'cm9bh3u2e0002vbcg33mxuc66',
      categoryId: category.id,
      name: 'Offer Letter',
      description: 'A formal job offer document outlining employment terms',
      type: 'DOCUMENT'
    }
  })

  // Create or update the NDA template
  const nda = await prisma.documentTemplate.upsert({
    where: { id: 'cm9bh3u2e0003vbcg33mxuc67' },
    update: {
      categoryId: category.id,
      name: 'Non-Disclosure Agreement',
      description: 'A legal contract to protect confidential information',
      type: 'DOCUMENT'
    },
    create: {
      id: 'cm9bh3u2e0003vbcg33mxuc67',
      categoryId: category.id,
      name: 'Non-Disclosure Agreement',
      description: 'A legal contract to protect confidential information',
      type: 'DOCUMENT'
    }
  })

  // Create templates
  for (const template of templates) {
    await prisma.documentTemplate.upsert({
      where: { id: template.id },
      update: {
        categoryId: 'cm9bh3u2e0000vbcg33mxuc64'
      },
      create: {
        id: template.id,
        name: template.name,
        description: template.description,
        categoryId: 'cm9bh3u2e0000vbcg33mxuc64',
        content: template.content,
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: Object.keys(template.content.split('##').slice(1)).map(section => 
            section.split('\n')[0].trim()
          )
        }
      }
    })
    console.log('Created/Updated template:', template.name)
  }

  // Create questionnaires
  for (const questionnaire of questionnaires) {
    await prisma.questionnaire.upsert({
      where: { id: questionnaire.id },
      update: {},
      create: {
        id: questionnaire.id,
        name: questionnaire.name,
        description: questionnaire.description,
        templateId: questionnaire.templateId,
        questions: {
          create: questionnaire.questions
        }
      }
    })
    console.log('Created/Updated questionnaire:', questionnaire.name)
  }
}

// Run the seed function
seedEmploymentTemplates()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 