import { useState } from "react";
import { LeadsTable } from "@/components/LeadsTable";
import { StatsCards } from "@/components/StatsCards";
import { LeadDialog } from "@/components/lead/LeadDialog";
import { mockLeads } from "@/data/mockLeads";
import { Lead } from "@/types/lead";
import { Button } from "@/components/ui/button";
import { FileUpIcon, Download } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = leads.filter((lead) =>
    Object.values(lead).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSaveLead = (data: Partial<Lead>) => {
    if (selectedLead) {
      setLeads(leads.map(lead => 
        lead.id === selectedLead.id ? { ...lead, ...data } : lead
      ));
      setSelectedLead(undefined);
    } else {
      const newLead: Lead = {
        ...data,
        id: (leads.length + 1).toString(),
        gym_id: null,
        registration_date: new Date().toISOString(),
        created_at: new Date().toISOString(),
      } as Lead;
      setLeads([...leads, newLead]);
    }
    toast.success("Lead saved successfully!");
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
        const newLeads: Lead[] = rows.map((row, index) => {
          const values = row.split(",");
          return {
            id: (leads.length + index + 1).toString(),
            gym_id: null,
            full_name: values[0] || "",
            parent_name: values[1] || "",
            phone: values[2] || "",
            email: values[3] || "",
            event: values[4] || "",
            facility: values[5] || "",
            status: (values[6] as Lead["status"]) || "new",
            notes: "",
            registration_date: new Date().toISOString(),
            created_at: new Date().toISOString()
          };
        });
        setLeads([...leads, ...newLeads]);
        toast.success("Leads imported successfully!");
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex h-screen bg-custom-white">
      <div className="flex-1 overflow-auto">
        <div className="container py-10">
          <div className="flex flex-col space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-custom-slate">Winter Camp Sales Toolkit</h1>
              <div className="flex gap-2">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="gap-2 border-custom-light text-custom-slate hover:bg-custom-light/10"
                    onClick={handleExportLeads}
                  >
                    <Download className="w-4 h-4" />
                    Export Leads
                  </Button>
                  <label className="cursor-pointer">
                    <Button 
                      variant="outline" 
                      className="gap-2 border-custom-light text-custom-slate hover:bg-custom-light/10"
                      onClick={() => document.getElementById('import-leads')?.click()}
                    >
                      <FileUpIcon className="w-4 h-4" />
                      Import Leads
                    </Button>
                    <input
                      id="import-leads"
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={handleImportLeads}
                    />
                  </label>
                </div>
              </div>
            </div>

            <StatsCards leads={filteredLeads} />
            
            <div className="flex justify-between items-center">
              <LeadDialog
                lead={selectedLead}
                onSave={handleSaveLead}
              />
            </div>

            <LeadsTable
              leads={filteredLeads}
              onEdit={setSelectedLead}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;