import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const CommonQuestions = () => {
  return (
    <Card className="bg-custom-white border-custom-light">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-custom-slate">
          <Info className="w-5 h-5 text-custom-mauve" />
          Common Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="ages">
            <AccordionTrigger className="font-semibold text-custom-slate">
              What ages do you accept?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">
                "Our Winter Camp program is designed for children ages 5-12, with activities tailored to different age groups to ensure everyone has an engaging and age-appropriate experience."
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="fees">
            <AccordionTrigger className="font-semibold text-custom-slate">
              What's included in the fee?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">
                "The program fee includes all activities, materials, snacks, and a camp t-shirt. We provide a full day of supervised activities from 9 AM to 4 PM, with extended care options available."
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="safety">
            <AccordionTrigger className="font-semibold text-custom-slate">
              What about safety protocols?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">
                "We maintain strict safety protocols with trained staff, regular sanitization, and a low counselor-to-camper ratio. All staff members are background-checked and first-aid certified."
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};