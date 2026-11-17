import React, { useMemo, useState } from 'react'
import ControlPanel, { useSearchModel } from '../../components/common/ControlPanel'
import ListView from '../../components/common/ListView'
import { Dropdown, Loading } from '../../components/common/ui'
import Icon from '../../components/common/Icon'
import { useRecords, downloadCsv } from '../../components/common/forms'
import { table } from '../../services/api'
import { TABLES, choiceOrder } from '../../utils/constants'
import { display, value, num } from '../../utils/fields'
import { navigate } from '../../utils/router'
import { useErp } from '../../context'

export const ASSET_FIELDS = 'sys_id,name,asset_number,asset_model,serial,asset_type,category,quantity,remaining,status,assigned_to,location,purchase_date'
const PAGE = 80

const pair = (f) => (r) => [value(r[f]), display(r[f])]
export const ASSET_GROUPS = {
    asset_type: { get: pair('asset_type'), order: choiceOrder('asset_type') },
    category: { get: pair('category'), order: choiceOrder('asset_category') },
    name: { get: (r) => [display(r.name), display(r.name)] },
    status: { get: pair('status'), order: choiceOrder('asset_status') },
    location: { get: pair('location') },
    assigned_to: { get: pair('assigned_to') },
}

const COLUMNS = [
    { key: 'name', label: 'Name', render: (r) => display(r.name) },
    { key: 'asset_number', label: 'Asset Number', render: (r) => display(r.asset_number) },
    { key: 'asset_model', label: 'Asset Model', render: (r) => display(r.asset_model) },
    { key: 'serial', label: 'Serial', render: (r) => display(r.serial) },
    { key: 'category', label: 'Category', render: (r) => display(r.category) },
    { key: 'location', label: 'Asset Location', optional: 'hide', render: (r) => display(r.location) },
    { key: 'quantity', label: 'Quantity', align: 'right', render: (r) => num(r.quantity), sumValue: (r) => num(r.quantity) },
    { key: 'remaining', label: 'Remaining', align: 'right', render: (r) => num(r.remaining), sumValue: (r) => num(r.remaining) },
    { key: 'status', label: 'Asset Status', render: (r) => display(r.status) },
    { key: 'assigned_to', label: 'Assigned To', render: (r) => display(r.assigned_to) },
]

export default function AssetList() {
    const { userId, isManager, notify } = useErp()
    const { records, loading, reload } = useRecords(TABLES.asset, { query: 'ORDERBYasset_number', fields: ASSET_FIELDS })
    const [selection, setSelection] = useState(() => new Set())
    const [page, setPage] = useState(0)

    const model = useSearchModel({
        storageKey: 'assets',
        filters: [
            { id: 'ready', label: 'Ready to Deploy', group: 'status', fn: (r) => value(r.status) === 'ready' },
            { id: 'deployed', label: 'Deployed', group: 'status', fn: (r) => value(r.status) === 'deployed' },
            { id: 'repair', label: 'In Repair', group: 'status', fn: (r) => value(r.status) === 'repair' },
            { id: 'available', label: 'Available', group: 'avail', fn: (r) => num(r.remaining) > 0 },
            { id: 'mine', label: 'Assigned to Me', group: 'mine', fn: (r) => value(r.assigned_to) === userId },
        ],
        groupBys: [
            { field: 'asset_type', label: 'Asset Type' },
            { field: 'category', label: 'Category' },
            { field: 'name', label: 'Asset Name' },
            { field: 'status', label: 'Asset Status' },
            { field: 'location', label: 'Asset Location' },
            { field: 'assigned_to', label: 'Assigned To' },
        ],
        searchFields: [
            { field: 'name', label: 'Name', get: (r) => display(r.name) },
            { field: 'asset_number', label: 'Asset Number', get: (r) => display(r.asset_number) },
            { field: 'serial', label: 'Serial', get: (r) => display(r.serial) },
            { field: 'asset_model', label: 'Asset Model', get: (r) => display(r.asset_model) },
            { field: 'assigned_to', label: 'Assigned To', get: (r) => display(r.assigned_to) },
        ],
        defaults: { groupBy: ['asset_type', 'category', 'name'] },
    })

    const filtered = useMemo(() => records.filter((r) => model.matches(r)), [records, model])
    const grouped = model.state.groupBy.length > 0
    const topGroups = grouped ? new Set(filtered.map((r) => ASSET_GROUPS[model.state.groupBy[0]].get(r)[0])).size : 0
    const shown = grouped ? filtered : filtered.slice(page * PAGE, page * PAGE + PAGE)
    const pager = grouped
        ? { text: topGroups ? `1-${topGroups} / ${topGroups}` : '0 / 0' }
        : {
              text: filtered.length ? `${page * PAGE + 1}-${Math.min(filtered.length, (page + 1) * PAGE)} / ${filtered.length}` : '0 / 0',
              onPrev: page > 0 ? () => setPage(page - 1) : null,
              onNext: (page + 1) * PAGE < filtered.length ? () => setPage(page + 1) : null,
          }

    const selected = records.filter((r) => selection.has(value(r.sys_id)))
    const requestAsset = (rec) => {
        if (num(rec.remaining) <= 0) return notify(`${display(rec.asset_number)} has no remaining quantity.`, 'warning')
        navigate({ app: 'asset', view: 'request', asset: value(rec.sys_id) })
    }
    const removeSelected = async () => {
        try {
            await Promise.all(selected.map((r) => table(TABLES.asset).remove(value(r.sys_id))))
            notify(`${selected.length} record(s) deleted`, 'success')
            setSelection(new Set())
            reload()
        } catch (e) {
            notify(e.message, 'danger')
        }
    }

    return (
        <div className="o-action">
            <ControlPanel
                breadcrumbs={[{ label: 'Assets' }]}
                model={model}
                buttons={
                    selection.size ? (
                        <span className="o-selection-badge">{selection.size} selected</span>
                    ) : isManager ? (
                        <button type="button" className="o-btn o-btn-primary" onClick={() => navigate({ app: 'asset', view: 'asset', id: 'new' })}>
                            CREATE
                        </button>
                    ) : null
                }
                middle={
                    selection.size ? (
                        <Dropdown toggleClass="o-btn-link o-search-options__toggle" toggle={<><Icon name="cog" size={13} /> Action</>}>
                            <button type="button" data-close className="o-dropdown-item" disabled={selection.size !== 1} onClick={() => requestAsset(selected[0])}>
                                Request Asset
                            </button>
                            <button
                                type="button"
                                data-close
                                className="o-dropdown-item"
                                onClick={() =>
                                    downloadCsv(
                                        'assets.csv',
                                        COLUMNS.map((c) => c.label),
                                        selected.map((r) => COLUMNS.map((c) => c.render(r)))
                                    )
                                }
                            >
                                Export
                            </button>
                            {isManager ? (
                                <button type="button" data-close className="o-dropdown-item" onClick={removeSelected}>
                                    Delete
                                </button>
                            ) : null}
                        </Dropdown>
                    ) : null
                }
                onRefresh={reload}
                pager={pager}
            />
            {loading ? (
                <Loading />
            ) : (
                <ListView
                    columns={COLUMNS}
                    records={shown}
                    groupBy={model.state.groupBy}
                    groupDefs={ASSET_GROUPS}
                    selection={selection}
                    onSelectionChange={setSelection}
                    onOpen={(r) => navigate({ app: 'asset', view: 'asset', id: value(r.sys_id) })}
                    rowButton={{ icon: 'upload', label: 'Request this asset', onClick: requestAsset }}
                />
            )}
        </div>
    )
}
