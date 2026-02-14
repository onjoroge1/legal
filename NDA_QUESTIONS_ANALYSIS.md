# NDA Generation - Required Questions Analysis

## 📋 Current Questions (from `/api/nda-chat/route.ts`)

Based on the current chat-based implementation, here are the 10 questions being asked:

### 1. **State/Jurisdiction** (Required)
- **Question**: "What state will this NDA be governed by?"
- **Purpose**: Determines state-specific legal provisions and citations
- **Type**: Select dropdown (all 50 states + DC)
- **Field ID**: `state`
- **Required**: Yes

### 2. **NDA Type** (Required)
- **Question**: "Is this a Mutual NDA (both parties share confidential info) or Unilateral NDA (only one party shares)?"
- **Purpose**: Determines document structure and party obligations
- **Type**: Radio/Select
- **Options**: 
  - Mutual (both parties share)
  - Unilateral (one party shares)
- **Field ID**: `type`
- **Required**: Yes

### 3. **Disclosing Party Name** (Required)
- **Question**: "Full legal name of the Disclosing Party (or Party A for mutual)"
- **Purpose**: Identifies the party sharing confidential information
- **Type**: Text input
- **Field ID**: `disclosingParty`
- **Required**: Yes
- **Help Text**: "Enter the full legal name of the company or individual"

### 4. **Receiving Party Name** (Required)
- **Question**: "Full legal name of the Receiving Party (or Party B for mutual)"
- **Purpose**: Identifies the party receiving confidential information
- **Type**: Text input
- **Field ID**: `receivingParty`
- **Required**: Yes
- **Help Text**: "Enter the full legal name of the company or individual"

### 5. **Business Relationship** (Required)
- **Question**: "What is the nature of the business relationship?"
- **Purpose**: Customizes clauses based on relationship context
- **Type**: Select with textarea option
- **Options**: 
  - Potential partnership
  - Employment
  - Freelance work
  - Investor discussions
  - Vendor/Supplier relationship
  - Joint venture
  - Other (with text input)
- **Field ID**: `relationship`
- **Required**: Yes
- **Help Text**: "This helps us customize the agreement for your specific situation"

### 6. **Confidential Information** (Required)
- **Question**: "Briefly describe the type of confidential information being shared"
- **Purpose**: Defines what information is protected
- **Type**: Textarea
- **Field ID**: `confidentialInfo`
- **Required**: Yes
- **Placeholder**: "e.g., trade secrets, business plans, customer data, proprietary technology"
- **Help Text**: "Be specific about what information will be considered confidential"

### 7. **Duration** (Required)
- **Question**: "How long should the NDA remain in effect?"
- **Purpose**: Sets the term of the agreement
- **Type**: Select
- **Options**:
  - 1 year
  - 2 years
  - 3 years
  - 5 years
  - 10 years
  - Indefinite
  - Custom (with number input)
- **Field ID**: `duration`
- **Required**: Yes
- **Help Text**: "Consider your state's laws - some states limit NDA duration"

### 8. **Non-Solicitation Clause** (Optional)
- **Question**: "Should the NDA include a non-solicitation clause?"
- **Purpose**: Prevents hiring each other's employees
- **Type**: Radio/Select
- **Options**:
  - Yes
  - No
- **Field ID**: `nonSolicitation`
- **Required**: No (default: No)
- **Help Text**: "This prevents parties from hiring each other's employees or contractors"

### 9. **Non-Compete Clause** (Optional)
- **Question**: "Should there be a non-compete clause?"
- **Purpose**: Prevents competitive activities
- **Type**: Radio/Select
- **Options**:
  - Yes
  - No
- **Field ID**: `nonCompete`
- **Required**: No (default: No)
- **Help Text**: "Note: Not enforceable in all states (e.g., California). We'll add state-specific enforceability notes."
- **Dependency**: Show warning if state is California

### 10. **Additional Provisions** (Optional)
- **Question**: "Any additional provisions or specific concerns?"
- **Purpose**: Allows for custom clauses
- **Type**: Textarea
- **Field ID**: `additional`
- **Required**: No
- **Placeholder**: "e.g., specific industry requirements, special circumstances, etc."
- **Help Text**: "Optional: Add any specific requirements or concerns"

## 📊 Data Structure

The collected data maps to these fields in the generation API:

```typescript
interface NDAData {
  STATE: string                    // Question 1
  TYPE: "mutual" | "unilateral"     // Question 2
  DISCLOSING_PARTY: string          // Question 3
  RECEIVING_PARTY: string           // Question 4
  RELATIONSHIP: string              // Question 5
  CONFIDENTIAL_INFO: string         // Question 6
  DURATION: string                  // Question 7
  NON_SOLICITATION: "yes" | "no"    // Question 8
  NON_COMPETE: "yes" | "no"         // Question 9
  ADDITIONAL: string                // Question 10
}
```

## 🎨 Recommended Form Structure

### Section 1: Basic Information
1. State/Jurisdiction (Required)
2. NDA Type (Required)

### Section 2: Parties
3. Disclosing Party Name (Required)
4. Receiving Party Name (Required)

### Section 3: Agreement Details
5. Business Relationship (Required)
6. Confidential Information (Required)
7. Duration (Required)

### Section 4: Additional Clauses
8. Non-Solicitation Clause (Optional)
9. Non-Compete Clause (Optional)
10. Additional Provisions (Optional)

## 🔄 Enhanced Questions (Recommended Additions)

For a more complete NDA, consider adding:

### Party Details (Optional but Recommended)
- **Disclosing Party Address**: Text input
- **Receiving Party Address**: Text input
- **Disclosing Party Contact**: Email/Phone
- **Receiving Party Contact**: Email/Phone

### Agreement Details
- **Effective Date**: Date picker (default: today)
- **Return of Materials**: Yes/No (should materials be returned?)
- **Remedies Preference**: Select (monetary damages, injunctive relief, both)

### State-Specific Considerations
- **California Warning**: Show if CA selected (non-compete limitations)
- **Texas Notice**: Show if TX selected (specific requirements)
- **New York Provisions**: Show if NY selected

## 📝 Form Validation Rules

1. **State**: Must be selected from valid state list
2. **NDA Type**: Must be "mutual" or "unilateral"
3. **Party Names**: Must be non-empty, min 2 characters
4. **Relationship**: Must be selected or provided
5. **Confidential Info**: Must be non-empty, min 10 characters
6. **Duration**: Must be selected from valid options
7. **Non-Solicitation**: Default to "no" if not provided
8. **Non-Compete**: Default to "no" if not provided
9. **Additional**: Optional, no validation

## 🎯 User Experience Recommendations

### Progressive Disclosure
- Show basic questions first
- Reveal optional questions after required ones
- Show state-specific warnings dynamically

### Smart Defaults
- Default state: User's location (if available)
- Default duration: 2 years
- Default type: Unilateral (most common)

### Help Text & Examples
- Provide examples for each field
- Show tooltips for legal terms
- Link to FAQ for complex questions

### Conditional Logic
- If Mutual NDA: Show "Party A" and "Party B" labels
- If Unilateral: Show "Disclosing Party" and "Receiving Party"
- If California + Non-Compete: Show warning about enforceability
- If Indefinite duration: Show state-specific limitations

## 🔧 Implementation Notes

### Form Component Structure
```typescript
interface NDAFormData {
  // Section 1: Basic
  state: string
  type: "mutual" | "unilateral"
  
  // Section 2: Parties
  disclosingParty: string
  receivingParty: string
  
  // Section 3: Details
  relationship: string
  confidentialInfo: string
  duration: string
  
  // Section 4: Optional
  nonSolicitation: "yes" | "no"
  nonCompete: "yes" | "no"
  additional?: string
}
```

### State Options
```typescript
const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California",
  "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
  "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
  "District of Columbia"
]
```

### Duration Options
```typescript
const DURATION_OPTIONS = [
  { value: "1 year", label: "1 Year" },
  { value: "2 years", label: "2 Years" },
  { value: "3 years", label: "3 Years" },
  { value: "5 years", label: "5 Years" },
  { value: "10 years", label: "10 Years" },
  { value: "indefinite", label: "Indefinite" },
  { value: "custom", label: "Custom Duration" }
]
```

### Relationship Options
```typescript
const RELATIONSHIP_OPTIONS = [
  { value: "potential_partnership", label: "Potential Partnership" },
  { value: "employment", label: "Employment" },
  { value: "freelance", label: "Freelance Work" },
  { value: "investor", label: "Investor Discussions" },
  { value: "vendor", label: "Vendor/Supplier Relationship" },
  { value: "joint_venture", label: "Joint Venture" },
  { value: "other", label: "Other" }
]
```

## ✅ Next Steps

1. Create form component with these 10 questions
2. Add validation rules
3. Implement conditional logic
4. Add help text and examples
5. Create API endpoint to process form data
6. Integrate with template-based generation




