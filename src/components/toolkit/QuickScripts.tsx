import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RichTextEditor } from "../RichTextEditor";
import { useState } from "react";

export const QuickScripts = () => {
  const { toast } = useToast();
  const [selectedScript, setSelectedScript] = useState("");

  const scripts = [
    {
      title: "Warm Introduction",
      content: "Hi [Parent Name], I noticed [Child Name] had a great time at our Thanksgiving Camp! We're offering a special 15% discount on Winter Camp enrollment for returning families. Would you like to hear more about our exciting winter activities?"
    },
    {
      title: "Benefits Overview",
      content: "Our Winter Camp program is specially designed to keep children engaged and learning while having fun. With our experienced staff and diverse activities, [Child Name] will develop new skills and make lasting friendships."
    },
    {
      title: "Closing Script",
      content: "Given everything we've discussed about [Child Name]'s interests and our program, would you like to secure their spot with our special returning family discount? We can process the enrollment right now."
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "You can now paste the text anywhere",
    });
  };

  return (
    <Card className="bg-custom-white border-custom-light">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-custom-slate">
          <MessageSquare className="w-5 h-5 text-custom-mauve" />
          Quick Scripts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {scripts.map((script, index) => (
          <div key={index} className="space-y-2 border-b border-custom-light last:border-0 pb-4 last:pb-0">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-custom-slate">{script.title}</h4>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => copyToClipboard(script.content)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{script.content}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};