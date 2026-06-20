import React, { useEffect, useState } from 'react';
import useScrollSpy from '../hooks/useScrollSpy';
import useReducedMotion from '../hooks/useReducedMotion';
import useDeepDecorsContent from '../data/useDeepDecorsContent';

import './Navbar.css';

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navbar({ sections }) {
  const content = useDeepDecorsContent();
  const brand = content?.brand || {};
  const activeId = useScrollSpy(sections.map((s) => s.id));
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`dd-navbar ${scrolled ? 'dd-navbar--scrolled' : ''}`}>
      <div className="dd-container dd-navbar-inner">
        <button
          className="dd-navbar-logo"
          onClick={() => {
            setMenuOpen(false);
            scrollToId('home');
          }}
          aria-label="Go to home"
        >
          {brand.logo ? (
            <img className="dd-logo-mark" src={brand.logo} alt="Deep Decors logo" />
          ) : (
            <div className="dd-logo-mark" aria-hidden="true" />
          )}
          <div>
            <div className="dd-logo-text">DEEP DECORS</div>
            <div className="dd-logo-tag">PREMIUM GIFTING, BETTER EXPERIENCE.</div>
          </div>
        </button>

        <nav className="dd-navbar-links" aria-label="Primary">
          {sections.slice(0, 7).map((s) => (
            <button
              key={s.id}
              className={`dd-nav-link ${activeId === s.id ? 'is-active' : ''}`}
              onClick={() => scrollToId(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="dd-navbar-actions">
          <button
            className="dd-btn dd-btn--book"
            onClick={() => scrollToId('custom-orders')}
            style={{ marginRight: 10 }}
          >
            Book Now
            <span aria-hidden="true">→</span>
          </button>

          <button
            className="dd-hamburger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`dd-mobile ${menuOpen ? 'is-open' : ''}`}>
        <div className="dd-container dd-mobile-inner">
          {sections.map((s) => (
            <button
              key={s.id}
              className={`dd-mobile-link ${activeId === s.id ? 'is-active' : ''}`}
              onClick={() => {
                setMenuOpen(false);
                const behavior = reduceMotion ? 'auto' : 'smooth';
                document.getElementById(s.id)?.scrollIntoView({ behavior, block: 'start' });
              }}
            >
              {s.label}
            </button>
          ))}
          <div style={{ height: 10 }} />
          <button
            className="dd-btn dd-btn--book dd-btn--full"
            onClick={() => {
              setMenuOpen(false);
              scrollToId('custom-orders');
            }}
          >
            Book Now <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </header>
  );
}

