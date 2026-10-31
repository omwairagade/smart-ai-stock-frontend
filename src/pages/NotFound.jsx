import { useNavigate } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden transition-colors">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center mx-auto mb-6 border border-danger/20">
          <AlertTriangle className="w-8 h-8 text-danger" />
        </div>
        <h1 className="text-5xl font-bold text-textPrimary mb-2">404</h1>
        <h2 className="text-lg font-semibold text-textPrimary mb-2">Page not found</h2>
        <p className="text-sm text-textMuted mb-8">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <button
          onClick={function () { navigate("/"); }}
          className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Home size={16} />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
