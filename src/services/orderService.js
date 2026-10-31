import { purchaseOrders } from "../data/purchaseOrders";
import { simulateRequest } from "./api";

export function getPurchaseOrders() {
  return simulateRequest(purchaseOrders);
}

export function createPurchaseOrder(newOrder) {
  purchaseOrders.unshift(newOrder);
  return simulateRequest(newOrder, 700);
}

export function updateOrderStatus(id, status) {
  var index = purchaseOrders.findIndex(function (po) { return po.id === id; });
  if (index === -1) {
    return simulateRequest(null);
  }
  purchaseOrders[index] = Object.assign({}, purchaseOrders[index], { status: status });
  return simulateRequest(purchaseOrders[index]);
}
