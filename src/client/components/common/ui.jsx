import React, { useEffect, useRef, useState } from 'react'

const COLORS = ['#a24689', '#3a6ea5', '#2a9d8f', '#e76f51', '#7b5ea7', '#c0392b', '#16a085', '#d35400']

export function Avatar({ name = '', size = 26, status }) {
    const letter = (name.trim()[0] || '?').toUpperCase()
    let h = 0
    for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0
    return (
        <span className="o-avatar" style={{ width: size, height: size, fontSize: size * 0.5, background: COLORS[h % COLORS.length] }} aria-hidden="true">
            {letter}
            {status ? <span className={`o-avatar__status o-avatar__status--${status}`} /> : null}
        </span>
    )
}

export function useClickOutside(onOutside) {
    const ref = useRef(null)
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) onOutside()
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [onOutside])
    return ref
}

export function Dropdown({ toggle, children, align = 'left', className = '', toggleClass = 'o-btn-link', label }) {
    const [open, setOpen] = useState(false)
    const ref = useClickOutside(() => setOpen(false))
    return (
        <div className={`o-dropdown ${className}`} ref={ref}>
            <button type="button" className={toggleClass} aria-haspopup="true" aria-expanded={open} aria-label={label} onClick={() => setOpen((o) => !o)}>
                {toggle}
            </button>
            {open ? (
                <div className={`o-dropdown-menu o-dropdown-menu--${align}`} role="menu" onClick={(e) => e.target.closest('[data-close]') && setOpen(false)}>
                    {typeof children === 'function' ? children(() => setOpen(false)) : children}
                </div>
            ) : null}
        </div>
    )
}

export function Dialog({ title, children, onClose, footer }) {
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose()
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])
    return (
        <div className="o-dialog-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
            <div className="o-dialog" role="dialog" aria-modal="true" aria-label={title}>
                <header className="o-dialog__header">
                    <h4>{title}</h4>
                    <button type="button" className="o-btn-link" aria-label="Close" onClick={onClose}>
                        ×
                    </button>
                </header>
                <div className="o-dialog__body">{children}</div>
                <footer className="o-dialog__footer">{footer}</footer>
            </div>
        </div>
    )
}

export function Loading() {
    return <div className="o-loading">Loading...</div>
}
