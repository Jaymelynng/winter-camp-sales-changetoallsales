import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Save, X, Trash2 } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/RichTextEditor";

interface QuestionItemProps {
  id: string;
  question: string;
  answer: string;
  category: string;
  onEdit: (id: string, question: string, answer: string, category: string) => void;
  onDelete: (id: string) => void;
}

export const QuestionItem = ({
  id,
  question,
  answer,
  category,
  onEdit,
  onDelete,
}: QuestionItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question);
  const [editedAnswer, setEditedAnswer] = useState(answer);
  const [editedCategory, setEditedCategory] = useState(category);

  const handleSave = () => {
    onEdit(id, editedQuestion, editedAnswer, editedCategory);
    setIsEditing(false);
  };

  return (
    <AccordionItem value={id}>
      <div className="flex items-start justify-between">
        {isEditing ? (
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
                onClick={() => setIsEditing(false)}
              >
                <X className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
              >
                <Save className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <AccordionTrigger className="flex-1 font-bold text-custom-slate hover:text-custom-mauve">
              {question}
            </AccordionTrigger>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}
      </div>
      {!isEditing && (
        <AccordionContent>
          <div 
            className="text-sm text-muted-foreground prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </AccordionContent>
      )}
    </AccordionItem>
  );
};