import { useState } from "react";
import { LeadsTable } from "@/components/LeadsTable";
import { StatsCards } from "@/components/StatsCards";
import { LeadDialog } from "@/components/LeadDialog";
import { mockLeads } from "@/data/mockLeads";
import { Lead } from "@/types/lead";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();

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

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Leads Management</h1>
          <LeadDialog onSave={handleSaveLead} />
        </div>

        <StatsCards leads={leads} />

        <Tabs defaultValue="leads" className="space-y-4">
          <TabsList>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="help">Help & Scripts</TabsTrigger>
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

          <TabsContent value="help">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Follow-up Scripts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Initial Contact</h4>
                    <p className="text-sm text-muted-foreground">
                      "Hi [Name], this is [Your Name] from [Facility]. I noticed you expressed interest in our [Event]. Would you like to learn more about our programs?"
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Follow-up</h4>
                    <p className="text-sm text-muted-foreground">
                      "Hello [Name], I'm following up about [Event]. We have limited spots available and I wanted to ensure you have all the information you need to make a decision."
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Best Practices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Response Time</h4>
                    <p className="text-sm text-muted-foreground">
                      Aim to respond to new leads within 24 hours. Quick response times significantly increase conversion rates.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Follow-up Schedule</h4>
                    <p className="text-sm text-muted-foreground">
                      - Day 1: Initial contact
                      - Day 3: First follow-up
                      - Day 7: Second follow-up
                      - Day 14: Final follow-up
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