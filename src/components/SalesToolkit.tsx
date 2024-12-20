import { useState } from "react";
import { CallFlowGuide } from "./toolkit/CallFlowGuide";
import { QuickScripts } from "./toolkit/QuickScripts";
import { StageTips } from "./toolkit/StageTips";
import { CommonQuestions } from "./toolkit/CommonQuestions";

export const SalesToolkit = () => {
  const [callStage, setCallStage] = useState<string>("introduction");

  return (
    <div className="w-[400px] bg-custom-white border-l border-custom-light p-4 overflow-y-auto h-screen">
      <CallFlowGuide callStage={callStage} setCallStage={setCallStage} />
      
      <div className="space-y-4">
        <QuickScripts callStage={callStage} />
        <StageTips callStage={callStage} />
        <CommonQuestions />
      </div>
    </div>
  );
};