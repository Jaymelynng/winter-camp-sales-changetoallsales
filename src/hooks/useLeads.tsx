import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLeadsByGym, createLead, updateLead } from "@/lib/supabase";
import { Lead, LeadInput } from "@/types/lead";
import { toast } from "sonner";
import { useGym } from "@/contexts/GymContext";

export function useLeads() {
  const { currentGym } = useGym();
  const queryClient = useQueryClient();

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["leads", currentGym?.id],
    queryFn: () => getLeadsByGym(currentGym?.id),
    meta: {
      onError: () => {
        toast.error("Failed to load leads. Please try again.");
      }
    }
  });

  const createLeadMutation = useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead created successfully!");
    },
    onError: () => {
      toast.error("Failed to create lead. Please try again.");
    }
  });

  const updateLeadMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<LeadInput> }) =>
      updateLead(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update lead. Please try again.");
    }
  });

  return {
    leads,
    isLoading,
    createLead: createLeadMutation.mutate,
    updateLead: updateLeadMutation.mutate,
  };
}