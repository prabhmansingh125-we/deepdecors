import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="dd-loading" role="status" aria-live="polite" aria-busy="true">
      <div className="dd-loading-card">
        <div className="dd-loader-top">
          <div>
            <div className="dd-loader-brand">DEEP DECORS</div>
            <div className="dd-loader-sub">
              Crafting your luxury experience…
              <br />
              <span style={{ color: 'rgba(243,237,227,0.88)' }}>Premium Gifting, Better Experience.</span>
            </div>
          </div>
          <div className="dd-ring" aria-hidden="true" />
        </div>

        <div className="dd-skeleton">
          <div className="dd-skel-line" style={{ width: '86%' }} />
          <div className="dd-skel-line" style={{ width: '74%' }} />
          <div className="dd-skel-line" style={{ width: '92%' }} />
          <div className="dd-skel-line" style={{ width: '62%' }} />
        </div>
      </div>
    </div>
  );
}

