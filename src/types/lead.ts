export interface Lead {
  id: string;
  gym_id: string | null;
  full_name: string;
  parent_name: string;
  phone: string;
  email: string;
  event: string;
  facility: string;
  notes: string | null;
  status: 'new' | 'contacted' | 'converted' | 'lost';
  registration_date: string;
  created_at: string;
}

export type LeadInput = Omit<Lead, 'id' | 'created_at' | 'registration_date'>;