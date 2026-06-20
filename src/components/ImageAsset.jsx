import React from 'react';

/**
 * Centralised image renderer to make swapping/replacing images easy.
 * Usage:
 * <ImageAsset src="assets/gallery/gallery_01.jpg" alt="..." className="..." />
 */
export default function ImageAsset({ src, alt, className = '', loading = 'lazy' }) {
  if (!src) return null;
  return <img className={className} src={src} alt={alt || ''} loading={loading} />;
}

