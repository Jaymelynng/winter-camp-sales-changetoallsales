export interface Lead {
  id: string;
  gym_id?: string | null;
  parent_name: string;
  child_name?: string;
  phone: string;
  email: string;
  facility: string;
  notes: string;
  status: "new" | "contacted" | "converted" | "lost";
  registration_date: string;
  created_at?: string;
  lead_source?: string;
  lead_temperature: "cold" | "warm" | "hot";
}

export type LeadInput = Omit<Lead, "id" | "created_at"> & {
  registration_date?: string;
};