import '@servicenow/sdk/global'
import { Acl, Role } from '@servicenow/sdk/core'

export const erpUser = Role({
    name: 'x_2182542_bjit_erp.user',
    description: 'BJIT ERP employee: can use Discuss, request assets and raise support tickets',
})

export const erpManager = Role({
    name: 'x_2182542_bjit_erp.manager',
    description: 'BJIT ERP manager: can approve asset requests, process tickets and manage master data',
    containsRoles: [erpUser],
})

// Assets and locations are master data maintained by managers; everything else is writable by employees.

Acl({
    $id: Now.ID['erp_location_read_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_location',
    operation: 'read',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_location_create_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_location',
    operation: 'create',
    roles: [erpManager],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_location_write_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_location',
    operation: 'write',
    roles: [erpManager],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_location_delete_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_location',
    operation: 'delete',
    roles: [erpManager],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_asset_read_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_asset',
    operation: 'read',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_asset_create_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_asset',
    operation: 'create',
    roles: [erpManager],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_asset_write_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_asset',
    operation: 'write',
    roles: [erpManager],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_asset_delete_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_asset',
    operation: 'delete',
    roles: [erpManager],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_asset_req_read_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_asset_req',
    operation: 'read',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_asset_req_create_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_asset_req',
    operation: 'create',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_asset_req_write_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_asset_req',
    operation: 'write',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_asset_req_delete_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_asset_req',
    operation: 'delete',
    roles: [erpManager],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_ticket_read_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_ticket',
    operation: 'read',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_ticket_create_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_ticket',
    operation: 'create',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_ticket_write_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_ticket',
    operation: 'write',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_ticket_delete_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_ticket',
    operation: 'delete',
    roles: [erpManager],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_channel_read_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_channel',
    operation: 'read',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_channel_create_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_channel',
    operation: 'create',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_channel_write_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_channel',
    operation: 'write',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_channel_delete_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_channel',
    operation: 'delete',
    roles: [erpManager],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_message_read_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_message',
    operation: 'read',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_message_create_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_message',
    operation: 'create',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_message_write_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_message',
    operation: 'write',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['erp_message_delete_acl'],
    type: 'record',
    table: 'x_2182542_bjit_erp_message',
    operation: 'delete',
    roles: [erpManager],
    adminOverrides: true,
})
