import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";

export function LeadDialogTrigger() {
  return (
    <DialogTrigger asChild>
      <Button className="ml-auto">
        <PlusIcon className="mr-2 h-4 w-4" />
        Add Lead
      </Button>
    </DialogTrigger>
  );
}