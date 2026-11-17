import React, { useCallback, useEffect, useState } from 'react'
import ControlPanel from '../../components/common/ControlPanel'
import StatusBar from '../../components/common/StatusBar'
import Chatter from '../../components/common/Chatter'
import Many2One from '../../components/common/Many2One'
import { Loading } from '../../components/common/ui'
import { ChoiceSelect, Field, TextArea, TextInput } from '../../components/common/forms'
import { table } from '../../services/api'
import { TABLES, CHOICES } from '../../utils/constants'
import { display, formatDate, num, value } from '../../utils/fields'
import { navigate } from '../../utils/router'
import { useErp } from '../../context'

const FIELDS = 'sys_id,name,asset_number,asset_model,serial,asset_type,category,quantity,remaining,status,assigned_to,location,purchase_date,notes'
const EMPTY = { name: '', asset_number: '', asset_model: '', serial: '', asset_type: 'fixed_asset', category: '', quantity: '1', remaining: '1', status: 'ready', location: { value: '', display_value: '' }, purchase_date: '', notes: '' }

export default function AssetForm({ route }) {
    const { isManager, notify } = useErp()
    const isNew = route.id === 'new'
    const [rec, setRec] = useState(null)
    const [form, setForm] = useState(null)
    const [editing, setEditing] = useState(isNew)
    const [busy, setBusy] = useState(false)

    const load = useCallback(async () => {
        if (isNew) {
            setForm(EMPTY)
            return
        }
        try {
            const r = await table(TABLES.asset).get(route.id, FIELDS)
            setRec(r)
            setForm({ ...Object.fromEntries(Object.keys(EMPTY).map((k) => [k, value(r[k])])), location: r.location })
            setEditing(false)
        } catch (e) {
            notify(e.message, 'danger')
        }
    }, [isNew, route.id, notify])

    useEffect(() => {
        load()
    }, [load])

    if (!form) return <Loading />
    const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }))

    const save = async () => {
        if (!form.name || !form.asset_number) return notify('The following fields are invalid: Name, Asset Number', 'danger')
        setBusy(true)
        try {
            const payload = { ...form, location: value(form.location) }
            if (isNew) {
                const c = await table(TABLES.asset).create(payload)
                navigate({ app: 'asset', view: 'asset', id: value(c.sys_id) }, { replace: true })
            } else {
                await table(TABLES.asset).update(route.id, payload)
                await load()
            }
            notify('Asset saved', 'success')
        } catch (e) {
            notify(e.message, 'danger')
        } finally {
            setBusy(false)
        }
    }

    const ro = !editing
    const buttons = []
    if (ro && rec && num(rec.remaining) > 0)
        buttons.push(
            <button type="button" key="req" className="o-btn o-btn-primary" onClick={() => navigate({ app: 'asset', view: 'request', asset: route.id })}>
                REQUEST ASSET
            </button>
        )
    if (ro && isManager)
        buttons.push(
            <button type="button" key="edit" className="o-btn o-btn-secondary" onClick={() => setEditing(true)}>
                EDIT
            </button>
        )
    if (editing)
        buttons.push(
            <button type="button" key="save" className="o-btn o-btn-primary" disabled={busy} onClick={save}>
                SAVE
            </button>,
            <button type="button" key="discard" className="o-btn o-btn-secondary" onClick={() => (isNew ? navigate({ app: 'asset' }) : load())}>
                DISCARD
            </button>
        )

    const text = (k, label, required) => (
        <Field label={label} htmlFor={`asset-${k}`} required={required && editing}>
            {ro ? form[k] : <TextInput id={`asset-${k}`} value={form[k]} onChange={set(k)} />}
        </Field>
    )
    const choice = (k, key, label) => (
        <Field label={label} htmlFor={`asset-${k}`}>
            {ro ? display(rec?.[k]) : <ChoiceSelect id={`asset-${k}`} choiceKey={key} value={form[k]} onChange={set(k)} />}
        </Field>
    )

    return (
        <div className="o-action">
            <ControlPanel breadcrumbs={[{ label: 'Assets', onClick: () => navigate({ app: 'asset' }) }, { label: isNew ? 'New' : `${display(rec?.asset_number)}` }]} />
            <div className="o-form-view">
                <StatusBar buttons={buttons} states={CHOICES.asset_status.slice(0, 2)} extraStates={CHOICES.asset_status.slice(2)} current={form.status} />
                <div className="o-form-sheet">
                    <h1 className="o-form-title">{isNew ? 'New Asset' : `${display(rec.asset_number)} - ${display(rec.asset_model)}`}</h1>
                    <div className="o-group-row">
                        <div className="o-group">
                            {text('name', 'Name', true)}
                            {text('asset_number', 'Asset Number', true)}
                            {text('asset_model', 'Asset Model')}
                            {text('serial', 'Serial')}
                            {choice('asset_type', 'asset_type', 'Asset Type')}
                            {choice('category', 'asset_category', 'Category')}
                        </div>
                        <div className="o-group">
                            {text('quantity', 'Quantity')}
                            {text('remaining', 'Remaining')}
                            {choice('status', 'asset_status', 'Asset Status')}
                            <Field label="Asset Location" htmlFor="asset-location">
                                {ro ? display(form.location) : <Many2One id="asset-location" tableName={TABLES.location} value={form.location} query="active=true" onChange={set('location')} />}
                            </Field>
                            <Field label="Assigned To">{display(rec?.assigned_to)}</Field>
                            <Field label="Purchase Date" htmlFor="asset-purchase">
                                {ro ? formatDate(form.purchase_date) : <TextInput id="asset-purchase" type="date" value={form.purchase_date} onChange={set('purchase_date')} />}
                            </Field>
                        </div>
                    </div>
                    <Field label="Notes" htmlFor="asset-notes">
                        {ro ? <span className="o-pre">{form.notes}</span> : <TextArea id="asset-notes" value={form.notes} onChange={set('notes')} />}
                    </Field>
                </div>
                {!isNew ? <Chatter model={TABLES.asset} resId={route.id} recordName={`${display(rec.asset_number)} - ${display(rec.name)}`} /> : null}
            </div>
        </div>
    )
}
