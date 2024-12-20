import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScriptsSection } from "./ScriptsSection";
import { FaqSection } from "./FaqSection";
import { CallStageGuide } from "./CallStageGuide";
import { useState } from "react";

export function SalesToolkit() {
  const [callStage, setCallStage] = useState("introduction");

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-[#8f93a0] mb-4">Sales Tools</h2>
          <Tabs defaultValue="scripts" className="w-full">
            <TabsList className="w-full bg-[#f9fafb]">
              <TabsTrigger value="scripts" className="flex-1">Scripts</TabsTrigger>
              <TabsTrigger value="guide" className="flex-1">Call Guide</TabsTrigger>
              <TabsTrigger value="faq" className="flex-1">FAQs</TabsTrigger>
            </TabsList>
            <TabsContent value="scripts" className="mt-4">
              <ScriptsSection />
            </TabsContent>
            <TabsContent value="guide" className="mt-4">
              <CallStageGuide callStage={callStage} setCallStage={setCallStage} />
            </TabsContent>
            <TabsContent value="faq" className="mt-4">
              <FaqSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ScrollArea>
  );
}