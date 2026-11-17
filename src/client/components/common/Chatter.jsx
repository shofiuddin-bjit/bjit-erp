import React, { useCallback, useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { Avatar } from './ui'
import { table, uploadAttachment, listAttachments } from '../../services/api'
import { TABLES } from '../../utils/constants'
import { display, value } from '../../utils/fields'
import { useErp } from '../../context'

export const parseUtc = (v) => new Date(`${value(v).replace(' ', 'T')}Z`)

export const dayLabel = (date) => {
    const today = new Date()
    const y = new Date()
    y.setDate(today.getDate() - 1)
    if (date.toDateString() === today.toDateString()) return 'Today'
    if (date.toDateString() === y.toDateString()) return 'Yesterday'
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export function MessageList({ messages, emptyText, renderExtra }) {
    let lastDay = null
    if (!messages.length && emptyText) return <div className="o-thread-empty">{emptyText}</div>
    return (
        <div className="o-thread">
            {messages.map((m) => {
                const date = parseUtc(m.sys_created_on)
                const day = dayLabel(date)
                const sep = day !== lastDay
                lastDay = day
                const type = value(m.message_type)
                const author = display(m.author) || 'OdooBot'
                return (
                    <React.Fragment key={value(m.sys_id)}>
                        {sep ? (
                            <div className="o-thread-date">
                                <span>{day}</span>
                            </div>
                        ) : null}
                        <div className={`o-message o-message--${type}`}>
                            <Avatar name={author} size={36} status="online" />
                            <div className="o-message__core">
                                <div className="o-message__header">
                                    <strong>{author}</strong>
                                    <small>
                                        {' '}
                                        - {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        {type === 'note' ? ' (Note)' : ''}
                                    </small>
                                    {renderExtra ? renderExtra(m) : null}
                                </div>
                                {display(m.record_name) && m.showRecord ? <div className="o-message__record">{display(m.record_name)}</div> : null}
                                <div className="o-message__body">{display(m.body)}</div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            })}
        </div>
    )
}

export default function Chatter({ model, resId, recordName, notifyUserIds = [], refreshKey }) {
    const { user, userId, notify } = useErp()
    const [messages, setMessages] = useState([])
    const [attachments, setAttachments] = useState([])
    const [mode, setMode] = useState(null)
    const [body, setBody] = useState('')
    const fileRef = useRef(null)

    const load = useCallback(async () => {
        if (!resId) return
        try {
            const [msgs, atts] = await Promise.all([
                table(TABLES.message).list({
                    query: `model=${model}^res_id=${resId}^ORDERBYDESCsys_created_on`,
                    fields: 'sys_id,body,author,message_type,sys_created_on',
                    limit: 200,
                }),
                listAttachments(model, resId).catch(() => []),
            ])
            setMessages(msgs)
            setAttachments(atts)
        } catch (e) {
            notify(e.message, 'danger')
        }
    }, [model, resId, notify])

    useEffect(() => {
        load()
    }, [load, refreshKey])

    const post = async () => {
        if (!body.trim()) return
        try {
            const recipients = mode === 'comment' ? notifyUserIds.filter((id) => id && id !== userId) : []
            await table(TABLES.message).create({
                model,
                res_id: resId,
                record_name: recordName,
                body: body.trim(),
                message_type: mode,
                needaction: recipients.join(','),
            })
            setBody('')
            setMode(null)
            load()
        } catch (e) {
            notify(e.message, 'danger')
        }
    }

    const onFile = async (e) => {
        const file = e.target.files?.[0]
        e.target.value = ''
        if (!file) return
        try {
            await uploadAttachment(model, resId, file)
            notify(`${file.name} attached`, 'success')
            load()
        } catch (err) {
            notify(err.message, 'danger')
        }
    }

    const participants = new Set([...notifyUserIds.filter(Boolean), ...messages.map((m) => value(m.author)).filter(Boolean)])

    return (
        <section className="o-chatter" aria-label="Chatter">
            <div className="o-chatter-topbar">
                <button type="button" className={`o-chatter-tab ${mode === 'comment' || !resId ? 'is-primary' : ''}`} disabled={!resId} onClick={() => setMode(mode === 'comment' ? null : 'comment')}>
                    Send message
                </button>
                <button type="button" className={`o-chatter-tab ${mode === 'note' ? 'is-primary' : ''}`} disabled={!resId} onClick={() => setMode(mode === 'note' ? null : 'note')}>
                    Log note
                </button>
                <span className="o-chatter-topbar__spacer" />
                <button type="button" className="o-btn-link" title="Attach a file" aria-label="Attach a file" disabled={!resId} onClick={() => fileRef.current?.click()}>
                    <Icon name="clip" size={15} /> {attachments.length || ''}
                </button>
                <input ref={fileRef} type="file" hidden onChange={onFile} />
                <span className="o-chatter-followers" title="Followers">
                    <Icon name="user" size={14} /> {participants.size}
                </span>
            </div>
            {mode ? (
                <div className="o-composer">
                    <Avatar name={display(user.name)} size={36} />
                    <div className="o-composer__main">
                        <textarea
                            className="o-input"
                            rows={3}
                            autoFocus
                            aria-label={mode === 'note' ? 'Log an internal note' : 'Send a message to followers'}
                            placeholder={mode === 'note' ? 'Log an internal note...' : 'Send a message to followers...'}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.ctrlKey || e.metaKey) && post()}
                        />
                        <div>
                            <button type="button" className="o-btn o-btn-primary" onClick={post}>
                                {mode === 'note' ? 'Log' : 'Send'}
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
            {attachments.length ? (
                <ul className="o-attachments">
                    {attachments.map((a) => (
                        <li key={a.sys_id}>
                            <a href={`/sys_attachment.do?sys_id=${a.sys_id}`} target="_blank" rel="noreferrer">
                                <Icon name="clip" size={12} /> {a.file_name}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : null}
            {resId ? (
                <MessageList messages={messages} />
            ) : (
                <div className="o-thread">
                    <div className="o-thread-date">
                        <span>Today</span>
                    </div>
                    <div className="o-message">
                        <Avatar name={display(user.name)} size={36} status="online" />
                        <div className="o-message__core">
                            <div className="o-message__header">
                                <strong>{display(user.name).toUpperCase()}</strong>
                            </div>
                            <div className="o-message__body">Creating a new record...</div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
