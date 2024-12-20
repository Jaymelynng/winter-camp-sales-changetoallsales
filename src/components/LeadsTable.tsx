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

interface LeadsTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
}

const statusColors = {
  new: "bg-blue-500",
  contacted: "bg-yellow-500",
  converted: "bg-green-500",
  lost: "bg-red-500",
};

export function LeadsTable({ leads, onEdit }: LeadsTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="rounded-md border">
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
          {leads.map((lead) => (
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
                    <Button variant="ghost" size="icon" className="text-custom-slate hover:text-custom-mauve">
                      <ScrollTextIcon className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 bg-custom-white border-custom-light">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-custom-slate">Notes History</h4>
                      <div className="text-sm text-custom-slate">
                        <div className="space-y-2">
                          <div className="border-l-2 border-custom-mauve pl-3">
                            <p className="text-xs text-custom-gray">
                              {formatDate(lead.registrationDate)}
                            </p>
                            <p className="mt-1">{lead.notes}</p>
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
  );
}