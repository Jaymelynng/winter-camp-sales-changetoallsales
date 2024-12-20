import { Outlet, useNavigate } from "react-router-dom";
import { useGym } from "@/contexts/GymContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    return <div>Loading gyms...</div>;
  }

  return (
    <div className="min-h-screen bg-custom-white">
      <header className="border-b border-custom-light">
        <div className="container mx-auto px-4 py-4">
          <Select onValueChange={handleGymChange} value={currentGym?.id}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a gym" />
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
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}