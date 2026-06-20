import React, { useEffect, useRef, useState } from 'react';

/**
 * HeroSlider
 * Renders inside the existing .dd-hero-composition glass frame.
 * Each slide ships a desktop crop + a mobile crop (see <picture>),
 * generated from the real product photography in public/assets/img/hero.
 */
export default function HeroSlider({ slides, reduced = false, interval = 4800 }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || slides.length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(timerRef.current);
  }, [reduced, paused, slides.length, interval]);

  if (!slides || slides.length === 0) return null;

  return (
    <div
      className="dd-hero-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Featured gift wrapping photos"
    >
      {slides.map((slide, idx) => (
        <picture key={slide.desktop} className={`dd-hero-slide ${idx === active ? 'is-active' : ''}`}>
          <source media="(max-width: 720px)" srcSet={slide.mobile} />
          <img
            src={slide.desktop}
            alt={slide.alt || ''}
            loading={idx === 0 ? 'eager' : 'lazy'}
            className="dd-hero-slide-img"
          />
        </picture>
      ))}

      {slides.length > 1 ? (
        <div className="dd-hero-slider-dots" role="tablist" aria-label="Choose a slide">
          {slides.map((slide, idx) => (
            <button
              key={slide.desktop}
              type="button"
              role="tab"
              aria-selected={idx === active}
              aria-label={`Show slide ${idx + 1}`}
              className={`dd-hero-slider-dot ${idx === active ? 'is-active' : ''}`}
              onClick={() => setActive(idx)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
