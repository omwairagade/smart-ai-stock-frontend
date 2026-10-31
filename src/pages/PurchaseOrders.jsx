import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import POTable from "../components/orders/POTable";
import PODetailModal from "../components/orders/PODetailModal";
import CreatePOModal from "../components/orders/CreatePOModal";
import Skeleton from "../components/common/Skeleton";
import { getPurchaseOrders, createPurchaseOrder } from "../services/orderService";
import { Search, Plus, ClipboardList, Clock, CheckCircle, Sparkles } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function PurchaseOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedPO, setSelectedPO] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [defaultSupplier, setDefaultSupplier] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getPurchaseOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (location.state && location.state.supplierName) {
      setDefaultSupplier(location.state.supplierName);
      setShowCreateModal(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-44" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-surface border border-border rounded-2xl p-4 flex flex-col gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-12" />
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Skeleton className="h-10 w-full max-w-sm" />
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-9 w-20" />
            ))}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      </DashboardLayout>
    );
  }

  const filtered = orders.filter((po) => {
    const matchesSearch =
      po.id.toLowerCase().includes(search.toLowerCase()) ||
      po.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "all" || po.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;
  const aiSuggestedCount = orders.filter((o) => o.isAiSuggested).length;

  const handleCreate = (newPO) => {
    createPurchaseOrder(newPO).then((createdPO) => {
      setOrders([createdPO, ...orders]);
      toast.success("Purchase order created successfully");
    });
  };

  const handleStatusChange = (updatedPO) => {
    setOrders((prev) => prev.map((o) => (o.id === updatedPO.id ? updatedPO : o)));
    setSelectedPO(updatedPO);
  };

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <p className="text-xs text-textMuted mb-1">PURCHASE MANAGEMENT</p>
          <h1 className="text-2xl font-bold text-textPrimary">Purchase Orders</h1>
          <p className="text-sm text-textMuted">Create, track and manage orders with suppliers.</p>
        </div>
        <button
          onClick={() => { setDefaultSupplier(""); setShowCreateModal(true); }}
          className="bg-primary text-white font-semibold text-sm px-4 py-2 rounded-lg hover:opacity-90 flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> New Purchase Order
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <ClipboardList className="w-4 h-4 text-info" />
            <p className="text-xs text-textMuted">Total Orders</p>
          </div>
          <p className="text-xl font-bold text-textPrimary">{orders.length}</p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-warning" />
            <p className="text-xs text-textMuted">Pending</p>
          </div>
          <p className="text-xl font-bold text-textPrimary">{pendingCount}</p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-success" />
            <p className="text-xs text-textMuted">Delivered</p>
          </div>
          <p className="text-xl font-bold text-textPrimary">{deliveredCount}</p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-secondary" />
            <p className="text-xs text-textMuted">AI Suggested</p>
          </div>
          <p className="text-xl font-bold text-textPrimary">{aiSuggestedCount}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-textMuted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by PO ID or supplier..."
            className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-textPrimary focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "confirmed", "shipped", "delivered", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={
                "px-3 py-2 rounded-lg text-xs font-medium border transition-colors capitalize " +
                (filterStatus === status
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "bg-surface text-textSecondary border-border hover:bg-surfaceLight")
              }
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <POTable orders={filtered} onSelect={setSelectedPO} />

      {selectedPO && (
        <PODetailModal po={selectedPO} onClose={() => setSelectedPO(null)} onStatusChange={handleStatusChange} />
      )}
      {showCreateModal && (
        <CreatePOModal
          defaultSupplier={defaultSupplier}
          onClose={() => { setShowCreateModal(false); setDefaultSupplier(""); }}
          onCreate={handleCreate}
        />
      )}
    </DashboardLayout>
  );
}
