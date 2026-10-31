import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Loader2 } from "lucide-react";
import { getStockDistribution } from "../../services/dashboardService";

export default function StockDistributionChart() {
  const [distribution, setDistribution] = useState(null);

  useEffect(() => {
    getStockDistribution().then((data) => {
      setDistribution(data);
    });
  }, []);

  if (!distribution) {
    return (
      <div className="bg-surface border border-border rounded-2xl p-5 flex items-center justify-center min-h-[200px]">
        <Loader2 className="animate-spin text-primary" size={24} />
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-2xl p-5">
      <p className="text-sm font-semibold mb-1 text-textPrimary">Stock Distribution</p>
      <p className="text-xs text-textMuted mb-4">Current inventory health</p>

      <div className="flex items-center gap-4">
        <div className="relative w-28 h-28 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={distribution.segments} dataKey="value" innerRadius={38} outerRadius={50} startAngle={90} endAngle={-270}>
                {distribution.segments.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-textPrimary">{distribution.healthyPercent}%</span>
            <span className="text-[10px] text-textMuted">Healthy</span>
          </div>
        </div>

        <div className="space-y-2 text-xs flex-1">
          {distribution.segments.map((d) => (
            <div key={d.name} className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-textSecondary">
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }}></span>
                {d.name}
              </span>
              <span className="font-medium text-textPrimary">{d.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
