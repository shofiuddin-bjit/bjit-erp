import { useEffect, useState } from 'react'

const EVENT = 'erp:navigate'

export const readRoute = () => Object.fromEntries(new URLSearchParams(window.location.search))

export function navigate(params, { replace = false } = {}) {
    const sp = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') sp.set(k, v)
    })
    const url = `${window.location.pathname}?${sp.toString()}`
    window.history[replace ? 'replaceState' : 'pushState'](null, '', url)
    window.dispatchEvent(new Event(EVENT))
}

export function useRoute() {
    const [route, setRoute] = useState(readRoute)
    useEffect(() => {
        const handler = () => setRoute(readRoute())
        window.addEventListener('popstate', handler)
        window.addEventListener(EVENT, handler)
        return () => {
            window.removeEventListener('popstate', handler)
            window.removeEventListener(EVENT, handler)
        }
    }, [])
    return route
}
