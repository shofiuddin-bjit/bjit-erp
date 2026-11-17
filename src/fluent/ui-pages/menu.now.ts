import '@servicenow/sdk/global'
import { ApplicationMenu, Record } from '@servicenow/sdk/core'
import { erpUser } from '../security/roles-acls.now'

const menu = ApplicationMenu({
    $id: Now.ID['bjit_erp_menu'],
    title: 'BJIT ERP',
    hint: 'BJIT ERP - Discuss, Asset Management and Support',
    roles: [erpUser],
})

Record({
    $id: Now.ID['bjit_erp_module_open'],
    table: 'sys_app_module',
    data: {
        title: 'Open BJIT ERP',
        application: menu,
        link_type: 'DIRECT',
        query: 'x_2182542_bjit_erp_app.do',
        roles: ['x_2182542_bjit_erp.user'],
        active: true,
        order: 100,
    },
})
