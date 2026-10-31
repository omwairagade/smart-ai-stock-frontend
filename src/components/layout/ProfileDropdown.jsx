import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { User, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function ProfileDropdown({ onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleNavigate(path) {
    onClose();
    navigate(path);
  }

  function handleLogout() {
    logout().then(function () {
      onClose();
      toast.success("Logged out successfully");
      navigate("/login");
    });
  }

  return (
    <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-xl shadow-lg overflow-hidden z-50">
      <div className="px-4 py-3 border-b border-border">
        <p className="text-sm font-semibold text-textPrimary">{user ? user.name : "Guest"}</p>
        <p className="text-xs text-textMuted">{user ? user.email : ""}</p>
      </div>

      <div className="py-1">
        <button
          onClick={function () { handleNavigate("/settings"); }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-textSecondary hover:bg-surfaceLight hover:text-textPrimary transition-colors"
        >
          <User size={16} />
          My Profile
        </button>
        <button
          onClick={function () { handleNavigate("/settings"); }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-textSecondary hover:bg-surfaceLight hover:text-textPrimary transition-colors"
        >
          <Settings size={16} />
          Settings
        </button>
      </div>

      <div className="py-1 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-danger/10 transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileDropdown;
