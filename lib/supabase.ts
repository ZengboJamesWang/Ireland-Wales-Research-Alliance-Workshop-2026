
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://raeturpbgqmamdtsnuph.supabase.co';
const supabaseAnonKey = 'sb_publishable_3JZYy4tdhJBf1qd_xtU2Ig_8_qGnEDn';

// We use the publishable (anon) key for browser-side requests.
// Ensure RLS (Row Level Security) is enabled on your 'submissions' table 
// and that 'Insert' permissions are granted to the 'anon' role.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
