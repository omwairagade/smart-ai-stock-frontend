import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(function () {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });

  useEffect(function () {
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  var contentMarginClass = collapsed ? "md:ml-20" : "md:ml-64";

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={open} collapsed={collapsed} setCollapsed={setCollapsed} />

      {open && (
        <div
          onClick={function () { setOpen(false); }}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        ></div>
      )}

      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface sticky top-0 z-20 md:hidden">
        <button
          onClick={function () { setOpen(!open); }}
          className="p-2 rounded-lg text-textSecondary hover:bg-surfaceLight"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <p className="text-sm font-bold text-textPrimary tracking-wide">STOCKSYNC AI</p>
        <div style={{ width: 36 }}></div>
      </div>

      <div className={contentMarginClass + " transition-all duration-200"}>
        <Topbar />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
