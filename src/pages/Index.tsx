import { useState } from "react";
import { LeadsTable } from "@/components/LeadsTable";
import { StatsCards } from "@/components/StatsCards";
import { LeadDialog } from "@/components/LeadDialog";
import { mockLeads } from "@/data/mockLeads";
import { Lead } from "@/types/lead";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUpIcon, Copy, MessageSquare, Info, HelpCircle, CheckCircle2, PhoneCall } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Index = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();
  const [callStage, setCallStage] = useState<string>("introduction");
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
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-blue-600" />
                    Call Flow Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ToggleGroup type="single" value={callStage} onValueChange={(value) => value && setCallStage(value)}>
                    <ToggleGroupItem value="introduction" aria-label="Introduction">
                      1. Introduction
                    </ToggleGroupItem>
                    <ToggleGroupItem value="discovery" aria-label="Discovery">
                      2. Discovery
                    </ToggleGroupItem>
                    <ToggleGroupItem value="presentation" aria-label="Presentation">
                      3. Presentation
                    </ToggleGroupItem>
                    <ToggleGroupItem value="closing" aria-label="Closing">
                      4. Closing
                    </ToggleGroupItem>
                  </ToggleGroup>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="relative">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                      Quick Scripts
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <HelpCircle className="w-4 h-4" />
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <p className="text-sm">
                            These scripts are tailored to each stage of the call. Use them as a guide and adapt them to your style.
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {callStage === "introduction" && (
                      <div className="relative bg-gray-50 p-4 rounded-lg group">
                        <h4 className="font-semibold mb-2">Warm Introduction</h4>
                        <p className="text-sm text-muted-foreground">
                          "Hi [Parent Name], I noticed [Child Name] had a great time at our Thanksgiving Camp! We're offering a special 15% discount on Winter Camp enrollment for returning families. Would you like to hear more about our exciting winter activities?"
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard("Hi [Parent Name], I noticed [Child Name] had a great time at our Thanksgiving Camp! We're offering a special 15% discount on Winter Camp enrollment for returning families. Would you like to hear more about our exciting winter activities?")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    {callStage === "discovery" && (
                      <div className="relative bg-gray-50 p-4 rounded-lg group">
                        <h4 className="font-semibold mb-2">Understanding Needs</h4>
                        <p className="text-sm text-muted-foreground">
                          "What activities did [Child Name] enjoy most during their last camp experience? We've enhanced those activities and added exciting new ones for Winter Camp."
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard("What activities did [Child Name] enjoy most during their last camp experience? We've enhanced those activities and added exciting new ones for Winter Camp.")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    {callStage === "presentation" && (
                      <div className="relative bg-gray-50 p-4 rounded-lg group">
                        <h4 className="font-semibold mb-2">Value Proposition</h4>
                        <p className="text-sm text-muted-foreground">
                          "Our Winter Camp program is specially designed to keep children engaged and learning while having fun. With our experienced staff and diverse activities, [Child Name] will develop new skills and make lasting friendships."
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard("Our Winter Camp program is specially designed to keep children engaged and learning while having fun. With our experienced staff and diverse activities, [Child Name] will develop new skills and make lasting friendships.")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    {callStage === "closing" && (
                      <div className="relative bg-gray-50 p-4 rounded-lg group">
                        <h4 className="font-semibold mb-2">Securing Enrollment</h4>
                        <p className="text-sm text-muted-foreground">
                          "Given everything we've discussed about [Child Name]'s interests and our program, would you like to secure their spot with our special returning family discount? We can process the enrollment right now."
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard("Given everything we've discussed about [Child Name]'s interests and our program, would you like to secure their spot with our special returning family discount? We can process the enrollment right now.")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-purple-600" />
                      Stage Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {callStage === "introduction" && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Building Rapport
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>• Reference their previous camp experience</li>
                          <li>• Use the child's name frequently</li>
                          <li>• Sound enthusiastic and welcoming</li>
                          <li>• Listen for parent's tone and match their energy</li>
                        </ul>
                      </div>
                    )}
                    {callStage === "discovery" && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Ask Open Questions
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>• Focus on previous positive experiences</li>
                          <li>• Ask about child's interests</li>
                          <li>• Listen for potential concerns</li>
                          <li>• Take notes for personalization</li>
                        </ul>
                      </div>
                    )}
                    {callStage === "presentation" && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Highlight Benefits
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>• Connect activities to child's interests</li>
                          <li>• Emphasize safety and supervision</li>
                          <li>• Mention social skill development</li>
                          <li>• Share specific activity examples</li>
                        </ul>
                      </div>
                    )}
                    {callStage === "closing" && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Secure Commitment
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>• Create urgency with limited spots</li>
                          <li>• Reiterate the special discount</li>
                          <li>• Make enrollment process easy</li>
                          <li>• Have payment options ready</li>
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="w-5 h-5 text-purple-600" />
                      Common Questions
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
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">What about safety protocols?</h4>
                      <p className="text-sm text-muted-foreground">
                        "We maintain strict safety protocols with trained staff, regular sanitization, and a low counselor-to-camper ratio. All staff members are background-checked and first-aid certified."
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;