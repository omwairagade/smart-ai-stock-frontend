import { useState } from "react";
import { X } from "lucide-react";
import { suppliers } from "../../data/suppliers";
import { purchaseOrders } from "../../data/purchaseOrders";

var typeOptions = ["call", "email", "whatsapp", "meeting", "note"];

function LogCommunicationModal({ onClose, onSave }) {
  const [supplierId, setSupplierId] = useState(suppliers[0] ? suppliers[0].id : "");
  const [poId, setPoId] = useState("");
  const [type, setType] = useState("call");
  const [subject, setSubject] = useState("");
  const [notes, setNotes] = useState("");
  const [followUpRequired, setFollowUpRequired] = useState(false);
  const [followUpDate, setFollowUpDate] = useState("");
  const [errors, setErrors] = useState({});

  var relatedPOs = purchaseOrders.filter(function (po) {
    return po.supplier === (suppliers.find(function (s) { return s.id === Number(supplierId); }) || {}).name;
  });

  function validate() {
    var newErrors = {};
    if (!subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!notes.trim()) {
      newErrors.notes = "Notes are required";
    }
    if (followUpRequired && !followUpDate) {
      newErrors.followUpDate = "Please select a follow-up date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    var supplier = suppliers.find(function (s) { return s.id === Number(supplierId); });
    onSave({
      id: Date.now(),
      supplierId: Number(supplierId),
      supplierName: supplier ? supplier.name : "Unknown",
      poId: poId || null,
      type: type,
      subject: subject,
      notes: notes,
      date: new Date().toISOString(),
      loggedBy: "Om Wairagade",
      followUpRequired: followUpRequired,
      followUpDate: followUpRequired ? followUpDate : null,
      status: followUpRequired ? "pending" : "completed",
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-surface">
          <p className="text-sm font-semibold text-textPrimary">Log Communication</p>
          <button onClick={onClose} className="text-textMuted hover:text-textPrimary">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4" noValidate>
          <div>
            <label className="block text-xs font-medium text-textSecondary mb-1.5">Supplier</label>
            <select
              value={supplierId}
              onChange={function (e) { setSupplierId(e.target.value); setPoId(""); }}
              className="w-full px-3 py-2.5 rounded-lg bg-surfaceLight border border-border text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {suppliers.map(function (s) {
                return <option key={s.id} value={s.id}>{s.name}</option>;
              })}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-textSecondary mb-1.5">Related Purchase Order (optional)</label>
            <select
              value={poId}
              onChange={function (e) { setPoId(e.target.value); }}
              className="w-full px-3 py-2.5 rounded-lg bg-surfaceLight border border-border text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="">None</option>
              {relatedPOs.map(function (po) {
                return <option key={po.id} value={po.id}>{po.id}</option>;
              })}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-textSecondary mb-1.5">Communication Type</label>
            <div className="flex gap-2 flex-wrap">
              {typeOptions.map(function (t) {
                var isActive = type === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={function () { setType(t); }}
                    className={"px-3 py-1.5 rounded-lg text-xs font-medium border capitalize transition-colors " + (isActive ? "bg-primary/10 text-primary border-primary/30" : "bg-surfaceLight text-textSecondary border-border")}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-textSecondary mb-1.5">Subject</label>
            <input
              value={subject}
              onChange={function (e) { setSubject(e.target.value); }}
              placeholder="e.g. Confirmed delivery timeline"
              className={"w-full px-3 py-2.5 rounded-lg bg-surfaceLight border text-sm text-textPrimary focus:outline-none focus:ring-2 " + (errors.subject ? "border-danger focus:ring-danger/40" : "border-border focus:ring-primary/40")}
            />
            {errors.subject && <p className="text-xs text-danger mt-1">{errors.subject}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-textSecondary mb-1.5">Notes</label>
            <textarea
              value={notes}
              onChange={function (e) { setNotes(e.target.value); }}
              rows={4}
              placeholder="Describe what was discussed..."
              className={"w-full px-3 py-2.5 rounded-lg bg-surfaceLight border text-sm text-textPrimary focus:outline-none focus:ring-2 resize-none " + (errors.notes ? "border-danger focus:ring-danger/40" : "border-border focus:ring-primary/40")}
            ></textarea>
            {errors.notes && <p className="text-xs text-danger mt-1">{errors.notes}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="followUp"
              checked={followUpRequired}
              onChange={function (e) { setFollowUpRequired(e.target.checked); }}
              className="w-4 h-4 accent-primary"
            />
            <label htmlFor="followUp" className="text-sm text-textSecondary">Requires follow-up</label>
          </div>

          {followUpRequired && (
            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">Follow-up Date</label>
              <input
                type="date"
                value={followUpDate}
                onChange={function (e) { setFollowUpDate(e.target.value); }}
                className={"w-full px-3 py-2.5 rounded-lg bg-surfaceLight border text-sm text-textPrimary focus:outline-none focus:ring-2 " + (errors.followUpDate ? "border-danger focus:ring-danger/40" : "border-border focus:ring-primary/40")}
              />
              {errors.followUpDate && <p className="text-xs text-danger mt-1">{errors.followUpDate}</p>}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg bg-surfaceLight border border-border text-sm font-medium text-textSecondary hover:text-textPrimary transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition"
            >
              Save Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogCommunicationModal;
