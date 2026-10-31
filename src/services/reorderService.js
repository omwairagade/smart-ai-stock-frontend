import { reorderSuggestions } from "../data/reorderSuggestions";
import { simulateRequest } from "./api";

export function getReorderSuggestions() {
  return simulateRequest(reorderSuggestions);
}

export function approveReorderSuggestion(id) {
  var index = reorderSuggestions.findIndex(function (s) { return s.id === id; });
  if (index !== -1) {
    reorderSuggestions[index] = Object.assign({}, reorderSuggestions[index], { status: "approved" });
  }
  return simulateRequest(reorderSuggestions[index], 600);
}
