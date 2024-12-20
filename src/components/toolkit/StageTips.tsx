import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface StageTipsProps {
  callStage: string;
}

export const StageTips = ({ callStage }: StageTipsProps) => {
  const getTips = () => {
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

  const stageTips = getTips();

  return (
    <Card className="bg-custom-white border-custom-light">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-custom-slate">
          <CheckCircle2 className="w-5 h-5 text-custom-mauve" />
          Stage Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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