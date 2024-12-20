import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Lead } from "@/types/lead";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LeadFormFields, formSchema } from "./LeadFormFields";
import * as z from "zod";

interface LeadDialogProps {
  lead?: Lead;
  onSave: (data: any) => void;
}

export function LeadDialog({ lead, onSave }: LeadDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: lead || {
      fullName: "",
      parentName: "",
      phone: "",
      email: "",
      event: "",
      facility: "",
      notes: "",
      status: "new",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(values);
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