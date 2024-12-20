import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tsodwnsbnldnncyxozre.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzb2R3bnNibmxkbm5jeXhvenJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDc0MzgsImV4cCI6MjAyNTE4MzQzOH0.GG5UXKLiKGPxKJvX-RHLgqzGRVlD0Jy6G4zGN4Lc6Hs";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);