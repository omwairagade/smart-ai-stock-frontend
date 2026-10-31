import { useState, useEffect } from "react";
import { X } from "lucide-react";

var statusOptions = ["active", "at-risk", "inactive"];

export default function SupplierFormModal({ supplier, onClose, onSave }) {
  var isEdit = !!supplier;

  const [form, setForm] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    category: "",
    paymentTerms: "",
    status: "active",
  });
  const [errors, setErrors] = useState({});

  useEffect(function () {
    if (supplier) {
      setForm({
        name: supplier.name || "",
        contactPerson: supplier.contactPerson || "",
        email: supplier.email || "",
        phone: supplier.phone || "",
        category: supplier.category || "",
        paymentTerms: supplier.paymentTerms || "",
        status: supplier.status || "active",
      });
    }
  }, [supplier]);

  function updateField(field, value) {
    setForm(function (prev) {
      var next = Object.assign({}, prev);
      next[field] = value;
      return next;
    });
  }

  function validate() {
    var errs = {};
    if (!form.name.trim()) errs.name = "Supplier name is required";
    if (!form.contactPerson.trim()) errs.contactPerson = "Contact person is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!form.email.includes("@") || !form.email.includes(".")) {
      errs.email = "Enter a valid email address";
    }
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.category.trim()) errs.category = "Category is required";
    if (!form.paymentTerms.trim()) errs.paymentTerms = "Payment terms are required";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    var errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    onSave(form);
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-surface border-b border-border px-5 py-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-textPrimary">
            {isEdit ? "Edit Supplier" : "Add Supplier"}
          </p>
          <button onClick={onClose} className="text-textMuted hover:text-textPrimary">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-5 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-textSecondary mb-1.5">Supplier Name</label>
            <input
              value={form.name}
              onChange={function (e) { updateField("name", e.target.value); }}
              placeholder="e.g. ABC Traders"
              className={"w-full px-3 py-2.5 rounded-lg bg-surfaceLight border text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40 " + (errors.name ? "border-danger" : "border-border")}
            />
            {errors.name && <p className="text-xs text-danger mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-textSecondary mb-1.5">Contact Person</label>
            <input
              value={form.contactPerson}
              onChange={function (e) { updateField("contactPerson", e.target.value); }}
              placeholder="e.g. Rajesh Kumar"
              className={"w-full px-3 py-2.5 rounded-lg bg-surfaceLight border text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40 " + (errors.contactPerson ? "border-danger" : "border-border")}
            />
            {errors.contactPerson && <p className="text-xs text-danger mt-1">{errors.contactPerson}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">Email</label>
              <input
                value={form.email}
                onChange={function (e) { updateField("email", e.target.value); }}
                placeholder="e.g. contact@supplier.com"
                className={"w-full px-3 py-2.5 rounded-lg bg-surfaceLight border text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40 " + (errors.email ? "border-danger" : "border-border")}
              />
              {errors.email && <p className="text-xs text-danger mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">Phone</label>
              <input
                value={form.phone}
                onChange={function (e) { updateField("phone", e.target.value); }}
                placeholder="e.g. +91 98765 43210"
                className={"w-full px-3 py-2.5 rounded-lg bg-surfaceLight border text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40 " + (errors.phone ? "border-danger" : "border-border")}
              />
              {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-textSecondary mb-1.5">Category</label>
            <input
              value={form.category}
              onChange={function (e) { updateField("category", e.target.value); }}
              placeholder="e.g. Grains & Pulses"
              className={"w-full px-3 py-2.5 rounded-lg bg-surfaceLight border text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40 " + (errors.category ? "border-danger" : "border-border")}
            />
            {errors.category && <p className="text-xs text-danger mt-1">{errors.category}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">Payment Terms</label>
              <input
                value={form.paymentTerms}
                onChange={function (e) { updateField("paymentTerms", e.target.value); }}
                placeholder="e.g. Net 30"
                className={"w-full px-3 py-2.5 rounded-lg bg-surfaceLight border text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40 " + (errors.paymentTerms ? "border-danger" : "border-border")}
              />
              {errors.paymentTerms && <p className="text-xs text-danger mt-1">{errors.paymentTerms}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-textSecondary mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={function (e) { updateField("status", e.target.value); }}
                className="w-full px-3 py-2.5 rounded-lg bg-surfaceLight border border-border text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {statusOptions.map(function (s) {
                  return <option key={s} value={s}>{s}</option>;
                })}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-lg bg-surfaceLight border border-border text-sm font-medium text-textSecondary hover:text-textPrimary transition">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition">
              {isEdit ? "Save Changes" : "Add Supplier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
