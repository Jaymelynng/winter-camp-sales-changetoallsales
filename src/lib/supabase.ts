import { supabase } from '@/integrations/supabase/client';
import { Lead } from '@/types/lead';

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
  return data as Lead[];
};

export const createLead = async (lead: Partial<Lead>) => {
  const { data, error } = await supabase
    .from('leads')
    .insert([lead])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateLead = async (id: string, updates: Partial<Lead>) => {
  const { data, error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};