import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Plus, Pencil, Save, X, Trash2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RichTextEditor } from "../RichTextEditor";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface Question {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const CommonQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "ages",
      question: "What ages do you accept?",
      answer: "Our Winter Camp program is designed for children ages 5-12, with activities tailored to different age groups to ensure everyone has an engaging and age-appropriate experience.",
      category: "General"
    },
    {
      id: "fees",
      question: "What's included in the fee?",
      answer: "The program fee includes all activities, materials, snacks, and a camp t-shirt. We provide a full day of supervised activities from 9 AM to 4 PM, with extended care options available.",
      category: "Pricing"
    },
    {
      id: "safety",
      question: "What about safety protocols?",
      answer: "We maintain strict safety protocols with trained staff, regular sanitization, and a low counselor-to-camper ratio. All staff members are background-checked and first-aid certified.",
      category: "Safety"
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = (question: Question) => {
    setEditingId(question.id);
    setEditedQuestion(question.question);
    setEditedAnswer(question.answer);
    setEditedCategory(question.category);
  };

  const handleSave = (id: string) => {
    setQuestions(questions.map(q => 
      q.id === id 
        ? { ...q, question: editedQuestion, answer: editedAnswer, category: editedCategory }
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
      answer: "New Answer",
      category: "General"
    };
    setQuestions([...questions, newQuestion]);
    handleEdit(newQuestion);
  };

  const handleDelete = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    setEditingId(null);
    toast.success("Question deleted successfully!");
  };

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(questions.map(q => q.category)));

  return (
    <Card className="bg-custom-white border-custom-light">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-custom-slate">
            <Info className="w-5 h-5 text-custom-mauve" />
            Common Questions
          </CardTitle>
          <div className="flex gap-2">
            <Input
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48"
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleAdd}
                  className="text-custom-mauve hover:text-custom-slate"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Question</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Question"
                    value={editedQuestion}
                    onChange={(e) => setEditedQuestion(e.target.value)}
                  />
                  <Input
                    placeholder="Category"
                    value={editedCategory}
                    onChange={(e) => setEditedCategory(e.target.value)}
                  />
                  <RichTextEditor
                    content={editedAnswer}
                    onChange={setEditedAnswer}
                  />
                  <Button onClick={() => handleSave(editingId!)}>Save</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-2">
          {categories.map(category => (
            <div key={category}>
              <h3 className="font-semibold text-custom-slate mb-2">{category}</h3>
              {filteredQuestions
                .filter(q => q.category === category)
                .map((q) => (
                  <AccordionItem key={q.id} value={q.id}>
                    <div className="flex items-start justify-between">
                      {editingId === q.id ? (
                        <div className="flex-1 space-y-2 p-2">
                          <Input
                            value={editedQuestion}
                            onChange={(e) => setEditedQuestion(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter question"
                          />
                          <Input
                            value={editedCategory}
                            onChange={(e) => setEditedCategory(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter category"
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
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(q);
                              }}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(q.id);
                              }}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                    {editingId !== q.id && (
                      <AccordionContent>
                        <div 
                          className="text-sm text-muted-foreground prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: q.answer }}
                        />
                      </AccordionContent>
                    )}
                  </AccordionItem>
                ))}
            </div>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};