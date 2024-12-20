import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpDown } from "lucide-react";

interface LeadTableHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSort: (column: string) => void;
}

export function LeadTableHeader({ searchTerm, onSearchChange, onSort }: LeadTableHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="relative w-72">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-custom-slate" />
        <Input
          placeholder="Search leads..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 bg-custom-white border-custom-light"
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={() => onSort("fullName")}
          className="text-custom-slate hover:text-custom-mauve"
        >
          <ArrowUpDown className="h-4 w-4 mr-2" />
          Sort by Name
        </Button>
        <Button
          variant="ghost"
          onClick={() => onSort("status")}
          className="text-custom-slate hover:text-custom-mauve"
        >
          <ArrowUpDown className="h-4 w-4 mr-2" />
          Sort by Status
        </Button>
      </div>
    </div>
  );
}