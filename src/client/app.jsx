import React, { useCallback, useEffect, useState } from 'react'
import { ErpProvider } from './context'
import { APPS, IMPLEMENTED_APPS, appById } from './apps'
import { clearAuth, detectSessionUser, getAuth, refreshAuthorization } from './services/auth'
import { navigate, useRoute } from './utils/router'
import TopBar from './components/layout/TopBar'
import { AppsMenu, Sidebar } from './components/layout/Sidebar'
import { Loading } from './components/common/ui'
import Login from './pages/Login'
import Placeholder from './pages/Placeholder'
import Discuss from './pages/discuss/Discuss'
import AssetList from './pages/assets/AssetList'
import AssetRequestForm from './pages/assets/AssetRequestForm'
import AssetRequestList from './pages/assets/AssetRequestList'
import AssetForm from './pages/assets/AssetForm'
import AssetReport from './pages/assets/AssetReport'
import TicketViews from './pages/support/TicketViews'
import TicketForm from './pages/support/TicketForm'
import EmployeeManagement from './pages/employees/EmployeeManagement'
import './app.css'

const MENUS = {
    asset: [
        {
            label: 'Operation',
            items: [
                { label: 'Assets', onClick: () => navigate({ app: 'asset' }) },
                { label: 'Asset Requests', onClick: () => navigate({ app: 'asset', view: 'requests' }) },
            ],
        },
        { label: 'Report', items: [{ label: 'Asset Report', onClick: () => navigate({ app: 'asset', view: 'report' }) }] },
    ],
    support: [{ label: 'Tickets', onClick: () => navigate({ app: 'support' }) }],
    employees: [
        { label: 'Employees', onClick: () => navigate({ app: 'employees' }) },
        { label: 'Skill Review', onClick: () => navigate({ app: 'employees', view: 'skill_review' }) },
        { label: 'Card Request', onClick: () => navigate({ app: 'employees', view: 'card_request' }) },
    ],
}

function Content({ route, app }) {
    const key = [route.view, route.id, route.asset, route.copy, route.n, route.filter].join('|')
    if (!IMPLEMENTED_APPS.has(app.id)) return <Placeholder app={app} />
    if (app.id === 'discuss') return <Discuss route={route} />
    if (app.id === 'employees') return <EmployeeManagement route={route} />
    if (app.id === 'asset') {
        if (route.view === 'request') return <AssetRequestForm key={key} route={route} />
        if (route.view === 'requests') return <AssetRequestList key={key} route={route} />
        if (route.view === 'asset') return <AssetForm key={key} route={route} />
        if (route.view === 'report') return <AssetReport />
        return <AssetList />
    }
    if (route.view === 'form') return <TicketForm key={key} route={route} />
    return <TicketViews key={route.filter || 'tickets'} route={route} />
}

function Shell() {
    const route = useRoute()
    const app = APPS.some((a) => a.id === route.app) ? appById(route.app) : appById('discuss')
    const [appsOpen, setAppsOpen] = useState(false)

    useEffect(() => {
        document.title = `${app.label} - BJIT ERP`
        setAppsOpen(false)
    }, [app, route])

    return (
        <div className="o-web-client">
            <TopBar app={app} menus={MENUS[app.id]} onToggleApps={() => setAppsOpen((o) => !o)} />
            <div className="o-main">
                <Sidebar activeApp={app.id} />
                <main className="o-content">{appsOpen ? <AppsMenu onClose={() => setAppsOpen(false)} /> : <Content route={route} app={app} />}</main>
            </div>
        </div>
    )
}

export default function App() {
    const [auth, setAuth] = useState(getAuth)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const existing = getAuth()
        const roleRefresh = existing?.basic ? refreshAuthorization(existing).then(setAuth).catch(() => {}) : Promise.resolve()
        Promise.all([detectSessionUser(), roleRefresh]).finally(() => setReady(true))
    }, [])

    const logout = useCallback(() => {
        clearAuth()
        setAuth(null)
        navigate({}, { replace: true })
    }, [])

    useEffect(() => {
        window.addEventListener('erp:unauthorized', logout)
        return () => window.removeEventListener('erp:unauthorized', logout)
    }, [logout])

    if (!ready) return <Loading />
    if (!auth) return <Login onLogin={setAuth} />
    return (
        <ErpProvider auth={auth} onLogout={logout}>
            <Shell />
        </ErpProvider>
    )
}
