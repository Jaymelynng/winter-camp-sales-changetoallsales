import { createContext, useContext, useState, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Gym {
  id: string;
  name: string;
  location: string;
}

interface GymContextType {
  currentGym: Gym | null;
  setCurrentGym: (gym: Gym | null) => void;
  gyms: Gym[];
  isLoading: boolean;
}

const GymContext = createContext<GymContextType | undefined>(undefined);

export function GymProvider({ children }: { children: ReactNode }) {
  const [currentGym, setCurrentGym] = useState<Gym | null>(null);

  const { data: gyms = [], isLoading } = useQuery({
    queryKey: ["gyms"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gyms")
        .select("*")
        .order("name");

      if (error) {
        toast.error("Failed to load gyms");
        throw error;
      }

      return data as Gym[];
    },
  });

  return (
    <GymContext.Provider value={{ currentGym, setCurrentGym, gyms, isLoading }}>
      {children}
    </GymContext.Provider>
  );
}

export function useGym() {
  const context = useContext(GymContext);
  if (context === undefined) {
    throw new Error("useGym must be used within a GymProvider");
  }
  return context;
}