import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GymProvider } from "./contexts/GymContext";
import GymLayout from "./layouts/GymLayout";
import GymDashboard from "./pages/GymDashboard";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GymProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/gym" element={<GymLayout />}>
              <Route path=":gymId" element={<GymDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GymProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;