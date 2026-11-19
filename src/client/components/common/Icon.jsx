import React from 'react'

// Lightweight stroke icon set (24x24 viewBox) so the page has no external font dependency.
const P = {
    grid: <><rect x="3" y="3" width="5" height="5" /><rect x="10" y="3" width="5" height="5" /><rect x="17" y="3" width="4" height="5" /><rect x="3" y="10" width="5" height="5" /><rect x="10" y="10" width="5" height="5" /><rect x="17" y="10" width="4" height="5" /><rect x="3" y="17" width="5" height="4" /><rect x="10" y="17" width="5" height="4" /><rect x="17" y="17" width="4" height="4" /></>,
    chat: <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-.9L3 20l1.3-4A8 8 0 0 1 3 11.5 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    caretDown: <path d="M6 9l6 6 6-6" />,
    caretRight: <path d="M9 6l6 6-6 6" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
    filter: <path d="M3 4h18l-7 8.5V19l-4 2v-8.5z" />,
    layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
    star: <path d="M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.3L12 17.5 6.5 20.4l1-6.3L3 9.7l6.2-.9z" />,
    refresh: <><path d="M20 11a8 8 0 0 0-14.6-4.5L4 8" /><path d="M4 4v4h4" /><path d="M4 13a8 8 0 0 0 14.6 4.5L20 16" /><path d="M20 20v-4h-4" /></>,
    left: <path d="M15 6l-6 6 6 6" />,
    right: <path d="M9 6l6 6-6 6" />,
    upload: <><circle cx="12" cy="12" r="9" /><path d="M12 16V8M8.5 11.5L12 8l3.5 3.5" /></>,
    sliders: <path d="M4 7h10M18 7h2M4 17h4M12 17h8M14 5v4M8 15v4" />,
    cog: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" /></>,
    kanban: <><rect x="3" y="4" width="7" height="16" /><rect x="14" y="4" width="7" height="9" /></>,
    list: <path d="M4 6h16M4 12h16M4 18h16" />,
    pivot: <><rect x="3" y="3" width="18" height="18" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" /></>,
    cloud: <><path d="M7 18a5 5 0 0 1-.6-10A6 6 0 0 1 18 9a4.5 4.5 0 0 1-1 9z" /><path d="M12 16v-5M9.5 13.5L12 11l2.5 2.5" /></>,
    undo: <><path d="M4 9h11a5 5 0 0 1 0 10H8" /><path d="M8 5L4 9l4 4" /></>,
    clip: <path d="M21 11.5l-8.6 8.6a5.5 5.5 0 0 1-7.8-7.8l8.6-8.6a3.7 3.7 0 0 1 5.2 5.2l-8.6 8.6a1.8 1.8 0 0 1-2.6-2.6l7.9-7.9" />,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><circle cx="17" cy="9" r="2.5" /><path d="M16 14a5 5 0 0 1 6 5" /></>,
    inbox: <><path d="M3 13l3-8h12l3 8v6H3z" /><path d="M3 13h5l1 3h6l1-3h5" /></>,
    history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5M12 7v5l3 2" /></>,
    hash: <path d="M5 9h15M4 15h15M10 3L8 21M16 3l-2 18" />,
    plus: <path d="M12 5v14M5 12h14" />,
    check: <path d="M4 12l5 5L20 6" />,
    close: <path d="M6 6l12 12M18 6L6 18" />,
    send: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5M21 12H9" /></>,
    camera: <><path d="M3 8h4l2-3h6l2 3h4v11H3z" /><circle cx="12" cy="13" r="3.5" /></>,
    video: <><rect x="2" y="6" width="14" height="12" rx="2" /><path d="M16 10l6-3v10l-6-3" /></>,
    trash: <path d="M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3" />,
    copy: <><rect x="8" y="8" width="13" height="13" rx="2" /><path d="M16 8V4H3v13h5" /></>,
    pencil: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" /></>,
    download: <path d="M12 3v12M7 10l5 5 5-5M4 21h16" />,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
    card: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="11" r="2.5" /><path d="M5.5 17a3.5 3.5 0 0 1 7 0M15 9h3M15 13h3" /></>,
    gauge: <><path d="M3 17a9 9 0 1 1 18 0" /><path d="M12 17l4-6" /></>,
    money: <><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="3" /></>,
    puzzle: <path d="M10 3h4v3a2 2 0 1 0 4 0V6h3v5h-2a2 2 0 1 0 0 4h2v6h-5v-2a2 2 0 1 0-4 0v2H3v-6h2a2 2 0 1 0 0-4H3V6h7z" />,
    clipboard: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V2h6v2M9 10h6M9 14h6M9 18h4" /></>,
    medical: <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" />,
    report: <><path d="M6 3h9l4 4v14H6z" /><path d="M9 17v-3M12 17v-6M15 17v-4" /></>,
    cloudOnly: <path d="M7 18a5 5 0 0 1-.6-10A6 6 0 0 1 18 9a4.5 4.5 0 0 1-1 9z" />,
    coin: <><ellipse cx="12" cy="7" rx="8" ry="3" /><path d="M4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>,
    battery: <><rect x="2" y="7" width="17" height="10" rx="2" /><path d="M22 11v2M10 9l-2 3h4l-2 3" /></>,
    lifebuoy: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="M5.6 5.6l3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6" /></>,
    gate: <><rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 3v18M15 12h1" /></>,
    asset: <><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" strokeDasharray="3 2" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3" /></>,
    userClock: <><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 10-6.3" /><circle cx="17.5" cy="17.5" r="4.5" /><path d="M17.5 15.5v2l1.5 1" /></>,
    userCal: <><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 9-6.7" /><rect x="13" y="14" width="9" height="8" rx="1" /><path d="M13 17h9" /></>,
    utensils: <path d="M7 2v8a2 2 0 0 0 4 0V2M9 10v12M17 2c-2 0-3 3-3 7h3v13" />,
}

export default function Icon({ name, size = 16, className = '', strokeWidth = 2, title }) {
    return (
        <svg
            className={`o-icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden={title ? undefined : true}
            role={title ? 'img' : undefined}
        >
            {title ? <title>{title}</title> : null}
            {P[name]}
        </svg>
    )
}
