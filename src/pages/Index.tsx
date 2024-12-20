import { useState } from "react";
import { LeadsTable } from "@/components/LeadsTable";
import { StatsCards } from "@/components/StatsCards";
import { LeadDialog } from "@/components/lead/LeadDialog";
import { LeadHeader } from "@/components/lead/LeadHeader";
import { Lead, LeadInput } from "@/types/lead";
import { toast } from "sonner";
import { useLeads } from "@/hooks/useLeads";
import { useGym } from "@/contexts/GymContext";
import { SalesToolkit } from "@/components/toolkit/SalesToolkit";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [showToolkit, setShowToolkit] = useState(false);
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
    const headers = ["Parent Name", "Child Name", "Phone", "Email", "Facility", "Status", "Registration Date", "Lead Source", "Temperature"];
    const csvContent = "data:text/csv;charset=utf-8," + 
      [headers.join(",")].concat(
        leads.map(lead => [
          lead.parent_name,
          lead.child_name,
          lead.phone,
          lead.email,
          lead.facility,
          lead.status,
          new Date(lead.registration_date).toLocaleDateString(),
          lead.lead_source,
          lead.lead_temperature
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
    <div className="min-h-screen bg-custom-light/10">
      <div className="px-4 md:px-8">
        <div className="py-6 md:py-10 max-w-[1400px] mx-auto">
          <div className="flex flex-col space-y-6 md:space-y-8">
            <div className="flex justify-between items-center">
              <LeadDialog
                lead={selectedLead}
                onSave={handleSaveLead}
                gymId={currentGym?.id}
              />
              <Button
                variant="outline"
                onClick={() => setShowToolkit(!showToolkit)}
                className="bg-white hover:bg-custom-light/20"
              >
                {showToolkit ? "Hide Toolkit" : "Show Toolkit"}
              </Button>
            </div>

            <LeadHeader onExport={handleExportLeads} />

            <StatsCards leads={filteredLeads} />

            {/* Horizontal Sales Toolkit */}
            {showToolkit && (
              <div className="bg-white rounded-lg shadow-md border border-custom-light">
                <div className="p-4">
                  <h3 className="text-sm font-medium text-custom-slate mb-4">Sales Toolkit</h3>
                  <SalesToolkit />
                </div>
              </div>
            )}

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