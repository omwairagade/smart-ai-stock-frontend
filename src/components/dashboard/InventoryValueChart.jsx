import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Loader2 } from "lucide-react";
import { getInventoryValueSummary } from "../../services/dashboardService";

export default function InventoryValueChart() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getInventoryValueSummary().then((data) => {
      setSummary(data);
    });
  }, []);

  if (!summary) {
    return (
      <div className="bg-surface border border-border rounded-2xl p-5 xl:col-span-2 flex items-center justify-center min-h-[280px]">
        <Loader2 className="animate-spin text-primary" size={24} />
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-2xl p-5 xl:col-span-2">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-semibold flex items-center gap-2 text-textPrimary">
            Inventory Value
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{summary.badge}</span>
          </p>
          <p className="text-xs text-textMuted">Net value across all warehouses</p>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-textPrimary">
        {summary.total} <span className="text-success text-sm">↗ {summary.changePercent}</span>
      </h2>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={summary.series}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(var(--color-primary))" stopOpacity={0.4} />
              <stop offset="95%" stopColor="rgb(var(--color-primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--color-border))" vertical={false} />
          <XAxis dataKey="date" stroke="rgb(var(--color-textMuted))" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis hide />
          <Tooltip contentStyle={{ background: "rgb(var(--color-surfaceLight))", border: "1px solid rgb(var(--color-border))", borderRadius: 8, fontSize: 12 }} />
          <Area type="monotone" dataKey="value" stroke="rgb(var(--color-primary))" strokeWidth={2} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
