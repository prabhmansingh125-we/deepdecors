import React from 'react';
import { AdminAuthProvider, useAdminAuth } from './AdminAuthContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import './admin.css';

function AdminGate() {
  const { session, profile, loading, isStaffOrOwner, signOut } = useAdminAuth();

  if (loading) {
    return (
      <div className="adm-login-wrap">
        <div className="adm-loading-text">Loading…</div>
      </div>
    );
  }

  if (!session) {
    return <AdminLogin />;
  }

  // Signed in, but no profiles row found yet (RLS still syncing) or
  // explicitly not granted access. Shouldn't normally happen since every
  // new auth user gets a 'staff' profile automatically — but fail safely.
  if (!profile || !isStaffOrOwner) {
    return (
      <div className="adm-login-wrap">
        <div className="adm-login-card dd-card">
          <div className="adm-login-mark">DEEP DECORS</div>
          <div className="adm-login-title">No dashboard access</div>
          <p className="adm-login-sub">
            Your account is signed in but doesn't have a role assigned yet. Ask the site owner to grant you
            access from Team &amp; Roles, or check supabase/schema.sql if you're setting this up for the
            first time.
          </p>
          <button type="button" className="dd-btn" style={{ width: '100%' }} onClick={signOut}>
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <AdminGate />
    </AdminAuthProvider>
  );
}
