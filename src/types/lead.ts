export interface Lead {
  id: string;
  gym_id: string | null;
  parent_name: string;
  child_name: string | null;
  phone: string;
  email: string;
  event: string;
  facility: string;
  notes: string | null;
  status: 'new' | 'contacted' | 'converted' | 'lost';
  lead_source: string | null;
  lead_temperature: 'cold' | 'warm' | 'hot';
  registration_date: string;
  created_at: string;
}

export type LeadInput = Omit<Lead, 'id' | 'created_at' | 'registration_date'>;