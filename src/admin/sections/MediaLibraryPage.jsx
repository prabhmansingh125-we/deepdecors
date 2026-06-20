import React, { useEffect, useState } from 'react';
import { listMedia, uploadMedia, deleteMedia } from '../cms';

export default function MediaLibraryPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedName, setCopiedName] = useState(null);

  const refresh = async () => {
    setLoading(true);
    const res = await listMedia();
    setFiles(res.files);
    setError(res.error);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

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
    refresh();
  };

  const handleDelete = async (name) => {
    await deleteMedia(name);
    refresh();
  };

  const handleCopy = async (url, name) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 1500);
    } catch {
      // clipboard API unavailable — silently ignore, URL is still visible on hover via title attr
    }
  };

  return (
    <div className="adm-panel dd-card">
      <div className="adm-panel-title">Media Library</div>
      <p className="adm-page-sub" style={{ marginTop: -8 }}>
        Upload product, gallery, and review photos here. You can also upload directly from the image picker
        inside Collections and Reviews.
      </p>

      <div className="adm-field">
        <label>Upload new image</label>
        <input className="adm-input" type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
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
            <div key={f.name} title={f.url}>
              <div className="adm-media-tile" onClick={() => handleCopy(f.url, f.name)}>
                <img src={f.url} alt="" />
                <button
                  type="button"
                  className="adm-media-tile-del"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(f.name);
                  }}
                  aria-label="Delete image"
                >
                  ×
                </button>
              </div>
              <div className="adm-loading-text" style={{ fontSize: 11, marginTop: 4 }}>
                {copiedName === f.name ? 'Link copied!' : 'Click to copy link'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
