import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGyms } from "@/lib/supabase";
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
  const [currentGym, setCurrentGym] = useState<Gym | null>(() => {
    const saved = localStorage.getItem('currentGym');
    return saved ? JSON.parse(saved) : null;
  });

  const { data: gyms = [], isLoading } = useQuery({
    queryKey: ["gyms"],
    queryFn: getGyms,
    onError: () => {
      toast.error("Failed to load gyms");
    },
  });

  useEffect(() => {
    if (currentGym) {
      localStorage.setItem('currentGym', JSON.stringify(currentGym));
    }
  }, [currentGym]);

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