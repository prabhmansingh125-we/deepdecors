import React, { useState } from 'react';
import { useAdminAuth } from './AdminAuthContext';
import HeroEditor from './sections/HeroEditor';
import CollectionsEditor from './sections/CollectionsEditor';
import ReviewsEditor from './sections/ReviewsEditor';
import BrandSettingsEditor from './sections/BrandSettingsEditor';
import MediaLibraryPage from './sections/MediaLibraryPage';
import RoleManagement from './sections/RoleManagement';

const NAV_ITEMS = [
  { key: 'hero', label: 'Hero' },
  { key: 'collections', label: 'Collections' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'brand', label: 'Brand & Contact' },
  { key: 'media', label: 'Media Library' }
];

const PAGE_META = {
  hero: { title: 'Hero', sub: 'The first thing visitors see at the top of the website.' },
  collections: { title: 'Featured Collections', sub: 'The gifting categories shown on the homepage.' },
  reviews: { title: 'Customer Reviews', sub: 'Testimonials shown on the homepage.' },
  brand: { title: 'Brand & Contact', sub: 'WhatsApp, Instagram, email, and location used across the site.' },
  media: { title: 'Media Library', sub: 'All uploaded photos in one place.' },
  team: { title: 'Team & Roles', sub: 'Who can sign into this dashboard, and what they can do.' }
};

export default function AdminDashboard() {
  const { user, role, isOwner, signOut } = useAdminAuth();
  const [active, setActive] = useState('hero');

  const navItems = isOwner ? [...NAV_ITEMS, { key: 'team', label: 'Team & Roles' }] : NAV_ITEMS;
  const meta = PAGE_META[active];

  return (
    <div className="adm-shell">
      <aside className="adm-sidebar">
        <div className="adm-sidebar-brand">DEEP DECORS</div>

        <nav className="adm-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`adm-nav-item ${active === item.key ? 'is-active' : ''}`}
              onClick={() => setActive(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="adm-sidebar-footer">
          {role ? <span className="adm-role-pill">{role}</span> : null}
          <div className="adm-user-email">{user?.email}</div>
          <button type="button" className="dd-btn dd-btn--ghost" style={{ width: '100%' }} onClick={signOut}>
            Sign out
          </button>
        </div>
      </aside>

      <main className="adm-main">
        <h1 className="adm-page-title">{meta.title}</h1>
        <p className="adm-page-sub">{meta.sub}</p>

        {active === 'hero' && <HeroEditor />}
        {active === 'collections' && <CollectionsEditor />}
        {active === 'reviews' && <ReviewsEditor />}
        {active === 'brand' && <BrandSettingsEditor />}
        {active === 'media' && <MediaLibraryPage />}
        {active === 'team' && isOwner && <RoleManagement />}
      </main>
    </div>
  );
}
