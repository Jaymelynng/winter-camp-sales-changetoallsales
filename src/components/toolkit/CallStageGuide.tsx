import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PhoneCall, CheckCircle2 } from "lucide-react";

interface CallStageGuideProps {
  callStage: string;
  setCallStage: (value: string) => void;
}

export const CallStageGuide = ({ callStage, setCallStage }: CallStageGuideProps) => {
  const getStageTips = () => {
    switch (callStage) {
      case "introduction":
        return {
          title: "Building Rapport",
          tips: [
            "Reference their previous camp experience",
            "Use the child's name frequently",
            "Sound enthusiastic and welcoming",
            "Listen for parent's tone and match their energy"
          ]
        };
      case "discovery":
        return {
          title: "Ask Open Questions",
          tips: [
            "Focus on previous positive experiences",
            "Ask about child's interests",
            "Listen for potential concerns",
            "Take notes for personalization"
          ]
        };
      case "presentation":
        return {
          title: "Highlight Benefits",
          tips: [
            "Connect activities to child's interests",
            "Emphasize safety and supervision",
            "Mention social skill development",
            "Share specific activity examples"
          ]
        };
      case "closing":
        return {
          title: "Secure Commitment",
          tips: [
            "Create urgency with limited spots",
            "Reiterate the special discount",
            "Make enrollment process easy",
            "Have payment options ready"
          ]
        };
      default:
        return { title: "", tips: [] };
    }
  };

  const stageTips = getStageTips();

  return (
    <Card className="bg-custom-white border-custom-light">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <PhoneCall className="w-5 h-5 text-custom-mauve" />
          <h3 className="font-semibold text-custom-slate">Call Flow Guide</h3>
        </div>

        <ToggleGroup 
          type="single" 
          value={callStage} 
          onValueChange={(value) => value && setCallStage(value)}
          className="flex flex-wrap gap-2 mb-6"
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

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            {stageTips.title}
          </h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            {stageTips.tips.map((tip, index) => (
              <li key={index}>• {tip}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};