# QA Checklist - Document Generation Flows

## Overview
Use this checklist to verify the full flow for each document type:
`Generate → Preview → Checkout → Download`

For each document, test both:
- Non-authenticated user (sessionStorage + localStorage fallback)
- Authenticated user (draft persistence in DB)

---

## Global Checks (All Documents)
- [ ] Document detail page loads with correct title/description.
- [ ] Intent selector appears if intents exist.
- [ ] Questions load with proper sections and required markers.
- [ ] Validation errors appear for missing or invalid fields.
- [ ] State warnings appear when state is selected.
- [ ] Generate button disabled until valid.
- [ ] Preview page renders generated content.
- [ ] Checkout page accessible (non-subscriber).
- [ ] Download page accessible after purchase/subscription.

---

## Document Flows

### 1. Non-Disclosure Agreement (NDA)
- [ ] Intent: mutual
- [ ] Intent: unilateral
- [ ] Non-compete warning in CA

### 2. LLC Operating Agreement
- [ ] Intent: single-member
- [ ] Intent: multi-member
- [ ] Intent: manager-managed

### 3. Employment Contract
- [ ] Intent: at-will
- [ ] Intent: fixed-term (term length required)
- [ ] Intent: executive
- [ ] Intent: contract-to-hire

### 4. Residential Lease Agreement
- [ ] Intent: single tenant
- [ ] Intent: multi-tenant (tenant count required)
- [ ] Intent: furnished
- [ ] Lease end date after start date

### 5. Independent Contractor Agreement
- [ ] Intent: project-based
- [ ] Intent: ongoing
- [ ] Intent: hourly (hourly rate required)

### 6. Partnership Agreement
- [ ] Intent: equal split
- [ ] Intent: unequal split (ownership % required)

### 7. Power of Attorney
- [ ] Intent: general
- [ ] Intent: limited (limitations required)
- [ ] Intent: healthcare

### 8. Last Will & Testament
- [ ] Intent: simple
- [ ] Intent: guardian (guardian required)

### 9. Commercial Lease Agreement
- [ ] Intent: gross
- [ ] Intent: net (expense responsibilities required)

### 10. Service Agreement
- [ ] Intent: fixed fee
- [ ] Intent: retainer (retainer amount required)

### 11. Purchase Agreement
- [ ] Intent: asset
- [ ] Intent: service
- [ ] Purchase price numeric

### 12. Non-Compete Agreement
- [ ] Intent: employee
- [ ] Intent: contractor (contractor role required)
- [ ] CA warning shows

---

## Regression Checks
- [ ] Download generates PDF and DOCX
- [ ] Draft reload works after refresh
- [ ] Session/local storage fallback works when logged out

