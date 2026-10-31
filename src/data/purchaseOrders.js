export const purchaseOrders = [
  {
    id: "PO-1023",
    supplier: "ABC Traders",
    items: [
      { product: "Rice 25kg", qty: 50, unitPrice: 1050 },
      { product: "Wheat Flour 10kg", qty: 30, unitPrice: 380 },
    ],
    status: "shipped",
    orderDate: "2025-05-01",
    expectedDelivery: "2025-05-06",
    isAiSuggested: true,
    createdBy: "Om Wairagade",
  },
  {
    id: "PO-1024",
    supplier: "Shree Enterprises",
    items: [
      { product: "Cooking Oil 1L", qty: 100, unitPrice: 150 },
    ],
    status: "pending",
    orderDate: "2025-05-03",
    expectedDelivery: "2025-05-10",
    isAiSuggested: true,
    createdBy: "AI Smart Reorder",
  },
  {
    id: "PO-1025",
    supplier: "Patel Distributors",
    items: [
      { product: "Biscuits Pack", qty: 200, unitPrice: 18 },
      { product: "Namkeen", qty: 80, unitPrice: 45 },
    ],
    status: "confirmed",
    orderDate: "2025-04-28",
    expectedDelivery: "2025-05-05",
    isAiSuggested: false,
    createdBy: "Om Wairagade",
  },
  {
    id: "PO-1026",
    supplier: "Metro Wholesale",
    items: [
      { product: "Detergent Powder 1kg", qty: 60, unitPrice: 85 },
    ],
    status: "delivered",
    orderDate: "2025-04-20",
    expectedDelivery: "2025-04-27",
    isAiSuggested: true,
    createdBy: "AI Smart Reorder",
  },
  {
    id: "PO-1027",
    supplier: "Global Supply Co.",
    items: [
      { product: "USB Cable Type-C", qty: 150, unitPrice: 95 },
    ],
    status: "cancelled",
    orderDate: "2025-04-15",
    expectedDelivery: "2025-04-22",
    isAiSuggested: false,
    createdBy: "Om Wairagade",
  },
];

export function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
}
