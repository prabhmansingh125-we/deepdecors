import React, { useEffect, useMemo, useRef, useState } from 'react';
import ImageAsset from './ImageAsset';
import HeroSlider from './HeroSlider';
import useDeepDecorsContent from '../data/useDeepDecorsContent';
import './Hero.css';

function useMouseSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const state = { x: 50, y: 20 };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      state.x = Math.max(0, Math.min(100, x));
      state.y = Math.max(0, Math.min(100, y));
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${state.x}%`);
        el.style.setProperty('--my', `${state.y}%`);
        raf = 0;
      });
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
    };
  }, []);

  return ref;
}

function ParticleLayer() {
  const dots = useMemo(() => {
    const count = 34;
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 3.2 + 1.2}px`,
        opacity: Math.random() * 0.45 + 0.15,
        delay: Math.random() * 2.2,
        dur: Math.random() * 5 + 4
      });
    }
    return arr;
  }, []);

  return (
    <div className="dd-particles" aria-hidden="true">
      {dots.map((d, idx) => (
        <span
          key={idx}
          className="dd-particle"
          style={
            {
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
              opacity: d.opacity,
              animationDelay: `${d.delay}s`,
              animationDuration: `${d.dur}s`
            }
          }
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const spotlightRef = useMouseSpotlight();
  const [reduced, setReduced] = useState(false);
  const content = useDeepDecorsContent();
  const hero = content?.hero;


  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(Boolean(mq?.matches));
    onChange();
    mq?.addEventListener?.('change', onChange);
    return () => mq?.removeEventListener?.('change', onChange);
  }, []);

  return (
    <section id="home" className="dd-hero dd-section" aria-label="Hero">
      <div ref={spotlightRef} className="dd-hero-bg" aria-hidden="true">
        <div className="dd-hero-texture" />
        {!reduced ? <ParticleLayer /> : null}
        <div className="dd-hero-vignette" />

        {/* Replace Hero Background Image */}
        {/* Add your hero background image here via deepDecorsContent.json */}
        {hero?.assets?.compositionBg ? (
          <ImageAsset src={hero.assets.compositionBg} alt="" className="dd-hero-bg-img" loading="eager" />
        ) : null}

        <div className="dd-floating dd-f1" />
        <div className="dd-floating dd-f2" />
        <div className="dd-floating dd-f3" />
      </div>


      <div className="dd-container dd-hero-inner">
        <div className="dd-hero-left">
          <div className="dd-kicker">{hero?.kicker || 'PREMIUM GIFTING'}</div>
          <h1 className="dd-h1">{hero?.title || 'Every Gift Tells A Story.'}</h1>
          <p className="dd-hero-sub">
            {hero?.description ||
              "At Deep Decors, we believe gifting is more than an exchange—it's an experience. Every creation is crafted with elegance, attention to detail, and a touch of luxury to make every occasion unforgettable."}
          </p>


          <div className="dd-hero-actions">
            <a className="dd-btn dd-btn--primary" href="#collections">
              Explore Collection <span aria-hidden="true">→</span>
            </a>
            <a className="dd-btn dd-btn--ghost" href="#custom-orders">
              Custom Order
            </a>
          </div>

          <div className="dd-hero-highlights">
            <div className="dd-pill">
              <span aria-hidden="true">✦</span> Handcrafted
            </div>
            <div className="dd-pill">
              <span aria-hidden="true">✦</span> Luxury Presentation
            </div>
            <div className="dd-pill">
              <span aria-hidden="true">✦</span> Personalised Touch
            </div>
          </div>
        </div>

        <div className="dd-hero-right">
          <div className="dd-hero-composition" aria-label="Luxury gift hamper display">
            <div className="dd-comp-glass" />

            {hero?.assets?.slides?.length ? (
              <HeroSlider slides={hero.assets.slides} reduced={reduced} />
            ) : (
              <>
                {/* Replace Hero Composition Images */}
                {hero?.assets?.box ? (
                  <ImageAsset src={hero.assets.box} alt="" className="dd-comp-layer dd-box" aria-hidden="true" />
                ) : (
                  <div className="dd-box" aria-hidden="true">
                    <div className="dd-box-top" />
                    <div className="dd-box-body" />
                    <div className="dd-box-shadow" />
                  </div>
                )}

                {hero?.assets?.flowers ? (
                  <ImageAsset src={hero.assets.flowers} alt="" className="dd-comp-layer dd-flowers" aria-hidden="true" />
                ) : (
                  <div className="dd-flowers" aria-hidden="true" />
                )}

                {hero?.assets?.ribbon ? (
                  <ImageAsset src={hero.assets.ribbon} alt="" className="dd-comp-layer dd-ribbon" aria-hidden="true" />
                ) : (
                  <div className="dd-ribbon" aria-hidden="true" />
                )}

                {hero?.assets?.pearls ? (
                  <ImageAsset src={hero.assets.pearls} alt="" className="dd-comp-layer dd-pearls" aria-hidden="true" />
                ) : (
                  <div className="dd-pearls" aria-hidden="true" />
                )}

                {hero?.assets?.waxSeal ? (
                  <ImageAsset src={hero.assets.waxSeal} alt="" className="dd-comp-layer dd-wax-seal" aria-hidden="true" />
                ) : (
                  <div className="dd-wax-seal" aria-hidden="true" />
                )}

                {hero?.assets?.hamper ? (
                  <ImageAsset src={hero.assets.hamper} alt="" className="dd-comp-layer dd-hamper" aria-hidden="true" />
                ) : (
                  <div className="dd-hamper" aria-hidden="true" />
                )}

                {/* gift tags / tag placeholder */}
                {hero?.assets?.tag ? (
                  <ImageAsset src={hero.assets.tag} alt="" className="dd-comp-layer dd-gift-tags" aria-hidden="true" />
                ) : (
                  <div className="dd-gift-tags" aria-hidden="true" />
                )}
              </>
            )}

            <div className="dd-composition-glow" />
          </div>


          <div className="dd-hero-note dd-card dd-glass-hover">
            <div className="dd-note-title">Curated for every occasion</div>
            <div className="dd-note-sub">
              <span style={{ color: 'var(--accent)', fontWeight: 800 }}>Warm</span> details.
              <span style={{ color: 'var(--cream)', fontWeight: 800 }}> Timeless</span> finish.
              <span style={{ color: 'var(--rose)', fontWeight: 800 }}> Personal</span> touch.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

