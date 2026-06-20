import React from 'react';
import content from '../../data/deepDecorsContent.json';
import useSectionContent from '../useSectionContent';

export default function HeroEditor() {
  const { value, setValue, loading, saving, status, save } = useSectionContent('hero', content.hero);

  if (loading) return <div className="adm-loading-text">Loading…</div>;

  const set = (field) => (e) => setValue({ ...value, [field]: e.target.value });

  return (
    <div className="adm-panel dd-card">
      <div className="adm-panel-title">Hero Section</div>

      <div className="adm-field">
        <label>Kicker (small label above the title)</label>
        <input className="adm-input" value={value.kicker || ''} onChange={set('kicker')} />
      </div>

      <div className="adm-field">
        <label>Title</label>
        <input className="adm-input" value={value.title || ''} onChange={set('title')} />
      </div>

      <div className="adm-field">
        <label>Description</label>
        <textarea className="adm-textarea" value={value.description || ''} onChange={set('description')} />
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
