export var dashboardStats = [
  { key: "inventory", label: "Total Inventory Value", value: "$2.84M", change: "12.6% vs last month", trend: "up", color: "primary" },
  { key: "suppliers", label: "Active Suppliers", value: "128", change: "4.2% vs last month", trend: "up", color: "info" },
  { key: "orders", label: "Open Purchase Orders", value: "47", change: "8.1% vs last month", trend: "down", color: "warning" },
  { key: "lowstock", label: "Low Stock Items", value: "23", change: "16.4% vs last month", trend: "down", color: "danger" },
];

export var inventoryValueSummary = {
  total: "$2,843,920",
  changePercent: "12.6%",
  badge: "Healthy",
  series: [
    { date: "Apr 01", value: 2400000 },
    { date: "Apr 08", value: 2550000 },
    { date: "Apr 15", value: 2500000 },
    { date: "Apr 22", value: 2700000 },
    { date: "Apr 30", value: 2843920 },
  ],
};

export var stockDistribution = {
  healthyPercent: 68,
  segments: [
    { name: "Healthy", value: 1842, color: "#2DD4BF" },
    { name: "Low stock", value: 23, color: "#F59E0B" },
    { name: "Out of stock", value: 7, color: "#F43F5E" },
  ],
};

export var attentionAlerts = [
  { key: "reorder", color: "danger", title: "23 items below reorder point", sub: "Smart Reorder System - 8 min ago" },
  { key: "po", color: "warning", title: "5 purchase orders need review", sub: "Purchase Management - 24 min ago" },
  { key: "supplier", color: "info", title: "Supplier review due for Q2", sub: "Supplier Evaluation - Today" },
];

export var aiForecastSummary = {
  confidence: 86,
  confidenceLabel: "High confidence",
  trendText: "Forecast accuracy is trending up",
  lastRefreshed: "Model refreshed 1h ago",
};
