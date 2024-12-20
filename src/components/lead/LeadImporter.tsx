import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUpIcon, ClipboardPasteIcon } from "lucide-react";
import { toast } from "sonner";
import { useGym } from "@/contexts/GymContext";
import { Lead } from "@/types/lead";
import { createLead } from "@/lib/supabase";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function LeadImporter() {
  const { currentGym, gyms } = useGym();
  const [isImporting, setIsImporting] = useState(false);
  const [pastedData, setPastedData] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Gym name mapping to handle incorrect names
  const gymNameMap: { [key: string]: string } = {
    // Add common misspellings or variations
    "LA fitness": "LA Fitness",
    "lafitness": "LA Fitness",
    "Planet fitness": "Planet Fitness",
    "planetfitness": "Planet Fitness",
    "24hr": "24 Hour Fitness",
    "24 hr fitness": "24 Hour Fitness",
    // Add more mappings as needed
  };

  const normalizeGymName = (name: string): string => {
    const lowercaseName = name.toLowerCase();
    for (const [key, value] of Object.entries(gymNameMap)) {
      if (lowercaseName.includes(key.toLowerCase())) {
        return value;
      }
    }
    return name; // Return original if no mapping found
  };

  const processLeadData = async (data: string) => {
    if (!currentGym) {
      toast.error("Please select a gym first");
      return;
    }

    try {
      setIsImporting(true);
      const rows = data.split("\n");
      let successCount = 0;
      let errorCount = 0;

      for (const row of rows) {
        if (!row.trim()) continue;

        const values = row.split(",").map(val => val.trim());
        if (values.length < 6) continue;

        const leadData = {
          full_name: values[0] || "",
          parent_name: values[1] || "",
          phone: values[2] || "",
          email: values[3] || "",
          event: values[4] || "",
          facility: normalizeGymName(values[5] || ""),
          status: (values[6]?.toLowerCase() as Lead["status"]) || "new",
          notes: "",
          gym_id: currentGym.id
        };

        // Basic validation
        if (!leadData.full_name || !leadData.email) {
          errorCount++;
          console.warn("Skipping invalid lead:", leadData);
          continue;
        }

        try {
          await createLead(leadData);
          successCount++;
        } catch (error) {
          console.error("Error creating lead:", error);
          errorCount++;
        }
      }

      toast.success(`Imported ${successCount} leads successfully${errorCount > 0 ? ` (${errorCount} failed)` : ''}`);
      setPastedData("");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Import error:", error);
      toast.error("Failed to import leads. Please check the data format.");
    } finally {
      setIsImporting(false);
    }
  };

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    await processLeadData(text);
    
    // Reset the file input
    if (event.target) {
      event.target.value = '';
    }
  };

  return (
    <div className="flex gap-2">
      <label className="cursor-pointer">
        <Button
          variant="outline"
          className="gap-2 border-[#cec4c1] text-[#8f93a0] hover:bg-[#cec4c1]/10"
          disabled={isImporting}
        >
          <FileUpIcon className="w-4 h-4" />
          {isImporting ? "Importing..." : "Import CSV"}
        </Button>
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileImport}
          disabled={isImporting}
        />
      </label>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 border-[#cec4c1] text-[#8f93a0] hover:bg-[#cec4c1]/10"
          >
            <ClipboardPasteIcon className="w-4 h-4" />
            Paste Data
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Paste Lead Data</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Paste your CSV data here (comma-separated values)..."
              value={pastedData}
              onChange={(e) => setPastedData(e.target.value)}
              className="min-h-[200px]"
            />
            <Button
              onClick={() => processLeadData(pastedData)}
              disabled={isImporting || !pastedData.trim()}
            >
              {isImporting ? "Importing..." : "Import Data"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}