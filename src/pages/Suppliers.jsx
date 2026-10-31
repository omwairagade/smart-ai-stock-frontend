import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../components/layout/DashboardLayout";
import SupplierTable from "../components/supplier/SupplierTable";
import SupplierDetailModal from "../components/supplier/SupplierDetailModal";
import SupplierFormModal from "../components/supplier/SupplierFormModal";
import Skeleton from "../components/common/Skeleton";
import { getSuppliers, addSupplier, updateSupplier } from "../services/supplierService";
import { Search, Plus, Users, CheckCircle, AlertTriangle, Clock } from "lucide-react";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  useEffect(() => {
    getSuppliers().then((data) => {
      setSuppliers(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-7 w-44" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-36" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-surface border border-border rounded-2xl p-4 flex flex-col gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-12" />
            </div>
          ))}
        </div>

        <Skeleton className="h-10 w-full max-w-sm mb-4" />

        <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      </DashboardLayout>
    );
  }

  const filtered = suppliers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = suppliers.filter((s) => s.status === "active").length;
  const atRiskCount = suppliers.filter((s) => s.status === "at-risk").length;
  const avgScore = Math.round(suppliers.reduce((a, s) => a + s.reliabilityScore, 0) / suppliers.length);

  function handleAddClick() {
    setEditingSupplier(null);
    setShowFormModal(true);
  }

  function handleEditClick(supplier) {
    setSelectedSupplier(null);
    setEditingSupplier(supplier);
    setShowFormModal(true);
  }

  function handleSave(formData) {
    if (editingSupplier) {
      updateSupplier(editingSupplier.id, formData).then((updated) => {
        setSuppliers((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
        setShowFormModal(false);
        setEditingSupplier(null);
        toast.success("Supplier updated successfully");
      });
    } else {
      addSupplier(formData).then((newSupplier) => {
        setSuppliers((prev) => [newSupplier, ...prev]);
        setShowFormModal(false);
        toast.success("Supplier added successfully");
      });
    }
  }

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <p className="text-xs text-textMuted mb-1">SUPPLIER COORDINATION</p>
          <h1 className="text-2xl font-bold text-textPrimary">Suppliers</h1>
          <p className="text-sm text-textMuted">Manage relationships, performance and coordination.</p>
        </div>
        <button
          onClick={handleAddClick}
          className="bg-primary text-white font-semibold text-sm px-4 py-2 rounded-lg hover:opacity-90 flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Add Supplier
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-info" />
            <p className="text-xs text-textMuted">Total Suppliers</p>
          </div>
          <p className="text-xl font-bold text-textPrimary">{suppliers.length}</p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-success" />
            <p className="text-xs text-textMuted">Active</p>
          </div>
          <p className="text-xl font-bold text-textPrimary">{activeCount}</p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <p className="text-xs text-textMuted">At Risk</p>
          </div>
          <p className="text-xl font-bold text-textPrimary">{atRiskCount}</p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-secondary" />
            <p className="text-xs text-textMuted">Avg Reliability</p>
          </div>
          <p className="text-xl font-bold text-textPrimary">{avgScore}%</p>
        </div>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="w-4 h-4 text-textMuted absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search suppliers..."
          className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-textPrimary focus:outline-none focus:ring-1 focus:ring-primary/50"
        />
      </div>

      <SupplierTable suppliers={filtered} onSelect={setSelectedSupplier} />

      {selectedSupplier && (
        <SupplierDetailModal
          supplier={selectedSupplier}
          onClose={() => setSelectedSupplier(null)}
          onEdit={handleEditClick}
        />
      )}

      {showFormModal && (
        <SupplierFormModal
          supplier={editingSupplier}
          onClose={() => { setShowFormModal(false); setEditingSupplier(null); }}
          onSave={handleSave}
        />
      )}
    </DashboardLayout>
  );
}
