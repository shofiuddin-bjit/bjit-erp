import React, { useCallback, useMemo, useRef, useState } from 'react'
import Icon from './Icon'
import { Dropdown, useClickOutside } from './ui'

const readFavorites = (key) => {
    try {
        return JSON.parse(localStorage.getItem(`bjit_erp_fav_${key}`)) || []
    } catch {
        return []
    }
}

// Odoo-like search model: filters OR'ed inside a group and AND'ed across groups, field terms AND'ed across fields.
export function useSearchModel({ storageKey, filters = [], groupBys = [], searchFields = [], defaults = {} }) {
    const [state, setState] = useState({ filters: defaults.filters || [], groupBy: defaults.groupBy || [], terms: [] })
    const [favorites, setFavorites] = useState(() => readFavorites(storageKey))

    const toggleFilter = (id) =>
        setState((s) => ({ ...s, filters: s.filters.includes(id) ? s.filters.filter((f) => f !== id) : [...s.filters, id] }))
    const toggleGroupBy = (field) =>
        setState((s) => ({ ...s, groupBy: s.groupBy.includes(field) ? s.groupBy.filter((g) => g !== field) : [...s.groupBy, field] }))
    const addTerm = (field, text) => setState((s) => ({ ...s, terms: [...s.terms, { field, text }] }))
    const removeFacet = (facet) =>
        setState((s) => {
            if (facet.kind === 'filter') return { ...s, filters: s.filters.filter((f) => !facet.ids.includes(f)) }
            if (facet.kind === 'groupBy') return { ...s, groupBy: [] }
            return { ...s, terms: s.terms.filter((t) => t.field !== facet.field) }
        })
    const saveFavorite = (name) => {
        const next = [...favorites.filter((f) => f.name !== name), { name, state }]
        setFavorites(next)
        localStorage.setItem(`bjit_erp_fav_${storageKey}`, JSON.stringify(next))
    }
    const deleteFavorite = (name) => {
        const next = favorites.filter((f) => f.name !== name)
        setFavorites(next)
        localStorage.setItem(`bjit_erp_fav_${storageKey}`, JSON.stringify(next))
    }

    const facets = useMemo(() => {
        const out = []
        const groups = {}
        state.filters.forEach((id) => {
            const f = filters.find((x) => x.id === id)
            if (!f) return
            const g = f.group || id
            groups[g] = groups[g] || { kind: 'filter', ids: [], labels: [] }
            groups[g].ids.push(id)
            groups[g].labels.push(f.label)
        })
        Object.entries(groups).forEach(([g, v]) => out.push({ key: `f_${g}`, icon: 'filter', label: v.labels.join(' or '), ...v }))
        if (state.groupBy.length) {
            out.push({ key: 'groupBy', kind: 'groupBy', icon: 'layers', label: state.groupBy.map((g) => groupBys.find((x) => x.field === g)?.label || g).join(' > ') })
        }
        const byField = {}
        state.terms.forEach((t) => (byField[t.field] = [...(byField[t.field] || []), t.text]))
        Object.entries(byField).forEach(([field, texts]) =>
            out.push({ key: `t_${field}`, kind: 'term', field, title: searchFields.find((s) => s.field === field)?.label, label: texts.join(' or ') })
        )
        return out
    }, [state, filters, groupBys, searchFields])

    const matches = useCallback(
        (rec, ctx) => {
            const groups = {}
            state.filters.forEach((id) => {
                const f = filters.find((x) => x.id === id)
                if (f) (groups[f.group || id] = groups[f.group || id] || []).push(f)
            })
            const filterOk = Object.values(groups).every((fs) => fs.some((f) => f.fn(rec, ctx)))
            if (!filterOk) return false
            const byField = {}
            state.terms.forEach((t) => (byField[t.field] = [...(byField[t.field] || []), t.text.toLowerCase()]))
            return Object.entries(byField).every(([field, texts]) => {
                const sf = searchFields.find((s) => s.field === field)
                const hay = (sf?.get(rec) || '').toLowerCase()
                return texts.some((t) => hay.includes(t))
            })
        },
        [state, filters, searchFields]
    )

    return { state, setState, facets, matches, toggleFilter, toggleGroupBy, addTerm, removeFacet, favorites, saveFavorite, deleteFavorite, filters, groupBys, searchFields }
}

function SearchBar({ model }) {
    const [text, setText] = useState('')
    const [active, setActive] = useState(0)
    const inputRef = useRef(null)
    const ref = useClickOutside(() => setText(''))
    const submit = (idx) => {
        const sf = model.searchFields[idx]
        if (sf && text.trim()) model.addTerm(sf.field, text.trim())
        setText('')
        setActive(0)
    }
    return (
        <div className="o-searchview" ref={ref} onClick={() => inputRef.current?.focus()}>
            {model.facets.map((f) => (
                <span key={f.key} className="o-facet">
                    <span className="o-facet__icon">{f.icon ? <Icon name={f.icon} size={12} /> : f.title}</span>
                    <span className="o-facet__values">{f.label}</span>
                    <button type="button" className="o-facet__remove" aria-label={`Remove ${f.label}`} onClick={() => model.removeFacet(f)}>
                        ×
                    </button>
                </span>
            ))}
            <input
                ref={inputRef}
                className="o-searchview__input"
                placeholder="Search..."
                aria-label="Search"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') submit(active)
                    else if (e.key === 'ArrowDown') setActive((a) => Math.min(a + 1, model.searchFields.length - 1))
                    else if (e.key === 'ArrowUp') setActive((a) => Math.max(a - 1, 0))
                    else if (e.key === 'Backspace' && !text && model.facets.length) model.removeFacet(model.facets[model.facets.length - 1])
                }}
            />
            <Icon name="search" size={15} className="o-searchview__icon" />
            {text ? (
                <ul className="o-searchview__autocomplete" role="listbox">
                    {model.searchFields.map((sf, i) => (
                        <li key={sf.field} role="option" aria-selected={i === active} className={i === active ? 'is-active' : ''} onMouseDown={() => submit(i)}>
                            Search <em>{sf.label}</em> for: <strong>{text}</strong>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    )
}

function SearchOptions({ model }) {
    const [favName, setFavName] = useState('')
    let lastGroup = null
    return (
        <div className="o-search-options">
            <Dropdown toggleClass="o-btn-link o-search-options__toggle" toggle={<><Icon name="filter" size={13} /> Filters</>}>
                {model.filters.map((f) => {
                    const sep = lastGroup !== null && f.group !== lastGroup
                    lastGroup = f.group
                    return (
                        <React.Fragment key={f.id}>
                            {sep ? <div className="o-dropdown-divider" /> : null}
                            <button type="button" className={`o-dropdown-item o-checkable ${model.state.filters.includes(f.id) ? 'is-checked' : ''}`} onClick={() => model.toggleFilter(f.id)}>
                                {f.label}
                            </button>
                        </React.Fragment>
                    )
                })}
            </Dropdown>
            <Dropdown toggleClass="o-btn-link o-search-options__toggle" toggle={<><Icon name="layers" size={13} /> Group By</>}>
                {model.groupBys.map((g) => (
                    <button type="button" key={g.field} className={`o-dropdown-item o-checkable ${model.state.groupBy.includes(g.field) ? 'is-checked' : ''}`} onClick={() => model.toggleGroupBy(g.field)}>
                        {g.label}
                    </button>
                ))}
            </Dropdown>
            <Dropdown toggleClass="o-btn-link o-search-options__toggle" toggle={<><Icon name="star" size={13} /> Favorites</>}>
                {(close) => (
                    <>
                        {model.favorites.map((f) => (
                            <div key={f.name} className="o-dropdown-item o-favorite">
                                <button
                                    type="button"
                                    className="o-btn-link"
                                    onClick={() => {
                                        model.setState(f.state)
                                        close()
                                    }}
                                >
                                    {f.name}
                                </button>
                                <button type="button" className="o-btn-link o-favorite__delete" aria-label={`Delete ${f.name}`} onClick={() => model.deleteFavorite(f.name)}>
                                    <Icon name="trash" size={12} />
                                </button>
                            </div>
                        ))}
                        {model.favorites.length ? <div className="o-dropdown-divider" /> : null}
                        <div className="o-dropdown-header">Save current search</div>
                        <form
                            className="o-favorite__form"
                            onSubmit={(e) => {
                                e.preventDefault()
                                if (!favName.trim()) return
                                model.saveFavorite(favName.trim())
                                setFavName('')
                                close()
                            }}
                        >
                            <input className="o-input" placeholder="Name" aria-label="Favorite name" value={favName} onChange={(e) => setFavName(e.target.value)} />
                            <button type="submit" className="o-btn o-btn-primary o-btn-sm">
                                Save
                            </button>
                        </form>
                    </>
                )}
            </Dropdown>
        </div>
    )
}

export default function ControlPanel({ breadcrumbs, model, buttons, middle, pager, onRefresh, views, titleActions, topRight }) {
    const hasBottom = model || buttons || middle || pager || onRefresh || views
    return (
        <div className="o-control-panel">
            <div className="o-cp-top">
                <ol className="o-breadcrumb">
                    {breadcrumbs.map((b, i) => (
                        <li key={i} className={i === breadcrumbs.length - 1 ? 'is-active' : ''}>
                            {b.onClick && i < breadcrumbs.length - 1 ? (
                                <button type="button" className="o-btn-link" onClick={b.onClick}>
                                    {b.label}
                                </button>
                            ) : (
                                b.label
                            )}
                        </li>
                    ))}
                    {titleActions ? <li className="o-breadcrumb__actions">{titleActions}</li> : null}
                </ol>
                {model ? <SearchBar model={model} /> : null}
                {topRight ? <div className="o-cp-top-right">{topRight}</div> : null}
            </div>
            {hasBottom ? (
            <div className="o-cp-bottom">
                <div className="o-cp-buttons">{buttons}</div>
                <div className="o-cp-middle">
                    {middle}
                    {model ? <SearchOptions model={model} /> : null}
                </div>
                <div className="o-cp-right">
                    {onRefresh ? (
                        <button type="button" className="o-btn-link" aria-label="Refresh" onClick={onRefresh}>
                            <Icon name="refresh" size={14} />
                        </button>
                    ) : null}
                    {pager ? (
                        <div className="o-pager">
                            <span className="o-pager__value">{pager.text}</span>
                            <button type="button" className="o-btn-link" aria-label="Previous" disabled={!pager.onPrev} onClick={pager.onPrev}>
                                <Icon name="left" size={14} />
                            </button>
                            <button type="button" className="o-btn-link" aria-label="Next" disabled={!pager.onNext} onClick={pager.onNext}>
                                <Icon name="right" size={14} />
                            </button>
                        </div>
                    ) : null}
                    {views ? (
                        <div className="o-view-switcher" role="group" aria-label="Views">
                            {views.options.map((v) => (
                                <button
                                    type="button"
                                    key={v.id}
                                    className={`o-btn-link ${views.current === v.id ? 'is-active' : ''}`}
                                    aria-label={v.label}
                                    aria-pressed={views.current === v.id}
                                    onClick={() => views.onSwitch(v.id)}
                                >
                                    <Icon name={v.icon} size={16} />
                                </button>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
            ) : null}
        </div>
    )
}
