import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface FieldOption {
  value: string
  label?: string
}

interface FieldDependency {
  dependsOnFieldId: string
  conditionType: string
  conditionValue: string
}

interface Field {
  fieldId: string
  label: string
  type: string
  required: boolean
  section: string
  helpText?: string
  placeholder?: string
  options?: FieldOption[]
  dependencies?: FieldDependency[]
}

async function seedTemplateFields() {
  try {
    // Find the apartment lease template
    const template = await prisma.documentTemplate.findFirst({
      where: {
        id: 'apartment-lease'
      }
    })

    if (!template) {
      console.error('Template not found')
      return
    }

    // Delete existing template fields for this template
    await prisma.templateField.deleteMany({
      where: {
        templateId: template.id
      }
    })

    console.log('Deleted existing template fields')

    // Define the fields for each section
    const fields: Field[] = [
      // Property Details
      {
        fieldId: 'property_address',
        label: 'Property Address',
        type: 'text',
        required: true,
        section: 'Property Details',
        helpText: 'Enter the complete address of the rental property',
        placeholder: 'e.g., 123 Main St, City, State, ZIP'
      },
      {
        fieldId: 'unit_number',
        label: 'Unit Number',
        type: 'text',
        required: false,
        section: 'Property Details',
        placeholder: 'e.g., Apt 4B'
      },
      {
        fieldId: 'property_type',
        label: 'Property Type',
        type: 'select',
        required: true,
        section: 'Property Details',
        options: [
          { value: 'apartment', label: 'Apartment' },
          { value: 'condo', label: 'Condominium' },
          { value: 'house', label: 'House' },
          { value: 'duplex', label: 'Duplex' },
          { value: 'townhouse', label: 'Townhouse' }
        ]
      },

      // Lease Terms
      {
        fieldId: 'lease_start_date',
        label: 'Lease Start Date',
        type: 'date',
        required: true,
        section: 'Lease Terms'
      },
      {
        fieldId: 'lease_end_date',
        label: 'Lease End Date',
        type: 'date',
        required: true,
        section: 'Lease Terms'
      },
      {
        fieldId: 'lease_term',
        label: 'Lease Term',
        type: 'select',
        required: true,
        section: 'Lease Terms',
        options: [
          { value: 'month_to_month', label: 'Month-to-Month' },
          { value: '6_months', label: '6 Months' },
          { value: '12_months', label: '12 Months' },
          { value: '24_months', label: '24 Months' }
        ]
      },

      // Financial Terms
      {
        fieldId: 'monthly_rent',
        label: 'Monthly Rent',
        type: 'currency',
        required: true,
        section: 'Financial Terms',
        helpText: 'Enter the monthly rent amount'
      },
      {
        fieldId: 'security_deposit',
        label: 'Security Deposit',
        type: 'currency',
        required: true,
        section: 'Financial Terms'
      },
      {
        fieldId: 'rent_due_day',
        label: 'Rent Due Day',
        type: 'select',
        required: true,
        section: 'Financial Terms',
        options: Array.from({ length: 28 }, (_, i) => ({
          value: String(i + 1),
          label: `${i + 1}${getOrdinalSuffix(i + 1)} of each month`
        }))
      },

      // Utilities and Services
      {
        fieldId: 'utilities_included',
        label: 'Utilities Included in Rent',
        type: 'checkbox',
        required: true,
        section: 'Utilities and Services',
        options: [
          { value: 'water', label: 'Water' },
          { value: 'electricity', label: 'Electricity' },
          { value: 'gas', label: 'Gas' },
          { value: 'trash', label: 'Trash' },
          { value: 'internet', label: 'Internet' },
          { value: 'cable', label: 'Cable TV' }
        ]
      },

      // Pet Policy
      {
        fieldId: 'pets_allowed',
        label: 'Pets Allowed',
        type: 'radio',
        required: true,
        section: 'Pet Policy',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        fieldId: 'pet_deposit',
        label: 'Pet Deposit',
        type: 'currency',
        required: false,
        section: 'Pet Policy',
        dependencies: [
          {
            dependsOnFieldId: 'pets_allowed',
            conditionType: 'equals',
            conditionValue: 'yes'
          }
        ]
      },

      // Additional Terms
      {
        fieldId: 'additional_terms',
        label: 'Additional Terms and Conditions',
        type: 'textarea',
        required: false,
        section: 'Additional Terms',
        helpText: 'Enter any additional terms or conditions not covered above'
      }
    ]

    // Create the fields
    for (const field of fields) {
      const { options, dependencies, ...fieldData } = field
      
      const createdField = await prisma.templateField.create({
        data: {
          ...fieldData,
          templateId: template.id
        }
      })

      // Create options if they exist
      if (options) {
        for (const option of options) {
          await prisma.fieldOption.create({
            data: {
              ...option,
              fieldId: createdField.id
            }
          })
        }
      }

      // Create dependencies if they exist
      if (dependencies) {
        for (const dependency of dependencies) {
          await prisma.fieldDependency.create({
            data: {
              ...dependency,
              fieldId: createdField.id
            }
          })
        }
      }
    }

    console.log('Successfully seeded template fields')
  } catch (error) {
    console.error('Error seeding template fields:', error)
  } finally {
    await prisma.$disconnect()
  }
}

function getOrdinalSuffix(num: number): string {
  const j = num % 10
  const k = num % 100
  if (j == 1 && k != 11) return 'st'
  if (j == 2 && k != 12) return 'nd'
  if (j == 3 && k != 13) return 'rd'
  return 'th'
}

seedTemplateFields() 