import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PhoneCall } from "lucide-react";

interface CallFlowGuideProps {
  callStage: string;
  setCallStage: (value: string) => void;
}

export const CallFlowGuide = ({ callStage, setCallStage }: CallFlowGuideProps) => {
  return (
    <Card className="bg-custom-white border-custom-light mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-custom-slate">
          <PhoneCall className="w-5 h-5 text-custom-mauve" />
          Call Flow Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ToggleGroup 
          type="single" 
          value={callStage} 
          onValueChange={(value) => value && setCallStage(value)}
          className="flex flex-wrap gap-2"
        >
          <ToggleGroupItem 
            value="introduction" 
            aria-label="Introduction"
            className="bg-custom-light/20 data-[state=on]:bg-custom-mauve data-[state=on]:text-white"
          >
            1. Introduction
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="discovery" 
            aria-label="Discovery"
            className="bg-custom-light/20 data-[state=on]:bg-custom-mauve data-[state=on]:text-white"
          >
            2. Discovery
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="presentation" 
            aria-label="Presentation"
            className="bg-custom-light/20 data-[state=on]:bg-custom-mauve data-[state=on]:text-white"
          >
            3. Presentation
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="closing" 
            aria-label="Closing"
            className="bg-custom-light/20 data-[state=on]:bg-custom-mauve data-[state=on]:text-white"
          >
            4. Closing
          </ToggleGroupItem>
        </ToggleGroup>
      </CardContent>
    </Card>
  );
};