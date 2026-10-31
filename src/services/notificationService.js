import { initialNotifications } from "../data/notifications";
import { simulateRequest } from "./api";

export function getNotifications() {
  return simulateRequest(initialNotifications);
}
