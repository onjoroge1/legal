import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createRealEstateTemplates2() {
  try {
    console.log('Creating additional real estate templates...')

    // Get the real estate category
    const realEstateCategory = await prisma.category.findUnique({
      where: { id: 'real-estate' }
    })

    if (!realEstateCategory) {
      throw new Error('Real estate category not found')
    }

    console.log('Found real estate category:', realEstateCategory)

    // Create Contract for Deed template
    console.log('Creating Contract for Deed template...')
    const contractForDeed = await prisma.documentTemplate.create({
      data: {
        id: 'contract-for-deed',
        name: 'Contract for Deed / Land Contract',
        type: 'contract',
        description: 'A legal agreement for seller-financed real estate purchases where the seller retains title until full payment is made',
        content: [
          '# Contract for Deed / Land Contract',
          '',
          'This Contract for Deed (the "Contract") is made on {contractDate}, between:',
          '',
          'SELLER(S):',
          '{sellerName}',
          'residing at {sellerAddress}',
          '',
          'and',
          '',
          'BUYER(S):',
          '{buyerName}',
          'residing at {buyerAddress}',
          '',
          '## 1. Property Description',
          'The Seller agrees to sell and the Buyer agrees to purchase the following described real property:',
          '',
          'Legal Description:',
          '{legalDescription}',
          '',
          'Property Address: {propertyAddress}',
          'County: {propertyCounty}',
          'State: {propertyState}',
          '',
          '## 2. Purchase Price and Payment Terms',
          'Total Purchase Price: ${totalPrice}',
          'Down Payment: ${downPayment}',
          'Principal Balance to be Financed: ${principalBalance}',
          '',
          'Interest Rate: {interestRate}% per annum',
          'Monthly Payment: ${monthlyPayment}',
          'Payment Due Date: {paymentDueDate} of each month',
          'Term: {contractTerm}',
          '',
          'Balloon Payment (if applicable):',
          '{balloonPayment}',
          '',
          'Payment Instructions:',
          '{paymentInstructions}',
          '',
          '## 3. Late Payments and Penalties',
          '{latePaymentTerms}',
          '',
          '## 4. Prepayment',
          '{prepaymentTerms}',
          '',
          '## 5. Possession and Use',
          'Possession Date: {possessionDate}',
          '',
          'Property Use Restrictions:',
          '{useRestrictions}',
          '',
          'Improvements:',
          '{improvementTerms}',
          '',
          '## 6. Taxes and Insurance',
          'Property Tax Responsibility: {taxResponsibility}',
          '',
          'Insurance Requirements:',
          '{insuranceRequirements}',
          '',
          '## 7. Property Maintenance',
          '{maintenanceTerms}',
          '',
          '## 8. Default and Remedies',
          'Cure Period: {curePeriod}',
          '',
          'Default Remedies:',
          '{defaultRemedies}',
          '',
          '## 9. Title and Conveyance',
          'Type of Deed for Final Conveyance: {deedType}',
          '',
          'Existing Liens or Encumbrances:',
          '{existingLiens}',
          '',
          '## 10. Seller\'s Disclosures',
          '{sellerDisclosures}',
          '',
          '## 11. Assignment',
          'Buyer Assignment Rights: {buyerAssignmentRights}',
          'Seller Assignment Rights: {sellerAssignmentRights}',
          '',
          '## 12. Recording',
          '{recordingProcess}',
          '',
          '## 13. Succession',
          '{successionTerms}',
          '',
          '## 14. Governing Law',
          'This Contract shall be governed by the laws of {governingLaw}.',
          '',
          '## Signatures',
          '',
          '_________________',
          'Seller Signature',
          'Date: {sellerSignDate}',
          '',
          '_________________',
          'Buyer Signature',
          'Date: {buyerSignDate}',
          '',
          'NOTARY ACKNOWLEDGMENT',
          '{notaryAcknowledgment}'
        ].join('\n'),
        categoryId: realEstateCategory.id,
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'contract',
          version: '1.0.0'
        }
      }
    })

    // Create Contract for Deed questionnaire
    const contractForDeedQuestionnaire = await prisma.questionnaire.upsert({
      where: {
        id: `${contractForDeed.id}-questionnaire`
      },
      update: {
        name: 'Contract for Deed Questionnaire',
        description: 'Questions for generating a contract for deed',
        templateId: contractForDeed.id,
        questions: {
          deleteMany: {},
          create: [
            {
              label: 'What is the date of the contract?',
              type: 'date',
              required: true,
              section: 'Basic Information'
            },
            {
              label: 'What is the full legal name of the seller(s)?',
              type: 'text',
              required: true,
              section: 'Seller Information'
            },
            {
              label: 'What is the address of the seller(s)?',
              type: 'textarea',
              required: true,
              section: 'Seller Information'
            },
            {
              label: 'What is the full legal name of the buyer(s)?',
              type: 'text',
              required: true,
              section: 'Buyer Information'
            },
            {
              label: 'What is the address of the buyer(s)?',
              type: 'textarea',
              required: true,
              section: 'Buyer Information'
            },
            {
              label: 'What is the legal description of the property?',
              type: 'textarea',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What is the street address of the property?',
              type: 'text',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What county and state is the property located in?',
              type: 'text',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What is the total purchase price?',
              type: 'text',
              required: true,
              section: 'Financial Terms',
              helpText: 'Enter the total amount the buyer will pay for the property'
            },
            {
              label: 'What is the down payment amount?',
              type: 'text',
              required: true,
              section: 'Financial Terms'
            },
            {
              label: 'What is the principal balance to be financed?',
              type: 'text',
              required: true,
              section: 'Financial Terms',
              helpText: 'Total purchase price minus down payment'
            },
            {
              label: 'What is the interest rate?',
              type: 'text',
              required: true,
              section: 'Financial Terms',
              helpText: 'Enter as a percentage'
            },
            {
              label: 'What is the monthly payment amount?',
              type: 'text',
              required: true,
              section: 'Payment Terms'
            },
            {
              label: 'What day of the month is payment due?',
              type: 'text',
              required: true,
              section: 'Payment Terms'
            },
            {
              label: 'What is the term of the contract?',
              type: 'text',
              required: true,
              section: 'Payment Terms',
              helpText: 'Specify the number of months or years'
            },
            {
              label: 'Is there a balloon payment? If so, when and how much?',
              type: 'textarea',
              required: false,
              section: 'Payment Terms'
            },
            {
              label: 'Where and how should payments be made?',
              type: 'textarea',
              required: true,
              section: 'Payment Terms'
            },
            {
              label: 'What happens in case of late payments? Are there late fees?',
              type: 'textarea',
              required: true,
              section: 'Default and Penalties'
            },
            {
              label: 'Are there prepayment privileges or penalties?',
              type: 'textarea',
              required: true,
              section: 'Payment Terms'
            },
            {
              label: 'When does the buyer take possession of the property?',
              type: 'date',
              required: true,
              section: 'Possession'
            },
            {
              label: 'Who is responsible for property taxes?',
              type: 'select',
              required: true,
              section: 'Responsibilities',
              options: {
                create: [
                  { value: 'seller', label: 'Seller' },
                  { value: 'buyer', label: 'Buyer' },
                  { value: 'shared', label: 'Shared' }
                ]
              }
            },
            {
              label: 'Who is responsible for property insurance?',
              type: 'select',
              required: true,
              section: 'Responsibilities',
              options: {
                create: [
                  { value: 'seller', label: 'Seller' },
                  { value: 'buyer', label: 'Buyer' },
                  { value: 'shared', label: 'Shared' }
                ]
              }
            },
            {
              label: 'Who is responsible for property maintenance?',
              type: 'select',
              required: true,
              section: 'Responsibilities',
              options: {
                create: [
                  { value: 'seller', label: 'Seller' },
                  { value: 'buyer', label: 'Buyer' },
                  { value: 'shared', label: 'Shared' }
                ]
              }
            },
            {
              label: 'What insurance requirements are there?',
              type: 'textarea',
              required: true,
              section: 'Insurance'
            },
            {
              label: 'Are there any restrictions on the buyer\'s use of the property?',
              type: 'textarea',
              required: true,
              section: 'Property Use'
            },
            {
              label: 'Can the buyer make improvements to the property?',
              type: 'textarea',
              required: true,
              section: 'Property Use'
            },
            {
              label: 'What happens in case of default by the buyer?',
              type: 'textarea',
              required: true,
              section: 'Default and Remedies'
            },
            {
              label: 'What cure period exists for default?',
              type: 'text',
              required: true,
              section: 'Default and Remedies'
            },
            {
              label: 'What is the process for forfeiture or foreclosure?',
              type: 'textarea',
              required: true,
              section: 'Default and Remedies'
            },
            {
              label: 'When will the deed be delivered to the buyer?',
              type: 'textarea',
              required: true,
              section: 'Title and Conveyance'
            },
            {
              label: 'What type of deed will be used for final conveyance?',
              type: 'select',
              required: true,
              section: 'Title and Conveyance',
              options: {
                create: [
                  { value: 'warranty', label: 'Warranty Deed' },
                  { value: 'special-warranty', label: 'Special Warranty Deed' },
                  { value: 'quitclaim', label: 'Quitclaim Deed' }
                ]
              }
            },
            {
              label: 'Are there any existing liens or mortgages on the property?',
              type: 'textarea',
              required: true,
              section: 'Title and Conveyance'
            },
            {
              label: 'What disclosures is the seller required to provide?',
              type: 'textarea',
              required: true,
              section: 'Disclosures'
            },
            {
              label: 'Is the property being sold "as is" or are there warranties?',
              type: 'textarea',
              required: true,
              section: 'Disclosures'
            },
            {
              label: 'Can the buyer assign or sell their interest in the contract?',
              type: 'textarea',
              required: true,
              section: 'Assignment'
            },
            {
              label: 'Can the seller assign the contract?',
              type: 'textarea',
              required: true,
              section: 'Assignment'
            },
            {
              label: 'What is the process for recording this contract?',
              type: 'textarea',
              required: true,
              section: 'Recording'
            },
            {
              label: 'What happens if either party dies before the contract is fulfilled?',
              type: 'textarea',
              required: true,
              section: 'Succession'
            },
            {
              label: 'What is the governing law for the agreement?',
              type: 'text',
              required: true,
              section: 'Legal'
            }
          ]
        }
      },
      create: {
        id: `${contractForDeed.id}-questionnaire`,
        name: 'Contract for Deed Questionnaire',
        description: 'Questions for generating a contract for deed',
        templateId: contractForDeed.id,
        questions: {
          create: [
            {
              label: 'What is the date of the contract?',
              type: 'date',
              required: true,
              section: 'Basic Information'
            },
            {
              label: 'What is the full legal name of the seller(s)?',
              type: 'text',
              required: true,
              section: 'Seller Information'
            },
            {
              label: 'What is the address of the seller(s)?',
              type: 'textarea',
              required: true,
              section: 'Seller Information'
            },
            {
              label: 'What is the full legal name of the buyer(s)?',
              type: 'text',
              required: true,
              section: 'Buyer Information'
            },
            {
              label: 'What is the address of the buyer(s)?',
              type: 'textarea',
              required: true,
              section: 'Buyer Information'
            },
            {
              label: 'What is the legal description of the property?',
              type: 'textarea',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What is the street address of the property?',
              type: 'text',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What county and state is the property located in?',
              type: 'text',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What is the total purchase price?',
              type: 'text',
              required: true,
              section: 'Financial Terms',
              helpText: 'Enter the total amount the buyer will pay for the property'
            },
            {
              label: 'What is the down payment amount?',
              type: 'text',
              required: true,
              section: 'Financial Terms'
            },
            {
              label: 'What is the principal balance to be financed?',
              type: 'text',
              required: true,
              section: 'Financial Terms',
              helpText: 'Total purchase price minus down payment'
            },
            {
              label: 'What is the interest rate?',
              type: 'text',
              required: true,
              section: 'Financial Terms',
              helpText: 'Enter as a percentage'
            },
            {
              label: 'What is the monthly payment amount?',
              type: 'text',
              required: true,
              section: 'Payment Terms'
            },
            {
              label: 'What day of the month is payment due?',
              type: 'text',
              required: true,
              section: 'Payment Terms'
            },
            {
              label: 'What is the term of the contract?',
              type: 'text',
              required: true,
              section: 'Payment Terms',
              helpText: 'Specify the number of months or years'
            },
            {
              label: 'Is there a balloon payment? If so, when and how much?',
              type: 'textarea',
              required: false,
              section: 'Payment Terms'
            },
            {
              label: 'Where and how should payments be made?',
              type: 'textarea',
              required: true,
              section: 'Payment Terms'
            },
            {
              label: 'What happens in case of late payments? Are there late fees?',
              type: 'textarea',
              required: true,
              section: 'Default and Penalties'
            },
            {
              label: 'Are there prepayment privileges or penalties?',
              type: 'textarea',
              required: true,
              section: 'Payment Terms'
            },
            {
              label: 'When does the buyer take possession of the property?',
              type: 'date',
              required: true,
              section: 'Possession'
            },
            {
              label: 'Who is responsible for property taxes?',
              type: 'select',
              required: true,
              section: 'Responsibilities',
              options: {
                create: [
                  { value: 'seller', label: 'Seller' },
                  { value: 'buyer', label: 'Buyer' },
                  { value: 'shared', label: 'Shared' }
                ]
              }
            },
            {
              label: 'Who is responsible for property insurance?',
              type: 'select',
              required: true,
              section: 'Responsibilities',
              options: {
                create: [
                  { value: 'seller', label: 'Seller' },
                  { value: 'buyer', label: 'Buyer' },
                  { value: 'shared', label: 'Shared' }
                ]
              }
            },
            {
              label: 'Who is responsible for property maintenance?',
              type: 'select',
              required: true,
              section: 'Responsibilities',
              options: {
                create: [
                  { value: 'seller', label: 'Seller' },
                  { value: 'buyer', label: 'Buyer' },
                  { value: 'shared', label: 'Shared' }
                ]
              }
            },
            {
              label: 'What insurance requirements are there?',
              type: 'textarea',
              required: true,
              section: 'Insurance'
            },
            {
              label: 'Are there any restrictions on the buyer\'s use of the property?',
              type: 'textarea',
              required: true,
              section: 'Property Use'
            },
            {
              label: 'Can the buyer make improvements to the property?',
              type: 'textarea',
              required: true,
              section: 'Property Use'
            },
            {
              label: 'What happens in case of default by the buyer?',
              type: 'textarea',
              required: true,
              section: 'Default and Remedies'
            },
            {
              label: 'What cure period exists for default?',
              type: 'text',
              required: true,
              section: 'Default and Remedies'
            },
            {
              label: 'What is the process for forfeiture or foreclosure?',
              type: 'textarea',
              required: true,
              section: 'Default and Remedies'
            },
            {
              label: 'When will the deed be delivered to the buyer?',
              type: 'textarea',
              required: true,
              section: 'Title and Conveyance'
            },
            {
              label: 'What type of deed will be used for final conveyance?',
              type: 'select',
              required: true,
              section: 'Title and Conveyance',
              options: {
                create: [
                  { value: 'warranty', label: 'Warranty Deed' },
                  { value: 'special-warranty', label: 'Special Warranty Deed' },
                  { value: 'quitclaim', label: 'Quitclaim Deed' }
                ]
              }
            },
            {
              label: 'Are there any existing liens or mortgages on the property?',
              type: 'textarea',
              required: true,
              section: 'Title and Conveyance'
            },
            {
              label: 'What disclosures is the seller required to provide?',
              type: 'textarea',
              required: true,
              section: 'Disclosures'
            },
            {
              label: 'Is the property being sold "as is" or are there warranties?',
              type: 'textarea',
              required: true,
              section: 'Disclosures'
            },
            {
              label: 'Can the buyer assign or sell their interest in the contract?',
              type: 'textarea',
              required: true,
              section: 'Assignment'
            },
            {
              label: 'Can the seller assign the contract?',
              type: 'textarea',
              required: true,
              section: 'Assignment'
            },
            {
              label: 'What is the process for recording this contract?',
              type: 'textarea',
              required: true,
              section: 'Recording'
            },
            {
              label: 'What happens if either party dies before the contract is fulfilled?',
              type: 'textarea',
              required: true,
              section: 'Succession'
            },
            {
              label: 'What is the governing law for the agreement?',
              type: 'text',
              required: true,
              section: 'Legal'
            }
          ]
        }
      }
    })

    console.log('Successfully created Contract for Deed template:', {
      contractForDeed: contractForDeed.id,
      contractForDeedQuestionnaire: contractForDeedQuestionnaire.id
    })

    // Create Pet Agreement template
    const petAgreement = await prisma.documentTemplate.create({
      data: {
        id: 'pet-agreement',
        name: 'Pet Agreement',
        type: 'agreement',
        description: 'An addendum to a lease agreement that outlines terms and conditions for keeping pets on the rental property',
        content: [
          '# Pet Agreement',
          '',
          'This Pet Agreement (the "Agreement") is made on {agreementDate} and is an addendum to the Lease Agreement dated {leaseDate} between:',
          '',
          'LANDLORD:',
          '{landlordName}',
          '{landlordAddress}',
          '',
          'and',
          '',
          'TENANT:',
          '{tenantName}',
          '',
          'for the property located at:',
          '{propertyAddress}',
          '',
          '## 1. Authorized Pet(s)',
          'This Agreement authorizes the following pet(s):',
          '',
          'Number of Pets: {petCount}',
          '',
          'Pet 1:',
          'Type/Species: {pet1Type}',
          'Breed: {pet1Breed}',
          'Name: {pet1Name}',
          'Age/DOB: {pet1Age}',
          'Weight/Size: {pet1Weight}',
          'License/Registration: {pet1License}',
          'Spayed/Neutered: {pet1SpayedNeutered}',
          'Vaccinations: {pet1Vaccinations}',
          '',
          'Additional Pets:',
          '{additionalPets}',
          '',
          '## 2. Pet Deposits and Fees',
          'Pet Deposit: ${petDeposit}',
          'Refundable: {depositRefundable}',
          'Refund Conditions: {refundConditions}',
          '',
          'Monthly Pet Rent: ${monthlyPetRent}',
          '',
          'Non-refundable Pet Fee: ${nonRefundableFee}',
          '',
          '## 3. Pet Rules and Restrictions',
          'Permitted Areas:',
          '{permittedAreas}',
          '',
          'Restricted Areas:',
          '{restrictedAreas}',
          '',
          'Waste Disposal Requirements:',
          '{wasteDisposal}',
          '',
          'Noise Control Requirements:',
          '{noiseControl}',
          '',
          'Pet Control Requirements:',
          '{petControl}',
          '',
          'Unattended Pet Policy:',
          '{unattendedPolicy}',
          '',
          '## 4. Damage and Liability',
          'Property Damage Policy:',
          '{damagePolicy}',
          '',
          'Odor and Infestation Policy:',
          '{odorPolicy}',
          '',
          'Aggressive Behavior Policy:',
          '{aggressivePolicy}',
          '',
          '## 5. Revocation of Permission',
          'Conditions for Revocation:',
          '{revocationConditions}',
          '',
          'Required Notice:',
          '{revocationNotice}',
          '',
          '## 6. Insurance Requirements',
          'Liability Insurance Requirements:',
          '{insuranceRequirements}',
          '',
          '## 7. Additional or Replacement Pets',
          '{replacementPolicy}',
          '',
          '## 8. Unauthorized Pets',
          '{unauthorizedPolicy}',
          '',
          '## 9. Emergency Contact',
          'Pet Emergency Contact:',
          '{emergencyContact}',
          '',
          '## 10. Tenant Certification',
          'Behavior History Certification:',
          '{behaviorCertification}',
          '',
          '## Signatures',
          '',
          '_________________',
          'Landlord Signature',
          'Date: {landlordSignDate}',
          '',
          '_________________',
          'Tenant Signature',
          'Date: {tenantSignDate}'
        ].join('\n'),
        categoryId: realEstateCategory.id,
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'agreement',
          version: '1.0.0'
        }
      }
    })

    // Create Pet Agreement questionnaire
    const petAgreementQuestionnaire = await prisma.questionnaire.create({
      data: {
        name: 'Pet Agreement Questionnaire',
        description: 'Questions for generating a pet agreement addendum',
        templateId: petAgreement.id,
        questions: {
          create: [
            {
              label: 'What is the full legal name of the landlord/lessor?',
              type: 'text',
              required: true,
              section: 'Landlord Information'
            },
            {
              label: "What is the landlord's address and contact information?",
              type: 'textarea',
              required: true,
              section: 'Landlord Information'
            },
            {
              label: 'What is the full legal name of the tenant/lessee?',
              type: 'text',
              required: true,
              section: 'Tenant Information'
            },
            {
              label: 'What is the complete address of the rental property?',
              type: 'text',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What is the date of the original lease agreement?',
              type: 'date',
              required: true,
              section: 'Lease Information'
            },
            {
              label: 'What is the date of this pet agreement?',
              type: 'date',
              required: true,
              section: 'Agreement Information'
            },
            {
              label: 'How many pets are being authorized?',
              type: 'number',
              required: true,
              section: 'Pet Information'
            },
            {
              label: 'What type/species of pet(s) is being allowed?',
              type: 'text',
              required: true,
              section: 'Pet Information'
            },
            {
              label: 'What is the breed of each pet?',
              type: 'textarea',
              required: true,
              section: 'Pet Information'
            },
            {
              label: 'What is the name of each pet?',
              type: 'textarea',
              required: true,
              section: 'Pet Information'
            },
            {
              label: 'What is the age/date of birth of each pet?',
              type: 'textarea',
              required: true,
              section: 'Pet Information'
            },
            {
              label: 'What is the weight/size of each pet?',
              type: 'textarea',
              required: true,
              section: 'Pet Information'
            },
            {
              label: "What is the pet's license/registration number and municipality?",
              type: 'textarea',
              required: true,
              section: 'Pet Information'
            },
            {
              label: 'Is the pet spayed or neutered?',
              type: 'select',
              required: true,
              section: 'Pet Information',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Is the pet up-to-date on vaccinations?',
              type: 'select',
              required: true,
              section: 'Pet Information',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Is a pet deposit required? If so, how much?',
              type: 'text',
              required: true,
              section: 'Fees and Deposits'
            },
            {
              label: 'Is the pet deposit refundable? Under what conditions?',
              type: 'textarea',
              required: true,
              section: 'Fees and Deposits'
            },
            {
              label: 'Is there a monthly pet rent? If so, how much?',
              type: 'text',
              required: true,
              section: 'Fees and Deposits'
            },
            {
              label: 'Is there a one-time non-refundable pet fee? If so, how much?',
              type: 'text',
              required: true,
              section: 'Fees and Deposits'
            },
            {
              label: 'What areas of the property may the pet access?',
              type: 'textarea',
              required: true,
              section: 'Rules and Restrictions'
            },
            {
              label: 'What areas of the property are off-limits to the pet?',
              type: 'textarea',
              required: true,
              section: 'Rules and Restrictions'
            },
            {
              label: 'What are the pet waste disposal requirements?',
              type: 'textarea',
              required: true,
              section: 'Rules and Restrictions'
            },
            {
              label: 'What are the noise control requirements?',
              type: 'textarea',
              required: true,
              section: 'Rules and Restrictions'
            },
            {
              label: 'What are the requirements for controlling the pet?',
              type: 'textarea',
              required: true,
              section: 'Rules and Restrictions',
              helpText: 'Include requirements for leashes, cages, etc.'
            },
            {
              label: 'Are there restrictions on leaving the pet unattended?',
              type: 'textarea',
              required: true,
              section: 'Rules and Restrictions'
            },
            {
              label: 'What is the policy on pet damage to the property?',
              type: 'textarea',
              required: true,
              section: 'Damage and Liability'
            },
            {
              label: 'What is the policy regarding pet odors or infestations?',
              type: 'textarea',
              required: true,
              section: 'Damage and Liability'
            },
            {
              label: 'What is the policy if the pet shows aggressive behavior?',
              type: 'textarea',
              required: true,
              section: 'Damage and Liability'
            },
            {
              label: 'Under what conditions can the landlord revoke permission for the pet?',
              type: 'textarea',
              required: true,
              section: 'Revocation'
            },
            {
              label: 'What notice is required to revoke pet permission?',
              type: 'text',
              required: true,
              section: 'Revocation'
            },
            {
              label: 'Does the tenant need to provide proof of liability insurance covering the pet?',
              type: 'textarea',
              required: true,
              section: 'Insurance'
            },
            {
              label: 'What is the policy regarding additional or replacement pets?',
              type: 'textarea',
              required: true,
              section: 'Additional Pets'
            },
            {
              label: 'What happens if unauthorized pets are found on the premises?',
              type: 'textarea',
              required: true,
              section: 'Unauthorized Pets'
            },
            {
              label: 'Who should be contacted in case of pet emergencies?',
              type: 'textarea',
              required: true,
              section: 'Emergency Contact'
            },
            {
              label: "What is the tenant's certification regarding the pet's behavior history?",
              type: 'textarea',
              required: true,
              section: 'Certification'
            }
          ]
        }
      }
    })

    console.log('Successfully created Pet Agreement template:', {
      petAgreement: petAgreement.id,
      petAgreementQuestionnaire: petAgreementQuestionnaire.id
    })

    // Create Lease Addendum template
    const leaseAddendum = await prisma.documentTemplate.create({
      data: {
        id: 'lease-addendum',
        name: 'Lease Addendum',
        type: 'addendum',
        description: 'A legal document that modifies or adds to an existing lease agreement',
        content: [
          '# Lease Addendum',
          '',
          'This Lease Addendum (the "Addendum") is made on {addendumDate} and modifies the Lease Agreement dated {leaseDate} between:',
          '',
          'LANDLORD:',
          '{landlordName}',
          '{landlordAddress}',
          '',
          'and',
          '',
          'TENANT:',
          '{tenantName}',
          '',
          'for the property located at:',
          '{propertyAddress}',
          '',
          '## 1. Purpose of Addendum',
          '{addendumPurpose}',
          '',
          '## 2. Modified Terms',
          'The following terms of the original lease are hereby modified:',
          '',
          '{modifiedTerms}',
          '',
          '## 3. New Terms',
          'The following new terms are hereby added to the lease:',
          '',
          '{newTerms}',
          '',
          '## 4. Deleted Terms',
          'The following terms of the original lease are hereby deleted:',
          '',
          '{deletedTerms}',
          '',
          '## 5. Effective Date',
          'These changes shall take effect on: {effectiveDate}',
          '',
          '## 6. Term Impact',
          'Impact on Lease Term:',
          '{termImpact}',
          '',
          '## 7. Rent Impact',
          'Impact on Rent Amount:',
          '{rentImpact}',
          '',
          '## 8. Security Deposit Impact',
          'Impact on Security Deposit:',
          '{depositImpact}',
          '',
          '## 9. Duration of Changes',
          'Duration of Modified Terms:',
          '{modificationDuration}',
          '',
          '## 10. Additional Requirements',
          'Additional Signatures Required:',
          '{additionalSignatures}',
          '',
          'Additional Documentation Required:',
          '{additionalDocuments}',
          '',
          '## 11. Original Lease',
          'All other terms and conditions of the original lease agreement dated {leaseDate} remain in full force and effect.',
          '',
          '## 12. Guarantor Impact',
          'Impact on Lease Guarantors:',
          '{guarantorImpact}',
          '',
          '## 13. Consideration',
          'Consideration for this change:',
          '{consideration}',
          '',
          '## Signatures',
          '',
          '_________________',
          'Landlord Signature',
          'Date: {landlordSignDate}',
          '',
          '_________________',
          'Tenant Signature',
          'Date: {tenantSignDate}',
          '',
          '{additionalSignatureBlock}'
        ].join('\n'),
        categoryId: realEstateCategory.id,
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'addendum',
          version: '1.0.0'
        }
      }
    })

    // Create Lease Addendum questionnaire
    const leaseAddendumQuestionnaire = await prisma.questionnaire.create({
      data: {
        name: 'Lease Addendum Questionnaire',
        description: 'Questions for generating a lease addendum',
        templateId: leaseAddendum.id,
        questions: {
          create: [
            {
              label: 'What is the full legal name of the landlord/lessor?',
              type: 'text',
              required: true,
              section: 'Landlord Information'
            },
            {
              label: "What is the landlord's address and contact information?",
              type: 'textarea',
              required: true,
              section: 'Landlord Information'
            },
            {
              label: 'What is the full legal name of the tenant/lessee?',
              type: 'text',
              required: true,
              section: 'Tenant Information'
            },
            {
              label: 'What is the complete address of the rental property?',
              type: 'text',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What is the date of the original lease agreement?',
              type: 'date',
              required: true,
              section: 'Lease Information'
            },
            {
              label: 'What is the date of this addendum?',
              type: 'date',
              required: true,
              section: 'Addendum Information'
            },
            {
              label: 'What is the specific purpose of this addendum?',
              type: 'textarea',
              required: true,
              section: 'Purpose',
              helpText: 'Explain why this addendum is being created'
            },
            {
              label: 'What specific terms or provisions of the original lease are being modified?',
              type: 'textarea',
              required: true,
              section: 'Modified Terms'
            },
            {
              label: 'What are the exact new terms being added or modified?',
              type: 'textarea',
              required: true,
              section: 'New Terms'
            },
            {
              label: 'What original lease terms, if any, are being deleted?',
              type: 'textarea',
              required: false,
              section: 'Deleted Terms'
            },
            {
              label: 'What is the effective date of these changes?',
              type: 'date',
              required: true,
              section: 'Effective Date'
            },
            {
              label: 'Do these changes affect the lease term?',
              type: 'textarea',
              required: true,
              section: 'Term Impact'
            },
            {
              label: 'Do these changes affect the rent amount?',
              type: 'textarea',
              required: true,
              section: 'Rent Impact'
            },
            {
              label: 'Do these changes affect the security deposit?',
              type: 'textarea',
              required: true,
              section: 'Deposit Impact'
            },
            {
              label: 'Is this addendum temporary or permanent?',
              type: 'select',
              required: true,
              section: 'Duration',
              options: {
                create: [
                  { value: 'temporary', label: 'Temporary' },
                  { value: 'permanent', label: 'Permanent' }
                ]
              }
            },
            {
              label: 'If temporary, what is the end date for these modified terms?',
              type: 'date',
              required: false,
              section: 'Duration'
            },
            {
              label: 'Does this addendum require additional signatures beyond the landlord and tenant?',
              type: 'textarea',
              required: true,
              section: 'Additional Requirements'
            },
            {
              label: 'Do all other terms and conditions of the original lease remain in effect?',
              type: 'select',
              required: true,
              section: 'Original Lease',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'How does this addendum impact any guarantors of the original lease?',
              type: 'textarea',
              required: true,
              section: 'Guarantor Impact'
            },
            {
              label: 'Will this addendum be attached to and become part of the original lease?',
              type: 'select',
              required: true,
              section: 'Documentation',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Does this addendum supersede any conflicting provisions in the original lease?',
              type: 'select',
              required: true,
              section: 'Conflicts',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Does this addendum need to be notarized?',
              type: 'select',
              required: true,
              section: 'Documentation',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Are there any additional documents that need to be attached to this addendum?',
              type: 'textarea',
              required: false,
              section: 'Documentation'
            },
            {
              label: 'Is this addendum being made at the request of the landlord or tenant?',
              type: 'select',
              required: true,
              section: 'Request Origin',
              options: {
                create: [
                  { value: 'landlord', label: 'Landlord' },
                  { value: 'tenant', label: 'Tenant' },
                  { value: 'both', label: 'Both Parties' }
                ]
              }
            },
            {
              label: 'Is there specific consideration being provided for this change?',
              type: 'textarea',
              required: false,
              section: 'Consideration'
            }
          ]
        }
      }
    })

    console.log('Successfully created Lease Addendum template:', {
      leaseAddendum: leaseAddendum.id,
      leaseAddendumQuestionnaire: leaseAddendumQuestionnaire.id
    })

    // Create Notice of Intent to Vacate template
    const noticeToVacate = await prisma.documentTemplate.upsert({
      where: { id: 'notice-to-vacate' },
      update: {
        name: 'Notice of Intent to Vacate Premises',
        type: 'notice',
        description: 'A formal notice from a tenant to a landlord indicating their intention to move out of the rental property',
        content: [
          '# Notice of Intent to Vacate Premises',
          '',
          'Date: {noticeDate}',
          '',
          'To:',
          '{landlordName}',
          '{landlordAddress}',
          '',
          'From:',
          '{tenantName}',
          'Phone: {tenantPhone}',
          'Email: {tenantEmail}',
          '',
          'Re: Notice to Vacate Property at {propertyAddress}',
          '',
          '## Notice',
          '',
          'This letter serves as formal notice of my/our intent to vacate the premises at:',
          '',
          '{propertyAddress}',
          '',
          'The original lease agreement was dated {leaseDate}.',
          '',
          '## Move-Out Details',
          '',
          'Intended Move-Out Date: {moveOutDate}',
          '',
          'This provides {noticeDays} days\' notice as required by the lease agreement/state law.',
          '',
          'Reason for Vacating: {vacatingReason}',
          '',
          '## Early Termination',
          '{earlyTermination}',
          '',
          '## Keys and Access Devices',
          'All keys and access devices will be returned by: {keyReturnDate}',
          '',
          '## Move-Out Inspection',
          'Requested Move-Out Inspection Date: {inspectionDate}',
          '',
          'Tenant will be present during inspection: {tenantPresent}',
          '',
          'Initial Inspection Requested: {initialInspection}',
          '',
          '## Security Deposit',
          'Please return my security deposit to:',
          '',
          'Forwarding Address:',
          '{forwardingAddress}',
          '',
          '## Additional Requests',
          '{additionalRequests}',
          '',
          '## Property Showing',
          'Property showing preferences:',
          '{showingPreferences}',
          '',
          '## Contact Information',
          'Best time to contact regarding move-out details:',
          '{contactPreference}',
          '',
          '## Delivery Method',
          'This notice is being delivered via: {deliveryMethod}',
          '',
          'Receipt confirmation requested: {confirmationRequested}',
          '',
          '## Landlord Reference',
          'Reference request: {referenceRequest}',
          '',
          '## Signature',
          '',
          '_________________',
          'Tenant Signature',
          '',
          'Date: {signatureDate}'
        ].join('\n'),
        categoryId: realEstateCategory.id,
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'notice',
          version: '1.0.0'
        }
      },
      create: {
        id: 'notice-to-vacate',
        name: 'Notice of Intent to Vacate Premises',
        type: 'notice',
        description: 'A formal notice from a tenant to a landlord indicating their intention to move out of the rental property',
        content: [
          '# Notice of Intent to Vacate Premises',
          '',
          'Date: {noticeDate}',
          '',
          'To:',
          '{landlordName}',
          '{landlordAddress}',
          '',
          'From:',
          '{tenantName}',
          'Phone: {tenantPhone}',
          'Email: {tenantEmail}',
          '',
          'Re: Notice to Vacate Property at {propertyAddress}',
          '',
          '## Notice',
          '',
          'This letter serves as formal notice of my/our intent to vacate the premises at:',
          '',
          '{propertyAddress}',
          '',
          'The original lease agreement was dated {leaseDate}.',
          '',
          '## Move-Out Details',
          '',
          'Intended Move-Out Date: {moveOutDate}',
          '',
          'This provides {noticeDays} days\' notice as required by the lease agreement/state law.',
          '',
          'Reason for Vacating: {vacatingReason}',
          '',
          '## Early Termination',
          '{earlyTermination}',
          '',
          '## Keys and Access Devices',
          'All keys and access devices will be returned by: {keyReturnDate}',
          '',
          '## Move-Out Inspection',
          'Requested Move-Out Inspection Date: {inspectionDate}',
          '',
          'Tenant will be present during inspection: {tenantPresent}',
          '',
          'Initial Inspection Requested: {initialInspection}',
          '',
          '## Security Deposit',
          'Please return my security deposit to:',
          '',
          'Forwarding Address:',
          '{forwardingAddress}',
          '',
          '## Additional Requests',
          '{additionalRequests}',
          '',
          '## Property Showing',
          'Property showing preferences:',
          '{showingPreferences}',
          '',
          '## Contact Information',
          'Best time to contact regarding move-out details:',
          '{contactPreference}',
          '',
          '## Delivery Method',
          'This notice is being delivered via: {deliveryMethod}',
          '',
          'Receipt confirmation requested: {confirmationRequested}',
          '',
          '## Landlord Reference',
          'Reference request: {referenceRequest}',
          '',
          '## Signature',
          '',
          '_________________',
          'Tenant Signature',
          '',
          'Date: {signatureDate}'
        ].join('\n'),
        categoryId: realEstateCategory.id,
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'notice',
          version: '1.0.0'
        }
      }
    })

    // Create Notice of Intent to Vacate questionnaire
    const noticeToVacateQuestionnaire = await prisma.questionnaire.upsert({
      where: {
        id: `${noticeToVacate.id}-questionnaire`
      },
      update: {
        name: 'Notice of Intent to Vacate Questionnaire',
        description: 'Questions for generating a notice of intent to vacate',
        templateId: noticeToVacate.id,
        questions: {
          deleteMany: {},
          create: [
            {
              label: 'What is the full legal name of the tenant giving notice?',
              type: 'text',
              required: true,
              section: 'Tenant Information'
            },
            {
              label: "What is the tenant's current phone number and email address?",
              type: 'textarea',
              required: true,
              section: 'Tenant Information'
            },
            {
              label: 'What is the full legal name of the landlord/property manager?',
              type: 'text',
              required: true,
              section: 'Landlord Information'
            },
            {
              label: 'What is the complete address of the rental property being vacated?',
              type: 'text',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What is the date of the original lease agreement?',
              type: 'date',
              required: true,
              section: 'Lease Information'
            },
            {
              label: 'What is the date of this notice?',
              type: 'date',
              required: true,
              section: 'Notice Information'
            },
            {
              label: 'What is the intended move-out date?',
              type: 'date',
              required: true,
              section: 'Move-Out Details'
            },
            {
              label: "How many days' notice is being provided?",
              type: 'number',
              required: true,
              section: 'Notice Information'
            },
            {
              label: 'What is the minimum notice required by the lease or state law?',
              type: 'number',
              required: true,
              section: 'Notice Information'
            },
            {
              label: 'Is the tenant leaving at the end of the lease term or breaking the lease early?',
              type: 'select',
              required: true,
              section: 'Move-Out Details',
              options: {
                create: [
                  { value: 'end-of-term', label: 'End of Lease Term' },
                  { value: 'early-termination', label: 'Breaking Lease Early' }
                ]
              }
            },
            {
              label: 'If breaking the lease early, what is the reason?',
              type: 'textarea',
              required: false,
              section: 'Move-Out Details'
            },
            {
              label: 'Is the tenant aware of any early termination fees?',
              type: 'textarea',
              required: false,
              section: 'Move-Out Details'
            },
            {
              label: 'How and when will the tenant return all keys and access devices?',
              type: 'textarea',
              required: true,
              section: 'Keys and Access'
            },
            {
              label: 'When does the tenant wish to have the move-out inspection?',
              type: 'date',
              required: true,
              section: 'Inspection'
            },
            {
              label: "What is the tenant's forwarding address for security deposit return?",
              type: 'textarea',
              required: true,
              section: 'Security Deposit'
            },
            {
              label: 'Does the tenant have any specific requests regarding the move-out process?',
              type: 'textarea',
              required: false,
              section: 'Additional Requests'
            },
            {
              label: 'Is the tenant requesting any specific repairs before vacating?',
              type: 'textarea',
              required: false,
              section: 'Additional Requests'
            },
            {
              label: 'Will the tenant be present during the final inspection?',
              type: 'select',
              required: true,
              section: 'Inspection',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Is the tenant requesting an initial inspection before the final move-out?',
              type: 'select',
              required: true,
              section: 'Inspection',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'How is this notice being delivered to the landlord?',
              type: 'select',
              required: true,
              section: 'Delivery',
              options: {
                create: [
                  { value: 'hand', label: 'Hand Delivered' },
                  { value: 'mail', label: 'Regular Mail' },
                  { value: 'certified', label: 'Certified Mail' },
                  { value: 'email', label: 'Email' }
                ]
              }
            },
            {
              label: 'Is the tenant requesting confirmation of receipt of this notice?',
              type: 'select',
              required: true,
              section: 'Delivery',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Does the tenant need a reference from this landlord?',
              type: 'select',
              required: true,
              section: 'References',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Is the tenant requesting the landlord to show the unit while still occupied?',
              type: 'select',
              required: true,
              section: 'Property Showing',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'What is the best time for the landlord to contact the tenant about move-out details?',
              type: 'text',
              required: true,
              section: 'Contact Information'
            }
          ]
        }
      },
      create: {
        id: `${noticeToVacate.id}-questionnaire`,
        name: 'Notice of Intent to Vacate Questionnaire',
        description: 'Questions for generating a notice of intent to vacate',
        templateId: noticeToVacate.id,
        questions: {
          create: [
            {
              label: 'What is the full legal name of the tenant giving notice?',
              type: 'text',
              required: true,
              section: 'Tenant Information'
            },
            {
              label: "What is the tenant's current phone number and email address?",
              type: 'textarea',
              required: true,
              section: 'Tenant Information'
            },
            {
              label: 'What is the full legal name of the landlord/property manager?',
              type: 'text',
              required: true,
              section: 'Landlord Information'
            },
            {
              label: 'What is the complete address of the rental property being vacated?',
              type: 'text',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What is the date of the original lease agreement?',
              type: 'date',
              required: true,
              section: 'Lease Information'
            },
            {
              label: 'What is the date of this notice?',
              type: 'date',
              required: true,
              section: 'Notice Information'
            },
            {
              label: 'What is the intended move-out date?',
              type: 'date',
              required: true,
              section: 'Move-Out Details'
            },
            {
              label: "How many days' notice is being provided?",
              type: 'number',
              required: true,
              section: 'Notice Information'
            },
            {
              label: 'What is the minimum notice required by the lease or state law?',
              type: 'number',
              required: true,
              section: 'Notice Information'
            },
            {
              label: 'Is the tenant leaving at the end of the lease term or breaking the lease early?',
              type: 'select',
              required: true,
              section: 'Move-Out Details',
              options: {
                create: [
                  { value: 'end-of-term', label: 'End of Lease Term' },
                  { value: 'early-termination', label: 'Breaking Lease Early' }
                ]
              }
            },
            {
              label: 'If breaking the lease early, what is the reason?',
              type: 'textarea',
              required: false,
              section: 'Move-Out Details'
            },
            {
              label: 'Is the tenant aware of any early termination fees?',
              type: 'textarea',
              required: false,
              section: 'Move-Out Details'
            },
            {
              label: 'How and when will the tenant return all keys and access devices?',
              type: 'textarea',
              required: true,
              section: 'Keys and Access'
            },
            {
              label: 'When does the tenant wish to have the move-out inspection?',
              type: 'date',
              required: true,
              section: 'Inspection'
            },
            {
              label: "What is the tenant's forwarding address for security deposit return?",
              type: 'textarea',
              required: true,
              section: 'Security Deposit'
            },
            {
              label: 'Does the tenant have any specific requests regarding the move-out process?',
              type: 'textarea',
              required: false,
              section: 'Additional Requests'
            },
            {
              label: 'Is the tenant requesting any specific repairs before vacating?',
              type: 'textarea',
              required: false,
              section: 'Additional Requests'
            },
            {
              label: 'Will the tenant be present during the final inspection?',
              type: 'select',
              required: true,
              section: 'Inspection',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Is the tenant requesting an initial inspection before the final move-out?',
              type: 'select',
              required: true,
              section: 'Inspection',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'How is this notice being delivered to the landlord?',
              type: 'select',
              required: true,
              section: 'Delivery',
              options: {
                create: [
                  { value: 'hand', label: 'Hand Delivered' },
                  { value: 'mail', label: 'Regular Mail' },
                  { value: 'certified', label: 'Certified Mail' },
                  { value: 'email', label: 'Email' }
                ]
              }
            },
            {
              label: 'Is the tenant requesting confirmation of receipt of this notice?',
              type: 'select',
              required: true,
              section: 'Delivery',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Does the tenant need a reference from this landlord?',
              type: 'select',
              required: true,
              section: 'References',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Is the tenant requesting the landlord to show the unit while still occupied?',
              type: 'select',
              required: true,
              section: 'Property Showing',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'What is the best time for the landlord to contact the tenant about move-out details?',
              type: 'text',
              required: true,
              section: 'Contact Information'
            }
          ]
        }
      }
    })

    console.log('Successfully created Notice of Intent to Vacate template:', {
      noticeToVacate: noticeToVacate.id,
      noticeToVacateQuestionnaire: noticeToVacateQuestionnaire.id
    })

  } catch (error) {
    console.error('Failed to create templates. Error:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
  } finally {
    await prisma.$disconnect()
  }
}

// Run the creation
createRealEstateTemplates2() 