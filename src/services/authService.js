import { simulateRequest, simulateError } from "./api";

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
  return simulateRequest({ success: true }, 600);
}

export function updateEmail(newEmail) {
  mockCredentials.email = newEmail;
  mockUser.email = newEmail;
  return simulateRequest({ success: true }, 400);
}
