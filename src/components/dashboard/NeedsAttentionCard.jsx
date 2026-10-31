import { useState, useEffect } from "react";
import { AlertTriangle, ClipboardList, UserCheck, Loader2 } from "lucide-react";
import { getAttentionAlerts } from "../../services/dashboardService";

var iconMap = {
  reorder: AlertTriangle,
  po: ClipboardList,
  supplier: UserCheck,
};

export default function NeedsAttentionCard() {
  const [alerts, setAlerts] = useState(null);

  useEffect(() => {
    getAttentionAlerts().then((data) => {
      setAlerts(data);
    });
  }, []);

  if (!alerts) {
    return (
      <div className="bg-surface border border-border rounded-2xl p-5 flex items-center justify-center min-h-[200px]">
        <Loader2 className="animate-spin text-primary" size={24} />
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-2xl p-5">
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-textPrimary">Needs Attention</p>
          <p className="text-xs text-textMuted">Exceptions across your operation</p>
        </div>
        <span className="text-xs text-primary cursor-pointer">View all</span>
      </div>

      <div className="space-y-2">
        {alerts.map((a) => {
          const iconBg = "bg-" + a.color + "/10";
          const iconColor = "text-" + a.color;
          const Icon = iconMap[a.key];
          return (
            <div key={a.key} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surfaceLight cursor-pointer">
              <div className={"w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 " + iconBg}>
                <Icon className={"w-4 h-4 " + iconColor} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-textPrimary">{a.title}</p>
                <p className="text-xs text-textMuted">{a.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
