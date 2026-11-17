import React, { useCallback, useEffect, useState } from 'react'
import ControlPanel from '../../components/common/ControlPanel'
import StatusBar from '../../components/common/StatusBar'
import Chatter from '../../components/common/Chatter'
import Many2One from '../../components/common/Many2One'
import Icon from '../../components/common/Icon'
import { Dialog, Dropdown, Loading } from '../../components/common/ui'
import { Field, TextArea } from '../../components/common/forms'
import { table } from '../../services/api'
import { TABLES, CHOICES } from '../../utils/constants'
import { DEPT_FIELDS, departmentPath, display, formatDate, num, ref, todayIso, userLabel, value } from '../../utils/fields'
import { navigate } from '../../utils/router'
import { useErp } from '../../context'
import { ASSET_FIELDS } from './AssetList'

const REQ_FIELDS = [
    'sys_id,number,state,request_date,user_comments,manager_comments,asset,employee',
    'asset.name,asset.asset_number,asset.asset_model,asset.category,asset.location,asset.remaining',
    'employee.name,employee.employee_number',
    ...DEPT_FIELDS.map((f) => `employee.${f}`),
].join(',')
const USER_PICK_FIELDS = ['sys_id,name,employee_number,email', ...DEPT_FIELDS].join(',')

const FLOW = CHOICES.request_state.slice(0, 6)
const EXTRA = CHOICES.request_state.slice(6)
const APPROVAL_STEPS = { submitted: ['first_approved', '1ST APPROVE'], first_approved: ['second_approved', '2ND APPROVE'], second_approved: ['approved', 'APPROVE'], approved: ['allocated', 'ALLOCATE'] }

const assetInfoFrom = (r, p = '') => ({
    number: display(r[`${p}asset_number`]),
    model: display(r[`${p}asset_model`]),
    category: display(r[`${p}category`]),
    location: display(r[`${p}location`]),
    remaining: num(r[`${p}remaining`]),
})

export default function AssetRequestForm({ route }) {
    const { user, userId, isManager, notify } = useErp()
    const id = route.id
    const [rec, setRec] = useState(null)
    const [form, setForm] = useState(null)
    const [assetInfo, setAssetInfo] = useState(null)
    const [dept, setDept] = useState('')
    const [dirty, setDirty] = useState(false)
    const [invalid, setInvalid] = useState([])
    const [dialog, setDialog] = useState(false)
    const [reason, setReason] = useState('')
    const [busy, setBusy] = useState(false)
    const [chatterKey, setChatterKey] = useState(0)
    const fromRequests = route.from === 'requests'
    const back = () => navigate(fromRequests ? { app: 'asset', view: 'requests' } : { app: 'asset' })

    const load = useCallback(async () => {
        setDirty(false)
        setInvalid([])
        try {
            if (id) {
                const r = await table(TABLES.assetReq).get(id, REQ_FIELDS)
                setRec(r)
                setForm({ asset: r.asset, employee: ref(value(r.employee), userLabel(r, 'employee.')), request_date: value(r.request_date), user_comments: value(r.user_comments), manager_comments: value(r.manager_comments) })
                setAssetInfo(value(r.asset) ? assetInfoFrom(r, 'asset.') : null)
                setDept(departmentPath(r, 'employee.'))
            } else {
                setRec(null)
                setForm({ asset: ref('', ''), employee: ref(userId, userLabel(user)), request_date: todayIso(), user_comments: '', manager_comments: '' })
                setDept(departmentPath(user))
                setAssetInfo(null)
                if (route.asset) {
                    const a = await table(TABLES.asset).get(route.asset, ASSET_FIELDS)
                    setForm((f) => ({ ...f, asset: ref(value(a.sys_id), display(a.asset_number)) }))
                    setAssetInfo(assetInfoFrom(a))
                }
            }
        } catch (e) {
            notify(e.message, 'danger')
        }
    }, [id, route.asset, userId, user, notify])

    useEffect(() => {
        load()
    }, [load])

    if (!form) return <Loading />

    const state = rec ? value(rec.state) : 'draft'
    const editable = state === 'draft'
    const managerEditable = isManager && ['submitted', 'first_approved', 'second_approved', 'approved'].includes(state)
    const set = (k, v) => {
        setForm((f) => ({ ...f, [k]: v }))
        setDirty(true)
    }

    const save = async (newState, extra = {}) => {
        const missing = ['asset', 'employee'].filter((k) => !value(form[k]))
        setInvalid(missing)
        if (missing.length) return notify('The following fields are invalid: Asset, Employee', 'danger')
        setBusy(true)
        try {
            const payload = { asset: value(form.asset), employee: value(form.employee), request_date: form.request_date, user_comments: form.user_comments, manager_comments: form.manager_comments, ...extra }
            if (newState) payload.state = newState
            if (!id) {
                const created = await table(TABLES.assetReq).create(payload)
                navigate({ app: 'asset', view: 'request', id: value(created.sys_id), from: route.from }, { replace: true })
            } else {
                await table(TABLES.assetReq).update(id, payload)
                await load()
                setChatterKey((k) => k + 1)
            }
            if (newState) notify(`Request ${CHOICES.request_state.find(([v]) => v === newState)[1].toLowerCase()}`, 'success')
        } catch (e) {
            notify(e.message, 'danger')
        } finally {
            setBusy(false)
        }
    }

    const remove = async () => {
        try {
            await table(TABLES.assetReq).remove(id)
            notify('Request deleted', 'success')
            back()
        } catch (e) {
            notify(e.message, 'danger')
        }
    }

    const buttons = []
    const btn = (label, onClick, primary = true) => buttons.push(<button type="button" key={label} className={`o-btn ${primary ? 'o-btn-primary' : 'o-btn-secondary'}`} disabled={busy} onClick={onClick}>{label}</button>)
    if (state === 'draft') btn('SUBMIT', () => save('submitted'))
    if (APPROVAL_STEPS[state] && isManager) btn(APPROVAL_STEPS[state][1], () => save(APPROVAL_STEPS[state][0]))
    if (['submitted', 'first_approved', 'second_approved'].includes(state) && isManager) btn('REJECT', () => setDialog(true), false)
    if (id && ['draft', 'submitted'].includes(state) && value(rec.employee) === userId) btn('CANCEL', () => save('cancelled'), false)
    if (['rejected', 'cancelled'].includes(state)) btn('RESET TO DRAFT', () => save('draft'), false)

    const title = assetInfo ? `${assetInfo.number} - ${assetInfo.model}` : 'New Asset Request'
    const recordName = rec ? `${display(rec.number)} - ${assetInfo?.number || ''}` : ''

    return (
        <div className="o-action">
            <ControlPanel
                breadcrumbs={[{ label: fromRequests ? 'Asset Requests' : 'Assets', onClick: back }, { label: id ? display(rec?.number) : 'New' }]}
                titleActions={
                    dirty ? (
                        <>
                            <button type="button" className="o-btn-link" title="Save manually" aria-label="Save" onClick={() => save()}>
                                <Icon name="cloud" size={16} />
                            </button>
                            <button type="button" className="o-btn-link" title="Discard changes" aria-label="Discard" onClick={() => (id ? load() : back())}>
                                <Icon name="undo" size={15} />
                            </button>
                        </>
                    ) : null
                }
                topRight={
                    id && (state === 'draft' || isManager) ? (
                        <Dropdown align="right" toggleClass="o-btn-link o-search-options__toggle" toggle={<><Icon name="cog" size={13} /> Action</>}>
                            <button type="button" data-close className="o-dropdown-item" onClick={remove}>
                                Delete
                            </button>
                        </Dropdown>
                    ) : (
                        <span className="o-search-options__toggle o-muted">
                            <Icon name="cog" size={13} /> Action
                        </span>
                    )
                }
            />
            <div className="o-form-view">
                <StatusBar buttons={buttons} states={FLOW} extraStates={EXTRA} current={state} />
                <div className="o-form-sheet">
                    <h1 className="o-form-title">{title}</h1>
                    <div className="o-group-row">
                        <div className="o-group">
                            {editable && !route.asset ? (
                                <Field label="Asset" htmlFor="req-asset" required>
                                    <Many2One
                                        id="req-asset"
                                        tableName={TABLES.asset}
                                        value={form.asset}
                                        query={id ? '' : 'remaining>0'}
                                        searchFields={['asset_number', 'name', 'asset_model']}
                                        fields={ASSET_FIELDS}
                                        format={(a) => `${display(a.asset_number)} - ${display(a.asset_model)}`}
                                        invalid={invalid.includes('asset')}
                                        onChange={(v, a) => {
                                            set('asset', v)
                                            setAssetInfo(a ? assetInfoFrom(a) : null)
                                        }}
                                    />
                                </Field>
                            ) : null}
                            <Field label="Asset Category">{assetInfo?.category}</Field>
                            <Field label="Asset Model">{assetInfo?.model}</Field>
                            <Field label="Asset Location">{assetInfo?.location}</Field>
                            <Field label="Request Date">{formatDate(form.request_date)}</Field>
                            <Field label="Asset Number">{assetInfo?.number}</Field>
                        </div>
                        <div className="o-group">
                            <Field label="Employee" htmlFor="req-employee" strong>
                                {editable ? (
                                    <Many2One
                                        id="req-employee"
                                        tableName="sys_user"
                                        value={form.employee}
                                        query="active=true"
                                        searchFields={['name', 'employee_number', 'email']}
                                        fields={USER_PICK_FIELDS}
                                        format={(u) => userLabel(u)}
                                        invalid={invalid.includes('employee')}
                                        onChange={(v, u) => {
                                            set('employee', v)
                                            setDept(u ? departmentPath(u) : '')
                                        }}
                                    />
                                ) : (
                                    display(form.employee)
                                )}
                            </Field>
                            <Field label="Department">{dept}</Field>
                        </div>
                    </div>
                    <div className="o-group-row">
                        <div className="o-group">
                            <Field label="User Comments" htmlFor="req-user-comments" strong>
                                {editable ? <TextArea id="req-user-comments" value={form.user_comments} onChange={(v) => set('user_comments', v)} /> : <span className="o-pre">{form.user_comments}</span>}
                            </Field>
                        </div>
                        <div className="o-group">
                            <Field label="Manager Comments" htmlFor="req-mgr-comments">
                                {managerEditable ? <TextArea id="req-mgr-comments" value={form.manager_comments} onChange={(v) => set('manager_comments', v)} /> : <span className="o-pre">{form.manager_comments}</span>}
                            </Field>
                        </div>
                    </div>
                </div>
                <Chatter model={TABLES.assetReq} resId={id} recordName={recordName} notifyUserIds={[value(form.employee)]} refreshKey={chatterKey} />
            </div>
            {dialog ? (
                <Dialog
                    title="Reject Asset Request"
                    onClose={() => setDialog(false)}
                    footer={
                        <>
                            <button
                                type="button"
                                className="o-btn o-btn-primary"
                                disabled={!reason.trim()}
                                onClick={() => {
                                    setDialog(false)
                                    save('rejected', { manager_comments: reason.trim() })
                                }}
                            >
                                Reject
                            </button>
                            <button type="button" className="o-btn o-btn-secondary" onClick={() => setDialog(false)}>
                                Discard
                            </button>
                        </>
                    }
                >
                    <label className="o-label" htmlFor="reject-reason">
                        Reason
                    </label>
                    <TextArea id="reject-reason" rows={4} value={reason} onChange={setReason} />
                </Dialog>
            ) : null}
        </div>
    )
}
