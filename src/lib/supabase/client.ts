import { createBrowserClient } from '@supabase/ssr';
import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  !supabaseUrl.includes('placeholder')
);

// Cliente singleton para compatibilidad con código existente
export const supabase = isSupabaseConfigured
  ? createSupabaseJsClient(supabaseUrl, supabaseKey)
  : null;

// Cliente SSR oficial
export function createClient() {
  const url = supabaseUrl || 'https://placeholder.supabase.co';
  const key = supabaseKey || 'placeholder-anon-key';

  return createBrowserClient(url, key);
}
