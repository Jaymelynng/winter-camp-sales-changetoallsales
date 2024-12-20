import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tsodwnsbnldnncyxozre.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzb2R3bnNibmxkbm5jeXhvenJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2ODgzOTgsImV4cCI6MjA1MDI2NDM5OH0.Xv2QnTpRy8pAXpIcpa9myXC0Z_sXbyFSORgvttWaxD0';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper functions for gym operations
export const getGyms = async () => {
  const { data, error } = await supabase
    .from('gyms')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
};

// Helper functions for lead operations
export const getLeadsByGym = async (gymId: string) => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('gym_id', gymId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createLead = async (lead: any) => {
  const { data, error } = await supabase
    .from('leads')
    .insert([lead])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateLead = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};