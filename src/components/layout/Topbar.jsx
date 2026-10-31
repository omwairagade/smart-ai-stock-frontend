import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, Bell, ChevronDown } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";
import { useNotifications } from "../../context/NotificationContext";
import NotificationDropdown from "../notifications/NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";

var pathLabels = {
  "/": "Overview",
  "/suppliers": "Suppliers",
  "/inventory": "Inventory",
  "/purchases": "Purchase Orders",
  "/forecasting": "AI Forecasting",
  "/notifications": "Notifications",
  "/settings": "Settings",
  "/communication-log": "Communication Log",
  "/evaluation": "Evaluation",
  "/reorder": "Smart Reorder",
  "/reports": "Reports",
};

function Topbar() {
  const location = useLocation();
  const { unreadCount } = useNotifications();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  var currentLabel = pathLabels[location.pathname] || "Overview";

  useEffect(function () {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-surface border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-textMuted">Workspace</span>
          <span className="text-textMuted">/</span>
          <span className="text-textPrimary font-semibold">{currentLabel}</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-textSecondary hover:text-textPrimary transition-colors">
            <Search size={20} />
          </button>

          <div className="relative" ref={notifRef}>
            <button
              onClick={function () { setNotifOpen(!notifOpen); }}
              className="relative text-textSecondary hover:text-textPrimary transition-colors"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-danger border-2 border-surface"></span>
              )}
            </button>
            {notifOpen && (
              <NotificationDropdown onClose={function () { setNotifOpen(false); }} />
            )}
          </div>

          <ThemeToggle />

          <div className="relative" ref={profileRef}>
            <button
              onClick={function () { setProfileOpen(!profileOpen); }}
              className="flex items-center gap-2 pl-3 border-l border-border"
            >
              <div className="w-9 h-9 rounded-full bg-warning/20 text-warning flex items-center justify-center text-sm font-bold">
                OW
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-textPrimary leading-tight">Om Wairagade</p>
                <p className="text-xs text-textMuted leading-tight">Admin</p>
              </div>
              <ChevronDown size={16} className="hidden sm:block text-textMuted" />
            </button>
            {profileOpen && (
              <ProfileDropdown onClose={function () { setProfileOpen(false); }} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
