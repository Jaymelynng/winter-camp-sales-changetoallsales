import { Button } from "@/components/ui/button";
import { FileUpIcon, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGym } from "@/contexts/GymContext";

interface LeadHeaderProps {
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LeadHeader({ onExport, onImport }: LeadHeaderProps) {
  const { currentGym, setCurrentGym, gyms } = useGym();

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-custom-slate">Winter Camp Sales Toolkit</h1>
        <Select
          value={currentGym?.id || "all"}
          onValueChange={(value) => {
            if (value === "all") {
              setCurrentGym(null);
            } else {
              const gym = gyms.find((g) => g.id === value);
              if (gym) setCurrentGym(gym);
            }
          }}
        >
          <SelectTrigger className="w-[280px] bg-white border-[#cec4c1]">
            <SelectValue placeholder="Select a gym location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Gyms</SelectItem>
            {gyms.map((gym) => (
              <SelectItem key={gym.id} value={gym.id}>
                {gym.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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