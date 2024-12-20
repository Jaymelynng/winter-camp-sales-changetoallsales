import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

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