export const purchaseOrders = [
  {
    id: "PO-1023",
    supplier: "Bharat Cement Traders",
    items: [
      { product: "Cement OPC 53 Grade 50kg", qty: 50, unitPrice: 370 },
      { product: "River Sand (1 Ton)", qty: 30, unitPrice: 1500 },
    ],
    status: "shipped",
    orderDate: "2025-05-01",
    expectedDelivery: "2025-05-06",
    isAiSuggested: true,
    createdBy: "Om Wairagade",
  },
  {
    id: "PO-1024",
    supplier: "Shree Steel Corporation",
    items: [
      { product: "TMT Steel Rods 12mm", qty: 100, unitPrice: 700 },
    ],
    status: "pending",
    orderDate: "2025-05-03",
    expectedDelivery: "2025-05-10",
    isAiSuggested: true,
    createdBy: "AI Smart Reorder",
  },
  {
    id: "PO-1025",
    supplier: "Patel Plumbing Distributors",
    items: [
      { product: "PVC Pipe 4in 6m", qty: 200, unitPrice: 520 },
      { product: "PVC Elbow 4in", qty: 80, unitPrice: 85 },
    ],
    status: "confirmed",
    orderDate: "2025-04-28",
    expectedDelivery: "2025-05-05",
    isAiSuggested: false,
    createdBy: "Om Wairagade",
  },
  {
    id: "PO-1026",
    supplier: "Metro Paints & Tiles",
    items: [
      { product: "Vitrified Floor Tiles (Box)", qty: 60, unitPrice: 620 },
    ],
    status: "delivered",
    orderDate: "2025-04-20",
    expectedDelivery: "2025-04-27",
    isAiSuggested: true,
    createdBy: "AI Smart Reorder",
  },
  {
    id: "PO-1027",
    supplier: "Global Electricals Co.",
    items: [
      { product: "Copper Wire 1.5mm 90m", qty: 40, unitPrice: 1500 },
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
