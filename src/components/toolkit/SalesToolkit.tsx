import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScriptsSection } from "./ScriptsSection";
import { FaqSection } from "./FaqSection";

export function SalesToolkit() {
  return (
    <div className="w-96 border-l border-[#cec4c1] bg-white p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-[#8f93a0] mb-6">Sales Toolkit</h2>
      <Tabs defaultValue="scripts" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="scripts" className="flex-1">Scripts</TabsTrigger>
          <TabsTrigger value="faq" className="flex-1">FAQ</TabsTrigger>
        </TabsList>
        <TabsContent value="scripts">
          <ScriptsSection />
        </TabsContent>
        <TabsContent value="faq">
          <FaqSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}