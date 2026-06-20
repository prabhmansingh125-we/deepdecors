import React from 'react';
import content from '../../data/deepDecorsContent.json';
import useSectionContent from '../useSectionContent';
import MediaPicker from '../components/MediaPicker';

const BLANK_REVIEW = { name: '', review: '', image: null };

export default function ReviewsEditor() {
  const { value, setValue, loading, saving, status, save } = useSectionContent('reviews', content.reviews);

  if (loading) return <div className="adm-loading-text">Loading…</div>;

  const reviews = Array.isArray(value) ? value : [];

  const updateReview = (idx, field, val) => {
    setValue(reviews.map((r, i) => (i === idx ? { ...r, [field]: val } : r)));
  };

  const removeReview = (idx) => {
    setValue(reviews.filter((_, i) => i !== idx));
  };

  const addReview = () => {
    setValue([...reviews, { ...BLANK_REVIEW }]);
  };

  return (
    <div className="adm-panel dd-card">
      <div className="adm-panel-title">Customer Reviews</div>

      {reviews.map((r, idx) => (
        <div className="adm-item-card" key={idx}>
          <div className="adm-item-card-head">
            <span className="adm-item-label">Review {idx + 1}</span>
            <button type="button" className="adm-btn-icon" onClick={() => removeReview(idx)} aria-label="Remove review">
              ×
            </button>
          </div>

          <div className="adm-field">
            <label>Customer name</label>
            <input
              className="adm-input"
              value={r.name || ''}
              onChange={(e) => updateReview(idx, 'name', e.target.value)}
            />
          </div>

          <div className="adm-field">
            <label>Review text</label>
            <textarea
              className="adm-textarea"
              value={r.review || ''}
              onChange={(e) => updateReview(idx, 'review', e.target.value)}
            />
          </div>

          <MediaPicker
            label="Photo (optional — shows initials if left empty)"
            value={r.image}
            onChange={(url) => updateReview(idx, 'image', url)}
          />
        </div>
      ))}

      <div className="adm-actions" style={{ marginBottom: 20 }}>
        <button type="button" className="dd-btn dd-btn--ghost" onClick={addReview}>
          + Add review
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
