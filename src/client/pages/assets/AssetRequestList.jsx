import React, { useMemo } from 'react'
import ControlPanel, { useSearchModel } from '../../components/common/ControlPanel'
import ListView from '../../components/common/ListView'
import { Loading } from '../../components/common/ui'
import { useRecords } from '../../components/common/forms'
import { TABLES, choiceOrder } from '../../utils/constants'
import { display, formatDate, value } from '../../utils/fields'
import { navigate } from '../../utils/router'
import { useErp } from '../../context'

const FIELDS = 'sys_id,number,asset,asset.name,asset.asset_model,employee,request_date,state'
const pair = (f) => (r) => [value(r[f]), display(r[f])]
const GROUPS = {
    state: { get: pair('state'), order: choiceOrder('request_state') },
    employee: { get: pair('employee') },
    asset_name: { get: (r) => [display(r['asset.name']), display(r['asset.name'])] },
}
const COLUMNS = [
    { key: 'number', label: 'Number', render: (r) => display(r.number) },
    { key: 'asset', label: 'Asset Number', render: (r) => display(r.asset) },
    { key: 'asset_name', label: 'Asset', render: (r) => display(r['asset.name']) },
    { key: 'asset_model', label: 'Asset Model', render: (r) => display(r['asset.asset_model']) },
    { key: 'employee', label: 'Employee', render: (r) => display(r.employee) },
    { key: 'request_date', label: 'Request Date', render: (r) => formatDate(r.request_date) },
    { key: 'state', label: 'Status', render: (r) => <span className={`o-state-badge o-state-badge--${value(r.state)}`}>{display(r.state)}</span> },
]
const PENDING = ['submitted', 'first_approved', 'second_approved', 'approved']

export default function AssetRequestList({ route }) {
    const { userId } = useErp()
    const { records, loading, reload } = useRecords(TABLES.assetReq, { query: 'ORDERBYDESCsys_created_on', fields: FIELDS })
    const model = useSearchModel({
        storageKey: 'asset_requests',
        filters: [
            { id: 'mine', label: 'My Requests', group: 'who', fn: (r) => value(r.employee) === userId },
            { id: 'to_approve', label: 'To Approve', group: 'state', fn: (r) => PENDING.includes(value(r.state)) },
            { id: 'draft', label: 'Draft', group: 'state', fn: (r) => value(r.state) === 'draft' },
            { id: 'allocated', label: 'Allocated', group: 'state', fn: (r) => value(r.state) === 'allocated' },
            { id: 'rejected', label: 'Rejected', group: 'state', fn: (r) => value(r.state) === 'rejected' },
        ],
        groupBys: [
            { field: 'state', label: 'Status' },
            { field: 'employee', label: 'Employee' },
            { field: 'asset_name', label: 'Asset' },
        ],
        searchFields: [
            { field: 'number', label: 'Number', get: (r) => display(r.number) },
            { field: 'asset', label: 'Asset', get: (r) => `${display(r.asset)} ${display(r['asset.name'])}` },
            { field: 'employee', label: 'Employee', get: (r) => display(r.employee) },
        ],
        defaults: { filters: [route.filter || 'mine'] },
    })
    const filtered = useMemo(() => records.filter((r) => model.matches(r)), [records, model])

    return (
        <div className="o-action">
            <ControlPanel
                breadcrumbs={[{ label: 'Asset Requests' }]}
                model={model}
                buttons={
                    <button type="button" className="o-btn o-btn-primary" onClick={() => navigate({ app: 'asset', view: 'request', from: 'requests' })}>
                        NEW
                    </button>
                }
                onRefresh={reload}
                pager={{ text: filtered.length ? `1-${filtered.length} / ${filtered.length}` : '0 / 0' }}
            />
            {loading ? (
                <Loading />
            ) : (
                <ListView
                    columns={COLUMNS}
                    records={filtered}
                    groupBy={model.state.groupBy}
                    groupDefs={GROUPS}
                    onOpen={(r) => navigate({ app: 'asset', view: 'request', id: value(r.sys_id), from: 'requests' })}
                />
            )}
        </div>
    )
}
