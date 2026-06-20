import { supabase } from '../lib/supabaseClient';

const BUCKET = 'media';

/**
 * Load a single content section. Falls back to the provided default
 * (the matching key from src/data/deepDecorsContent.json) if the row
 * doesn't exist yet in Supabase — this is what happens the very first
 * time the dashboard is used, before anything has been saved.
 */
export async function getSectionContent(sectionKey, fallback) {
  const { data, error } = await supabase
    .from('site_content')
    .select('data')
    .eq('section_key', sectionKey)
    .maybeSingle();

  if (error || !data) return fallback;
  return data.data;
}

/**
 * Save (insert or update) a content section. Also stamps who made the
 * change. This is what makes the public site update live — useDeepDecorsContent
 * reads the same table.
 */
export async function saveSectionContent(sectionKey, value, userId) {
  const { error } = await supabase
    .from('site_content')
    .upsert(
      {
        section_key: sectionKey,
        data: value,
        updated_at: new Date().toISOString(),
        updated_by: userId || null
      },
      { onConflict: 'section_key' }
    );

  if (error) return { error: error.message };
  return { error: null };
}

/** List every file currently in the media bucket, newest first. */
export async function listMedia() {
  const { data, error } = await supabase.storage.from(BUCKET).list('', {
    limit: 200,
    sortBy: { column: 'created_at', order: 'desc' }
  });
  if (error) return { files: [], error: error.message };

  const files = (data || [])
    .filter((f) => f.name && !f.name.endsWith('/'))
    .map((f) => ({
      name: f.name,
      url: supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
      createdAt: f.created_at
    }));

  return { files, error: null };
}

/** Upload a new file to the media bucket. Returns its public URL. */
export async function uploadMedia(file) {
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '-').toLowerCase();
  const path = `${Date.now()}-${safeName}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false
  });

  if (error) return { url: null, error: error.message };

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}

/** Delete a file from the media bucket by its storage path/name. */
export async function deleteMedia(name) {
  const { error } = await supabase.storage.from(BUCKET).remove([name]);
  if (error) return { error: error.message };
  return { error: null };
}
