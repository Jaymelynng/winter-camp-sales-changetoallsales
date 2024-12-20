import { Lead } from "@/types/lead";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { LeadTableHeader } from "./lead/LeadTableHeader";
import { useState, useRef } from "react";

interface LeadsTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const statusColors = {
  new: "bg-blue-500",
  contacted: "bg-yellow-500",
  converted: "bg-green-500",
  lost: "bg-red-500",
};

const temperatureColors = {
  cold: "bg-blue-200",
  warm: "bg-yellow-200",
  hot: "bg-red-200",
};

export function LeadsTable({ leads, onEdit, searchTerm, onSearchChange }: LeadsTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Lead;
    direction: "asc" | "desc";
  }>({ key: "parent_name", direction: "asc" });
  
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleSort = (column: keyof Lead) => {
    setSortConfig({
      key: column,
      direction:
        sortConfig.key === column && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const sortedLeads = [...leads].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="flex-1 space-y-4">
      <LeadTableHeader
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onSort={handleSort}
      />
      
      <div className="rounded-md border" ref={tableRef}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parent Name</TableHead>
              <TableHead>Child Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Facility</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Temperature</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedLeads.map((lead) => (
              <TableRow 
                key={lead.id}
                className={selectedLead?.id === lead.id ? "bg-custom-light/20" : ""}
                onClick={() => setSelectedLead(lead)}
              >
                <TableCell className="font-medium">{lead.parent_name}</TableCell>
                <TableCell>{lead.child_name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{lead.phone}</span>
                    <span className="text-sm text-muted-foreground">
                      {lead.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{lead.facility}</TableCell>
                <TableCell>{lead.lead_source}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      temperatureColors[lead.lead_temperature]
                    } text-gray-700 capitalize`}
                  >
                    {lead.lead_temperature}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      statusColors[lead.status]
                    } text-white capitalize`}
                  >
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(lead);
                    }}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}