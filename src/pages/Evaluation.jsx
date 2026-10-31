import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getSupplierEvaluations } from "../services/evaluationService";
import ScoreBar from "../components/evaluation/ScoreBar";
import TrendIndicator from "../components/forecasting/TrendIndicator";
import { Star, TrendingUp, AlertTriangle, CalendarCheck, Loader2 } from "lucide-react";

function Evaluation() {
  const [supplierEvaluations, setSupplierEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    getSupplierEvaluations().then(function (data) {
      setSupplierEvaluations(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-24">
          <Loader2 className="animate-spin text-primary" size={28} />
        </div>
      </DashboardLayout>
    );
  }

  var avgScore = Math.round(
    supplierEvaluations.reduce(function (sum, e) { return sum + e.overallScore; }, 0) / supplierEvaluations.length
  );
  var topPerformer = supplierEvaluations.reduce(function (top, e) {
    return e.overallScore > top.overallScore ? e : top;
  }, supplierEvaluations[0]);
  var needsImprovement = supplierEvaluations.filter(function (e) { return e.overallScore < 75; }).length;

  var stats = [
    { label: "Avg Overall Score", value: avgScore, icon: Star, color: "text-primary bg-primary/10" },
    { label: "Top Performer", value: topPerformer.supplierName, icon: TrendingUp, color: "text-success bg-success/10" },
    { label: "Needs Improvement", value: needsImprovement, icon: AlertTriangle, color:"text-warning bg-warning/10" },
    { label: "Evaluations This Quarter", value: supplierEvaluations.length, icon: CalendarCheck, color: "text-secondary bg-secondary/10" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-textPrimary">Supplier Evaluation</h1>
          <p className="text-sm text-textSecondary mt-1">Quarterly performance scorecards across quality, delivery, pricing and communication.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {stats.map(function (s) {
            var Icon = s.icon;
            return (
              <div key={s.label} className="bg-surface border border-border rounded-xl p-4">
                <div className={"w-9 h-9 rounded-lg flex items-center justify-center mb-3 " + s.color}>
                  <Icon size={18} />
                </div>
                <p className="text-xs text-textMuted mb-1">{s.label}</p>
                <p className="text-lg md:text-xl font-bold text-textPrimary truncate">{s.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supplierEvaluations.map(function (e) {
            return (
              <div key={e.id} className="bg-surface border border-border rounded-xl p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold text-textPrimary">{e.supplierName}</p>
                    <p className="text-xs text-textMuted mt-0.5">{e.quarter} · Last evaluated {e.lastEvaluated}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-textPrimary">{e.overallScore}</p>
                    <TrendIndicator trend={e.trend} percent={e.trendPercent} />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <ScoreBar label="Quality" value={e.qualityScore} />
                  <ScoreBar label="Delivery" value={e.deliveryScore} />
                  <ScoreBar label="Pricing" value={e.pricingScore} />
                  <ScoreBar label="Communication" value={e.communicationScore} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Evaluation;
