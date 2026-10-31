import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({ open, title, message, confirmLabel, cancelLabel, onConfirm, onCancel, danger }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={onCancel}>
      <div
        className="bg-surface border border-border rounded-2xl w-full max-w-sm p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3 mb-4">
          <div className={"w-9 h-9 rounded-full flex items-center justify-center shrink-0 " + (danger ? "bg-danger/10 text-danger" : "bg-primary/10 text-primary")}>
            <AlertTriangle size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-textPrimary">{title}</p>
            <p className="text-xs text-textMuted mt-1">{message}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-lg bg-surfaceLight border border-border text-sm font-medium text-textSecondary hover:text-textPrimary transition"
          >
            {cancelLabel || "Cancel"}
          </button>
          <button
            onClick={onConfirm}
            className={"flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition hover:opacity-90 " + (danger ? "bg-danger text-white" : "bg-primary text-white")}
          >
            {confirmLabel || "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
