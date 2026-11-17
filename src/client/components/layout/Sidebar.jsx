import React from 'react'
import Icon from '../common/Icon'
import { APPS } from '../../apps'
import { navigate } from '../../utils/router'

export function AppIcon({ app, size = 22 }) {
    return (
        <span className="o-app-icon" style={{ width: size, height: size, background: app.color }} aria-hidden="true">
            <Icon name={app.icon} size={size * 0.68} strokeWidth={2.2} />
        </span>
    )
}

export function Sidebar({ activeApp }) {
    return (
        <aside className="o-sidebar" aria-label="Applications">
            <ul>
                {APPS.map((app) => (
                    <li key={app.id}>
                        <button
                            type="button"
                            className={`o-sidebar__item ${app.id === activeApp ? 'is-active' : ''}`}
                            title={app.label}
                            aria-current={app.id === activeApp ? 'page' : undefined}
                            onClick={() => navigate({ app: app.id })}
                        >
                            <AppIcon app={app} />
                            <span className="o-sidebar__label">{app.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export function AppsMenu({ onClose }) {
    return (
        <div className="o-home-menu" role="dialog" aria-label="Home menu">
            <div className="o-home-menu__grid">
                {APPS.map((app) => (
                    <button
                        type="button"
                        key={app.id}
                        className="o-home-menu__app"
                        onClick={() => {
                            onClose()
                            navigate({ app: app.id })
                        }}
                    >
                        <AppIcon app={app} size={64} />
                        <span>{app.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
