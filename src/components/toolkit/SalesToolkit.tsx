import { useState } from "react";
import { Lead } from "@/types/lead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneCall, TrendingUp, Flame, Trophy, Mail, BookOpen, HelpCircle, Lightbulb } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function SalesToolkit() {
  const [callStage, setCallStage] = useState("introduction");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [callbackNotes, setCallbackNotes] = useState("");

  return (
    <div className="space-y-8">
      {/* Toolkit Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-blue-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <PhoneCall className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-blue-600 text-sm font-medium">Follow-ups</p>
              <h4 className="text-xl font-bold">0 Today!</h4>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Every call brings kids closer to fun!</p>
        </Card>

        <Card className="p-4 bg-green-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-green-600 text-sm font-medium">Conversions</p>
              <h4 className="text-xl font-bold">0% to Goal</h4>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Keep the momentum going!</p>
        </Card>

        <Card className="p-4 bg-red-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Flame className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-red-600 text-sm font-medium">Hot Leads</p>
              <h4 className="text-xl font-bold">1 Ready!</h4>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Strike while the iron is hot!</p>
        </Card>

        <Card className="p-4 bg-purple-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Trophy className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-purple-600 text-sm font-medium">Recent Wins</p>
              <h4 className="text-xl font-bold">0 Families!</h4>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Amazing work! Keep closing!</p>
        </Card>
      </div>

      {/* Sales Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-purple-600">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-medium">Scripts</h3>
            </div>
            <p className="text-sm text-gray-600">
              "Hi [Parent Name], I noticed [Child Name] had a great time at our Thanksgiving Camp! We're offering a special 15% discount on Winter Camp enrollment..."
            </p>
            <Button variant="link" className="text-purple-600 p-0 h-auto text-sm">
              View Full Script →
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-purple-600">
              <Mail className="w-5 h-5" />
              <h3 className="font-medium">Email Templates</h3>
            </div>
            <div className="space-y-3">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Send Winter Camp Info
              </Button>
              <Button variant="outline" className="w-full">
                Send Discount Offer
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-purple-600">
              <Lightbulb className="w-5 h-5" />
              <h3 className="font-medium">Tips</h3>
            </div>
            <ul className="text-sm space-y-2 text-gray-600">
              <li>• Mention the 15% leotard discount</li>
              <li>• Highlight our certified instructors</li>
              <li>• Emphasize limited spots available</li>
              <li>• Share success stories</li>
            </ul>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-purple-600">
              <HelpCircle className="w-5 h-5" />
              <h3 className="font-medium">FAQs</h3>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm">Why Winter Camp?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600">
                  Winter Camp offers a fun and active way for kids to stay engaged during the break.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm">What's included?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600">
                  Daily activities, professional instruction, and a special performance at the end.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Card>
      </div>
    </div>
  );
}