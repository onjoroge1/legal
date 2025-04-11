import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function seedEmployment() {
  console.log('Starting employment seed...')

  // Ensure employment category exists
  await prisma.category.upsert({
    where: { id: 'employment' },
    update: {},
    create: {
      id: 'employment',
      name: 'Employment & HR',
      description: 'Employment contracts, offer letters, NDAs, and other HR documents'
    }
  })

  // Create templates in batch
  const templates = [
    {
      id: 'employment-contract',
      name: 'Employment Contract / Contrato de Trabajo',
      description: 'Standard employment agreement outlining terms and conditions of employment',
      content: `# EMPLOYMENT CONTRACT
[CORPORATION_NAME]

## PARTIES
This Employment Contract ("Contract") is made and entered into as of [START_DATE] by and between:

Employer: [EMPLOYER_NAME]
Address: [EMPLOYER_ADDRESS]

Employee: [EMPLOYEE_NAME]
Address: [EMPLOYEE_ADDRESS]

## POSITION AND TERM
1. Position: [JOB_TITLE]
2. Employment Type: [EMPLOYMENT_TYPE]
3. Hours: [WORKING_HOURS]
4. Start Date: [START_DATE]
5. Term: [EMPLOYMENT_TERM]
6. Probationary Period: [PROBATION_PERIOD]

## COMPENSATION AND BENEFITS
1. Salary/Wage: [SALARY]
2. Payment Frequency: [PAYMENT_FREQUENCY]
3. Overtime: [OVERTIME_POLICY]
4. Bonuses/Commissions: [BONUS_TERMS]
5. Benefits: [BENEFITS]
6. Vacation Days: [VACATION_DAYS]
7. Sick Days: [SICK_DAYS]

## WORK SCHEDULE AND CONDITIONS
1. Standard Hours: [STANDARD_HOURS]
2. Duties: [JOB_DUTIES]
3. Reporting To: [SUPERVISOR]
4. Travel Requirements: [TRAVEL_REQUIREMENTS]
5. Remote Work Policy: [REMOTE_WORK_POLICY]
6. Dress Code: [DRESS_CODE]

## TERMINATION
1. Grounds for Termination: [TERMINATION_GROUNDS]
2. Employee Notice Period: [EMPLOYEE_NOTICE]
3. Employer Notice Period: [EMPLOYER_NOTICE]

## RESTRICTIONS AND POLICIES
1. Non-Compete: [NON_COMPETE]
2. Confidentiality: [CONFIDENTIALITY]
3. Intellectual Property: [IP_OWNERSHIP]
4. Performance Evaluation: [PERFORMANCE_EVALUATION]
5. Dispute Resolution: [DISPUTE_RESOLUTION]

## ACKNOWLEDGMENT
The parties have read and understood this Contract and agree to be bound by its terms.

________________________
[EMPLOYER_SIGNATURE]
[EMPLOYER_NAME]
Date: [DATE]

________________________
[EMPLOYEE_SIGNATURE]
[EMPLOYEE_NAME]
Date: [DATE]`
    },
    {
      id: 'employee-evaluation',
      name: 'Employee Evaluation',
      description: 'Form for evaluating employee performance and setting future goals',
      content: `# EMPLOYEE EVALUATION
[CORPORATION_NAME]

## EMPLOYEE INFORMATION
Name: [EMPLOYEE_NAME]
Position: [JOB_TITLE]
Department: [DEPARTMENT]
Supervisor: [SUPERVISOR_NAME]
Evaluation Period: [EVALUATION_PERIOD]
Review Type: [REVIEW_TYPE]
Purpose: [EVALUATION_PURPOSE]

## JOB RESPONSIBILITIES
[KEY_RESPONSIBILITIES]

## PERFORMANCE EVALUATION
### Rating Scale: [RATING_SCALE]

### Goals and Achievement
Previous Goals:
[PREVIOUS_GOALS]

Goal Achievement:
[GOAL_ACHIEVEMENT]

### Strengths
[EMPLOYEE_STRENGTHS]

### Areas for Improvement
[IMPROVEMENT_AREAS]

### Performance Examples
[PERFORMANCE_EXAMPLES]

## DEVELOPMENT AND GROWTH
### Recommended Training
[TRAINING_RECOMMENDATIONS]

### Future Goals
[NEXT_PERIOD_GOALS]

## COMPENSATION CONSIDERATION
Promotion Consideration: [PROMOTION_CONSIDERATION]
Salary Increase: [SALARY_INCREASE]

## PERFORMANCE IMPROVEMENT PLAN
Required: [PIP_REQUIRED]
Expectations: [PIP_EXPECTATIONS]
Resources: [PIP_RESOURCES]
Consequences: [PIP_CONSEQUENCES]
Timeline: [PIP_TIMELINE]
Review Date: [PIP_REVIEW_DATE]

## EMPLOYEE COMMENTS
[EMPLOYEE_COMMENTS]

## SIGNATURES
________________________
[SUPERVISOR_SIGNATURE]
[SUPERVISOR_NAME]
Date: [DATE]

________________________
[EMPLOYEE_SIGNATURE]
[EMPLOYEE_NAME]
Date: [DATE]`
    }
  ]

  // Create questionnaires in batch
  const questionnaires = [
    {
      id: 'employment-contract-questions',
      name: 'Employment Contract Questionnaire',
      description: 'Questions for creating an employment contract',
      templateId: 'employment-contract',
      questions: [
        {
          label: 'What is the full legal name of the employer/company?',
          type: 'text',
          required: true,
          section: 'Parties'
        },
        {
          label: 'What is the employer\'s complete address?',
          type: 'text',
          required: true,
          section: 'Parties'
        },
        {
          label: 'What is the full legal name of the employee?',
          type: 'text',
          required: true,
          section: 'Parties'
        },
        {
          label: 'What is the employee\'s address?',
          type: 'text',
          required: true,
          section: 'Parties'
        },
        {
          label: 'What is the employee\'s job title/position?',
          type: 'text',
          required: true,
          section: 'Position and Term'
        },
        {
          label: 'Is this a full-time or part-time position? If part-time, how many hours per week?',
          type: 'text',
          required: true,
          section: 'Position and Term'
        },
        {
          label: 'What is the start date of employment?',
          type: 'date',
          required: true,
          section: 'Position and Term'
        },
        {
          label: 'Is the employment for a fixed term or indefinite? If fixed, what is the end date?',
          type: 'text',
          required: true,
          section: 'Position and Term'
        },
        {
          label: 'Will there be a probationary period? If so, how long?',
          type: 'text',
          required: true,
          section: 'Position and Term'
        },
        {
          label: 'What is the employee\'s salary or hourly wage rate?',
          type: 'text',
          required: true,
          section: 'Compensation and Benefits'
        },
        {
          label: 'How often will the employee be paid? (Weekly, bi-weekly, monthly)',
          type: 'select',
          required: true,
          section: 'Compensation and Benefits',
          options: {
            create: [
              { value: 'Weekly', label: 'Weekly' },
              { value: 'Bi-weekly', label: 'Bi-weekly' },
              { value: 'Monthly', label: 'Monthly' }
            ]
          }
        },
        {
          label: 'Is the employee eligible for overtime pay? If so, at what rate?',
          type: 'text',
          required: true,
          section: 'Compensation and Benefits'
        },
        {
          label: 'Will the employee be eligible for bonuses or commissions? If so, what are the terms?',
          type: 'textarea',
          required: true,
          section: 'Compensation and Benefits'
        },
        {
          label: 'What benefits will be provided? (Health insurance, retirement plans, paid time off, etc.)',
          type: 'textarea',
          required: true,
          section: 'Compensation and Benefits'
        },
        {
          label: 'How many vacation/personal days will the employee receive annually?',
          type: 'number',
          required: true,
          section: 'Compensation and Benefits'
        },
        {
          label: 'How many sick days will the employee receive annually?',
          type: 'number',
          required: true,
          section: 'Compensation and Benefits'
        },
        {
          label: 'What are the standard working hours and days?',
          type: 'text',
          required: true,
          section: 'Work Schedule and Conditions'
        },
        {
          label: 'What are the duties and responsibilities of the position?',
          type: 'textarea',
          required: true,
          section: 'Work Schedule and Conditions'
        },
        {
          label: 'Who will the employee report to?',
          type: 'text',
          required: true,
          section: 'Work Schedule and Conditions'
        },
        {
          label: 'Is travel required for the position? If so, what are the expectations?',
          type: 'textarea',
          required: true,
          section: 'Work Schedule and Conditions'
        },
        {
          label: 'What are the grounds for termination?',
          type: 'textarea',
          required: true,
          section: 'Termination'
        },
        {
          label: 'What is the required notice period for the employee to resign?',
          type: 'text',
          required: true,
          section: 'Termination'
        },
        {
          label: 'What is the required notice period for the employer to terminate employment (if not for cause)?',
          type: 'text',
          required: true,
          section: 'Termination'
        },
        {
          label: 'Are there any non-compete restrictions? If so, what are the terms?',
          type: 'textarea',
          required: true,
          section: 'Restrictions and Policies'
        },
        {
          label: 'Are there any confidentiality requirements?',
          type: 'textarea',
          required: true,
          section: 'Restrictions and Policies'
        },
        {
          label: 'Who owns intellectual property created by the employee during employment?',
          type: 'textarea',
          required: true,
          section: 'Restrictions and Policies'
        },
        {
          label: 'Is there a dress code or other workplace conduct requirements?',
          type: 'textarea',
          required: true,
          section: 'Restrictions and Policies'
        },
        {
          label: 'What is the policy on remote work or flexible scheduling?',
          type: 'textarea',
          required: true,
          section: 'Restrictions and Policies'
        },
        {
          label: 'How will performance be evaluated and how often?',
          type: 'textarea',
          required: true,
          section: 'Restrictions and Policies'
        },
        {
          label: 'What dispute resolution method will be used for employment-related disputes?',
          type: 'textarea',
          required: true,
          section: 'Restrictions and Policies'
        }
      ]
    },
    {
      id: 'employee-evaluation-questions',
      name: 'Employee Evaluation Questionnaire',
      description: 'Questions for conducting an employee evaluation',
      templateId: 'employee-evaluation',
      questions: [
        {
          label: 'What is the employee\'s full name?',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What is the employee\'s job title/position?',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What department does the employee work in?',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'Who is the employee\'s direct supervisor/manager?',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What is the evaluation period? (From date to date)',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'Is this a probationary, quarterly, semi-annual, or annual review?',
          type: 'select',
          required: true,
          section: 'Employee Information',
          options: {
            create: [
              { value: 'Probationary', label: 'Probationary' },
              { value: 'Quarterly', label: 'Quarterly' },
              { value: 'Semi-annual', label: 'Semi-annual' },
              { value: 'Annual', label: 'Annual' }
            ]
          }
        },
        {
          label: 'What is the purpose of this evaluation? (Regular review, promotion consideration, post-probation, etc.)',
          type: 'text',
          required: true,
          section: 'Employee Information'
        },
        {
          label: 'What are the key job responsibilities of the employee\'s position?',
          type: 'textarea',
          required: true,
          section: 'Job Responsibilities'
        },
        {
          label: 'What performance criteria will be evaluated? (Job knowledge, quality of work, productivity, etc.)',
          type: 'textarea',
          required: true,
          section: 'Performance Evaluation'
        },
        {
          label: 'What rating scale will be used? (1-5, unsatisfactory to excellent, etc.)',
          type: 'text',
          required: true,
          section: 'Performance Evaluation'
        },
        {
          label: 'What specific goals were set for the employee during this evaluation period?',
          type: 'textarea',
          required: true,
          section: 'Performance Evaluation'
        },
        {
          label: 'To what extent did the employee meet each goal?',
          type: 'textarea',
          required: true,
          section: 'Performance Evaluation'
        },
        {
          label: 'What are the employee\'s key strengths?',
          type: 'textarea',
          required: true,
          section: 'Performance Evaluation'
        },
        {
          label: 'What are the areas needing improvement?',
          type: 'textarea',
          required: true,
          section: 'Performance Evaluation'
        },
        {
          label: 'What specific examples demonstrate the employee\'s performance during this period?',
          type: 'textarea',
          required: true,
          section: 'Performance Evaluation'
        },
        {
          label: 'What professional development or training is recommended?',
          type: 'textarea',
          required: true,
          section: 'Development and Growth'
        },
        {
          label: 'What goals should be set for the next evaluation period?',
          type: 'textarea',
          required: true,
          section: 'Development and Growth'
        },
        {
          label: 'Is this employee being considered for promotion or salary increase?',
          type: 'select',
          required: true,
          section: 'Compensation Consideration',
          options: {
            create: [
              { value: 'Yes', label: 'Yes' },
              { value: 'No', label: 'No' }
            ]
          }
        },
        {
          label: 'If so, what is the recommended promotion or increase?',
          type: 'text',
          required: false,
          section: 'Compensation Consideration'
        },
        {
          label: 'Will there be a performance improvement plan? If so, what are the specific expectations?',
          type: 'textarea',
          required: true,
          section: 'Performance Improvement Plan'
        },
        {
          label: 'What resources will be provided to help the employee improve?',
          type: 'textarea',
          required: true,
          section: 'Performance Improvement Plan'
        },
        {
          label: 'What are the consequences if performance does not improve?',
          type: 'textarea',
          required: true,
          section: 'Performance Improvement Plan'
        },
        {
          label: 'What is the timeline for improvement?',
          type: 'text',
          required: true,
          section: 'Performance Improvement Plan'
        },
        {
          label: 'What date will progress be reviewed again?',
          type: 'date',
          required: true,
          section: 'Performance Improvement Plan'
        },
        {
          label: 'What space should be included for employee comments or self-assessment?',
          type: 'textarea',
          required: true,
          section: 'Employee Comments'
        }
      ]
    }
  ]

  // Create templates
  for (const template of templates) {
    await prisma.documentTemplate.upsert({
      where: { id: template.id },
      update: {
        categoryId: 'employment'
      },
      create: {
        id: template.id,
        name: template.name,
        description: template.description,
        categoryId: 'employment',
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
seedEmployment()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 