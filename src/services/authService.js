import { simulateRequest, simulateError } from "./api";

var STORAGE_KEY = "stocksync_credentials";

var mockUser = {
  id: "u1",
  name: "Om Wairagade",
  email: "om.wairagade@tejasenterprises.com",
  role: "Admin",
  workspace: "Tejas Enterprises",
};

var mockCredentials = {
  email: "om.wairagade@tejasenterprises.com",
  password: "admin123",
};

function loadSavedCredentials() {
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      var parsed = JSON.parse(saved);
      if (parsed && parsed.email && parsed.password) {
        return parsed;
      }
    }
  } catch (e) {
    return null;
  }
  return null;
}

function saveCredentials() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCredentials));
  } catch (e) {
    // storage unavailable, changes last until reload only
  }
}

var savedCredentials = loadSavedCredentials();
if (savedCredentials) {
  mockCredentials.email = savedCredentials.email;
  mockCredentials.password = savedCredentials.password;
  mockUser.email = savedCredentials.email;
}

export function login(email, password) {
  if (email === mockCredentials.email && password === mockCredentials.password) {
    var response = {
      user: mockUser,
      token: "mock-token-" + Date.now(),
    };
    return simulateRequest(response, 700);
  }
  return simulateError({ message: "Invalid email or password" }, 700);
}

export function logout() {
  return simulateRequest({ success: true }, 200);
}

export function changePassword(currentPassword, newPassword) {
  if (currentPassword !== mockCredentials.password) {
    return simulateError({ message: "Current password is incorrect" }, 600);
  }
  mockCredentials.password = newPassword;
  saveCredentials();
  return simulateRequest({ success: true }, 600);
}

export function updateEmail(newEmail) {
  mockCredentials.email = newEmail;
  mockUser.email = newEmail;
  saveCredentials();
  return simulateRequest({ success: true }, 400);
}
