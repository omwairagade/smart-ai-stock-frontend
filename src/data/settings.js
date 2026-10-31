export const profileData = {
  name: "Om Wairagade",
  email: "om.wairagade@tejasenterprises.com",
  phone: "+91 98765 43210",
  role: "Admin",
  initials: "OW",
};

export const businessData = {
  name: "Tejas Enterprises",
  gstin: "27AAACT2727Q1ZV",
  address: "Plot 14, MIDC Industrial Area, Pune, Maharashtra 411019",
  email: "contact@tejasenterprises.com",
  phone: "+91 20 2712 3456",
  currency: "INR (Rs)",
  timezone: "Asia/Kolkata (GMT+5:30)",
};

export const notificationPrefs = [
  { id: "lowStock", label: "Low stock alerts", description: "Notify when a product falls below reorder point.", enabled: true },
  { id: "orderUpdates", label: "Purchase order updates", description: "Notify on status changes for purchase orders.", enabled: true },
  { id: "aiForecast", label: "AI forecast reports", description: "Notify when new demand forecasts are generated.", enabled: true },
  { id: "supplierReview", label: "Supplier review reminders", description: "Notify when a supplier review is due.", enabled: false },
  { id: "weeklyReport", label: "Weekly summary report", description: "Receive a weekly performance summary by email.", enabled: true },
];
