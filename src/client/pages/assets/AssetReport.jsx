import React, { useState } from 'react'
import ControlPanel from '../../components/common/ControlPanel'
import { Loading } from '../../components/common/ui'
import { Pivot, useRecords } from '../../components/common/forms'
import { TABLES, choiceOrder } from '../../utils/constants'
import { display, num, value } from '../../utils/fields'
import { ASSET_FIELDS } from './AssetList'

const ROWS = {
    asset_type: { label: 'Asset Type', get: (r) => [value(r.asset_type), display(r.asset_type)], order: choiceOrder('asset_type') },
    category: { label: 'Category', get: (r) => [value(r.category), display(r.category)], order: choiceOrder('asset_category') },
    location: { label: 'Asset Location', get: (r) => [value(r.location), display(r.location)] },
}
const COL = { get: (r) => [value(r.status), display(r.status)], order: choiceOrder('asset_status') }
const sum = (f) => (recs) => recs.reduce((a, r) => a + num(r[f]), 0)
const MEASURES = [
    { label: 'Quantity', fn: sum('quantity') },
    { label: 'Remaining', fn: sum('remaining') },
    { label: 'Allocated', fn: (recs) => sum('quantity')(recs) - sum('remaining')(recs) },
]

export default function AssetReport() {
    const { records, loading, reload } = useRecords(TABLES.asset, { fields: ASSET_FIELDS })
    const [row, setRow] = useState('asset_type')
    return (
        <div className="o-action">
            <ControlPanel
                breadcrumbs={[{ label: 'Asset Report' }]}
                buttons={
                    <label className="o-report-rowby">
                        Rows:{' '}
                        <select className="o-input" value={row} onChange={(e) => setRow(e.target.value)}>
                            {Object.entries(ROWS).map(([k, d]) => (
                                <option key={k} value={k}>
                                    {d.label}
                                </option>
                            ))}
                        </select>
                    </label>
                }
                onRefresh={reload}
            />
            {loading ? <Loading /> : <Pivot records={records} rowDef={ROWS[row]} colDef={COL} measures={MEASURES} />}
        </div>
    )
}
