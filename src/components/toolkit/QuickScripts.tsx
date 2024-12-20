import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { MessageSquare, HelpCircle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RichTextEditor } from "../RichTextEditor";
import { useState } from "react";

interface QuickScriptsProps {
  callStage: string;
}

export const QuickScripts = ({ callStage }: QuickScriptsProps) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "You can now paste the text anywhere",
    });
  };

  const getScriptContent = () => {
    switch (callStage) {
      case "introduction":
        return {
          title: "Warm Introduction",
          text: "Hi [Parent Name], I noticed [Child Name] had a great time at our Thanksgiving Camp! We're offering a special 15% discount on Winter Camp enrollment for returning families. Would you like to hear more about our exciting winter activities?"
        };
      case "discovery":
        return {
          title: "Understanding Needs",
          text: "What activities did [Child Name] enjoy most during their last camp experience? We've enhanced those activities and added exciting new ones for Winter Camp."
        };
      case "presentation":
        return {
          title: "Value Proposition",
          text: "Our Winter Camp program is specially designed to keep children engaged and learning while having fun. With our experienced staff and diverse activities, [Child Name] will develop new skills and make lasting friendships."
        };
      case "closing":
        return {
          title: "Securing Enrollment",
          text: "Given everything we've discussed about [Child Name]'s interests and our program, would you like to secure their spot with our special returning family discount? We can process the enrollment right now."
        };
      default:
        return { title: "", text: "" };
    }
  };

  const script = getScriptContent();

  return (
    <Card className="bg-custom-white border-custom-light">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-custom-slate">
          <MessageSquare className="w-5 h-5 text-custom-mauve" />
          Quick Scripts
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircle className="w-4 h-4" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="bg-custom-white border-custom-light">
              <p className="text-sm text-custom-slate">
                These scripts are tailored to each stage of the call. Use them as a guide and adapt them to your style.
              </p>
            </HoverCardContent>
          </HoverCard>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="script">
            <AccordionTrigger className="font-semibold text-custom-slate">
              {script.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="relative bg-gray-50 p-4 rounded-lg group">
                <p className="text-sm text-muted-foreground">{script.text}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard(script.text)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="space-y-2">
          <h4 className="font-semibold text-custom-slate">Call Notes</h4>
          <RichTextEditor 
            content={notes} 
            onChange={setNotes}
          />
        </div>
      </CardContent>
    </Card>
  );
};