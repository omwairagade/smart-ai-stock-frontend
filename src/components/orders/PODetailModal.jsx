import { useState } from "react";
import { X, Sparkles, Check, Circle } from "lucide-react";
import POStatusBadge from "./POStatusBadge";
import ConfirmDialog from "../common/ConfirmDialog";
import { calculateTotal } from "../../data/purchaseOrders";
import { updateOrderStatus } from "../../services/orderService";
import toast from "react-hot-toast";

const statusOrder = ["pending", "confirmed", "shipped", "delivered"];

export default function PODetailModal({ po, onClose, onStatusChange }) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [updating, setUpdating] = useState(false);

  if (!po) return null;

  const currentIndex = statusOrder.indexOf(po.status);
  const isCancelled = po.status === "cancelled";
  const nextStatus = statusOrder[currentIndex + 1];

  function handleAdvance() {
    if (!nextStatus) return;
    setUpdating(true);
    updateOrderStatus(po.id, nextStatus).then((updated) => {
      setUpdating(false);
      onStatusChange(updated);
      toast.success("Order marked as " + nextStatus);
    });
  }

  function handleCancelOrder() {
    setUpdating(true);
    updateOrderStatus(po.id, "cancelled").then((updated) => {
      setUpdating(false);
      setShowCancelConfirm(false);
      onStatusChange(updated);
      toast.success("Order cancelled");
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-surface border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-surface border-b border-border p-5 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-textPrimary">{po.id}</h2>
              {po.isAiSuggested && (
                <span className="flex items-center gap-1 text-[9px] bg-secondary/10 text-secondary px-1.5 py-0.5 rounded-full">
                  <Sparkles className="w-2.5 h-2.5" /> AI Suggested
                </span>
              )}
            </div>
            <p className="text-xs text-textMuted">{po.supplier}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-surfaceLight rounded-lg">
            <X className="w-4 h-4 text-textMuted" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="flex items-center justify-between">
            <POStatusBadge status={po.status} />
            <p className="text-xs text-textMuted">Created by {po.createdBy}</p>
          </div>

          {!isCancelled && (
            <div className="flex items-center justify-between">
              {statusOrder.map((s, i) => (
                <div key={s} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <div className={
                      "w-6 h-6 rounded-full flex items-center justify-center " +
                      (i <= currentIndex ? "bg-primary text-white" : "bg-surfaceLight border border-border text-textMuted")
                    }>
                      {i <= currentIndex ? <Check className="w-3.5 h-3.5" /> : <Circle className="w-2 h-2" />}
                    </div>
                    <span className="text-[10px] text-textMuted capitalize text-center">{s}</span>
                  </div>
                  {i < statusOrder.length - 1 && (
                    <div className={"h-0.5 flex-1 -mt-4 " + (i < currentIndex ? "bg-primary" : "bg-border")}></div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div>
            <p className="text-xs text-textMuted mb-2">Order Items</p>
            <div className="space-y-2">
              {po.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-surfaceLight rounded-lg p-3">
                  <div>
                    <p className="text-sm text-textPrimary font-medium">{item.product}</p>
                    <p className="text-xs text-textMuted">Qty: {item.qty} x Rs {item.unitPrice}</p>
                  </div>
                  <p className="text-sm font-semibold text-textPrimary">
                    Rs {(item.qty * item.unitPrice).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-border pt-4">
            <span className="text-sm text-textSecondary">Total Amount</span>
            <span className="text-lg font-bold text-textPrimary">
              Rs {calculateTotal(po.items).toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-surfaceLight rounded-lg p-3">
              <p className="text-textMuted mb-1">Order Date</p>
              <p className="text-textPrimary font-medium">{po.orderDate}</p>
            </div>
            <div className="bg-surfaceLight rounded-lg p-3">
              <p className="text-textMuted mb-1">Expected Delivery</p>
              <p className="text-textPrimary font-medium">{po.expectedDelivery}</p>
            </div>
          </div>

          {!isCancelled && po.status !== "delivered" && (
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAdvance}
                disabled={updating}
                className="flex-1 bg-primary text-white text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                Mark as Next Stage
              </button>
              <button
                onClick={() => setShowCancelConfirm(true)}
                disabled={updating}
                className="flex-1 bg-danger/10 text-danger text-sm font-semibold py-2.5 rounded-lg hover:bg-danger/20 disabled:opacity-50"
              >
                Cancel Order
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={showCancelConfirm}
        title="Cancel Purchase Order"
        message={"Are you sure you want to cancel order " + po.id + "? This action cannot be undone."}
        confirmLabel="Cancel Order"
        cancelLabel="Keep Order"
        danger
        onConfirm={handleCancelOrder}
        onCancel={() => setShowCancelConfirm(false)}
      />
    </div>
  );
}
