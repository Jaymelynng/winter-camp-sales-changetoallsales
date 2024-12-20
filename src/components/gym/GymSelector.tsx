import { Gym, GymGroup, organizeGymsByBrand } from "@/types/gym";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGym } from "@/contexts/GymContext";
import { Building } from "lucide-react";

export function GymSelector() {
  const { currentGym, setCurrentGym, gyms } = useGym();
  const gymGroups = organizeGymsByBrand(gyms);

  return (
    <div className="flex items-center gap-2">
      <Building className="h-5 w-5 text-[#b48f8f]" />
      <Select
        value={currentGym?.id || "all"}
        onValueChange={(value) => {
          if (value === "all") {
            setCurrentGym(null);
          } else {
            const gym = gyms.find((g) => g.id === value);
            if (gym) setCurrentGym(gym);
          }
        }}
      >
        <SelectTrigger className="w-[280px] bg-white border-[#cec4c1]">
          <SelectValue placeholder="Select a gym location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Gyms</SelectItem>
          {gymGroups.map((group) => (
            <SelectGroup key={group.name}>
              <SelectLabel className="font-semibold text-[#8f93a0]">
                {group.name}
              </SelectLabel>
              {group.locations.map((gym) => (
                <SelectItem key={gym.id} value={gym.id}>
                  {gym.location}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}