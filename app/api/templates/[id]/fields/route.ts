import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
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
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const params = await context.params
    const { id } = params
    console.log('API Route - Debug - Request params:', { id })

    // First, let's check if the template exists
    const template = await prisma.documentTemplate.findUnique({
      where: {
        id
      },
      include: {
        fields: {
          include: {
            options: true,
            dependencies: true
          }
        }
      }
    })

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }

    console.log('API Route - Debug - Template found:', {
      id: template.id,
      code: template.code,
      name: template.name,
      fieldsCount: template.fields.length,
      fields: template.fields
    })

    // Transform fields to include their options and dependencies
    const transformedFields = template.fields.map(field => ({
      ...field,
      options: field.options || [],
      dependencies: field.dependencies || []
    }))

    console.log('API Route - Found template:', {
      id: template.id,
      code: template.code,
      name: template.name,
      fieldsCount: transformedFields.length
    })

    // Sort sections based on the order they appear in the template
    const sections = Array.from(new Set(transformedFields.map(field => field.section)))
    console.log('API Route - Sections order after sorting:', sections)

    console.log('API Route - Successfully transformed fields:', transformedFields.length)

    return NextResponse.json(transformedFields)
  } catch (error) {
    console.error('Error fetching template fields:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 