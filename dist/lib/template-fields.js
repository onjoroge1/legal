"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATE_FIELDS = exports.IP_TEMPLATE_FIELDS = exports.BUSINESS_TEMPLATE_FIELDS = exports.REAL_ESTATE_TEMPLATE_FIELDS = void 0;
// Keep the existing real estate fields as is
exports.REAL_ESTATE_TEMPLATE_FIELDS = {
    "apartment-lease": [
        {
            id: "state",
            label: "State",
            type: "select",
            required: true,
            section: "Basic Information",
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: "additionalTerms",
            label: "Additional terms or information",
            type: "textarea",
            required: false,
            section: "Additional Terms"
        },
        {
            id: "signingDate",
            label: "Planned signing date",
            type: "date",
            required: false,
            section: "Additional Terms"
        }
    ],
    "lease-termination": [
        {
            id: 'state',
            type: 'select',
            label: 'State',
            required: true,
            section: 'Basic Information',
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: 'original_lease_start',
            type: 'date',
            label: 'Original Lease Start Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'original_lease_end',
            type: 'date',
            label: 'Original Lease End Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'property_address',
            type: 'text',
            label: 'Property Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'landlord_name',
            type: 'text',
            label: 'Landlord Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_name',
            type: 'text',
            label: 'Tenant Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'termination_date',
            type: 'date',
            label: 'Termination Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'reason_for_termination',
            type: 'select',
            label: 'Reason for Termination',
            required: true,
            section: 'Basic Information',
            options: ["Mutual Agreement", "Tenant Request", "Landlord Request", "Lease Violation", "Other"]
        },
        {
            id: 'final_rent_payment',
            type: 'number',
            label: 'Final Rent Payment Amount',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'final_rent_due_date',
            type: 'date',
            label: 'Final Rent Payment Due Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'security_deposit_return',
            type: 'select',
            label: 'Security Deposit Return',
            required: true,
            section: 'Basic Information',
            options: ["Full Return", "Partial Return", "No Return"]
        },
        {
            id: 'move_out_requirements',
            type: 'textarea',
            label: 'Move-out Requirements',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'property_condition',
            type: 'select',
            label: 'Property Condition',
            required: true,
            section: 'Basic Information',
            options: ["Excellent", "Good", "Fair", "Poor"]
        },
        {
            id: 'additional_terms',
            type: 'textarea',
            label: 'Additional Terms',
            required: false,
            section: 'Basic Information'
        },
    ],
    "lease-renewal": [
        {
            id: 'state',
            type: 'select',
            label: 'State',
            required: true,
            section: 'Basic Information',
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: 'original_lease_start',
            type: 'date',
            label: 'Original Lease Start Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'original_lease_end',
            type: 'date',
            label: 'Original Lease End Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'property_address',
            type: 'text',
            label: 'Property Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'landlord_name',
            type: 'text',
            label: 'Landlord Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_name',
            type: 'text',
            label: 'Tenant Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'renewal_term',
            type: 'select',
            label: 'Renewal Term',
            required: true,
            section: 'Basic Information',
            options: ["Month to Month", "6 Months", "1 Year", "2 Years", "Custom Term"]
        },
        {
            id: 'custom_term_months',
            type: 'number',
            label: 'Custom Term (Months)',
            required: false,
            showIf: { field: 'renewal_term', value: 'Custom Term' },
            section: 'Basic Information'
        },
        {
            id: 'new_rent_amount',
            type: 'number',
            label: 'New Rent Amount',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'rent_increase_percentage',
            type: 'number',
            label: 'Rent Increase Percentage',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'security_deposit_adjustment',
            type: 'select',
            label: 'Security Deposit Adjustment',
            required: true,
            section: 'Basic Information',
            options: ["No Change", "Increase", "Decrease"]
        },
        {
            id: 'new_security_deposit',
            type: 'number',
            label: 'New Security Deposit Amount',
            required: false,
            showIf: { field: 'security_deposit_adjustment', value: ['Increase', 'Decrease'] },
            section: 'Basic Information'
        },
        {
            id: 'maintenance_responsibilities',
            type: 'textarea',
            label: 'Maintenance Responsibilities',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'utility_responsibilities',
            type: 'textarea',
            label: 'Utility Responsibilities',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'additional_terms',
            type: 'textarea',
            label: 'Additional Terms',
            required: false,
            section: 'Basic Information'
        },
    ],
    "lease-amendment": [
        {
            id: 'state',
            type: 'select',
            label: 'State',
            required: true,
            section: 'Basic Information',
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: 'original_lease_start',
            type: 'date',
            label: 'Original Lease Start Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'original_lease_end',
            type: 'date',
            label: 'Original Lease End Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'property_address',
            type: 'text',
            label: 'Property Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'landlord_name',
            type: 'text',
            label: 'Landlord Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_name',
            type: 'text',
            label: 'Tenant Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'amendment_type',
            type: 'select',
            label: 'Type of Amendment',
            required: true,
            section: 'Basic Information',
            options: ["Rent Change", "Term Extension", "Tenant Change", "Property Change", "Rules Change", "Other"]
        },
        {
            id: 'amendment_details',
            type: 'textarea',
            label: 'Amendment Details',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'effective_date',
            type: 'date',
            label: 'Amendment Effective Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'new_rent_amount',
            type: 'number',
            label: 'New Rent Amount',
            required: false,
            showIf: { field: 'amendment_type', value: 'Rent Change' },
            section: 'Basic Information'
        },
        {
            id: 'new_end_date',
            type: 'date',
            label: 'New Lease End Date',
            required: false,
            showIf: { field: 'amendment_type', value: 'Term Extension' },
            section: 'Basic Information'
        },
        {
            id: 'new_tenant_name',
            type: 'text',
            label: 'New Tenant Name',
            required: false,
            showIf: { field: 'amendment_type', value: 'Tenant Change' },
            section: 'Basic Information'
        },
        {
            id: 'property_changes',
            type: 'textarea',
            label: 'Property Changes',
            required: false,
            showIf: { field: 'amendment_type', value: 'Property Change' },
            section: 'Basic Information'
        },
        {
            id: 'rule_changes',
            type: 'textarea',
            label: 'Rule Changes',
            required: false,
            showIf: { field: 'amendment_type', value: 'Rules Change' },
            section: 'Basic Information'
        },
        {
            id: 'additional_terms',
            type: 'textarea',
            label: 'Additional Terms',
            required: false,
            section: 'Basic Information'
        },
    ],
    "property-management": [
        {
            id: 'state',
            type: 'select',
            label: 'State',
            required: true,
            section: 'Basic Information',
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: 'property_owner_name',
            type: 'text',
            label: 'Property Owner Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'property_owner_address',
            type: 'text',
            label: 'Property Owner Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'property_manager_name',
            type: 'text',
            label: 'Property Manager Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'property_manager_address',
            type: 'text',
            label: 'Property Manager Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'property_manager_license',
            type: 'text',
            label: 'Property Manager License Number',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'property_address',
            type: 'text',
            label: 'Property Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'property_type',
            type: 'select',
            label: 'Property Type',
            required: true,
            section: 'Basic Information',
            options: ["Single Family", "Multi Family", "Commercial", "Industrial"]
        },
        {
            id: 'management_scope',
            type: 'multiselect',
            label: 'Management Scope',
            required: true,
            section: 'Basic Information',
            options: ["Tenant Screening", "Lease Management", "Rent Collection", "Maintenance", "Property Inspection", "Financial Reporting"]
        },
        {
            id: 'management_fee',
            type: 'number',
            label: 'Management Fee Percentage',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'fee_structure',
            type: 'textarea',
            label: 'Fee Structure Details',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'term_length',
            type: 'select',
            label: 'Agreement Term',
            required: true,
            section: 'Basic Information',
            options: ["1 Year", "2 Years", "3 Years", "Indefinite"]
        },
        {
            id: 'start_date',
            type: 'date',
            label: 'Start Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'end_date',
            type: 'date',
            label: 'End Date',
            required: false,
            showIf: { field: 'term_length', value: ['1 Year', '2 Years', '3 Years'] },
            section: 'Basic Information'
        },
        {
            id: 'termination_notice',
            type: 'number',
            label: 'Termination Notice Period (Days)',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'owner_responsibilities',
            type: 'textarea',
            label: 'Owner Responsibilities',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'manager_responsibilities',
            type: 'textarea',
            label: 'Manager Responsibilities',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'insurance_requirements',
            type: 'textarea',
            label: 'Insurance Requirements',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'additional_terms',
            type: 'textarea',
            label: 'Additional Terms',
            required: false,
            section: 'Basic Information'
        },
    ],
    "tenant-screening": [
        {
            id: 'state',
            type: 'select',
            label: 'State',
            required: true,
            section: 'Basic Information',
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: 'property_address',
            type: 'text',
            label: 'Property Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'applicant_name',
            type: 'text',
            label: 'Applicant Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'date_of_birth',
            type: 'date',
            label: 'Date of Birth',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'ssn',
            type: 'text',
            label: 'Social Security Number',
            required: true,
            section: 'Basic Information',
            pattern: '^\\d{3}-\\d{2}-\\d{4}$'
        },
        {
            id: 'current_address',
            type: 'text',
            label: 'Current Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'current_landlord',
            type: 'text',
            label: 'Current Landlord Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'current_landlord_phone',
            type: 'tel',
            label: 'Current Landlord Phone',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'current_rent',
            type: 'number',
            label: 'Current Rent Amount',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'length_of_stay',
            type: 'number',
            label: 'Length of Stay (Years)',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'employment_status',
            type: 'select',
            label: 'Employment Status',
            required: true,
            section: 'Basic Information',
            options: ["Employed", "Self Employed", "Unemployed", "Retired"]
        },
        {
            id: 'employer_name',
            type: 'text',
            label: 'Employer Name',
            required: false,
            showIf: { field: 'employment_status', value: ['Employed', 'Self Employed'] },
            section: 'Basic Information'
        },
        {
            id: 'employer_phone',
            type: 'tel',
            label: 'Employer Phone',
            required: false,
            showIf: { field: 'employment_status', value: ['Employed', 'Self Employed'] },
            section: 'Basic Information'
        },
        {
            id: 'monthly_income',
            type: 'number',
            label: 'Monthly Income',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'additional_income',
            type: 'number',
            label: 'Additional Monthly Income',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'income_source',
            type: 'text',
            label: 'Source of Additional Income',
            required: false,
            showIf: { field: 'additional_income', value: '>0' },
            section: 'Basic Information'
        },
        {
            id: 'bank_references',
            type: 'textarea',
            label: 'Bank References',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'personal_references',
            type: 'textarea',
            label: 'Personal References',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'criminal_history',
            type: 'select',
            label: 'Criminal History',
            required: true,
            section: 'Basic Information',
            options: ["None", "Disclosed"]
        },
        {
            id: 'criminal_details',
            type: 'textarea',
            label: 'Criminal History Details',
            required: false,
            showIf: { field: 'criminal_history', value: 'Disclosed' },
            section: 'Basic Information'
        },
        {
            id: 'eviction_history',
            type: 'select',
            label: 'Eviction History',
            required: true,
            section: 'Basic Information',
            options: ["None", "Disclosed"]
        },
        {
            id: 'eviction_details',
            type: 'textarea',
            label: 'Eviction History Details',
            required: false,
            showIf: { field: 'eviction_history', value: 'Disclosed' },
            section: 'Basic Information'
        },
        {
            id: 'authorization',
            type: 'checkbox',
            label: 'I authorize credit and background checks',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'signature',
            type: 'text',
            label: 'Applicant Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'signature_date',
            type: 'date',
            label: 'Signature Date',
            required: true,
            section: 'Basic Information'
        },
    ],
    "move-inspection": [
        {
            id: 'state',
            type: 'select',
            label: 'State',
            required: true,
            section: 'Basic Information',
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: 'property_address',
            type: 'text',
            label: 'Property Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'inspection_date',
            type: 'date',
            label: 'Inspection Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'inspection_type',
            type: 'select',
            label: 'Type of Inspection',
            required: true,
            section: 'Basic Information',
            options: ["Move-in", "Move-out"]
        },
        {
            id: 'landlord_name',
            type: 'text',
            label: 'Landlord Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_name',
            type: 'text',
            label: 'Tenant Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'exterior_condition',
            type: 'select',
            label: 'Exterior Condition',
            required: true,
            section: 'Basic Information',
            options: ["Excellent", "Good", "Fair", "Poor"]
        },
        {
            id: 'exterior_notes',
            type: 'textarea',
            label: 'Exterior Notes',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'living_room_condition',
            type: 'select',
            label: 'Living Room Condition',
            required: true,
            section: 'Basic Information',
            options: ["Excellent", "Good", "Fair", "Poor"]
        },
        {
            id: 'living_room_notes',
            type: 'textarea',
            label: 'Living Room Notes',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'kitchen_condition',
            type: 'select',
            label: 'Kitchen Condition',
            required: true,
            section: 'Basic Information',
            options: ["Excellent", "Good", "Fair", "Poor"]
        },
        {
            id: 'kitchen_notes',
            type: 'textarea',
            label: 'Kitchen Notes',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'bathroom_condition',
            type: 'select',
            label: 'Bathroom Condition',
            required: true,
            section: 'Basic Information',
            options: ["Excellent", "Good", "Fair", "Poor"]
        },
        {
            id: 'bathroom_notes',
            type: 'textarea',
            label: 'Bathroom Notes',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'bedroom_condition',
            type: 'select',
            label: 'Bedroom Condition',
            required: true,
            section: 'Basic Information',
            options: ["Excellent", "Good", "Fair", "Poor"]
        },
        {
            id: 'bedroom_notes',
            type: 'textarea',
            label: 'Bedroom Notes',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'appliances_condition',
            type: 'select',
            label: 'Appliances Condition',
            required: true,
            section: 'Basic Information',
            options: ["Excellent", "Good", "Fair", "Poor"]
        },
        {
            id: 'appliances_notes',
            type: 'textarea',
            label: 'Appliances Notes',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'damages',
            type: 'textarea',
            label: 'List of Damages',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'repairs_needed',
            type: 'textarea',
            label: 'Repairs Needed',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'security_deposit_deductions',
            type: 'textarea',
            label: 'Security Deposit Deductions',
            required: false,
            showIf: { field: 'inspection_type', value: 'move_out' },
            section: 'Basic Information'
        },
        {
            id: 'landlord_signature',
            type: 'text',
            label: 'Landlord Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_signature',
            type: 'text',
            label: 'Tenant Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'signature_date',
            type: 'date',
            label: 'Signature Date',
            required: true,
            section: 'Basic Information'
        }
    ],
    "notice-to-vacate": [
        {
            id: 'state',
            type: 'select',
            label: 'State',
            required: true,
            section: 'Basic Information',
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: 'property_address',
            type: 'text',
            label: 'Property Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'landlord_name',
            type: 'text',
            label: 'Landlord Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'landlord_address',
            type: 'text',
            label: 'Landlord Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'landlord_phone',
            type: 'tel',
            label: 'Landlord Phone',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_name',
            type: 'text',
            label: 'Tenant Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'notice_type',
            type: 'select',
            label: 'Type of Notice',
            required: true,
            section: 'Basic Information',
            options: ["Non-Renewal", "Lease Violation", "Non-Payment", "Other"]
        },
        {
            id: 'notice_date',
            type: 'date',
            label: 'Notice Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'vacate_date',
            type: 'date',
            label: 'Vacate Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'reason_for_notice',
            type: 'textarea',
            label: 'Reason for Notice',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'lease_violation_details',
            type: 'textarea',
            label: 'Lease Violation Details',
            required: false,
            showIf: { field: 'notice_type', value: 'Lease Violation' },
            section: 'Basic Information'
        },
        {
            id: 'rent_arrears_amount',
            type: 'number',
            label: 'Rent Arrears Amount',
            required: false,
            showIf: { field: 'notice_type', value: 'Non-Payment' },
            section: 'Basic Information'
        },
        {
            id: 'cure_period_days',
            type: 'number',
            label: 'Cure Period (Days)',
            required: false,
            showIf: { field: 'notice_type', value: ['Lease Violation', 'Non-Payment'] },
            section: 'Basic Information'
        },
        {
            id: 'property_condition',
            type: 'select',
            label: 'Property Condition Requirements',
            required: true,
            section: 'Basic Information',
            options: ["Broom Clean", "Professional Cleaning Required", "Repairs Needed"]
        },
        {
            id: 'condition_details',
            type: 'textarea',
            label: 'Property Condition Details',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'security_deposit_return',
            type: 'select',
            label: 'Security Deposit Return',
            required: true,
            section: 'Basic Information',
            options: ["Full Return", "Partial Return", "No Return"]
        },
        {
            id: 'deposit_deductions',
            type: 'textarea',
            label: 'Security Deposit Deductions',
            required: false,
            showIf: { field: 'security_deposit_return', value: 'Partial Return' },
            section: 'Basic Information'
        },
        {
            id: 'additional_terms',
            type: 'textarea',
            label: 'Additional Terms',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'landlord_signature',
            type: 'text',
            label: 'Landlord Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'signature_date',
            type: 'date',
            label: 'Signature Date',
            required: true,
            section: 'Basic Information'
        },
    ],
    "rent-increase": [
        {
            id: 'state',
            type: 'select',
            label: 'State',
            required: true,
            section: 'Basic Information',
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: 'property_address',
            type: 'text',
            label: 'Property Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'landlord_name',
            type: 'text',
            label: 'Landlord Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'landlord_address',
            type: 'text',
            label: 'Landlord Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'landlord_phone',
            type: 'tel',
            label: 'Landlord Phone',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_name',
            type: 'text',
            label: 'Tenant Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'current_rent',
            type: 'number',
            label: 'Current Rent Amount',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'new_rent',
            type: 'number',
            label: 'New Rent Amount',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'increase_percentage',
            type: 'number',
            label: 'Increase Percentage',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'notice_date',
            type: 'date',
            label: 'Notice Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'effective_date',
            type: 'date',
            label: 'Effective Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'lease_term',
            type: 'select',
            label: 'Lease Term',
            required: true,
            section: 'Basic Information',
            options: [
                "Month to Month",
                "Fixed Term"
            ]
        },
        {
            id: 'current_lease_end',
            type: 'date',
            label: 'Current Lease End Date',
            required: false,
            showIf: { field: 'lease_term', value: 'Fixed Term' },
            section: 'Basic Information'
        },
        {
            id: 'reason_for_increase',
            type: 'select',
            label: 'Reason for Increase',
            required: true,
            section: 'Basic Information',
            options: ["Market Conditions", "Property Improvements", "Increased Expenses", "Other"]
        },
        {
            id: 'increase_details',
            type: 'textarea',
            label: 'Increase Details',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'payment_methods',
            type: 'multiselect',
            label: 'Accepted Payment Methods',
            required: true,
            section: 'Basic Information',
            options: ["Check", "Money Order", "Bank Transfer", "Online Payment"]
        },
        {
            id: 'late_fee_policy',
            type: 'textarea',
            label: 'Late Fee Policy',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'response_deadline',
            type: 'date',
            label: 'Response Deadline',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'response_options',
            type: 'select',
            label: 'Response Options',
            required: true,
            section: 'Basic Information',
            options: ["Accept New Terms", "Reject and Vacate", "Request Negotiation"]
        },
        {
            id: 'additional_terms',
            type: 'textarea',
            label: 'Additional Terms',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'landlord_signature',
            type: 'text',
            label: 'Landlord Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'signature_date',
            type: 'date',
            label: 'Signature Date',
            required: true,
            section: 'Basic Information'
        },
    ],
    "security-deposit-return": [
        {
            id: 'state',
            type: 'select',
            label: 'State',
            required: true,
            section: 'Basic Information',
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: 'property_address',
            type: 'text',
            label: 'Property Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'landlord_name',
            type: 'text',
            label: 'Landlord Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'landlord_address',
            type: 'text',
            label: 'Landlord Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_name',
            type: 'text',
            label: 'Tenant Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_address',
            type: 'text',
            label: 'Tenant Forwarding Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'original_deposit_amount',
            type: 'number',
            label: 'Original Security Deposit Amount',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'move_out_date',
            type: 'date',
            label: 'Move-out Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'inspection_date',
            type: 'date',
            label: 'Final Inspection Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'property_condition',
            type: 'select',
            label: 'Overall Property Condition',
            required: true,
            section: 'Basic Information',
            options: ["Excellent", "Good", "Fair", "Poor"]
        },
        {
            id: 'cleaning_deduction',
            type: 'number',
            label: 'Cleaning Deduction',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'repair_deduction',
            type: 'number',
            label: 'Repair Deduction',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'damage_deduction',
            type: 'number',
            label: 'Damage Deduction',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'other_deduction',
            type: 'number',
            label: 'Other Deduction',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'deduction_details',
            type: 'textarea',
            label: 'Deduction Details',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'total_deductions',
            type: 'number',
            label: 'Total Deductions',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'return_amount',
            type: 'number',
            label: 'Return Amount',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'return_method',
            type: 'select',
            label: 'Return Method',
            required: true,
            section: 'Basic Information',
            options: ["Check", "Bank Transfer", "Money Order"]
        },
        {
            id: 'return_deadline',
            type: 'date',
            label: 'Return Deadline',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'bank_details',
            type: 'textarea',
            label: 'Bank Account Details',
            required: false,
            showIf: { field: 'return_method', value: 'Bank Transfer' },
            section: 'Basic Information'
        },
        {
            id: 'additional_notes',
            type: 'textarea',
            label: 'Additional Notes',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'landlord_signature',
            type: 'text',
            label: 'Landlord Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_signature',
            type: 'text',
            label: 'Tenant Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'signature_date',
            type: 'date',
            label: 'Signature Date',
            required: true,
            section: 'Basic Information'
        },
    ],
    "maintenance-request": [
        {
            id: 'state',
            type: 'select',
            label: 'State',
            required: true,
            section: 'Basic Information',
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: 'property_address',
            type: 'text',
            label: 'Property Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_name',
            type: 'text',
            label: 'Tenant Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_phone',
            type: 'tel',
            label: 'Tenant Phone',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_email',
            type: 'email',
            label: 'Tenant Email',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'request_date',
            type: 'date',
            label: 'Request Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'issue_type',
            type: 'select',
            label: 'Issue Type',
            required: true,
            section: 'Basic Information',
            options: ["Plumbing", "Electrical", "Heating", "Appliances", "Structural", "Pest Control", "Cleaning", "Other"]
        },
        {
            id: 'priority_level',
            type: 'select',
            label: 'Priority Level',
            required: true,
            section: 'Basic Information',
            options: ["Emergency", "Urgent", "Routine", "Preventive"]
        },
        {
            id: 'issue_location',
            type: 'select',
            label: 'Issue Location',
            required: true,
            section: 'Basic Information',
            options: ["Kitchen", "Bathroom", "Bedroom", "Living Room", "Basement", "Exterior", "Other"]
        },
        {
            id: 'issue_description',
            type: 'textarea',
            label: 'Issue Description',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'when_started',
            type: 'text',
            label: 'When Did the Issue Start?',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'frequency',
            type: 'select',
            label: 'Issue Frequency',
            required: true,
            section: 'Basic Information',
            options: ["Constant", "Intermittent", "One Time"]
        },
        {
            id: 'access_instructions',
            type: 'textarea',
            label: 'Access Instructions',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'preferred_time',
            type: 'select',
            label: 'Preferred Time for Maintenance',
            required: true,
            section: 'Basic Information',
            options: ["Morning (8am-12pm)", "Afternoon (12pm-5pm)", "Evening (5pm-8pm)"]
        },
        {
            id: 'pets_present',
            type: 'select',
            label: 'Are there pets present?',
            required: true,
            section: 'Basic Information',
            options: ["Yes", "No"]
        },
        {
            id: 'pet_details',
            type: 'textarea',
            label: 'Pet Details',
            required: false,
            showIf: { field: 'pets_present', value: 'Yes' },
            section: 'Basic Information'
        },
        {
            id: 'previous_repairs',
            type: 'textarea',
            label: 'Previous Repair Attempts',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'photos_attached',
            type: 'select',
            label: 'Are photos attached?',
            required: true,
            section: 'Basic Information',
            options: ["Yes", "No"]
        },
        {
            id: 'tenant_signature',
            type: 'text',
            label: 'Tenant Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'signature_date',
            type: 'date',
            label: 'Signature Date',
            required: true,
            section: 'Basic Information'
        },
    ],
    "lease-violation": [
        {
            id: 'state',
            type: 'select',
            label: 'State',
            required: true,
            section: 'Basic Information',
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: 'property_address',
            type: 'text',
            label: 'Property Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'landlord_name',
            type: 'text',
            label: 'Landlord Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'landlord_address',
            type: 'text',
            label: 'Landlord Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_name',
            type: 'text',
            label: 'Tenant Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'notice_date',
            type: 'date',
            label: 'Notice Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'violation_type',
            type: 'select',
            label: 'Type of Violation',
            required: true,
            section: 'Basic Information',
            options: ["Non-Payment of Rent", "Unauthorized Pets", "Unauthorized Occupants", "Property Damage", "Noise Complaints", "Violation of Lease Terms", "Other"]
        },
        {
            id: 'violation_details',
            type: 'textarea',
            label: 'Violation Details',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'violation_date',
            type: 'date',
            label: 'Date of Violation',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'witnesses',
            type: 'textarea',
            label: 'Witnesses (if any)',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'evidence_attached',
            type: 'select',
            label: 'Is Evidence Attached?',
            required: true,
            section: 'Basic Information',
            options: ["Yes", "No"]
        },
        {
            id: 'evidence_description',
            type: 'textarea',
            label: 'Description of Evidence',
            required: false,
            showIf: { field: 'evidence_attached', value: 'Yes' },
            section: 'Basic Information'
        },
        {
            id: 'cure_period',
            type: 'number',
            label: 'Cure Period (Days)',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'cure_deadline',
            type: 'date',
            label: 'Cure Deadline',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'required_actions',
            type: 'textarea',
            label: 'Required Actions to Cure Violation',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'consequences',
            type: 'textarea',
            label: 'Consequences of Non-Compliance',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'previous_notices',
            type: 'select',
            label: 'Previous Violation Notices',
            required: true,
            section: 'Basic Information',
            options: ["None", "One", "Two", "Three or More"]
        },
        {
            id: 'previous_notice_dates',
            type: 'textarea',
            label: 'Previous Notice Dates',
            required: false,
            showIf: { field: 'previous_notices', value: ['One', 'Two', 'Three or More'] },
            section: 'Basic Information'
        },
        {
            id: 'fines_imposed',
            type: 'number',
            label: 'Fines Imposed',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'additional_terms',
            type: 'textarea',
            label: 'Additional Terms',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'landlord_signature',
            type: 'text',
            label: 'Landlord Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_signature',
            type: 'text',
            label: 'Tenant Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'signature_date',
            type: 'date',
            label: 'Signature Date',
            required: true,
            section: 'Basic Information'
        },
    ],
    "right-of-entry": [
        {
            id: 'state',
            type: 'select',
            label: 'State',
            required: true,
            section: 'Basic Information',
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: 'property_address',
            type: 'text',
            label: 'Property Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'landlord_name',
            type: 'text',
            label: 'Landlord Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'landlord_phone',
            type: 'tel',
            label: 'Landlord Phone',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_name',
            type: 'text',
            label: 'Tenant Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'notice_date',
            type: 'date',
            label: 'Notice Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'entry_date',
            type: 'date',
            label: 'Entry Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'entry_time',
            type: 'select',
            label: 'Entry Time',
            required: true,
            section: 'Basic Information',
            options: ["Morning (8am-12pm)", "Afternoon (12pm-5pm)", "Evening (5pm-8pm)"]
        },
        {
            id: 'purpose',
            type: 'select',
            label: 'Purpose of Entry',
            required: true,
            section: 'Basic Information',
            options: ["Property Inspection", "Repairs", "Maintenance", "Show Property", "Emergency", "Other"]
        },
        {
            id: 'purpose_details',
            type: 'textarea',
            label: 'Purpose Details',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'entry_duration',
            type: 'text',
            label: 'Expected Duration of Entry',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'entry_personnel',
            type: 'textarea',
            label: 'Personnel Who Will Enter',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_presence',
            type: 'select',
            label: 'Is Tenant Presence Required?',
            required: true,
            section: 'Basic Information',
            options: ["Yes", "No"]
        },
        {
            id: 'access_instructions',
            type: 'textarea',
            label: 'Access Instructions',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'emergency_contact',
            type: 'tel',
            label: 'Emergency Contact Number',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'rescheduling_policy',
            type: 'textarea',
            label: 'Rescheduling Policy',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'additional_notes',
            type: 'textarea',
            label: 'Additional Notes',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'landlord_signature',
            type: 'text',
            label: 'Landlord Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_signature',
            type: 'text',
            label: 'Tenant Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'signature_date',
            type: 'date',
            label: 'Signature Date',
            required: true,
            section: 'Basic Information'
        },
    ],
    "pet-agreement": [
        {
            id: 'state',
            type: 'select',
            label: 'State',
            required: true,
            section: 'Basic Information',
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: 'property_address',
            type: 'text',
            label: 'Property Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'landlord_name',
            type: 'text',
            label: 'Landlord Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_name',
            type: 'text',
            label: 'Tenant Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'pet_type',
            type: 'select',
            label: 'Pet Type',
            required: true,
            section: 'Basic Information',
            options: ["Dog", "Cat", "Bird", "Fish", "Other"]
        },
        {
            id: 'pet_name',
            type: 'text',
            label: 'Pet Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'pet_breed',
            type: 'text',
            label: 'Pet Breed',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'pet_age',
            type: 'number',
            label: 'Pet Age',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'pet_weight',
            type: 'number',
            label: 'Pet Weight (lbs)',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'pet_color',
            type: 'text',
            label: 'Pet Color',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'pet_license',
            type: 'text',
            label: 'Pet License Number',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'pet_insurance',
            type: 'select',
            label: 'Pet Insurance',
            required: true,
            section: 'Basic Information',
            options: ["Yes", "No"]
        },
        {
            id: 'insurance_provider',
            type: 'text',
            label: 'Insurance Provider',
            required: false,
            showIf: { field: 'pet_insurance', value: 'Yes' },
            section: 'Basic Information'
        },
        {
            id: 'insurance_policy',
            type: 'text',
            label: 'Insurance Policy Number',
            required: false,
            showIf: { field: 'pet_insurance', value: 'Yes' },
            section: 'Basic Information'
        },
        {
            id: 'pet_fee',
            type: 'number',
            label: 'Pet Fee Amount',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'pet_deposit',
            type: 'number',
            label: 'Pet Deposit Amount',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'monthly_pet_rent',
            type: 'number',
            label: 'Monthly Pet Rent',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'pet_rules',
            type: 'textarea',
            label: 'Pet Rules and Regulations',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'pet_areas',
            type: 'textarea',
            label: 'Designated Pet Areas',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'pet_restrictions',
            type: 'textarea',
            label: 'Pet Restrictions',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'pet_emergency_contact',
            type: 'text',
            label: 'Pet Emergency Contact',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'pet_veterinarian',
            type: 'text',
            label: 'Pet Veterinarian',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'veterinarian_phone',
            type: 'tel',
            label: 'Veterinarian Phone',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'pet_photos_attached',
            type: 'select',
            label: 'Are Pet Photos Attached?',
            required: true,
            section: 'Basic Information',
            options: ["Yes", "No"]
        },
        {
            id: 'additional_terms',
            type: 'textarea',
            label: 'Additional Terms',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'landlord_signature',
            type: 'text',
            label: 'Landlord Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_signature',
            type: 'text',
            label: 'Tenant Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'signature_date',
            type: 'date',
            label: 'Signature Date',
            required: true,
            section: 'Basic Information'
        },
    ],
    "co-signer": [
        {
            id: 'state',
            type: 'select',
            label: 'State',
            required: true,
            section: 'Basic Information',
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: 'property_address',
            type: 'text',
            label: 'Property Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'landlord_name',
            type: 'text',
            label: 'Landlord Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_name',
            type: 'text',
            label: 'Primary Tenant Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'cosigner_name',
            type: 'text',
            label: 'Co-signer Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'cosigner_address',
            type: 'text',
            label: 'Co-signer Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'cosigner_phone',
            type: 'tel',
            label: 'Co-signer Phone',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'cosigner_email',
            type: 'email',
            label: 'Co-signer Email',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'cosigner_dob',
            type: 'date',
            label: 'Co-signer Date of Birth',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'cosigner_ssn',
            type: 'text',
            label: 'Co-signer SSN',
            required: true,
            section: 'Basic Information',
            pattern: '^\\d{3}-\\d{2}-\\d{4}$'
        },
        {
            id: 'cosigner_employment',
            type: 'text',
            label: 'Co-signer Employment',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'cosigner_employer',
            type: 'text',
            label: 'Co-signer Employer',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'cosigner_income',
            type: 'number',
            label: 'Co-signer Monthly Income',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'lease_term',
            type: 'select',
            label: 'Lease Term',
            required: true,
            section: 'Basic Information',
            options: [
                "Month to Month",
                "Fixed Term"
            ]
        },
        {
            id: 'lease_start',
            type: 'date',
            label: 'Lease Start Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'lease_end',
            type: 'date',
            label: 'Lease End Date',
            required: false,
            showIf: { field: 'lease_term', value: 'Fixed Term' },
            section: 'Basic Information'
        },
        {
            id: 'monthly_rent',
            type: 'number',
            label: 'Monthly Rent Amount',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'security_deposit',
            type: 'number',
            label: 'Security Deposit Amount',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'guarantee_scope',
            type: 'multiselect',
            label: 'Scope of Guarantee',
            required: true,
            section: 'Basic Information',
            options: ["Rent Payments", "Property Damages", "Utility Payments", "Late Fees and Penalties"]
        },
        {
            id: 'guarantee_limit',
            type: 'number',
            label: 'Guarantee Limit',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'notice_requirement',
            type: 'number',
            label: 'Notice Period (Days)',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'credit_check_authorization',
            type: 'checkbox',
            label: 'I authorize credit check',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'background_check_authorization',
            type: 'checkbox',
            label: 'I authorize background check',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'additional_terms',
            type: 'textarea',
            label: 'Additional Terms',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'landlord_signature',
            type: 'text',
            label: 'Landlord Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'tenant_signature',
            type: 'text',
            label: 'Tenant Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'cosigner_signature',
            type: 'text',
            label: 'Co-signer Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'signature_date',
            type: 'date',
            label: 'Signature Date',
            required: true,
            section: 'Basic Information'
        },
    ],
    "roommate": [
        {
            id: 'state',
            type: 'select',
            label: 'State',
            required: true,
            section: 'Basic Information',
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: 'property_address',
            type: 'text',
            label: 'Property Address',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'primary_tenant_name',
            type: 'text',
            label: 'Primary Tenant Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'primary_tenant_phone',
            type: 'tel',
            label: 'Primary Tenant Phone',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'primary_tenant_email',
            type: 'email',
            label: 'Primary Tenant Email',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'roommate_name',
            type: 'text',
            label: 'Roommate Name',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'roommate_phone',
            type: 'tel',
            label: 'Roommate Phone',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'roommate_email',
            type: 'email',
            label: 'Roommate Email',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'lease_term',
            type: 'select',
            label: 'Lease Term',
            required: true,
            section: 'Basic Information',
            options: [
                "Month to Month",
                "Fixed Term"
            ]
        },
        {
            id: 'lease_start',
            type: 'date',
            label: 'Lease Start Date',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'lease_end',
            type: 'date',
            label: 'Lease End Date',
            required: false,
            showIf: { field: 'lease_term', value: 'Fixed Term' },
            section: 'Basic Information'
        },
        {
            id: 'room_assignment',
            type: 'text',
            label: 'Room Assignment',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'rent_split',
            type: 'select',
            label: 'Rent Split',
            required: true,
            section: 'Basic Information',
            options: [
                "Equal Split",
                "Custom Split"
            ]
        },
        {
            id: 'primary_tenant_rent',
            type: 'number',
            label: 'Primary Tenant Rent Amount',
            required: false,
            showIf: { field: 'rent_split', value: 'custom' },
            section: 'Basic Information'
        },
        {
            id: 'roommate_rent',
            type: 'number',
            label: 'Roommate Rent Amount',
            required: false,
            showIf: { field: 'rent_split', value: 'custom' },
            section: 'Basic Information'
        },
        {
            id: 'utilities_split',
            type: 'select',
            label: 'Utilities Split',
            required: true,
            section: 'Basic Information',
            options: [
                "Equal Split",
                "Custom Split"
            ]
        },
        {
            id: 'utility_responsibilities',
            type: 'textarea',
            label: 'Utility Responsibilities',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'shared_spaces',
            type: 'textarea',
            label: 'Shared Spaces',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'household_chores',
            type: 'textarea',
            label: 'Household Chores',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'guest_policy',
            type: 'textarea',
            label: 'Guest Policy',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'quiet_hours',
            type: 'textarea',
            label: 'Quiet Hours',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'pet_policy',
            type: 'textarea',
            label: 'Pet Policy',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'cleaning_schedule',
            type: 'textarea',
            label: 'Cleaning Schedule',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'furniture_ownership',
            type: 'textarea',
            label: 'Furniture Ownership',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'food_sharing',
            type: 'select',
            label: 'Food Sharing Policy',
            required: true,
            section: 'Basic Information',
            options: ["Shared", "Separate", "Partial Sharing"]
        },
        {
            id: 'food_sharing_details',
            type: 'textarea',
            label: 'Food Sharing Details',
            required: false,
            showIf: { field: 'food_sharing', value: 'partial' },
            section: 'Basic Information'
        },
        {
            id: 'dispute_resolution',
            type: 'textarea',
            label: 'Dispute Resolution Process',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'termination_notice',
            type: 'number',
            label: 'Termination Notice Period (Days)',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'additional_terms',
            type: 'textarea',
            label: 'Additional Terms',
            required: false,
            section: 'Basic Information'
        },
        {
            id: 'primary_tenant_signature',
            type: 'text',
            label: 'Primary Tenant Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'roommate_signature',
            type: 'text',
            label: 'Roommate Signature',
            required: true,
            section: 'Basic Information'
        },
        {
            id: 'signature_date',
            type: 'date',
            label: 'Signature Date',
            required: true,
            section: 'Basic Information'
        },
    ],
    "condo-lease": [
        // Basic Information Section
        {
            id: "state",
            label: "Select the state where the property is located to ensure compliance with local laws",
            type: "select",
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
            required: true,
            section: "Basic Information"
        },
        {
            id: "agreementType",
            label: "Type of lease agreement",
            type: "radio",
            options: ["Standard", "Comprehensive"],
            required: true,
            section: "Basic Information",
            helpText: "Standard is suitable for most rentals, while Comprehensive includes additional clauses and protections"
        },
        {
            id: "leaseTerm",
            label: "Lease term type",
            type: "select",
            options: ["Fixed Term", "Month-to-Month", "Year to Year"],
            required: true,
            section: "Basic Information"
        },
        {
            id: "leaseStartDate",
            label: "Lease start date",
            type: "date",
            required: true,
            section: "Basic Information"
        },
        {
            id: "leaseEndDate",
            label: "Lease end date",
            type: "date",
            required: true,
            dependsOn: {
                field: "leaseTerm",
                value: "Fixed Term"
            },
            section: "Basic Information"
        },
        // Property Details Section
        {
            id: "propertyAddress",
            label: "Condo unit address",
            type: "textarea",
            required: true,
            placeholder: "Enter complete condo unit address including unit number",
            section: "Property Details"
        },
        {
            id: "propertyType",
            label: "Type of condo unit",
            type: "select",
            options: ["Studio", "1 Bedroom", "2 Bedrooms", "3+ Bedrooms", "Penthouse"],
            required: true,
            section: "Property Details"
        },
        {
            id: "propertyAge",
            label: "Year condo was built",
            type: "number",
            required: false,
            section: "Property Details",
            validation: {
                min: 1800,
                max: new Date().getFullYear(),
                message: "Please enter a valid year"
            }
        },
        {
            id: "furnished",
            label: "Is the condo furnished?",
            type: "radio",
            options: ["Fully Furnished", "Partially Furnished", "Unfurnished"],
            required: true,
            section: "Property Details"
        },
        // HOA Information Section
        {
            id: "hoaName",
            label: "HOA/Association Name",
            type: "text",
            required: true,
            section: "HOA Information"
        },
        {
            id: "hoaContact",
            label: "HOA Contact Information",
            type: "textarea",
            required: true,
            section: "HOA Information"
        },
        {
            id: "hoaFees",
            label: "Monthly HOA Fees",
            type: "currency",
            required: true,
            section: "HOA Information"
        },
        {
            id: "hoaRules",
            label: "HOA Rules and Regulations",
            type: "textarea",
            required: true,
            section: "HOA Information"
        },
        // Landlord Information Section
        {
            id: "landlordType",
            label: "Landlord type",
            type: "radio",
            options: ["Individual", "Corporate/Organization"],
            required: true,
            section: "Landlord Information"
        },
        {
            id: "landlordContact",
            label: "Landlord contact information",
            type: "textarea",
            required: true,
            placeholder: "Enter phone, email, and preferred contact method",
            section: "Landlord Information"
        },
        {
            id: "noticesAddress",
            label: "Address for notices to landlord",
            type: "textarea",
            required: true,
            section: "Landlord Information"
        },
        // Tenant Information Section
        {
            id: "tenantName",
            label: "Primary tenant name",
            type: "text",
            required: true,
            section: "Tenant Information"
        },
        {
            id: "additionalTenants",
            label: "Additional tenants",
            type: "textarea",
            required: false,
            placeholder: "Enter names of additional tenants (one per line)",
            section: "Tenant Information"
        },
        {
            id: "allowMinors",
            label: "Allow minors or non-signing occupants?",
            type: "checkbox",
            required: false,
            section: "Tenant Information"
        },
        {
            id: "tenantContact",
            label: "Tenant contact information",
            type: "textarea",
            required: true,
            placeholder: "Enter phone and email",
            section: "Tenant Information"
        },
        // Property Access and Rules Section
        {
            id: "parkingAccess",
            label: "Parking access included?",
            type: "checkbox",
            required: false,
            section: "Property Access and Rules"
        },
        {
            id: "parkingSpaces",
            label: "Number of assigned parking spaces",
            type: "number",
            required: false,
            dependsOn: {
                field: "parkingAccess",
                value: true
            },
            section: "Property Access and Rules"
        },
        {
            id: "smokingAllowed",
            label: "Smoking allowed indoors?",
            type: "checkbox",
            required: false,
            section: "Property Access and Rules"
        },
        {
            id: "vapingAllowed",
            label: "Vaping allowed indoors?",
            type: "checkbox",
            required: false,
            section: "Property Access and Rules"
        },
        {
            id: "petPolicy",
            label: "Pet policy",
            type: "select",
            options: ["No pets allowed", "Pets allowed with restrictions", "Pets allowed"],
            required: true,
            section: "Property Access and Rules"
        },
        {
            id: "entryNotice",
            label: "Required notice for landlord entry (non-emergency)",
            type: "select",
            options: ["24 hours", "48 hours", "72 hours"],
            required: true,
            section: "Property Access and Rules"
        },
        {
            id: "improvements",
            label: "Tenant improvements allowed?",
            type: "select",
            options: ["No", "Yes", "Only with landlord consent"],
            required: true,
            section: "Property Access and Rules"
        },
        // Financial Terms Section
        {
            id: "rentAmount",
            label: "Monthly rent amount",
            type: "currency",
            required: true,
            section: "Financial Terms"
        },
        {
            id: "rentDueDate",
            label: "Rent due date",
            type: "select",
            options: ["1st of month", "15th of month", "Other"],
            required: true,
            section: "Financial Terms"
        },
        {
            id: "paymentMethods",
            label: "Accepted payment methods",
            type: "checkbox",
            options: ["Cash", "Check", "Direct Debit", "Venmo", "Other"],
            section: "Financial Terms",
            required: false
        },
        {
            id: "rentIncreaseNotice",
            label: "Notice period for rent increase",
            type: "select",
            options: ["Legal minimum", "30 days", "60 days", "90 days"],
            required: true,
            section: "Financial Terms"
        },
        // Deposits and Additional Fees Section
        {
            id: "securityDeposit",
            label: "Security deposit required?",
            type: "checkbox",
            section: "Deposits and Additional Fees",
            required: false
        },
        {
            id: "securityDepositAmount",
            label: "Security deposit amount",
            type: "currency",
            dependsOn: {
                field: "securityDeposit",
                value: true
            },
            section: "Deposits and Additional Fees",
            required: false
        },
        {
            id: "nsfFee",
            label: "NSF check fee amount",
            type: "currency",
            section: "Deposits and Additional Fees",
            required: false
        },
        {
            id: "lateFee",
            label: "Late rent payment fee",
            type: "currency",
            section: "Deposits and Additional Fees",
            required: false
        },
        // Utilities and Maintenance Section
        {
            id: "utilities",
            label: "Utility payment responsibility",
            type: "select",
            options: ["Tenant", "Included in rent", "Shared"],
            required: true,
            section: "Utilities and Maintenance"
        },
        {
            id: "maintenanceResponsibility",
            label: "Tenant responsible for maintenance?",
            type: "checkbox",
            section: "Utilities and Maintenance",
            required: false
        },
        {
            id: "insuranceCosts",
            label: "Tenant responsible for insurance costs?",
            type: "checkbox",
            section: "Utilities and Maintenance",
            required: false
        },
        // Lease Terms and Conditions Section
        {
            id: "purchaseOption",
            label: "Option to purchase property?",
            type: "checkbox",
            section: "Lease Terms and Conditions",
            required: false
        },
        {
            id: "terminationNotice",
            label: "Required notice for lease termination",
            type: "select",
            options: ["30 days", "60 days", "90 days"],
            required: true,
            section: "Lease Terms and Conditions"
        },
        {
            id: "subleasing",
            label: "Subleasing/assignment policy",
            type: "select",
            options: ["Not allowed", "Allowed with landlord consent"],
            required: true,
            section: "Lease Terms and Conditions"
        },
        {
            id: "renewalOption",
            label: "Lease renewal option?",
            type: "checkbox",
            section: "Lease Terms and Conditions",
            required: false
        },
        {
            id: "earlyTerminationFee",
            label: "Early termination fee?",
            type: "checkbox",
            section: "Lease Terms and Conditions",
            required: false
        },
        {
            id: "inspectionReport",
            label: "Require walkthrough inspection report?",
            type: "checkbox",
            section: "Lease Terms and Conditions",
            required: false
        },
        // Additional Terms Section
        {
            id: "disputeResolution",
            label: "Dispute resolution method",
            type: "select",
            options: ["Mediation", "Arbitration", "Mediation then arbitration", "Not specified"],
            required: true,
            section: "Additional Terms"
        },
        {
            id: "additionalTerms",
            label: "Additional terms or information",
            type: "textarea",
            section: "Additional Terms"
        },
        {
            id: "signingDate",
            label: "Planned signing date",
            type: "date",
            section: "Additional Terms"
        }
    ],
    "room-rental": [
        // Basic Information Section
        {
            id: "state",
            label: "Select the state where the property is located to ensure compliance with local laws",
            type: "select",
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
            required: true,
            section: "Basic Information"
        },
        {
            id: "agreementType",
            label: "Type of agreement",
            type: "radio",
            options: ["Standard", "Comprehensive"],
            required: true,
            section: "Basic Information",
            helpText: "Standard is suitable for most rentals, while Comprehensive includes additional clauses and protections"
        },
        {
            id: "leaseTerm",
            label: "Lease term type",
            type: "select",
            options: ["Fixed Term", "Month-to-Month", "Year to Year"],
            required: true,
            section: "Basic Information"
        },
        {
            id: "leaseStartDate",
            label: "Lease start date",
            type: "date",
            required: true,
            section: "Basic Information"
        },
        {
            id: "leaseEndDate",
            label: "Lease end date",
            type: "date",
            required: true,
            dependsOn: {
                field: "leaseTerm",
                value: "Fixed Term"
            },
            section: "Basic Information"
        },
        // Property Details Section
        {
            id: "propertyAddress",
            label: "Property address",
            type: "textarea",
            required: true,
            placeholder: "Enter complete property address",
            section: "Property Details"
        },
        {
            id: "roomDescription",
            label: "Room description",
            type: "textarea",
            required: true,
            placeholder: "Describe the room being rented (size, features, etc.)",
            section: "Property Details"
        },
        {
            id: "sharedSpaces",
            label: "Shared spaces",
            type: "textarea",
            required: true,
            placeholder: "List all shared spaces (kitchen, bathroom, living room, etc.)",
            section: "Property Details"
        },
        {
            id: "furnished",
            label: "Is the room furnished?",
            type: "radio",
            options: ["Fully Furnished", "Partially Furnished", "Unfurnished"],
            required: true,
            section: "Property Details"
        },
        // Landlord Information Section
        {
            id: "landlordType",
            label: "Landlord type",
            type: "radio",
            options: ["Individual", "Corporate/Organization"],
            required: true,
            section: "Landlord Information"
        },
        {
            id: "landlordContact",
            label: "Landlord contact information",
            type: "textarea",
            required: true,
            placeholder: "Enter phone, email, and preferred contact method",
            section: "Landlord Information"
        },
        {
            id: "noticesAddress",
            label: "Address for notices to landlord",
            type: "textarea",
            required: true,
            section: "Landlord Information"
        },
        // Tenant Information Section
        {
            id: "tenantName",
            label: "Primary tenant name",
            type: "text",
            required: true,
            section: "Tenant Information"
        },
        {
            id: "tenantContact",
            label: "Tenant contact information",
            type: "textarea",
            required: true,
            placeholder: "Enter phone and email",
            section: "Tenant Information"
        },
        {
            id: "occupancyLimit",
            label: "Maximum number of occupants",
            type: "number",
            required: true,
            section: "Tenant Information"
        },
        // Property Access and Rules Section
        {
            id: "parkingAccess",
            label: "Parking access included?",
            type: "checkbox",
            required: false,
            section: "Property Access and Rules"
        },
        {
            id: "parkingSpaces",
            label: "Number of assigned parking spaces",
            type: "number",
            required: false,
            dependsOn: {
                field: "parkingAccess",
                value: true
            },
            section: "Property Access and Rules"
        },
        {
            id: "smokingAllowed",
            label: "Smoking allowed indoors?",
            type: "checkbox",
            required: false,
            section: "Property Access and Rules"
        },
        {
            id: "vapingAllowed",
            label: "Vaping allowed indoors?",
            type: "checkbox",
            required: false,
            section: "Property Access and Rules"
        },
        {
            id: "petPolicy",
            label: "Pet policy",
            type: "select",
            options: ["No pets allowed", "Pets allowed with restrictions", "Pets allowed"],
            required: true,
            section: "Property Access and Rules"
        },
        {
            id: "entryNotice",
            label: "Required notice for landlord entry (non-emergency)",
            type: "select",
            options: ["24 hours", "48 hours", "72 hours"],
            required: true,
            section: "Property Access and Rules"
        },
        {
            id: "improvements",
            label: "Tenant improvements allowed?",
            type: "select",
            options: ["No", "Yes", "Only with landlord consent"],
            required: true,
            section: "Property Access and Rules"
        },
        // Financial Terms Section
        {
            id: "rentAmount",
            label: "Monthly rent amount",
            type: "currency",
            required: true,
            section: "Financial Terms"
        },
        {
            id: "rentDueDate",
            label: "Rent due date",
            type: "select",
            options: ["1st of month", "15th of month", "Other"],
            required: true,
            section: "Financial Terms"
        },
        {
            id: "paymentMethods",
            label: "Accepted payment methods",
            type: "checkbox",
            options: ["Cash", "Check", "Direct Debit", "Venmo", "Other"],
            section: "Financial Terms",
            required: false
        },
        {
            id: "rentIncreaseNotice",
            label: "Notice period for rent increase",
            type: "select",
            options: ["Legal minimum", "30 days", "60 days", "90 days"],
            required: true,
            section: "Financial Terms"
        },
        // Deposits and Additional Fees Section
        {
            id: "securityDeposit",
            label: "Security deposit required?",
            type: "checkbox",
            section: "Deposits and Additional Fees",
            required: false
        },
        {
            id: "securityDepositAmount",
            label: "Security deposit amount",
            type: "currency",
            dependsOn: {
                field: "securityDeposit",
                value: true
            },
            section: "Deposits and Additional Fees",
            required: false
        },
        {
            id: "nsfFee",
            label: "NSF check fee amount",
            type: "currency",
            section: "Deposits and Additional Fees",
            required: false
        },
        {
            id: "lateFee",
            label: "Late rent payment fee",
            type: "currency",
            section: "Deposits and Additional Fees",
            required: false
        },
        // Utilities and Maintenance Section
        {
            id: "utilities",
            label: "Utility payment responsibility",
            type: "select",
            options: ["Tenant", "Included in rent", "Shared"],
            required: true,
            section: "Utilities and Maintenance"
        },
        {
            id: "maintenanceResponsibility",
            label: "Tenant responsible for maintenance?",
            type: "checkbox",
            section: "Utilities and Maintenance",
            required: false
        },
        {
            id: "insuranceCosts",
            label: "Tenant responsible for insurance costs?",
            type: "checkbox",
            section: "Utilities and Maintenance",
            required: false
        },
        // Lease Terms and Conditions Section
        {
            id: "terminationNotice",
            label: "Required notice for lease termination",
            type: "select",
            options: ["30 days", "60 days", "90 days"],
            required: true,
            section: "Lease Terms and Conditions"
        },
        {
            id: "subleasing",
            label: "Subleasing/assignment policy",
            type: "select",
            options: ["Not allowed", "Allowed with landlord consent"],
            required: true,
            section: "Lease Terms and Conditions"
        },
        {
            id: "renewalOption",
            label: "Lease renewal option?",
            type: "checkbox",
            section: "Lease Terms and Conditions",
            required: false
        },
        {
            id: "earlyTerminationFee",
            label: "Early termination fee?",
            type: "checkbox",
            section: "Lease Terms and Conditions",
            required: false
        },
        {
            id: "inspectionReport",
            label: "Require walkthrough inspection report?",
            type: "checkbox",
            section: "Lease Terms and Conditions",
            required: false
        },
        // Additional Terms Section
        {
            id: "disputeResolution",
            label: "Dispute resolution method",
            type: "select",
            options: ["Mediation", "Arbitration", "Mediation then arbitration", "Not specified"],
            required: true,
            section: "Additional Terms"
        },
        {
            id: "additionalTerms",
            label: "Additional terms or information",
            type: "textarea",
            section: "Additional Terms"
        },
        {
            id: "signingDate",
            label: "Planned signing date",
            type: "date",
            section: "Additional Terms"
        }
    ],
    "commercial-lease": [
        // Basic Information Section
        {
            id: "state",
            label: "Select the state where the property is located to ensure compliance with local laws",
            type: "select",
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
            required: true,
            section: "Basic Information"
        },
        {
            id: "agreementType",
            label: "Type of lease agreement",
            type: "radio",
            options: ["Standard", "Comprehensive"],
            required: true,
            section: "Basic Information",
            helpText: "Standard is suitable for most rentals, while Comprehensive includes additional clauses and protections"
        },
        {
            id: "leaseTerm",
            label: "Lease term type",
            type: "select",
            options: ["Fixed Term", "Month-to-Month", "Year to Year"],
            required: true,
            section: "Basic Information"
        },
        {
            id: "leaseStartDate",
            label: "Lease start date",
            type: "date",
            required: true,
            section: "Basic Information"
        },
        {
            id: "leaseEndDate",
            label: "Lease end date",
            type: "date",
            required: true,
            dependsOn: {
                field: "leaseTerm",
                value: "Fixed Term"
            },
            section: "Basic Information"
        },
        // Property Details Section
        {
            id: "propertyAddress",
            label: "Commercial property address",
            type: "textarea",
            required: true,
            placeholder: "Enter complete property address",
            section: "Property Details"
        },
        {
            id: "propertyType",
            label: "Type of commercial property",
            type: "select",
            options: ["Office Space", "Retail Space", "Warehouse", "Industrial Space", "Restaurant", "Other"],
            required: true,
            section: "Property Details"
        },
        {
            id: "propertySize",
            label: "Property size (square feet)",
            type: "number",
            required: true,
            section: "Property Details"
        },
        {
            id: "propertyAge",
            label: "Year property was built",
            type: "number",
            required: false,
            section: "Property Details",
            validation: {
                min: 1800,
                max: new Date().getFullYear(),
                message: "Please enter a valid year"
            }
        },
        {
            id: "furnished",
            label: "Is the property furnished?",
            type: "radio",
            options: ["Fully Furnished", "Partially Furnished", "Unfurnished"],
            required: true,
            section: "Property Details"
        },
        // Landlord Information Section
        {
            id: "landlordType",
            label: "Landlord type",
            type: "radio",
            options: ["Individual", "Corporate/Organization"],
            required: true,
            section: "Landlord Information"
        },
        {
            id: "landlordContact",
            label: "Landlord contact information",
            type: "textarea",
            required: true,
            placeholder: "Enter phone, email, and preferred contact method",
            section: "Landlord Information"
        },
        {
            id: "noticesAddress",
            label: "Address for notices to landlord",
            type: "textarea",
            required: true,
            section: "Landlord Information"
        },
        // Tenant Information Section
        {
            id: "tenantName",
            label: "Business/Organization name",
            type: "text",
            required: true,
            section: "Tenant Information"
        },
        {
            id: "tenantType",
            label: "Type of business",
            type: "select",
            options: ["Corporation", "LLC", "Partnership", "Sole Proprietorship", "Other"],
            required: true,
            section: "Tenant Information"
        },
        {
            id: "tenantContact",
            label: "Business contact information",
            type: "textarea",
            required: true,
            placeholder: "Enter phone and email",
            section: "Tenant Information"
        },
        {
            id: "businessLicense",
            label: "Business license number",
            type: "text",
            required: true,
            section: "Tenant Information"
        },
        // Property Access and Rules Section
        {
            id: "parkingAccess",
            label: "Parking access included?",
            type: "checkbox",
            required: false,
            section: "Property Access and Rules"
        },
        {
            id: "parkingSpaces",
            label: "Number of assigned parking spaces",
            type: "number",
            required: false,
            dependsOn: {
                field: "parkingAccess",
                value: true
            },
            section: "Property Access and Rules"
        },
        {
            id: "smokingAllowed",
            label: "Smoking allowed indoors?",
            type: "checkbox",
            required: false,
            section: "Property Access and Rules"
        },
        {
            id: "vapingAllowed",
            label: "Vaping allowed indoors?",
            type: "checkbox",
            required: false,
            section: "Property Access and Rules"
        },
        {
            id: "petPolicy",
            label: "Pet policy",
            type: "select",
            options: ["No pets allowed", "Pets allowed with restrictions", "Pets allowed"],
            required: true,
            section: "Property Access and Rules"
        },
        {
            id: "entryNotice",
            label: "Required notice for landlord entry (non-emergency)",
            type: "select",
            options: ["24 hours", "48 hours", "72 hours"],
            required: true,
            section: "Property Access and Rules"
        },
        {
            id: "improvements",
            label: "Tenant improvements allowed?",
            type: "select",
            options: ["No", "Yes", "Only with landlord consent"],
            required: true,
            section: "Property Access and Rules"
        },
        // Financial Terms Section
        {
            id: "rentAmount",
            label: "Monthly rent amount",
            type: "currency",
            required: true,
            section: "Financial Terms"
        },
        {
            id: "rentDueDate",
            label: "Rent due date",
            type: "select",
            options: ["1st of month", "15th of month", "Other"],
            required: true,
            section: "Financial Terms"
        },
        {
            id: "paymentMethods",
            label: "Accepted payment methods",
            type: "checkbox",
            options: ["Cash", "Check", "Direct Debit", "Wire Transfer", "Other"],
            section: "Financial Terms",
            required: false
        },
        {
            id: "rentIncreaseNotice",
            label: "Notice period for rent increase",
            type: "select",
            options: ["Legal minimum", "30 days", "60 days", "90 days"],
            required: true,
            section: "Financial Terms"
        },
        // Deposits and Additional Fees Section
        {
            id: "securityDeposit",
            label: "Security deposit required?",
            type: "checkbox",
            section: "Deposits and Additional Fees",
            required: false
        },
        {
            id: "securityDepositAmount",
            label: "Security deposit amount",
            type: "currency",
            dependsOn: {
                field: "securityDeposit",
                value: true
            },
            section: "Deposits and Additional Fees",
            required: false
        },
        {
            id: "nsfFee",
            label: "NSF check fee amount",
            type: "currency",
            section: "Deposits and Additional Fees",
            required: false
        },
        {
            id: "lateFee",
            label: "Late rent payment fee",
            type: "currency",
            section: "Deposits and Additional Fees",
            required: false
        },
        // Utilities and Maintenance Section
        {
            id: "utilities",
            label: "Utility payment responsibility",
            type: "select",
            options: ["Tenant", "Included in rent", "Shared"],
            required: true,
            section: "Utilities and Maintenance"
        },
        {
            id: "maintenanceResponsibility",
            label: "Tenant responsible for maintenance?",
            type: "checkbox",
            section: "Utilities and Maintenance",
            required: false
        },
        {
            id: "insuranceCosts",
            label: "Tenant responsible for insurance costs?",
            type: "checkbox",
            section: "Utilities and Maintenance",
            required: false
        },
        // Lease Terms and Conditions Section
        {
            id: "purchaseOption",
            label: "Option to purchase property?",
            type: "checkbox",
            section: "Lease Terms and Conditions",
            required: false
        },
        {
            id: "terminationNotice",
            label: "Required notice for lease termination",
            type: "select",
            options: ["30 days", "60 days", "90 days"],
            required: true,
            section: "Lease Terms and Conditions"
        },
        {
            id: "subleasing",
            label: "Subleasing/assignment policy",
            type: "select",
            options: ["Not allowed", "Allowed with landlord consent"],
            required: true,
            section: "Lease Terms and Conditions"
        },
        {
            id: "renewalOption",
            label: "Lease renewal option?",
            type: "checkbox",
            section: "Lease Terms and Conditions",
            required: false
        },
        {
            id: "earlyTerminationFee",
            label: "Early termination fee?",
            type: "checkbox",
            section: "Lease Terms and Conditions",
            required: false
        },
        {
            id: "inspectionReport",
            label: "Require walkthrough inspection report?",
            type: "checkbox",
            section: "Lease Terms and Conditions",
            required: false
        },
        // Additional Terms Section
        {
            id: "disputeResolution",
            label: "Dispute resolution method",
            type: "select",
            options: ["Mediation", "Arbitration", "Mediation then arbitration", "Not specified"],
            required: true,
            section: "Additional Terms"
        },
        {
            id: "additionalTerms",
            label: "Additional terms or information",
            type: "textarea",
            section: "Additional Terms"
        },
        {
            id: "signingDate",
            label: "Planned signing date",
            type: "date",
            section: "Additional Terms"
        }
    ],
    "basement-suite-lease": [
        {
            id: "state",
            label: "Select the state where the property is located",
            type: "select",
            required: true,
            section: "Basic Information",
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: "agreementType",
            label: "Type of lease agreement",
            type: "select",
            required: true,
            section: "Basic Information",
            options: ["Fixed-term lease", "Month-to-month lease"]
        },
        {
            id: "leaseTerm",
            label: "Lease term (if fixed-term)",
            type: "select",
            required: true,
            section: "Basic Information",
            options: ["6 months", "12 months", "18 months", "24 months"]
        },
        {
            id: "leaseStartDate",
            label: "Lease start date",
            type: "date",
            required: true,
            section: "Basic Information"
        },
        {
            id: "propertyAddress",
            label: "Rental property street address",
            type: "text",
            required: true,
            section: "Property Details"
        },
        {
            id: "propertyType",
            label: "Type of rental property",
            type: "select",
            required: true,
            section: "Property Details",
            options: ["Basement suite", "Garden suite", "Walk-out basement"]
        },
        {
            id: "suiteDescription",
            label: "Suite description and layout",
            type: "textarea",
            required: true,
            section: "Property Details",
            helpText: "Describe the layout, rooms, and any unique features of the basement suite"
        },
        {
            id: "separateEntrance",
            label: "Does the suite have a separate entrance?",
            type: "radio",
            required: true,
            section: "Property Details",
            options: ["Yes", "No"]
        },
        {
            id: "landlordInfo",
            label: "Landlord contact information",
            type: "textarea",
            required: true,
            section: "Landlord Information",
            helpText: "Include name, phone, email, and address"
        },
        {
            id: "tenantName",
            label: "Primary tenant name",
            type: "text",
            required: true,
            section: "Tenant Information"
        },
        {
            id: "additionalTenants",
            label: "Additional tenants",
            type: "textarea",
            required: false,
            section: "Tenant Information",
            helpText: "List names of any additional tenants"
        },
        {
            id: "parkingAccess",
            label: "Parking access included?",
            type: "radio",
            required: true,
            section: "Property Access and Rules",
            options: ["Yes", "No"]
        },
        {
            id: "parkingDetails",
            label: "Parking details",
            type: "textarea",
            required: false,
            section: "Property Access and Rules",
            helpText: "Describe parking arrangements, including number of spaces and location"
        },
        {
            id: "sharedSpaces",
            label: "Shared spaces",
            type: "textarea",
            required: true,
            section: "Property Access and Rules",
            helpText: "List any shared spaces (laundry, storage, etc.) and usage rules"
        },
        {
            id: "noiseRestrictions",
            label: "Noise restrictions",
            type: "textarea",
            required: true,
            section: "Property Access and Rules",
            helpText: "Specify quiet hours and noise level expectations"
        },
        {
            id: "monthlyRent",
            label: "Monthly rent amount",
            type: "currency",
            required: true,
            section: "Financial Terms"
        },
        {
            id: "rentDueDate",
            label: "Rent due date",
            type: "select",
            required: true,
            section: "Financial Terms",
            options: ["1st of the month", "15th of the month", "Last day of the month"]
        },
        {
            id: "lateFee",
            label: "Late payment fee",
            type: "currency",
            required: true,
            section: "Financial Terms"
        },
        {
            id: "securityDeposit",
            label: "Security deposit required?",
            type: "radio",
            required: true,
            section: "Deposits and Additional Fees",
            options: ["Yes", "No"]
        },
        {
            id: "securityDepositAmount",
            label: "Security deposit amount",
            type: "currency",
            required: true,
            section: "Deposits and Additional Fees"
        },
        {
            id: "nsfFee",
            label: "NSF check fee amount",
            type: "currency",
            required: true,
            section: "Deposits and Additional Fees"
        },
        {
            id: "utilityResponsibility",
            label: "Utility payment responsibility",
            type: "textarea",
            required: true,
            section: "Utilities and Maintenance",
            helpText: "Specify which utilities are included in rent and which are tenant's responsibility"
        },
        {
            id: "maintenanceResponsibility",
            label: "Maintenance responsibilities",
            type: "textarea",
            required: true,
            section: "Utilities and Maintenance",
            helpText: "Detail maintenance responsibilities for both landlord and tenant"
        },
        {
            id: "optionToPurchase",
            label: "Option to purchase property?",
            type: "radio",
            required: true,
            section: "Lease Terms and Conditions",
            options: ["Yes", "No"]
        },
        {
            id: "purchaseOptionDetails",
            label: "Purchase option details",
            type: "textarea",
            required: false,
            section: "Lease Terms and Conditions",
            helpText: "If yes, specify terms and conditions of the purchase option"
        },
        {
            id: "terminationNotice",
            label: "Required notice for lease termination",
            type: "select",
            required: true,
            section: "Lease Terms and Conditions",
            options: ["30 days", "60 days", "90 days"]
        },
        {
            id: "disputeResolution",
            label: "Dispute resolution method",
            type: "select",
            required: true,
            section: "Additional Terms",
            options: ["Mediation", "Arbitration", "Court proceedings"]
        },
        {
            id: "additionalTerms",
            label: "Additional terms or information",
            type: "textarea",
            required: false,
            section: "Additional Terms",
            helpText: "Any other terms or conditions specific to this basement suite lease"
        }
    ],
    "duplex-lease": [
        {
            id: "state",
            label: "Select the state where the property is located",
            type: "select",
            required: true,
            section: "Basic Information",
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: "agreementType",
            label: "Type of lease agreement",
            type: "select",
            required: true,
            section: "Basic Information",
            options: ["Fixed-term lease", "Month-to-month lease"]
        },
        {
            id: "leaseTerm",
            label: "Lease term (if fixed-term)",
            type: "select",
            required: true,
            section: "Basic Information",
            options: ["6 months", "12 months", "18 months", "24 months"]
        },
        {
            id: "leaseStartDate",
            label: "Lease start date",
            type: "date",
            required: true,
            section: "Basic Information"
        },
        {
            id: "propertyAddress",
            label: "Rental property street address",
            type: "text",
            required: true,
            section: "Property Details"
        },
        {
            id: "unitNumber",
            label: "Unit number or designation",
            type: "text",
            required: true,
            section: "Property Details"
        },
        {
            id: "propertyType",
            label: "Type of duplex",
            type: "select",
            required: true,
            section: "Property Details",
            options: ["Side-by-side duplex", "Up-down duplex", "Detached duplex"]
        },
        {
            id: "unitDescription",
            label: "Unit description and layout",
            type: "textarea",
            required: true,
            section: "Property Details",
            helpText: "Describe the layout, rooms, and any unique features of the unit"
        },
        {
            id: "landlordInfo",
            label: "Landlord contact information",
            type: "textarea",
            required: true,
            section: "Landlord Information",
            helpText: "Include name, phone, email, and address"
        },
        {
            id: "tenantName",
            label: "Primary tenant name",
            type: "text",
            required: true,
            section: "Tenant Information"
        },
        {
            id: "additionalTenants",
            label: "Additional tenants",
            type: "textarea",
            required: false,
            section: "Tenant Information",
            helpText: "List names of any additional tenants"
        },
        {
            id: "parkingAccess",
            label: "Parking access included?",
            type: "radio",
            required: true,
            section: "Property Access and Rules",
            options: ["Yes", "No"]
        },
        {
            id: "parkingDetails",
            label: "Parking details",
            type: "textarea",
            required: false,
            section: "Property Access and Rules",
            helpText: "Describe parking arrangements, including number of spaces and location"
        },
        {
            id: "sharedSpaces",
            label: "Shared spaces",
            type: "textarea",
            required: true,
            section: "Property Access and Rules",
            helpText: "List any shared spaces (laundry, storage, etc.) and usage rules"
        },
        {
            id: "noiseRestrictions",
            label: "Noise restrictions",
            type: "textarea",
            required: true,
            section: "Property Access and Rules",
            helpText: "Specify quiet hours and noise level expectations"
        },
        {
            id: "monthlyRent",
            label: "Monthly rent amount",
            type: "currency",
            required: true,
            section: "Financial Terms"
        },
        {
            id: "rentDueDate",
            label: "Rent due date",
            type: "select",
            required: true,
            section: "Financial Terms",
            options: ["1st of the month", "15th of the month", "Last day of the month"]
        },
        {
            id: "lateFee",
            label: "Late payment fee",
            type: "currency",
            required: true,
            section: "Financial Terms"
        },
        {
            id: "securityDeposit",
            label: "Security deposit required?",
            type: "radio",
            required: true,
            section: "Deposits and Additional Fees",
            options: ["Yes", "No"]
        },
        {
            id: "securityDepositAmount",
            label: "Security deposit amount",
            type: "currency",
            required: true,
            section: "Deposits and Additional Fees"
        },
        {
            id: "nsfFee",
            label: "NSF check fee amount",
            type: "currency",
            required: true,
            section: "Deposits and Additional Fees"
        },
        {
            id: "utilityResponsibility",
            label: "Utility payment responsibility",
            type: "textarea",
            required: true,
            section: "Utilities and Maintenance",
            helpText: "Specify which utilities are included in rent and which are tenant's responsibility"
        },
        {
            id: "maintenanceResponsibility",
            label: "Maintenance responsibilities",
            type: "textarea",
            required: true,
            section: "Utilities and Maintenance",
            helpText: "Detail maintenance responsibilities for both landlord and tenant"
        },
        {
            id: "optionToPurchase",
            label: "Option to purchase property?",
            type: "radio",
            required: true,
            section: "Lease Terms and Conditions",
            options: ["Yes", "No"]
        },
        {
            id: "purchaseOptionDetails",
            label: "Purchase option details",
            type: "textarea",
            required: false,
            section: "Lease Terms and Conditions",
            helpText: "If yes, specify terms and conditions of the purchase option"
        },
        {
            id: "terminationNotice",
            label: "Required notice for lease termination",
            type: "select",
            required: true,
            section: "Lease Terms and Conditions",
            options: ["30 days", "60 days", "90 days"]
        },
        {
            id: "disputeResolution",
            label: "Dispute resolution method",
            type: "select",
            required: true,
            section: "Additional Terms",
            options: ["Mediation", "Arbitration", "Court proceedings"]
        },
        {
            id: "additionalTerms",
            label: "Additional terms or information",
            type: "textarea",
            required: false,
            section: "Additional Terms",
            helpText: "Any other terms or conditions specific to this duplex lease"
        }
    ],
    "mobile-home-lease": [
        {
            id: "state",
            label: "Select the state where the property is located",
            type: "select",
            required: true,
            section: "Basic Information",
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: "agreementType",
            label: "Type of lease agreement",
            type: "select",
            required: true,
            section: "Basic Information",
            options: ["Fixed-term lease", "Month-to-month lease"]
        },
        {
            id: "leaseTerm",
            label: "Lease term (if fixed-term)",
            type: "select",
            required: true,
            section: "Basic Information",
            options: ["6 months", "12 months", "18 months", "24 months"]
        },
        {
            id: "leaseStartDate",
            label: "Lease start date",
            type: "date",
            required: true,
            section: "Basic Information"
        },
        {
            id: "propertyAddress",
            label: "Mobile home park address",
            type: "text",
            required: true,
            section: "Property Details"
        },
        {
            id: "spaceNumber",
            label: "Space/lot number",
            type: "text",
            required: true,
            section: "Property Details"
        },
        {
            id: "mobileHomeDetails",
            label: "Mobile home details",
            type: "textarea",
            required: true,
            section: "Property Details",
            helpText: "Include make, model, year, and serial number"
        },
        {
            id: "landlordInfo",
            label: "Landlord/park owner contact information",
            type: "textarea",
            required: true,
            section: "Landlord Information",
            helpText: "Include name, phone, email, and address"
        },
        {
            id: "tenantName",
            label: "Primary tenant name",
            type: "text",
            required: true,
            section: "Tenant Information"
        },
        {
            id: "additionalTenants",
            label: "Additional tenants",
            type: "textarea",
            required: false,
            section: "Tenant Information",
            helpText: "List names of any additional tenants"
        },
        {
            id: "parkingAccess",
            label: "Additional parking spaces included?",
            type: "radio",
            required: true,
            section: "Property Access and Rules",
            options: ["Yes", "No"]
        },
        {
            id: "parkingDetails",
            label: "Parking details",
            type: "textarea",
            required: false,
            section: "Property Access and Rules",
            helpText: "Describe parking arrangements for additional vehicles"
        },
        {
            id: "sharedSpaces",
            label: "Shared spaces and amenities",
            type: "textarea",
            required: true,
            section: "Property Access and Rules",
            helpText: "List shared spaces (laundry, recreation areas, etc.) and usage rules"
        },
        {
            id: "noiseRestrictions",
            label: "Noise restrictions",
            type: "textarea",
            required: true,
            section: "Property Access and Rules",
            helpText: "Specify quiet hours and noise level expectations"
        },
        {
            id: "monthlyRent",
            label: "Monthly rent amount",
            type: "currency",
            required: true,
            section: "Financial Terms"
        },
        {
            id: "rentDueDate",
            label: "Rent due date",
            type: "select",
            required: true,
            section: "Financial Terms",
            options: ["1st of the month", "15th of the month", "Last day of the month"]
        },
        {
            id: "lateFee",
            label: "Late payment fee",
            type: "currency",
            required: true,
            section: "Financial Terms"
        },
        {
            id: "securityDeposit",
            label: "Security deposit required?",
            type: "radio",
            required: true,
            section: "Deposits and Additional Fees",
            options: ["Yes", "No"]
        },
        {
            id: "securityDepositAmount",
            label: "Security deposit amount",
            type: "currency",
            required: true,
            section: "Deposits and Additional Fees"
        },
        {
            id: "nsfFee",
            label: "NSF check fee amount",
            type: "currency",
            required: true,
            section: "Deposits and Additional Fees"
        },
        {
            id: "utilityResponsibility",
            label: "Utility payment responsibility",
            type: "textarea",
            required: true,
            section: "Utilities and Maintenance",
            helpText: "Specify which utilities are included in rent and which are tenant's responsibility"
        },
        {
            id: "maintenanceResponsibility",
            label: "Maintenance responsibilities",
            type: "textarea",
            required: true,
            section: "Utilities and Maintenance",
            helpText: "Detail maintenance responsibilities for both landlord and tenant"
        },
        {
            id: "optionToPurchase",
            label: "Option to purchase property?",
            type: "radio",
            required: true,
            section: "Lease Terms and Conditions",
            options: ["Yes", "No"]
        },
        {
            id: "purchaseOptionDetails",
            label: "Purchase option details",
            type: "textarea",
            required: false,
            section: "Lease Terms and Conditions",
            helpText: "If yes, specify terms and conditions of the purchase option"
        },
        {
            id: "terminationNotice",
            label: "Required notice for lease termination",
            type: "select",
            required: true,
            section: "Lease Terms and Conditions",
            options: ["30 days", "60 days", "90 days"]
        },
        {
            id: "disputeResolution",
            label: "Dispute resolution method",
            type: "select",
            required: true,
            section: "Additional Terms",
            options: ["Mediation", "Arbitration", "Court proceedings"]
        },
        {
            id: "additionalTerms",
            label: "Additional terms or information",
            type: "textarea",
            required: false,
            section: "Additional Terms",
            helpText: "Any other terms or conditions specific to this mobile home lease"
        }
    ],
    "sublease-agreement": [
        {
            id: "state",
            label: "Select the state where the property is located",
            type: "select",
            required: true,
            section: "Basic Information",
            options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        },
        {
            id: "agreementType",
            label: "Type of lease agreement",
            type: "select",
            required: true,
            section: "Basic Information",
            options: ["Fixed-term lease", "Month-to-month lease"]
        },
        {
            id: "leaseTerm",
            label: "Lease term (if fixed-term)",
            type: "select",
            required: true,
            section: "Basic Information",
            options: ["6 months", "12 months", "18 months", "24 months"]
        },
        {
            id: "leaseStartDate",
            label: "Lease start date",
            type: "date",
            required: true,
            section: "Basic Information"
        },
        {
            id: "propertyAddress",
            label: "Rental property street address",
            type: "text",
            required: true,
            section: "Property Details"
        },
        {
            id: "propertyType",
            label: "Type of rental property",
            type: "select",
            required: true,
            section: "Property Details",
            options: ["Apartment", "House", "Condo", "Townhouse"]
        },
        {
            id: "originalLeaseDetails",
            label: "Original lease details",
            type: "textarea",
            required: true,
            section: "Property Details",
            helpText: "Include original lease start date, end date, and landlord information"
        },
        {
            id: "landlordInfo",
            label: "Original landlord contact information",
            type: "textarea",
            required: true,
            section: "Landlord Information",
            helpText: "Include name, phone, email, and address"
        },
        {
            id: "sublessorInfo",
            label: "Sublessor (original tenant) information",
            type: "textarea",
            required: true,
            section: "Tenant Information",
            helpText: "Include name, phone, email, and current address"
        },
        {
            id: "subtenantName",
            label: "Subtenant name",
            type: "text",
            required: true,
            section: "Tenant Information"
        },
        {
            id: "additionalSubtenants",
            label: "Additional subtenants",
            type: "textarea",
            required: false,
            section: "Tenant Information",
            helpText: "List names of any additional subtenants"
        },
        {
            id: "parkingAccess",
            label: "Parking access included?",
            type: "radio",
            required: true,
            section: "Property Access and Rules",
            options: ["Yes", "No"]
        },
        {
            id: "parkingDetails",
            label: "Parking details",
            type: "textarea",
            required: false,
            section: "Property Access and Rules",
            helpText: "Describe parking arrangements, including number of spaces and location"
        },
        {
            id: "sharedSpaces",
            label: "Shared spaces",
            type: "textarea",
            required: true,
            section: "Property Access and Rules",
            helpText: "List any shared spaces (laundry, storage, etc.) and usage rules"
        },
        {
            id: "noiseRestrictions",
            label: "Noise restrictions",
            type: "textarea",
            required: true,
            section: "Property Access and Rules",
            helpText: "Specify quiet hours and noise level expectations"
        },
        {
            id: "monthlyRent",
            label: "Monthly rent amount",
            type: "currency",
            required: true,
            section: "Financial Terms"
        },
        {
            id: "rentDueDate",
            label: "Rent due date",
            type: "select",
            required: true,
            section: "Financial Terms",
            options: ["1st of the month", "15th of the month", "Last day of the month"]
        },
        {
            id: "lateFee",
            label: "Late payment fee",
            type: "currency",
            required: true,
            section: "Financial Terms"
        },
        {
            id: "securityDeposit",
            label: "Security deposit required?",
            type: "radio",
            required: true,
            section: "Deposits and Additional Fees",
            options: ["Yes", "No"]
        },
        {
            id: "securityDepositAmount",
            label: "Security deposit amount",
            type: "currency",
            required: true,
            section: "Deposits and Additional Fees"
        },
        {
            id: "nsfFee",
            label: "NSF check fee amount",
            type: "currency",
            required: true,
            section: "Deposits and Additional Fees"
        },
        {
            id: "utilityResponsibility",
            label: "Utility payment responsibility",
            type: "textarea",
            required: true,
            section: "Utilities and Maintenance",
            helpText: "Specify which utilities are included in rent and which are tenant's responsibility"
        },
        {
            id: "maintenanceResponsibility",
            label: "Maintenance responsibilities",
            type: "textarea",
            required: true,
            section: "Utilities and Maintenance",
            helpText: "Detail maintenance responsibilities for both landlord and tenant"
        },
        {
            id: "landlordConsent",
            label: "Landlord consent to sublease",
            type: "radio",
            required: true,
            section: "Lease Terms and Conditions",
            options: ["Yes", "No"]
        },
        {
            id: "landlordConsentDetails",
            label: "Landlord consent details",
            type: "textarea",
            required: false,
            section: "Lease Terms and Conditions",
            helpText: "If yes, provide details of landlord's consent to sublease"
        },
        {
            id: "terminationNotice",
            label: "Required notice for lease termination",
            type: "select",
            required: true,
            section: "Lease Terms and Conditions",
            options: ["30 days", "60 days", "90 days"]
        },
        {
            id: "disputeResolution",
            label: "Dispute resolution method",
            type: "select",
            required: true,
            section: "Additional Terms",
            options: ["Mediation", "Arbitration", "Court proceedings"]
        },
        {
            id: "additionalTerms",
            label: "Additional terms or information",
            type: "textarea",
            required: false,
            section: "Additional Terms",
            helpText: "Any other terms or conditions specific to this sublease agreement"
        }
    ]
};
// Business category fields
exports.BUSINESS_TEMPLATE_FIELDS = {
    "llc-formation": [
        {
            id: "companyName",
            label: "Company Name",
            type: "text",
            required: true,
            section: "Basic Information"
        },
        {
            id: "businessPurpose",
            label: "Business Purpose",
            type: "textarea",
            required: true,
            section: "Basic Information"
        },
        {
            id: "registeredAgent",
            label: "Registered Agent Information",
            type: "textarea",
            required: true,
            section: "Company Details"
        },
        {
            id: "memberNames",
            label: "LLC Member Names",
            type: "textarea",
            required: true,
            section: "Company Details"
        },
        {
            id: "managementStructure",
            label: "Management Structure",
            type: "select",
            options: ["Member-Managed", "Manager-Managed"],
            required: true,
            section: "Company Details"
        },
        {
            id: "initialCapital",
            label: "Initial Capital Contribution",
            type: "currency",
            required: true,
            section: "Financial Details"
        },
        {
            id: "profitSharing",
            label: "Profit Sharing Agreement",
            type: "textarea",
            required: true,
            section: "Financial Details"
        },
        {
            id: "taxClassification",
            label: "Tax Classification",
            type: "select",
            options: ["Partnership", "Corporation", "Sole Proprietorship"],
            required: true,
            section: "Tax Information"
        },
        {
            id: "fiscalYear",
            label: "Fiscal Year End",
            type: "select",
            options: ["December 31", "Other"],
            required: true,
            section: "Tax Information"
        }
    ],
    "partnership-agreement": [
        {
            id: "partnershipName",
            label: "Partnership Name",
            type: "text",
            required: true,
            section: "Basic Information"
        },
        {
            id: "partnershipType",
            label: "Partnership Type",
            type: "select",
            options: ["General Partnership", "Limited Partnership", "Limited Liability Partnership"],
            required: true,
            section: "Basic Information"
        },
        {
            id: "partnerNames",
            label: "Partner Names and Information",
            type: "textarea",
            required: true,
            section: "Partner Details"
        },
        {
            id: "capitalContributions",
            label: "Capital Contributions",
            type: "textarea",
            required: true,
            section: "Financial Details"
        },
        {
            id: "profitLossSharing",
            label: "Profit and Loss Sharing",
            type: "textarea",
            required: true,
            section: "Financial Details"
        },
        {
            id: "managementRights",
            label: "Management Rights and Responsibilities",
            type: "textarea",
            required: true,
            section: "Management"
        },
        {
            id: "decisionMaking",
            label: "Decision Making Process",
            type: "textarea",
            required: true,
            section: "Management"
        },
        {
            id: "partnerWithdrawal",
            label: "Partner Withdrawal Terms",
            type: "textarea",
            required: true,
            section: "Exit Provisions"
        },
        {
            id: "disputeResolution",
            label: "Dispute Resolution Process",
            type: "textarea",
            required: true,
            section: "Exit Provisions"
        }
    ]
};
// Intellectual Property category fields
exports.IP_TEMPLATE_FIELDS = {
    "ip-assignment": [
        {
            id: "ipType",
            label: "Type of Intellectual Property",
            type: "select",
            options: ["Patent", "Trademark", "Copyright", "Trade Secret"],
            required: true,
            section: "IP Details"
        },
        {
            id: "ipDescription",
            label: "Description of IP",
            type: "textarea",
            required: true,
            section: "IP Details"
        },
        {
            id: "ipRegistration",
            label: "IP Registration Numbers",
            type: "textarea",
            required: false,
            section: "IP Details"
        },
        {
            id: "assignmentScope",
            label: "Scope of Assignment",
            type: "select",
            options: ["Exclusive", "Non-Exclusive", "Limited"],
            required: true,
            section: "Assignment Terms"
        },
        {
            id: "territory",
            label: "Geographic Territory",
            type: "textarea",
            required: true,
            section: "Assignment Terms"
        },
        {
            id: "duration",
            label: "Assignment Duration",
            type: "select",
            options: ["Perpetual", "Limited Term", "Until Expiration"],
            required: true,
            section: "Assignment Terms"
        },
        {
            id: "consideration",
            label: "Consideration Amount",
            type: "currency",
            required: true,
            section: "Financial Terms"
        },
        {
            id: "paymentTerms",
            label: "Payment Terms",
            type: "textarea",
            required: true,
            section: "Financial Terms"
        },
        {
            id: "warranties",
            label: "IP Warranties",
            type: "textarea",
            required: true,
            section: "Representations"
        }
    ],
    "licensing-agreement": [
        {
            id: "ipType",
            label: "Type of Intellectual Property",
            type: "select",
            options: ["Patent", "Trademark", "Copyright", "Trade Secret"],
            required: true,
            section: "IP Details"
        },
        {
            id: "ipDescription",
            label: "Description of IP",
            type: "textarea",
            required: true,
            section: "IP Details"
        },
        {
            id: "licenseType",
            label: "License Type",
            type: "select",
            options: ["Exclusive", "Non-Exclusive", "Sole"],
            required: true,
            section: "License Terms"
        },
        {
            id: "territory",
            label: "Licensed Territory",
            type: "textarea",
            required: true,
            section: "License Terms"
        },
        {
            id: "duration",
            label: "License Duration",
            type: "select",
            options: ["Perpetual", "Fixed Term", "Until Expiration"],
            required: true,
            section: "License Terms"
        },
        {
            id: "royaltyRate",
            label: "Royalty Rate (%)",
            type: "number",
            required: true,
            section: "Financial Terms"
        },
        {
            id: "minimumRoyalty",
            label: "Minimum Annual Royalty",
            type: "currency",
            required: true,
            section: "Financial Terms"
        },
        {
            id: "reportingRequirements",
            label: "Reporting Requirements",
            type: "textarea",
            required: true,
            section: "Obligations"
        },
        {
            id: "qualityControl",
            label: "Quality Control Standards",
            type: "textarea",
            required: true,
            section: "Obligations"
        }
    ]
};
// Export all template fields
exports.TEMPLATE_FIELDS = __assign(__assign(__assign({}, exports.REAL_ESTATE_TEMPLATE_FIELDS), exports.BUSINESS_TEMPLATE_FIELDS), exports.IP_TEMPLATE_FIELDS);
