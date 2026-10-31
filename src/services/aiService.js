import { forecastSummary, aiInsights, productForecasts } from "../data/forecasts";
import { simulateRequest } from "./api";

export function getForecastSummary() {
  return simulateRequest(forecastSummary);
}

export function getAiInsights() {
  return simulateRequest(aiInsights);
}

export function getProductForecasts() {
  return simulateRequest(productForecasts);
}

export function refreshForecast() {
  return simulateRequest({ lastRun: "Just now" }, 1200);
}
