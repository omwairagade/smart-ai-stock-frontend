import { communicationLogs } from "../data/communicationLogs";
import { simulateRequest } from "./api";

export function getCommunicationLogs() {
  return simulateRequest(communicationLogs);
}

export function logCommunication(data) {
  return simulateRequest(data, 600);
}
