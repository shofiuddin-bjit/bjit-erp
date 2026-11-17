import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import erpPage from '../../client/index.html'

UiPage({
    $id: Now.ID['bjit-erp-page'],
    endpoint: 'x_2182542_bjit_erp_app.do',
    description: 'BJIT ERP - Discuss, Asset Management and Support',
    category: 'general',
    html: erpPage,
    direct: true,
})
