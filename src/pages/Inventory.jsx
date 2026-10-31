import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProductTable from "../components/inventory/ProductTable";
import ProductFormModal from "../components/inventory/ProductFormModal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Skeleton from "../components/common/Skeleton";
import { getProducts, getStockStatus, addProduct, updateProduct, deleteProduct } from "../services/productService";
import { Search, Plus, Package, AlertTriangle, XCircle, DollarSign } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-4 w-60" />
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

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Skeleton className="h-10 w-full max-w-sm" />
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
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

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const status = getStockStatus(p);
    const matchesFilter = filterStatus === "all" || status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => getStockStatus(p) === "low").length;
  const outOfStockCount = products.filter((p) => getStockStatus(p) === "out").length;
  const totalValue = products.reduce((sum, p) => sum + p.currentStock * p.costPrice, 0);

  const handleSave = (formData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, formData).then((updated) => {
        setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
        toast.success("Product updated successfully");
        setShowModal(false);
        setEditingProduct(null);
      });
    } else {
      addProduct(formData).then((newProduct) => {
        setProducts([...products, newProduct]);
        toast.success("Product added successfully");
        setShowModal(false);
        setEditingProduct(null);
      });
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDeleteClick = (id) => {
    const product = products.find((p) => p.id === id);
    setDeleteTarget(product);
  };

  const confirmDelete = () => {
    deleteProduct(deleteTarget.id).then(() => {
      setProducts(products.filter((p) => p.id !== deleteTarget.id));
      toast.success("Product removed");
      setDeleteTarget(null);
    });
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <p className="text-xs text-textMuted mb-1">STOCK MANAGEMENT</p>
          <h1 className="text-2xl font-bold text-textPrimary">Inventory</h1>
          <p className="text-sm text-textMuted">Track stock levels and product movement.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-primary text-white font-semibold text-sm px-4 py-2 rounded-lg hover:opacity-90 flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-4 h-4 text-info" />
            <p className="text-xs text-textMuted">Total Products</p>
          </div>
          <p className="text-xl font-bold text-textPrimary">{totalProducts}</p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <p className="text-xs text-textMuted">Low Stock</p>
          </div>
          <p className="text-xl font-bold text-textPrimary">{lowStockCount}</p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <XCircle className="w-4 h-4 text-danger" />
            <p className="text-xs text-textMuted">Out of Stock</p>
          </div>
          <p className="text-xl font-bold text-textPrimary">{outOfStockCount}</p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-success" />
            <p className="text-xs text-textMuted">Stock Value</p>
          </div>
          <p className="text-xl font-bold text-textPrimary">Rs {totalValue.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-textMuted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products or SKU..."
            className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-textPrimary focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {["all", "healthy", "low", "out"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={
                "px-3 py-2 rounded-lg text-xs font-medium border transition-colors " +
                (filterStatus === status
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "bg-surface text-textSecondary border-border hover:bg-surfaceLight")
              }
            >
              {status === "all" ? "All" : status === "healthy" ? "Healthy" : status === "low" ? "Low Stock" : "Out of Stock"}
            </button>
          ))}
        </div>
      </div>

      <ProductTable products={filtered} onEdit={handleEdit} onDelete={handleDeleteClick} />

      {showModal && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => { setShowModal(false); setEditingProduct(null); }}
          onSave={handleSave}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Product"
        message={deleteTarget ? "Are you sure you want to delete \"" + deleteTarget.name + "\"? This action cannot be undone." : ""}
        confirmLabel="Delete"
        danger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </DashboardLayout>
  );
}
