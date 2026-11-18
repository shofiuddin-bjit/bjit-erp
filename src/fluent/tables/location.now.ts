import '@servicenow/sdk/global'
import { Table, StringColumn, ChoiceColumn, BooleanColumn } from '@servicenow/sdk/core'

export const BRANCH_CHOICES = {
    office_1: { label: 'OFFICE-1 (HEAD OFFICE)', sequence: 0 },
    office_2: { label: 'OFFICE-2 (BARIDHARA CEO Office)', sequence: 1 },
    office_3: { label: 'OFFICE-3 (CHATTOGRAM)', sequence: 2 },
}

export const x_2315548_bjit_erp_location = Table({
    name: 'x_2315548_bjit_erp_location',
    label: 'ERP Location',
    display: 'name',
    allowWebServiceAccess: true,
    actions: { read: true },
    schema: {
        name: StringColumn({ label: 'Location', maxLength: 160, mandatory: true }),
        branch: ChoiceColumn({ label: 'Branch', choices: BRANCH_CHOICES, dropdown: 'dropdown_with_none' }),
        is_store: BooleanColumn({ label: 'Asset Store', default: false }),
        active: BooleanColumn({ label: 'Active', default: true }),
    },
})
