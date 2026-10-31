import { useState, useEffect } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { getAIForecastSummary } from "../../services/dashboardService";

export default function AIDemandForecastCard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getAIForecastSummary().then((data) => {
      setSummary(data);
    });
  }, []);

  if (!summary) {
    return (
      <div className="bg-surface border border-border rounded-2xl p-5 flex items-center justify-center min-h-[200px]">
        <Loader2 className="animate-spin text-primary" size={24} />
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-2xl p-5">
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm font-semibold text-textPrimary">AI Demand Forecast</p>
        <span className="flex items-center gap-1 text-[10px] bg-secondary/10 text-secondary px-2 py-1 rounded-full">
          <Sparkles className="w-3 h-3" /> AI powered
        </span>
      </div>
      <p className="text-xs text-textMuted mb-4">Next 30 days - confidence score</p>

      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-3xl font-bold text-secondary">{summary.confidence}%</h2>
        <div>
          <p className="text-sm font-medium text-textPrimary">{summary.confidenceLabel}</p>
          <p className="text-xs text-textMuted">{summary.trendText}</p>
        </div>
      </div>

      <div className="w-full h-2 bg-surfaceLight rounded-full overflow-hidden">
        <div className="h-full bg-secondary rounded-full" style={{ width: summary.confidence + "%" }}></div>
      </div>
      <div className="flex justify-between text-[10px] text-textMuted mt-2">
        <span>{summary.lastRefreshed}</span>
        <span className="text-primary cursor-pointer">Explore forecast</span>
      </div>
    </div>
  );
}
