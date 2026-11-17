import React, { useCallback, useEffect, useState } from 'react'
import ControlPanel from '../../components/common/ControlPanel'
import StatusBar from '../../components/common/StatusBar'
import Chatter from '../../components/common/Chatter'
import Many2One from '../../components/common/Many2One'
import Icon from '../../components/common/Icon'
import { Dialog, Dropdown, Loading } from '../../components/common/ui'
import { ChoiceSelect, Field, TextArea, TextInput } from '../../components/common/forms'
import { table } from '../../services/api'
import { TABLES, CHOICES } from '../../utils/constants'
import { DEPT_FIELDS, departmentPath, display, formatDate, ref, todayIso, userLabel, value } from '../../utils/fields'
import { navigate } from '../../utils/router'
import { useErp } from '../../context'

const FIELDS = [
    'sys_id,number,title,requester,request_date,category,support_type,branch,support_location,priority,description',
    'approval_manager_1,approval_manager_2,approval_manager_3,reject_reason,pending_reason,state',
    'requester.name,requester.employee_number,requester.title',
    ...DEPT_FIELDS.map((f) => `requester.${f}`),
].join(',')
const EDITABLE = ['title', 'category', 'support_type', 'branch', 'support_location', 'priority', 'description']
const REQUIRED = { title: 'Title', category: 'Category', support_type: 'Support Type', branch: 'Branch', support_location: 'Support Location' }
const FLOW = CHOICES.ticket_state.slice(0, 5)
const EXTRA = CHOICES.ticket_state.slice(5)
const blank = () => ({ title: '', category: '', support_type: '', branch: '', support_location: ref('', ''), priority: 'normal', description: '', request_date: todayIso() })

export default function TicketForm({ route }) {
    const { user, userId, isManager, notify } = useErp()
    const id = route.id
    const [rec, setRec] = useState(null)
    const [form, setForm] = useState(null)
    const [dirty, setDirty] = useState(false)
    const [invalid, setInvalid] = useState([])
    const [dialog, setDialog] = useState(null)
    const [reason, setReason] = useState('')
    const [busy, setBusy] = useState(false)
    const [chatterKey, setChatterKey] = useState(0)

    const load = useCallback(async () => {
        setDirty(false)
        setInvalid([])
        try {
            if (id) {
                const r = await table(TABLES.ticket).get(id, FIELDS)
                setRec(r)
                setForm({ ...Object.fromEntries(EDITABLE.map((k) => [k, value(r[k])])), support_location: r.support_location, request_date: value(r.request_date) })
            } else {
                setRec(null)
                let f = blank()
                if (route.copy) {
                    const src = await table(TABLES.ticket).get(route.copy, FIELDS)
                    f = { ...f, ...Object.fromEntries(EDITABLE.map((k) => [k, value(src[k])])), support_location: src.support_location, title: `${value(src.title)} (copy)` }
                    setDirty(true)
                }
                setForm(f)
            }
        } catch (e) {
            notify(e.message, 'danger')
        }
    }, [id, route.copy, notify])

    useEffect(() => {
        load()
    }, [load])

    if (!form) return <Loading />

    const state = rec ? value(rec.state) : 'draft'
    const editable = state === 'draft'
    const set = (k) => (v) => {
        setForm((f) => ({ ...f, [k]: v, ...(k === 'branch' ? { support_location: ref('', '') } : {}) }))
        setDirty(true)
    }

    const save = async (newState, extra = {}) => {
        const missing = editable ? Object.keys(REQUIRED).filter((k) => !value(form[k])) : []
        setInvalid(missing)
        if (missing.length) return notify(`The following fields are invalid: ${missing.map((k) => REQUIRED[k]).join(', ')}`, 'danger')
        setBusy(true)
        try {
            const payload = { ...(editable ? { ...form, support_location: value(form.support_location) } : {}), ...extra }
            if (newState) payload.state = newState
            if (!id) {
                const c = await table(TABLES.ticket).create(payload)
                navigate({ app: 'support', view: 'form', id: value(c.sys_id) }, { replace: true })
            } else {
                await table(TABLES.ticket).update(id, payload)
                await load()
                setChatterKey((k) => k + 1)
            }
            notify(newState ? `Ticket ${CHOICES.ticket_state.find(([v]) => v === newState)[1].toLowerCase()}` : 'Saved', 'success')
        } catch (e) {
            notify(e.message, 'danger')
        } finally {
            setBusy(false)
        }
    }

    const remove = async () => {
        try {
            await table(TABLES.ticket).remove(id)
            notify('Ticket deleted', 'success')
            navigate({ app: 'support' })
        } catch (e) {
            notify(e.message, 'danger')
        }
    }

    const buttons = []
    const btn = (label, onClick, primary = true) =>
        buttons.push(
            <button type="button" key={label} className={`o-btn ${primary ? 'o-btn-primary' : 'o-btn-secondary'}`} disabled={busy} onClick={onClick}>
                {label}
            </button>
        )
    if (state === 'draft') btn('CONFIRM', () => save('confirmed'))
    if (state === 'confirmed' && isManager) btn('START', () => save('in_progress'))
    if (state === 'in_progress' && isManager) {
        btn('MARK AS COMPLETED', () => save('completed'))
        btn('SET PENDING', () => setDialog('pending'), false)
    }
    if (state === 'completed' && isManager) btn('CLOSE', () => save('closed'))
    if (['confirmed', 'in_progress'].includes(state) && isManager) btn('REJECT', () => setDialog('reject'), false)
    if (state === 'rejected' && (isManager || value(rec?.requester) === userId)) btn('RESET TO DRAFT', () => save('draft'), false)

    const requesterName = rec ? userLabel(rec, 'requester.') : userLabel(user)
    const dept = rec ? departmentPath(rec, 'requester.') : departmentPath(user)
    const designation = rec ? display(rec['requester.title']) : display(user.title)
    const val = (k) => display(rec?.[k])
    const inv = (k) => invalid.includes(k)

    return (
        <div className="o-action">
            <ControlPanel
                breadcrumbs={[{ label: 'Tickets', onClick: () => navigate({ app: 'support' }) }, { label: id ? display(rec?.title) : 'New' }]}
                titleActions={
                    dirty || !id ? (
                        <>
                            <button type="button" className="o-btn-link" title="Save manually" aria-label="Save" disabled={busy} onClick={() => save()}>
                                <Icon name="cloud" size={16} />
                            </button>
                            <button type="button" className="o-btn-link" title="Discard changes" aria-label="Discard" onClick={() => (id ? load() : navigate({ app: 'support' }))}>
                                <Icon name="undo" size={15} />
                            </button>
                        </>
                    ) : null
                }
                topRight={
                    <>
                        <Dropdown align="right" toggleClass="o-btn-link o-search-options__toggle" toggle={<><Icon name="cog" size={13} /> Action</>}>
                            <button type="button" data-close className="o-dropdown-item" disabled={!id} onClick={() => navigate({ app: 'support', view: 'form', copy: id })}>
                                Duplicate
                            </button>
                            <button type="button" data-close className="o-dropdown-item" disabled={!id || !(state === 'draft' || isManager)} onClick={remove}>
                                Delete
                            </button>
                        </Dropdown>
                        <button type="button" className="o-btn o-btn-outline" onClick={() => navigate({ app: 'support', view: 'form', n: Date.now() })}>
                            New
                        </button>
                    </>
                }
            />
            <div className="o-form-view">
                <StatusBar buttons={buttons} states={FLOW} extraStates={EXTRA} current={state} />
                <div className="o-form-sheet">
                    <div className="o-group-row">
                        <div className="o-group">
                            <Field label="Support No.">{rec ? display(rec.number) : '/'}</Field>
                            <Field label="Requester">
                                <span className="o-link-text">{requesterName}</span>
                            </Field>
                            <Field label="Department">
                                <span className="o-link-text">{dept}</span>
                            </Field>
                            <Field label="Designation">
                                <span className="o-link-text">{designation}</span>
                            </Field>
                            <Field label="Title" htmlFor="t-title" required>
                                {editable ? <TextInput id="t-title" value={form.title} onChange={set('title')} invalid={inv('title')} required /> : val('title')}
                            </Field>
                            <Field label="Category" htmlFor="t-category" required>
                                {editable ? <ChoiceSelect id="t-category" choiceKey="ticket_category" value={form.category} onChange={set('category')} invalid={inv('category')} required /> : val('category')}
                            </Field>
                            <Field label="Support Type" htmlFor="t-type" required>
                                {editable ? <ChoiceSelect id="t-type" choiceKey="support_type" value={form.support_type} onChange={set('support_type')} invalid={inv('support_type')} required /> : val('support_type')}
                            </Field>
                            <Field label="Approval Manager Level-1">{val('approval_manager_1')}</Field>
                            <Field label="Approval Manager Level-2">{val('approval_manager_2')}</Field>
                            <Field label="Approval Manager Level-3">{val('approval_manager_3')}</Field>
                        </div>
                        <div className="o-group">
                            <Field label="Request date">{formatDate(form.request_date)}</Field>
                            <Field label="Branch" htmlFor="t-branch" required>
                                {editable ? <ChoiceSelect id="t-branch" choiceKey="branch" value={form.branch} onChange={set('branch')} invalid={inv('branch')} required /> : val('branch')}
                            </Field>
                            <Field label="Support Location" htmlFor="t-location" required>
                                {editable ? (
                                    <Many2One
                                        id="t-location"
                                        tableName={TABLES.location}
                                        value={form.support_location}
                                        query={`active=true${form.branch ? `^branch=${form.branch}` : ''}`}
                                        invalid={inv('support_location')}
                                        required
                                        onChange={set('support_location')}
                                    />
                                ) : (
                                    val('support_location')
                                )}
                            </Field>
                            <Field label="Priority" htmlFor="t-priority">
                                {editable ? <ChoiceSelect id="t-priority" choiceKey="priority" value={form.priority} onChange={set('priority')} allowEmpty={false} /> : val('priority')}
                            </Field>
                            <Field label="Description" htmlFor="t-description" strong>
                                {editable ? <TextArea id="t-description" value={form.description} onChange={set('description')} /> : <span className="o-pre">{val('description')}</span>}
                            </Field>
                            <Field label="Reject Reason">
                                <span className="o-pre">{val('reject_reason')}</span>
                            </Field>
                            <Field label="Pending Reason">
                                <span className="o-pre">{val('pending_reason')}</span>
                            </Field>
                        </div>
                    </div>
                    <Chatter model={TABLES.ticket} resId={id} recordName={rec ? `${display(rec.number)} - ${display(rec.title)}` : ''} notifyUserIds={[value(rec?.requester)]} refreshKey={chatterKey} />
                </div>
            </div>
            {dialog ? (
                <Dialog
                    title={dialog === 'reject' ? 'Reject Ticket' : 'Set Ticket Pending'}
                    onClose={() => setDialog(null)}
                    footer={
                        <>
                            <button
                                type="button"
                                className="o-btn o-btn-primary"
                                disabled={!reason.trim()}
                                onClick={() => {
                                    const r = reason.trim()
                                    setDialog(null)
                                    setReason('')
                                    dialog === 'reject' ? save('rejected', { reject_reason: r }) : save(null, { pending_reason: r })
                                }}
                            >
                                Confirm
                            </button>
                            <button type="button" className="o-btn o-btn-secondary" onClick={() => setDialog(null)}>
                                Discard
                            </button>
                        </>
                    }
                >
                    <label className="o-label" htmlFor="t-reason">
                        {dialog === 'reject' ? 'Reject Reason' : 'Pending Reason'}
                    </label>
                    <TextArea id="t-reason" rows={4} value={reason} onChange={setReason} />
                </Dialog>
            ) : null}
        </div>
    )
}
