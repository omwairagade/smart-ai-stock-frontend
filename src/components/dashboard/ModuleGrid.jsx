import { useNavigate } from "react-router-dom";
import { Users, Boxes, ShoppingCart, Brain, Star, RefreshCw, FileBarChart, Bell } from "lucide-react";

const modules = [
  { label: "Suppliers", desc: "Relationships, scorecards and terms", icon: Users, color: "info", path: "/suppliers" },
  { label: "Inventory", desc: "Catalog, stock levels and movement", icon: Boxes, color: "warning", path: "/inventory" },
  { label: "Purchases", desc: "Orders, receipts and status", icon: ShoppingCart, color: "danger", path: "/purchases" },
  { label: "AI Forecasting", desc: "Demand signals and projections", icon: Brain, color: "secondary", path: "/forecasting" },
  { label: "Evaluation", desc: "Supplier performance scoring", icon: Star, color: "primary", path: "/evaluation" },
  { label: "Smart Reorder", desc: "Automated replenishment", icon: RefreshCw, color: "success", path: "/reorder" },
  { label: "Reports", desc: "Insights and analytics", icon: FileBarChart, color: "info", path: "/reports" },
  { label: "Notifications", desc: "Alerts and exceptions", icon: Bell, color: "warning", path: "/notifications" },
];

export default function ModuleGrid() {
  const navigate = useNavigate();

  return (
    <div>
      <p className="text-xs text-textMuted mb-1">SYSTEM MODULES</p>
      <h2 className="text-lg font-bold mb-4 text-textPrimary">Everything in one command center</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modules.map((m) => {
          const iconBg = "bg-" + m.color + "/10";
          const iconColor = "text-" + m.color;
          return (
            <div
              key={m.path}
              onClick={function () { navigate(m.path); }}
              className="bg-surface border border-border rounded-2xl p-4 flex items-center gap-3 hover:border-primary/30 cursor-pointer transition-colors"
            >
              <div className={"w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 " + iconBg}>
                <m.icon className={"w-5 h-5 " + iconColor} />
              </div>
              <div>
                <p className="text-sm font-semibold text-textPrimary">{m.label}</p>
                <p className="text-xs text-textMuted">{m.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
