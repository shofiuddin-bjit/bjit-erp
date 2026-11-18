import '@servicenow/sdk/global'
import { Acl, Role } from '@servicenow/sdk/core'

export const erpUser = Role({
    name: 'x_587205_bjit_erp.user',
    description: 'BJIT ERP employee: can use Discuss, request assets and raise support tickets',
})

export const erpEmployee = Role({
    name: 'x_587205_bjit_erp.employee',
    description: 'BJIT ERP employee: can sign in, use the app, view the directory and their own full profile',
    containsRoles: [erpUser, 'snc_basic_auth_api_access'],
})

export const erpManager = Role({
    name: 'x_587205_bjit_erp.manager',
    description: 'BJIT ERP manager: can approve asset requests, process tickets and manage master data',
    containsRoles: [erpEmployee],
})

export const erpHr = Role({
    name: 'x_587205_bjit_erp.hr',
    description: 'BJIT ERP HR: can create and manage employee profiles and private details',
    containsRoles: [erpEmployee],
})

// The client checks assigned Employee/HR roles after Basic authentication.
// Let app users read only their own role rows so this check works without exposing other users' assignments.
Acl({
    $id: Now.ID['x_587205_bjit_erp_employee_self_role_read'],
    type: 'record',
    table: 'sys_user_has_role',
    operation: 'read',
    roles: [erpEmployee, erpHr],
    script: `return current.getValue('user') == gs.getUserID();`,
    adminOverrides: true,
    description: 'Allow BJIT ERP users to inspect only their own role assignments for application access checks',
})

// Assets and locations are master data maintained by managers; everything else is writable by employees.

Acl({
    $id: Now.ID['x_587205_bjit_erp_location_read'],
    type: 'record',
    table: 'x_587205_bjit_erp_location',
    operation: 'read',
    roles: [erpUser],
    adminOverrides: true,
})

// Employee-role users can fully manage the directory and all related employee details.
Acl({
    $id: Now.ID['x_587205_bjit_erp_employee_read'],
    type: 'record',
    table: 'x_587205_bjit_erp_employee',
    operation: 'read',
    roles: [erpEmployee],
    adminOverrides: true,
})
Acl({
    $id: Now.ID['x_587205_bjit_erp_employee_create'],
    type: 'record',
    table: 'x_587205_bjit_erp_employee',
    operation: 'create',
    roles: [erpEmployee],
    adminOverrides: true,
})
Acl({
    $id: Now.ID['x_587205_bjit_erp_employee_write'],
    type: 'record',
    table: 'x_587205_bjit_erp_employee',
    operation: 'write',
    roles: [erpEmployee],
    adminOverrides: true,
})
Acl({
    $id: Now.ID['x_587205_bjit_erp_employee_delete'],
    type: 'record',
    table: 'x_587205_bjit_erp_employee',
    operation: 'delete',
    roles: [erpEmployee],
    adminOverrides: true,
})

// Employee-role users can read and manage all private and HR details.
Acl({
    $id: Now.ID['x_587205_bjit_erp_employee_private_read'],
    type: 'record',
    table: 'x_587205_bjit_erp_employee_private',
    operation: 'read',
    roles: [erpEmployee],
    adminOverrides: true,
})
Acl({
    $id: Now.ID['x_587205_bjit_erp_employee_private_create'],
    type: 'record',
    table: 'x_587205_bjit_erp_employee_private',
    operation: 'create',
    roles: [erpEmployee],
    adminOverrides: true,
})
Acl({
    $id: Now.ID['x_587205_bjit_erp_employee_private_write'],
    type: 'record',
    table: 'x_587205_bjit_erp_employee_private',
    operation: 'write',
    roles: [erpEmployee],
    adminOverrides: true,
})
Acl({
    $id: Now.ID['x_587205_bjit_erp_employee_private_delete'],
    type: 'record',
    table: 'x_587205_bjit_erp_employee_private',
    operation: 'delete',
    roles: [erpEmployee],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_employee_item_read'],
    type: 'record',
    table: 'x_587205_bjit_erp_employee_item',
    operation: 'read',
    roles: [erpEmployee],
    adminOverrides: true,
})
Acl({
    $id: Now.ID['x_587205_bjit_erp_employee_item_create'],
    type: 'record',
    table: 'x_587205_bjit_erp_employee_item',
    operation: 'create',
    roles: [erpEmployee],
    adminOverrides: true,
})
Acl({
    $id: Now.ID['x_587205_bjit_erp_employee_item_write'],
    type: 'record',
    table: 'x_587205_bjit_erp_employee_item',
    operation: 'write',
    roles: [erpEmployee],
    adminOverrides: true,
})
Acl({
    $id: Now.ID['x_587205_bjit_erp_employee_item_delete'],
    type: 'record',
    table: 'x_587205_bjit_erp_employee_item',
    operation: 'delete',
    roles: [erpEmployee],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_location_create'],
    type: 'record',
    table: 'x_587205_bjit_erp_location',
    operation: 'create',
    roles: [erpManager],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_location_write'],
    type: 'record',
    table: 'x_587205_bjit_erp_location',
    operation: 'write',
    roles: [erpManager],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_location_delete'],
    type: 'record',
    table: 'x_587205_bjit_erp_location',
    operation: 'delete',
    roles: [erpManager],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_asset_read'],
    type: 'record',
    table: 'x_587205_bjit_erp_asset',
    operation: 'read',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_asset_create'],
    type: 'record',
    table: 'x_587205_bjit_erp_asset',
    operation: 'create',
    roles: [erpManager],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_asset_write'],
    type: 'record',
    table: 'x_587205_bjit_erp_asset',
    operation: 'write',
    roles: [erpManager],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_asset_delete'],
    type: 'record',
    table: 'x_587205_bjit_erp_asset',
    operation: 'delete',
    roles: [erpManager],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_asset_req_read'],
    type: 'record',
    table: 'x_587205_bjit_erp_asset_req',
    operation: 'read',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_asset_req_create'],
    type: 'record',
    table: 'x_587205_bjit_erp_asset_req',
    operation: 'create',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_asset_req_write'],
    type: 'record',
    table: 'x_587205_bjit_erp_asset_req',
    operation: 'write',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_asset_req_delete'],
    type: 'record',
    table: 'x_587205_bjit_erp_asset_req',
    operation: 'delete',
    roles: [erpManager],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_ticket_read'],
    type: 'record',
    table: 'x_587205_bjit_erp_ticket',
    operation: 'read',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_ticket_create'],
    type: 'record',
    table: 'x_587205_bjit_erp_ticket',
    operation: 'create',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_ticket_write'],
    type: 'record',
    table: 'x_587205_bjit_erp_ticket',
    operation: 'write',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_ticket_delete'],
    type: 'record',
    table: 'x_587205_bjit_erp_ticket',
    operation: 'delete',
    roles: [erpManager],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_channel_read'],
    type: 'record',
    table: 'x_587205_bjit_erp_channel',
    operation: 'read',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_channel_create'],
    type: 'record',
    table: 'x_587205_bjit_erp_channel',
    operation: 'create',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_channel_write'],
    type: 'record',
    table: 'x_587205_bjit_erp_channel',
    operation: 'write',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_channel_delete'],
    type: 'record',
    table: 'x_587205_bjit_erp_channel',
    operation: 'delete',
    roles: [erpManager],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_message_read'],
    type: 'record',
    table: 'x_587205_bjit_erp_message',
    operation: 'read',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_message_create'],
    type: 'record',
    table: 'x_587205_bjit_erp_message',
    operation: 'create',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_message_write'],
    type: 'record',
    table: 'x_587205_bjit_erp_message',
    operation: 'write',
    roles: [erpUser],
    adminOverrides: true,
})

Acl({
    $id: Now.ID['x_587205_bjit_erp_message_delete'],
    type: 'record',
    table: 'x_587205_bjit_erp_message',
    operation: 'delete',
    roles: [erpManager],
    adminOverrides: true,
})
