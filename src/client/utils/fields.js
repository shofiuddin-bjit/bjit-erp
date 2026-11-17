export const display = (field) => {
    if (field === null || field === undefined) return ''
    if (typeof field !== 'object') return String(field)
    return field.display_value ?? ''
}

export const value = (field) => {
    if (field === null || field === undefined) return ''
    if (typeof field !== 'object') return String(field)
    return field.value ?? ''
}

export const num = (field) => {
    const n = parseFloat(value(field))
    return Number.isFinite(n) ? n : 0
}

// "2026-11-12" -> "11/12/2026" (Odoo en_US date format)
export const formatDate = (raw) => {
    const v = value(raw)
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(v)
    return m ? `${m[2]}/${m[3]}/${m[1]}` : v
}

export const todayIso = () => {
    const d = new Date()
    const pad = (n) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export const ref = (sysId, displayValue) => ({ value: sysId || '', display_value: displayValue || '' })

// Builds "CEO / Business Operation Office / ..." from dot-walked department.parent.* fields
export const DEPT_FIELDS = [
    'department',
    'department.parent',
    'department.parent.parent',
    'department.parent.parent.parent',
    'department.parent.parent.parent.parent',
]

export const departmentPath = (record, prefix = '') => {
    const parts = DEPT_FIELDS.map((f) => display(record?.[prefix + f])).filter(Boolean)
    return parts.reverse().join(' / ')
}

// "MD SHOFIUDDIN 11020" - prefix is a dot-walk path such as 'requester.'
export const userLabel = (record, prefix = '') =>
    [display(record?.[prefix + 'name']), display(record?.[prefix + 'employee_number'])].filter(Boolean).join(' ')
