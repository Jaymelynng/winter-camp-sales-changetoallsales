import { useState } from "react";
import { QuickScripts } from "./toolkit/QuickScripts";
import { CallStageGuide } from "./toolkit/CallStageGuide";
import { CommonQuestions } from "./toolkit/CommonQuestions";
import { Button } from "./ui/button";
import { Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const SalesToolkit = () => {
  const [callStage, setCallStage] = useState<string>("introduction");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={cn(
        "bg-custom-white border-l border-custom-light p-4 overflow-y-auto h-screen transition-all duration-300",
        isExpanded ? "w-[800px]" : "w-[400px]"
      )}
    >
      <CallStageGuide callStage={callStage} setCallStage={setCallStage} />
      
      <div className="space-y-4 mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-custom-slate">Quick Scripts</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-custom-slate hover:text-custom-mauve"
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
        <QuickScripts callStage={callStage} />
        <CommonQuestions />
      </div>
    </div>
  );
};