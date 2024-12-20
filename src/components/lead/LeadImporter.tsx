import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUpIcon } from "lucide-react";
import { toast } from "sonner";
import { useGym } from "@/contexts/GymContext";
import { Lead } from "@/types/lead";
import { createLead } from "@/lib/supabase";

export function LeadImporter() {
  const { currentGym } = useGym();
  const [isImporting, setIsImporting] = useState(false);

  const handleImportLeads = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentGym) {
      toast.error("Please select a gym first");
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsImporting(true);
      const text = await file.text();
      const [headers, ...rows] = text.split("\n");
      
      // Skip empty rows and process valid ones
      const validRows = rows.filter(row => row.trim().length > 0);
      
      for (const row of validRows) {
        const values = row.split(",");
        const leadData = {
          full_name: values[0]?.trim() || "",
          parent_name: values[1]?.trim() || "",
          phone: values[2]?.trim() || "",
          email: values[3]?.trim() || "",
          event: values[4]?.trim() || "",
          facility: values[5]?.trim() || "",
          status: (values[6]?.trim().toLowerCase() as Lead["status"]) || "new",
          notes: "",
          gym_id: currentGym.id
        };

        // Basic validation
        if (!leadData.full_name || !leadData.email) {
          console.warn("Skipping invalid lead:", leadData);
          continue;
        }

        await createLead(leadData);
      }

      toast.success(`Successfully imported ${validRows.length} leads`);
      // Reset the file input
      if (event.target) {
        event.target.value = '';
      }
    } catch (error) {
      console.error("Import error:", error);
      toast.error("Failed to import some leads. Please check the file format.");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div>
      <label className="cursor-pointer">
        <Button
          variant="outline"
          className="gap-2 border-[#cec4c1] text-[#8f93a0] hover:bg-[#cec4c1]/10"
          disabled={isImporting}
        >
          <FileUpIcon className="w-4 h-4" />
          {isImporting ? "Importing..." : "Import Leads"}
        </Button>
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleImportLeads}
          disabled={isImporting}
        />
      </label>
    </div>
  );
}