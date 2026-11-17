import React, { useCallback, useEffect, useState } from 'react'
import Icon from '../common/Icon'
import { Avatar, Dropdown } from '../common/ui'
import { useErp } from '../../context'
import { navigate } from '../../utils/router'
import { table } from '../../services/api'
import { TABLES } from '../../utils/constants'
import { display, value } from '../../utils/fields'

const LANGS = ['English (US)', 'বাংলা', '日本語']

function MessagingMenu() {
    const { userId, inboxCount, setInboxCount } = useErp()
    const [items, setItems] = useState([])

    const refresh = useCallback(async () => {
        try {
            const recs = await table(TABLES.message).list({
                query: `needactionLIKE${userId}^ORDERBYDESCsys_created_on`,
                fields: 'sys_id,body,record_name,author,sys_created_on,model,res_id',
                limit: 50,
            })
            setItems(recs)
            setInboxCount(recs.length)
        } catch {
            /* the badge is best effort */
        }
    }, [userId, setInboxCount])

    useEffect(() => {
        refresh()
        const t = setInterval(refresh, 60000)
        window.addEventListener('erp:inbox-changed', refresh)
        return () => {
            clearInterval(t)
            window.removeEventListener('erp:inbox-changed', refresh)
        }
    }, [refresh])

    return (
        <Dropdown
            align="right"
            label="Conversations"
            toggleClass="o-navbar__icon"
            toggle={
                <>
                    <Icon name="chat" size={18} />
                    {inboxCount ? <span className="o-badge">{inboxCount}</span> : null}
                </>
            }
        >
            <div className="o-mail-preview-list">
                {items.length === 0 ? <div className="o-mail-preview o-mail-preview--empty">No new messages</div> : null}
                {items.slice(0, 6).map((m) => (
                    <button type="button" data-close key={value(m.sys_id)} className="o-mail-preview" onClick={() => navigate({ app: 'discuss', box: 'inbox' })}>
                        <Avatar name={display(m.author) || 'System'} size={32} />
                        <span>
                            <strong>{display(m.record_name) || 'Notification'}</strong>
                            <small>{display(m.body)}</small>
                        </span>
                    </button>
                ))}
                <button type="button" data-close className="o-mail-preview o-mail-preview--all" onClick={() => navigate({ app: 'discuss', box: 'inbox' })}>
                    Open Discuss
                </button>
            </div>
        </Dropdown>
    )
}

function ActivityMenu() {
    const { userId, isManager } = useErp()
    const [groups, setGroups] = useState([])

    const load = async () => {
        const defs = [
            { label: 'My Asset Requests (Draft)', t: TABLES.assetReq, q: `employee=${userId}^state=draft`, route: { app: 'asset', view: 'requests', filter: 'mine' } },
            { label: 'My Tickets (Draft)', t: TABLES.ticket, q: `requester=${userId}^state=draft`, route: { app: 'support', view: 'kanban' } },
        ]
        if (isManager) {
            defs.push(
                { label: 'Asset Requests to Approve', t: TABLES.assetReq, q: 'stateINsubmitted,first_approved,second_approved,approved', route: { app: 'asset', view: 'requests', filter: 'to_approve' } },
                { label: 'Tickets to Process', t: TABLES.ticket, q: 'stateINconfirmed,in_progress,completed', route: { app: 'support', view: 'list', filter: 'to_process' } }
            )
        }
        const res = await Promise.all(defs.map((d) => table(d.t).list({ query: d.q, fields: 'sys_id', limit: 200 }).then((r) => ({ ...d, count: r.length })).catch(() => ({ ...d, count: 0 }))))
        setGroups(res.filter((g) => g.count > 0))
    }

    return (
        <Dropdown align="right" label="Activities" toggleClass="o-navbar__icon" toggle={<span onMouseDown={load}><Icon name="clock" size={18} /></span>}>
            <div className="o-mail-preview-list">
                {groups.length === 0 ? <div className="o-mail-preview o-mail-preview--empty">No activities</div> : null}
                {groups.map((g) => (
                    <button type="button" data-close key={g.label} className="o-mail-preview" onClick={() => navigate(g.route)}>
                        <span>
                            <strong>{g.label}</strong>
                        </span>
                        <span className="o-activity-count">{g.count}</span>
                    </button>
                ))}
            </div>
        </Dropdown>
    )
}

export default function TopBar({ app, menus = [], onToggleApps }) {
    const { user, logout } = useErp()
    const [lang, setLang] = useState(localStorage.getItem('bjit_erp_lang') || '')
    const name = display(user.name).toUpperCase()

    return (
        <header className="o-navbar">
            <button type="button" className="o-navbar__apps" aria-label="Home menu" onClick={onToggleApps}>
                <Icon name="grid" size={18} strokeWidth={0} className="o-icon--fill" />
            </button>
            <span className="o-navbar__brand">{app.label}</span>
            <nav className="o-navbar__menus" aria-label={`${app.label} menu`}>
                {menus.map((m) =>
                    m.items ? (
                        <Dropdown key={m.label} toggleClass="o-navbar__menu" toggle={m.label}>
                            {m.items.map((it) => (
                                <button type="button" data-close key={it.label} className="o-dropdown-item" onClick={it.onClick}>
                                    {it.label}
                                </button>
                            ))}
                        </Dropdown>
                    ) : (
                        <button type="button" key={m.label} className="o-navbar__menu" onClick={m.onClick}>
                            {m.label}
                        </button>
                    )
                )}
            </nav>
            <div className="o-navbar__systray">
                <Dropdown align="right" toggleClass="o-navbar__menu" label="Select Language" toggle={<>{lang || 'Select Language'} <Icon name="caretDown" size={10} /></>}>
                    {LANGS.map((l) => (
                        <button
                            type="button"
                            data-close
                            key={l}
                            className={`o-dropdown-item ${l === lang ? 'is-active' : ''}`}
                            onClick={() => {
                                setLang(l)
                                localStorage.setItem('bjit_erp_lang', l)
                            }}
                        >
                            {l}
                        </button>
                    ))}
                </Dropdown>
                <MessagingMenu />
                <ActivityMenu />
                <Dropdown align="right" toggleClass="o-navbar__menu o-navbar__user" label="User menu" toggle={<><Avatar name={name} size={24} /> {name}</>}>
                    <div className="o-dropdown-header">{display(user.email)}</div>
                    <button type="button" data-close className="o-dropdown-item" onClick={() => navigate({ app: 'employees' })}>
                        My Profile
                    </button>
                    <div className="o-dropdown-divider" />
                    <button type="button" data-close className="o-dropdown-item" onClick={logout}>
                        <Icon name="logout" size={14} /> Log out
                    </button>
                </Dropdown>
            </div>
        </header>
    )
}
