import { createClient } from '@supabase/supabase-js';
import { env } from '../config/env';

function getSupabase() {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase credentials (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) are not configured');
  }
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
}

export async function createPresignedUploadUrl(storagePath: string): Promise<{ signedUrl: string; token: string; path: string }> {
  const { data, error } = await getSupabase()
    .storage
    .from(env.SUPABASE_BUCKET)
    .createSignedUploadUrl(storagePath);
  if (error) throw new Error(`Storage presign failed: ${error.message}`);
  return data;
}

export async function createSignedDownloadUrl(storageKey: string, expiresInSeconds = 300): Promise<string> {
  const { data, error } = await getSupabase()
    .storage
    .from(env.SUPABASE_BUCKET)
    .createSignedUrl(storageKey, expiresInSeconds);
  if (error) throw new Error(`Storage sign failed: ${error.message}`);
  return data.signedUrl;
}

export async function deleteStorageFile(storageKey: string): Promise<void> {
  await getSupabase().storage.from(env.SUPABASE_BUCKET).remove([storageKey]);
}

export async function uploadCsvToStorage(storageKey: string, buffer: Buffer): Promise<void> {
  const { error } = await getSupabase()
    .storage
    .from(env.SUPABASE_BUCKET)
    .upload(storageKey, buffer, { contentType: 'text/csv', upsert: false });
  if (error) throw new Error(`Storage upload failed: ${error.message}`);
}

export async function downloadFromStorage(storageKey: string): Promise<Buffer> {
  const { data, error } = await getSupabase()
    .storage
    .from(env.SUPABASE_BUCKET)
    .download(storageKey);
  if (error) throw new Error(`Storage download failed: ${error.message}`);
  const ab = await data.arrayBuffer();
  return Buffer.from(ab);
}
