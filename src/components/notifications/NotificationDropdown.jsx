import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";
import NotificationItem from "./NotificationItem";
import { CheckCheck, Bell } from "lucide-react";

function NotificationDropdown({ onClose }) {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  var recent = notifications.slice(0, 5);

  function handleItemClick(n) {
    markAsRead(n.id);
    onClose();
    if (n.link) {
      navigate(n.link);
    }
  }

  function handleViewAll() {
    onClose();
    navigate("/notifications");
  }

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface border border-border rounded-xl shadow-lg overflow-hidden z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <p className="text-sm font-semibold text-textPrimary">Notifications</p>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <CheckCheck size={14} />
            Mark all as read
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto">
        {recent.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-textMuted">
            <Bell size={28} className="mb-2 opacity-40" />
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          recent.map(function (n) {
            return (
              <NotificationItem
                key={n.id}
                notification={n}
                compact={true}
                onClick={function () { handleItemClick(n); }}
              />
            );
          })
        )}
      </div>

      <button
        onClick={handleViewAll}
        className="w-full text-center text-sm text-primary font-medium py-3 border-t border-border hover:bg-surfaceLight transition-colors"
      >
        View all notifications
      </button>
    </div>
  );
}

export default NotificationDropdown;
