import { Check, Circle, AlertCircle } from "lucide-react";
import { orderTimeline } from "../../data/suppliers";

export default function SupplierOrderTimeline() {
  const { poId, steps, aiDelayRisk, aiDelayNote } = orderTimeline;

  return (
    <div className="bg-surfaceLight rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-semibold text-textPrimary">Order Status - {poId}</p>
        <span className="text-[10px] bg-success/10 text-success px-2 py-1 rounded-full">
          Delay Risk: {aiDelayRisk}
        </span>
      </div>

      <div className="space-y-0">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={
                "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 " +
                (step.done ? "bg-primary text-white" : "bg-surface border border-border text-textMuted")
              }>
                {step.done ? <Check className="w-3.5 h-3.5" /> : <Circle className="w-2 h-2" />}
              </div>
              {i < steps.length - 1 && (
                <div className={"w-0.5 h-8 " + (step.done ? "bg-primary" : "bg-border")}></div>
              )}
            </div>
            <div className="pb-6">
              <p className={"text-sm " + (step.done ? "text-textPrimary font-medium" : "text-textMuted")}>
                {step.label}
              </p>
              {step.date && <p className="text-xs text-textMuted">{step.date}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 bg-secondary/5 border border-secondary/20 rounded-lg p-3 mt-2">
        <AlertCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
        <p className="text-xs text-textSecondary">{aiDelayNote}</p>
      </div>
    </div>
  );
}
