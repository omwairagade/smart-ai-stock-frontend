import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import InventoryValueChart from "../components/dashboard/InventoryValueChart";
import StockDistributionChart from "../components/dashboard/StockDistributionChart";
import NeedsAttentionCard from "../components/dashboard/NeedsAttentionCard";
import AIDemandForecastCard from "../components/dashboard/AIDemandForecastCard";
import ModuleGrid from "../components/dashboard/ModuleGrid";
import Skeleton from "../components/common/Skeleton";
import { getDashboardStats } from "../services/dashboardService";
import { useAuth } from "../context/AuthContext";
import { DollarSign, Users, ClipboardList, AlertTriangle } from "lucide-react";

var iconMap = {
  inventory: DollarSign,
  suppliers: Users,
  orders: ClipboardList,
  lowstock: AlertTriangle,
};

function getGreeting() {
  var hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats().then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  var firstName = user ? user.name.split(" ")[0] : "there";

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-7 w-56" />
            <Skeleton className="h-4 w-72" />
          </div>
          <Skeleton className="h-10 w-44" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-3">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
          <div className="xl:col-span-2 bg-surface border border-border rounded-xl p-4">
            <Skeleton className="h-64 w-full" />
          </div>
          <div className="bg-surface border border-border rounded-xl p-4">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
          <div className="bg-surface border border-border rounded-xl p-4">
            <Skeleton className="h-48 w-full" />
          </div>
          <div className="bg-surface border border-border rounded-xl p-4">
            <Skeleton className="h-48 w-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <p className="text-xs text-textMuted mb-1">SYSTEM OVERVIEW</p>
          <h1 className="text-2xl font-bold text-textPrimary">{getGreeting() + ", " + firstName}</h1>
          <p className="text-sm text-textMuted">Here's what's happening across your supply chain today.</p>
        </div>
        <button
          onClick={function () { navigate("/purchases"); }}
          className="bg-primary text-white font-semibold text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          + New Purchase Order
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <StatCard
            key={s.key}
            label={s.label}
            value={s.value}
            change={s.change}
            trend={s.trend}
            icon={iconMap[s.key]}
            color={s.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <InventoryValueChart />
        <StockDistributionChart />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
        <NeedsAttentionCard />
        <AIDemandForecastCard />
      </div>

      <ModuleGrid />
    </DashboardLayout>
  );
}
