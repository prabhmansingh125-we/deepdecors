import React, { useEffect, useRef } from 'react';

export default function RevealOnScroll({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
if (mq?.matches) {
      el.classList.add('dd-in');
      el.classList.remove('dd-in');
      el.classList.add('dd-in');
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          el.classList.add('dd-in');
          obs.disconnect();
        }
      },
      { threshold: 0.16 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`dd-reveal ${className}`.trim()}>
      {children}
    </div>
  );
}

