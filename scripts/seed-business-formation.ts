import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function seedBusinessFormation() {
  try {
    console.log('Starting business formation seed...')
    
    // Get or create the Business Formation category
    const category = await prisma.category.upsert({
      where: { id: 'cm9bhpfkd000zvbl0qw9aqww4' },
      update: {
        name: 'Business Formation',
        slug: 'business-formation',
        description: 'LLC operating agreements, partnership agreements, and incorporation documents'
      },
      create: {
        id: 'cm9bhpfkd000zvbl0qw9aqww4',
        name: 'Business Formation',
        slug: 'business-formation',
        description: 'LLC operating agreements, partnership agreements, and incorporation documents'
      }
    })
    console.log('Created/Updated category:', category.name)

    // Create Articles of Incorporation template
    const template = await prisma.documentTemplate.create({
      data: {
        id: 'articles-of-incorporation',
        code: 'ARTICLES_OF_INCORPORATION',
        name: 'Articles of Incorporation',
        description: 'Legal document to form a corporation',
        categoryId: category.id,
        type: 'DOCUMENT',
        version: '1.0.0',
        state: 'PUBLISHED',
        content: `# ARTICLES OF INCORPORATION
[CORPORATION_NAME]

## ARTICLE I - NAME
The name of the corporation is [CORPORATION_NAME]

## ARTICLE II - REGISTERED OFFICE AND AGENT
The address of the registered office is [REGISTERED_OFFICE_ADDRESS]
The name of the registered agent is [REGISTERED_AGENT_NAME]

## ARTICLE III - PURPOSE
The purpose of the corporation is [CORPORATE_PURPOSE]

## ARTICLE IV - CAPITAL STOCK
The corporation is authorized to issue [NUMBER_OF_SHARES] shares of common stock
The par value of each share is [PAR_VALUE]

## ARTICLE V - INCORPORATORS
The names and addresses of the incorporators are:
[INCORPORATOR_LIST]

## ARTICLE VI - INITIAL DIRECTORS
The names and addresses of the initial directors are:
[DIRECTOR_LIST]

## ARTICLE VII - DURATION
The duration of the corporation is [DURATION]

## ARTICLE VIII - LIMITATION OF LIABILITY
[LIABILITY_LIMITATION]

## ARTICLE IX - AMENDMENTS
[AMENDMENT_PROCEDURE]

## ARTICLE X - MISCELLANEOUS
[MISCELLANEOUS_PROVISIONS]

## CERTIFICATION
IN WITNESS WHEREOF, the undersigned incorporator(s) have executed these Articles of Incorporation on [DATE]

___________________________
[INCORPORATOR_SIGNATURE]
[INCORPORATOR_NAME]`,
        metadata: {
          sections: [
            'Basic Information',
            'Corporate Structure',
            'Capital Stock',
            'Management',
            'Legal Provisions',
            'Certification'
          ]
        },
        variables: [
          'CORPORATION_NAME',
          'REGISTERED_OFFICE_ADDRESS',
          'REGISTERED_AGENT_NAME',
          'CORPORATE_PURPOSE',
          'NUMBER_OF_SHARES',
          'PAR_VALUE',
          'INCORPORATOR_LIST',
          'DIRECTOR_LIST',
          'DURATION',
          'LIABILITY_LIMITATION',
          'AMENDMENT_PROCEDURE',
          'MISCELLANEOUS_PROVISIONS',
          'DATE',
          'INCORPORATOR_SIGNATURE',
          'INCORPORATOR_NAME'
        ]
      }
    })
    console.log('Created template:', template.name)

    // Create Articles of Incorporation questionnaire
    const questionnaire = await prisma.questionnaire.create({
      data: {
        id: 'articles-of-incorporation-questions',
        name: 'Articles of Incorporation Questionnaire',
        description: 'Questions for creating Articles of Incorporation',
        templateId: template.id,
        questions: {
          create: [
            {
              label: 'What is the legal name of the corporation?',
              type: 'text',
              required: true,
              section: 'Basic Information'
            },
            {
              label: 'What is the address of the registered office?',
              type: 'text',
              required: true,
              section: 'Basic Information'
            },
            {
              label: 'Who will serve as the registered agent?',
              type: 'text',
              required: true,
              section: 'Basic Information'
            },
            {
              label: 'What is the purpose of the corporation?',
              type: 'textarea',
              required: true,
              section: 'Corporate Structure'
            },
            {
              label: 'How many shares of stock will the corporation be authorized to issue?',
              type: 'number',
              required: true,
              section: 'Capital Stock'
            }
          ]
        }
      }
    })
    console.log('Created questionnaire:', questionnaire.name)

    // Create Business Plan template
    await prisma.documentTemplate.upsert({
      where: { id: 'business-plan' },
      update: {
        categoryId: category.id
      },
      create: {
        id: 'business-plan',
        name: 'Business Plan',
        description: 'Comprehensive business plan template',
        categoryId: category.id,
        content: `# BUSINESS PLAN
[COMPANY_NAME]

## EXECUTIVE SUMMARY
[EXECUTIVE_SUMMARY]

## COMPANY DESCRIPTION
[COMPANY_DESCRIPTION]

## MARKET ANALYSIS
[MARKET_ANALYSIS]

## ORGANIZATION AND MANAGEMENT
[ORGANIZATION_STRUCTURE]

## SERVICE OR PRODUCT LINE
[PRODUCT_DESCRIPTION]

## MARKETING AND SALES
[MARKETING_STRATEGY]

## FUNDING REQUEST
[FUNDING_DETAILS]

## FINANCIAL PROJECTIONS
[FINANCIAL_DATA]

## APPENDIX
[SUPPORTING_DOCUMENTS]`,
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Executive Summary',
            'Company Description',
            'Market Analysis',
            'Organization',
            'Products/Services',
            'Marketing',
            'Financials',
            'Appendix'
          ]
        }
      }
    })
    console.log('Created/Updated template:', 'Business Plan')

    // Create Business Plan questionnaire
    await prisma.questionnaire.upsert({
      where: { id: 'business-plan-questions' },
      update: {},
      create: {
        id: 'business-plan-questions',
        name: 'Business Plan Questionnaire',
        description: 'Questions for creating a Business Plan',
        templateId: 'business-plan',
        metadata: {
          fields: [
            {
              label: 'What is the name of your company?',
              type: 'text',
              required: true,
              section: 'Executive Summary'
            },
            {
              label: 'What is your executive summary?',
              type: 'textarea',
              required: true,
              section: 'Executive Summary'
            },
            {
              label: 'Describe your company and its history',
              type: 'textarea',
              required: true,
              section: 'Company Description'
            },
            {
              label: 'What is your market analysis?',
              type: 'textarea',
              required: true,
              section: 'Market Analysis'
            },
            {
              label: 'Describe your organizational structure',
              type: 'textarea',
              required: true,
              section: 'Organization'
            },
            {
              label: 'Describe your products or services',
              type: 'textarea',
              required: true,
              section: 'Products/Services'
            },
            {
              label: 'What is your marketing strategy?',
              type: 'textarea',
              required: true,
              section: 'Marketing'
            },
            {
              label: 'What are your financial projections?',
              type: 'textarea',
              required: true,
              section: 'Financials'
            }
          ]
        }
      }
    })
    console.log('Created/Updated questionnaire:', 'Business Plan Questionnaire')

    // Create LLC Articles of Organization template
    await prisma.documentTemplate.upsert({
      where: { id: 'llc-articles' },
      update: {
        categoryId: category.id
      },
      create: {
        id: 'llc-articles',
        name: 'LLC Articles of Organization',
        description: 'Legal document to form an LLC',
        categoryId: category.id,
        content: `# ARTICLES OF ORGANIZATION
[LLC_NAME]

## ARTICLE I - NAME
The name of the limited liability company is [LLC_NAME]

## ARTICLE II - REGISTERED OFFICE AND AGENT
The address of the registered office is [REGISTERED_OFFICE_ADDRESS]
The name of the registered agent is [REGISTERED_AGENT_NAME]

## ARTICLE III - PURPOSE
The purpose of the limited liability company is [LLC_PURPOSE]

## ARTICLE IV - MANAGEMENT
The limited liability company will be managed by [MANAGEMENT_STRUCTURE]

## ARTICLE V - ORGANIZERS
The names and addresses of the organizers are:
[ORGANIZER_LIST]

## ARTICLE VI - DURATION
The duration of the limited liability company is [DURATION]

## ARTICLE VII - LIABILITY
[LIABILITY_PROVISIONS]

## ARTICLE VIII - DISTRIBUTIONS
[DISTRIBUTION_PROVISIONS]

## ARTICLE IX - DISSOLUTION
[DISSOLUTION_PROVISIONS]

## ARTICLE X - MISCELLANEOUS
[MISCELLANEOUS_PROVISIONS]

## CERTIFICATION
IN WITNESS WHEREOF, the undersigned organizer(s) have executed these Articles of Organization on [DATE]

___________________________
[ORGANIZER_SIGNATURE]
[ORGANIZER_NAME]`,
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Basic Information',
            'Management Structure',
            'Organizers',
            'Legal Provisions',
            'Certification'
          ]
        }
      }
    })
    console.log('Created/Updated template:', 'LLC Articles of Organization')

    // Create LLC Articles of Organization questionnaire
    await prisma.questionnaire.upsert({
      where: { id: 'llc-articles-questions' },
      update: {},
      create: {
        id: 'llc-articles-questions',
        name: 'LLC Articles of Organization Questionnaire',
        description: 'Questions for creating LLC Articles of Organization',
        templateId: 'llc-articles',
        metadata: {
          fields: [
            {
              label: 'What is the legal name of the LLC?',
              type: 'text',
              required: true,
              section: 'Basic Information'
            },
            {
              label: 'What is the address of the registered office?',
              type: 'text',
              required: true,
              section: 'Basic Information'
            },
            {
              label: 'Who will serve as the registered agent?',
              type: 'text',
              required: true,
              section: 'Basic Information'
            },
            {
              label: 'What is the purpose of the LLC?',
              type: 'textarea',
              required: true,
              section: 'Basic Information'
            },
            {
              label: 'How will the LLC be managed?',
              type: 'select',
              required: true,
              section: 'Management Structure',
              options: ['Member-managed', 'Manager-managed']
            },
            {
              label: 'Who are the organizers?',
              type: 'textarea',
              required: true,
              section: 'Organizers'
            },
            {
              label: 'What is the duration of the LLC?',
              type: 'text',
              required: true,
              section: 'Legal Provisions'
            },
            {
              label: 'What liability provisions should be included?',
              type: 'textarea',
              required: true,
              section: 'Legal Provisions'
            }
          ]
        }
      }
    })
    console.log('Created/Updated questionnaire:', 'LLC Articles of Organization Questionnaire')

    // Create LLC Operating Agreement template
    await prisma.documentTemplate.upsert({
      where: { id: 'llc-operating' },
      update: {
        categoryId: category.id
      },
      create: {
        id: 'llc-operating',
        name: 'LLC Operating Agreement',
        description: 'Agreement governing the operation of an LLC',
        categoryId: category.id,
        content: `# LLC OPERATING AGREEMENT
[LLC_NAME]

## ARTICLE I - ORGANIZATION
1.1 Name: [LLC_NAME]
1.2 Formation Date: [FORMATION_DATE]
1.3 Purpose: [LLC_PURPOSE]
1.4 Principal Place of Business: [BUSINESS_ADDRESS]
1.5 Registered Agent: [REGISTERED_AGENT]

## ARTICLE II - MEMBERSHIP
2.1 Initial Members: [MEMBER_LIST]
2.2 Capital Contributions: [CAPITAL_CONTRIBUTIONS]
2.3 Additional Members: [ADMISSION_TERMS]
2.4 Withdrawal: [WITHDRAWAL_TERMS]

## ARTICLE III - MANAGEMENT
3.1 Management Structure: [MANAGEMENT_TYPE]
3.2 Voting Rights: [VOTING_RIGHTS]
3.3 Meetings: [MEETING_REQUIREMENTS]

## ARTICLE IV - DISTRIBUTIONS
4.1 Profit Distributions: [DISTRIBUTION_TERMS]
4.2 Tax Distributions: [TAX_DISTRIBUTION_TERMS]

## ARTICLE V - DISSOLUTION
5.1 Dissolution Events: [DISSOLUTION_EVENTS]
5.2 Liquidation Process: [LIQUIDATION_PROCESS]

## ARTICLE VI - MISCELLANEOUS
6.1 Amendments: [AMENDMENT_PROCESS]
6.2 Governing Law: [GOVERNING_LAW]

## SIGNATURES
IN WITNESS WHEREOF, the Members have executed this Operating Agreement as of [DATE].

[MEMBER_SIGNATURES]`,
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Organization',
            'Membership',
            'Management',
            'Distributions',
            'Dissolution',
            'Miscellaneous'
          ]
        }
      }
    })
    console.log('Created/Updated template:', 'LLC Operating Agreement')

    // Create LLC Operating Agreement questionnaire
    await prisma.questionnaire.upsert({
      where: { id: 'llc-operating-questions' },
      update: {},
      create: {
        id: 'llc-operating-questions',
        name: 'LLC Operating Agreement Questionnaire',
        description: 'Questions for creating an LLC Operating Agreement',
        templateId: 'llc-operating',
        questions: {
          create: [
            {
              label: 'What is the name of the LLC?',
              type: 'text',
              required: true,
              section: 'Organization'
            },
            {
              label: 'When was the LLC formed?',
              type: 'date',
              required: true,
              section: 'Organization'
            },
            {
              label: 'What is the purpose of the LLC?',
              type: 'textarea',
              required: true,
              section: 'Organization'
            },
            {
              label: 'What is the principal place of business?',
              type: 'text',
              required: true,
              section: 'Organization'
            },
            {
              label: 'Who is the registered agent?',
              type: 'text',
              required: true,
              section: 'Organization'
            },
            {
              label: 'List all initial members',
              type: 'textarea',
              required: true,
              section: 'Membership'
            },
            {
              label: 'What are the capital contributions of each member?',
              type: 'textarea',
              required: true,
              section: 'Membership'
            },
            {
              label: 'What are the terms for admitting new members?',
              type: 'textarea',
              required: true,
              section: 'Membership'
            },
            {
              label: 'How will the LLC be managed?',
              type: 'select',
              required: true,
              section: 'Management',
              options: {
                create: [
                  { value: 'member', label: 'Member-managed' },
                  { value: 'manager', label: 'Manager-managed' }
                ]
              }
            },
            {
              label: 'How will voting rights be allocated?',
              type: 'textarea',
              required: true,
              section: 'Management'
            },
            {
              label: 'How will profits be distributed?',
              type: 'textarea',
              required: true,
              section: 'Distributions'
            },
            {
              label: 'What events will trigger dissolution?',
              type: 'textarea',
              required: true,
              section: 'Dissolution'
            }
          ]
        }
      }
    })
    console.log('Created/Updated questionnaire:', 'LLC Operating Agreement Questionnaire')

    // Create Single-Member LLC Operating Agreement template
    await prisma.documentTemplate.upsert({
      where: { id: 'single-member-llc' },
      update: {
        categoryId: category.id
      },
      create: {
        id: 'single-member-llc',
        name: 'Single-Member LLC Operating Agreement',
        description: 'Operating agreement for single-member LLCs',
        categoryId: category.id,
        content: `# SINGLE-MEMBER LLC OPERATING AGREEMENT
[LLC_NAME]

## ARTICLE I - ORGANIZATION
1.1 Name: [LLC_NAME]
1.2 Formation Date: [FORMATION_DATE]
1.3 Purpose: [LLC_PURPOSE]
1.4 Principal Place of Business: [BUSINESS_ADDRESS]
1.5 Registered Agent: [REGISTERED_AGENT]

## ARTICLE II - SOLE MEMBER
2.1 Member Information: [MEMBER_INFO]
2.2 Capital Contribution: [CAPITAL_CONTRIBUTION]
2.3 Additional Capital: [ADDITIONAL_CAPITAL_TERMS]

## ARTICLE III - MANAGEMENT
3.1 Management: [MANAGEMENT_STRUCTURE]
3.2 Authority: [MEMBER_AUTHORITY]
3.3 Succession: [SUCCESSION_PLAN]

## ARTICLE IV - ACCOUNTING AND DISTRIBUTIONS
4.1 Fiscal Year: [FISCAL_YEAR]
4.2 Tax Treatment: [TAX_TREATMENT]
4.3 Distributions: [DISTRIBUTION_TERMS]

## ARTICLE V - DISSOLUTION
5.1 Dissolution Events: [DISSOLUTION_EVENTS]
5.2 Winding Up: [WINDING_UP_PROCESS]

## SIGNATURE
IN WITNESS WHEREOF, the Sole Member has executed this Operating Agreement as of [DATE].

[MEMBER_SIGNATURE]`,
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Organization',
            'Sole Member',
            'Management',
            'Accounting',
            'Dissolution'
          ]
        }
      }
    })
    console.log('Created/Updated template:', 'Single-Member LLC Operating Agreement')

    // Create Single-Member LLC Operating Agreement questionnaire
    await prisma.questionnaire.upsert({
      where: { id: 'single-member-llc-questions' },
      update: {},
      create: {
        id: 'single-member-llc-questions',
        name: 'Single-Member LLC Operating Agreement Questionnaire',
        description: 'Questions for creating a Single-Member LLC Operating Agreement',
        templateId: 'single-member-llc',
        questions: {
          create: [
            {
              label: 'What is the name of the LLC?',
              type: 'text',
              required: true,
              section: 'Organization'
            },
            {
              label: 'When was the LLC formed?',
              type: 'date',
              required: true,
              section: 'Organization'
            },
            {
              label: 'What is the purpose of the LLC?',
              type: 'textarea',
              required: true,
              section: 'Organization'
            },
            {
              label: 'What is the principal place of business?',
              type: 'text',
              required: true,
              section: 'Organization'
            },
            {
              label: 'Who is the registered agent?',
              type: 'text',
              required: true,
              section: 'Organization'
            },
            {
              label: 'Enter the sole member\'s information',
              type: 'textarea',
              required: true,
              section: 'Sole Member'
            },
            {
              label: 'What is the initial capital contribution?',
              type: 'text',
              required: true,
              section: 'Sole Member'
            },
            {
              label: 'How will additional capital contributions be handled?',
              type: 'textarea',
              required: true,
              section: 'Sole Member'
            },
            {
              label: 'What is the succession plan?',
              type: 'textarea',
              required: true,
              section: 'Management'
            },
            {
              label: 'What is the fiscal year end date?',
              type: 'select',
              required: true,
              section: 'Accounting',
              options: {
                create: [
                  { value: 'dec31', label: 'December 31' },
                  { value: 'jun30', label: 'June 30' }
                ]
              }
            },
            {
              label: 'How will distributions be handled?',
              type: 'textarea',
              required: true,
              section: 'Accounting'
            },
            {
              label: 'What events will trigger dissolution?',
              type: 'textarea',
              required: true,
              section: 'Dissolution'
            }
          ]
        }
      }
    })
    console.log('Created/Updated questionnaire:', 'Single-Member LLC Operating Agreement Questionnaire')

    // Create One Page Business Plan template
    await prisma.documentTemplate.upsert({
      where: { id: 'one-page-plan' },
      update: {
        categoryId: category.id
      },
      create: {
        id: 'one-page-plan',
        name: 'One Page Business Plan',
        description: 'Concise business plan template',
        categoryId: category.id,
        content: `# ONE PAGE BUSINESS PLAN
[COMPANY_NAME]

## VISION
[VISION_STATEMENT]

## MISSION
[MISSION_STATEMENT]

## OBJECTIVES
[KEY_OBJECTIVES]

## STRATEGIES
[KEY_STRATEGIES]

## TARGET MARKET
[TARGET_MARKET]

## UNIQUE VALUE PROPOSITION
[VALUE_PROPOSITION]

## REVENUE MODEL
[REVENUE_MODEL]

## KEY METRICS
[KEY_METRICS]

## COMPETITIVE ADVANTAGE
[COMPETITIVE_ADVANTAGE]

## TIMELINE
[IMPLEMENTATION_TIMELINE]`,
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Company Overview',
            'Strategy',
            'Market',
            'Financials',
            'Implementation'
          ]
        }
      }
    })
    console.log('Created/Updated template:', 'One Page Business Plan')

    // Create One Page Business Plan questionnaire
    await prisma.questionnaire.upsert({
      where: { id: 'one-page-plan-questions' },
      update: {},
      create: {
        id: 'one-page-plan-questions',
        name: 'One Page Business Plan Questionnaire',
        description: 'Questions for creating a One Page Business Plan',
        templateId: 'one-page-plan',
        questions: {
          create: [
            {
              label: 'What is your company name?',
              type: 'text',
              required: true,
              section: 'Company Overview'
            },
            {
              label: 'What is your vision statement?',
              type: 'textarea',
              required: true,
              section: 'Company Overview'
            },
            {
              label: 'What is your mission statement?',
              type: 'textarea',
              required: true,
              section: 'Company Overview'
            },
            {
              label: 'What are your key objectives?',
              type: 'textarea',
              required: true,
              section: 'Strategy'
            },
            {
              label: 'What are your key strategies?',
              type: 'textarea',
              required: true,
              section: 'Strategy'
            },
            {
              label: 'Who is your target market?',
              type: 'textarea',
              required: true,
              section: 'Market'
            },
            {
              label: 'What is your unique value proposition?',
              type: 'textarea',
              required: true,
              section: 'Market'
            },
            {
              label: 'What is your revenue model?',
              type: 'textarea',
              required: true,
              section: 'Financials'
            },
            {
              label: 'What are your key metrics?',
              type: 'textarea',
              required: true,
              section: 'Financials'
            },
            {
              label: 'What is your competitive advantage?',
              type: 'textarea',
              required: true,
              section: 'Strategy'
            },
            {
              label: 'What is your implementation timeline?',
              type: 'textarea',
              required: true,
              section: 'Implementation'
            }
          ]
        }
      }
    })
    console.log('Created/Updated questionnaire:', 'One Page Business Plan Questionnaire')

    // Create SWOT Analysis template
    await prisma.documentTemplate.upsert({
      where: { id: 'swot-analysis' },
      update: {
        categoryId: category.id
      },
      create: {
        id: 'swot-analysis',
        name: 'SWOT Analysis',
        description: 'Strategic planning template',
        categoryId: category.id,
        content: `# SWOT ANALYSIS
[COMPANY_NAME]

## STRENGTHS
[STRENGTHS_LIST]

## WEAKNESSES
[WEAKNESSES_LIST]

## OPPORTUNITIES
[OPPORTUNITIES_LIST]

## THREATS
[THREATS_LIST]

## ACTION ITEMS
[ACTION_ITEMS]

## TIMELINE
[IMPLEMENTATION_TIMELINE]

## RESPONSIBLE PARTIES
[RESPONSIBLE_PARTIES]

## MONITORING AND REVIEW
[MONITORING_PLAN]`,
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Company Information',
            'Internal Analysis',
            'External Analysis',
            'Implementation'
          ]
        }
      }
    })
    console.log('Created/Updated template:', 'SWOT Analysis')

    // Create SWOT Analysis questionnaire
    await prisma.questionnaire.upsert({
      where: { id: 'swot-analysis-questions' },
      update: {},
      create: {
        id: 'swot-analysis-questions',
        name: 'SWOT Analysis Questionnaire',
        description: 'Questions for creating a SWOT Analysis',
        templateId: 'swot-analysis',
        questions: {
          create: [
            {
              label: 'What is your company name?',
              type: 'text',
              required: true,
              section: 'Company Information'
            },
            {
              label: 'What are your company\'s strengths?',
              type: 'textarea',
              required: true,
              section: 'Internal Analysis'
            },
            {
              label: 'What are your company\'s weaknesses?',
              type: 'textarea',
              required: true,
              section: 'Internal Analysis'
            },
            {
              label: 'What opportunities exist in the market?',
              type: 'textarea',
              required: true,
              section: 'External Analysis'
            },
            {
              label: 'What threats exist in the market?',
              type: 'textarea',
              required: true,
              section: 'External Analysis'
            },
            {
              label: 'What action items will address the SWOT findings?',
              type: 'textarea',
              required: true,
              section: 'Implementation'
            },
            {
              label: 'What is the implementation timeline?',
              type: 'textarea',
              required: true,
              section: 'Implementation'
            },
            {
              label: 'Who will be responsible for implementation?',
              type: 'textarea',
              required: true,
              section: 'Implementation'
            },
            {
              label: 'How will progress be monitored and reviewed?',
              type: 'textarea',
              required: true,
              section: 'Implementation'
            }
          ]
        }
      }
    })
    console.log('Created/Updated questionnaire:', 'SWOT Analysis Questionnaire')

    // Create Registered Agent Service template
    await prisma.documentTemplate.upsert({
      where: { id: 'cm9bhpem2000fvbl0lbbcfjgd' },
      update: {
        categoryId: category.id
      },
      create: {
        id: 'cm9bhpem2000fvbl0lbbcfjgd',
        name: 'Registered Agent Service',
        description: 'Service agreement for registered agent',
        categoryId: category.id,
        content: `# REGISTERED AGENT SERVICE AGREEMENT
[COMPANY_NAME]

## PARTIES
This Registered Agent Service Agreement (the "Agreement") is made and entered into as of [DATE] (the "Effective Date") by and between:

[COMPANY_NAME], a [STATE] [ENTITY_TYPE] ("Client"), and
[AGENT_NAME], a [STATE] [ENTITY_TYPE] ("Agent").

## SERVICES
1.1 Appointment. Client hereby appoints Agent as its registered agent in the State of [STATE] for the purpose of receiving service of process and other legal documents.

1.2 Duties. Agent agrees to:
(a) Accept service of process and other legal documents on behalf of Client
(b) Forward all received documents to Client within [TIME_FRAME]
(c) Maintain a registered office in [STATE]
(d) Comply with all applicable state laws and regulations

## TERM AND TERMINATION
2.1 Term. This Agreement shall commence on the Effective Date and continue for [TERM_LENGTH].

2.2 Termination. Either party may terminate this Agreement upon [NOTICE_PERIOD] written notice to the other party.

## COMPENSATION
3.1 Fees. Client shall pay Agent an annual fee of [FEE_AMOUNT] for the services provided under this Agreement.

3.2 Payment Terms. Payment shall be due [PAYMENT_TERMS].

## MISCELLANEOUS
4.1 Governing Law. This Agreement shall be governed by the laws of the State of [STATE].

4.2 Entire Agreement. This Agreement constitutes the entire agreement between the parties.

## SIGNATURES
IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.

___________________________      ___________________________
[CLIENT_SIGNATURE]               [AGENT_SIGNATURE]
[CLIENT_NAME]                    [AGENT_NAME]
[CLIENT_TITLE]                   [AGENT_TITLE]`,
        type: 'document',
        version: '1.0.0',
        state: 'published',
        metadata: {
          sections: [
            'Parties',
            'Services',
            'Term and Termination',
            'Compensation',
            'Miscellaneous',
            'Signatures'
          ]
        }
      }
    })
    console.log('Created/Updated template:', 'Registered Agent Service')

    // Create Registered Agent Service questionnaire
    const agentServiceQuestionnaire = await prisma.questionnaire.upsert({
      where: { id: 'cm9bhpem2000gvbl0lbbcfjge' },
      update: {
        questions: {
          deleteMany: {},  // Clear existing questions first
          create: [
            {
              label: 'What is the name of your company?',
              type: 'TEXT',
              required: true,
              section: 'Parties'
            },
            {
              label: 'What type of entity is your company?',
              type: 'SELECT',
              required: true,
              section: 'Parties',
              options: {
                create: [
                  { value: 'corporation', label: 'Corporation' },
                  { value: 'llc', label: 'LLC' },
                  { value: 'partnership', label: 'Partnership' }
                ]
              }
            },
            {
              label: 'What is the name of the registered agent?',
              type: 'TEXT',
              required: true,
              section: 'Parties'
            },
            {
              label: 'What type of entity is the registered agent?',
              type: 'SELECT',
              required: true,
              section: 'Parties',
              options: {
                create: [
                  { value: 'corporation', label: 'Corporation' },
                  { value: 'llc', label: 'LLC' },
                  { value: 'individual', label: 'Individual' }
                ]
              }
            },
            {
              label: 'In which state will the registered agent service be provided?',
              type: 'TEXT',
              required: true,
              section: 'Services'
            }
          ]
        }
      },
      create: {
        id: 'cm9bhpem2000gvbl0lbbcfjge',
        name: 'Registered Agent Service Questionnaire',
        description: 'Questions for creating a Registered Agent Service Agreement',
        templateId: 'cm9bhpem2000fvbl0lbbcfjgd',
        questions: {
          create: [
            {
              label: 'What is the name of your company?',
              type: 'TEXT',
              required: true,
              section: 'Parties'
            },
            {
              label: 'What type of entity is your company?',
              type: 'SELECT',
              required: true,
              section: 'Parties',
              options: {
                create: [
                  { value: 'corporation', label: 'Corporation' },
                  { value: 'llc', label: 'LLC' },
                  { value: 'partnership', label: 'Partnership' }
                ]
              }
            },
            {
              label: 'What is the name of the registered agent?',
              type: 'TEXT',
              required: true,
              section: 'Parties'
            },
            {
              label: 'What type of entity is the registered agent?',
              type: 'SELECT',
              required: true,
              section: 'Parties',
              options: {
                create: [
                  { value: 'corporation', label: 'Corporation' },
                  { value: 'llc', label: 'LLC' },
                  { value: 'individual', label: 'Individual' }
                ]
              }
            },
            {
              label: 'In which state will the registered agent service be provided?',
              type: 'TEXT',
              required: true,
              section: 'Services'
            }
          ]
        }
      }
    })
    console.log('Created/Updated questionnaire:', agentServiceQuestionnaire.name)

    console.log('Business formation seed completed successfully!')
  } catch (error) {
    console.error('Error in business formation seed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
} 