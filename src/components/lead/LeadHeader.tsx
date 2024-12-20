import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { GymSelector } from "@/components/gym/GymSelector";
import { LeadImporter } from "./LeadImporter";

interface LeadHeaderProps {
  onExport: () => void;
}

export function LeadHeader({ onExport }: LeadHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[#8f93a0]">Winter Camp Sales Toolkit</h1>
        <GymSelector />
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="gap-2 border-[#cec4c1] text-[#8f93a0] hover:bg-[#cec4c1]/10"
          onClick={onExport}
        >
          <Download className="w-4 h-4" />
          Export Leads
        </Button>
        <LeadImporter />
      </div>
    </div>
  );
}