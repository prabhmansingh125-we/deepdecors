import React, { useEffect, useState } from 'react';
import { listMedia, uploadMedia } from '../cms';

export default function MediaPicker({ label, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) return;
    let active = true;
    setLoading(true);
    listMedia().then((res) => {
      if (!active) return;
      setFiles(res.files);
      setError(res.error);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [open]);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const res = await uploadMedia(file);
    setUploading(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    setFiles((prev) => [{ name: file.name, url: res.url, createdAt: new Date().toISOString() }, ...prev]);
    onChange(res.url);
    setOpen(false);
  };

  return (
    <div className="adm-field">
      {label ? <label>{label}</label> : null}

      <div className="adm-picker-preview">
        {value ? (
          <img src={value} alt="" className="adm-picker-thumb" />
        ) : (
          <div className="adm-picker-thumb-empty">No image</div>
        )}
        <div className="adm-actions">
          <button type="button" className="dd-btn dd-btn--ghost" onClick={() => setOpen(true)}>
            Choose image
          </button>
          {value ? (
            <button type="button" className="dd-btn dd-btn--ghost" onClick={() => onChange('')}>
              Remove
            </button>
          ) : null}
        </div>
      </div>

      {open ? (
        <div className="adm-modal-overlay" onClick={() => setOpen(false)}>
          <div className="adm-modal dd-card" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-head">
              <div className="adm-panel-title" style={{ margin: 0 }}>
                Media Library
              </div>
              <button type="button" className="adm-btn-icon" onClick={() => setOpen(false)} aria-label="Close">
                ×
              </button>
            </div>

            <div className="adm-field">
              <label>Upload new image</label>
              <input
                className="adm-input"
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
              />
              {uploading ? <div className="adm-loading-text">Uploading…</div> : null}
              {error ? <div className="adm-error">{error}</div> : null}
            </div>

            {loading ? (
              <div className="adm-loading-text">Loading media…</div>
            ) : files.length === 0 ? (
              <div className="adm-empty-state">No images yet. Upload one above.</div>
            ) : (
              <div className="adm-media-grid">
                {files.map((f) => (
                  <div
                    key={f.name}
                    className={`adm-media-tile ${value === f.url ? 'is-selected' : ''}`}
                    onClick={() => {
                      onChange(f.url);
                      setOpen(false);
                    }}
                  >
                    <img src={f.url} alt="" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
