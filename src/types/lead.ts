export interface Lead {
  id: string;
  gym_id?: string;
  parent_name: string;
  child_name?: string;
  phone: string;
  email: string;
  facility: string;
  notes: string;
  status: string;
  registration_date: string;
  created_at?: string;
  lead_source?: string;
  lead_temperature?: string;
}

export type LeadInput = Omit<Lead, "id" | "created_at">;