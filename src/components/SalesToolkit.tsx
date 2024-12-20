import { useState } from "react";
import { CommonQuestions } from "./toolkit/CommonQuestions";
import { cn } from "@/lib/utils";
import { Lead } from "@/types/lead";
import { ToolkitHeader } from "./toolkit/ToolkitHeader";
import { SalesIdeas } from "./toolkit/SalesIdeas";

export const SalesToolkit = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <div 
      className={cn(
        "bg-custom-white border-l border-custom-light p-4 overflow-y-auto h-screen transition-all duration-300",
        isExpanded ? "w-[800px]" : "w-[400px]"
      )}
    >
      <div className="space-y-4">
        <ToolkitHeader isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <CommonQuestions />
        <SalesIdeas />
      </div>
    </div>
  );
};