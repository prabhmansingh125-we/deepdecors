import React, { useEffect, useMemo, useRef, useState } from 'react';
import './SignatureExperience.css';

function Step({ index, title, desc, active }) {
  return (
    <div className={`dd-step ${active ? 'is-active' : ''}`}>
      <div className="dd-step-dot" aria-hidden="true" />
      <div className="dd-step-num">{String(index + 1).padStart(2, '0')}</div>
      <div className="dd-step-title">{title}</div>
      <div className="dd-step-desc">{desc}</div>
    </div>
  );
}

export default function SignatureExperience() {
  const steps = useMemo(
    () => [
      { title: 'Choose', desc: 'Select the mood, occasion, and gifting category that fits the moment.' },
      { title: 'Customise', desc: 'Personalise details—so the gift feels made for them.' },
      { title: 'Craft', desc: 'Luxury wrapping, refined textures, and careful placement come together.' },
      { title: 'Deliver', desc: 'Timely, trustworthy execution—your experience arrives beautifully.' },
      { title: 'Celebrate', desc: 'The unboxing moment becomes the memory.' }
    ],
    []
  );

  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (!entry.isIntersecting) return;

        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const t = 1 - Math.max(0, Math.min(1, (rect.top + rect.height) / (vh * 1.15)));
        const idx = Math.round(t * (steps.length - 1));
        setActiveIdx(idx);
      },
      { threshold: 0.18 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [steps.length]);

  return (
    <section ref={sectionRef} className="dd-section" aria-label="Signature Experience">
      <div className="dd-container">
        <div className="dd-kicker">SIGNATURE EXPERIENCE</div>
        <h2 className="dd-h2">Choose. Customise. Craft. Deliver. Celebrate.</h2>

        <div className="dd-timeline">
          <div className="dd-timeline-line" aria-hidden="true">
            <span className="dd-timeline-progress" style={{ width: `${(activeIdx / (steps.length - 1)) * 100}%` }} />
          </div>

          <div className="dd-timeline-grid">
            {steps.map((s, i) => (
              <Step key={s.title} index={i} title={s.title} desc={s.desc} active={i <= activeIdx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

