import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Lock, Mail, Loader2, BarChart3 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    var newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      newErrors.email = "Enter a valid email address";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setLoading(true);
    login(email, password)
      .then(function () {
        setLoading(false);
        toast.success("Logged in successfully");
        navigate("/");
      })
      .catch(function (error) {
        setLoading(false);
        toast.error((error && error.message) || "Login failed");
      });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden transition-colors">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
            <BarChart3 className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-textPrimary">StockSync AI</h1>
          <p className="text-sm text-textMuted">Smart Stock & Supplier Coordination</p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8 shadow-xl">
          <h2 className="text-lg font-semibold mb-1 text-textPrimary">Welcome back</h2>
          <p className="text-sm text-textMuted mb-6">Sign in to your workspace</p>

          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            <div>
              <label className="text-xs text-textSecondary mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-textMuted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  className={"w-full bg-surfaceLight border rounded-lg pl-10 pr-4 py-2.5 text-sm text-textPrimary focus:outline-none focus:ring-1 transition-all " + (errors.email ? "border-danger focus:ring-danger/50 focus:border-danger/50" : "border-border focus:ring-primary/50 focus:border-primary/50")}
                />
              </div>
              {errors.email && <p className="text-xs text-danger mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-xs text-textSecondary mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-textMuted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className={"w-full bg-surfaceLight border rounded-lg pl-10 pr-4 py-2.5 text-sm text-textPrimary focus:outline-none focus:ring-1 transition-all " + (errors.password ? "border-danger focus:ring-danger/50 focus:border-danger/50" : "border-border focus:ring-primary/50 focus:border-primary/50")}
                />
              </div>
              {errors.password && <p className="text-xs text-danger mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer">
                <input type="checkbox" className="accent-primary" />
                Remember me
              </label>
              <span className="text-primary cursor-pointer hover:underline">Forgot password?</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-semibold text-sm py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-textMuted mt-6">
            Don't have an account? <span className="text-primary cursor-pointer hover:underline">Contact admin</span>
          </p>
        </div>

        <p className="text-center text-xs text-textMuted mt-6">
          © 2025 StockSync AI · MSME Supply Chain Platform
        </p>
      </div>
    </div>
  );
}
