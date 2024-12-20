import { Accordion } from "@/components/ui/accordion";
import { QuestionItem } from "./QuestionItem";

interface Question {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface QuestionListProps {
  questions: Question[];
  onEdit: (id: string, question: string, answer: string, category: string) => void;
  onDelete: (id: string) => void;
}

export const QuestionList = ({ questions, onEdit, onDelete }: QuestionListProps) => {
  const categories = Array.from(new Set(questions.map(q => q.category)));

  return (
    <Accordion type="single" collapsible className="space-y-2">
      {categories.map(category => (
        <div key={category}>
          <h3 className="font-semibold text-custom-slate mb-2">{category}</h3>
          {questions
            .filter(q => q.category === category)
            .map((q) => (
              <QuestionItem
                key={q.id}
                {...q}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
        </div>
      ))}
    </Accordion>
  );
};