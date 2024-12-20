import { useState } from "react";
import { LeadsTable } from "@/components/LeadsTable";
import { StatsCards } from "@/components/StatsCards";
import { LeadDialog } from "@/components/LeadDialog";
import { mockLeads } from "@/data/mockLeads";
import { Lead } from "@/types/lead";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUpIcon, Copy, MessageSquare, Info, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();
  const { toast } = useToast();

  const handleSaveLead = (data: Partial<Lead>) => {
    if (selectedLead) {
      setLeads(leads.map(lead => 
        lead.id === selectedLead.id ? { ...lead, ...data } : lead
      ));
      setSelectedLead(undefined);
    } else {
      const newLead = {
        ...data,
        id: (leads.length + 1).toString(),
        registrationDate: new Date().toISOString().split('T')[0]
      } as Lead;
      setLeads([...leads, newLead]);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "You can now paste the text anywhere",
    });
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Winter Camp Sales Toolkit</h1>
          <Button variant="outline" className="gap-2">
            <FileUpIcon className="w-4 h-4" />
            Import Leads
          </Button>
        </div>

        <StatsCards leads={leads} />

        <Tabs defaultValue="leads" className="space-y-4">
          <TabsList>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="toolkit">Sales Toolkit</TabsTrigger>
          </TabsList>
          
          <TabsContent value="leads" className="space-y-4">
            <LeadsTable
              leads={leads}
              onEdit={(lead) => setSelectedLead(lead)}
            />
            {selectedLead && (
              <LeadDialog
                lead={selectedLead}
                onSave={handleSaveLead}
              />
            )}
          </TabsContent>

          <TabsContent value="toolkit">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                    Quick Scripts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative bg-gray-50 p-4 rounded-lg group">
                    <h4 className="font-semibold mb-2">Initial Contact</h4>
                    <p className="text-sm text-muted-foreground">
                      "Hi [Parent Name], I noticed [Child Name] had a great time at our Thanksgiving Camp! We're offering a special 15% discount on Winter Camp enrollment for returning families. Would you like to hear more about our exciting winter activities?"
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                      onClick={() => copyToClipboard("Hi [Parent Name], I noticed [Child Name] had a great time at our Thanksgiving Camp! We're offering a special 15% discount on Winter Camp enrollment for returning families. Would you like to hear more about our exciting winter activities?")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="relative bg-gray-50 p-4 rounded-lg group">
                    <h4 className="font-semibold mb-2">Follow-up</h4>
                    <p className="text-sm text-muted-foreground">
                      "Hello [Parent Name], I'm following up about our Winter Camp program. We're filling up quickly and I wanted to ensure [Child Name] doesn't miss out. Would you like me to reserve a spot while we still have availability?"
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                      onClick={() => copyToClipboard("Hello [Parent Name], I'm following up about our Winter Camp program. We're filling up quickly and I wanted to ensure [Child Name] doesn't miss out. Would you like me to reserve a spot while we still have availability?")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-purple-600" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">What ages do you accept?</h4>
                    <p className="text-sm text-muted-foreground">
                      "Our Winter Camp program is designed for children ages 5-12, with activities tailored to different age groups to ensure everyone has an engaging and age-appropriate experience."
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">What's included in the fee?</h4>
                    <p className="text-sm text-muted-foreground">
                      "The program fee includes all activities, materials, snacks, and a camp t-shirt. We provide a full day of supervised activities from 9 AM to 4 PM, with extended care options available."
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-purple-600" />
                    Sales Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Focus on Benefits</h4>
                    <p className="text-sm text-muted-foreground">
                      Emphasize how the camp helps children develop social skills, confidence, and new friendships while having fun in a safe environment.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Address Safety First</h4>
                    <p className="text-sm text-muted-foreground">
                      Parents often worry about safety. Proactively mention our certified staff, safety protocols, and low counselor-to-camper ratios.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Create Urgency</h4>
                    <p className="text-sm text-muted-foreground">
                      Mention limited spots and early bird discounts to encourage quick decision-making, but always remain honest about actual availability.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;