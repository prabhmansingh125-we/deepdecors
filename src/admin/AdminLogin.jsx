import React, { useState } from 'react';
import { useAdminAuth } from './AdminAuthContext';

export default function AdminLogin() {
  const { signIn, configError } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const res = await signIn(email, password);
    setSubmitting(false);
    if (res.error) setError(res.error);
  };

  return (
    <div className="adm-login-wrap">
      <div className="adm-login-card dd-card">
        <div className="adm-login-mark">DEEP DECORS</div>
        <div className="adm-login-title">Owner Dashboard</div>
        <p className="adm-login-sub">Sign in to manage your website content.</p>

        {configError ? (
          <div className="adm-error">
            Supabase isn't configured yet. Copy <code>.env.example</code> to <code>.env</code>, fill in your
            project URL and anon key, then restart the dev server.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="adm-field">
              <label>Email</label>
              <input
                className="adm-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div className="adm-field">
              <label>Password</label>
              <input
                className="adm-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {error ? <div className="adm-error">{error}</div> : null}

            <button type="submit" className="dd-btn" style={{ width: '100%' }} disabled={submitting}>
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        )}

        <a className="adm-back-link" href="/">
          ← Back to website
        </a>
      </div>
    </div>
  );
}
