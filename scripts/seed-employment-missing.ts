import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function seedEmploymentMissing() {
  console.log('Starting missing employment templates seed...')

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

  // Create templates in batch
  const templates = [
    {
      id: 'progressive-discipline-policy',
      name: 'Progressive Discipline Policy',
      description: 'Policy outlining the progressive steps of employee discipline',
      type: 'DOCUMENT',
      content: `# PROGRESSIVE DISCIPLINE POLICY
[COMPANY_NAME]

## PURPOSE
[POLICY_PURPOSE]

## POLICY STATEMENT
[POLICY_STATEMENT]

## DISCIPLINE STEPS

### Step 1: Verbal Warning
[VERBAL_WARNING_PROCEDURE]
Documentation: [VERBAL_WARNING_DOCUMENTATION]

### Step 2: Written Warning
[WRITTEN_WARNING_PROCEDURE]
Documentation: [WRITTEN_WARNING_DOCUMENTATION]

### Step 3: Final Written Warning
[FINAL_WARNING_PROCEDURE]
Documentation: [FINAL_WARNING_DOCUMENTATION]

### Step 4: Suspension
[SUSPENSION_PROCEDURE]
Duration: [SUSPENSION_DURATION]
Documentation: [SUSPENSION_DOCUMENTATION]

### Step 5: Termination
[TERMINATION_PROCEDURE]
Documentation: [TERMINATION_DOCUMENTATION]

## SERIOUS OFFENSES
[IMMEDIATE_TERMINATION_OFFENSES]

## APPEAL PROCESS
[APPEAL_PROCEDURE]

## RECORD KEEPING
[RECORD_KEEPING_REQUIREMENTS]

## SUPERVISOR RESPONSIBILITIES
[SUPERVISOR_RESPONSIBILITIES]

## EMPLOYEE RIGHTS
[EMPLOYEE_RIGHTS]

## POLICY REVIEW
[POLICY_REVIEW_PROCEDURE]`
    },
    {
      id: 'resignation-letter',
      name: 'Resignation Letter / Carta de Renuncia',
      description: 'Formal letter for employee resignation',
      type: 'DOCUMENT',
      content: `# RESIGNATION LETTER / CARTA DE RENUNCIA
[EMPLOYEE_NAME]
[EMPLOYEE_ADDRESS]
[DATE]

[SUPERVISOR_NAME]
[COMPANY_NAME]
[COMPANY_ADDRESS]

Dear [SUPERVISOR_NAME],

I am writing to formally announce my resignation from my position as [JOB_TITLE] at [COMPANY_NAME], effective [LAST_DAY_OF_WORK].

## RESIGNATION DETAILS
Last Day of Work: [LAST_DAY_OF_WORK]
Reason for Resignation: [RESIGNATION_REASON]
Notice Period: [NOTICE_PERIOD]

## TRANSITION PLAN
[TRANSITION_PLAN]

## GRATITUDE
[GRATITUDE_STATEMENT]

## CONTACT INFORMATION
Future Contact: [FUTURE_CONTACT_INFO]

## SPANISH VERSION / VERSIÓN EN ESPAÑOL
Estimado/a [SUPERVISOR_NAME],

Por medio de la presente, comunico mi renuncia formal al puesto de [JOB_TITLE] en [COMPANY_NAME], efectiva a partir del [LAST_DAY_OF_WORK].

## DETALLES DE LA RENUNCIA
Último día de trabajo: [LAST_DAY_OF_WORK]
Motivo de la renuncia: [RESIGNATION_REASON]
Período de preaviso: [NOTICE_PERIOD]

## PLAN DE TRANSICIÓN
[TRANSITION_PLAN]

## AGRADECIMIENTO
[GRATITUDE_STATEMENT]

## INFORMACIÓN DE CONTACTO
Contacto futuro: [FUTURE_CONTACT_INFO]

Sincerely / Atentamente,
[EMPLOYEE_NAME]`
    },
    {
      id: 'resume',
      name: 'Resume',
      description: 'Professional resume template',
      type: 'DOCUMENT',
      content: `# [FULL_NAME]
[CONTACT_INFORMATION]

## PROFESSIONAL SUMMARY
[PROFESSIONAL_SUMMARY]

## CORE COMPETENCIES
- [COMPETENCY_1]
- [COMPETENCY_2]
- [COMPETENCY_3]
- [COMPETENCY_4]
- [COMPETENCY_5]

## PROFESSIONAL EXPERIENCE

### [JOB_TITLE_1]
[COMPANY_NAME_1] | [START_DATE_1] - [END_DATE_1]
[LOCATION_1]

Key Responsibilities:
- [RESPONSIBILITY_1]
- [RESPONSIBILITY_2]
- [RESPONSIBILITY_3]

Key Achievements:
- [ACHIEVEMENT_1]
- [ACHIEVEMENT_2]
- [ACHIEVEMENT_3]

### [JOB_TITLE_2]
[COMPANY_NAME_2] | [START_DATE_2] - [END_DATE_2]
[LOCATION_2]

Key Responsibilities:
- [RESPONSIBILITY_1]
- [RESPONSIBILITY_2]
- [RESPONSIBILITY_3]

Key Achievements:
- [ACHIEVEMENT_1]
- [ACHIEVEMENT_2]
- [ACHIEVEMENT_3]

## EDUCATION

### [DEGREE_1]
[UNIVERSITY_1] | [GRADUATION_DATE_1]
[LOCATION_1]
- [ACADEMIC_ACHIEVEMENT_1]
- [ACADEMIC_ACHIEVEMENT_2]

### [DEGREE_2]
[UNIVERSITY_2] | [GRADUATION_DATE_2]
[LOCATION_2]
- [ACADEMIC_ACHIEVEMENT_1]
- [ACADEMIC_ACHIEVEMENT_2]

## CERTIFICATIONS
- [CERTIFICATION_1]
- [CERTIFICATION_2]
- [CERTIFICATION_3]

## SKILLS
Technical Skills:
- [TECH_SKILL_1]
- [TECH_SKILL_2]
- [TECH_SKILL_3]

Soft Skills:
- [SOFT_SKILL_1]
- [SOFT_SKILL_2]
- [SOFT_SKILL_3]

## LANGUAGES
- [LANGUAGE_1]: [PROFICIENCY_1]
- [LANGUAGE_2]: [PROFICIENCY_2]

## VOLUNTEER WORK
[VOLUNTEER_ORGANIZATION_1]
[VOLUNTEER_ROLE_1] | [VOLUNTEER_DATES_1]
[VOLUNTEER_DESCRIPTION_1]

## REFERENCES
Available upon request.`
    }
  ]

  // Create questionnaires in batch
  const questionnaires = [
    {
      id: 'progressive-discipline-policy-questions',
      name: 'Progressive Discipline Policy Questionnaire',
      description: 'Questions for creating a progressive discipline policy',
      templateId: 'progressive-discipline-policy',
      questions: [
        {
          label: 'What is the purpose of the progressive discipline policy?',
          type: 'textarea',
          required: true,
          section: 'Purpose'
        },
        {
          label: 'What is the general policy statement regarding employee discipline?',
          type: 'textarea',
          required: true,
          section: 'Policy Statement'
        },
        {
          label: 'What is the procedure for issuing verbal warnings?',
          type: 'textarea',
          required: true,
          section: 'Discipline Steps'
        },
        {
          label: 'How are verbal warnings documented?',
          type: 'textarea',
          required: true,
          section: 'Discipline Steps'
        },
        {
          label: 'What is the procedure for issuing written warnings?',
          type: 'textarea',
          required: true,
          section: 'Discipline Steps'
        },
        {
          label: 'How are written warnings documented?',
          type: 'textarea',
          required: true,
          section: 'Discipline Steps'
        },
        {
          label: 'What is the procedure for issuing final written warnings?',
          type: 'textarea',
          required: true,
          section: 'Discipline Steps'
        },
        {
          label: 'How are final written warnings documented?',
          type: 'textarea',
          required: true,
          section: 'Discipline Steps'
        },
        {
          label: 'What is the procedure for employee suspension?',
          type: 'textarea',
          required: true,
          section: 'Discipline Steps'
        },
        {
          label: 'What is the typical duration of suspensions?',
          type: 'textarea',
          required: true,
          section: 'Discipline Steps'
        },
        {
          label: 'How are suspensions documented?',
          type: 'textarea',
          required: true,
          section: 'Discipline Steps'
        },
        {
          label: 'What is the procedure for employee termination?',
          type: 'textarea',
          required: true,
          section: 'Discipline Steps'
        },
        {
          label: 'How are terminations documented?',
          type: 'textarea',
          required: true,
          section: 'Discipline Steps'
        },
        {
          label: 'What offenses warrant immediate termination?',
          type: 'textarea',
          required: true,
          section: 'Serious Offenses'
        },
        {
          label: 'What is the appeal process for disciplinary actions?',
          type: 'textarea',
          required: true,
          section: 'Appeal Process'
        },
        {
          label: 'What are the record-keeping requirements for disciplinary actions?',
          type: 'textarea',
          required: true,
          section: 'Record Keeping'
        },
        {
          label: 'What are the supervisor responsibilities in the disciplinary process?',
          type: 'textarea',
          required: true,
          section: 'Supervisor Responsibilities'
        },
        {
          label: 'What rights do employees have during the disciplinary process?',
          type: 'textarea',
          required: true,
          section: 'Employee Rights'
        },
        {
          label: 'How often is the policy reviewed and updated?',
          type: 'textarea',
          required: true,
          section: 'Policy Review'
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
          label: 'What is your full name?',
          type: 'text',
          required: true,
          section: 'Resignation Details'
        },
        {
          label: 'What is your current address?',
          type: 'text',
          required: true,
          section: 'Resignation Details'
        },
        {
          label: 'What is your supervisor\'s name?',
          type: 'text',
          required: true,
          section: 'Resignation Details'
        },
        {
          label: 'What is your current job title?',
          type: 'text',
          required: true,
          section: 'Resignation Details'
        },
        {
          label: 'What is your last day of work?',
          type: 'date',
          required: true,
          section: 'Resignation Details'
        },
        {
          label: 'What is your reason for resigning?',
          type: 'textarea',
          required: true,
          section: 'Resignation Details'
        },
        {
          label: 'How much notice are you giving?',
          type: 'text',
          required: true,
          section: 'Resignation Details'
        },
        {
          label: 'What is your transition plan?',
          type: 'textarea',
          required: true,
          section: 'Transition Plan'
        },
        {
          label: 'What would you like to express gratitude for?',
          type: 'textarea',
          required: true,
          section: 'Gratitude'
        },
        {
          label: 'How can the company contact you in the future?',
          type: 'textarea',
          required: true,
          section: 'Contact Information'
        }
      ]
    },
    {
      id: 'resume-questions',
      name: 'Resume Questionnaire',
      description: 'Questions for creating a professional resume',
      templateId: 'resume',
      questions: [
        {
          label: 'What is your full name?',
          type: 'text',
          required: true,
          section: 'Professional Summary'
        },
        {
          label: 'What is your contact information? (Phone, email, LinkedIn, etc.)',
          type: 'textarea',
          required: true,
          section: 'Professional Summary'
        },
        {
          label: 'What is your professional summary?',
          type: 'textarea',
          required: true,
          section: 'Professional Summary'
        },
        {
          label: 'What are your core competencies?',
          type: 'textarea',
          required: true,
          section: 'Core Competencies'
        },
        {
          label: 'What is your most recent job title?',
          type: 'text',
          required: true,
          section: 'Professional Experience'
        },
        {
          label: 'What is your most recent employer?',
          type: 'text',
          required: true,
          section: 'Professional Experience'
        },
        {
          label: 'What were your key responsibilities in this role?',
          type: 'textarea',
          required: true,
          section: 'Professional Experience'
        },
        {
          label: 'What were your key achievements in this role?',
          type: 'textarea',
          required: true,
          section: 'Professional Experience'
        },
        {
          label: 'What is your highest level of education?',
          type: 'text',
          required: true,
          section: 'Education'
        },
        {
          label: 'What university did you attend?',
          type: 'text',
          required: true,
          section: 'Education'
        },
        {
          label: 'What certifications do you hold?',
          type: 'textarea',
          required: true,
          section: 'Certifications'
        },
        {
          label: 'What are your technical skills?',
          type: 'textarea',
          required: true,
          section: 'Skills'
        },
        {
          label: 'What are your soft skills?',
          type: 'textarea',
          required: true,
          section: 'Skills'
        },
        {
          label: 'What languages do you speak?',
          type: 'textarea',
          required: true,
          section: 'Languages'
        },
        {
          label: 'What volunteer work have you done?',
          type: 'textarea',
          required: true,
          section: 'Volunteer Work'
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
          categoryId: category.id
        },
        create: {
          id: template.id,
          name: template.name,
          description: template.description,
          content: template.content,
          type: template.type,
          categoryId: category.id
        }
      })
      console.log('Created/Updated template:', template.name)
    }

    // Create or update questionnaires and their questions
    for (const questionnaire of questionnaires) {
      // Create or update the questionnaire
      const createdQuestionnaire = await prisma.questionnaire.upsert({
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
      console.log('Created/Updated questionnaire:', questionnaire.name)

      // Delete existing questions for this questionnaire
      await prisma.question.deleteMany({
        where: { questionnaireId: createdQuestionnaire.id }
      })

      // Create new questions
      for (const question of questionnaire.questions) {
        await prisma.question.create({
          data: {
            label: question.label,
            type: question.type,
            required: question.required,
            section: question.section,
            questionnaireId: createdQuestionnaire.id
          }
        })
      }
      console.log(`Created ${questionnaire.questions.length} questions for ${questionnaire.name}`)
    }

    console.log('Successfully seeded missing employment templates')
  } catch (error) {
    console.error('Error seeding missing employment templates:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Execute the seed function
if (require.main === module) {
  seedEmploymentMissing()
    .catch((error) => {
      console.error('Error running seed:', error)
      process.exit(1)
    })
} 