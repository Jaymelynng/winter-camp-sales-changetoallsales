import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tsodwnsbnldnncyxozre.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzb2R3bnNibmxkbm5jeXhvenJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2ODgzOTgsImV4cCI6MjA1MDI2NDM5OH0.Xv2QnTpRy8pAXpIcpa9myXC0Z_sXbyFSORgvttWaxD0";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);