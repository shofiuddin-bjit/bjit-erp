import '@servicenow/sdk/global'
import { Table, StringColumn, ChoiceColumn, ReferenceColumn, DateColumn, MultiLineTextColumn } from '@servicenow/sdk/core'
import { BRANCH_CHOICES } from './location.now'

export const x_2315548_bjit_erp_ticket = Table({
    name: 'x_2315548_bjit_erp_ticket',
    label: 'ERP Support Ticket',
    display: 'title',
    allowWebServiceAccess: true,
    actions: { read: true },
    autoNumber: { prefix: 'SUPP', number: 1000, numberOfDigits: 4 },
    schema: {
        number: StringColumn({ label: 'Support No.', maxLength: 40, readOnly: true, default: 'javascript:global.getNextObjNumberPadded();' }),
        title: StringColumn({ label: 'Title', maxLength: 160, mandatory: true }),
        requester: ReferenceColumn({
            label: 'Requester',
            referenceTable: 'sys_user',
            mandatory: true,
            default: 'javascript:gs.getUserID()',
        }),
        request_date: DateColumn({ label: 'Request date', default: 'javascript:new GlideDate().getValue()' }),
        category: ChoiceColumn({
            label: 'Category',
            mandatory: true,
            dropdown: 'dropdown_with_none',
            choices: {
                accessory: { label: 'Accessory Requisition', sequence: 0 },
                hardware: { label: 'Hardware Support', sequence: 1 },
                software: { label: 'Software Installation', sequence: 2 },
                network: { label: 'Network & Internet', sequence: 3 },
                access: { label: 'Access & Account', sequence: 4 },
                email: { label: 'Email & Communication', sequence: 5 },
                other: { label: 'Other', sequence: 6 },
            },
        }),
        support_type: ChoiceColumn({
            label: 'Support Type',
            mandatory: true,
            dropdown: 'dropdown_with_none',
            choices: {
                new_requisition: { label: 'New Requisition', sequence: 0 },
                replacement: { label: 'Replacement', sequence: 1 },
                repair: { label: 'Repair', sequence: 2 },
                installation: { label: 'Installation', sequence: 3 },
                configuration: { label: 'Configuration', sequence: 4 },
                troubleshooting: { label: 'Troubleshooting', sequence: 5 },
            },
        }),
        branch: ChoiceColumn({ label: 'Branch', mandatory: true, dropdown: 'dropdown_with_none', choices: BRANCH_CHOICES }),
        support_location: ReferenceColumn({
            label: 'Support Location',
            referenceTable: 'x_2315548_bjit_erp_location',
            mandatory: true,
        }),
        priority: ChoiceColumn({
            label: 'Priority',
            dropdown: 'dropdown_without_none',
            default: 'normal',
            choices: {
                low: { label: 'Low', sequence: 0 },
                normal: { label: 'Normal', sequence: 1 },
                high: { label: 'High', sequence: 2 },
                urgent: { label: 'Urgent', sequence: 3 },
            },
        }),
        description: MultiLineTextColumn({ label: 'Description', maxLength: 4000 }),
        approval_manager_1: ReferenceColumn({ label: 'Approval Manager Level-1', referenceTable: 'sys_user', readOnly: true }),
        approval_manager_2: ReferenceColumn({ label: 'Approval Manager Level-2', referenceTable: 'sys_user', readOnly: true }),
        approval_manager_3: ReferenceColumn({ label: 'Approval Manager Level-3', referenceTable: 'sys_user', readOnly: true }),
        reject_reason: MultiLineTextColumn({ label: 'Reject Reason', maxLength: 2000 }),
        pending_reason: MultiLineTextColumn({ label: 'Pending Reason', maxLength: 2000 }),
        state: ChoiceColumn({
            label: 'Status',
            dropdown: 'dropdown_without_none',
            default: 'draft',
            choices: {
                draft: { label: 'Draft', sequence: 0 },
                confirmed: { label: 'Confirmed', sequence: 1 },
                in_progress: { label: 'In Progress', sequence: 2 },
                completed: { label: 'Completed', sequence: 3 },
                closed: { label: 'Closed', sequence: 4 },
                rejected: { label: 'Rejected', sequence: 5 },
            },
        }),
    },
})
