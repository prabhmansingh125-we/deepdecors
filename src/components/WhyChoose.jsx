import React from 'react';
import './WhyChoose.css';

function ChoiceCard({ num, title, desc }) {
  return (
    <div className="dd-why-card dd-card dd-glass-hover">
      <div className="dd-why-num">{num}</div>
      <div className="dd-why-title">{title}</div>
      <div className="dd-why-desc">{desc}</div>
    </div>
  );
}

export default function WhyChoose() {
  const items = [
    { num: '01', title: 'Premium Quality', desc: 'Luxury-grade materials and refined finishing for lasting impact.' },
    { num: '02', title: 'Fully Customised', desc: 'Personalised gifting built around your vision and occasion.' },
    { num: '03', title: 'Elegant Packaging', desc: 'Glass-level presentation with warm, unforgettable details.' },
    { num: '04', title: 'Timely Delivery', desc: 'Trustworthy timelines—because your moment can’t wait.' }
  ];

  return (
    <section className="dd-section" aria-label="Why Choose Deep Decors">
      <div className="dd-container">
        <div className="dd-kicker">WHY CHOOSE DEEP DECORS</div>
        <h2 className="dd-h2">A better way to gift—crafted with confidence.</h2>

        <div className="dd-grid dd-why-grid">
          {items.map((it) => (
            <ChoiceCard key={it.num} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}

