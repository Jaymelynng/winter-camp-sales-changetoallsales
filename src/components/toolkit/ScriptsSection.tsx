import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function ScriptsSection() {
  const [scriptType, setScriptType] = useState("introduction");

  const scripts = {
    introduction: [
      {
        title: "Warm Welcome",
        content: "Hi, this is [Your Name] from [Gym Name]. I noticed you expressed interest in our winter camp program. Is this a good time to chat?"
      },
      {
        title: "Follow Up",
        content: "Hello, I'm following up regarding your interest in our winter camp. Have you had a chance to review the program details?"
      }
    ],
    closing: [
      {
        title: "Enrollment Close",
        content: "Given everything we've discussed, would you like to secure your spot in our winter camp program today?"
      },
      {
        title: "Special Offer",
        content: "If you enroll today, we're offering a special early-bird discount. Would you like to take advantage of that?"
      }
    ],
    objections: [
      {
        title: "Price Concern",
        content: "I understand your concern about the investment. Let me explain the value our program provides..."
      },
      {
        title: "Time Commitment",
        content: "We offer flexible scheduling options to accommodate your needs..."
      }
    ]
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <Select value={scriptType} onValueChange={setScriptType}>
          <SelectTrigger className="w-full bg-[#f9fafb] border-[#cec4c1] text-[#8f93a0]">
            <SelectValue placeholder="Select script type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="introduction">Introduction Scripts</SelectItem>
            <SelectItem value="closing">Closing Scripts</SelectItem>
            <SelectItem value="objections">Handling Objections</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Accordion type="single" collapsible className="space-y-2">
        {scripts[scriptType as keyof typeof scripts].map((script, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border border-[#cec4c1] rounded-lg bg-[#f9fafb] overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-3 text-[#b48f8f] hover:bg-[#cec4c1]/10">
              {script.title}
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-[#8f93a0] bg-white">
              {script.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}