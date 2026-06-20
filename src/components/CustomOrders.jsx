import React from 'react';
import useDeepDecorsContent from '../data/useDeepDecorsContent';
import './CustomOrders.css';

export default function CustomOrders() {
  const content = useDeepDecorsContent();
  const brand = content?.brand || {};

  return (
    <section id="custom-orders" className="dd-section" aria-label="Custom Orders">
      <div className="dd-container">
        <div className="dd-custom-cta dd-card">
          <div className="dd-custom-left">
            <div className="dd-kicker">CUSTOM ORDERS</div>
            <h2 className="dd-h2" style={{ marginTop: 14 }}>
              Have Something Unique In Mind?
            </h2>
            <p className="dd-sub" style={{ marginTop: 12 }}>
              Tell us the occasion, the vibe, and the details. We'll craft a premium gifting experience—wrapped with
              intention and delivered with care.
            </p>

            <div className="dd-custom-actions">
              <a className="dd-btn dd-btn--primary" href="#contact">
                Start Custom Order <span aria-hidden="true">→</span>
              </a>
              <a className="dd-btn dd-btn--ghost" href={brand.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="dd-custom-right" aria-hidden="true">
            <div className="dd-custom-glass" />
            <div className="dd-custom-badge">
              <div className="dd-custom-badge-title">Deep Decors</div>
              <div className="dd-custom-badge-sub">Premium Gifting • Better Experience</div>
            </div>
            <div className="dd-custom-orbs" />
          </div>
        </div>
      </div>
    </section>
  );
}
