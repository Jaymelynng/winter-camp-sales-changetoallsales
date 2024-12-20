export interface Lead {
  id: string;
  fullName: string;
  parentName: string;
  phone: string;
  email: string;
  event: string;
  registrationDate: string;
  facility: string;
  notes: string;
  status: 'new' | 'contacted' | 'converted' | 'lost';
}