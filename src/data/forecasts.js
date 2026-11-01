export const forecastSummary = {
  accuracy: 89,
  productsAnalyzed: 42,
  restockAlerts: 6,
  lastRun: "2 hours ago",
};

export const aiInsights = [
  { id: 1, type: "increase", title: "Seasonal spike expected", message: "Cement PPC 50kg demand is projected to rise 28% over the next 3 weeks ahead of the pre-monsoon construction rush. Consider increasing reorder quantity." },
  { id: 2, type: "decrease", title: "Demand softening", message: "TMT Steel Rods 8mm sales have dropped 9% over the last month. Reduce next order by ~120 units." },
  { id: 3, type: "alert", title: "Stockout risk", message: "PVC Pipe 2in 6m will fall below safety stock within 9 days at current sale velocity. Reorder recommended now." },
];

export const productForecasts = [
  { id: 1, name: "Cement PPC 50kg", sku: "CEM-050", currentStock: 120, predictedDemand30d: 340, confidence: 92, trend: "up", trendPercent: 28, recommendedReorderQty: 220, recommendedReorderDate: "2025-06-12", accuracy: 91,
    history: [ { period: "Jan", actual: 210, predicted: null }, { period: "Feb", actual: 240, predicted: null }, { period: "Mar", actual: 260, predicted: null }, { period: "Apr", actual: 300, predicted: null }, { period: "May", actual: 320, predicted: 318 }, { period: "Jun", actual: null, predicted: 360 }, { period: "Jul", actual: null, predicted: 410 }, { period: "Aug", actual: null, predicted: 430 } ] },
  { id: 2, name: "TMT Steel Rods 8mm", sku: "STL-008", currentStock: 80, predictedDemand30d: 150, confidence: 85, trend: "down", trendPercent: 9, recommendedReorderQty: 90, recommendedReorderDate: "2025-06-20", accuracy: 87,
    history: [ { period: "Jan", actual: 220, predicted: null }, { period: "Feb", actual: 205, predicted: null }, { period: "Mar", actual: 190, predicted: null }, { period: "Apr", actual: 175, predicted: null }, { period: "May", actual: 160, predicted: 158 }, { period: "Jun", actual: null, predicted: 150 }, { period: "Jul", actual: null, predicted: 140 }, { period: "Aug", actual: null, predicted: 132 } ] },
  { id: 3, name: "PVC Pipe 2in 6m", sku: "PVC-002", currentStock: 35, predictedDemand30d: 210, confidence: 94, trend: "up", trendPercent: 35, recommendedReorderQty: 200, recommendedReorderDate: "2025-05-28", accuracy: 93,
    history: [ { period: "Jan", actual: 140, predicted: null }, { period: "Feb", actual: 150, predicted: null }, { period: "Mar", actual: 165, predicted: null }, { period: "Apr", actual: 180, predicted: null }, { period: "May", actual: 195, predicted: 198 }, { period: "Jun", actual: null, predicted: 230 }, { period: "Jul", actual: null, predicted: 250 }, { period: "Aug", actual: null, predicted: 265 } ] },
  { id: 4, name: "Binding Wire 25kg", sku: "BWR-025", currentStock: 95, predictedDemand30d: 180, confidence: 80, trend: "stable", trendPercent: 2, recommendedReorderQty: 100, recommendedReorderDate: "2025-06-15", accuracy: 82,
    history: [ { period: "Jan", actual: 170, predicted: null }, { period: "Feb", actual: 172, predicted: null }, { period: "Mar", actual: 168, predicted: null }, { period: "Apr", actual: 175, predicted: null }, { period: "May", actual: 178, predicted: 176 }, { period: "Jun", actual: null, predicted: 180 }, { period: "Jul", actual: null, predicted: 182 }, { period: "Aug", actual: null, predicted: 181 } ] },
  { id: 5, name: "MCB 32A Double Pole", sku: "MCB-032", currentStock: 210, predictedDemand30d: 95, confidence: 88, trend: "down", trendPercent: 5, recommendedReorderQty: 60, recommendedReorderDate: "2025-07-02", accuracy: 86,
    history: [ { period: "Jan", actual: 120, predicted: null }, { period: "Feb", actual: 115, predicted: null }, { period: "Mar", actual: 108, predicted: null }, { period: "Apr", actual: 102, predicted: null }, { period: "May", actual: 98, predicted: 97 }, { period: "Jun", actual: null, predicted: 95 }, { period: "Jul", actual: null, predicted: 90 }, { period: "Aug", actual: null, predicted: 88 } ] },
  { id: 6, name: "Wall Putty 20kg", sku: "PUT-020", currentStock: 60, predictedDemand30d: 160, confidence: 90, trend: "up", trendPercent: 18, recommendedReorderQty: 130, recommendedReorderDate: "2025-06-05", accuracy: 89,
    history: [ { period: "Jan", actual: 110, predicted: null }, { period: "Feb", actual: 118, predicted: null }, { period: "Mar", actual: 125, predicted: null }, { period: "Apr", actual: 135, predicted: null }, { period: "May", actual: 145, predicted: 144 }, { period: "Jun", actual: null, predicted: 160 }, { period: "Jul", actual: null, predicted: 172 }, { period: "Aug", actual: null, predicted: 180 } ] },
];
