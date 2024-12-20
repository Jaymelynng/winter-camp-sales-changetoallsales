import { useState } from "react";
import { LeadsTable } from "@/components/LeadsTable";
import { StatsCards } from "@/components/StatsCards";
import { LeadDialog } from "@/components/lead/LeadDialog";
import { LeadHeader } from "@/components/lead/LeadHeader";
import { Lead, LeadInput } from "@/types/lead";
import { toast } from "sonner";
import { useLeads } from "@/hooks/useLeads";
import { useGym } from "@/contexts/GymContext";

const Index = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const { currentGym } = useGym();
  const { leads, isLoading, createLead, updateLead } = useLeads();

  const filteredLeads = leads.filter((lead) =>
    Object.values(lead).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSaveLead = (data: LeadInput) => {
    if (!currentGym) {
      toast.error("Please select a gym first");
      return;
    }

    if (selectedLead) {
      updateLead({ 
        id: selectedLead.id, 
        updates: { ...data, gym_id: currentGym.id } 
      });
      setSelectedLead(undefined);
    } else {
      createLead({ ...data, gym_id: currentGym.id });
    }
  };

  const handleExportLeads = () => {
    const headers = ["Full Name", "Parent Name", "Phone", "Email", "Event", "Facility", "Status", "Registration Date"];
    const csvContent = "data:text/csv;charset=utf-8," + 
      [headers.join(",")].concat(
        leads.map(lead => [
          lead.full_name,
          lead.parent_name,
          lead.phone,
          lead.email,
          lead.event,
          lead.facility,
          lead.status,
          new Date(lead.registration_date).toLocaleDateString()
        ].join(","))
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `leads-${currentGym?.name || 'all'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Leads exported successfully!");
  };

  return (
    <div className="flex h-screen bg-[#f9fafb]">
      <div className="flex-1 overflow-auto">
        <div className="container py-10">
          <div className="flex flex-col space-y-8">
            <div className="flex justify-between items-center">
              <LeadDialog
                lead={selectedLead}
                onSave={handleSaveLead}
                gymId={currentGym?.id}
              />
            </div>

            <LeadHeader
              onExport={handleExportLeads}
            />

            <StatsCards leads={filteredLeads} />

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-[#8f93a0]">Loading leads...</p>
              </div>
            ) : (
              <LeadsTable
                leads={filteredLeads}
                onEdit={setSelectedLead}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;