import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  !supabaseUrl.includes('placeholder')
);

// Singleton para evitar advertencias de múltiples GoTrueClients en el navegador
let browserClientInstance: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (browserClientInstance) {
    return browserClientInstance;
  }

  const url = supabaseUrl || 'https://placeholder.supabase.co';
  const key = supabaseKey || 'placeholder-anon-key';

  browserClientInstance = createBrowserClient(url, key);
  return browserClientInstance;
}

// Compatibilidad retroactiva sin crear un cliente duplicado
export const supabase = isSupabaseConfigured ? createClient() : null;
