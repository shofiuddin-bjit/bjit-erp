import { SCOPE } from '../../config.js'

export { SCOPE }

export const TABLES = {
    asset: `${SCOPE}_asset`,
    assetReq: `${SCOPE}_asset_req`,
    ticket: `${SCOPE}_ticket`,
    location: `${SCOPE}_location`,
    channel: `${SCOPE}_channel`,
    message: `${SCOPE}_message`,
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
