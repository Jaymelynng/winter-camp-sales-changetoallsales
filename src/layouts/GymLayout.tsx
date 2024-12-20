import { Outlet } from "react-router-dom";
import { GymSelector } from "@/components/gym/GymSelector";
import { useGym } from "@/contexts/GymContext";

export default function GymLayout() {
  const { isLoading } = useGym();

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
          <GymSelector />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}