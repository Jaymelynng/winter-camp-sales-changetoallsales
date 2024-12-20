import { Outlet, useNavigate } from "react-router-dom";
import { useGym } from "@/contexts/GymContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building } from "lucide-react";

export default function GymLayout() {
  const { currentGym, setCurrentGym, gyms, isLoading } = useGym();
  const navigate = useNavigate();

  const handleGymChange = (gymId: string) => {
    const gym = gyms.find((g) => g.id === gymId);
    if (gym) {
      setCurrentGym(gym);
      navigate(`/gym/${gymId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
        <div className="text-[#8f93a0] animate-pulse">Loading gyms...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <header className="border-b border-[#cec4c1]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-[#b48f8f]" />
            <Select onValueChange={handleGymChange} value={currentGym?.id}>
              <SelectTrigger className="w-[280px] bg-white border-[#cec4c1]">
                <SelectValue placeholder="Select a gym location" />
              </SelectTrigger>
              <SelectContent>
                {gyms.map((gym) => (
                  <SelectItem key={gym.id} value={gym.id}>
                    {gym.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}