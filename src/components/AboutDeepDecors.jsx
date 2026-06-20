import React from 'react';
import './AboutDeepDecors.css';

function Feature({ title, desc }) {
  return (
    <div className="dd-about-card dd-card dd-glass-hover">
      <div className="dd-about-title">{title}</div>
      <div className="dd-about-desc">{desc}</div>
    </div>
  );
}

export default function AboutDeepDecors() {
  const features = [
    { title: 'Premium Craftsmanship', desc: 'Luxury materials, refined finishing, and consistent quality.' },
    { title: 'Luxury Presentation', desc: 'Wrap with intention—details designed to be remembered.' },
    { title: 'Handcrafted Excellence', desc: 'Made with care for a premium unboxing experience.' },
    { title: 'Personalised Designs', desc: 'Custom details that match the occasion and the recipient.' },
    { title: 'Attention To Detail', desc: 'Every element—from ribbons to tags—is thoughtfully placed.' },
    { title: 'Customer Satisfaction', desc: 'Warm communication and a trustworthy delivery experience.' }
  ];

  return (
    <section id="about" className="dd-section" aria-label="About Deep Decors">
      <div className="dd-container">
        <div className="dd-kicker">ABOUT DEEP DECORS</div>
        <h2 className="dd-h2">A luxury brand built around the art of gifting.</h2>

        <div className="dd-about-split">
          <div className="dd-about-left">
            <p className="dd-sub">
              Deep Decors creates premium gifting and gift wrapping experiences with an elegant identity. We believe
              the smallest details create the strongest emotions.
            </p>

            <div className="dd-about-story dd-card">
              <div className="dd-about-story-kicker">Our Promise</div>
              <div className="dd-about-story-text">
                Timeless design. Warm care. Trusted delivery.
              </div>
              <div className="dd-divider" />
              <div className="dd-about-story-meta">
                For occasions that deserve more than “just a gift”.
              </div>
            </div>
          </div>

          <div className="dd-about-right">
            <div className="dd-grid dd-about-grid">
              {features.map((f) => (
                <Feature key={f.title} title={f.title} desc={f.desc} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

