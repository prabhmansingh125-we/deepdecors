import React from 'react';
import PlaceholderCard from './PlaceholderCard';

import useDeepDecorsContent from '../data/useDeepDecorsContent';
import './FeaturedCollections.css';

export default function FeaturedCollections() {
  const content = useDeepDecorsContent();
  const items = content?.featuredCollections?.items || [];

  return (
    <section id="collections" className="dd-section" aria-label="Featured Collections">
      <div className="dd-container">
        <div className="dd-kicker">FEATURED COLLECTIONS</div>
        <h2 className="dd-h2">Luxury collections. No clutter. Pure elegance.</h2>
        <p className="dd-sub">
          Browse the categories below—each creation is designed for premium gifting and an unforgettable wrapping
          experience.
        </p>

        <div className="dd-grid dd-collections">
          {items.map((it) => (
            <PlaceholderCard
              key={it.title}
              title={it.title}
              descriptionPlaceholder={it.description}
              pricePlaceholder={it.price}
              imageSrc={it.image}
              ctaLabel={it.cta || 'Explore'}
            />

          ))}
        </div>
      </div>
    </section>
  );
}


