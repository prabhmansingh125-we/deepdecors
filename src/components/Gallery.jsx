import React from 'react';
import ImageAsset from './ImageAsset';
import useDeepDecorsContent from '../data/useDeepDecorsContent';
import './Gallery.css';

function GalleryTile({ image, label }) {
  return (
    <div className="dd-gallery-tile dd-card dd-glass-hover" aria-label={label}>
      <div className="dd-gallery-img">
        {image ? (
          <ImageAsset src={image} alt={label} className="dd-gallery-img-img" />
        ) : (
          <span className="dd-gallery-img-label">{label}</span>
        )}
      </div>
      <div className="dd-gallery-meta">
        <div className="dd-gallery-title">Luxury Wrapped Moments</div>
        <div className="dd-gallery-sub">{label}</div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const content = useDeepDecorsContent();
  const tiles = content?.gallery?.length
    ? content.gallery
    : [
        { label: 'Gallery Image 01' },
        { label: 'Gallery Image 02' },
        { label: 'Gallery Image 03' },
        { label: 'Gallery Image 04' },
        { label: 'Gallery Image 05' },
        { label: 'Gallery Image 06' },
        { label: 'Gallery Image 07' },
        { label: 'Gallery Image 08' }
      ];

  return (
    <section id="gallery" className="dd-section" aria-label="Gallery">
      <div className="dd-container">
        <div className="dd-kicker">LUXURY GALLERY</div>
        <h2 className="dd-h2">A premium visual experience—before the unboxing.</h2>
        <p className="dd-sub">
          A look at recent Deep Decors creations—real hampers, real wrapping, real detail.
        </p>

        <div className="dd-gallery">
          {tiles.map((t, idx) => (
            <GalleryTile key={t.image || t.label || idx} image={t.image} label={t.label || `Gallery Image ${idx + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
