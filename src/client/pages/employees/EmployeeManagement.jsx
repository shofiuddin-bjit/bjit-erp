import React, { useEffect, useMemo, useState } from 'react'
import ControlPanel, { useSearchModel } from '../../components/common/ControlPanel'
import Icon from '../../components/common/Icon'
import Many2One from '../../components/common/Many2One'
import { Field } from '../../components/common/forms'
import { Loading } from '../../components/common/ui'
import { table } from '../../services/api'
import { authOptions } from '../../services/auth'
import { useErp } from '../../context'
import { TABLES } from '../../utils/constants'
import { departmentPath, display, value } from '../../utils/fields'
import { navigate } from '../../utils/router'
import './employees.css'

const EMPLOYEE_FIELDS = 'sys_id,user,user.photo,employee_number,job_title,department,manager,work_email,work_mobile,work_phone,work_address,branch,office_location,employee_type'
const DIRECTORY_FIELDS = 'sys_id,name,employee_number,title,department,department.parent,department.parent.parent,department.parent.parent.parent,department.parent.parent.parent.parent,manager,email,mobile_phone,phone,photo,active'
const PRIVATE_FIELDS = 'sys_id,employee,nationality,identification_number,passport_number,national_id,tin_number,bank_account_number,ups_account_no,private_address,home_address,present_address,emergency_contact,gender,marital_status,religion,date_of_birth,blood_group,nominee_name,nominee_relationship,nominee_contact,employment_status,job_rank,job_role,resource_type,join_date,confirmation_date,resignation_date,resignation_reason,release_type,employment_location_date,employee_old_id,biometric_id,promotion_date,working_hours,platforms,teams'
const ITEM_FIELDS = 'sys_id,employee,category,title,organization,major,responsibility,start_date,end_date'
const PAGE_SIZE = 80

const WORK_FIELDS = [
    { name: 'user', label: 'Related User', reference: 'sys_user', required: true },
    { name: 'employee_number', label: 'Employee Number', required: true },
    { name: 'job_title', label: 'Job Title' },
    { name: 'department', label: 'Department', reference: 'cmn_department' },
    { name: 'manager', label: 'Manager', reference: 'sys_user' },
    { name: 'work_email', label: 'Work Email', type: 'email' },
    { name: 'work_mobile', label: 'Work Mobile' },
    { name: 'work_phone', label: 'Work Phone' },
    { name: 'branch', label: 'Branch' },
    { name: 'office_location', label: 'Office Location' },
    { name: 'work_address', label: 'Work Address', type: 'textarea' },
    { name: 'employee_type', label: 'Employee Type', type: 'choice', choices: [['employee', 'Employee'], ['contractor', 'Contractor'], ['intern', 'Intern']] },
]

const PERSONAL_FIELDS = [
    { name: 'nationality', label: 'Nationality' }, { name: 'identification_number', label: 'Identification Number' },
    { name: 'passport_number', label: 'Passport Number' }, { name: 'national_id', label: 'National ID' },
    { name: 'tin_number', label: 'TIN Number' }, { name: 'bank_account_number', label: 'Bank Account Number' },
    { name: 'ups_account_no', label: 'UPS Account No.' }, { name: 'private_address', label: 'Private Address' },
    { name: 'home_address', label: 'Home Address', type: 'textarea' }, { name: 'present_address', label: 'Present Address', type: 'textarea' },
    { name: 'emergency_contact', label: 'Emergency Contact Number' },
    { name: 'gender', label: 'Gender', type: 'choice', choices: [['male', 'Male'], ['female', 'Female'], ['other', 'Other']] },
    { name: 'marital_status', label: 'Marital Status', type: 'choice', choices: [['single', 'Single'], ['married', 'Married'], ['other', 'Other']] },
    { name: 'religion', label: 'Religion' }, { name: 'date_of_birth', label: 'Date of Birth', type: 'date' },
    { name: 'blood_group', label: 'Blood Group' }, { name: 'nominee_name', label: 'Nominee Name' },
    { name: 'nominee_relationship', label: 'Nominee Relationship' }, { name: 'nominee_contact', label: 'Nominee Contact' },
]

const HR_FIELDS = [
    { name: 'employment_status', label: 'Employment Status', type: 'choice', choices: [['regular', 'Regular'], ['probation', 'Probation'], ['contract', 'Contract'], ['resigned', 'Resigned']] },
    { name: 'job_rank', label: 'Job Rank' }, { name: 'job_role', label: 'Job Role' }, { name: 'resource_type', label: 'Resource Type' },
    { name: 'join_date', label: 'Join Date', type: 'date' }, { name: 'confirmation_date', label: 'Confirmation Date', type: 'date' },
    { name: 'resignation_date', label: 'Resign / Release / Transfer Date', type: 'date' },
    { name: 'resignation_reason', label: 'Resign Reason', type: 'textarea' }, { name: 'release_type', label: 'Release Type' },
    { name: 'employment_location_date', label: 'Employment Location Date', type: 'date' }, { name: 'employee_old_id', label: 'Employee Old ID' },
    { name: 'biometric_id', label: 'Biometric Device ID' }, { name: 'promotion_date', label: 'Promotion Date', type: 'date' },
    { name: 'working_hours', label: 'Working Hours' }, { name: 'platforms', label: 'Platforms', type: 'textarea' }, { name: 'teams', label: 'Teams', type: 'textarea' },
]

const TABS = [
    ['work', 'Work Information'], ['private', 'Private Information'], ['hr', 'HR Settings'],
    ['project', 'BJIT Project History'], ['other_project', 'Others Project History'], ['qualification', 'Academic Qualifications'],
    ['experience', 'Work Experience'], ['certification', 'Certification'], ['training', 'Training'],
    ['promotion', 'Promotion History'], ['technical', 'Technical Skills'],
]

const ITEM_TABS = {
    project: ['project'], other_project: ['project'], qualification: ['qualification'], experience: ['experience'],
    certification: ['certification'], training: ['training'], promotion: ['promotion'], technical: ['technical'],
}

function blank(fields) {
    return Object.fromEntries(fields.map((f) => [f.name, '']))
}

function toDraft(record, fields) {
    return Object.fromEntries(fields.map((f) => [f.name, f.reference
        ? { value: value(record?.[f.name]), display_value: display(record?.[f.name]) }
        : value(record?.[f.name])]))
}

function Avatar({ name, photo, large = false }) {
    const initials = String(name || '?').trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
    const photoId = value(photo)
    const [photoUrl, setPhotoUrl] = useState('')
    useEffect(() => {
        if (!photoId) { setPhotoUrl(''); return undefined }
        const controller = new AbortController()
        let objectUrl = ''
        const { headers, credentials } = authOptions()
        fetch(`/api/now/attachment/${encodeURIComponent(photoId)}/file`, { headers, credentials, signal: controller.signal })
            .then((response) => response.ok ? response.blob() : null)
            .then((blob) => {
                if (blob && !controller.signal.aborted) {
                    objectUrl = URL.createObjectURL(blob)
                    setPhotoUrl(objectUrl)
                }
            }).catch(() => {})
        return () => { controller.abort(); if (objectUrl) URL.revokeObjectURL(objectUrl) }
    }, [photoId])
    return <div className={`o-employee-avatar ${large ? 'o-employee-avatar--large' : ''}`} aria-label={name || 'Employee'}>{photoUrl ? <img src={photoUrl} alt="" /> : initials}</div>
}

function EmployeeList({ isHr, isEmployee }) {
    const { notify, userId } = useErp()
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(true)
    const [department, setDepartment] = useState('')
    const [page, setPage] = useState(0)
    const [view, setView] = useState('kanban')
    const [refresh, setRefresh] = useState(0)
    const model = useSearchModel({
        storageKey: 'employees',
        filters: [{ id: 'me', label: 'Me', fn: (record) => value(record.user) === userId }],
        defaults: { filters: ['me'] },
        searchFields: [
            { field: 'user', label: 'Employee', get: (r) => display(r.user) },
            { field: 'employee_number', label: 'Employee Number', get: (r) => display(r.employee_number) },
            { field: 'job_title', label: 'Job Title', get: (r) => display(r.job_title) },
            { field: 'work_email', label: 'Work Email', get: (r) => display(r.work_email) },
        ],
    })
    const meOnly = model.state.filters.includes('me')
    const reload = () => setRefresh((current) => current + 1)
    useEffect(() => {
        let cancelled = false
        const load = async () => {
            setLoading(true)
            setRecords([])
            try {
                const users = await table('sys_user').list({
                    query: meOnly ? `sys_id=${userId}^active=true` : 'active=true^ORDERBYemployee_number',
                    fields: DIRECTORY_FIELDS,
                    limit: meOnly ? 1 : 1000,
                })
                if (!cancelled) setRecords(users.map((user) => ({
                    ...user,
                    user: { value: value(user.sys_id), display_value: display(user.name) },
                    job_title: user.title,
                    work_email: user.email,
                    work_mobile: user.mobile_phone,
                    work_phone: user.phone,
                    'user.photo': user.photo,
                })))
            } catch (e) {
                if (!cancelled) notify(e.message, 'danger')
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        load()
        return () => { cancelled = true }
    }, [userId, meOnly, refresh, notify])
    useEffect(() => { setDepartment(''); setPage(0) }, [userId, meOnly])
    useEffect(() => { setPage(0) }, [model.state])

    const departments = useMemo(() => {
        const counts = new Map()
        records.forEach((r) => {
            const label = display(r.department) || 'Unassigned'
            counts.set(label, (counts.get(label) || 0) + 1)
        })
        return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b))
    }, [records])
    const filtered = records.filter((r) => (!department || (display(r.department) || 'Unassigned') === department) && model.matches(r))
    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const shown = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
    const create = () => navigate({ app: 'employees', view: 'employee', id: 'new' })

    if (!isEmployee && !isHr) return <div className="o-nocontent"><p className="o-nocontent__title">Employee access required</p><p>Ask HR to assign the BJIT ERP Employee role to your account.</p></div>

    return (
        <div className="o-action o-employee-action">
            <ControlPanel
                breadcrumbs={[{ label: 'Employees' }]}
                model={model}
                buttons={isHr ? <button type="button" className="o-btn o-btn-primary" onClick={create}>CREATE</button> : null}
                onRefresh={reload}
                pager={{
                    text: filtered.length ? `${page * PAGE_SIZE + 1}-${Math.min(filtered.length, (page + 1) * PAGE_SIZE)} / ${filtered.length}` : '0 / 0',
                    onPrev: page > 0 ? () => setPage((p) => p - 1) : null,
                    onNext: (page + 1) * PAGE_SIZE < filtered.length ? () => setPage((p) => p + 1) : null,
                }}
                views={{ options: [{ id: 'kanban', icon: 'kanban', label: 'Kanban' }, { id: 'list', icon: 'list', label: 'List' }], current: view, onSwitch: setView }}
            />
            {loading ? <Loading /> : (
                <div className="o-employee-directory">
                    <aside className="o-employee-departments">
                        <h3><Icon name="users" size={15} /> DEPARTMENT</h3>
                        <button type="button" aria-pressed={!department} className={!department ? 'is-selected' : ''} onClick={() => { setDepartment(''); setPage(0) }}>All <span>{records.length}</span></button>
                        {departments.map(([name, count]) => <button type="button" key={name} aria-pressed={department === name} className={department === name ? 'is-selected' : ''} onClick={() => { setDepartment(name); setPage(0) }}><Icon name="caretRight" size={12} /> {name} <span>{count}</span></button>)}
                    </aside>
                    <section className="o-employee-cards" aria-label="Employee directory">
                        {view === 'kanban' ? shown.map((r) => {
                            const id = value(r.sys_id)
                            const name = display(r.user) || display(r.employee_number)
                            return (
                                <button type="button" className="o-employee-card" key={id} onClick={() => navigate({ app: 'employees', view: 'employee', id })}>
                                    <Avatar name={name} photo={r['user.photo']} />
                                    <span className="o-employee-card__info">
                                        <strong title={name}>{name}</strong>
                                        {display(r.job_title) ? <span title={display(r.job_title)}>{display(r.job_title)}</span> : null}
                                        <span className="o-employee-card__department">{departmentPath(r) || 'Unassigned'}</span>
                                        {display(r.work_email) ? <span className="o-employee-card__contact" title={display(r.work_email)}>{display(r.work_email)}</span> : null}
                                        {display(r.work_mobile) || display(r.work_phone) ? <span className="o-employee-card__contact">{display(r.work_mobile) || display(r.work_phone)}</span> : null}
                                    </span>
                                    <i className="o-employee-status-dot" title="Active profile" />
                                    <span className="o-employee-card__number">{display(r.employee_number)}</span>
                                </button>
                            )
                        }) : <div className="o-employee-list-table"><table><thead><tr><th>Employee</th><th>Employee Number</th><th>Job Title</th><th>Department</th><th>Work Email</th><th>Work Mobile</th></tr></thead><tbody>{shown.map((r) => <tr key={value(r.sys_id)} onClick={() => navigate({ app: 'employees', view: 'employee', id: value(r.sys_id) })}><td>{display(r.user)}</td><td>{display(r.employee_number)}</td><td>{display(r.job_title)}</td><td>{display(r.department)}</td><td>{display(r.work_email)}</td><td>{display(r.work_mobile)}</td></tr>)}</tbody></table></div>}
                        {!shown.length ? <div className="o-employee-empty">{meOnly ? 'Your employee card could not be found. Please contact HR.' : 'No employees match the current search.'}</div> : null}
                    </section>
                </div>
            )}
        </div>
    )
}

function TextControl({ field, value: fieldValue, onChange, disabled }) {
    if (field.reference) {
        return <Many2One
            id={`employee-${field.name}`}
            label={field.label}
            tableName={field.reference}
            value={{ value: fieldValue?.value || fieldValue || '', display_value: fieldValue?.display_value || '' }}
            onChange={(next, rec) => onChange(next, rec)}
            searchFields={field.reference === 'sys_user' ? ['name', 'user_name', 'email'] : ['name']}
            fields={field.reference === 'sys_user' ? 'sys_id,name,user_name,email,title,employee_number' : 'sys_id,name'}
            query={field.reference === 'sys_user' ? 'active=true' : ''}
            format={field.reference === 'sys_user' ? (r) => `${display(r.name)}${display(r.employee_number) ? ` ${display(r.employee_number)}` : ''}` : undefined}
        />
    }
    if (field.choices) return <select className="o-input" disabled={disabled} value={fieldValue || ''} onChange={(e) => onChange(e.target.value)}><option value="" />{field.choices.map(([v, label]) => <option key={v} value={v}>{label}</option>)}</select>
    if (field.type === 'textarea') return <textarea className="o-input o-textarea" disabled={disabled} rows={2} value={fieldValue || ''} onChange={(e) => onChange(e.target.value)} />
    return <input className="o-input" type={field.type || 'text'} disabled={disabled} value={fieldValue || ''} onChange={(e) => onChange(e.target.value)} />
}

function FieldGrid({ title, fields, data, editing, onChange }) {
    return <section className="o-employee-section">
        <h3>{title}</h3>
        <div className="o-employee-field-grid">
            {fields.map((field) => <Field key={field.name} label={field.label} required={field.required}>
                {editing ? <TextControl field={field} value={data[field.name]} disabled={field.readOnly} onChange={(next, refRecord) => {
                    onChange(field.name, next)
                    if (field.name === 'user' && refRecord) onChange('__userRecord', refRecord)
                }} /> : <span className="o-employee-read-value">{field.reference ? fieldValueLabel(data[field.name]) : data[field.name] || <span className="o-muted">—</span>}</span>}
            </Field>)}
        </div>
    </section>
}

function fieldValueLabel(field) {
    return typeof field === 'object' ? display(field) || <span className="o-muted">—</span> : field || <span className="o-muted">—</span>
}

function EmployeeProfile({ route, isHr, isEmployee, userId }) {
    const { notify } = useErp()
    const isNew = route.id === 'new'
    const [employee, setEmployee] = useState(null)
    const [hasProfile, setHasProfile] = useState(false)
    const [employeeId, setEmployeeId] = useState(isNew ? '' : route.id)
    const [employeeDraft, setEmployeeDraft] = useState(blank(WORK_FIELDS))
    const [privateRecordId, setPrivateRecordId] = useState('')
    const [privateDraft, setPrivateDraft] = useState(blank([...PERSONAL_FIELDS, ...HR_FIELDS]))
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(!isNew)
    const [editing, setEditing] = useState(isNew && isHr)
    const [tab, setTab] = useState('work')
    const [itemDraft, setItemDraft] = useState(null)
    const [saving, setSaving] = useState(false)
    const isSelf = Boolean(employee && value(employee.user) === userId)
    const mayReadPrivate = isHr || isSelf
    const mayEdit = isHr

    useEffect(() => {
        if (isNew) {
            const seed = blank(WORK_FIELDS)
            setEmployeeDraft(seed)
            setPrivateDraft(blank([...PERSONAL_FIELDS, ...HR_FIELDS]))
            setLoading(false)
            return
        }
        let alive = true
        setLoading(true)
        Promise.all([
            table(TABLES.employee).get(route.id, EMPLOYEE_FIELDS).catch(() => null),
            table('sys_user').get(route.id, DIRECTORY_FIELDS).catch(() => null),
        ]).then(async ([directProfile, directoryUser]) => {
            if (!alive) return
            let record = directProfile
            if (!record && directoryUser) {
                const linked = await table(TABLES.employee).list({ query: `user=${route.id}`, fields: EMPLOYEE_FIELDS, limit: 1 }).catch(() => [])
                record = linked[0] || null
            }
            if (!record && directoryUser) {
                record = {
                    sys_id: { value: '', display_value: '' },
                    user: directoryUser.sys_id,
                    'user.photo': directoryUser.photo,
                    employee_number: directoryUser.employee_number,
                    job_title: directoryUser.title,
                    department: directoryUser.department,
                    manager: directoryUser.manager,
                    work_email: directoryUser.email,
                    work_mobile: directoryUser.mobile_phone,
                    work_phone: directoryUser.phone,
                }
            }
            if (!record) throw new Error('Employee not found')
            const profileId = value(record.sys_id)
            const [privateRows, history] = profileId ? await Promise.all([
                table(TABLES.employeePrivate).list({ query: `employee=${profileId}`, fields: PRIVATE_FIELDS, limit: 1 }).catch(() => []),
                table(TABLES.employeeItem).list({ query: `employee=${profileId}^ORDERBYstart_date`, fields: ITEM_FIELDS, limit: 250 }).catch(() => []),
            ]) : [[], []]
            setEmployee(record)
            setHasProfile(Boolean(profileId))
            setEmployeeId(profileId)
            setEmployeeDraft(toDraft(record, WORK_FIELDS))
            const privateRow = mayReadPrivate ? privateRows[0] : null
            setPrivateRecordId(value(privateRow?.sys_id))
            setPrivateDraft(toDraft(privateRow, [...PERSONAL_FIELDS, ...HR_FIELDS]))
            setItems(history)
        }).catch((e) => { if (alive) notify(e.message, 'danger') }).finally(() => { if (alive) setLoading(false) })
        return () => { alive = false }
    }, [route.id, isNew, mayReadPrivate, notify])

    const title = display(employee?.user) || employeeDraft.employee_number || (isNew ? 'New Employee' : 'Employee')
    const setMain = (key, next) => {
        if (key === '__userRecord') {
            setEmployeeDraft((s) => ({ ...s,
                employee_number: display(next.employee_number) || s.employee_number,
                job_title: display(next.title) || s.job_title,
                work_email: display(next.email) || s.work_email,
                user: { value: value(next.sys_id), display_value: display(next.name) },
            }))
            return
        }
        setEmployeeDraft((s) => ({ ...s, [key]: next }))
    }
    const setPrivate = (key, next) => setPrivateDraft((s) => ({ ...s, [key]: next }))

    const save = async () => {
        if (!value(employeeDraft.user) || !employeeDraft.employee_number.trim()) return notify('Select a ServiceNow user and enter an employee number.', 'warning')
        setSaving(true)
        const mainPayload = Object.fromEntries(WORK_FIELDS.map((f) => [f.name, f.reference ? value(employeeDraft[f.name]) : employeeDraft[f.name] || '']))
        try {
            let saved
            if (isNew || !hasProfile) {
                saved = await table(TABLES.employee).create(mainPayload)
                setEmployeeId(value(saved.sys_id))
                setEmployee(saved)
                setHasProfile(true)
            } else {
                saved = await table(TABLES.employee).update(employeeId, mainPayload)
                setEmployee(saved)
            }
            const privatePayload = Object.fromEntries([...PERSONAL_FIELDS, ...HR_FIELDS].map((f) => [f.name, privateDraft[f.name] || '']))
            const hasPrivateValues = Object.values(privatePayload).some(Boolean)
            if (hasPrivateValues || privateRecordId) {
                privatePayload.employee = value(saved.sys_id) || employeeId
                const privateSaved = privateRecordId
                    ? await table(TABLES.employeePrivate).update(privateRecordId, privatePayload)
                    : await table(TABLES.employeePrivate).create(privatePayload)
                setPrivateRecordId(value(privateSaved.sys_id))
                setPrivateDraft(toDraft(privateSaved, [...PERSONAL_FIELDS, ...HR_FIELDS]))
            }
            setEmployeeDraft(toDraft(saved, WORK_FIELDS))
            setEditing(false)
            notify(isNew || !hasProfile ? 'Employee profile created.' : 'Employee profile updated.', 'success')
            if (isNew || !hasProfile) navigate({ app: 'employees', view: 'employee', id: value(saved.sys_id) }, { replace: true })
        } catch (e) {
            notify(e.message, 'danger')
        } finally {
            setSaving(false)
        }
    }

    const saveItem = async () => {
        if (!itemDraft?.title?.trim()) return notify('Enter a title for this history item.', 'warning')
        try {
            const payload = { ...itemDraft, employee: employeeId }
            const saved = itemDraft.sys_id
                ? await table(TABLES.employeeItem).update(itemDraft.sys_id, payload)
                : await table(TABLES.employeeItem).create(payload)
            setItems((list) => itemDraft.sys_id ? list.map((item) => value(item.sys_id) === itemDraft.sys_id ? saved : item) : [...list, saved])
            setItemDraft(null)
            notify('Employee history added.', 'success')
        } catch (e) { notify(e.message, 'danger') }
    }
    const deleteItem = async (id) => {
        try {
            await table(TABLES.employeeItem).remove(id)
            setItems((list) => list.filter((item) => value(item.sys_id) !== id))
            notify('History item deleted.', 'success')
        } catch (e) { notify(e.message, 'danger') }
    }

    if (loading) return <Loading />
    if (!isHr && !isEmployee) return <div className="o-nocontent"><p className="o-nocontent__title">Employee access required</p><p>Ask HR to assign the BJIT ERP Employee role to your account.</p></div>
    if (!isNew && !employee) return <div className="o-nocontent"><p className="o-nocontent__title">Employee not found</p><button className="o-btn o-btn-secondary" onClick={() => navigate({ app: 'employees' })}>Back to Employees</button></div>

    const availableTabs = TABS.filter(([id]) => {
        if (id === 'private' || id === 'hr') return mayReadPrivate
        if (id === 'work') return true
        return mayReadPrivate
    })
    const visibleItems = items.filter((item) => (ITEM_TABS[tab] || []).includes(value(item.category)))
    const selectTab = (id) => setTab(id)

    return (
        <div className="o-action o-employee-action">
            <ControlPanel
                breadcrumbs={[{ label: 'Employees', onClick: () => navigate({ app: 'employees' }) }, { label: title }]}
                buttons={mayEdit ? <>
                    {editing ? <><button type="button" className="o-btn o-btn-primary" disabled={saving} onClick={save}>{saving ? 'SAVING…' : 'SAVE'}</button><button type="button" className="o-btn o-btn-secondary" onClick={() => isNew ? navigate({ app: 'employees' }) : window.location.reload()}>DISCARD</button></> : <button type="button" className="o-btn o-btn-primary" onClick={() => setEditing(true)}>EDIT</button>}
                </> : null}
                topRight={<span className="o-employee-detail-actions"><button type="button" className="o-btn-link" onClick={() => window.print()}><Icon name="download" size={14} /> Print CV</button><button type="button" className="o-btn-link" onClick={() => window.location.reload()}><Icon name="refresh" size={14} /></button></span>}
            />
            <article className="o-employee-profile">
                <div className="o-employee-summary-strip">
                    <div><Icon name="calendar" size={18} /><b>{display(employeeDraft.employee_type) || '—'}</b><span>Employee Type</span></div>
                    <div><Icon name="users" size={18} /><b>{display(employee?.department) || '—'}</b><span>Department</span></div>
                    <div><Icon name="card" size={18} /><b>{display(employeeDraft.work_email) || '—'}</b><span>Work Email</span></div>
                    <div><Icon name="user" size={18} /><b>{display(employeeDraft.work_mobile) || '—'}</b><span>Work Mobile</span></div>
                </div>
                <header className="o-employee-profile-head">
                    <div><h1>{title}</h1><p>{employeeDraft.job_title || 'Employee'}{employeeDraft.employee_number ? ` · ${employeeDraft.employee_number}` : ''}</p></div>
                    <Avatar name={title} photo={employee?.['user.photo']} large />
                </header>
                <nav className="o-employee-tabs" aria-label="Employee profile sections">
                    {availableTabs.map(([id, label]) => <button key={id} type="button" className={tab === id ? 'is-active' : ''} onClick={() => selectTab(id)}>{label}</button>)}
                </nav>
                <div className="o-employee-tab-panel">
                    {tab === 'work' ? <div className="o-employee-work-layout">
                        <FieldGrid title="CONTACT INFORMATION" fields={WORK_FIELDS.filter((f) => ['work_address', 'work_email', 'work_mobile', 'branch', 'office_location', 'work_phone'].includes(f.name))} data={employeeDraft} editing={editing && mayEdit} onChange={setMain} />
                        <div className="o-employee-position-stack">
                            <FieldGrid title="POSITION" fields={WORK_FIELDS.filter((f) => ['department', 'job_title', 'manager'].includes(f.name))} data={employeeDraft} editing={editing && mayEdit} onChange={setMain} />
                            <FieldGrid title="EMPLOYMENT DETAILS" fields={HR_FIELDS.filter((f) => ['resource_type', 'working_hours', 'platforms', 'teams'].includes(f.name))} data={privateDraft} editing={editing && mayEdit} onChange={setPrivate} />
                        </div>
                        <section className="o-employee-section o-employee-org"><h3>ORGANIZATION CHART</h3><div className="o-employee-org-card"><Avatar name={display(employeeDraft.manager) || title} /><div><b>{display(employeeDraft.manager) || 'No manager assigned'}</b><span>{employeeDraft.job_title || 'Manager'}</span></div></div><div className="o-employee-org-current"><Avatar name={title} /><div><b>{title}</b><span>{employeeDraft.job_title}</span></div></div></section>
                    </div> : null}
                    {tab === 'private' ? <div className="o-employee-two-col">
                        <FieldGrid title="CITIZENSHIP & OTHER INFORMATION" fields={PERSONAL_FIELDS.slice(0, 7)} data={privateDraft} editing={editing && mayEdit} onChange={setPrivate} />
                        <FieldGrid title="CONTACT INFORMATION" fields={PERSONAL_FIELDS.slice(7, 11)} data={privateDraft} editing={editing && mayEdit} onChange={setPrivate} />
                        <FieldGrid title="STATUS" fields={PERSONAL_FIELDS.slice(11, 14)} data={privateDraft} editing={editing && mayEdit} onChange={setPrivate} />
                        <FieldGrid title="BIRTH" fields={PERSONAL_FIELDS.slice(14, 16)} data={privateDraft} editing={editing && mayEdit} onChange={setPrivate} />
                        <FieldGrid title="NOMINEE DETAILS" fields={PERSONAL_FIELDS.slice(16)} data={privateDraft} editing={editing && mayEdit} onChange={setPrivate} />
                    </div> : null}
                    {tab === 'hr' ? <>
                        <FieldGrid title="STATUS" fields={[
                            WORK_FIELDS.find((f) => f.name === 'employee_type'), WORK_FIELDS.find((f) => f.name === 'user'),
                            HR_FIELDS.find((f) => f.name === 'biometric_id'),
                        ]} data={{ ...employeeDraft, ...privateDraft }} editing={editing && mayEdit} onChange={(key, next) => WORK_FIELDS.some((f) => f.name === key) ? setMain(key, next) : setPrivate(key, next)} />
                        <FieldGrid title="EMPLOYMENT INFORMATION" fields={HR_FIELDS.filter((f) => !['biometric_id', 'resource_type', 'working_hours', 'platforms', 'teams'].includes(f.name))} data={privateDraft} editing={editing && mayEdit} onChange={setPrivate} />
                    </> : null}
                    {ITEM_TABS[tab] ? <section className="o-employee-section o-employee-history">
                        {visibleItems.length ? <table><thead><tr><th>{tab === 'qualification' ? 'Degree' : 'Role / Title'}</th><th>{tab === 'qualification' ? 'Academic Institute' : 'Organization'}</th><th>Major / Technology</th><th>Start date</th><th>End date</th>{mayEdit ? <th /> : null}</tr></thead><tbody>{visibleItems.map((item) => <tr key={value(item.sys_id)}><td>{display(item.title)}</td><td>{display(item.organization)}</td><td>{display(item.major)}</td><td>{display(item.start_date)}</td><td>{display(item.end_date)}</td>{mayEdit ? <td className="o-employee-row-actions"><button type="button" className="o-btn-link" aria-label="Edit history item" onClick={() => setItemDraft({ sys_id: value(item.sys_id), category: value(item.category), title: display(item.title), organization: display(item.organization), major: display(item.major), responsibility: display(item.responsibility), start_date: value(item.start_date), end_date: value(item.end_date) })}><Icon name="pencil" size={14} /></button><button type="button" className="o-btn-link o-danger-link" aria-label="Delete history item" onClick={() => deleteItem(value(item.sys_id))}><Icon name="trash" size={14} /></button></td> : null}</tr>)}</tbody></table> : <p className="o-employee-empty-row">No records yet.</p>}
                        {mayEdit ? <>
                            {itemDraft ? <div className="o-employee-history-form">{[
                                { name: 'title', label: tab === 'qualification' ? 'Degree' : 'Role / Title' }, { name: 'organization', label: 'Institute / Organization' },
                                { name: 'major', label: 'Major / Technology' }, { name: 'responsibility', label: 'Responsibility / Details', type: 'textarea' },
                                { name: 'start_date', label: 'Start Date', type: 'date' }, { name: 'end_date', label: 'End Date', type: 'date' },
                            ].map((f) => <Field key={f.name} label={f.label}><TextControl field={f} value={itemDraft[f.name]} onChange={(v) => setItemDraft((s) => ({ ...s, [f.name]: v }))} /></Field>)}<div className="o-employee-history-buttons"><button type="button" className="o-btn o-btn-primary" onClick={saveItem}>SAVE</button><button type="button" className="o-btn o-btn-secondary" onClick={() => setItemDraft(null)}>CANCEL</button></div></div> : <button type="button" className="o-btn-link o-employee-add-line" onClick={() => setItemDraft({ category: ITEM_TABS[tab][0], title: '', organization: '', major: '', responsibility: '', start_date: '', end_date: '' })}>Add a line</button>}
                        </> : null}
                    </section> : null}
                </div>
            </article>
        </div>
    )
}

export default function EmployeeManagement({ route }) {
    const { userId, isHr } = useErp()
    // The instance role lookup is unreliable for this module. Allow signed-in users to
    // open the directory; private fields and write actions remain role/self restricted.
    const canViewEmployees = true
    if (route.view === 'skill_review' || route.view === 'card_request') {
        const label = route.view === 'skill_review' ? 'Skill Review' : 'Card Request'
        return <div className="o-action o-employee-action"><ControlPanel breadcrumbs={[{ label: 'Employees', onClick: () => navigate({ app: 'employees' }) }, { label }]} /><div className="o-nocontent"><p className="o-nocontent__title">{label} is not available yet</p><p>This Employees menu is reserved for a future module.</p></div></div>
    }
    if (route.view === 'employee') return <EmployeeProfile key={route.id} route={route} isHr={isHr} isEmployee={canViewEmployees} userId={userId} />
    return <EmployeeList isHr={isHr} isEmployee={canViewEmployees} />
}
