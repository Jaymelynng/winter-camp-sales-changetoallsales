import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { MessageSquare, HelpCircle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RichTextEditor } from "../RichTextEditor";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuickScriptsProps {
  callStage: string;
}

interface Script {
  id: string;
  title: string;
  content: string;
}

export const QuickScripts = ({ callStage }: QuickScriptsProps) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState("");
  const [selectedScript, setSelectedScript] = useState<string>("");
  const [editableScript, setEditableScript] = useState("");

  const scripts: Record<string, Script[]> = {
    introduction: [
      {
        id: "warm",
        title: "Warm Introduction",
        content: "Hi [Parent Name], I noticed [Child Name] had a great time at our Thanksgiving Camp! We're offering a special 15% discount on Winter Camp enrollment for returning families. Would you like to hear more about our exciting winter activities?"
      },
      {
        id: "formal",
        title: "Formal Introduction",
        content: "Good [morning/afternoon], this is [Your Name] from [Gym Name]. I'm reaching out regarding our upcoming Winter Camp program."
      }
    ],
    discovery: [
      {
        id: "needs",
        title: "Understanding Needs",
        content: "What activities did [Child Name] enjoy most during their last camp experience? We've enhanced those activities and added exciting new ones for Winter Camp."
      },
      {
        id: "preferences",
        title: "Activity Preferences",
        content: "Could you tell me more about what types of activities [Child Name] enjoys most? This will help us ensure they get the most out of their camp experience."
      }
    ],
    presentation: [
      {
        id: "value",
        title: "Value Proposition",
        content: "Our Winter Camp program is specially designed to keep children engaged and learning while having fun. With our experienced staff and diverse activities, [Child Name] will develop new skills and make lasting friendships."
      },
      {
        id: "benefits",
        title: "Program Benefits",
        content: "Let me highlight some key benefits of our Winter Camp program that I think would be perfect for [Child Name]..."
      }
    ],
    closing: [
      {
        id: "enrollment",
        title: "Securing Enrollment",
        content: "Given everything we've discussed about [Child Name]'s interests and our program, would you like to secure their spot with our special returning family discount? We can process the enrollment right now."
      },
      {
        id: "followup",
        title: "Follow-up Plan",
        content: "I understand you need some time to think it over. Would you like me to send you more information via email and follow up with you [specific day/time]?"
      }
    ]
  };

  const currentScripts = scripts[callStage] || [];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "You can now paste the text anywhere",
    });
  };

  const handleScriptSelect = (scriptId: string) => {
    const script = currentScripts.find(s => s.id === scriptId);
    if (script) {
      setSelectedScript(scriptId);
      setEditableScript(script.content);
    }
  };

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
        <div className="space-y-2">
          <label className="text-sm font-medium text-custom-slate">Select Script Template</label>
          <Select value={selectedScript} onValueChange={handleScriptSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a script..." />
            </SelectTrigger>
            <SelectContent>
              {currentScripts.map((script) => (
                <SelectItem key={script.id} value={script.id}>
                  {script.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedScript && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-custom-slate">Edit Script</h4>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => copyToClipboard(editableScript)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <RichTextEditor 
              content={editableScript} 
              onChange={setEditableScript}
            />
          </div>
        )}

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