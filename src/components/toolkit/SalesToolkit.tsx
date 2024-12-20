import { Accordion } from "@/components/ui/accordion";
import { CallStageGuide } from "./CallStageGuide";
import { CallbackTracker } from "./CallbackTracker";
import { FaqSection } from "./FaqSection";
import { ScriptsSection } from "./ScriptsSection";

export function SalesToolkit() {
  return (
    <div className="h-screen overflow-y-auto scrollbar-hidden">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-custom-slate mb-4">Sales Toolkit</h2>
        <Accordion type="single" collapsible className="space-y-2">
          <CallStageGuide />
          <ScriptsSection />
          <FaqSection />
          <CallbackTracker />
        </Accordion>
      </div>
    </div>
  );
}