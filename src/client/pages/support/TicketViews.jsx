import React, { useMemo } from 'react'
import ControlPanel, { useSearchModel } from '../../components/common/ControlPanel'
import ListView, { groupRecords } from '../../components/common/ListView'
import { Loading } from '../../components/common/ui'
import { Pivot, useRecords } from '../../components/common/forms'
import { TABLES, choiceOrder } from '../../utils/constants'
import { display, formatDate, userLabel, value } from '../../utils/fields'
import { navigate } from '../../utils/router'
import { useErp } from '../../context'

const FIELDS = 'sys_id,number,title,requester,requester.name,requester.employee_number,category,support_type,branch,support_location,priority,request_date,state,approval_manager_1,approval_manager_2,approval_manager_3'
const pair = (f) => (r) => [value(r[f]), display(r[f])]
const GROUPS = {
    state: { get: pair('state'), order: choiceOrder('ticket_state') },
    category: { get: pair('category'), order: choiceOrder('ticket_category') },
    support_type: { get: pair('support_type'), order: choiceOrder('support_type') },
    priority: { get: pair('priority'), order: choiceOrder('priority') },
    branch: { get: pair('branch'), order: choiceOrder('branch') },
    requester: { get: pair('requester') },
}
const COLUMNS = [
    { key: 'number', label: 'Support No.', render: (r) => display(r.number) },
    { key: 'title', label: 'Title', render: (r) => display(r.title) },
    { key: 'requester', label: 'Requester', render: (r) => userLabel(r, 'requester.') },
    { key: 'category', label: 'Category', render: (r) => display(r.category) },
    { key: 'support_type', label: 'Support Type', render: (r) => display(r.support_type) },
    { key: 'support_location', label: 'Support Location', optional: 'show', render: (r) => display(r.support_location) },
    { key: 'priority', label: 'Priority', render: (r) => display(r.priority) },
    { key: 'request_date', label: 'Request date', render: (r) => formatDate(r.request_date) },
    { key: 'state', label: 'Status', render: (r) => <span className={`o-state-badge o-state-badge--${value(r.state)}`}>{display(r.state)}</span> },
]
const VIEWS = [
    { id: 'kanban', icon: 'kanban', label: 'Kanban' },
    { id: 'list', icon: 'list', label: 'List' },
    { id: 'pivot', icon: 'pivot', label: 'Pivot' },
]
const open = (r) => navigate({ app: 'support', view: 'form', id: value(r.sys_id) })

function Kanban({ records, groupBy }) {
    const groups = groupRecords(records, [groupBy[0] || 'state'], GROUPS) || []
    if (!records.length)
        return (
            <div className="o-nocontent">
                <p className="o-nocontent__title">Create a new support ticket</p>
                <p>Raise IT support requests such as accessory requisitions, hardware or software issues.</p>
            </div>
        )
    return (
        <div className="o-kanban">
            {groups.map((g) => (
                <div key={g.id} className="o-kanban-group">
                    <h3 className="o-kanban-group__title">{g.label}</h3>
                    <div className="o-kanban-group__cards">
                        {g.records.map((r) => (
                            <button type="button" key={value(r.sys_id)} className={`o-kanban-card o-priority--${value(r.priority)}`} onClick={() => open(r)}>
                                <strong>{display(r.title)}</strong>
                                <span>{userLabel(r, 'requester.')}</span>
                                <span>{display(r.category)}</span>
                                <span>{display(r.support_location)}</span>
                                <small>
                                    {formatDate(r.request_date)} &nbsp;{display(r.number)}
                                </small>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function TicketViews({ route }) {
    const { userId } = useErp()
    const view = ['kanban', 'list', 'pivot'].includes(route.view) ? route.view : 'kanban'
    const { records, loading, reload } = useRecords(TABLES.ticket, { query: 'ORDERBYDESCrequest_date^ORDERBYDESCnumber', fields: FIELDS })
    const isApprover = (r) => [r.approval_manager_1, r.approval_manager_2, r.approval_manager_3].some((m) => value(m) === userId)
    const model = useSearchModel({
        storageKey: 'tickets',
        filters: [
            { id: 'me', label: 'Me', group: 'who', fn: (r) => value(r.requester) === userId },
            { id: 'approver', label: 'My Approvals', group: 'who', fn: isApprover },
            { id: 'to_process', label: 'To Process', group: 'state', fn: (r) => ['confirmed', 'in_progress', 'completed'].includes(value(r.state)) },
            { id: 'draft', label: 'Draft', group: 'state', fn: (r) => value(r.state) === 'draft' },
            { id: 'in_progress', label: 'In Progress', group: 'state', fn: (r) => value(r.state) === 'in_progress' },
            { id: 'closed', label: 'Closed', group: 'state', fn: (r) => value(r.state) === 'closed' },
            { id: 'urgent', label: 'High Priority', group: 'prio', fn: (r) => ['high', 'urgent'].includes(value(r.priority)) },
        ],
        groupBys: [
            { field: 'state', label: 'Status' },
            { field: 'category', label: 'Category' },
            { field: 'support_type', label: 'Support Type' },
            { field: 'priority', label: 'Priority' },
            { field: 'branch', label: 'Branch' },
            { field: 'requester', label: 'Requester' },
        ],
        searchFields: [
            { field: 'title', label: 'Title', get: (r) => display(r.title) },
            { field: 'number', label: 'Support No.', get: (r) => display(r.number) },
            { field: 'requester', label: 'Requester', get: (r) => userLabel(r, 'requester.') },
            { field: 'category', label: 'Category', get: (r) => display(r.category) },
            { field: 'support_location', label: 'Support Location', get: (r) => display(r.support_location) },
        ],
        defaults: { filters: [route.filter || 'me'] },
    })
    const filtered = useMemo(() => records.filter((r) => model.matches(r)), [records, model])

    return (
        <div className="o-action">
            <ControlPanel
                breadcrumbs={[{ label: 'Tickets' }]}
                model={model}
                buttons={
                    <button type="button" className="o-btn o-btn-primary" onClick={() => navigate({ app: 'support', view: 'form' })}>
                        NEW
                    </button>
                }
                pager={view === 'list' ? { text: filtered.length ? `1-${filtered.length} / ${filtered.length}` : '0 / 0' } : null}
                onRefresh={view === 'list' ? reload : null}
                views={{ current: view, options: VIEWS, onSwitch: (v) => navigate({ app: 'support', view: v }) }}
            />
            {loading ? <Loading /> : null}
            {!loading && view === 'kanban' ? <Kanban records={filtered} groupBy={model.state.groupBy} /> : null}
            {!loading && view === 'list' ? <ListView columns={COLUMNS} records={filtered} groupBy={model.state.groupBy} groupDefs={GROUPS} onOpen={open} /> : null}
            {!loading && view === 'pivot' ? (
                <Pivot
                    records={filtered}
                    rowDef={GROUPS[model.state.groupBy[0] || 'category']}
                    colDef={GROUPS.state}
                    measures={[{ label: 'Count', fn: (recs) => recs.length }]}
                />
            ) : null}
        </div>
    )
}
