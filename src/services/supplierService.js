import { suppliers } from "../data/suppliers";
import { simulateRequest } from "./api";

export function getSuppliers() {
  return simulateRequest(suppliers);
}

export function getSupplierById(id) {
  var found = suppliers.find(function (s) { return s.id === id; });
  return simulateRequest(found);
}

export function addSupplier(data) {
  var newSupplier = {
    id: Date.now(),
    name: data.name,
    contactPerson: data.contactPerson,
    email: data.email,
    phone: data.phone,
    category: data.category,
    paymentTerms: data.paymentTerms,
    status: data.status,
    reliabilityScore: 0,
    avgDeliveryDays: 0,
    totalOrders: 0,
    onTimeRate: 0,
    productsSupplied: [],
  };
  suppliers.unshift(newSupplier);
  return simulateRequest(newSupplier);
}

export function updateSupplier(id, data) {
  var index = suppliers.findIndex(function (s) { return s.id === id; });
  if (index === -1) {
    return simulateRequest(null);
  }
  suppliers[index] = Object.assign({}, suppliers[index], data);
  return simulateRequest(suppliers[index]);
}
