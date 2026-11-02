import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Lock, Mail, Loader2, BarChart3, Eye, EyeOff, ArrowRight, Sparkles, ShieldCheck, Zap, Package, Users, TrendingUp } from "lucide-react";
import { useAuth } from "../context/AuthContext";

var DEMO_EMAIL = "tejas@enterprises.com";
var DEMO_PASSWORD = "admin123";

var pageStyle = {
  backgroundColor: "#050816",
  backgroundImage:
    "radial-gradient(60% 50% at 18% 30%, rgba(34,211,238,0.16), transparent 60%), radial-gradient(50% 50% at 88% 15%, rgba(139,92,246,0.22), transparent 60%), radial-gradient(60% 60% at 50% 105%, rgba(59,130,246,0.2), transparent 60%)",
};

var gridStyle = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
};

var loginCss =
  "@keyframes loginFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}" +
  "@keyframes loginTwinkle{0%,100%{opacity:0.15}50%{opacity:0.9}}" +
  "@keyframes loginSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}" +
  ".login-float{animation:loginFloat 6s ease-in-out infinite}" +
  ".login-float-slow{animation:loginFloat 8s ease-in-out infinite;animation-delay:-3s}" +
  ".login-twinkle{animation:loginTwinkle 4s ease-in-out infinite}" +
  "@media (prefers-reduced-motion: reduce){.login-float,.login-float-slow,.login-twinkle{animation:none}}";

var stars = [];
for (var si = 0; si < 28; si++) {
  stars.push({
    left: (si * 37 + 11) % 100,
    top: (si * 53 + 7) % 100,
    size: (si % 3) + 1,
    delay: (si % 7) * 0.6,
  });
}

var features = [
  { icon: Zap, label: "AI Demand Forecast" },
  { icon: Package, label: "Smart Inventory" },
  { icon: Users, label: "Supplier Insights" },
  { icon: TrendingUp, label: "Business Growth" },
];

var inputBase = "w-full bg-white/5 border rounded-xl py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ";
var inputOk = "border-white/10 focus:ring-cyan-400/40 focus:border-cyan-300/50";
var inputBad = "border-red-400/70 focus:ring-red-400/30";

function IsoBox(props) {
  var x = props.x;
  var y = props.y;
  var la = props.la;
  var lb = props.lb;
  var h = props.h;
  var B = [x, y];
  var R = [x + 2 * la, y + la];
  var L = [x - 2 * lb, y + lb];
  var F = [x + 2 * la - 2 * lb, y + la + lb];
  function pt(p, up) {
    return p[0] + "," + (p[1] - (up || 0));
  }
  var leftFace = [pt(L, 0), pt(F, 0), pt(F, h), pt(L, h)].join(" ");
  var rightFace = [pt(F, 0), pt(R, 0), pt(R, h), pt(F, h)].join(" ");
  var topFace = [pt(B, h), pt(R, h), pt(F, h), pt(L, h)].join(" ");
  return (
    <g stroke="rgba(255,255,255,0.14)" strokeWidth="0.7" strokeLinejoin="round">
      <polygon points={leftFace} fill={props.left} />
      <polygon points={rightFace} fill={props.right} />
      <polygon points={topFace} fill={props.top} />
    </g>
  );
}

function Tree(props) {
  return (
    <g>
      <rect x={props.x - 1} y={props.y - 4} width="2" height="8" fill="#5b4630" />
      <circle cx={props.x} cy={props.y - 9} r="8" fill="#10b981" opacity="0.85" />
      <circle cx={props.x - 3} cy={props.y - 11} r="5" fill="#34d399" opacity="0.9" />
    </g>
  );
}

function WarehouseScene() {
  return (
    <svg viewBox="0 0 640 400" className="w-full h-auto" role="img" aria-label="Illustration of a smart warehouse">
      <defs>
        <radialGradient id="lgGlobe" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id="lgFloor" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lgDoor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      <ellipse cx="320" cy="388" rx="310" ry="26" fill="url(#lgFloor)" />

      <g opacity="0.9">
        <circle cx="500" cy="72" r="58" fill="url(#lgGlobe)" stroke="#22d3ee" strokeOpacity="0.45" />
        <ellipse cx="500" cy="72" rx="58" ry="20" fill="none" stroke="#67e8f9" strokeOpacity="0.35" />
        <ellipse cx="500" cy="72" rx="22" ry="58" fill="none" stroke="#67e8f9" strokeOpacity="0.35" />
        <ellipse cx="500" cy="72" rx="42" ry="58" fill="none" stroke="#67e8f9" strokeOpacity="0.25" />
        <line x1="442" y1="72" x2="558" y2="72" stroke="#67e8f9" strokeOpacity="0.3" />
        <line x1="456" y1="42" x2="544" y2="42" stroke="#67e8f9" strokeOpacity="0.2" />
        <line x1="456" y1="102" x2="544" y2="102" stroke="#67e8f9" strokeOpacity="0.2" />
        <ellipse cx="500" cy="72" rx="92" ry="22" fill="none" stroke="#a78bfa" strokeOpacity="0.5" strokeDasharray="4 6" transform="rotate(-18 500 72)" />
        <circle cx="470" cy="55" r="2.5" fill="#67e8f9" />
        <circle cx="520" cy="88" r="2.5" fill="#a78bfa" />
        <circle cx="498" cy="40" r="2" fill="#fff" />
      </g>

      <g style={{ filter: "drop-shadow(0 0 10px rgba(34,211,238,0.55))" }}>
        <polygon points="50,235 320,370 320,388 50,253" fill="#161b48" />
        <polygon points="320,370 590,235 590,253 320,388" fill="#0e1237" />
        <polygon points="320,100 590,235 320,370 50,235" fill="#0a1030" stroke="#22d3ee" strokeWidth="2" />
        <polyline points="50,253 320,388 590,253" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
      </g>
      <polygon points="320,113 563,235 320,357 77,235" fill="none" stroke="#8b5cf6" strokeOpacity="0.6" strokeDasharray="6 6" />
      <polygon points="320,140 509,235 320,330 131,235" fill="rgba(59,130,246,0.06)" stroke="#38bdf8" strokeOpacity="0.2" />

      <Tree x={92} y={240} />
      <Tree x={118} y={252} />
      <Tree x={548} y={232} />
      <Tree x={522} y={222} />

      <IsoBox x={320} y={170} la={70} lb={50} h={80} top="#5057b8" left="#2c3278" right="#1d2257" />
      <polygon points="236.8,228.4 278.8,249.4 278.8,204.4 236.8,183.4" fill="url(#lgDoor)" opacity="0.95" />
      <polygon points="301.2,260.6 343.2,281.6 343.2,236.6 301.2,215.6" fill="url(#lgDoor)" opacity="0.95" />
      <polygon points="241,178.5 339,227.5 339,209.5 241,160.5" fill="#0b1030" stroke="#22d3ee" strokeOpacity="0.7" strokeWidth="0.8" />
      <text transform="matrix(1 0.5 0 1 250 176)" fontSize="11" fontWeight="700" fill="#ffffff" fontFamily="Inter, sans-serif">StockSync AI</text>
      <polygon points="380,250 440,220 440,200 380,230" fill="#22d3ee" opacity="0.4" />
      <polygon points="380,272 440,242 440,228 380,258" fill="#22d3ee" opacity="0.3" />
      <polyline points="320,90 460,160 360,210 220,140 320,90" fill="none" stroke="#22d3ee" strokeOpacity="0.6" strokeWidth="1.2" />

      <IsoBox x={160} y={255} la={22} lb={9} h={14} top="#f8fafc" left="#e2e8f0" right="#94a3b8" />
      <IsoBox x={204} y={277} la={9} lb={9} h={10} top="#e2e8f0" left="#94a3b8" right="#64748b" />
      <ellipse cx="153" cy="269.5" rx="3.5" ry="3" fill="#0f172a" />
      <ellipse cx="175" cy="280.5" rx="3.5" ry="3" fill="#0f172a" />
      <ellipse cx="195" cy="290.5" rx="3.5" ry="3" fill="#0f172a" />
      <circle cx="222" cy="287" r="3" fill="#fde68a" />

      <IsoBox x={520} y={244} la={9} lb={22} h={14} top="#f8fafc" left="#cbd5e1" right="#94a3b8" />
      <IsoBox x={476} y={266} la={9} lb={9} h={10} top="#e2e8f0" left="#94a3b8" right="#64748b" />
      <ellipse cx="505" cy="269.5" rx="3.5" ry="3" fill="#0f172a" />
      <ellipse cx="527" cy="258.5" rx="3.5" ry="3" fill="#0f172a" />
      <ellipse cx="485" cy="279.5" rx="3.5" ry="3" fill="#0f172a" />
      <circle cx="458" cy="276" r="3" fill="#fde68a" />

      <IsoBox x={250} y={300} la={6} lb={6} h={8} top="#e0b068" left="#b9803a" right="#8f5f2a" />
      <IsoBox x={268} y={309} la={6} lb={6} h={8} top="#e0b068" left="#b9803a" right="#8f5f2a" />
      <IsoBox x={420} y={295} la={6} lb={6} h={8} top="#e0b068" left="#b9803a" right="#8f5f2a" />
      <IsoBox x={406} y={304} la={5} lb={5} h={6} top="#e0b068" left="#b9803a" right="#8f5f2a" />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  function fillDemo() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setErrors({});
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
    <div className="min-h-screen relative overflow-hidden flex flex-col text-white" style={pageStyle}>
      <style>{loginCss}</style>
      <div className="absolute inset-0" style={gridStyle}></div>
      {stars.map(function (s, i) {
        return (
          <span
            key={i}
            className="login-twinkle absolute rounded-full bg-white"
            style={{ left: s.left + "%", top: s.top + "%", width: s.size + "px", height: s.size + "px", animationDelay: s.delay + "s" }}
          ></span>
        );
      })}

      <header className="relative z-10 flex items-center justify-between px-6 lg:px-12 pt-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">StockSync AI</span>
        </div>
        <span className="hidden sm:flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Tejas Enterprises
        </span>
      </header>

      <main className="relative z-10 flex-1 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center px-6 lg:px-12 py-8">
        <section className="hidden lg:block">
          <h2 className="text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight">
            The Smart Brain for Your
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Stock and Suppliers
            </span>
          </h2>
          <p className="text-sm xl:text-base text-slate-300 max-w-md mt-4">
            Track inventory, predict demand, score suppliers and reorder at the right time, all from one powerful dashboard.
          </p>

          <div className="flex items-stretch gap-5 mt-6">
            {features.map(function (f, i) {
              var Icon = f.icon;
              return (
                <div key={f.label} className={"flex flex-col gap-1.5 " + (i > 0 ? "pl-5 border-l border-white/10" : "")}>
                  <Icon className="w-5 h-5 text-cyan-300" />
                  <span className="text-[11px] leading-tight text-slate-300 max-w-[70px]">{f.label}</span>
                </div>
              );
            })}
          </div>

          <div className="relative mt-4 max-w-[660px]">
            <WarehouseScene />

            <div
              className="login-float absolute left-0 top-[38%] w-40 rounded-xl border border-cyan-300/25 bg-slate-900/60 backdrop-blur-md p-3 shadow-xl shadow-cyan-500/10"
              style={{ transform: "perspective(600px) rotateY(14deg)" }}
            >
              <p className="text-[11px] font-semibold text-slate-200 mb-1.5">Inventory Status</p>
              <div className="flex items-center gap-2">
                <div className="relative w-12 h-12">
                  <svg viewBox="0 0 48 48" className="w-12 h-12 -rotate-90">
                    <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="5" />
                    <circle cx="24" cy="24" r="18" fill="none" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" strokeDasharray="104 113.1" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold">92%</span>
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-emerald-300 font-semibold">+12%</p>
                  <svg viewBox="0 0 60 28" className="w-full h-6">
                    <polyline points="0,24 12,20 24,22 36,12 48,14 60,4" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            <div
              className="login-float-slow absolute right-0 top-[30%] w-40 rounded-xl border border-violet-300/25 bg-slate-900/60 backdrop-blur-md p-3 shadow-xl shadow-violet-500/10"
              style={{ transform: "perspective(600px) rotateY(-14deg)" }}
            >
              <p className="text-[11px] font-semibold text-slate-200 mb-1.5">On-Time Delivery</p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-extrabold text-cyan-300">98%</span>
                <div className="flex items-end gap-1 h-8">
                  {[40, 55, 48, 70, 62, 85, 100].map(function (h, i) {
                    return <div key={i} className="w-1.5 rounded-sm bg-gradient-to-t from-blue-500 to-cyan-300" style={{ height: h + "%" }}></div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-lg mx-auto lg:mx-0 lg:justify-self-end">
          <div className="p-px rounded-3xl bg-gradient-to-br from-cyan-300/60 via-white/10 to-violet-400/60 shadow-[0_0_60px_rgba(34,211,238,0.18)]">
            <div className="rounded-3xl bg-slate-950/70 backdrop-blur-xl p-7 sm:p-8">
              <span className="inline-flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-300/25 mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                Secure workspace sign-in
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse"></span>
              </span>
              <h2 className="text-4xl font-extrabold mb-2">Welcome back</h2>
              <p className="text-sm text-slate-400 mb-6">Sign in to your Tejas Enterprises workspace</p>

              <form onSubmit={handleLogin} className="space-y-4" noValidate>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Email</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@business.com"
                      className={inputBase + "pl-12 pr-4 " + (errors.email ? inputBad : inputOk)}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Password</label>
                  <div className="relative">
                    <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                      className={inputBase + "pl-12 pr-12 " + (errors.password ? inputBad : inputOk)}
                    />
                    <button
                      type="button"
                      onClick={function () { setShowPassword(!showPassword); }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-white font-semibold text-sm py-3 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">Sign In <ArrowRight className="w-4 h-4" /></span>
                  )}
                </button>
              </form>

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-cyan-300/20 bg-cyan-400/5 p-3.5">
                <div className="w-9 h-9 shrink-0 rounded-lg bg-cyan-400/15 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">Demo mode</p>
                  <p className="text-xs text-slate-400">Fill in the demo account, then press Sign In.</p>
                </div>
                <button
                  type="button"
                  onClick={fillDemo}
                  className="shrink-0 px-4 py-2 rounded-full border border-cyan-300/40 text-sm font-medium text-cyan-200 hover:bg-cyan-400/15 transition"
                >
                  Use demo login
                </button>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-5">Need an account? Contact your administrator.</p>
        </section>
      </main>

      <footer className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 px-6 lg:px-12 pb-6 text-xs text-slate-400">
        <span>Smarter Decisions. Stronger Supply Chain.</span>
        <span>© 2025 StockSync AI · MSME Supply Chain Platform</span>
      </footer>
    </div>
  );
}
