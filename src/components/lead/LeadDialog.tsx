import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Lead, LeadInput } from "@/types/lead";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LeadFormFields, formSchema } from "./LeadFormFields";
import * as z from "zod";

interface LeadDialogProps {
  lead?: Lead;
  onSave: (data: LeadInput) => void;
  gymId?: string;
}

export function LeadDialog({ lead, onSave, gymId }: LeadDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: lead?.full_name || "",
      parent_name: lead?.parent_name || "",
      phone: lead?.phone || "",
      email: lead?.email || "",
      event: lead?.event || "",
      facility: lead?.facility || "",
      notes: lead?.notes || "",
      status: lead?.status || "new",
      gym_id: lead?.gym_id || gymId || null,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const leadData: LeadInput = {
      full_name: values.full_name,
      parent_name: values.parent_name,
      phone: values.phone,
      email: values.email,
      event: values.event,
      facility: values.facility,
      notes: values.notes || "",
      status: values.status,
      gym_id: values.gym_id,
    };
    onSave(leadData);
    toast.success("Lead saved successfully!");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {lead ? "Edit Lead" : "Add New Lead"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <LeadFormFields form={form} />
            <Button type="submit" className="w-full">
              Save Lead
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}