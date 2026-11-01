import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useNotifications } from "../context/NotificationContext";
import NotificationItem from "../components/notifications/NotificationItem";
import Skeleton from "../components/common/Skeleton";
import { CheckCheck, Bell } from "lucide-react";

var filters = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "order", label: "Orders" },
  { key: "stock", label: "Stock" },
  { key: "supplier", label: "Suppliers" },
  { key: "ai", label: "AI" },
];

function Notifications() {
  const navigate = useNavigate();
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } = useNotifications();
  const [activeFilter, setActiveFilter] = useState("all");

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <Skeleton className="h-7 w-44 mb-2" />
              <Skeleton className="h-4 w-56 max-w-full" />
            </div>
            <Skeleton className="h-10 w-40 rounded-lg" />
          </div>

          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map(function (n) {
              return <Skeleton key={n} className="h-9 w-20 rounded-lg" />;
            })}
          </div>

          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map(function (n) {
              return (
                <div key={n} className="flex items-start gap-3 p-4 border-b border-border last:border-b-0">
                  <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-4 w-48 max-w-full mb-2" />
                    <Skeleton className="h-3 w-full max-w-md mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  var filtered = notifications.filter(function (n) {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !n.read;
    return n.type === activeFilter;
  });

  function handleItemClick(n) {
    markAsRead(n.id);
    if (n.link) {
      navigate(n.link);
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-textPrimary">Notifications</h1>
            <p className="text-sm text-textSecondary mt-1">
              {unreadCount > 0 ? unreadCount + " unread notifications" : "You're all caught up"}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-border text-sm font-semibold text-textSecondary hover:text-textPrimary hover:bg-surfaceLight transition shrink-0"
            >
              <CheckCheck size={16} />
              Mark all as read
            </button>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {filters.map(function (f) {
            var isActive = activeFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={function () { setActiveFilter(f.key); }}
                className={"px-4 py-2 rounded-lg text-sm font-medium border transition-colors " + (isActive ? "bg-primary/10 text-primary border-primary/30" : "bg-surface text-textSecondary border-border hover:bg-surfaceLight")}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-textMuted">
              <Bell size={32} className="mb-3 opacity-40" />
              <p className="text-sm">No notifications in this category</p>
            </div>
          ) : (
            filtered.map(function (n) {
              return (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  compact={false}
                  onClick={function () { handleItemClick(n); }}
                />
              );
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Notifications;
