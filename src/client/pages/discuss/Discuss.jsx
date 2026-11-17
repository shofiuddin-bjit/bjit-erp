import React, { useCallback, useEffect, useRef, useState } from 'react'
import Icon from '../../components/common/Icon'
import { Avatar, Dialog } from '../../components/common/ui'
import Many2One from '../../components/common/Many2One'
import { MessageList } from '../../components/common/Chatter'
import { table } from '../../services/api'
import { TABLES } from '../../utils/constants'
import { display, value } from '../../utils/fields'
import { navigate } from '../../utils/router'
import { useErp } from '../../context'

const MSG_FIELDS = 'sys_id,body,author,message_type,sys_created_on,record_name,model,res_id,needaction,starred_by,history_users,channel'
const ids = (field) => value(field).split(',').filter(Boolean)
const without = (field, id) => ids(field).filter((x) => x !== id).join(',')
const withId = (field, id) => [...new Set([...ids(field), id])].join(',')

const RECORD_ROUTES = {
    [TABLES.assetReq]: (id) => ({ app: 'asset', view: 'request', id }),
    [TABLES.ticket]: (id) => ({ app: 'support', view: 'form', id }),
}

const MAILBOXES = [
    { id: 'inbox', label: 'Inbox', icon: 'inbox' },
    { id: 'starred', label: 'Starred', icon: 'star' },
    { id: 'history', label: 'History', icon: 'history' },
]

export default function Discuss({ route }) {
    const { user, userId, notify } = useErp()
    const box = route.box || 'inbox'
    const channelId = route.channel
    const [channels, setChannels] = useState([])
    const [messages, setMessages] = useState([])
    const [body, setBody] = useState('')
    const [dialog, setDialog] = useState(null)
    const [newName, setNewName] = useState('')
    const [dmUser, setDmUser] = useState({ value: '', display_value: '' })
    const threadRef = useRef(null)
    const myName = display(user.name)

    const chatName = (c) => {
        const names = display(c.members).split(',').map((n) => n.trim()).filter((n) => n && n !== myName)
        return names.join(', ') || myName
    }

    const loadChannels = useCallback(async () => {
        try {
            setChannels(
                await table(TABLES.channel).list({
                    query: `is_public=true^channel_type=channel^NQmembersLIKE${userId}^ORDERBYname`,
                    fields: 'sys_id,name,description,channel_type,members,is_public',
                })
            )
        } catch (e) {
            notify(e.message, 'danger')
        }
    }, [userId, notify])

    const loadMessages = useCallback(async () => {
        const q = {
            inbox: `needactionLIKE${userId}^ORDERBYDESCsys_created_on`,
            starred: `starred_byLIKE${userId}^ORDERBYDESCsys_created_on`,
            history: `history_usersLIKE${userId}^ORDERBYDESCsys_created_on`,
            channel: `channel=${channelId}^ORDERBYsys_created_on`,
        }[box]
        if (!q || (box === 'channel' && !channelId)) return setMessages([])
        try {
            setMessages((await table(TABLES.message).list({ query: q, fields: MSG_FIELDS, limit: 200 })).map((m) => ({ ...m, showRecord: box !== 'channel' })))
        } catch (e) {
            notify(e.message, 'danger')
        }
    }, [box, channelId, userId, notify])

    useEffect(() => {
        loadChannels()
    }, [loadChannels])
    useEffect(() => {
        loadMessages()
    }, [loadMessages])
    useEffect(() => {
        if (box === 'channel' && threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight
    }, [messages, box])

    const update = async (m, data) => {
        try {
            await table(TABLES.message).update(value(m.sys_id), data)
            await loadMessages()
            window.dispatchEvent(new Event('erp:inbox-changed'))
        } catch (e) {
            notify(e.message, 'danger')
        }
    }
    const markRead = (m) => update(m, { needaction: without(m.needaction, userId), history_users: withId(m.history_users, userId) })
    const markAllRead = async () => {
        for (const m of messages) {
            await table(TABLES.message).update(value(m.sys_id), { needaction: without(m.needaction, userId), history_users: withId(m.history_users, userId) }).catch(() => null)
        }
        loadMessages()
        window.dispatchEvent(new Event('erp:inbox-changed'))
    }
    const toggleStar = (m) => {
        const starred = ids(m.starred_by).includes(userId)
        update(m, { starred_by: starred ? without(m.starred_by, userId) : withId(m.starred_by, userId) })
    }

    const current = channels.find((c) => value(c.sys_id) === channelId)

    const post = async () => {
        if (!body.trim() || !current) return
        try {
            const others = value(current.channel_type) === 'chat' ? ids(current.members).filter((id) => id !== userId) : []
            await table(TABLES.message).create({ channel: channelId, body: body.trim(), message_type: 'comment', record_name: display(current.name), needaction: others.join(',') })
            setBody('')
            loadMessages()
        } catch (e) {
            notify(e.message, 'danger')
        }
    }

    const createChannel = async (e) => {
        e.preventDefault()
        if (!newName.trim()) return
        try {
            const c = await table(TABLES.channel).create({ name: newName.trim(), channel_type: 'channel', is_public: true, members: userId })
            setDialog(null)
            setNewName('')
            await loadChannels()
            navigate({ app: 'discuss', box: 'channel', channel: value(c.sys_id) })
        } catch (err) {
            notify(err.message, 'danger')
        }
    }

    const openChat = async (otherId, otherName, name) => {
        const existing = channels.find((c) => {
            const m = ids(c.members)
            return value(c.channel_type) === 'chat' && m.includes(userId) && m.includes(otherId) && m.length === (otherId === userId ? 1 : 2)
        })
        try {
            const c =
                existing ||
                (await table(TABLES.channel).create({
                    name: name || [myName, otherName].filter((v, i, a) => a.indexOf(v) === i).join(', '),
                    channel_type: 'chat',
                    is_public: false,
                    members: [...new Set([userId, otherId])].join(','),
                }))
            setDialog(null)
            await loadChannels()
            navigate({ app: 'discuss', box: 'channel', channel: value(c.sys_id) })
        } catch (err) {
            notify(err.message, 'danger')
        }
    }

    const startMeeting = async () => {
        try {
            const c = await table(TABLES.channel).create({ name: `Meeting - ${myName}`, channel_type: 'chat', is_public: false, members: userId })
            await table(TABLES.message).create({ channel: value(c.sys_id), body: `${myName} started a meeting.`, message_type: 'notification' })
            await loadChannels()
            navigate({ app: 'discuss', box: 'channel', channel: value(c.sys_id) })
        } catch (err) {
            notify(err.message, 'danger')
        }
    }

    const publicChannels = channels.filter((c) => value(c.channel_type) === 'channel')
    const chats = channels.filter((c) => value(c.channel_type) === 'chat')
    const header = box === 'channel' ? current : MAILBOXES.find((b) => b.id === box)

    const extra = (m) => (
        <span className="o-message__actions">
            {m.model && RECORD_ROUTES[value(m.model)] && value(m.res_id) ? (
                <button type="button" className="o-btn-link" title="Open document" onClick={() => navigate(RECORD_ROUTES[value(m.model)](value(m.res_id)))}>
                    {display(m.record_name)}
                </button>
            ) : null}
            <button type="button" className={`o-btn-link ${ids(m.starred_by).includes(userId) ? 'is-starred' : ''}`} title="Mark as Todo" aria-label="Star" onClick={() => toggleStar(m)}>
                <Icon name="star" size={13} />
            </button>
            {box === 'inbox' ? (
                <button type="button" className="o-btn-link" title="Mark as Read" aria-label="Mark as read" onClick={() => markRead(m)}>
                    <Icon name="check" size={13} />
                </button>
            ) : null}
        </span>
    )

    const empty = {
        inbox: (
            <>
                <h4>Congratulations, your inbox is empty</h4>
                <p>New messages appear here.</p>
            </>
        ),
        starred: (
            <>
                <h4>No starred messages</h4>
                <p>You can mark any message as 'starred', and it shows up in this mailbox.</p>
            </>
        ),
        history: (
            <>
                <h4>No history messages</h4>
                <p>Messages marked as read will appear in the history.</p>
            </>
        ),
        channel: (
            <>
                <h4>There are no messages in this conversation.</h4>
            </>
        ),
    }[box]

    return (
        <div className="o-discuss">
            <aside className="o-discuss-sidebar">
                <div className="o-discuss-sidebar__start">
                    <button type="button" className="o-btn o-btn-primary" onClick={startMeeting}>
                        START A MEETING
                    </button>
                </div>
                <ul className="o-discuss-mailboxes">
                    {MAILBOXES.map((b) => (
                        <li key={b.id}>
                            <button type="button" className={`o-discuss-item ${box === b.id ? 'is-active' : ''}`} onClick={() => navigate({ app: 'discuss', box: b.id })}>
                                <Icon name={b.icon} size={14} /> {b.label}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="o-discuss-category">
                    <span>
                        <Icon name="caretDown" size={10} strokeWidth={3} /> CHANNELS
                    </span>
                    <span>
                        <button type="button" className="o-btn-link" title="Browse channels" aria-label="Browse channels" onClick={() => setDialog('browse')}>
                            <Icon name="cog" size={13} />
                        </button>
                        <button type="button" className="o-btn-link" title="Add or join a channel" aria-label="Add channel" onClick={() => setDialog('channel')}>
                            <Icon name="plus" size={13} strokeWidth={3} />
                        </button>
                    </span>
                </div>
                <ul>
                    {publicChannels.map((c) => (
                        <li key={value(c.sys_id)}>
                            <button
                                type="button"
                                className={`o-discuss-item o-discuss-channel ${channelId === value(c.sys_id) ? 'is-active' : ''}`}
                                onClick={() => navigate({ app: 'discuss', box: 'channel', channel: value(c.sys_id) })}
                            >
                                <span className="o-channel-avatar">
                                    <Icon name="hash" size={16} strokeWidth={2.6} />
                                </span>
                                <strong>{display(c.name)}</strong>
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="o-discuss-category">
                    <span>
                        <Icon name="caretDown" size={10} strokeWidth={3} /> DIRECT MESSAGES
                    </span>
                    <button type="button" className="o-btn-link" title="Start a conversation" aria-label="Start a conversation" onClick={() => setDialog('chat')}>
                        <Icon name="plus" size={13} strokeWidth={3} />
                    </button>
                </div>
                <ul>
                    {chats.map((c) => (
                        <li key={value(c.sys_id)}>
                            <button
                                type="button"
                                className={`o-discuss-item o-discuss-channel ${channelId === value(c.sys_id) ? 'is-active' : ''}`}
                                onClick={() => navigate({ app: 'discuss', box: 'channel', channel: value(c.sys_id) })}
                            >
                                <Avatar name={chatName(c)} size={30} status="online" />
                                <span>{display(c.name).startsWith('Meeting') ? display(c.name) : chatName(c)}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>
            <section className="o-discuss-content">
                <header className="o-discuss-header">
                    <h2>
                        {box === 'channel' ? (
                            current ? (
                                <>
                                    {value(current.channel_type) === 'chat' ? <Avatar name={chatName(current)} size={22} /> : <Icon name="hash" size={15} />}{' '}
                                    {value(current.channel_type) === 'chat' && !display(current.name).startsWith('Meeting') ? chatName(current) : display(current.name)}
                                    {display(current.description) ? <small className="o-discuss-header__desc">{display(current.description)}</small> : null}
                                </>
                            ) : (
                                'Channel'
                            )
                        ) : (
                            <>
                                <Icon name={header.icon} size={15} /> {header.label}
                            </>
                        )}
                    </h2>
                    {box === 'inbox' ? (
                        <button type="button" className="o-btn o-btn-secondary-light" disabled={!messages.length} onClick={markAllRead}>
                            MARK ALL READ
                        </button>
                    ) : null}
                </header>
                <div className="o-discuss-thread" ref={threadRef}>
                    {messages.length ? <MessageList messages={messages} renderExtra={extra} /> : <div className="o-discuss-empty">{empty}</div>}
                </div>
                {box === 'channel' && current ? (
                    <div className="o-discuss-composer">
                        <Avatar name={myName} size={36} />
                        <textarea
                            className="o-input"
                            rows={2}
                            aria-label="Write a message"
                            placeholder={`Message #${display(current.name)}...`}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    post()
                                }
                            }}
                        />
                        <button type="button" className="o-btn o-btn-primary" aria-label="Send" onClick={post}>
                            <Icon name="send" size={15} />
                        </button>
                    </div>
                ) : null}
            </section>

            {dialog === 'channel' ? (
                <Dialog
                    title="Create a channel"
                    onClose={() => setDialog(null)}
                    footer={
                        <button type="submit" form="o-new-channel" className="o-btn o-btn-primary">
                            Create
                        </button>
                    }
                >
                    <form id="o-new-channel" onSubmit={createChannel}>
                        <label className="o-label" htmlFor="o-channel-name">
                            Channel name
                        </label>
                        <input id="o-channel-name" className="o-input" autoFocus value={newName} onChange={(e) => setNewName(e.target.value)} />
                    </form>
                </Dialog>
            ) : null}
            {dialog === 'chat' ? (
                <Dialog
                    title="Start a conversation"
                    onClose={() => setDialog(null)}
                    footer={
                        <button type="button" className="o-btn o-btn-primary" disabled={!dmUser.value} onClick={() => openChat(dmUser.value, dmUser.display_value)}>
                            Open chat
                        </button>
                    }
                >
                    <label className="o-label" htmlFor="o-dm-user">
                        Employee
                    </label>
                    <Many2One id="o-dm-user" tableName="sys_user" query="active=true" searchFields={['name', 'email']} value={dmUser} onChange={setDmUser} />
                </Dialog>
            ) : null}
            {dialog === 'browse' ? (
                <Dialog title="Channels" onClose={() => setDialog(null)} footer={null}>
                    <ul className="o-browse-channels">
                        {publicChannels.map((c) => (
                            <li key={value(c.sys_id)}>
                                <button
                                    type="button"
                                    className="o-btn-link"
                                    onClick={() => {
                                        setDialog(null)
                                        navigate({ app: 'discuss', box: 'channel', channel: value(c.sys_id) })
                                    }}
                                >
                                    # {display(c.name)}
                                </button>
                                <small>{display(c.description)}</small>
                            </li>
                        ))}
                    </ul>
                </Dialog>
            ) : null}
        </div>
    )
}
