import React from 'react';
import ImageAsset from './ImageAsset';

/**
 * Product/collection card.
 * Image + text come from JSON content (owner-friendly).
 */
export default function PlaceholderCard({
  imageLabel = 'Product Image',
  imageSrc,
  title,
  pricePlaceholder = '<!-- Product Price -->',
  descriptionPlaceholder = '<!-- Product Description -->',
  ctaLabel = 'Explore'
}) {
  return (
    <div className="dd-collection-card dd-card dd-glass-hover">
      <div className="dd-collection-image" aria-label={imageLabel}>
        {/* Product Image */}
        {imageSrc ? (
          <ImageAsset src={imageSrc} alt={imageLabel} className="dd-collection-image-img" loading="lazy" />
        ) : null}
        <span className="dd-collection-image-label">{imageSrc ? '' : imageLabel}</span>
      </div>


      <div className="dd-collection-body">
        <div className="dd-collection-title">{title}</div>
        <div className="dd-collection-desc">{descriptionPlaceholder}</div>
        <div className="dd-collection-price">{pricePlaceholder}</div>

        <div className="dd-collection-cta">
          {/* Editorial note: price remains placeholder (no ecommerce pricing) */}
          <a className="dd-btn" href="#custom-orders">
            {ctaLabel} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}


