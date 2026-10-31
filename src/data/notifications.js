export const initialNotifications = [
  { id: 1, type: "stock", title: "Low stock alert", message: "Sugar 50kg has fallen below the reorder point. Only 35 units remaining.", time: "10 minutes ago", read: false, link: "/inventory" },
  { id: 2, type: "ai", title: "AI forecast updated", message: "Demand forecast for Basmati Rice 25kg predicts a 28% rise over the next 3 weeks.", time: "1 hour ago", read: false, link: "/forecasting" },
  { id: 3, type: "order", title: "Purchase order shipped", message: "PO-1023 from ABC Traders has been shipped and is expected on 2025-05-06.", time: "3 hours ago", read: false, link: "/purchases" },
  { id: 4, type: "supplier", title: "Supplier review due", message: "Quarterly performance review for Patel Distributors is due this week.", time: "5 hours ago", read: true, link: "/suppliers" },
  { id: 5, type: "order", title: "New purchase order created", message: "PO-1027 was created for Global Supply Co. worth Rs 14,250.", time: "1 day ago", read: true, link: "/purchases" },
  { id: 6, type: "stock", title: "Out of stock", message: "Refined Cooking Oil 15L is now out of stock at the main warehouse.", time: "1 day ago", read: true, link: "/inventory" },
  { id: 7, type: "system", title: "Weekly report ready", message: "Your weekly supply chain summary report is ready to view.", time: "2 days ago", read: true, link: "/reports" },
  { id: 8, type: "supplier", title: "New supplier onboarded", message: "Metro Wholesale has been added as an active supplier.", time: "3 days ago", read: true, link: "/suppliers" },
];
