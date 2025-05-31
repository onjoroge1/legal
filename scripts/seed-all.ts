import { execSync } from 'child_process';

// Core setup scripts
const coreScripts = [
  'init-templates.ts',
  'create-family-category.ts',
  'fix-categories.ts',
  'fix-category-codes.ts',
  'update-category-slugs.ts',
];

// Legal document seeds
const legalDocumentScripts = [
  'seed-legal-documents.ts',
  'seed-corporate-governance.ts',
  'seed-template-fields.ts',
];

// Family law seeds
const familyLawScripts = [
  'seed-family-law.ts',
  'seed-family.ts',
  'seed-child-visitation-letter.ts',
  'seed-divorce-papers.ts',
  'seed-separation-before-divorce.ts',
  'seed-separation-agreement.ts',
  'seed-child-power-of-attorney.ts',
  'seed-postnuptial-agreement.ts',
  'seed-prenuptial-agreement.ts',
  'seed-marriage-affidavit.ts',
  'seed-cohabitation-agreement.ts',
  'seed-child-medical-consent.ts',
  'seed-child-travel-consent.ts',
];

// Business and employment seeds
const businessScripts = [
  'seed-business-formation.ts',
  'seed-employment.ts',
  'seed-employment-templates.ts',
  'seed-employment-missing.ts',
  'seed-employment-new.ts',
];

// Real estate seeds
const realEstateScripts = [
  'create-real-estate-templates.ts',
  'create-commercial-templates.ts',
  'create-roommate-and-trust-deed.ts',
  'create-deed-templates.ts',
  'create-lease-termination-notice.ts',
  'create-eviction-notice.ts',
  'create-pay-or-quit-notice.ts',
  'create-rent-increase-notice.ts',
  'create-lease-application.ts',
  'create-residential-lease.ts',
  'create-real-estate-templates-2.ts',
];

// Questionnaire and user setup
const setupScripts = [
  'seed-questionnaires.ts',
  'setup-admin.ts',
  'create-test-user.js',
];

// Combine all scripts in the correct order
const allScripts = [
  ...coreScripts,
  ...legalDocumentScripts,
  ...familyLawScripts,
  ...businessScripts,
  ...realEstateScripts,
  ...setupScripts,
];

// Run each script
for (const script of allScripts) {
  try {
    console.log(`\nRunning ${script}...`);
    execSync(`npx ts-node scripts/${script}`, { stdio: 'inherit' });
    console.log(`✅ ${script} completed successfully`);
  } catch (error) {
    console.error(`❌ Error running ${script}:`, error);
    // Optionally, you can choose to continue or exit here
    // process.exit(1); // Uncomment to stop on first error
  }
}

console.log('\nAll seeds completed!'); 