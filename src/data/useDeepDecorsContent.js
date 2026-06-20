import { useEffect, useState } from 'react';
import content from './deepDecorsContent.json';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const LIVE_SECTION_KEYS = ['brand', 'hero', 'featuredCollections', 'reviews', 'gallery', 'instagram'];

/**
 * useDeepDecorsContent
 * Returns the site content. Starts with deepDecorsContent.json (so every
 * existing component renders exactly as before, with zero changes needed),
 * then quietly checks Supabase for owner-edited content and swaps in
 * whichever sections have been published from the /admin dashboard.
 *
 * If Supabase isn't configured, or a fetch fails, this silently keeps the
 * local JSON — the site never breaks because of the CMS.
 */
export default function useDeepDecorsContent() {
  const [data, setData] = useState(content);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let active = true;

    supabase
      .from('site_content')
      .select('section_key, data')
      .in('section_key', LIVE_SECTION_KEYS)
      .then(({ data: rows, error }) => {
        if (!active || error || !rows || rows.length === 0) return;
        setData((prev) => {
          const next = { ...prev };
          rows.forEach((row) => {
            next[row.section_key] = row.data;
          });
          return next;
        });
      });

    return () => {
      active = false;
    };
  }, []);

  return data;
}
