import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RichTextEditor } from "../RichTextEditor";
import { toast } from "sonner";
import { QuestionList } from "./questions/QuestionList";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newCategory, setNewCategory] = useState("General");

  const handleAdd = () => {
    const newId = `question-${questions.length + 1}`;
    setQuestions([...questions, {
      id: newId,
      question: newQuestion,
      answer: newAnswer,
      category: newCategory
    }]);
    setNewQuestion("");
    setNewAnswer("");
    setNewCategory("General");
    toast.success("Question added successfully!");
  };

  const handleEdit = (id: string, question: string, answer: string, category: string) => {
    setQuestions(questions.map(q => 
      q.id === id 
        ? { ...q, question, answer, category }
        : q
    ));
    toast.success("Question updated successfully!");
  };

  const handleDelete = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    toast.success("Question deleted successfully!");
  };

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                  />
                  <Input
                    placeholder="Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <RichTextEditor
                    content={newAnswer}
                    onChange={setNewAnswer}
                  />
                  <Button onClick={handleAdd}>Save</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <QuestionList
          questions={filteredQuestions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  );
};