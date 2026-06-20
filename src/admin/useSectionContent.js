import { useEffect, useState, useCallback } from 'react';
import { getSectionContent, saveSectionContent } from './cms';
import { useAdminAuth } from './AdminAuthContext';

export default function useSectionContent(sectionKey, fallback) {
  const { user } = useAdminAuth();
  const [value, setValue] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getSectionContent(sectionKey, fallback).then((data) => {
      if (!active) return;
      setValue(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
    // fallback is static per-call site, sectionKey drives reload
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionKey]);

  const save = useCallback(async () => {
    setSaving(true);
    setStatus(null);
    const res = await saveSectionContent(sectionKey, value, user?.id);
    setSaving(false);
    setStatus(res.error ? { type: 'error', text: res.error } : { type: 'ok', text: 'Saved. Live on the website now.' });
  }, [sectionKey, value, user]);

  return { value, setValue, loading, saving, status, save };
}
