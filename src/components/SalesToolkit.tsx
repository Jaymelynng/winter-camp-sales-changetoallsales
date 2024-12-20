import { useState } from "react";
import { QuickScripts } from "./toolkit/QuickScripts";
import { CallStageGuide } from "./toolkit/CallStageGuide";
import { CommonQuestions } from "./toolkit/CommonQuestions";
import { cn } from "@/lib/utils";
import { Lead } from "@/types/lead";
import { CallbackTracker } from "./toolkit/CallbackTracker";
import { ToolkitHeader } from "./toolkit/ToolkitHeader";

export const SalesToolkit = () => {
  const [callStage, setCallStage] = useState<string>("introduction");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [callbackNotes, setCallbackNotes] = useState<string>("");

  return (
    <div 
      className={cn(
        "bg-custom-white border-l border-custom-light p-4 overflow-y-auto h-screen transition-all duration-300",
        isExpanded ? "w-[800px]" : "w-[400px]"
      )}
    >
      <CallStageGuide callStage={callStage} setCallStage={setCallStage} />
      
      <div className="space-y-4 mt-4">
        <ToolkitHeader isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <QuickScripts callStage={callStage} />
        <CommonQuestions />
        <CallbackTracker 
          selectedLead={selectedLead}
          callbackNotes={callbackNotes}
          setCallbackNotes={setCallbackNotes}
        />
      </div>
    </div>
  );
};