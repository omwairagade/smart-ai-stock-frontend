import POStatusBadge from "./POStatusBadge";
import { calculateTotal } from "../../data/purchaseOrders";
import { Sparkles, ChevronRight } from "lucide-react";

export default function POTable({ orders, onSelect }) {
  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surfaceLight/50">
              <th className="text-left px-5 py-3 text-xs font-medium text-textMuted">PO ID</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-textMuted">Supplier</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-textMuted">Items</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-textMuted">Total</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-textMuted">Expected</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-textMuted">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((po) => (
              <tr
                key={po.id}
                onClick={() => onSelect(po)}
                className="border-b border-border last:border-0 hover:bg-surfaceLight/50 cursor-pointer transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-textPrimary">{po.id}</span>
                    {po.isAiSuggested && (
                      <span className="flex items-center gap-1 text-[9px] bg-secondary/10 text-secondary px-1.5 py-0.5 rounded-full">
                        <Sparkles className="w-2.5 h-2.5" /> AI
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-3 text-textSecondary">{po.supplier}</td>
                <td className="px-5 py-3 text-textSecondary">{po.items.length} item(s)</td>
                <td className="px-5 py-3 text-textPrimary font-medium">
                  Rs {calculateTotal(po.items).toLocaleString()}
                </td>
                <td className="px-5 py-3 text-textSecondary">{po.expectedDelivery}</td>
                <td className="px-5 py-3"><POStatusBadge status={po.status} /></td>
                <td className="px-5 py-3">
                  <ChevronRight className="w-4 h-4 text-textMuted" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
