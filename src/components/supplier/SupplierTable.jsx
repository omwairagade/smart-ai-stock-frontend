import ReliabilityScore from "./ReliabilityScore";
import StatusBadge from "./StatusBadge";
import { ChevronRight } from "lucide-react";

export default function SupplierTable({ suppliers, onSelect }) {
  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surfaceLight/50">
              <th className="text-left px-5 py-3 text-xs font-medium text-textMuted">Supplier</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-textMuted">Category</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-textMuted">Reliability</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-textMuted">Avg Delivery</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-textMuted">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr
                key={s.id}
                onClick={() => onSelect(s)}
                className="border-b border-border last:border-0 hover:bg-surfaceLight/50 cursor-pointer transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-textPrimary">{s.name}</p>
                      <p className="text-xs text-textMuted">{s.contactPerson}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-textSecondary">{s.category}</td>
                <td className="px-5 py-3"><ReliabilityScore score={s.reliabilityScore} /></td>
                <td className="px-5 py-3 text-textSecondary">{s.avgDeliveryDays} days</td>
                <td className="px-5 py-3"><StatusBadge status={s.status} /></td>
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
