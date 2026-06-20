import React from 'react';
import content from '../../data/deepDecorsContent.json';
import useSectionContent from '../useSectionContent';
import MediaPicker from '../components/MediaPicker';

const BLANK_ITEM = { title: '', description: '', price: '', cta: 'Explore', image: null };

export default function CollectionsEditor() {
  const { value, setValue, loading, saving, status, save } = useSectionContent(
    'featuredCollections',
    content.featuredCollections
  );

  if (loading) return <div className="adm-loading-text">Loading…</div>;

  const items = value.items || [];

  const updateItem = (idx, field, val) => {
    const next = items.map((it, i) => (i === idx ? { ...it, [field]: val } : it));
    setValue({ ...value, items: next });
  };

  const removeItem = (idx) => {
    setValue({ ...value, items: items.filter((_, i) => i !== idx) });
  };

  const addItem = () => {
    setValue({ ...value, items: [...items, { ...BLANK_ITEM }] });
  };

  return (
    <div className="adm-panel dd-card">
      <div className="adm-panel-title">Featured Collections</div>

      {items.map((item, idx) => (
        <div className="adm-item-card" key={idx}>
          <div className="adm-item-card-head">
            <span className="adm-item-label">Item {idx + 1}</span>
            <button type="button" className="adm-btn-icon" onClick={() => removeItem(idx)} aria-label="Remove item">
              ×
            </button>
          </div>

          <div className="adm-field">
            <label>Title</label>
            <input
              className="adm-input"
              value={item.title || ''}
              onChange={(e) => updateItem(idx, 'title', e.target.value)}
            />
          </div>

          <div className="adm-field">
            <label>Description</label>
            <textarea
              className="adm-textarea"
              value={item.description || ''}
              onChange={(e) => updateItem(idx, 'description', e.target.value)}
            />
          </div>

          <div className="adm-row">
            <div className="adm-field">
              <label>Price label</label>
              <input
                className="adm-input"
                value={item.price || ''}
                onChange={(e) => updateItem(idx, 'price', e.target.value)}
              />
            </div>
            <div className="adm-field">
              <label>Button text</label>
              <input
                className="adm-input"
                value={item.cta || ''}
                onChange={(e) => updateItem(idx, 'cta', e.target.value)}
              />
            </div>
          </div>

          <MediaPicker
            label="Image"
            value={item.image}
            onChange={(url) => updateItem(idx, 'image', url)}
          />
        </div>
      ))}

      <div className="adm-actions" style={{ marginBottom: 20 }}>
        <button type="button" className="dd-btn dd-btn--ghost" onClick={addItem}>
          + Add collection
        </button>
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
