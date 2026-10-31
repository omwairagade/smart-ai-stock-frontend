import { createContext, useContext, useEffect, useState } from "react";
import { getNotifications } from "../services/notificationService";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    getNotifications().then(function (data) {
      setNotifications(data);
      setLoading(false);
    });
  }, []);

  function markAsRead(id) {
    setNotifications(function (prev) {
      return prev.map(function (n) {
        if (n.id === id) {
          return Object.assign({}, n, { read: true });
        }
        return n;
      });
    });
  }

  function markAllAsRead() {
    setNotifications(function (prev) {
      return prev.map(function (n) {
        return Object.assign({}, n, { read: true });
      });
    });
  }

  var unreadCount = notifications.filter(function (n) { return !n.read; }).length;

  var value = {
    notifications: notifications,
    unreadCount: unreadCount,
    loading: loading,
    markAsRead: markAsRead,
    markAllAsRead: markAllAsRead,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
