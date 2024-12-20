import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Plus, Pencil, Save, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RichTextEditor } from "../RichTextEditor";
import { toast } from "sonner";

interface Question {
  id: string;
  question: string;
  answer: string;
}

export const CommonQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "ages",
      question: "What ages do you accept?",
      answer: "Our Winter Camp program is designed for children ages 5-12, with activities tailored to different age groups to ensure everyone has an engaging and age-appropriate experience."
    },
    {
      id: "fees",
      question: "What's included in the fee?",
      answer: "The program fee includes all activities, materials, snacks, and a camp t-shirt. We provide a full day of supervised activities from 9 AM to 4 PM, with extended care options available."
    },
    {
      id: "safety",
      question: "What about safety protocols?",
      answer: "We maintain strict safety protocols with trained staff, regular sanitization, and a low counselor-to-camper ratio. All staff members are background-checked and first-aid certified."
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");

  const handleEdit = (question: Question) => {
    setEditingId(question.id);
    setEditedQuestion(question.question);
    setEditedAnswer(question.answer);
  };

  const handleSave = (id: string) => {
    setQuestions(questions.map(q => 
      q.id === id 
        ? { ...q, question: editedQuestion, answer: editedAnswer }
        : q
    ));
    setEditingId(null);
    toast.success("Question updated successfully!");
  };

  const handleAdd = () => {
    const newId = `question-${questions.length + 1}`;
    const newQuestion: Question = {
      id: newId,
      question: "New Question",
      answer: "New Answer"
    };
    setQuestions([...questions, newQuestion]);
    handleEdit(newQuestion);
  };

  const handleDelete = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    setEditingId(null);
    toast.success("Question deleted successfully!");
  };

  return (
    <Card className="bg-custom-white border-custom-light">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-custom-slate">
            <Info className="w-5 h-5 text-custom-mauve" />
            Common Questions
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleAdd}
            className="text-custom-mauve hover:text-custom-slate"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-2">
          {questions.map((q) => (
            <AccordionItem key={q.id} value={q.id}>
              <div className="flex items-start justify-between">
                {editingId === q.id ? (
                  <div className="flex-1 space-y-2 p-2">
                    <input
                      type="text"
                      value={editedQuestion}
                      onChange={(e) => setEditedQuestion(e.target.value)}
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter question"
                    />
                    <RichTextEditor
                      content={editedAnswer}
                      onChange={setEditedAnswer}
                    />
                    <div className="flex gap-2 justify-end mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingId(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSave(q.id)}
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <AccordionTrigger className="flex-1 font-semibold text-custom-slate">
                      {q.question}
                    </AccordionTrigger>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(q);
                      }}
                      className="mt-2"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
              {editingId !== q.id && (
                <AccordionContent>
                  <div 
                    className="text-sm text-muted-foreground prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: q.answer }}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(q.id)}
                    className="mt-2 text-red-500 hover:text-red-600"
                  >
                    Delete
                  </Button>
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};