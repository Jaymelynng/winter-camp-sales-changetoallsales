import { Accordion } from "@/components/ui/accordion";
import { CallStageGuide } from "./CallStageGuide";
import { CallbackTracker } from "./CallbackTracker";
import { FaqSection } from "./FaqSection";
import { ScriptsSection } from "./ScriptsSection";
import { useState } from "react";
import { Lead } from "@/types/lead";

export function SalesToolkit() {
  const [callStage, setCallStage] = useState("introduction");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [callbackNotes, setCallbackNotes] = useState("");

  return (
    <div className="h-screen overflow-y-auto scrollbar-hidden">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-custom-slate mb-4">Sales Toolkit</h2>
        <Accordion type="single" collapsible className="space-y-2">
          <CallStageGuide 
            callStage={callStage} 
            setCallStage={setCallStage} 
          />
          <ScriptsSection />
          <FaqSection />
          <CallbackTracker 
            selectedLead={selectedLead}
            callbackNotes={callbackNotes}
            setCallbackNotes={setCallbackNotes}
          />
        </Accordion>
      </div>
    </div>
  );
}