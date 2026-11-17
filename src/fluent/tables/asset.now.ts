import '@servicenow/sdk/global'
import {
    Table,
    StringColumn,
    ChoiceColumn,
    IntegerColumn,
    ReferenceColumn,
    DateColumn,
    MultiLineTextColumn,
} from '@servicenow/sdk/core'

export const x_2182542_bjit_erp_asset = Table({
    name: 'x_2182542_bjit_erp_asset',
    label: 'ERP Asset',
    display: 'asset_number',
    allowWebServiceAccess: true,
    actions: { read: true },
    schema: {
        name: StringColumn({ label: 'Name', maxLength: 100, mandatory: true }),
        asset_number: StringColumn({ label: 'Asset Number', maxLength: 60, mandatory: true }),
        asset_model: StringColumn({ label: 'Asset Model', maxLength: 100 }),
        serial: StringColumn({ label: 'Serial', maxLength: 100 }),
        asset_type: ChoiceColumn({
            label: 'Asset Type',
            mandatory: true,
            dropdown: 'dropdown_without_none',
            default: 'fixed_asset',
            choices: {
                accessories: { label: 'Accessories', sequence: 0 },
                fixed_asset: { label: 'Fixed Asset', sequence: 1 },
                components: { label: 'Components', sequence: 2 },
                license: { label: 'License', sequence: 3 },
            },
        }),
        category: ChoiceColumn({
            label: 'Category',
            dropdown: 'dropdown_with_none',
            choices: {
                computer_laptop: { label: 'Computer & Laptop', sequence: 0 },
                peripherals: { label: 'Peripherals', sequence: 1 },
                audio: { label: 'Audio & Headset', sequence: 2 },
                power: { label: 'Power & UPS', sequence: 3 },
                network: { label: 'Network', sequence: 4 },
                memory_storage: { label: 'Memory & Storage', sequence: 5 },
                software: { label: 'Software', sequence: 6 },
                furniture: { label: 'Furniture', sequence: 7 },
            },
        }),
        quantity: IntegerColumn({ label: 'Quantity', default: '1' }),
        remaining: IntegerColumn({ label: 'Remaining', default: '1' }),
        status: ChoiceColumn({
            label: 'Asset Status',
            dropdown: 'dropdown_without_none',
            default: 'ready',
            choices: {
                ready: { label: 'Ready to Deploy', sequence: 0 },
                deployed: { label: 'Deployed', sequence: 1 },
                pending: { label: 'Pending', sequence: 2 },
                repair: { label: 'In Repair', sequence: 3 },
                archived: { label: 'Archived', sequence: 4 },
            },
        }),
        assigned_to: ReferenceColumn({ label: 'Assigned To', referenceTable: 'sys_user' }),
        location: ReferenceColumn({ label: 'Asset Location', referenceTable: 'x_2182542_bjit_erp_location' }),
        purchase_date: DateColumn({ label: 'Purchase Date' }),
        notes: MultiLineTextColumn({ label: 'Notes', maxLength: 4000 }),
    },
})
