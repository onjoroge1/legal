import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

interface Field {
  id: string
  label: string
  type: string
  required: boolean
  section: string
  helpText?: string
  placeholder?: string
  options?: string[]
  showIf?: {
    field: string
    value: string | string[]
  }
}

interface QuestionnaireMetadata {
  questionnaire?: {
    name: string
    description: string
    fields: Field[]
  }
}

async function migrateQuestionnaires() {
  try {
    console.log('Starting questionnaire migration...')

    // Get all templates with questionnaire metadata
    const templates = await prisma.documentTemplate.findMany({
      where: {
        metadata: {
          not: Prisma.JsonNull
        }
      }
    })

    console.log(`Found ${templates.length} templates to process`)

    for (const template of templates) {
      const metadata = template.metadata as unknown as QuestionnaireMetadata
      if (!metadata?.questionnaire) continue

      const questionnaireData = metadata.questionnaire

      console.log(`Migrating questionnaire for template: ${template.name}`)

      type TransactionPrisma = Omit<
        PrismaClient,
        '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
      >

      // Create questionnaire and its questions in a transaction
      await prisma.$transaction(async (tx: TransactionPrisma) => {
        // Create the questionnaire
        const questionnaire = await tx.questionnaire.create({
          data: {
            name: questionnaireData.name,
            description: questionnaireData.description,
            templateId: template.id,
          },
        })

        console.log(`Created questionnaire: ${questionnaire.id}`)

        // Create the questions
        for (const field of questionnaireData.fields) {
          const question = await tx.question.create({
            data: {
              label: field.label,
              type: field.type,
              required: field.required,
              section: field.section,
              helpText: field.helpText,
              placeholder: field.placeholder,
              questionnaireId: questionnaire.id,
            },
          })

          console.log(`Created question: ${question.id}`)

          // Create options if they exist
          if (field.options && field.options.length > 0) {
            await Promise.all(
              field.options.map((option) =>
                tx.questionOption.create({
                  data: {
                    value: option,
                    label: option,
                    questionId: question.id,
                  },
                })
              )
            )
            console.log(`Created options for question: ${question.id}`)
          }

          // Create dependency if it exists
          if (field.showIf) {
            await tx.questionDependency.create({
              data: {
                questionId: question.id,
                dependsOnQuestionId: field.showIf.field,
                conditionType: "equals",
                conditionValue: Array.isArray(field.showIf.value)
                  ? field.showIf.value.join(",")
                  : field.showIf.value,
              },
            })
            console.log(`Created dependency for question: ${question.id}`)
          }
        }

        // Clear the questionnaire data from metadata
        const currentMetadata = { ...template.metadata as Prisma.JsonObject }
        delete (currentMetadata as any).questionnaire
        
        await tx.documentTemplate.update({
          where: { id: template.id },
          data: {
            metadata: currentMetadata
          }
        })
      })

      console.log(`Successfully migrated questionnaire for template: ${template.name}`)
    }

    console.log('Migration completed successfully')
  } catch (error) {
    console.error('Error during migration:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the migration
migrateQuestionnaires().catch(console.error) 