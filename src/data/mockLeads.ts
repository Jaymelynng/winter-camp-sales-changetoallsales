import { Lead } from "@/types/lead";

export const mockLeads: Lead[] = [
  {
    id: "1",
    fullName: "John Smith",
    parentName: "Mary Smith",
    phone: "(555) 123-4567",
    email: "john@example.com",
    event: "Summer Camp 2024",
    registrationDate: "2024-02-15",
    facility: "Main Center",
    notes: "Interested in full-day program",
    status: "new"
  },
  {
    id: "2",
    fullName: "Emma Johnson",
    parentName: "Sarah Johnson",
    phone: "(555) 234-5678",
    email: "emma@example.com",
    event: "After School Program",
    registrationDate: "2024-02-14",
    facility: "West Branch",
    notes: "Sibling already enrolled",
    status: "contacted"
  },
  {
    id: "3",
    fullName: "Michael Brown",
    parentName: "David Brown",
    phone: "(555) 345-6789",
    email: "michael@example.com",
    event: "Spring Break Camp",
    registrationDate: "2024-02-13",
    facility: "East Branch",
    notes: "Requesting financial aid information",
    status: "new"
  }
];