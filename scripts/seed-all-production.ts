import { execSync } from 'child_process';

// Core setup scripts
const coreScripts = [
  'init-templates.ts',
  'create-family-category.ts',
  'fix-categories.ts',
  'fix-category-codes.ts',
  'update-category-slugs.ts',
];

// Legal document seeds (excluding business/corporate)
const legalDocumentScripts = [
  'seed-legal-documents.ts',
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
  ...setupScripts,
];

// Run each script
for (const script of allScripts) {
  try {
    console.log(`\nRunning ${script}...`);
    execSync(`npx ts-node -r tsconfig-paths/register scripts/${script}`, { stdio: 'inherit' });
    console.log(`✅ ${script} completed successfully`);
  } catch (error) {
    console.error(`❌ Error running ${script}:`, error);
    // In production, we should stop on first error
    process.exit(1);
  }
}

console.log('\nAll production seeds completed!'); 