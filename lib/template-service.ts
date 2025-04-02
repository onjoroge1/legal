import { prisma } from '@/lib/prisma'

export interface TemplateVariable {
  name: string
  type: "text" | "date" | "number" | "select"
  label: string
  description?: string
  required: boolean
  options?: string[]
  defaultValue?: string
}

export interface TemplateMetadata {
  jurisdiction: string
  lastUpdated: string
  version: string
  requiredFields: string[]
  recommendedFields: string[]
  notes: string[]
}

export class TemplateService {
  static async createTemplate(data: {
    name: string
    type: string
    description?: string
    content: string
    state?: string
    category: string
    variables: any
    metadata: any
  }) {
    const template = await prisma.documentTemplate.create({
      data: {
        name: data.name,
        type: data.type,
        description: data.description,
        content: data.content,
        state: data.state,
        category: data.category,
        variables: data.variables,
        metadata: data.metadata,
        version: "1.0.0"
      }
    })

    return template
  }

  static async updateTemplate(id: string, data: any) {
    const template = await prisma.documentTemplate.findUnique({ where: { id } })
    if (!template) throw new Error('Template not found')

    return prisma.documentTemplate.update({
      where: { id },
      data: {
        name: data.name,
        type: data.type,
        description: data.description,
        content: data.content,
        state: data.state,
        category: data.category,
        variables: data.variables,
        metadata: data.metadata,
        version: data.version
      }
    })
  }

  static async getTemplate(id: string) {
    return prisma.documentTemplate.findUnique({
      where: { id }
    })
  }

  static async listTemplates(category?: string) {
    const where: any = {}
    if (category) {
      where.category = category
    }
    return prisma.documentTemplate.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })
  }

  static async deleteTemplate(id: string) {
    return prisma.documentTemplate.delete({
      where: { id }
    })
  }

  static async createSampleTemplates() {
    try {
      // First, check if templates already exist
      const existingTemplates = await prisma.documentTemplate.findMany()
      if (existingTemplates.length > 0) {
        console.log('Templates already exist, skipping creation')
        return
      }

      const templateData = {
        name: "Standard Employment Agreement",
        description: "Comprehensive employment agreement template with standard clauses and protections",
        category: "Employment",
        type: "agreement",
        content: `# EMPLOYMENT AGREEMENT

This Employment Agreement (the "Agreement") is made and entered into on {{startDate}} by and between:

{{companyName}} ("Company"), a {{companyType}} corporation, and
{{employeeName}} ("Employee"), residing at {{employeeAddress}}

1. POSITION AND DUTIES
1.1 Position: Employee shall serve as {{position}}.
1.2 Duties: Employee shall perform such duties as are customarily associated with the position and such other duties as may be assigned by the Company.

2. COMPENSATION
2.1 Base Salary: Employee shall receive an annual base salary of {{baseSalary}}.
2.2 Benefits: Employee shall be eligible for standard company benefits including:
   - Health insurance
   - Dental insurance
   - Vision insurance
   - 401(k) plan
   - Paid time off

3. TERM AND TERMINATION
3.1 Term: This Agreement shall commence on {{startDate}} and continue until terminated.
3.2 Termination: Either party may terminate this Agreement with {{noticePeriod}} notice.

4. CONFIDENTIALITY
4.1 Employee agrees to maintain the confidentiality of all proprietary information.

5. NON-COMPETE
5.1 Employee agrees not to compete with the Company for {{nonCompetePeriod}} after termination.

6. GOVERNING LAW
6.1 This Agreement shall be governed by the laws of {{jurisdiction}}.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

Company: {{companyName}}
By: {{companyRepresentative}}
Title: {{representativeTitle}}

Employee: {{employeeName}}
Signature: _________________`,
        variables: [
          { name: "startDate", type: "date", label: "Start Date", required: true },
          { name: "companyName", type: "text", label: "Company Name", required: true },
          { name: "companyType", type: "select", label: "Company Type", required: true, options: ["LLC", "Corporation", "Partnership"] },
          { name: "employeeName", type: "text", label: "Employee Name", required: true },
          { name: "employeeAddress", type: "text", label: "Employee Address", required: true },
          { name: "position", type: "text", label: "Position", required: true },
          { name: "baseSalary", type: "text", label: "Base Salary", required: true },
          { name: "noticePeriod", type: "text", label: "Notice Period", required: true },
          { name: "nonCompetePeriod", type: "text", label: "Non-Compete Period", required: true },
          { name: "jurisdiction", type: "text", label: "Governing Law Jurisdiction", required: true },
          { name: "companyRepresentative", type: "text", label: "Company Representative Name", required: true },
          { name: "representativeTitle", type: "text", label: "Representative Title", required: true }
        ],
        metadata: {
          jurisdiction: "United States",
          lastUpdated: new Date().toISOString(),
          version: "1.0",
          requiredFields: ["startDate", "companyName", "employeeName", "position", "baseSalary"],
          recommendedFields: ["nonCompetePeriod", "noticePeriod"],
          notes: [
            "This template includes standard employment agreement clauses",
            "Customize based on local employment laws",
            "Consider adding specific industry clauses"
          ]
        }
      }

      console.log('Creating template with data:', JSON.stringify(templateData, null, 2))
      
      if (!templateData || typeof templateData !== 'object') {
        throw new Error('Invalid template data')
      }

      const template = await prisma.documentTemplate.create({
        data: templateData
      })

      console.log('Template created successfully:', template)
      return template
    } catch (error) {
      console.error('Error in createSampleTemplates:', error)
      throw error
    }
  }
} 