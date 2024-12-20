import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Lead, LeadInput } from "@/types/lead";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LeadFormFields, formSchema } from "./LeadFormFields";
import { LeadDialogHeader } from "./LeadDialogHeader";
import { LeadDialogTrigger } from "./LeadDialogTrigger";
import * as z from "zod";
import { Button } from "../ui/button";

interface LeadDialogProps {
  lead?: Lead;
  onSave: (data: LeadInput) => void;
  gymId?: string;
}

export function LeadDialog({ lead, onSave, gymId }: LeadDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parent_name: lead?.parent_name || "",
      child_name: lead?.child_name || "",
      phone: lead?.phone || "",
      email: lead?.email || "",
      event: lead?.event || "",
      facility: lead?.facility || "",
      notes: lead?.notes || "",
      status: lead?.status || "new",
      lead_source: lead?.lead_source || "",
      lead_temperature: lead?.lead_temperature || "warm",
      gym_id: lead?.gym_id || gymId || null,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const leadData: LeadInput = {
      parent_name: values.parent_name,
      child_name: values.child_name,
      phone: values.phone,
      email: values.email,
      event: values.event,
      facility: values.facility,
      notes: values.notes || "",
      status: values.status,
      lead_source: values.lead_source || "",
      lead_temperature: values.lead_temperature,
      gym_id: values.gym_id,
    };
    onSave(leadData);
    toast.success("Lead saved successfully!");
  }

  return (
    <Dialog>
      <LeadDialogTrigger />
      <DialogContent className="sm:max-w-[425px]">
        <LeadDialogHeader lead={lead} />
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