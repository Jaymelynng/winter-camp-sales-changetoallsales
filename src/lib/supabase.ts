import { supabase } from '@/integrations/supabase/client';
import { Lead, LeadInput } from '@/types/lead';

export const getGyms = async () => {
  const { data, error } = await supabase
    .from('gyms')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
};

export const getLeadsByGym = async (gymId?: string | null) => {
  let query = supabase.from('leads').select('*');
  
  if (gymId) {
    query = query.eq('gym_id', gymId);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Lead[];
};

export const createLead = async (lead: LeadInput) => {
  const { data, error } = await supabase
    .from('leads')
    .insert([lead])
    .select()
    .single();
  
  if (error) throw error;
  return data as Lead;
};

export const updateLead = async (id: string, updates: Partial<LeadInput>) => {
  const { data, error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Lead;
};

export const importLeads = async (leads: LeadInput[]) => {
  const { data, error } = await supabase
    .from('leads')
    .insert(leads)
    .select();
  
  if (error) throw error;
  return data as Lead[];
};