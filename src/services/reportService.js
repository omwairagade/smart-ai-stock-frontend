import { reportsList } from "../data/reports";
import { simulateRequest } from "./api";

export function getReports() {
  return simulateRequest(reportsList);
}

export function generateReport(data) {
  var newReport = {
    id: Date.now(),
    name: data.name,
    category: data.category,
    generatedDate: new Date().toISOString().slice(0, 10),
    type: data.type,
    size: "—",
  };
  return simulateRequest(newReport, 900);
}
