import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FaqSection() {
  const faqs = [
    {
      question: "What ages do you accept for winter camp?",
      answer: "Our winter camp program is designed for children ages 5-12, with activities tailored to different age groups."
    },
    {
      question: "What's included in the camp fee?",
      answer: "The camp fee includes daily activities, professional instruction, camp t-shirt, and all necessary equipment."
    },
    {
      question: "Do you offer early drop-off or late pickup?",
      answer: "Yes, we offer extended care options before and after regular camp hours for an additional fee."
    },
    {
      question: "What's your refund policy?",
      answer: "We offer full refunds up to 2 weeks before camp starts, and partial refunds up to 1 week before."
    }
  ];

  return (
    <Accordion type="single" collapsible className="space-y-2">
      {faqs.map((faq, index) => (
        <AccordionItem 
          key={index} 
          value={`item-${index}`}
          className="border border-[#cec4c1] rounded-lg bg-[#f9fafb] overflow-hidden"
        >
          <AccordionTrigger className="px-4 py-3 text-[#b48f8f] hover:bg-[#cec4c1]/10">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3 text-[#8f93a0] bg-white">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}