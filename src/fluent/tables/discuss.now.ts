import '@servicenow/sdk/global'
import {
    Table,
    StringColumn,
    ChoiceColumn,
    ReferenceColumn,
    ListColumn,
    MultiLineTextColumn,
    BooleanColumn,
} from '@servicenow/sdk/core'

export const x_587205_bjit_erp_channel = Table({
    name: 'x_587205_bjit_erp_channel',
    label: 'ERP Discuss Channel',
    display: 'name',
    allowWebServiceAccess: true,
    actions: { read: true },
    schema: {
        name: StringColumn({ label: 'Name', maxLength: 100, mandatory: true }),
        description: StringColumn({ label: 'Description', maxLength: 255 }),
        channel_type: ChoiceColumn({
            label: 'Type',
            dropdown: 'dropdown_without_none',
            default: 'channel',
            choices: {
                channel: { label: 'Channel', sequence: 0 },
                chat: { label: 'Direct Message', sequence: 1 },
            },
        }),
        is_public: BooleanColumn({ label: 'Public', default: true }),
        members: ListColumn({ label: 'Members', referenceTable: 'sys_user' }),
    },
})

// Holds channel posts and record chatter (Odoo mail.message equivalent).
export const x_587205_bjit_erp_message = Table({
    name: 'x_587205_bjit_erp_message',
    label: 'ERP Message',
    allowWebServiceAccess: true,
    actions: { read: true },
    schema: {
        body: MultiLineTextColumn({ label: 'Body', maxLength: 8000 }),
        author: ReferenceColumn({ label: 'Author', referenceTable: 'sys_user', default: 'javascript:gs.getUserID()' }),
        message_type: ChoiceColumn({
            label: 'Type',
            dropdown: 'dropdown_without_none',
            default: 'comment',
            choices: {
                comment: { label: 'Message', sequence: 0 },
                note: { label: 'Log note', sequence: 1 },
                notification: { label: 'Notification', sequence: 2 },
            },
        }),
        channel: ReferenceColumn({ label: 'Channel', referenceTable: 'x_587205_bjit_erp_channel' }),
        model: StringColumn({ label: 'Related Table', maxLength: 80 }),
        res_id: StringColumn({ label: 'Related Record', maxLength: 32 }),
        record_name: StringColumn({ label: 'Record Name', maxLength: 160 }),
        needaction: ListColumn({ label: 'Inbox Recipients', referenceTable: 'sys_user' }),
        starred_by: ListColumn({ label: 'Starred By', referenceTable: 'sys_user' }),
        history_users: ListColumn({ label: 'Read By', referenceTable: 'sys_user' }),
    },
})
