import React, { useState } from 'react'
import Icon from '../components/common/Icon'
import { login } from '../services/auth'

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)

    const submit = async (e) => {
        e.preventDefault()
        setError('')
        setBusy(true)
        try {
            onLogin(await login(email, password))
        } catch (err) {
            setError(err.message)
            setBusy(false)
        }
    }

    return (
        <div className="o-login-page">
            <header className="o-login-header">
                <span className="o-login-logo" aria-label="Company logo">
                    <Icon name="camera" size={34} strokeWidth={1.6} />
                    <span className="o-login-logo__plus">+</span>
                </span>
                <nav>
                    <a className="o-login-header__signin" href={window.location.pathname}>
                        Sign in
                    </a>
                    <a className="o-login-header__contact" href="mailto:info@bjitgroup.com">
                        Contact Us
                    </a>
                </nav>
            </header>
            <main className="o-login-main">
                <form className="o-login-form" onSubmit={submit} noValidate>
                    <label htmlFor="login">Email</label>
                    <input id="login" type="text" autoComplete="username" placeholder="Email" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" autoComplete="current-password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error ? (
                        <p className="o-login-error" role="alert">
                            {error}
                        </p>
                    ) : null}
                    <button type="submit" className="o-login-btn" disabled={busy || !email || !password}>
                        {busy ? 'Logging in...' : 'Log in'}
                    </button>
                    <a className="o-login-reset" href="/$pwd_reset.do?sysparm_url=ss_default">
                        Reset Password
                    </a>
                </form>
            </main>
        </div>
    )
}
