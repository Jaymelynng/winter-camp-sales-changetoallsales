import {
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lead } from "@/types/lead";

interface LeadDialogHeaderProps {
  lead?: Lead;
}

export function LeadDialogHeader({ lead }: LeadDialogHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle>
        {lead ? "Edit Lead" : "Add New Lead"}
      </DialogTitle>
    </DialogHeader>
  );
}