import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getReorderSuggestions, approveReorderSuggestion } from "../services/reorderService";
import PriorityBadge from "../components/reorder/PriorityBadge";
import ConfidenceBadge from "../components/forecasting/ConfidenceBadge";
import { RefreshCw, AlertTriangle, IndianRupee, CheckCircle2, Loader2 } from "lucide-react";

var priorityFilters = [
  { key: "all", label: "All" },
  { key: "high", label: "High" },
  { key: "medium", label: "Medium" },
  { key: "low", label: "Low" },
];

function SmartReorder() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(function () {
    getReorderSuggestions().then(function (data) {
      setSuggestions(data);
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

  var filtered = suggestions.filter(function (s) {
    return filter === "all" || s.priority === filter;
  });

  var pending = suggestions.filter(function (s) { return s.status === "pending"; });
  var highPriority = suggestions.filter(function (s) { return s.priority === "high" &&s.status === "pending"; }).length;
  var estCost = pending.reduce(function (sum, s) { return sum + s.estimatedCost; }, 0);
  var approved = suggestions.filter(function (s) { return s.status === "approved"; }).length;

  var stats = [
    { label: "Pending Suggestions", value: pending.length, icon: RefreshCw, color: "text-primary bg-primary/10" },
    { label: "High Priority", value: highPriority, icon: AlertTriangle, color: "text-danger bg-danger/10" },
    { label: "Est. Reorder Cost", value: "Rs " + estCost.toLocaleString("en-IN"), icon: IndianRupee, color: "text-warning bg-warning/10" },
    { label: "Approved", value: approved, icon: CheckCircle2, color: "text-success bg-success/10" },
  ];

  function handleApprove(id, productName) {
    approveReorderSuggestion(id).then(function () {
      setSuggestions(suggestions.map(function (s) {
        if (s.id === id) {
          return Object.assign({}, s, { status: "approved" });
        }
        return s;
      }));
      toast.success("Purchase order created for " + productName);
    });
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-textPrimary">Smart Reorder</h1>
          <p className="text-sm text-textSecondary mt-1">AI-generated restocking suggestions based on demand forecasts.</p>
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

        <div className="flex gap-2 flex-wrap">
          {priorityFilters.map(function (f) {
            var isActive = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={function () { setFilter(f.key); }}
                className={"px-4 py-2 rounded-lg text-sm font-medium border transition-colors " + (isActive ? "bg-primary/10 text-primary border-primary/30" : "bg-surface text-textSecondary border-border hover:bg-surfaceLight")}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[800px]">
              <thead>
                <tr className="text-left text-xs text-textMuted uppercase tracking-wider border-b border-border">
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Current / Reorder Point</th>
                  <th className="px-4 py-3">Suggested Qty</th>
                  <th className="px-4 py-3">Supplier</th>
                  <th className="px-4 py-3">AI Confidence</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Est. Cost</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(function (s) {
                  return (
                    <tr key={s.id} className="border-b border-border last:border-0 hover:bg-surfaceLight transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-textPrimary">{s.productName}</p>
                        <p className="text-xs text-textMuted">{s.sku}</p>
                      </td>
                      <td className="px-4 py-3 text-textSecondary">{s.currentStock} / {s.reorderPoint}</td>
                      <td className="px-4 py-3 text-textSecondary">{s.suggestedQty} units</td>
                      <td className="px-4 py-3 text-textSecondary">{s.supplier}</td>
                      <td className="px-4 py-3"><ConfidenceBadge value={s.aiConfidence} /></td>
                      <td className="px-4 py-3"><PriorityBadge priority={s.priority} /></td>
                      <td className="px-4 py-3 text-textSecondary">Rs {s.estimatedCost.toLocaleString("en-IN")}</td>
                      <td className="px-4 py-3">
                        {s.status === "approved" ? (
                          <span className="flex items-center gap-1 text-xs font-medium text-success">
                            <CheckCircle2 size={14} />
                            Approved
                          </span>
                        ) : (
                          <button
                            onClick={function () { handleApprove(s.id, s.productName);}}
                            className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:opacity-90 transition whitespace-nowrap"
                          >
                            Create PO
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default SmartReorder;
