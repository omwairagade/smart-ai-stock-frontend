import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getForecastSummary, getAiInsights, getProductForecasts, refreshForecast } from "../services/aiService";
import ForecastChart from "../components/forecasting/ForecastChart";
import ForecastTable from "../components/forecasting/ForecastTable";
import ConfidenceBadge from "../components/forecasting/ConfidenceBadge";
import Skeleton from "../components/common/Skeleton";
import { Target, PackageSearch, Clock, Sparkles, RefreshCw, AlertTriangle, TrendingUp,TrendingDown } from "lucide-react";
import toast from "react-hot-toast";

function AIForecasting() {
  const [forecastSummary, setForecastSummary] = useState(null);
  const [aiInsights, setAiInsights] = useState([]);
  const [productForecasts, setProductForecasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [lastRun, setLastRun] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(function () {
    Promise.all([getForecastSummary(), getAiInsights(), getProductForecasts()]).then(function (results) {
      setForecastSummary(results[0]);
      setAiInsights(results[1]);
      setProductForecasts(results[2]);
      setSelectedId(results[2][0].id);
      setLastRun(results[0].lastRun);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <Skeleton className="h-7 w-48 mb-2" />
              <Skeleton className="h-4 w-72 max-w-full" />
            </div>
            <Skeleton className="h-10 w-40 rounded-lg" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {[1, 2, 3, 4].map(function (n) {
              return (
                <div key={n} className="bg-surface border border-border rounded-xl p-4">
                  <Skeleton className="w-9 h-9 rounded-lg mb-3" />
                  <Skeleton className="h-3 w-24 mb-2" />
                  <Skeleton className="h-6 w-16" />
                </div>
              );
            })}
          </div>

          <div className="bg-surface border border-border rounded-xl p-4 md:p-5">
            <Skeleton className="h-4 w-56 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[1, 2, 3].map(function (n) {
                return <Skeleton key={n} className="h-24 rounded-lg" />;
              })}
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-4 md:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <Skeleton className="h-4 w-36 mb-2" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-9 w-44 rounded-lg" />
            </div>
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>

          <div className="bg-surface border border-border rounded-xl p-4 md:p-5">
            <Skeleton className="h-4 w-48 mb-4" />
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4, 5].map(function (n) {
                return <Skeleton key={n} className="h-10 w-full" />;
              })}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  var selectedProduct = productForecasts.find(function (p) { return p.id === selectedId; });

  function handleRefresh() {
    setRefreshing(true);
    refreshForecast().then(function (result) {
      setRefreshing(false);
      setLastRun(result.lastRun);
      toast.success("Forecast models refreshed");
    });
  }

  var stats = [
    { label: "Forecast Accuracy", value: forecastSummary.accuracy + "%", icon: Target,color: "text-primary bg-primary/10" },
    { label: "Products Analyzed", value: forecastSummary.productsAnalyzed, icon: PackageSearch, color: "text-info bg-info/10" },
    { label: "Restock Alerts", value: forecastSummary.restockAlerts, icon: AlertTriangle, color: "text-warning bg-warning/10" },
    { label: "Model Last Run", value: lastRun, icon: Clock, color: "text-secondary bg-secondary/10" },
  ];

  var insightIcon = { increase: TrendingUp, decrease: TrendingDown, alert: AlertTriangle };
  var insightColor = {
    increase: "text-success bg-success/10 border-success/20",
    decrease: "text-warning bg-warning/10 border-warning/20",
    alert: "text-danger bg-danger/10 border-danger/20",
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-textPrimary">AI Forecasting</h1>
            <p className="text-sm text-textSecondary mt-1">Predict demand and plan smarter restocking with AI-driven insights.</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-60 shrink-0"
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Refreshing..." : "Run New Forecast"}
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

        <div className="bg-surface border border-border rounded-xl p-4 md:p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-secondary" />
            <h2 className="text-sm font-semibold text-textPrimary">AI Insights & Recommendations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {aiInsights.map(function (insight) {
              var Icon = insightIcon[insight.type];
              return (
                <div key={insight.id} className={"border rounded-lg p-3 " + insightColor[insight.type]}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} />
                    <p className="text-xs font-bold">{insight.title}</p>
                  </div>
                  <p className="text-xs text-textSecondary leading-relaxed">{insight.message}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-4 md:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-textPrimary">Demand Forecast</h2>
              <p className="text-xs text-textMuted mt-0.5">{selectedProduct.name} · {selectedProduct.sku}</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <ConfidenceBadge value={selectedProduct.confidence} />
              <select
                value={selectedId}
                onChange={function (e) { setSelectedId(Number(e.target.value)); }}
                className="text-sm bg-surfaceLight border border-border rounded-lg px-3 py-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {productForecasts.map(function (p) {
                  return <option key={p.id} value={p.id}>{p.name}</option>;
                })}
              </select>
            </div>
          </div>
          <ForecastChart data={selectedProduct.history} />
        </div>

        <div className="bg-surface border border-border rounded-xl p-4 md:p-5">
          <h2 className="text-sm font-semibold text-textPrimary mb-4">Product-Level Forecasts</h2>
          <ForecastTable products={productForecasts} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AIForecasting;
