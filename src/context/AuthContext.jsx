import { createContext, useContext, useState, useEffect } from "react";
import { login as loginRequest, logout as logoutRequest } from "../services/authService";

const AuthContext = createContext();

var STORAGE_KEY = "stocksync_auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        var parsed = JSON.parse(stored);
        setUser(parsed.user);
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  function login(email, password) {
    return loginRequest(email, password).then(function (response) {
      setUser(response.user);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(response));
      return response;
    });
  }

  function logout() {
    return logoutRequest().then(function () {
      setUser(null);
      localStorage.removeItem(STORAGE_KEY);
    });
  }

  function updateUser(fields) {
    var updated = Object.assign({}, user, fields);
    setUser(updated);
    var stored = localStorage.getItem(STORAGE_KEY);
    var token = null;
    if (stored) {
      try {
        token = JSON.parse(stored).token;
      } catch (e) {
        token = null;
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: updated, token: token }));
  }

  var value = {
    user: user,
    isAuthenticated: !!user,
    loading: loading,
    login: login,
    logout: logout,
    updateUser: updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
