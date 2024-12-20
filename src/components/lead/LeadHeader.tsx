import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { GymSelector } from "@/components/gym/GymSelector";
import { LeadImporter } from "./LeadImporter";

interface LeadHeaderProps {
  onExport: () => void;
}

export function LeadHeader({ onExport }: LeadHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center bg-white p-6 rounded-lg border border-[#cec4c1]">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-[#8f93a0]">Winter Camp Sales</h1>
        <GymSelector />
      </div>
      <div className="flex gap-2 flex-wrap">
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