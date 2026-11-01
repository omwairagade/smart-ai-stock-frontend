import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getReports, generateReport } from "../services/reportService";
import ReportTypeIcon from "../components/reports/ReportTypeIcon";
import Skeleton from "../components/common/Skeleton";
import { downloadReport } from "../utils/downloadReport";
import { FileBarChart2, CalendarClock, Layers, Download, Plus, X } from "lucide-react";

var categories = ["All", "Inventory", "Suppliers", "Purchases", "Forecasting", "Financial"];

function GenerateReportModal({ onClose, onGenerate }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Inventory");
  const [type, setType] = useState("PDF");
  const [errors, setErrors] = useState({});

  function validate() {
    var errs = {};
    if (!name.trim()) errs.name = "Report name is required";
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
    onGenerate({ name: name, category: category, type: type });
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-xl w-full max-w-md">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <p className="text-sm font-semibold text-textPrimary">Generate New Report</p>
          <button onClick={onClose} className="text-textMuted hover:text-textPrimary">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} noValidate className="p-5 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-textSecondary mb-1.5">Report Name</label>
            <input
              value={name}
              onChange={function (e) { setName(e.target.value); }}
              placeholder="e.g. May Inventory Summary"
              className={"w-full px-3 py-2.5 rounded-lg bg-surfaceLight border text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40 " + (errors.name ? "border-danger" : "border-border")}
            />
            {errors.name && <p className="text-xs text-danger mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-textSecondary mb-1.5">Category</label>
            <select
              value={category}
              onChange={function (e) { setCategory(e.target.value); }}
              className="w-full px-3 py-2.5 rounded-lg bg-surfaceLight border border-border text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {categories.filter(function (c) { return c !== "All"; }).map(function (c) {
                return <option key={c} value={c}>{c}</option>;
              })}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-textSecondary mb-1.5">Format</label>
            <div className="flex gap-2">
              {["PDF", "Excel"].map(function (t) {
                var isActive = type === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={function () { setType(t); }}
                    className={"px-4 py-2 rounded-lg text-sm font-medium border transition-colors " + (isActive ? "bg-primary/10 text-primary border-primary/30" : "bg-surfaceLight text-textSecondary border-border")}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-lg bg-surfaceLight border border-border text-sm font-medium text-textSecondary hover:text-textPrimary transition">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition">
              Generate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);

  useEffect(function () {
    getReports().then(function (data) {
      setReports(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <Skeleton className="h-7 w-32 mb-2" />
              <Skeleton className="h-4 w-80 max-w-full" />
            </div>
            <Skeleton className="h-10 w-48 rounded-lg" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {[1, 2, 3, 4].map(function (n) {
              return (
                <div key={n} className="bg-surface border border-border rounded-xl p-4">
                  <Skeleton className="w-9 h-9 rounded-lg mb-3" />
                  <Skeleton className="h-3 w-28 mb-2" />
                  <Skeleton className="h-6 w-12" />
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map(function (n) {
              return <Skeleton key={n} className="h-9 w-24 rounded-lg" />;
            })}
          </div>

          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map(function (n) {
              return (
                <div key={n} className="flex items-center gap-4 px-4 md:px-5 py-4 border-b border-border last:border-0">
                  <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-4 w-56 max-w-full mb-2" />
                    <Skeleton className="h-3 w-64 max-w-full" />
                  </div>
                  <Skeleton className="h-9 w-10 sm:w-28 rounded-lg shrink-0" />
                </div>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  var filtered = reports.filter(function (r) {
    return activeCategory === "All" || r.category === activeCategory;
  });

  var thisMonthCount = reports.filter(function (r) {
    var d = new Date(r.generatedDate);
    var now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  var uniqueCategories = new Set(reports.map(function (r) { return r.category; })).size;

  var stats = [
    { label: "Total Reports", value: reports.length, icon: FileBarChart2, color: "text-primary bg-primary/10" },
    { label: "Generated This Month", value: thisMonthCount, icon: CalendarClock, color: "text-info bg-info/10" },
    { label: "Categories", value: uniqueCategories, icon: Layers, color: "text-secondary bg-secondary/10" },
    { label: "Scheduled Reports", value: 2, icon: CalendarClock, color: "text-warning bg-warning/10" },
  ];

  function handleDownload(report) {
    Promise.resolve()
      .then(function () {
        return downloadReport(report);
      })
      .then(function () {
        toast.success("Downloaded \"" + report.name + "\"");
      })
      .catch(function () {
        toast.error("Failed to download report");
      });
  }

  function handleGenerate(data) {
    generateReport(data).then(function (newReport) {
      setReports([newReport].concat(reports));
      setShowModal(false);
      toast.success("Report generated successfully");
    });
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-textPrimary">Reports</h1>
            <p className="text-sm text-textSecondary mt-1">Generate and download reports across your supply chain.</p>
          </div>
          <button
            onClick={function () { setShowModal(true); }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition shrink-0"
          >
            <Plus size={16} />
            Generate New Report
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

        <div className="flex gap-2 flex-wrap">
          {categories.map(function (c) {
            var isActive = activeCategory === c;
            return (
              <button
                key={c}
                onClick={function () { setActiveCategory(c); }}
                className={"px-4 py-2 rounded-lg text-sm font-medium border transition-colors " + (isActive ? "bg-primary/10 text-primary border-primary/30" : "bg-surface text-textSecondary border-border hover:bg-surfaceLight")}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-textMuted">
              <FileBarChart2 size={32} className="mb-3 opacity-40" />
              <p className="text-sm">No reports in this category</p>
            </div>
          ) : (
            filtered.map(function (r) {
              return (
                <div key={r.id} className="flex items-center gap-4 px-4 md:px-5 py-4 border-b border-border last:border-0 hover:bg-surfaceLight transition-colors">
                  <ReportTypeIcon type={r.type} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-textPrimary truncate">{r.name}</p>
                    <p className="text-xs text-textMuted mt-0.5">{r.category} · {r.generatedDate} · {r.size}</p>
                  </div>
                  <button
                    onClick={function () { handleDownload(r); }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surfaceLight border border-border text-xs font-medium text-textSecondary hover:text-textPrimary transition shrink-0"
                  >
                    <Download size={14} />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {showModal && (
        <GenerateReportModal onClose={function () { setShowModal(false); }} onGenerate={handleGenerate} />
      )}
    </DashboardLayout>
  );
}

export default Reports;
