import ConfidenceBadge from "./ConfidenceBadge";
import TrendIndicator from "./TrendIndicator";
import { ChevronRight } from "lucide-react";

function ForecastTable({ products, selectedId, onSelect }) {
  return (
    <div className="overflow-x-auto -mx-4 md:mx-0">
      <table className="w-full text-sm min-w-[700px]">
        <thead>
          <tr className="text-left text-xs text-textMuted uppercase tracking-wider border-b border-border">
            <th className="px-4 md:px-2 py-3">Product</th>
            <th className="px-2 py-3">Current Stock</th>
            <th className="px-2 py-3">Predicted (30d)</th>
            <th className="px-2 py-3">Trend</th>
            <th className="px-2 py-3">Confidence</th>
            <th className="px-2 py-3">Reorder Qty</th>
            <th className="px-2 py-3">Reorder By</th>
            <th className="px-2 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {products.map(function (p) {
            var isSelected = p.id === selectedId;
            return (
              <tr
                key={p.id}
                onClick={function () { onSelect(p.id); }}
                className={"border-b border-border last:border-0 cursor-pointer transition-colors " + (isSelected ? "bg-primary/5" : "hover:bg-surfaceLight")}
              >
                <td className="px-4 md:px-2 py-3">
                  <p className="font-medium text-textPrimary">{p.name}</p>
                  <p className="text-xs text-textMuted">{p.sku}</p>
                </td>
                <td className="px-2 py-3 text-textSecondary">{p.currentStock}</td>
                <td className="px-2 py-3 text-textSecondary">{p.predictedDemand30d} units</td>
                <td className="px-2 py-3"><TrendIndicator trend={p.trend} percent={p.trendPercent} /></td>
                <td className="px-2 py-3"><ConfidenceBadge value={p.confidence} /></td>
                <td className="px-2 py-3 text-textSecondary">{p.recommendedReorderQty}</td>
                <td className="px-2 py-3 text-textSecondary">{p.recommendedReorderDate}</td>
                <td className="px-2 py-3 text-textMuted"><ChevronRight size={16} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ForecastTable;
