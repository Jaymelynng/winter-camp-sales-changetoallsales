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
import { PencilIcon, ScrollTextIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { RichTextEditor } from "./RichTextEditor";
import { LeadTableHeader } from "./lead/LeadTableHeader";
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";

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

export function LeadsTable({ leads, onEdit, searchTerm, onSearchChange }: LeadsTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Lead;
    direction: "asc" | "desc";
  }>({ key: "fullName", direction: "asc" });
  
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [callbackNotes, setCallbackNotes] = useState<string>("");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

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
    <div className="flex gap-4">
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
                <TableHead>Full Name</TableHead>
                <TableHead>Parent/Guardian</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.fullName}</TableCell>
                  <TableCell>{lead.parentName}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{lead.phone}</span>
                      <span className="text-sm text-muted-foreground">
                        {lead.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{lead.event}</TableCell>
                  <TableCell>{lead.facility}</TableCell>
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
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-custom-slate hover:text-custom-mauve"
                          onClick={() => setSelectedLead(lead)}
                        >
                          <ScrollTextIcon className="h-4 w-4" />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-96 bg-custom-white border-custom-light">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-custom-slate">Notes History</h4>
                          <div className="text-sm text-custom-slate">
                            <div className="space-y-2">
                              <div className="border-l-2 border-custom-mauve pl-3">
                                <p className="text-xs text-custom-gray">
                                  {formatDate(lead.registrationDate)}
                                </p>
                                <RichTextEditor
                                  content={lead.notes}
                                  onChange={() => {}}
                                  editable={false}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(lead)}
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

      <div className="w-96 border rounded-md p-4 h-[calc(100vh-8rem)] sticky top-4">
        <h3 className="font-semibold mb-4 text-custom-slate">Callback Tracker</h3>
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {selectedLead ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-custom-slate">{selectedLead.fullName}</h4>
                  <span className="text-sm text-custom-gray">{formatDate(selectedLead.registrationDate)}</span>
                </div>
                <RichTextEditor
                  content={callbackNotes}
                  onChange={setCallbackNotes}
                  editable={true}
                />
              </div>
            ) : (
              <p className="text-custom-gray text-sm">Select a lead to view and edit callback notes</p>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}