import { useState } from "react";
import { LeadsTable } from "@/components/LeadsTable";
import { StatsCards } from "@/components/StatsCards";
import { LeadDialog } from "@/components/LeadDialog";
import { mockLeads } from "@/data/mockLeads";
import { Lead } from "@/types/lead";
import { Button } from "@/components/ui/button";
import { FileUpIcon } from "lucide-react";
import { SalesToolkit } from "@/components/SalesToolkit";

const Index = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSaveLead = (data: Partial<Lead>) => {
    if (selectedLead) {
      setLeads(leads.map(lead => 
        lead.id === selectedLead.id ? { ...lead, ...data } : lead
      ));
      setSelectedLead(undefined);
    } else {
      const newLead = {
        ...data,
        id: (leads.length + 1).toString(),
        registrationDate: new Date().toISOString().split('T')[0]
      } as Lead;
      setLeads([...leads, newLead]);
    }
  };

  return (
    <div className="flex h-screen bg-custom-white">
      {isSidebarOpen && <SalesToolkit />}
      
      <div className="flex-1 overflow-auto">
        <div className="container py-10">
          <div className="flex flex-col space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-custom-slate">Winter Camp Sales Toolkit</h1>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="border-custom-light text-custom-slate hover:bg-custom-light/10"
                >
                  {isSidebarOpen ? "Hide Toolkit" : "Show Toolkit"}
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2 border-custom-light text-custom-slate hover:bg-custom-light/10"
                >
                  <FileUpIcon className="w-4 h-4" />
                  Import Leads
                </Button>
              </div>
            </div>

            <StatsCards leads={leads} />
            
            <LeadsTable
              leads={leads}
              onEdit={(lead) => setSelectedLead(lead)}
            />
            
            {selectedLead && (
              <LeadDialog
                lead={selectedLead}
                onSave={handleSaveLead}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;