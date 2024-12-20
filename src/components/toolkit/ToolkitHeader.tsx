import { Button } from "../ui/button";
import { Maximize2, Minimize2 } from "lucide-react";

interface ToolkitHeaderProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

export const ToolkitHeader = ({ isExpanded, setIsExpanded }: ToolkitHeaderProps) => {
  return (
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
  );
};