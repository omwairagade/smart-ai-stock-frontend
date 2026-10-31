import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { suppliers } from "../../data/suppliers";
import { products } from "../../data/products";

export default function CreatePOModal({ onClose, onCreate, defaultSupplier }) {
  const [supplier, setSupplier] = useState(defaultSupplier || "");
  const [items, setItems] = useState([{ product: "", qty: "", unitPrice: "" }]);
  const [supplierError, setSupplierError] = useState("");
  const [itemErrors, setItemErrors] = useState([]);

  const addItemRow = () => {
    setItems([...items, { product: "", qty: "", unitPrice: "" }]);
  };

  const removeItemRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
    setItemErrors(itemErrors.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  function validate() {
    var valid = true;
    var newSupplierError = "";
    var newItemErrors = items.map(function () {
      return {};
    });

    if (!supplier) {
      newSupplierError = "Please select a supplier";
      valid = false;
    }

    items.forEach(function (item, i) {
      if (!item.product) {
        newItemErrors[i].product = "Required";
        valid = false;
      }
      if (item.qty === "" || item.qty === null || item.qty === undefined) {
        newItemErrors[i].qty = "Required";
        valid = false;
      } else if (isNaN(Number(item.qty)) || Number(item.qty) <= 0) {
        newItemErrors[i].qty = "Must be > 0";
        valid = false;
      }
      if (item.unitPrice === "" || item.unitPrice === null || item.unitPrice === undefined) {
        newItemErrors[i].unitPrice = "Required";
        valid = false;
      } else if (isNaN(Number(item.unitPrice)) || Number(item.unitPrice) <= 0) {
        newItemErrors[i].unitPrice = "Must be > 0";
        valid = false;
      }
    });

    setSupplierError(newSupplierError);
    setItemErrors(newItemErrors);
    return valid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const newPO = {
      id: "PO-" + Math.floor(1000 + Math.random() * 9000),
      supplier,
      items: items.map((it) => ({ ...it, qty: Number(it.qty), unitPrice: Number(it.unitPrice) })),
      status: "pending",
      orderDate: new Date().toISOString().split("T")[0],
      expectedDelivery: "TBD",
      isAiSuggested: false,
      createdBy: "Om Wairagade",
    };
    onCreate(newPO);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-surface border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-surface border-b border-border p-5 flex justify-between items-center">
          <h2 className="font-semibold text-textPrimary">Create Purchase Order</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-surfaceLight rounded-lg">
            <X className="w-4 h-4 text-textMuted" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4" noValidate>
          <div>
            <label className="text-xs text-textSecondary mb-1.5 block">Select Supplier</label>
            <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className={"w-full bg-surfaceLight border rounded-lg px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-1 " + (supplierError ? "border-danger focus:ring-danger/50" : "border-border focus:ring-primary/50")}
            >
              <option value="">Choose a supplier</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
            {supplierError && <p className="text-xs text-danger mt-1">{supplierError}</p>}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-textSecondary">Order Items</label>
              <button type="button" onClick={addItemRow} className="text-xs text-primary flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add Item
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, i) => {
                var err = itemErrors[i] || {};
                return (
                  <div key={i} className="flex gap-2 items-start bg-surfaceLight rounded-lg p-3">
                    <div className="flex-1">
                      <select
                        value={item.product}
                        onChange={(e) => updateItem(i, "product", e.target.value)}
                        className={"w-full bg-surface border rounded-lg px-2 py-1.5 text-xs text-textPrimary " + (err.product ? "border-danger" : "border-border")}
                      >
                        <option value="">Product</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                      {err.product && <p className="text-xs text-danger mt-1">{err.product}</p>}
                    </div>
                    <div className="w-16">
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.qty}
                        onChange={(e) => updateItem(i, "qty", e.target.value)}
                        className={"w-full bg-surface border rounded-lg px-2 py-1.5 text-xs text-textPrimary " + (err.qty ? "border-danger" : "border-border")}
                      />
                      {err.qty && <p className="text-xs text-danger mt-1">{err.qty}</p>}
                    </div>
                    <div className="w-20">
                      <input
                        type="number"
                        placeholder="Price"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(i, "unitPrice", e.target.value)}
                        className={"w-full bg-surface border rounded-lg px-2 py-1.5 text-xs text-textPrimary " + (err.unitPrice ? "border-danger" : "border-border")}
                      />
                      {err.unitPrice && <p className="text-xs text-danger mt-1">{err.unitPrice}</p>}
                    </div>
                    {items.length > 1 && (
                      <button type="button" onClick={() => removeItemRow(i)} className="p-1.5">
                        <Trash2 className="w-3.5 h-3.5 text-danger" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-primary text-white text-sm font-semibold py-2.5 rounded-lg hover:opacity-90"
            >
              Create Order
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
