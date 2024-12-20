import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLeadsByGym, updateLead } from "@/lib/supabase";
import { StatsCards } from "@/components/StatsCards";
import { LeadsTable } from "@/components/LeadsTable";
import { LeadDialog } from "@/components/lead/LeadDialog";
import { Lead } from "@/types/lead";
import { toast } from "sonner";
import { useState } from "react";

export default function GymDashboard() {
  const { gymId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: leads = [], refetch } = useQuery({
    queryKey: ["leads", gymId],
    queryFn: () => getLeadsByGym(gymId!),
    meta: {
      onError: () => {
        toast.error("Failed to load leads");
      }
    }
  });

  const handleSaveLead = async (data: Partial<Lead>) => {
    try {
      await updateLead(data.id!, data);
      toast.success("Lead saved successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to save lead");
    }
  };

  const filteredLeads = leads.filter((lead) =>
    Object.values(lead).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-8">
      <StatsCards leads={filteredLeads} />
      <div className="flex justify-between items-center">
        <LeadDialog onSave={handleSaveLead} />
      </div>
      <LeadsTable
        leads={filteredLeads}
        onEdit={(lead) => handleSaveLead(lead)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
    </div>
  );
}