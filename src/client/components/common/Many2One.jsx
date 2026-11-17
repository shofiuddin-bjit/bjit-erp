import React, { useEffect, useRef, useState } from 'react'
import { table } from '../../services/api'
import { display, value as val } from '../../utils/fields'
import { useClickOutside } from './ui'
import Icon from './Icon'

// Odoo many2one: type to search, pick from dropdown.
export default function Many2One({ id, tableName, value, onChange, searchFields = ['name'], fields, query = '', label, required, invalid, format }) {
    const [text, setText] = useState(display(value))
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const timer = useRef(null)
    const ref = useClickOutside(() => {
        setOpen(false)
        setText(display(value))
    })
    const toLabel = (rec) => (format ? format(rec) : display(rec[searchFields[0]]))

    useEffect(() => setText(display(value)), [value])

    const search = (term) => {
        clearTimeout(timer.current)
        timer.current = setTimeout(async () => {
            setLoading(true)
            try {
                const like = term ? searchFields.map((f) => `${f}LIKE${term}`).join('^OR') : ''
                const q = [query, like].filter(Boolean).join('^')
                const recs = await table(tableName).list({ query: `${q}^ORDERBY${searchFields[0]}`, fields: fields || ['sys_id', ...searchFields].join(','), limit: 8 })
                setItems(recs)
            } catch {
                setItems([])
            } finally {
                setLoading(false)
            }
        }, 200)
    }

    const pick = (rec) => {
        onChange({ value: val(rec.sys_id), display_value: toLabel(rec) }, rec)
        setText(toLabel(rec))
        setOpen(false)
    }

    return (
        <div className={`o-many2one ${invalid ? 'o-field-invalid' : ''}`} ref={ref}>
            <input
                id={id}
                className="o-input"
                value={text}
                aria-label={label}
                aria-required={required}
                autoComplete="off"
                onFocus={() => {
                    setOpen(true)
                    search('')
                }}
                onChange={(e) => {
                    setText(e.target.value)
                    setOpen(true)
                    search(e.target.value)
                    if (!e.target.value) onChange({ value: '', display_value: '' }, null)
                }}
            />
            <Icon name="caretDown" size={12} className="o-many2one__caret" />
            {open ? (
                <ul className="o-autocomplete" role="listbox">
                    {loading ? <li className="o-autocomplete__muted">Searching...</li> : null}
                    {!loading && items.length === 0 ? <li className="o-autocomplete__muted">No records found</li> : null}
                    {items.map((rec) => (
                        <li key={val(rec.sys_id)} role="option" aria-selected={val(rec.sys_id) === val(value)} onMouseDown={() => pick(rec)}>
                            {toLabel(rec)}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    )
}
