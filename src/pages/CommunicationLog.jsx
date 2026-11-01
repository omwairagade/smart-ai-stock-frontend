import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getCommunicationLogs, logCommunication } from "../services/communicationService";
import { getSuppliers } from "../services/supplierService";
import LogItem from "../components/communication/LogItem";
import LogCommunicationModal from "../components/communication/LogCommunicationModal";
import Skeleton from "../components/common/Skeleton";
import { MessageSquare, Clock, AlertCircle, Users, Plus, Search } from "lucide-react";

var typeFilters = [
  { key: "all", label: "All" },
  { key: "call", label: "Call" },
  { key: "email", label: "Email" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "meeting", label: "Meeting" },
  { key: "note", label: "Note" },
];

function CommunicationLog() {
  const [logs, setLogs] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [supplierFilter, setSupplierFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  useEffect(function () {
    Promise.all([getCommunicationLogs(), getSuppliers()]).then(function (results) {
      setLogs(results[0]);
      setSuppliers(results[1]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <Skeleton className="h-7 w-56 mb-2" />
              <Skeleton className="h-4 w-80 max-w-full" />
            </div>
            <Skeleton className="h-10 w-44 rounded-lg" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {[1, 2, 3, 4].map(function (n) {
              return (
                <div key={n} className="bg-surface border border-border rounded-xl p-4">
                  <Skeleton className="w-9 h-9 rounded-lg mb-3" />
                  <Skeleton className="h-3 w-24 mb-2" />
                  <Skeleton className="h-6 w-12" />
                </div>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <Skeleton className="h-10 flex-1 rounded-lg" />
            <Skeleton className="h-10 w-full md:w-44 rounded-lg" />
          </div>

          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map(function (n) {
              return <Skeleton key={n} className="h-9 w-20 rounded-lg" />;
            })}
          </div>

          <div className="bg-surface border border-border rounded-xl p-4 md:p-6">
            {[1, 2, 3, 4].map(function (n) {
              return (
                <div key={n} className="flex items-start gap-3 mb-6 last:mb-0">
                  <Skeleton className="w-9 h-9 rounded-full shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-4 w-64 max-w-full mb-2" />
                    <Skeleton className="h-3 w-full max-w-lg mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  var sortedLogs = logs.slice().sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  var filtered = sortedLogs.filter(function (log) {
    var matchesSearch =
      log.subject.toLowerCase().includes(search.toLowerCase()) ||
      log.supplierName.toLowerCase().includes(search.toLowerCase());
    var matchesType = typeFilter === "all" || log.type === typeFilter;
    var matchesSupplier = supplierFilter === "all" || log.supplierId === Number(supplierFilter);
    return matchesSearch && matchesType && matchesSupplier;
  });

  var thisWeekCount = logs.filter(function (log) {
    var logDate = new Date(log.date);
    var now = new Date();
    var diffDays = (now - logDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  }).length;

  var pendingFollowUps = logs.filter(function (log) { return log.followUpRequired && log.status === "pending"; }).length;

  var uniqueSuppliers = new Set(logs.map(function (log) { return log.supplierId; })).size;

  var stats = [
    { label: "Total Logs", value: logs.length, icon: MessageSquare, color: "text-primary bg-primary/10" },
    { label: "This Week", value: thisWeekCount, icon: Clock, color: "text-info bg-info/10" },
    { label: "Pending Follow-ups", value: pendingFollowUps, icon: AlertCircle, color:"text-warning bg-warning/10" },
    { label: "Suppliers Contacted", value: uniqueSuppliers, icon: Users, color: "text-secondary bg-secondary/10" },
  ];

  function handleSaveLog(newLog) {
    logCommunication(newLog).then(function (savedLog) {
      setLogs([savedLog].concat(logs));
      setShowModal(false);
      toast.success("Communication logged successfully");
    });
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-textPrimary">Communication Log</h1>
            <p className="text-sm text-textSecondary mt-1">Track every conversation and follow-up with your suppliers.</p>
          </div>
          <button
            onClick={function () { setShowModal(true); }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition shrink-0"
          >
            <Plus size={16} />
            Log Communication
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {stats.map(function (s) {
            var Icon = s.icon;
            return (
              <div key={s.label} className="bg-surface border border-border rounded-xl p-4">
                <div className={"w-9 h-9 rounded-lg flex items-center justify-center mb-3 " + s.color}>
                  <Icon size={18} />
                </div>
                <p className="text-xs text-textMuted mb-1">{s.label}</p>
                <p className="text-lg md:text-xl font-bold text-textPrimary">{s.value}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
            <input
              value={search}
              onChange={function (e) { setSearch(e.target.value); }}
              placeholder="Search by subject or supplier..."
              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-surface border border-border text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <select
            value={supplierFilter}
            onChange={function (e) { setSupplierFilter(e.target.value); }}
            className="px-3 py-2.5 rounded-lg bg-surface border border-border text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="all">All Suppliers</option>
            {suppliers.map(function (s) {
              return <option key={s.id} value={s.id}>{s.name}</option>;
            })}
          </select>
        </div>

        <div className="flex gap-2 flex-wrap">
          {typeFilters.map(function (f) {
            var isActive = typeFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={function () { setTypeFilter(f.key); }}
                className={"px-4 py-2 rounded-lg text-sm font-medium border transition-colors " + (isActive ? "bg-primary/10 text-primary border-primary/30" : "bg-surface text-textSecondary border-border hover:bg-surfaceLight")}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="bg-surface border border-border rounded-xl p-4 md:p-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-textMuted">
              <MessageSquare size={32} className="mb-3 opacity-40" />
              <p className="text-sm">No communication logs found</p>
            </div>
          ) : (
            filtered.map(function (log, index) {
              return (
                <LogItem key={log.id} log={log} isLast={index === filtered.length - 1} />
              );
            })
          )}
        </div>
      </div>

      {showModal && (
        <LogCommunicationModal
          onClose={function () { setShowModal(false); }}
          onSave={handleSaveLog}
        />
      )}
    </DashboardLayout>
  );
}

export default CommunicationLog;
