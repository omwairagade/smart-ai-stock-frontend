import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Suppliers from "./pages/Suppliers";
import Inventory from "./pages/Inventory";
import PurchaseOrders from "./pages/PurchaseOrders";
import AIForecasting from "./pages/AIForecasting";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import CommunicationLog from "./pages/CommunicationLog";
import Evaluation from "./pages/Evaluation";
import SmartReorder from "./pages/SmartReorder";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
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
    </BrowserRouter>
  );
}

export default App;
