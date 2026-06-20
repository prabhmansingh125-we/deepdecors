import React from 'react';
import useDeepDecorsContent from '../data/useDeepDecorsContent';
import './Footer.css';

export default function Footer() {
  const content = useDeepDecorsContent();
  const brand = content?.brand || {};
  const phoneNumbers = brand.phoneNumbers?.length ? brand.phoneNumbers : [brand.whatsappNumber].filter(Boolean);

  return (
    <footer className="dd-footer" aria-label="Footer">
      <div className="dd-container dd-footer-inner">
        <div className="dd-footer-brand">
          <div className="dd-footer-logo">DEEP DECORS</div>
          <div className="dd-footer-tag">{brand.tagline}</div>
          <div className="dd-footer-copy">© {new Date().getFullYear()} Deep Decors. All rights reserved.</div>
        </div>

        <div className="dd-footer-cols">
          <div className="dd-footer-col">
            <div className="dd-footer-title">Quick Links</div>
            <a className="dd-footer-link" href="#home">Home</a>
            <a className="dd-footer-link" href="#collections">Collections</a>
            <a className="dd-footer-link" href="#gallery">Gallery</a>
            <a className="dd-footer-link" href="#custom-orders">Custom Orders</a>
            <a className="dd-footer-link" href="#contact">Contact</a>
          </div>

          <div className="dd-footer-col">
            <div className="dd-footer-title">Connect</div>
            <a className="dd-footer-link" href={brand.instagram} target="_blank" rel="noreferrer">
              Instagram {brand.instagramHandle}
            </a>
            {phoneNumbers.map((num) => (
              <a key={num} className="dd-footer-link" href={`tel:${num.replace(/[^\d+]/g, '')}`}>
                {num}
              </a>
            ))}
            <a className="dd-footer-link" href={`mailto:${brand.email}`}>{brand.email}</a>
            <div className="dd-footer-link" style={{ cursor: 'default', opacity: 0.7 }}>{brand.location}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
