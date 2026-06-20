# Deep Decors — Owner Dashboard Setup

This adds a private `/admin` area for you (and any staff you add) to log in
and edit website content — Hero, Featured Collections, Reviews, and Brand &
Contact details — without touching code. It's backed by Supabase (free tier
is plenty for this).

Your public website at `/` is untouched and works exactly as before. It now
also quietly checks Supabase for owner-published content, and falls back to
`src/data/deepDecorsContent.json` if Supabase isn't set up yet — so nothing
breaks if you skip this entirely.

## 1. Create a Supabase project

1. Go to https://supabase.com → New project (free tier is fine)
2. Pick any name/region/password (the password is just for the database,
   not something you'll use day-to-day)
3. Wait ~2 minutes for it to finish setting up

## 2. Run the schema

1. In your Supabase project: **SQL Editor → New query**
2. Open `supabase/schema.sql` from this project, paste the whole file in
3. Click **Run**

This creates:
- `profiles` table — who can log into `/admin`, and their role (`owner`/`staff`)
- `site_content` table — what the CMS edits and the live website reads
- a `media` storage bucket — for uploaded photos

## 3. Connect the website to your project

1. In Supabase: **Settings → API**
2. Copy the **Project URL** and the **anon public** key
3. In this project, copy `.env.example` to a new file named `.env`
4. Paste those two values in:
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
5. Restart `npm run dev` if it was already running (Vite only reads `.env` on startup)

## 4. Create your owner login

1. In Supabase: **Authentication → Users → Add user**
2. Enter your email and a password (this is your `/admin` login — separate
   from your Supabase account login)
3. Back in **SQL Editor**, run this once with your real email:
   ```sql
   update public.profiles set role = 'owner' where email = 'you@example.com';
   ```
   (New accounts default to `staff` — this promotes your account to `owner`,
   which can also manage the team. Everyone else you add stays `staff` until
   you promote them too, from inside the dashboard.)

## 5. Log in

1. `npm run dev`, then visit `http://localhost:5173/admin`
2. Sign in with the email + password from step 4
3. Edit Hero, Collections, Reviews, or Brand & Contact, click **Save changes**
4. Refresh the public site (`/`) — your edit is live

## Adding a staff member later

1. Supabase → Authentication → Users → Add user (their email + a password,
   share it with them however you'd share any password)
2. They can now sign into `/admin` — they'll default to **staff**, which can
   edit content but not manage the team
3. If you want them to also manage the team, go to `/admin` → **Team & Roles**
   (only visible to owners) and change their role to **owner**

## Deploying to GitHub Pages

```
npm run build
```

This also auto-generates `dist/404.html` (a copy of `dist/index.html`), which
is what makes `/admin` keep working after a hard refresh on GitHub Pages —
GitHub Pages has no server-side routing, so without this trick a direct visit
to `/admin` would just 404.

If you're deploying to a **project page** (`username.github.io/repo-name/`,
not a custom domain or `username.github.io` root), you'll also need to add a
`base` to `vite.config.js`:
```js
export default defineConfig({
  base: '/repo-name/',
  // ...rest stays the same
});
```

## What's still using the old static JSON

FAQ, Why Choose, About, Signature Experience, and Gallery still have their
content written directly in their component files rather than coming from
`deepDecorsContent.json` / Supabase. Editing those still means editing code
for now — extending the CMS to cover them is a natural next step whenever
you want it.
