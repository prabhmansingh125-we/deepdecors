// GitHub Pages serves a static 404.html for any unknown path (e.g. /admin on a
// hard refresh) instead of letting our client-side router handle it. Copying
// the built index.html to 404.html is the standard fix: GH Pages serves this
// file, the browser keeps the real URL, and our app boots and reads the path
// itself (see src/main.jsx).
import { copyFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const from = join(distDir, 'index.html');
const to = join(distDir, '404.html');

if (existsSync(from)) {
  copyFileSync(from, to);
  console.log('[postbuild] Copied index.html -> 404.html for GitHub Pages SPA fallback.');
} else {
  console.warn('[postbuild] dist/index.html not found, skipped 404.html copy.');
}
