import { Lead } from "@/types/lead";

export const mockLeads: Lead[] = [
  {
    id: "1",
    gym_id: null,
    parent_name: "Mary Smith",
    child_name: "John Smith",
    phone: "(555) 123-4567",
    email: "john@example.com",
    event: "Summer Camp 2024",
    registration_date: "2024-02-15",
    facility: "Main Center",
    notes: "Interested in full-day program",
    status: "new",
    created_at: "2024-02-15",
    lead_source: "",
    lead_temperature: "warm"
  },
  {
    id: "2",
    gym_id: null,
    parent_name: "Sarah Johnson",
    child_name: "Emma Johnson",
    phone: "(555) 234-5678",
    email: "emma@example.com",
    event: "After School Program",
    registration_date: "2024-02-14",
    facility: "West Branch",
    notes: "Sibling already enrolled",
    status: "contacted",
    created_at: "2024-02-14",
    lead_source: "",
    lead_temperature: "warm"
  },
  {
    id: "3",
    gym_id: null,
    parent_name: "David Brown",
    child_name: "Michael Brown",
    phone: "(555) 345-6789",
    email: "michael@example.com",
    event: "Spring Break Camp",
    registration_date: "2024-02-13",
    facility: "East Branch",
    notes: "Requesting financial aid information",
    status: "new",
    created_at: "2024-02-13",
    lead_source: "",
    lead_temperature: "warm"
  }
];