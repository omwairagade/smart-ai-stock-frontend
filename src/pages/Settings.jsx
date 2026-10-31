import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../components/layout/DashboardLayout";
import SettingsTabs from "../components/settings/SettingsTabs";
import ToggleSwitch from "../components/settings/ToggleSwitch";
import { useAuth } from "../context/AuthContext";
import { changePassword, updateEmail } from "../services/authService";
import {
  getProfile,
  getBusiness,
  getNotificationPrefs,
  updateProfile as updateProfileRequest,
  updateBusiness as updateBusinessRequest,
  updateNotificationPrefs as updateNotificationPrefsRequest,
} from "../services/settingsService";
import { User, Building2, Bell, Shield, Save, Eye, EyeOff, Loader2 } from "lucide-react";

var tabs = [
  { key: "profile", label: "Profile", icon: User },
  { key: "business", label: "Business", icon: Building2 },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "security", label: "Security", icon: Shield },
];

function Field({ label, value, onChange, type }) {
  return (
    <div>
      <label className="block text-xs font-medium text-textSecondary mb-1.5">{label}</label>
      <input
        type={type || "text"}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2.5 rounded-lg bg-surfaceLight border border-border text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
    </div>
  );
}

function Settings() {
  const { updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [business, setBusiness] = useState(null);
  const [prefs, setPrefs] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(function () {
    Promise.all([getProfile(), getBusiness(), getNotificationPrefs()]).then(function (results) {
      setProfile(results[0]);
      setBusiness(results[1]);
      setPrefs(results[2]);
      setLoading(false);
    });
  }, []);

  function updateProfile(field, value) {
    setProfile(Object.assign({}, profile, { [field]: value }));
  }

  function updateBusiness(field, value) {
    setBusiness(Object.assign({}, business, { [field]: value }));
  }

  function togglePref(id) {
    setPrefs(prefs.map(function (p) {
      if (p.id === id) {
        return Object.assign({}, p, { enabled: !p.enabled });
      }
      return p;
    }));
  }

  function handleSave(section) {
    if (section === "Profile") {
      setProfileLoading(true);
      updateProfileRequest(profile)
        .then(function () {
          return updateEmail(profile.email);
        })
        .then(function () {
          updateUser({ name: profile.name, email: profile.email });
          setProfileLoading(false);
          toast.success("Profile updated successfully");
        })
        .catch(function () {
          setProfileLoading(false);
          toast.error("Failed to update profile");
        });
      return;
    }
    if (section === "Business details") {
      updateBusinessRequest(business).then(function () {
        toast.success("Business details updated successfully");
      });
      return;
    }
    if (section === "Notification preferences") {
      updateNotificationPrefsRequest(prefs).then(function () {
        toast.success("Notification preferences updated successfully");
      });
      return;
    }
  }

  function handlePasswordChange() {
    if (!passwords.current || !passwords.next || !passwords.confirm) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (passwords.next.length < 4) {
      toast.error("New password must be at least 4 characters");
      return;
    }
    if (passwords.next !== passwords.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    setPasswordLoading(true);
    changePassword(passwords.current, passwords.next)
      .then(function () {
        setPasswordLoading(false);
        toast.success("Password updated successfully");
        setPasswords({ current: "", next: "", confirm: "" });
      })
      .catch(function (error) {
        setPasswordLoading(false);
        toast.error((error && error.message) || "Failed to update password");
      });
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-24">
          <Loader2 size={28} className="animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-textPrimary">Settings</h1>
          <p className="text-sm text-textSecondary mt-1">Manage your profile, business details and preferences.</p>
        </div>

        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <SettingsTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

          <div className="p-4 md:p-6">
            {activeTab === "profile" && (
              <div className="flex flex-col gap-5 max-w-xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-warning/20 text-warning flex items-center justify-center text-xl font-bold">
                    {profile.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-textPrimary">{profile.name}</p>
                    <p className="text-xs text-textMuted">{profile.role}</p>
                  </div>
                </div>

                <Field label="Full Name" value={profile.name} onChange={function (e) { updateProfile("name", e.target.value); }} />
                <Field label="Email Address" value={profile.email} onChange={function (e) { updateProfile("email", e.target.value); }} type="email" />
                <Field label="Phone Number" value={profile.phone} onChange={function (e) { updateProfile("phone", e.target.value); }} />

                <div>
                  <label className="block text-xs font-medium text-textSecondary mb-1.5">Role</label>
                  <input
                    value={profile.role}
                    disabled
                    className="w-full px-3 py-2.5 rounded-lg bg-surfaceLight border border-border text-sm text-textMuted cursor-not-allowed"
                  />
                </div>

                <button
                  onClick={function () { handleSave("Profile"); }}
                  disabled={profileLoading}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition w-fit disabled:opacity-50"
                >
                  {profileLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === "business" && (
              <div className="flex flex-col gap-5 max-w-xl">
                <Field label="Business Name" value={business.name} onChange={function (e) { updateBusiness("name", e.target.value); }} />
                <Field label="GSTIN" value={business.gstin} onChange={function (e) { updateBusiness("gstin", e.target.value); }} />
                <Field label="Business Address" value={business.address} onChange={function (e) { updateBusiness("address", e.target.value); }} />
                <Field label="Business Email" value={business.email} onChange={function (e) { updateBusiness("email", e.target.value); }} type="email" />
                <Field label="Business Phone" value={business.phone} onChange={function (e) { updateBusiness("phone", e.target.value); }} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Currency" value={business.currency} onChange={function (e) { updateBusiness("currency", e.target.value); }} />
                  <Field label="Timezone" value={business.timezone} onChange={function (e) { updateBusiness("timezone", e.target.value); }} />
                </div>

                <button
                  onClick={function () { handleSave("Business details"); }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition w-fit"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="flex flex-col gap-1 max-w-xl">
                {prefs.map(function (pref) {
                  return (
                    <div key={pref.id} className="flex items-center justify-between gap-4 py-4 border-b border-border last:border-0">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-textPrimary">{pref.label}</p>
                        <p className="text-xs text-textMuted mt-0.5">{pref.description}</p>
                      </div>
                      <ToggleSwitch enabled={pref.enabled} onChange={function () { togglePref(pref.id); }} />
                    </div>
                  );
                })}
                <button
                  onClick={function () { handleSave("Notification preferences"); }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition w-fit mt-5"
                >
                  <Save size={16} />
                  Save Preferences
                </button>
              </div>
            )}

            {activeTab === "security" && (
              <div className="flex flex-col gap-5 max-w-xl">
                <div className="relative">
                  <Field
                    label="Current Password"
                    value={passwords.current}
                    onChange={function (e) { setPasswords(Object.assign({}, passwords, { current: e.target.value })); }}
                    type={showPassword ? "text" : "password"}
                  />
                </div>
                <Field
                  label="New Password"
                  value={passwords.next}
                  onChange={function (e) { setPasswords(Object.assign({}, passwords, { next: e.target.value })); }}
                  type={showPassword ? "text" : "password"}
                />
                <Field
                  label="Confirm New Password"
                  value={passwords.confirm}
                  onChange={function (e) { setPasswords(Object.assign({}, passwords, { confirm: e.target.value })); }}
                  type={showPassword ? "text" : "password"}
                />

                <button
                  onClick={function () { setShowPassword(!showPassword); }}
                  className="flex items-center gap-2 text-xs text-textSecondary hover:text-textPrimary w-fit"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  {showPassword ? "Hide passwords" : "Show passwords"}
                </button>

                <button
                  onClick={handlePasswordChange}
                  disabled={passwordLoading}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition w-fit disabled:opacity-50"
                >
                  {passwordLoading ? <Loader2 size={16} className="animate-spin" /> : <Shield size={16} />}
                  Update Password
                </button>

                <div className="pt-5 border-t border-border">
                  <p className="text-sm font-semibold text-textPrimary mb-1">Two-Factor Authentication</p>
                  <p className="text-xs text-textMuted mb-3">Add an extra layer of security to your account.</p>
                  <button onClick={function () { toast("Two-factor authentication is coming soon", { icon: "🔒" }); }} className="px-4 py-2.5 rounded-lg bg-surfaceLight border border-border text-sm font-medium text-textSecondary hover:text-textPrimary transition w-fit">Enable 2FA</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Settings;

