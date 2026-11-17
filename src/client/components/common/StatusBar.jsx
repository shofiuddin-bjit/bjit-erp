import React from 'react'

// Odoo statusbar: arrow-shaped steps; states outside the main flow are only shown when current.
export default function StatusBar({ buttons, states, current, extraStates = [] }) {
    const shown = [...states, ...extraStates.filter(([v]) => v === current)]
    return (
        <div className="o-form-statusbar">
            <div className="o-statusbar-buttons">{buttons}</div>
            <ol className="o-statusbar-status" aria-label="Status">
                {shown.map(([v, label]) => (
                    <li key={v} className={v === current ? 'is-current' : ''} aria-current={v === current ? 'step' : undefined}>
                        {label.toUpperCase()}
                    </li>
                ))}
            </ol>
        </div>
    )
}
