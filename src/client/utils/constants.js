export const SCOPE = 'x_2315548_bjit_erp'

// Instance role sys_ids for reliable client-side authorization checks.
export const ROLE_IDS = {
    admin: '2831a114c611228501d4ea6c309d626d',
    employee: 'aa16fb7281d142458da438666d23922f',
    hr: 'bfd3e4cdc29a41d189b65fb7343d7d41',
    manager: '06885cb436e64ebf9ff30b788eaf746d',
}

export const TABLES = {
    asset: `${SCOPE}_asset`,
    assetReq: `${SCOPE}_asset_req`,
    ticket: `${SCOPE}_ticket`,
    location: `${SCOPE}_location`,
    channel: `${SCOPE}_channel`,
    message: `${SCOPE}_message`,
    employee: `${SCOPE}_employee`,
    employeePrivate: `${SCOPE}_employee_private`,
    employeeItem: `${SCOPE}_employee_item`,
}

// Mirrors the ChoiceColumn definitions in src/fluent/tables (order = sequence)
export const CHOICES = {
    asset_type: [
        ['accessories', 'Accessories'],
        ['fixed_asset', 'Fixed Asset'],
        ['components', 'Components'],
        ['license', 'License'],
    ],
    asset_category: [
        ['computer_laptop', 'Computer & Laptop'],
        ['peripherals', 'Peripherals'],
        ['audio', 'Audio & Headset'],
        ['power', 'Power & UPS'],
        ['network', 'Network'],
        ['memory_storage', 'Memory & Storage'],
        ['software', 'Software'],
        ['furniture', 'Furniture'],
    ],
    asset_status: [
        ['ready', 'Ready to Deploy'],
        ['deployed', 'Deployed'],
        ['pending', 'Pending'],
        ['repair', 'In Repair'],
        ['archived', 'Archived'],
    ],
    request_state: [
        ['draft', 'Draft'],
        ['submitted', 'Submitted'],
        ['first_approved', '1st Manager Approved'],
        ['second_approved', '2nd Manager Approved'],
        ['approved', 'Approved'],
        ['allocated', 'Allocated'],
        ['rejected', 'Rejected'],
        ['cancelled', 'Cancelled'],
    ],
    ticket_state: [
        ['draft', 'Draft'],
        ['confirmed', 'Confirmed'],
        ['in_progress', 'In Progress'],
        ['completed', 'Completed'],
        ['closed', 'Closed'],
        ['rejected', 'Rejected'],
    ],
    ticket_category: [
        ['accessory', 'Accessory Requisition'],
        ['hardware', 'Hardware Support'],
        ['software', 'Software Installation'],
        ['network', 'Network & Internet'],
        ['access', 'Access & Account'],
        ['email', 'Email & Communication'],
        ['other', 'Other'],
    ],
    support_type: [
        ['new_requisition', 'New Requisition'],
        ['replacement', 'Replacement'],
        ['repair', 'Repair'],
        ['installation', 'Installation'],
        ['configuration', 'Configuration'],
        ['troubleshooting', 'Troubleshooting'],
    ],
    branch: [
        ['office_1', 'OFFICE-1 (HEAD OFFICE)'],
        ['office_2', 'OFFICE-2 (BARIDHARA CEO Office)'],
        ['office_3', 'OFFICE-3 (CHATTOGRAM)'],
    ],
    priority: [
        ['low', 'Low'],
        ['normal', 'Normal'],
        ['high', 'High'],
        ['urgent', 'Urgent'],
    ],
}

export const choiceOrder = (key) => CHOICES[key].map(([v]) => v)
export const choiceLabel = (key, v) => CHOICES[key].find(([c]) => c === v)?.[1] || v
