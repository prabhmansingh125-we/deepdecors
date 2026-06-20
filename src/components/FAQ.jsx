import React, { useState } from 'react';
import './FAQ.css';

function AccordionItem({ q, children, open, onToggle }) {
  return (
    <div className={`dd-acc-item ${open ? 'is-open' : ''}`}>
      <button className="dd-acc-btn" onClick={onToggle} aria-expanded={open}>
        <span>{q}</span>
        <span className="dd-acc-icon" aria-hidden="true">+</span>
      </button>
      <div className="dd-acc-panel" role="region" aria-label={q}>
        <div className="dd-acc-content">{children}</div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const items = [
    { q: 'How To Order?' , a: 'Choose a collection or start a custom order. Share occasion details and recipient preferences.' },
    { q: 'Can I Customise Gifts?' , a: 'Yes—customisation is at the heart of Deep Decors. Add themes, colours, and personalised elements.' },
    { q: 'Delivery Timeline?' , a: 'Timelines depend on the chosen creation and location. We’ll confirm the schedule during booking.' },
    { q: 'Bulk Orders?' , a: 'Bulk gifting is available for corporate and festive needs. Contact us to plan timelines and quantities.' },
    { q: 'Payment Methods?' , a: 'We accept UPI, bank transfers, and cash on delivery for local orders. Contact us for corporate billing options.' }
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="dd-section" aria-label="FAQ">
      <div className="dd-container">
        <div className="dd-kicker">FAQ</div>
        <h2 className="dd-h2">Questions, answered with clarity.</h2>

        <div className="dd-accordion" role="list">
          {items.map((it, idx) => (
            <AccordionItem
              key={it.q}
              q={it.q}
              open={idx === openIdx}
              onToggle={() => setOpenIdx((v) => (v === idx ? -1 : idx))}
            >{it.a}</AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
}

