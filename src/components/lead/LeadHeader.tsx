import { Button } from "@/components/ui/button";
import { FileUpIcon, Download } from "lucide-react";
import { GymSelector } from "@/components/gym/GymSelector";

interface LeadHeaderProps {
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LeadHeader({ onExport, onImport }: LeadHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-custom-slate">Winter Camp Sales Toolkit</h1>
        <GymSelector />
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="gap-2 border-custom-light text-custom-slate hover:bg-custom-light/10"
          onClick={onExport}
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
            onChange={onImport}
          />
        </label>
      </div>
    </div>
  );
}