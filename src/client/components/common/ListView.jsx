import React, { useMemo, useState } from 'react'
import Icon from './Icon'
import { Dropdown } from './ui'
import { value } from '../../utils/fields'

// Builds nested Odoo-style groups. groupDefs[field] = { get(rec) => [key, label], order?: string[] }
export function groupRecords(records, groupBy, groupDefs, path = '') {
    if (!groupBy.length) return null
    const [field, ...rest] = groupBy
    const def = groupDefs[field]
    const map = new Map()
    records.forEach((rec) => {
        const [key, label] = def.get(rec)
        if (!map.has(key)) map.set(key, { key, label: label || 'None', records: [] })
        map.get(key).records.push(rec)
    })
    const rank = (k) => {
        const i = def.order ? def.order.indexOf(k) : -1
        return i === -1 ? 999 : i
    }
    return [...map.values()]
        .sort((a, b) => rank(a.key) - rank(b.key) || String(a.label).localeCompare(String(b.label)))
        .map((g) => {
            const id = `${path}/${field}:${g.key}`
            return { ...g, id, children: groupRecords(g.records, rest, groupDefs, id) }
        })
}

const sumOf = (records, col) => records.reduce((acc, r) => acc + (col.sumValue ? col.sumValue(r) : 0), 0)

export default function ListView({ columns, records, groupBy = [], groupDefs = {}, selection, onSelectionChange, onOpen, rowButton, emptyText = 'No records found' }) {
    const [expanded, setExpanded] = useState(() => new Set())
    const [hidden, setHidden] = useState(() => new Set(columns.filter((c) => c.optional === 'hide').map((c) => c.key)))
    const cols = columns.filter((c) => !hidden.has(c.key))
    const groups = useMemo(() => groupRecords(records, groupBy, groupDefs), [records, groupBy, groupDefs])
    const selectable = !!onSelectionChange
    const optionalCols = columns.filter((c) => c.optional)
    const totalCols = cols.length + (selectable ? 1 : 0) + 1

    const toggleGroup = (id) =>
        setExpanded((s) => {
            const n = new Set(s)
            n.has(id) ? n.delete(id) : n.add(id)
            return n
        })
    const toggleRow = (id) => {
        const n = new Set(selection)
        n.has(id) ? n.delete(id) : n.add(id)
        onSelectionChange(n)
    }
    const visibleIds = () => {
        if (!groups) return records.map((r) => value(r.sys_id))
        const ids = []
        const walk = (gs) => gs.forEach((g) => expanded.has(g.id) && (g.children ? walk(g.children) : g.records.forEach((r) => ids.push(value(r.sys_id)))))
        walk(groups)
        return ids
    }
    const allIds = visibleIds()
    const allSelected = selectable && allIds.length > 0 && allIds.every((id) => selection.has(id))
    const footerRecords = selection && selection.size ? records.filter((r) => selection.has(value(r.sys_id))) : records
    const hasSums = cols.some((c) => c.sumValue)

    const renderRow = (rec, depth) => {
        const id = value(rec.sys_id)
        const selected = selection?.has(id)
        return (
            <tr key={id} className={`o-data-row ${selected ? 'is-selected' : ''}`} onClick={() => onOpen?.(rec)}>
                {selectable ? (
                    <td className="o-list-record-selector" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" aria-label="Select record" checked={!!selected} onChange={() => toggleRow(id)} />
                    </td>
                ) : null}
                {cols.map((c) => (
                    <td key={c.key} className={c.align === 'right' ? 'o-num' : ''}>
                        {c.render(rec)}
                    </td>
                ))}
                <td className="o-list-row-button">
                    {rowButton ? (
                        <button
                            type="button"
                            className="o-btn o-btn-primary o-btn-xs"
                            title={rowButton.label}
                            aria-label={rowButton.label}
                            onClick={(e) => {
                                e.stopPropagation()
                                rowButton.onClick(rec)
                            }}
                        >
                            <Icon name={rowButton.icon} size={14} />
                        </button>
                    ) : null}
                </td>
            </tr>
        )
    }

    const renderGroups = (gs, depth) =>
        gs.map((g) => {
            const open = expanded.has(g.id)
            const firstSum = cols.findIndex((c) => c.sumValue)
            const nameSpan = (selectable ? 1 : 0) + (firstSum === -1 ? cols.length : firstSum)
            return (
                <React.Fragment key={g.id}>
                    <tr className="o-group-header" onClick={() => toggleGroup(g.id)} aria-expanded={open}>
                        <th colSpan={nameSpan} className="o-group-name" style={{ paddingLeft: 20 + depth * 18 }}>
                            <Icon name={open ? 'caretDown' : 'caretRight'} size={11} strokeWidth={3} /> {g.label} ({g.records.length})
                        </th>
                        {firstSum === -1
                            ? null
                            : cols.slice(firstSum).map((c) => (
                                  <td key={c.key} className="o-num">
                                      {c.sumValue ? sumOf(g.records, c) : ''}
                                  </td>
                              ))}
                        <td />
                    </tr>
                    {open ? (g.children ? renderGroups(g.children, depth + 1) : g.records.map((r) => renderRow(r, depth + 1))) : null}
                </React.Fragment>
            )
        })

    return (
        <div className="o-list-view">
            <table className="o-list-table">
                <thead>
                    <tr>
                        {selectable ? (
                            <th className="o-list-record-selector">
                                <input
                                    type="checkbox"
                                    aria-label="Select all"
                                    checked={allSelected}
                                    onChange={() => onSelectionChange(allSelected ? new Set() : new Set(allIds))}
                                />
                            </th>
                        ) : null}
                        {cols.map((c) => (
                            <th key={c.key} className={c.align === 'right' ? 'o-num' : ''} style={c.width ? { width: c.width } : undefined} title={c.label}>
                                {c.label}
                            </th>
                        ))}
                        <th className="o-list-optional">
                            {optionalCols.length ? (
                                <Dropdown align="right" label="Optional columns" toggleClass="o-btn-link" toggle={<Icon name="sliders" size={14} />}>
                                    {optionalCols.map((c) => (
                                        <label key={c.key} className="o-dropdown-item o-optional-col">
                                            <input
                                                type="checkbox"
                                                checked={!hidden.has(c.key)}
                                                onChange={() =>
                                                    setHidden((s) => {
                                                        const n = new Set(s)
                                                        n.has(c.key) ? n.delete(c.key) : n.add(c.key)
                                                        return n
                                                    })
                                                }
                                            />{' '}
                                            {c.label}
                                        </label>
                                    ))}
                                </Dropdown>
                            ) : null}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {groups ? renderGroups(groups, 0) : records.map((r) => renderRow(r, 0))}
                    {records.length === 0 ? (
                        <tr>
                            <td colSpan={totalCols} className="o-list-empty">
                                {emptyText}
                            </td>
                        </tr>
                    ) : null}
                </tbody>
                {hasSums ? (
                    <tfoot>
                        <tr>
                            {selectable ? <td /> : null}
                            {cols.map((c) => (
                                <td key={c.key} className="o-num">
                                    {c.sumValue ? sumOf(footerRecords, c) : ''}
                                </td>
                            ))}
                            <td />
                        </tr>
                    </tfoot>
                ) : null}
            </table>
        </div>
    )
}
