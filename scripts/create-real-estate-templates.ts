import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createRealEstateTemplates() {
  try {
    console.log('Creating real estate templates...')

    // Create apartment lease template
    const apartmentLease = await prisma.documentTemplate.create({
      data: {
        name: 'Apartment Lease Agreement',
        type: 'lease',
        description: 'Standard apartment lease agreement template',
        content: [
          '# Apartment Lease Agreement',
          '',
          'This Lease Agreement ("Agreement") is made on {leaseStartDate} between:',
          '',
          'Landlord: {landlordName}',
          'Address: {landlordAddress}',
          'Phone: {landlordPhone}',
          'Email: {landlordEmail}',
          '',
          'Tenant: {tenantName}',
          'Phone: {tenantPhone}',
          'Email: {tenantEmail}',
          '',
          'For the property located at:',
          '{propertyAddress}',
          '{unitNumber}',
          '',
          '## 1. Property Details',
          'Property Type: {propertyType}',
          'State: {state}',
          '',
          '## 2. Lease Terms',
          'Agreement Type: {agreementType}',
          'Lease Term: {leaseTerm}',
          'Start Date: {leaseStartDate}',
          'End Date: {leaseEndDate}',
          '',
          '## 3. Financial Terms',
          'Monthly Rent: ${monthlyRent}',
          'Security Deposit: ${securityDeposit}',
          '',
          '## 4. Utilities and Services',
          'The following utilities are included in the rent:',
          '{utilities}',
          '',
          '## 5. Parking',
          'Number of Parking Spaces: {parkingSpaces}',
          'Monthly Parking Fee: ${parkingFee}',
          '',
          '## 6. Pet Policy',
          'Pet Policy: {petPolicy}',
          'Pet Deposit: ${petDeposit}',
          'Monthly Pet Rent: ${petRent}',
          '',
          '## 7. Maintenance Responsibilities',
          '{maintenanceResponsibility}',
          '',
          '## 8. Rules and Regulations',
          'Noise Restrictions:',
          '{noiseRestrictions}',
          '',
          '## 9. Additional Terms',
          '{additionalTerms}',
          '',
          '## 10. Signatures',
          'Signed on {signingDate}',
          '',
          'Landlord: _________________',
          'Tenant: _________________'
        ].join('\n'),
        category: 'real-estate',
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'lease',
          version: '1.0.0'
        },
        variables: {
          leaseStartDate: '',
          landlordName: '',
          landlordAddress: '',
          landlordPhone: '',
          landlordEmail: '',
          tenantName: '',
          tenantPhone: '',
          tenantEmail: '',
          propertyAddress: '',
          unitNumber: '',
          propertyType: '',
          state: '',
          agreementType: '',
          leaseTerm: '',
          leaseEndDate: '',
          monthlyRent: '',
          securityDeposit: '',
          utilities: '',
          parkingSpaces: '',
          parkingFee: '',
          petPolicy: '',
          petDeposit: '',
          petRent: '',
          maintenanceResponsibility: '',
          noiseRestrictions: '',
          additionalTerms: '',
          signingDate: ''
        }
      }
    })

    // Create lease termination template
    const leaseTermination = await prisma.documentTemplate.create({
      data: {
        name: 'Lease Termination Agreement',
        type: 'termination',
        description: 'Agreement to terminate a lease before its original end date',
        content: [
          '# Lease Termination Agreement',
          '',
          'This Lease Termination Agreement is made on {signingDate} between:',
          '',
          'Landlord: {landlordName}',
          'Tenant: {tenantName}',
          '',
          'For the property located at:',
          '{propertyAddress}',
          'State: {state}',
          '',
          '## 1. Original Lease Information',
          'Original Lease Start Date: {originalLeaseStart}',
          'Original Lease End Date: {originalLeaseEnd}',
          '',
          '## 2. Termination Details',
          'Termination Date: {terminationDate}',
          'Reason for Termination: {reasonForTermination}',
          '',
          '## 3. Financial Details',
          'Final Rent Payment Amount: ${finalRentPayment}',
          'Final Rent Due Date: {finalRentDueDate}',
          'Security Deposit Return: {securityDepositReturn}',
          '',
          '## 4. Move-Out Requirements',
          '{moveOutRequirements}',
          '',
          '## 5. Additional Terms',
          '{additionalTerms}',
          '',
          '## 6. Signatures',
          'Signed on {signingDate}',
          '',
          'Landlord: _________________',
          'Tenant: _________________'
        ].join('\n'),
        category: 'real-estate',
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'termination',
          version: '1.0.0'
        },
        variables: {
          signingDate: '',
          landlordName: '',
          tenantName: '',
          propertyAddress: '',
          state: '',
          originalLeaseStart: '',
          originalLeaseEnd: '',
          terminationDate: '',
          reasonForTermination: '',
          finalRentPayment: '',
          finalRentDueDate: '',
          securityDepositReturn: '',
          moveOutRequirements: '',
          additionalTerms: ''
        }
      }
    })

    // Create rental application template
    const rentalApplication = await prisma.documentTemplate.create({
      data: {
        name: 'Rental Application Form',
        type: 'application',
        description: 'Application form for potential tenants',
        content: [
          '# Rental Application Form',
          '',
          'For the property located at:',
          '{propertyAddress}',
          'State: {state}',
          'Property Type: {propertyType}',
          '',
          '## 1. Personal Information',
          'Full Name: {applicantName}',
          'Date of Birth: {dateOfBirth}',
          'Social Security Number: {socialSecurity}',
          '',
          '## 2. Current Residence',
          'Current Address: {currentAddress}',
          'Current Landlord: {currentLandlord}',
          'Landlord Phone: {currentLandlordPhone}',
          '',
          '## 3. Employment & Income',
          'Employment Status: {employmentStatus}',
          'Employer: {employer}',
          'Monthly Income: ${monthlyIncome}',
          '',
          '## 4. Occupancy Details',
          'Additional Occupants:',
          '{additionalOccupants}',
          '',
          'Pets: {pets}',
          'Pet Details:',
          '{petDetails}',
          '',
          '## 5. Authorization',
          'Credit Check Authorization: {creditCheck}',
          '',
          '## 6. Signature',
          'By signing below, I certify that all information provided is true and accurate.',
          '',
          'Applicant Signature: _________________',
          'Date: {signingDate}'
        ].join('\n'),
        category: 'real-estate',
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'application',
          version: '1.0.0'
        },
        variables: {
          propertyAddress: '',
          state: '',
          propertyType: '',
          applicantName: '',
          dateOfBirth: '',
          socialSecurity: '',
          currentAddress: '',
          currentLandlord: '',
          currentLandlordPhone: '',
          employmentStatus: '',
          employer: '',
          monthlyIncome: '',
          additionalOccupants: '',
          pets: '',
          petDetails: '',
          creditCheck: '',
          signingDate: ''
        }
      }
    })

    // Create sublease agreement template
    const subleaseAgreement = await prisma.documentTemplate.create({
      data: {
        name: 'Sublease Agreement',
        type: 'sublease',
        description: 'Agreement between original tenant and subtenant',
        content: [
          '# Sublease Agreement',
          '',
          'This Sublease Agreement is made on {signingDate} between:',
          '',
          'Original Tenant: {originalTenantName}',
          'Subtenant: {subtenant}',
          '',
          'For the property located at:',
          '{propertyAddress}',
          'State: {state}',
          'Property Type: {propertyType}',
          '',
          '## 1. Sublease Terms',
          'Start Date: {subleaseStartDate}',
          'End Date: {subleaseEndDate}',
          '',
          '## 2. Financial Terms',
          'Monthly Rent Amount: ${monthlyRentAmount}',
          'Security Deposit Amount: ${securityDepositAmount}',
          '',
          '## 3. Utilities',
          'The following utilities are the responsibility of the subtenant:',
          '{utilitiesResponsibility}',
          '',
          '## 4. Property Details',
          'Furnished Status: {furnishedStatus}',
          '',
          '## 5. Landlord Approval',
          'Landlord Approval Status: {landlordApproval}',
          '',
          '## 6. Signatures',
          'Original Tenant: _________________',
          'Subtenant: _________________',
          'Date: {signingDate}'
        ].join('\n'),
        category: 'real-estate',
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'sublease',
          version: '1.0.0'
        },
        variables: {
          signingDate: '',
          originalTenantName: '',
          subtenant: '',
          propertyAddress: '',
          state: '',
          propertyType: '',
          subleaseStartDate: '',
          subleaseEndDate: '',
          monthlyRentAmount: '',
          securityDepositAmount: '',
          utilitiesResponsibility: '',
          furnishedStatus: '',
          landlordApproval: ''
        }
      }
    })

    console.log('Successfully created templates:', {
      apartmentLease: apartmentLease.id,
      leaseTermination: leaseTermination.id,
      rentalApplication: rentalApplication.id,
      subleaseAgreement: subleaseAgreement.id
    })
  } catch (error) {
    console.error('Failed to create templates:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the creation
createRealEstateTemplates() 