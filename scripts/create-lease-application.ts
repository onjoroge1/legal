import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createLeaseApplication() {
  try {
    console.log('Creating Lease Application template...')

    // Get the real estate category
    const realEstateCategory = await prisma.category.findUnique({
      where: { id: 'cm9bhpf6d000yvbl0qw9aqww3' }
    })

    if (!realEstateCategory) {
      throw new Error('Real estate category not found')
    }

    // Create Lease Application template
    const leaseApplication = await prisma.documentTemplate.create({
      data: {
        id: 'lease-application',
        name: 'Lease Application',
        type: 'application',
        description: 'Standard rental property application form',
        content: [
          '# Lease Application',
          '',
          '## Property Information',
          'Property Address: {propertyAddress}',
          'Desired Move-in Date: {moveInDate}',
          'Desired Lease Term: {leaseTerm}',
          '',
          '## Applicant Information',
          'Full Legal Name: {applicantName}',
          'Current Address: {currentAddress}',
          'Length at Current Address: {currentAddressLength}',
          'Reason for Leaving: {reasonForLeaving}',
          '',
          'Current Landlord:',
          'Name: {currentLandlordName}',
          'Contact: {currentLandlordContact}',
          '',
          'Previous Addresses (Past 5 Years):',
          '{previousAddresses}',
          '',
          'Previous Landlords:',
          '{previousLandlords}',
          '',
          '## Personal Information',
          'Date of Birth: {dateOfBirth}',
          'SSN/ITIN: {ssn}',
          "Driver's License: {driversLicense}",
          'State: {licenseState}',
          '',
          '## Occupants',
          'List of Occupants:',
          '{occupantsList}',
          '',
          '## Employment and Income',
          'Current Employer: {employerName}',
          'Position: {position}',
          'Length of Employment: {employmentLength}',
          'Monthly Income: ${monthlyIncome}',
          '',
          'Additional Income Sources:',
          '{additionalIncome}',
          '',
          'Employment Verification Contact:',
          '{employmentVerification}',
          '',
          '## References',
          'Personal References:',
          '{personalReferences}',
          '',
          '## Additional Information',
          'Pets: {petsInfo}',
          'Smoking Status: {smokingStatus}',
          '',
          'Eviction History: {evictionHistory}',
          'Lease Break History: {leaseBreakHistory}',
          'Bankruptcy History: {bankruptcyHistory}',
          'Criminal History: {criminalHistory}',
          '',
          '## Vehicles',
          'Vehicles to be Parked:',
          '{vehicleInformation}',
          '',
          '## Additional Comments',
          '{additionalComments}',
          '',
          '## Authorization',
          'Background Check Authorization: {backgroundCheck}',
          'Application Fee: ${applicationFee}',
          '',
          'How did you hear about us? {referralSource}',
          '',
          '## Certification',
          'I certify that all information provided is true and accurate.',
          '',
          'Applicant Signature: _________________',
          'Date: {signDate}'
        ].join('\n'),
        categoryId: realEstateCategory.id,
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'application',
          version: '1.0.0'
        }
      }
    })

    // Create questionnaire
    const questionnaire = await prisma.questionnaire.create({
      data: {
        name: 'Lease Application Questionnaire',
        description: 'Questions for rental property application',
        templateId: leaseApplication.id,
        questions: {
          create: [
            {
              label: 'What is the complete address of the rental property being applied for?',
              type: 'text',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What is the desired move-in date?',
              type: 'date',
              required: true,
              section: 'Property Information'
            },
            {
              label: 'What is the full legal name of each applicant?',
              type: 'textarea',
              required: true,
              section: 'Applicant Information'
            },
            {
              label: 'What is the current address of each applicant?',
              type: 'textarea',
              required: true,
              section: 'Applicant Information'
            },
            {
              label: 'How long has each applicant lived at their current address?',
              type: 'text',
              required: true,
              section: 'Applicant Information'
            },
            {
              label: 'What is the reason for leaving current residence?',
              type: 'textarea',
              required: true,
              section: 'Applicant Information'
            },
            {
              label: 'What is the contact information for current landlord?',
              type: 'textarea',
              required: true,
              section: 'Landlord Information'
            },
            {
              label: 'What are the previous addresses for the past 5 years?',
              type: 'textarea',
              required: true,
              section: 'Previous Residences'
            },
            {
              label: 'What is the contact information for previous landlords?',
              type: 'textarea',
              required: true,
              section: 'Previous Residences'
            },
            {
              label: 'What is the date of birth of each applicant?',
              type: 'date',
              required: true,
              section: 'Personal Information'
            },
            {
              label: 'What is the Social Security Number or Individual Taxpayer Identification Number of each applicant?',
              type: 'text',
              required: true,
              section: 'Personal Information'
            },
            {
              label: "What is the driver's license number and state for each applicant?",
              type: 'text',
              required: true,
              section: 'Personal Information'
            },
            {
              label: 'Who will be occupying the unit?',
              type: 'textarea',
              required: true,
              section: 'Occupants',
              helpText: 'Names, ages, and relationship to applicant'
            },
            {
              label: 'What is the current employment information for each applicant?',
              type: 'textarea',
              required: true,
              section: 'Employment',
              helpText: 'Employer, position, length of employment'
            },
            {
              label: 'What is the monthly income for each applicant?',
              type: 'text',
              required: true,
              section: 'Income'
            },
            {
              label: 'What are additional sources of income, if any?',
              type: 'textarea',
              required: false,
              section: 'Income'
            },
            {
              label: 'Can employment and income be verified? Who should be contacted?',
              type: 'textarea',
              required: true,
              section: 'Employment'
            },
            {
              label: 'What are the names and contact information for personal references?',
              type: 'textarea',
              required: true,
              section: 'References'
            },
            {
              label: 'Does the applicant have pets?',
              type: 'textarea',
              required: true,
              section: 'Additional Information',
              helpText: 'If yes, include type, breed, age, and size'
            },
            {
              label: 'Does the applicant smoke?',
              type: 'select',
              required: true,
              section: 'Additional Information',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Has the applicant ever been evicted?',
              type: 'textarea',
              required: true,
              section: 'History',
              helpText: 'If yes, please explain'
            },
            {
              label: 'Has the applicant ever broken a lease?',
              type: 'textarea',
              required: true,
              section: 'History',
              helpText: 'If yes, please explain'
            },
            {
              label: 'Has the applicant ever filed for bankruptcy?',
              type: 'textarea',
              required: true,
              section: 'History',
              helpText: 'If yes, when?'
            },
            {
              label: 'Has the applicant ever been convicted of a crime?',
              type: 'textarea',
              required: true,
              section: 'History',
              helpText: 'If yes, please explain'
            },
            {
              label: 'What vehicles will be parked at the property?',
              type: 'textarea',
              required: true,
              section: 'Vehicles',
              helpText: 'Make, model, year, license plate'
            },
            {
              label: 'Is there any additional information the applicant wishes to provide?',
              type: 'textarea',
              required: false,
              section: 'Additional Information'
            },
            {
              label: 'Does the applicant authorize a background and credit check?',
              type: 'select',
              required: true,
              section: 'Authorization',
              options: {
                create: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]
              }
            },
            {
              label: 'Is there an application fee?',
              type: 'text',
              required: true,
              section: 'Fees',
              helpText: 'If yes, specify amount'
            },
            {
              label: 'What is the desired lease term?',
              type: 'select',
              required: true,
              section: 'Lease Terms',
              options: {
                create: [
                  { value: '6', label: '6 months' },
                  { value: '12', label: '12 months' },
                  { value: '24', label: '24 months' },
                  { value: 'other', label: 'Other' }
                ]
              }
            },
            {
              label: 'How did the applicant hear about the rental?',
              type: 'text',
              required: true,
              section: 'Additional Information'
            }
          ]
        }
      }
    })

    console.log('Successfully created template:', {
      leaseApplication: leaseApplication.id,
      questionnaire: questionnaire.id
    })
  } catch (error) {
    console.error('Failed to create template:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the creation
createLeaseApplication() 