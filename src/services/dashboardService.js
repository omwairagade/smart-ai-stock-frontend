import { simulateRequest } from "./api";
import {
  dashboardStats,
  inventoryValueSummary,
  stockDistribution,
  attentionAlerts,
  aiForecastSummary,
} from "../data/dashboard";

export function getDashboardStats() {
  return simulateRequest(dashboardStats);
}

export function getInventoryValueSummary() {
  return simulateRequest(inventoryValueSummary);
}

export function getStockDistribution() {
  return simulateRequest(stockDistribution);
}

export function getAttentionAlerts() {
  return simulateRequest(attentionAlerts);
}

export function getAIForecastSummary() {
  return simulateRequest(aiForecastSummary);
}
