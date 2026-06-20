import React from 'react';
import ImageAsset from './ImageAsset';
import useDeepDecorsContent from '../data/useDeepDecorsContent';
import './InstagramGallery.css';

function InstaTile({ image, label, index }) {
  return (
    <div className="dd-insta-tile dd-card dd-glass-hover" aria-label={label}>
      <div className="dd-insta-img">
        {image ? (
          <ImageAsset src={image} alt={label} className="dd-insta-img-img" />
        ) : (
          <>
            <div className="dd-insta-placeholder-num">0{index + 1}</div>
            <span className="dd-insta-label">Add Photo</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function InstagramGallery() {
  const content = useDeepDecorsContent();
  const brand = content?.brand || {};
  const tiles = content?.instagram?.length
    ? content.instagram
    : ['Post 1', 'Post 2', 'Post 3', 'Post 4', 'Post 5', 'Post 6'].map((label) => ({ label }));

  return (
    <section className="dd-section" aria-label="Instagram Gallery">
      <div className="dd-container">
        <div className="dd-kicker">INSTAGRAM GALLERY</div>
        <h2 className="dd-h2">Luxury previews from our wrapping universe.</h2>
        <p className="dd-sub">
          Follow us at{' '}
          <a className="dd-link" href={brand.instagram} target="_blank" rel="noreferrer">
            {brand.instagramHandle}
          </a>{' '}
          for daily inspiration and behind-the-scenes looks.
        </p>

        <div className="dd-insta-grid">
          {tiles.map((t, i) => (
            <InstaTile key={t.image || t.label || i} image={t.image} label={t.label || `Post ${i + 1}`} index={i} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <a
            className="dd-btn dd-btn--ghost"
            href={brand.instagram}
            target="_blank"
            rel="noreferrer"
          >
            Follow on Instagram <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
