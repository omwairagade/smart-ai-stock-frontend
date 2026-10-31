import StockStatusBadge from "./StockStatusBadge";
import { getStockStatus } from "../../data/products";
import { Edit2, Trash2 } from "lucide-react";

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surfaceLight/50">
              <th className="text-left px-5 py-3 text-xs font-medium text-textMuted">Product</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-textMuted">SKU</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-textMuted">Category</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-textMuted">Stock</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-textMuted">Price</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-textMuted">Status</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-textMuted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const status = getStockStatus(p);
              return (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-surfaceLight/50 transition-colors">
                  <td className="px-5 py-3">
                    <p className="font-medium text-textPrimary">{p.name}</p>
                    <p className="text-xs text-textMuted">{p.supplier}</p>
                  </td>
                  <td className="px-5 py-3 text-textSecondary">{p.sku}</td>
                  <td className="px-5 py-3 text-textSecondary">{p.category}</td>
                  <td className="px-5 py-3">
                    <span className="text-textPrimary font-medium">{p.currentStock}</span>
                    <span className="text-textMuted"> / {p.reorderPoint} min</span>
                  </td>
                  <td className="px-5 py-3 text-textSecondary">Rs {p.unitPrice}</td>
                  <td className="px-5 py-3"><StockStatusBadge status={status} /></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => onEdit(p)} className="p-1.5 hover:bg-surfaceLight rounded-lg">
                        <Edit2 className="w-3.5 h-3.5 text-info" />
                      </button>
                      <button onClick={() => onDelete(p.id)} className="p-1.5 hover:bg-surfaceLight rounded-lg">
                        <Trash2 className="w-3.5 h-3.5 text-danger" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
