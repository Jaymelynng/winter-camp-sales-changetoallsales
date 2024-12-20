import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScriptsSection } from "./ScriptsSection";
import { FaqSection } from "./FaqSection";

export function SalesToolkit() {
  return (
    <div className="w-96 border-l border-[#cec4c1] bg-white p-6 overflow-y-auto shadow-lg">
      <h2 className="text-2xl font-bold text-[#b48f8f] mb-6 border-b border-[#cec4c1] pb-3">Sales Toolkit</h2>
      <Tabs defaultValue="scripts" className="w-full">
        <TabsList className="w-full bg-[#f9fafb] mb-4">
          <TabsTrigger 
            value="scripts" 
            className="flex-1 text-[#8f93a0] data-[state=active]:bg-[#b48f8f] data-[state=active]:text-white"
          >
            Scripts
          </TabsTrigger>
          <TabsTrigger 
            value="faq" 
            className="flex-1 text-[#8f93a0] data-[state=active]:bg-[#b48f8f] data-[state=active]:text-white"
          >
            FAQ
          </TabsTrigger>
        </TabsList>
        <TabsContent value="scripts" className="mt-2">
          <ScriptsSection />
        </TabsContent>
        <TabsContent value="faq" className="mt-2">
          <FaqSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}