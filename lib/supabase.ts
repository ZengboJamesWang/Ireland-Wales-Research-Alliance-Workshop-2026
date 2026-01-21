
import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * SUPABASE CONFIGURATION
 * Optimized for modern 'sb_publishable_' keys.
 * Legacy JWT (eyJ...) keys are still supported.
 */

const getEnv = (key: string) => {
  const metaEnv = (import.meta as any).env;
  if (metaEnv && metaEnv[`VITE_${key}`]) return metaEnv[`VITE_${key}`];
  
  const windowKey = (window as any).process?.env?.[key];
  if (windowKey) return windowKey;

  if (key === 'SUPABASE_ANON_KEY') {
    return sessionStorage.getItem('SUPABASE_SESSION_KEY') || '';
  }
  
  return '';
};

const supabaseUrl = 'https://raeturpbgqmamdtsnuph.supabase.co';
let supabaseAnonKey = getEnv('SUPABASE_ANON_KEY');

// Secret keys (sb_secret_ / service_role) are for server-side only.
export const isSecretKey = (key: string) => 
  key.startsWith('sb_secret_') || key.startsWith('service_role');

/**
 * Validates the modern Supabase Publishable key format.
 * Accepts the new 'sb_publishable_' standard and the legacy 'eyJ' JWT format.
 */
export const isValidKeyFormat = (key: string) => 
  !!key && (key.startsWith('sb_publishable_') || key.startsWith('eyJ'));

// Initialize the client safely
export let supabase: SupabaseClient = null as any;

try {
  if (isValidKeyFormat(supabaseAnonKey)) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (e) {
  console.error("Supabase Init Error:", e);
}

export const isConfigured = () => !!supabase && isValidKeyFormat(supabaseAnonKey);

export const refreshSupabaseClient = (newKey: string, persist: boolean = true) => {
  if (isSecretKey(newKey)) {
    throw new Error("FORBIDDEN_SECRET_KEY");
  }

  if (isValidKeyFormat(newKey)) {
    supabaseAnonKey = newKey;
    supabase = createClient(supabaseUrl, newKey);
    if (persist) {
      sessionStorage.setItem('SUPABASE_SESSION_KEY', newKey);
    }
    return true;
  }
  return false;
};

export const clearSupabaseSession = () => {
  sessionStorage.removeItem('SUPABASE_SESSION_KEY');
  location.reload();
};
