import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import type { TemplateField } from '@/types/template'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Section order to ensure consistent sidebar ordering
const sectionOrder = [
  'Basic Information',
  'Property Details',
  'Lease Terms',
  'Financial Terms',
  'Utilities and Services',
  'Parking',
  'Pet Policy',
  'Maintenance',
  'Rules and Regulations',
  'Additional Terms',
  'Personal Information',
  'Current Residence',
  'Employment & Income',
  'Occupancy Details',
  'Authorization',
  'Original Lease Information',
  'Lease Information',
  'Termination Details',
  'Move-Out Details',
  'Subtenant Information',
  'Sublease Terms',
  'Utilities',
  'Approvals'
]

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = context.params
    console.log('API Route - Debug - Request params:', { id })

    // First, let's check if the template exists
    const templateQuery = {
      where: {
        id: id
      },
      include: {
        fields: {
          include: {
            options: true,
            dependencies: true
          }
        }
      }
    }
    console.log('API Route - Debug - Template query:', JSON.stringify(templateQuery, null, 2))

    const template = await prisma.documentTemplate.findUnique(templateQuery)

    console.log('API Route - Debug - Template found:', template ? {
      id: template.id,
      code: template.code,
      name: template.name,
      fieldsCount: template.fields?.length || 0,
      fields: template.fields.map(f => ({
        id: f.fieldId,
        section: f.section
      }))
    } : 'null')

    if (!template) {
      console.log('API Route - Template not found')
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }

    console.log('API Route - Found template:', {
      id: template.id,
      code: template.code,
      name: template.name,
      fieldsCount: template.fields?.length || 0
    })

    // Transform the fields to match the expected format
    const transformedFields: TemplateField[] = template.fields.map(field => {
      console.log('API Route - Processing field:', {
        id: field.fieldId,
        type: field.type,
        section: field.section
      })
      return {
        id: field.fieldId,
        label: field.label,
        type: field.type,
        required: field.required,
        section: field.section,
        helpText: field.helpText,
        placeholder: field.placeholder,
        options: field.options?.map(opt => opt.value) || [],
        showIf: field.dependencies[0] ? {
          field: field.dependencies[0].dependsOnFieldId,
          value: field.dependencies[0].conditionValue.includes(',')
            ? field.dependencies[0].conditionValue.split(',')
            : field.dependencies[0].conditionValue
        } : undefined
      }
    })

    // Sort fields by section order
    transformedFields.sort((a, b) => {
      const aIndex = sectionOrder.indexOf(a.section)
      const bIndex = sectionOrder.indexOf(b.section)
      
      // If both sections are found in the order array
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex
      }
      
      // If only one section is found, prioritize the found one
      if (aIndex !== -1) return -1
      if (bIndex !== -1) return 1
      
      // If neither section is found, maintain original order
      return 0
    })

    // Log the sections in their final order
    console.log('API Route - Sections order after sorting:', 
      transformedFields.map(field => field.section)
        .filter((section, index, array) => array.indexOf(section) === index)
    )

    console.log('API Route - Successfully transformed fields:', transformedFields.length)
    return NextResponse.json(transformedFields)
  } catch (error) {
    console.error('API Route - Failed to fetch template fields:', error instanceof Error ? error.message : error)
    if (error instanceof Error) {
      console.error('Stack trace:', error.stack)
    }
    return NextResponse.json(
      { error: 'Failed to fetch template fields' },
      { status: 500 }
    )
  }
} 