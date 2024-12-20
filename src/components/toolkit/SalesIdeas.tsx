import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export const SalesIdeas = () => {
  const ideas = [
    {
      title: "Highlight Early Bird Discount",
      description: "Mention the 15% discount for early registration to create urgency."
    },
    {
      title: "Share Success Stories",
      description: "Tell stories about children who loved their previous camp experience."
    },
    {
      title: "Focus on Skills Development",
      description: "Emphasize how winter camp helps develop social and physical skills."
    },
    {
      title: "Mention Limited Spots",
      description: "Create urgency by mentioning that spots are filling up quickly."
    }
  ];

  return (
    <Card className="bg-custom-white border-custom-light">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-custom-slate">
          <Lightbulb className="w-5 h-5 text-custom-mauve" />
          Sales Ideas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {ideas.map((idea, index) => (
            <li key={index} className="border-b border-custom-light last:border-0 pb-3 last:pb-0">
              <h4 className="font-medium text-custom-slate">{idea.title}</h4>
              <p className="text-sm text-muted-foreground">{idea.description}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};