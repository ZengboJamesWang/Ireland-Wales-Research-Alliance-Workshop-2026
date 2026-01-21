
import { createClient } from '@supabase/supabase-js';

/**
 * SUPABASE CONFIGURATION
 * Connected to project: raeturpbgqmamdtsnuph
 */

const getEnv = (key: string) => {
  return (window as any).process?.env?.[key] || '';
};

const supabaseUrl = getEnv('SUPABASE_URL') || 'https://raeturpbgqmamdtsnuph.supabase.co';
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY');

// Check if a valid key exists (user provided sb_publishable... in index.html)
export const isConfigured = 
  !!supabaseAnonKey && 
  supabaseAnonKey.length > 20 && 
  supabaseAnonKey !== 'PASTE_YOUR_SUPABASE_ANON_KEY_HERE';

// Create client
export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as any); 

export const getSupabase = () => {
  if (!supabase) {
    throw new Error("Supabase client not initialized. Please verify the key in index.html");
  }
  return supabase;
};
