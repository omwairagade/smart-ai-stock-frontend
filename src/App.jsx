import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const Dashboard = lazy(function () { return import("./pages/Dashboard"); });
const Suppliers = lazy(function () { return import("./pages/Suppliers"); });
const Inventory = lazy(function () { return import("./pages/Inventory"); });
const PurchaseOrders = lazy(function () { return import("./pages/PurchaseOrders"); });
const AIForecasting = lazy(function () { return import("./pages/AIForecasting"); });
const Notifications = lazy(function () { return import("./pages/Notifications"); });
const Settings = lazy(function () { return import("./pages/Settings"); });
const CommunicationLog = lazy(function () { return import("./pages/CommunicationLog"); });
const Evaluation = lazy(function () { return import("./pages/Evaluation"); });
const SmartReorder = lazy(function () { return import("./pages/SmartReorder"); });
const Reports = lazy(function () { return import("./pages/Reports"); });

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={28} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
          <Route path="/purchases" element={<ProtectedRoute><PurchaseOrders /></ProtectedRoute>} />
          <Route path="/forecasting" element={<ProtectedRoute><AIForecasting /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/communication-log" element={<ProtectedRoute><CommunicationLog /></ProtectedRoute>} />
          <Route path="/evaluation" element={<ProtectedRoute><Evaluation /></ProtectedRoute>} />
          <Route path="/reorder" element={<ProtectedRoute><SmartReorder /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
