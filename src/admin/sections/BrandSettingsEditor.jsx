import React from 'react';
import content from '../../data/deepDecorsContent.json';
import useSectionContent from '../useSectionContent';

export default function BrandSettingsEditor() {
  const { value, setValue, loading, saving, status, save } = useSectionContent('brand', content.brand);

  if (loading) return <div className="adm-loading-text">Loading…</div>;

  const set = (field) => (e) => setValue({ ...value, [field]: e.target.value });

  return (
    <div className="adm-panel dd-card">
      <div className="adm-panel-title">Brand &amp; Contact Details</div>

      <div className="adm-field">
        <label>Tagline</label>
        <input className="adm-input" value={value.tagline || ''} onChange={set('tagline')} />
      </div>

      <div className="adm-row">
        <div className="adm-field">
          <label>WhatsApp number (with country code, e.g. +91 98765 43210)</label>
          <input className="adm-input" value={value.whatsappNumber || ''} onChange={set('whatsappNumber')} />
        </div>
        <div className="adm-field">
          <label>WhatsApp link (wa.me URL)</label>
          <input className="adm-input" value={value.whatsapp || ''} onChange={set('whatsapp')} />
        </div>
      </div>

      <div className="adm-row">
        <div className="adm-field">
          <label>Instagram handle</label>
          <input className="adm-input" value={value.instagramHandle || ''} onChange={set('instagramHandle')} />
        </div>
        <div className="adm-field">
          <label>Instagram link</label>
          <input className="adm-input" value={value.instagram || ''} onChange={set('instagram')} />
        </div>
      </div>

      <div className="adm-row">
        <div className="adm-field">
          <label>Email</label>
          <input className="adm-input" value={value.email || ''} onChange={set('email')} />
        </div>
        <div className="adm-field">
          <label>Location</label>
          <input className="adm-input" value={value.location || ''} onChange={set('location')} />
        </div>
      </div>

      {status ? (
        <div className={status.type === 'error' ? 'adm-error' : 'adm-success'}>{status.text}</div>
      ) : null}

      <div className="adm-actions">
        <button type="button" className="dd-btn" onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  );
}
