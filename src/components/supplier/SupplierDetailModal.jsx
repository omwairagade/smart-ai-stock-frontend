import { useNavigate } from "react-router-dom";
import { X, Mail, Phone, Package, Calendar, TrendingUp } from "lucide-react";
import ReliabilityScore from "./ReliabilityScore";
import StatusBadge from "./StatusBadge";
import SupplierOrderTimeline from "./SupplierOrderTimeline";

export default function SupplierDetailModal({ supplier, onClose, onEdit }) {
  const navigate = useNavigate();

  if (!supplier) return null;

  function handleCreatePO() {
    navigate("/purchases", { state: { supplierName: supplier.name } });
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-surface border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-surface border-b border-border p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
              {supplier.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-semibold text-textPrimary">{supplier.name}</h2>
              <p className="text-xs text-textMuted">{supplier.category}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-surfaceLight rounded-lg">
            <X className="w-4 h-4 text-textMuted" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="flex items-center gap-2">
            <StatusBadge status={supplier.status} />
            <span className="text-xs text-textMuted">Payment Terms: {supplier.paymentTerms}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surfaceLight rounded-xl p-3">
              <p className="text-xs text-textMuted mb-1">Reliability Score</p>
              <ReliabilityScore score={supplier.reliabilityScore} />
            </div>
            <div className="bg-surfaceLight rounded-xl p-3">
              <p className="text-xs text-textMuted mb-1">On-Time Delivery</p>
              <p className="text-sm font-semibold text-textPrimary">{supplier.onTimeRate}%</p>
            </div>
            <div className="bg-surfaceLight rounded-xl p-3">
              <p className="text-xs text-textMuted mb-1">Avg Delivery Time</p>
              <p className="text-sm font-semibold text-textPrimary">{supplier.avgDeliveryDays} days</p>
            </div>
            <div className="bg-surfaceLight rounded-xl p-3">
              <p className="text-xs text-textMuted mb-1">Total Orders</p>
              <p className="text-sm font-semibold text-textPrimary">{supplier.totalOrders}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-textMuted mb-2">Contact Information</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-textSecondary">
                <Mail className="w-4 h-4 text-textMuted" /> {supplier.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-textSecondary">
                <Phone className="w-4 h-4 text-textMuted" /> {supplier.phone}
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-textMuted mb-2">Products Supplied</p>
            <div className="flex flex-wrap gap-2">
              {supplier.productsSupplied.map((p) => (
                <span key={p} className="text-xs bg-surfaceLight px-2.5 py-1 rounded-lg text-textSecondary">
                  {p}
                </span>
              ))}
            </div>
          </div>

          <SupplierOrderTimeline />

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCreatePO}
              className="flex-1 bg-primary text-white text-sm font-semibold py-2.5 rounded-lg hover:opacity-90"
            >
              Create Purchase Order
            </button>
            <button
              onClick={() => onEdit(supplier)}
              className="flex-1 bg-surfaceLight text-textPrimary text-sm font-semibold py-2.5 rounded-lg hover:bg-border"
            >
              Edit Supplier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
