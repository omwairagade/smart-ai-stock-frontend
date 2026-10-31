import { supplierEvaluations } from "../data/evaluations";
import { simulateRequest } from "./api";

export function getSupplierEvaluations() {
  return simulateRequest(supplierEvaluations);
}
