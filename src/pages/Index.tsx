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
    if (selectedLead) {
      updateLead({ 
        id: selectedLead.id, 
        updates: { ...data, gym_id: currentGym?.id } 
      });
      setSelectedLead(undefined);
    } else {
      createLead({ ...data, gym_id: currentGym?.id });
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
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Leads exported successfully!");
  };

  const handleImportLeads = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const [headers, ...rows] = text.split("\n");
        const newLeads = rows.map((row) => {
          const values = row.split(",");
          return {
            full_name: values[0] || "",
            parent_name: values[1] || "",
            phone: values[2] || "",
            email: values[3] || "",
            event: values[4] || "",
            facility: values[5] || "",
            status: (values[6] as Lead["status"]) || "new",
            notes: "",
            gym_id: currentGym?.id
          };
        });
        
        Promise.all(newLeads.map(lead => createLead(lead)))
          .then(() => {
            toast.success("Leads imported successfully!");
          })
          .catch(() => {
            toast.error("Failed to import some leads. Please try again.");
          });
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex h-screen bg-custom-white">
      <div className="flex-1 overflow-auto">
        <div className="container py-10">
          <div className="flex flex-col space-y-8">
            <LeadHeader
              onExport={handleExportLeads}
              onImport={handleImportLeads}
            />

            <StatsCards leads={filteredLeads} />
            
            <div className="flex justify-between items-center">
              <LeadDialog
                lead={selectedLead}
                onSave={handleSaveLead}
                gymId={currentGym?.id}
              />
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-custom-slate">Loading leads...</p>
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