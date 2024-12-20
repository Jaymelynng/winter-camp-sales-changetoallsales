import { useState } from "react";
import { QuickScripts } from "./toolkit/QuickScripts";
import { CallStageGuide } from "./toolkit/CallStageGuide";
import { CommonQuestions } from "./toolkit/CommonQuestions";
import { Button } from "./ui/button";
import { Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { RichTextEditor } from "./RichTextEditor";
import { ScrollArea } from "./ui/scroll-area";
import { Lead } from "@/types/lead";

export const SalesToolkit = () => {
  const [callStage, setCallStage] = useState<string>("introduction");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [callbackNotes, setCallbackNotes] = useState<string>("");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

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

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-4 text-custom-slate">Callback Tracker</h3>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {selectedLead ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-custom-slate">{selectedLead.fullName}</h4>
                    <span className="text-sm text-custom-gray">
                      {formatDate(selectedLead.registrationDate)}
                    </span>
                  </div>
                  <RichTextEditor
                    content={callbackNotes}
                    onChange={setCallbackNotes}
                    editable={true}
                  />
                </div>
              ) : (
                <p className="text-custom-gray text-sm">
                  Select a lead to view and edit callback notes
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};