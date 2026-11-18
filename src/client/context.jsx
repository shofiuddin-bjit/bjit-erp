import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const ErpContext = createContext(null)
export const useErp = () => useContext(ErpContext)

export function ErpProvider({ auth, onLogout, children }) {
    const [toasts, setToasts] = useState([])
    const [inboxCount, setInboxCount] = useState(0)
    const idRef = useRef(0)

    const notify = useCallback((message, type = 'info') => {
        const id = ++idRef.current
        setToasts((t) => [...t, { id, message, type }])
        setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), type === 'danger' ? 7000 : 4000)
    }, [])

    const value = useMemo(
        () => ({
            user: auth.user,
            userId: auth.user.sys_id.value,
            // null = role could not be read; the UI then shows manager actions and the server enforces them
            isManager: auth.isManager !== false,
            isHr: auth.isHr === true,
            isEmployee: auth.isEmployee === true,
            logout: onLogout,
            notify,
            inboxCount,
            setInboxCount,
        }),
        [auth, onLogout, notify, inboxCount]
    )

    return (
        <ErpContext.Provider value={value}>
            {children}
            <div className="o-notifications" aria-live="polite">
                {toasts.map((t) => (
                    <div key={t.id} className={`o-notification o-notification--${t.type}`} role="status">
                        {t.message}
                    </div>
                ))}
            </div>
        </ErpContext.Provider>
    )
}
