import React, { useState } from 'react';
import useDeepDecorsContent from '../data/useDeepDecorsContent';
import './Contact.css';

export default function Contact() {
  const content = useDeepDecorsContent();
  const brand = content?.brand || {};
  const phoneNumbers = brand.phoneNumbers?.length ? brand.phoneNumbers : [brand.whatsappNumber].filter(Boolean);

  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    // Builds a WhatsApp message with the form data, sent to the Deep Decors WhatsApp number
    const text = encodeURIComponent(
      `*New Enquiry - Deep Decors Website*\n\nName: ${form.name}\nPhone: ${form.phone}\nMessage: ${form.message}`
    );
    const waNumber = brand.whatsappNumber?.replace(/\D/g, '') || '';
    const waUrl = `https://wa.me/${waNumber}?text=${text}`;

    setSending(false);
    setStatus({ type: 'ok', text: 'Opening WhatsApp with your message...' });

    setTimeout(() => {
      window.open(waUrl, '_blank', 'noreferrer');
    }, 400);
  };

  return (
    <section id="contact" className="dd-section" aria-label="Contact">
      <div className="dd-container">
        <div className="dd-kicker">CONTACT</div>
        <h2 className="dd-h2">Let's craft your next luxury moment.</h2>

        <div className="dd-contact-grid">
          <div className="dd-contact-card dd-card">
            <div className="dd-contact-title">Reach Deep Decors</div>

            <div className="dd-contact-list">
              <div className="dd-contact-row">
                <div className="dd-contact-label">Call / WhatsApp</div>
                <div className="dd-contact-value dd-contact-value--stack">
                  {phoneNumbers.map((num) => (
                    <a
                      key={num}
                      className="dd-link"
                      href={`tel:${num.replace(/[^\d+]/g, '')}`}
                    >
                      {num}
                    </a>
                  ))}
                </div>
              </div>
              <div className="dd-contact-row">
                <div className="dd-contact-label">Instagram</div>
                <div className="dd-contact-value">
                  <a className="dd-link" href={brand.instagram} target="_blank" rel="noreferrer">
                    {brand.instagramHandle}
                  </a>
                </div>
              </div>
              <div className="dd-contact-row">
                <div className="dd-contact-label">Email</div>
                <div className="dd-contact-value">
                  <a className="dd-link" href={`mailto:${brand.email}`}>{brand.email}</a>
                </div>
              </div>
              <div className="dd-contact-row">
                <div className="dd-contact-label">Location</div>
                <div className="dd-contact-value">{brand.location}</div>
              </div>
            </div>

            <div className="dd-contact-map" aria-hidden="true" />
          </div>

          <div className="dd-contact-form dd-card">
            <div className="dd-contact-title">Quick Contact Form</div>
            <div className="dd-form-sub">Fill in your details — we'll respond via WhatsApp with curated options.</div>

            <form onSubmit={handleSubmit} className="dd-form">
              <label className="dd-field">
                <span>Your Name</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Enter name"
                  required
                />
              </label>

              <label className="dd-field">
                <span>Phone / WhatsApp</span>
                <input
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="Enter phone"
                />
              </label>

              <label className="dd-field">
                <span>Message</span>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  placeholder="Tell us the occasion and preferences"
                  rows={5}
                  required
                />
              </label>

              <button className="dd-btn dd-btn--primary" type="submit" disabled={sending}>
                {sending ? 'Opening WhatsApp…' : 'Send via WhatsApp'}{' '}
                {!sending && <span aria-hidden="true">→</span>}
              </button>

              {status ? (
                <div className={`dd-form-status ${status.type === 'ok' ? 'ok' : 'err'}`}>
                  {status.text}
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
