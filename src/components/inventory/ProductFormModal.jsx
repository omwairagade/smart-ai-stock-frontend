import { useState } from "react";
import { X } from "lucide-react";

export default function ProductFormModal({ product, onClose, onSave }) {
  const [form, setForm] = useState(
    product || {
      name: "",
      sku: "",
      category: "",
      currentStock: "",
      reorderPoint: "",
      unitPrice: "",
      costPrice: "",
      unit: "",
      supplier: "",
    }
  );
  const [errors, setErrors] = useState({});

  const fields = [
    { name: "name", label: "Product Name", type: "text" },
    { name: "sku", label: "SKU Code", type: "text" },
    { name: "category", label: "Category", type: "text" },
    { name: "unit", label: "Unit (kg/pcs/box)", type: "text" },
    { name: "currentStock", label: "Current Stock", type: "number" },
    { name: "reorderPoint", label: "Reorder Point", type: "number" },
    { name: "costPrice", label: "Cost Price (Rs)", type: "number" },
    { name: "unitPrice", label: "Selling Price (Rs)", type: "number" },
    { name: "supplier", label: "Supplier", type: "text" },
  ];

  const numericFields = ["currentStock", "reorderPoint", "costPrice", "unitPrice"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function validate() {
    var newErrors = {};
    fields.forEach(function (f) {
      var value = form[f.name];
      if (value === undefined || value === null || String(value).trim() === "") {
        newErrors[f.name] = f.label + " is required";
        return;
      }
      if (numericFields.indexOf(f.name) !== -1) {
        var num = Number(value);
        if (isNaN(num)) {
          newErrors[f.name] = "Must be a valid number";
        } else if (num < 0) {
          newErrors[f.name] = "Cannot be negative";
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-surface border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-surface border-b border-border p-5 flex justify-between items-center">
          <h2 className="font-semibold text-textPrimary">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-surfaceLight rounded-lg">
            <X className="w-4 h-4 text-textMuted" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4" noValidate>
          <div className="grid grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.name} className={f.name === "name" ? "col-span-2" : ""}>
                <label className="text-xs text-textSecondary mb-1.5 block">{f.label}</label>
                <input
                  type={f.type}
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  className={"w-full bg-surfaceLight border rounded-lg px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-1 " + (errors[f.name] ? "border-danger focus:ring-danger/50" : "border-border focus:ring-primary/50")}
                />
                {errors[f.name] && <p className="text-xs text-danger mt-1">{errors[f.name]}</p>}
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-primary text-white text-sm font-semibold py-2.5 rounded-lg hover:opacity-90"
            >
              {product ? "Save Changes" : "Add Product"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-surfaceLight text-textPrimary text-sm font-semibold py-2.5 rounded-lg hover:bg-border"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
