import { useState } from "react";
import { LeadsTable } from "@/components/LeadsTable";
import { StatsCards } from "@/components/StatsCards";
import { LeadDialog } from "@/components/lead/LeadDialog";
import { Lead, LeadInput } from "@/types/lead";
import { Button } from "@/components/ui/button";
import { FileUpIcon, Download } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createLead, getLeadsByGym, updateLead } from "@/lib/supabase";
import { useGym } from "@/contexts/GymContext";

const Index = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const { currentGym } = useGym();
  const queryClient = useQueryClient();

  // Fetch leads data
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["leads", currentGym?.id],
    queryFn: () => currentGym ? getLeadsByGym(currentGym.id) : Promise.resolve([]),
    enabled: !!currentGym,
    meta: {
      onError: () => {
        toast.error("Failed to load leads. Please try again.");
      }
    }
  });

  // Create lead mutation
  const createLeadMutation = useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead created successfully!");
    },
    onError: () => {
      toast.error("Failed to create lead. Please try again.");
    }
  });

  // Update lead mutation
  const updateLeadMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<LeadInput> }) => 
      updateLead(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update lead. Please try again.");
    }
  });

  const filteredLeads = leads.filter((lead) =>
    Object.values(lead).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSaveLead = (data: LeadInput) => {
    if (selectedLead) {
      updateLeadMutation.mutate({ 
        id: selectedLead.id, 
        updates: { ...data, gym_id: currentGym?.id } 
      });
      setSelectedLead(undefined);
    } else {
      createLeadMutation.mutate({ ...data, gym_id: currentGym?.id });
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
        
        // Create each lead
        Promise.all(newLeads.map(lead => createLeadMutation.mutate(lead)))
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

  if (!currentGym) {
    return (
      <div className="flex h-screen items-center justify-center bg-custom-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-custom-slate mb-4">Please select a gym</h1>
          <p className="text-custom-slate">You need to select a gym to view and manage leads.</p>
        </div>
      </div>
    );
  }

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
                gymId={currentGym.id}
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