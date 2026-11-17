import { authOptions } from './auth'

export class ApiError extends Error {}

async function request(path, { method = 'GET', body } = {}) {
    const { headers, credentials } = authOptions()
    const res = await fetch(path, {
        method,
        credentials,
        headers: {
            Accept: 'application/json',
            ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
            ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    })
    if (res.status === 401) {
        window.dispatchEvent(new Event('erp:unauthorized'))
        throw new ApiError('Your session has expired. Please log in again.')
    }
    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        const detail = err.error?.detail && err.error.detail !== err.error?.message ? ` ${err.error.detail}` : ''
        throw new ApiError(`${err.error?.message || `Request failed (HTTP ${res.status})`}${detail}`)
    }
    if (res.status === 204) return { result: null, total: 0 }
    const json = await res.json()
    return { result: json.result, total: parseInt(res.headers.get('X-Total-Count') || '0', 10) }
}

export function table(name) {
    const base = `/api/now/table/${name}`
    return {
        async list({ query = '', fields, limit = 1000, offset = 0 } = {}) {
            const qs = new URLSearchParams({
                sysparm_display_value: 'all',
                sysparm_exclude_reference_link: 'true',
                sysparm_limit: String(limit),
                sysparm_offset: String(offset),
            })
            if (query) qs.set('sysparm_query', query)
            if (fields) qs.set('sysparm_fields', fields)
            const { result } = await request(`${base}?${qs}`)
            return result || []
        },
        async get(sysId, fields) {
            const qs = new URLSearchParams({ sysparm_display_value: 'all', sysparm_exclude_reference_link: 'true' })
            if (fields) qs.set('sysparm_fields', fields)
            return (await request(`${base}/${sysId}?${qs}`)).result
        },
        async create(data) {
            return (await request(`${base}?sysparm_display_value=all&sysparm_exclude_reference_link=true`, { method: 'POST', body: data })).result
        },
        async update(sysId, data) {
            return (await request(`${base}/${sysId}?sysparm_display_value=all&sysparm_exclude_reference_link=true`, { method: 'PATCH', body: data })).result
        },
        async remove(sysId) {
            await request(`${base}/${sysId}`, { method: 'DELETE' })
            return true
        },
    }
}

export async function uploadAttachment(tableName, sysId, file) {
    const { headers, credentials } = authOptions()
    const qs = new URLSearchParams({ table_name: tableName, table_sys_id: sysId, file_name: file.name })
    const res = await fetch(`/api/now/attachment/file?${qs}`, {
        method: 'POST',
        credentials,
        headers: { Accept: 'application/json', 'Content-Type': file.type || 'application/octet-stream', ...headers },
        body: file,
    })
    if (!res.ok) throw new ApiError(`Upload failed (HTTP ${res.status})`)
    return (await res.json()).result
}

export async function listAttachments(tableName, sysId) {
    const qs = new URLSearchParams({ sysparm_query: `table_name=${tableName}^table_sys_id=${sysId}`, sysparm_fields: 'sys_id,file_name,size_bytes' })
    const { result } = await request(`/api/now/attachment?${qs}`)
    return result || []
}
