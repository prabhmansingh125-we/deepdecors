import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AdminApp from './admin/AdminApp';
import './styles/global.css';

// Simple path-based switch — no router dependency needed for just two apps.
// /admin and /admin/* render the owner dashboard; everything else is the
// public site. (See scripts/copy-404.js for why this also works on GitHub
// Pages, which has no server-side rewrites.)
const isAdminRoute = window.location.pathname.startsWith('/admin');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>{isAdminRoute ? <AdminApp /> : <App />}</React.StrictMode>
);

