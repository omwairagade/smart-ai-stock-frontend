import { profileData, businessData, notificationPrefs } from "../data/settings";
import { simulateRequest } from "./api";

export function getProfile() {
  return simulateRequest(profileData);
}

export function getBusiness() {
  return simulateRequest(businessData);
}

export function getNotificationPrefs() {
  return simulateRequest(notificationPrefs);
}

export function updateProfile(data) {
  return simulateRequest(data, 600);
}

export function updateBusiness(data) {
  return simulateRequest(data, 600);
}

export function updateNotificationPrefs(data) {
  return simulateRequest(data, 400);
}

export function updatePassword(data) {
  return simulateRequest({ success: true }, 600);
}
