import { products, getStockStatus } from "../data/products";
import { simulateRequest } from "./api";

export function getProducts() {
  return simulateRequest(products);
}

export function addProduct(data) {
  var newProduct = Object.assign({}, data, { id: Date.now() });
  products.push(newProduct);
  return simulateRequest(newProduct);
}

export function updateProduct(id, data) {
  var index = products.findIndex(function (p) { return p.id === id; });
  if (index === -1) {
    return simulateRequest(null);
  }
  products[index] = Object.assign({}, products[index], data, { id: id });
  return simulateRequest(products[index]);
}

export function deleteProduct(id) {
  var index = products.findIndex(function (p) { return p.id === id; });
  if (index !== -1) {
    products.splice(index, 1);
  }
  return simulateRequest({ success: true });
}

export { getStockStatus };
