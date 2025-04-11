import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addTemplates() {
  try {
    console.log('Starting to add templates to categories...')

    // Get all existing categories from the database
    const existingCategories = await prisma.category.findMany()
    console.log('Found existing categories:', existingCategories.map(c => c.name))

    // Template data to add
    const templateData = [
      {
        categoryName: "Business Formation",
        templates: [
          {
            code: "articles-of-incorporation",
            name: "Articles of Incorporation",
            description: "Legal document to form a corporation"
          },
          {
            code: "business-plan",
            name: "Business Plan",
            description: "Comprehensive business plan template"
          },
          {
            code: "llc-articles",
            name: "LLC Articles of Organization",
            description: "Legal document to form an LLC"
          },
          {
            code: "llc-operating",
            name: "LLC Operating Agreement",
            description: "Agreement governing the operation of an LLC"
          },
          {
            code: "single-member-llc",
            name: "Single-Member LLC Operating Agreement",
            description: "Operating agreement for single-member LLCs"
          },
          {
            code: "one-page-plan",
            name: "One Page Business Plan",
            description: "Concise business plan template"
          },
          {
            code: "swot-analysis",
            name: "SWOT Analysis",
            description: "Strategic planning template"
          },
          {
            code: "registered-agent",
            name: "Registered Agent Service",
            description: "Service agreement for registered agent"
          }
        ]
      },
      {
        categoryName: "Corporate Governance",
        templates: [
          {
            code: "corporate-resolution",
            name: "Corporate Resolution",
            description: "Formal documentation of corporate decisions and authorizations"
          },
          {
            code: "certificate-of-incumbency",
            name: "Certificate of Incumbency",
            description: "Official certification of current directors and officers of the corporation"
          },
          {
            code: "consent-to-action",
            name: "Consent to Action Without Meeting",
            description: "Written consent for corporate actions without a formal meeting"
          },
          {
            code: "consent-to-serve",
            name: "Consent to be Director and Officer",
            description: "Written consent for an individual to serve as director and/or officer"
          },
          {
            code: "directors-org-meeting",
            name: "Directors' Organizational Meeting",
            description: "Documentation of the initial organizational meeting of the board of directors"
          },
          {
            code: "directors-resolution",
            name: "Directors' Resolution",
            description: "Formal documentation of board decisions and authorizations"
          },
          {
            code: "incorporators-meeting",
            name: "Incorporators' Organizational Meeting",
            description: "Documentation of the initial organizational meeting of the incorporators"
          },
          {
            code: "minute-book-rights-inspection",
            name: "Minute Book Rights of Inspection",
            description: "Document outlining the rights and procedures for inspecting corporate records"
          },
          {
            code: "board-resolution",
            name: "Board Resolution",
            description: "Formal decision or action taken by the board of directors"
          },
          {
            code: "shareholder-meeting-notice",
            name: "Shareholder Meeting Notice",
            description: "Notice of annual or special meeting of shareholders"
          },
          {
            code: "officer-appointment",
            name: "Officer Appointment",
            description: "Document appointing corporate officers"
          },
          {
            code: "corporate-bylaws",
            name: "Corporate Bylaws",
            description: "Rules and procedures for corporate governance"
          }
        ]
      },
      {
        categoryName: "Employment & HR",
        templates: [
          {
            code: "employment-contract",
            name: "Employment Contract / Contrato de Trabajo",
            description: "Standard employment agreement outlining terms and conditions of employment"
          },
          {
            code: "employee-evaluation",
            name: "Employee Evaluation",
            description: "Form for evaluating employee performance and setting future goals"
          },
          {
            code: "employee-handbook",
            name: "Employee Handbook",
            description: "Comprehensive guide to company policies and procedures"
          },
          {
            code: "employee-privacy-policy",
            name: "Employee Privacy Policy",
            description: "Policy outlining how employee personal information is handled"
          },
          {
            code: "employee-warning-letter",
            name: "Employee Warning Letter",
            description: "Formal documentation of employee performance or conduct issues"
          },
          {
            code: "employment-offer-letter",
            name: "Employment Offer Letter",
            description: "Formal job offer with terms and conditions of employment"
          },
          {
            code: "employment-termination-letter",
            name: "Employment Termination Letter",
            description: "Formal letter for terminating an employee"
          },
          {
            code: "new-hire-checklist",
            name: "New Hire Checklist",
            description: "Comprehensive checklist for onboarding new employees"
          },
          {
            code: "progressive-discipline-policy",
            name: "Progressive Discipline Policy",
            description: "Comprehensive policy outlining steps and procedures for employee discipline"
          },
          {
            code: "remote-work-policy",
            name: "Remote Work Policy",
            description: "Policy governing remote work arrangements and requirements"
          },
          {
            code: "resignation-letter",
            name: "Resignation Letter / Carta de Renuncia",
            description: "Professional letter template for submitting resignation"
          },
          {
            code: "resume-template",
            name: "Resume",
            description: "Professional resume template with customizable sections"
          },
          {
            code: "reference-list",
            name: "Reference List",
            description: "Professional reference list template for job applications"
          },
          {
            code: "termination-agreement",
            name: "Termination Agreement",
            description: "Comprehensive agreement for employee termination"
          },
          {
            code: "notice-of-termination",
            name: "Notice of Termination",
            description: "Formal notice of employee termination"
          }
        ]
      },
      {
        categoryName: "Real Estate",
        templates: [
          {
            code: "apartment-lease",
            name: "Apartment Lease Agreement",
            description: "Standard apartment lease agreement template"
          },
          {
            code: "lease-termination",
            name: "Lease Termination Agreement",
            description: "Agreement to terminate a lease before its original end date"
          },
          {
            code: "rental-application",
            name: "Rental Application Form",
            description: "Application form for potential tenants"
          },
          {
            code: "commercial-lease",
            name: "Commercial Lease Agreement",
            description: "Comprehensive commercial property lease agreement"
          },
          {
            code: "commercial-lease-application",
            name: "Commercial Lease Application",
            description: "Application form for commercial property lease"
          }
        ]
      }
    ]

    // Add templates for each category
    for (const categoryData of templateData) {
      console.log(`Processing category: ${categoryData.categoryName}`)
      
      // Find the category in the database
      const category = existingCategories.find(c => c.name === categoryData.categoryName)
      if (!category) {
        console.log(`Category not found: ${categoryData.categoryName}`)
        continue
      }

      // Add templates to the category
      for (const template of categoryData.templates) {
        // Check if template already exists
        const existingTemplate = await prisma.documentTemplate.findFirst({
          where: {
            code: template.code,
            categoryId: category.id
          }
        })

        if (!existingTemplate) {
          // Create new template
          await prisma.documentTemplate.create({
            data: {
              code: template.code,
              name: template.name,
              description: template.description,
              categoryId: category.id,
              content: "", // Empty content for now
              type: "template",
              version: "1.0.0"
            }
          })
          console.log(`Created template: ${template.name}`)
        } else {
          console.log(`Template already exists: ${template.name}`)
        }
      }
    }

    console.log('Finished adding templates!')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addTemplates() 