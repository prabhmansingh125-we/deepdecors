import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAdminAuth } from '../AdminAuthContext';

export default function RoleManagement() {
  const { user } = useAdminAuth();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingId, setSavingId] = useState(null);

  const refresh = async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('profiles')
      .select('id, email, role, created_at')
      .order('created_at', { ascending: true });
    if (err) setError(err.message);
    setProfiles(data || []);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const changeRole = async (id, role) => {
    setSavingId(id);
    const { error: err } = await supabase.from('profiles').update({ role }).eq('id', id);
    setSavingId(null);
    if (err) {
      setError(err.message);
      return;
    }
    setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, role } : p)));
  };

  return (
    <div className="adm-panel dd-card">
      <div className="adm-panel-title">Team &amp; Roles</div>
      <p className="adm-page-sub" style={{ marginTop: -8 }}>
        To add a teammate: create their login in Supabase (Dashboard → Authentication → Users → Add user),
        then assign their role here. Owners can edit everything and manage the team; staff can edit content
        but can't change roles.
      </p>

      {error ? <div className="adm-error">{error}</div> : null}

      {loading ? (
        <div className="adm-loading-text">Loading team…</div>
      ) : (
        profiles.map((p) => (
          <div className="adm-item-card" key={p.id}>
            <div className="adm-item-card-head" style={{ marginBottom: 0 }}>
              <div>
                <div>{p.email}</div>
                {p.id === user?.id ? (
                  <span className="adm-item-label">This is you</span>
                ) : null}
              </div>
              <select
                className="adm-select"
                style={{ width: 140 }}
                value={p.role}
                disabled={savingId === p.id}
                onChange={(e) => changeRole(p.id, e.target.value)}
              >
                <option value="owner">Owner</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
