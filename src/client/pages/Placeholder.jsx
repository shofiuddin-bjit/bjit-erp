import React from 'react'
import { AppIcon } from '../components/layout/Sidebar'

export default function Placeholder({ app }) {
    return (
        <div className="o-action">
            <div className="o-control-panel">
                <div className="o-cp-top">
                    <ol className="o-breadcrumb">
                        <li className="is-active">{app.label}</li>
                    </ol>
                </div>
            </div>
            <div className="o-nocontent">
                <AppIcon app={app} size={72} />
                <p className="o-nocontent__title">{app.label} is not available yet</p>
                <p>This module is part of the BJIT ERP roadmap. Discuss, Support and Asset Management are available now.</p>
            </div>
        </div>
    )
}
