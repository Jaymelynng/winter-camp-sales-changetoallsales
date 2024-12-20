import { ScrollArea } from "../ui/scroll-area";
import { RichTextEditor } from "../RichTextEditor";
import { Lead } from "@/types/lead";

interface CallbackTrackerProps {
  selectedLead: Lead | null;
  callbackNotes: string;
  setCallbackNotes: (notes: string) => void;
}

export const CallbackTracker = ({
  selectedLead,
  callbackNotes,
  setCallbackNotes,
}: CallbackTrackerProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="border-t pt-4">
      <h3 className="font-semibold mb-4 text-custom-slate">Callback Tracker</h3>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {selectedLead ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-custom-slate">{selectedLead.fullName}</h4>
                <span className="text-sm text-custom-gray">
                  {formatDate(selectedLead.registrationDate)}
                </span>
              </div>
              <RichTextEditor
                content={callbackNotes}
                onChange={setCallbackNotes}
                editable={true}
              />
            </div>
          ) : (
            <p className="text-custom-gray text-sm">
              Select a lead to view and edit callback notes
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};