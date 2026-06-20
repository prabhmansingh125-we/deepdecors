import React from 'react';
import useDeepDecorsContent from '../data/useDeepDecorsContent';
import ImageAsset from './ImageAsset';
import './CustomerReviews.css';

function ReviewCard({ name, review, image }) {
  return (
    <div className="dd-review-card dd-card dd-glass-hover">
      <div className="dd-review-top">
        <div className="dd-review-avatar" aria-label={name ? `${name}'s photo` : 'Customer'}>
          {image ? (
            <ImageAsset src={image} alt={name} className="dd-review-avatar-img" />
          ) : (
            <div className="dd-review-avatar-initials">
              {name ? name.charAt(0).toUpperCase() : '✦'}
            </div>
          )}
        </div>
        <div>
          <div className="dd-review-name">{name || 'Happy Customer'}</div>
          <div className="dd-review-stars" aria-label="Five stars">★★★★★</div>
        </div>
      </div>
      <div className="dd-review-text">{review}</div>
    </div>
  );
}

export default function CustomerReviews() {
  const content = useDeepDecorsContent();
  const reviews = content?.reviews || [];

  return (
    <section id="reviews" className="dd-section" aria-label="Customer Reviews">
      <div className="dd-container">
        <div className="dd-kicker">CUSTOMER REVIEWS</div>
        <h2 className="dd-h2">Warm feedback, curated for trust.</h2>
        <p className="dd-sub">Real experiences from our customers across Amritsar and beyond.</p>

        <div className="dd-review-grid">
          {reviews.map((r, i) => (
            <ReviewCard key={i} name={r.name} review={r.review} image={r.image} />
          ))}
        </div>
      </div>
    </section>
  );
}
