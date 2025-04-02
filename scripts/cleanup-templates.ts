import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function cleanupTemplates() {
  try {
    console.log('Cleaning up templates...')

    // Delete all templates
    await prisma.documentTemplate.deleteMany()
    console.log('Deleted all templates')

    // Create apartment lease template
    const apartmentLease = await prisma.documentTemplate.create({
      data: {
        code: 'apartment-lease',
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
        code: 'lease-termination',
        name: 'Lease Termination Agreement',
        type: 'termination',
        description: 'Standard lease termination agreement template',
        content: [
          '# Lease Termination Agreement',
          '',
          'This Lease Termination Agreement ("Agreement") is made on {terminationDate} between:',
          '',
          'Landlord: {landlordName}',
          'Tenant: {tenantName}',
          '',
          'For the property located at:',
          '{propertyAddress}',
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
          '## 4. Move-Out Details',
          'Move-Out Requirements:',
          '{moveOutRequirements}',
          '',
          '## 5. Signatures',
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
        }
      }
    })

    // Create rental application template
    const rentalApplication = await prisma.documentTemplate.create({
      data: {
        code: 'rental-application',
        name: 'Rental Application',
        type: 'application',
        description: 'Standard rental application template',
        content: [
          '# Rental Application',
          '',
          '## 1. Personal Information',
          'Applicant Name: {applicantName}',
          'Date of Birth: {dateOfBirth}',
          'Social Security Number: {socialSecurity}',
          '',
          '## 2. Current Residence',
          'Current Address: {currentAddress}',
          'Current Landlord: {currentLandlord}',
          'Current Landlord Phone: {currentLandlordPhone}',
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
          'Signed on {signingDate}',
          'Applicant: _________________'
        ].join('\n'),
        category: 'real-estate',
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'application',
          version: '1.0.0'
        }
      }
    })

    // Create sublease agreement template
    const subleaseAgreement = await prisma.documentTemplate.create({
      data: {
        code: 'sublease-agreement',
        name: 'Sublease Agreement',
        type: 'sublease',
        description: 'Standard sublease agreement template',
        content: [
          '# Sublease Agreement',
          '',
          'This Sublease Agreement ("Agreement") is made on {subleaseStartDate} between:',
          '',
          'Original Tenant: {originalTenantName}',
          'Subtenant: {subtenant}',
          '',
          'For the property located at:',
          '{propertyAddress}',
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
          'Utilities Responsibility:',
          '{utilitiesResponsibility}',
          '',
          '## 4. Property Details',
          'Furnished Status: {furnishedStatus}',
          '',
          '## 5. Approvals',
          'Landlord Approval: {landlordApproval}',
          '',
          '## 6. Signatures',
          'Signed on {signingDate}',
          '',
          'Original Tenant: _________________',
          'Subtenant: _________________'
        ].join('\n'),
        category: 'real-estate',
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'sublease',
          version: '1.0.0'
        }
      }
    })

    // Create move-in inspection template
    const moveInspection = await prisma.documentTemplate.create({
      data: {
        code: 'moveinspection',
        name: 'Move-in/Move-out Inspection',
        type: 'inspection',
        description: 'Standard move-in/move-out inspection template',
        content: [
          '# Move-in/Move-out Inspection',
          '',
          '## 1. Basic Information',
          'Inspection Date: {inspectionDate}',
          'Inspection Time: {inspectionTime}',
          'Inspection Type: {inspectionType}',
          '',
          '## 2. Property Areas',
          'Rooms Inspected:',
          '{rooms}',
          '',
          '## 3. Property Condition',
          'Condition Notes:',
          '{conditionNotes}',
          '',
          'Damage Notes:',
          '{damageNotes}',
          '',
          '## 4. Documentation',
          'Photos Uploaded: {photoUpload}',
          '',
          '## 5. Cleaning',
          'Cleaning Required: {cleaningRequired}',
          '',
          '## 6. Repairs',
          'Repairs Required:',
          '{repairsRequired}',
          '',
          '## 7. Signatures',
          'Signed on {signingDate}',
          '',
          'Landlord/Agent: _________________',
          'Tenant: _________________'
        ].join('\n'),
        category: 'real-estate',
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'inspection',
          version: '1.0.0'
        }
      }
    })

    // Create lease amendment template
    const leaseAmendment = await prisma.documentTemplate.create({
      data: {
        code: 'lease-amendment',
        name: 'Lease Amendment',
        type: 'amendment',
        description: 'Standard lease amendment template',
        content: [
          '# Lease Amendment',
          '',
          'This Lease Amendment ("Amendment") is made on {signatureDate} between:',
          '',
          'Landlord: {landlordName}',
          'Tenant: {tenantName}',
          '',
          'For the property located at:',
          '{propertyAddress}',
          '',
          '## 1. Original Lease Information',
          'Original Lease Date: {originalLeaseDate}',
          '',
          '## 2. Amendment Details',
          'Amendment Type: {amendmentType}',
          'Section Being Amended: {amendmentSection}',
          '',
          'Current Terms:',
          '{currentTerms}',
          '',
          'New Terms:',
          '{newTerms}',
          '',
          'Effective Date: {effectiveDate}',
          '',
          '## 3. Signatures',
          'Signed on {signatureDate}',
          '',
          'Landlord: _________________',
          'Tenant: _________________'
        ].join('\n'),
        category: 'real-estate',
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'amendment',
          version: '1.0.0'
        }
      }
    })

    // Create notice to vacate template
    const noticeToVacate = await prisma.documentTemplate.create({
      data: {
        code: 'notice-to-vacate',
        name: 'Notice to Vacate',
        type: 'notice',
        description: 'Standard notice to vacate template',
        content: [
          '# Notice to Vacate',
          '',
          'This Notice to Vacate ("Notice") is given on {noticeDate} by:',
          '{noticeType}',
          '',
          'For the property located at:',
          '{propertyAddress}',
          '',
          '## 1. Lease Information',
          'Current Lease End Date: {currentLeaseEnd}',
          '',
          '## 2. Move-out Details',
          'Intended Move-out Date: {intendedMoveOut}',
          'Reason for Vacating: {reasonForVacating}',
          '{otherReason}',
          '',
          '## 3. Contact Information',
          'Forwarding Address: {forwardingAddress}',
          'Contact Phone: {contactPhone}',
          '',
          '## 4. Final Walkthrough',
          'Final Walkthrough: {finalWalkthrough}',
          'Walkthrough Date: {walkthroughDate}',
          '',
          '## 5. Signatures',
          'Signed on {signingDate}',
          '',
          'Landlord: _________________',
          'Tenant: _________________'
        ].join('\n'),
        category: 'real-estate',
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'notice',
          version: '1.0.0'
        }
      }
    })

    // Create lease renewal template
    const leaseRenewal = await prisma.documentTemplate.create({
      data: {
        code: 'lease-renewal',
        name: 'Lease Renewal Agreement',
        type: 'renewal',
        description: 'Standard lease renewal agreement template',
        content: [
          '# Lease Renewal Agreement',
          '',
          'This Lease Renewal Agreement ("Agreement") is made on {renewalDate} between:',
          '',
          'Landlord: {landlordName}',
          'Tenant: {tenantName}',
          '',
          'For the property located at:',
          '{propertyAddress}',
          '',
          '## 1. Lease Information',
          'Current Lease End Date: {currentLeaseEnd}',
          '',
          '## 2. Renewal Terms',
          'Renewal Term: {renewalTerm}',
          'New Lease Start Date: {newLeaseStart}',
          'New Lease End Date: {newLeaseEnd}',
          '',
          '## 3. Financial Terms',
          'Rent Adjustment: {rentAdjustment}',
          'Adjustment Amount: {adjustmentAmount}',
          'New Monthly Rent: ${newMonthlyRent}',
          '',
          '## 4. Signatures',
          'Signed on {signingDate}',
          '',
          'Landlord: _________________',
          'Tenant: _________________'
        ].join('\n'),
        category: 'real-estate',
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'renewal',
          version: '1.0.0'
        }
      }
    })

    // Create property management template
    const propertyManagement = await prisma.documentTemplate.create({
      data: {
        code: 'property-management',
        name: 'Property Management Agreement',
        type: 'management',
        description: 'Standard property management agreement template',
        content: [
          '# Property Management Agreement',
          '',
          'This Property Management Agreement ("Agreement") is made on {agreementDate} between:',
          '',
          'Property Owner: {ownerName}',
          'Property Manager: {managerName}',
          '',
          'For the property located at:',
          '{propertyAddress}',
          '',
          '## 1. Term',
          'Management Start Date: {managementStartDate}',
          'Management Term: {managementTerm}',
          'Management End Date: {managementEndDate}',
          '',
          '## 2. Financial Terms',
          'Management Fee: {managementFee}',
          'Fee Amount: {feeAmount}',
          '',
          '## 3. Services',
          'Management Responsibilities:',
          '{managementResponsibilities}',
          '',
          'Reporting Frequency: {reportingFrequency}',
          '',
          '## 4. Contact Information',
          'Emergency Contact: {emergencyContact}',
          '',
          '## 5. Signatures',
          'Signed on {signingDate}',
          '',
          'Property Owner: _________________',
          'Property Manager: _________________'
        ].join('\n'),
        category: 'real-estate',
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'management',
          version: '1.0.0'
        }
      }
    })

    // Create tenant screening template
    const tenantScreening = await prisma.documentTemplate.create({
      data: {
        code: 'tenant-screening',
        name: 'Tenant Screening Form',
        type: 'screening',
        description: 'Standard tenant screening form template',
        content: [
          '# Tenant Screening Form',
          '',
          '## 1. Personal Information',
          'Applicant Name: {applicantName}',
          'Date of Birth: {dateOfBirth}',
          'Social Security Number: {ssn}',
          '',
          '## 2. Current Residence',
          'Current Address: {currentAddress}',
          'Current Landlord: {currentLandlord}',
          'Landlord Phone: {landlordPhone}',
          'Current Rent: ${currentRent}',
          '',
          '## 3. Employment & Income',
          'Employment Status: {employmentStatus}',
          'Employer Name: {employerName}',
          'Employer Phone: {employerPhone}',
          'Monthly Income: ${monthlyIncome}',
          '',
          '## 4. Occupancy Details',
          'Number of Occupants: {occupants}',
          '',
          'Pets: {pets}',
          'Pet Details:',
          '{petDetails}',
          '',
          '## 5. Authorization',
          'Background Check Authorization: {backgroundCheck}',
          'Credit Check Authorization: {creditCheck}',
          '',
          'Signed on {signingDate}',
          'Applicant: _________________'
        ].join('\n'),
        category: 'real-estate',
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'screening',
          version: '1.0.0'
        }
      }
    })

    // Create co-signer template
    const coSigner = await prisma.documentTemplate.create({
      data: {
        code: 'co-signer',
        name: 'Co-Signer Agreement',
        type: 'cosigner',
        description: 'Standard co-signer agreement template',
        content: [
          '# Co-Signer Agreement',
          '',
          'This Co-Signer Agreement ("Agreement") is made on {agreementDate} between:',
          '',
          'Landlord: {landlordName}',
          'Primary Tenant: {primaryTenantName}',
          'Co-Signer: {coSignerName}',
          '',
          'For the property located at:',
          '{propertyAddress}',
          '',
          '## 1. Lease Information',
          'Lease Start Date: {leaseStartDate}',
          'Lease End Date: {leaseEndDate}',
          'Monthly Rent: ${monthlyRent}',
          '',
          '## 2. Co-Signer Information',
          'Co-Signer Name: {coSignerName}',
          'Date of Birth: {coSignerDOB}',
          'Social Security Number: {coSignerSSN}',
          'Current Address: {coSignerAddress}',
          'Phone Number: {coSignerPhone}',
          'Email: {coSignerEmail}',
          '',
          '## 3. Employment & Income',
          'Employment Status: {coSignerEmploymentStatus}',
          'Employer Name: {coSignerEmployer}',
          'Employer Phone: {coSignerEmployerPhone}',
          'Monthly Income: ${coSignerMonthlyIncome}',
          '',
          '## 4. Financial Responsibility',
          'The Co-Signer agrees to be jointly and severally liable for:',
          '- Monthly rent payments',
          '- Security deposit',
          '- Any damages to the property',
          '- Any other financial obligations under the lease',
          '',
          '## 5. Authorization',
          'Credit Check Authorization: {creditCheck}',
          'Background Check Authorization: {backgroundCheck}',
          '',
          '## 6. Signatures',
          'Signed on {signingDate}',
          '',
          'Landlord: _________________',
          'Primary Tenant: _________________',
          'Co-Signer: _________________'
        ].join('\n'),
        category: 'real-estate',
        version: '1.0.0',
        metadata: {
          category: 'real-estate',
          type: 'cosigner',
          version: '1.0.0'
        }
      }
    })

    console.log('Created templates:', {
      apartmentLease: apartmentLease.id,
      leaseTermination: leaseTermination.id,
      rentalApplication: rentalApplication.id,
      subleaseAgreement: subleaseAgreement.id,
      moveInspection: moveInspection.id,
      leaseAmendment: leaseAmendment.id,
      noticeToVacate: noticeToVacate.id,
      leaseRenewal: leaseRenewal.id,
      propertyManagement: propertyManagement.id,
      tenantScreening: tenantScreening.id,
      coSigner: coSigner.id
    })
  } catch (error) {
    console.error('Failed to create templates:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the cleanup
cleanupTemplates() 