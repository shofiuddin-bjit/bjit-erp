import React, { useCallback, useEffect, useState } from 'react'
import { table } from '../../services/api'
import { CHOICES } from '../../utils/constants'
import { useErp } from '../../context'

export function useRecords(tableName, { query = '', fields, limit = 2000 } = {}) {
    const { notify } = useErp()
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(true)
    const reload = useCallback(async () => {
        setLoading(true)
        try {
            setRecords(await table(tableName).list({ query, fields, limit }))
        } catch (e) {
            notify(e.message, 'danger')
        } finally {
            setLoading(false)
        }
    }, [tableName, query, fields, limit, notify])
    useEffect(() => {
        reload()
    }, [reload])
    return { records, loading, reload }
}

export function Field({ label, htmlFor, required, children, strong }) {
    return (
        <div className="o-field-row">
            <label className={`o-form-label ${required || strong ? 'o-form-label--strong' : ''}`} htmlFor={htmlFor}>
                {label}
            </label>
            <div className="o-field-value">{children}</div>
        </div>
    )
}

export function ChoiceSelect({ id, choiceKey, value, onChange, required, invalid, allowEmpty = true }) {
    return (
        <select id={id} className={`o-input ${invalid ? 'o-field-invalid' : ''}`} value={value || ''} aria-required={required} onChange={(e) => onChange(e.target.value)}>
            {allowEmpty ? <option value="" /> : null}
            {CHOICES[choiceKey].map(([v, l]) => (
                <option key={v} value={v}>
                    {l}
                </option>
            ))}
        </select>
    )
}

export function TextInput({ id, value, onChange, invalid, required, type = 'text' }) {
    return <input id={id} type={type} className={`o-input ${invalid ? 'o-field-invalid' : ''}`} aria-required={required} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
}

export function TextArea({ id, value, onChange, rows = 2, invalid }) {
    return <textarea id={id} className={`o-input o-textarea ${invalid ? 'o-field-invalid' : ''}`} rows={rows} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
}

export function Pivot({ records, rowDef, colDef, measures, rowTitle = 'Total' }) {
    const rowKeys = new Map()
    const colKeys = new Map()
    const cells = new Map()
    records.forEach((r) => {
        const [rk, rl] = rowDef.get(r)
        const [ck, cl] = colDef.get(r)
        rowKeys.set(rk, rl || 'None')
        colKeys.set(ck, cl || 'None')
        const k = `${rk}|${ck}`
        cells.set(k, [...(cells.get(k) || []), r])
    })
    const order = (def, map) => [...map.keys()].sort((a, b) => (def.order?.indexOf(a) ?? 0) - (def.order?.indexOf(b) ?? 0) || String(map.get(a)).localeCompare(String(map.get(b))))
    const rows = order(rowDef, rowKeys)
    const cols = order(colDef, colKeys)
    const agg = (recs) => measures.map((m) => m.fn(recs))
    const pick = (rk, ck) => records.filter((r) => (rk === null || rowDef.get(r)[0] === rk) && (ck === null || colDef.get(r)[0] === ck))

    return (
        <div className="o-pivot">
            <table className="o-pivot-table">
                <thead>
                    <tr>
                        <th rowSpan={2} />
                        {cols.map((c) => (
                            <th key={c} colSpan={measures.length} className="o-pivot-col">
                                {colKeys.get(c)}
                            </th>
                        ))}
                        <th colSpan={measures.length} className="o-pivot-col">
                            Total
                        </th>
                    </tr>
                    <tr>
                        {[...cols, '__t'].map((c) => measures.map((m) => <th key={`${c}${m.label}`} className="o-pivot-measure">{m.label}</th>))}
                    </tr>
                </thead>
                <tbody>
                    <tr className="o-pivot-total-row">
                        <th>{rowTitle}</th>
                        {[...cols, null].map((c) => agg(pick(null, c)).map((v, i) => <td key={`${c}${i}`}>{v}</td>))}
                    </tr>
                    {rows.map((r) => (
                        <tr key={r}>
                            <th className="o-pivot-row">{rowKeys.get(r)}</th>
                            {[...cols, null].map((c) => agg(pick(r, c)).map((v, i) => <td key={`${c}${i}`}>{v || ''}</td>))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export function downloadCsv(filename, header, rows) {
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const csv = [header, ...rows].map((r) => r.map(esc).join(',')).join('\r\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
}
