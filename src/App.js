import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ProtectedUserRoute, ProtectedAdminRoute, ProtectedGuestRoute } from "./routes/ProtectedRoutes";

/* PUBLIC */
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

/* USER */
import UserLayout from "./layouts/UserLayout";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import VerifyNewsPage from "./pages/user/VerifyNewsPage";
import VerifyImagePage from "./pages/user/VerifyImagePage";
import PastReportsPage from "./pages/user/PastReportsPage";
import AnalyticsPage from "./pages/user/AnalyticsPage";
import PublicVerificationPage from "./pages/user/PublicVerificationPage";
import FakeNewsDetector from "./components/user/FakeNewsDetector";
import AnalysisHistory from "./components/user/AnalysisHistory";

/* GUEST */
import GuestLayout from "./layouts/GuestLayout";
import GuestDashboard from "./pages/Dashboard/GuestDashboard";
import TrendsPage from "./pages/guest/TrendsPage";

/* ADMIN */
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import Reports from "./pages/admin/Reports";
import BlockchainRecords from "./pages/admin/BlockchainRecords";
import SystemStats from "./pages/admin/SystemStats";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* ===================== USER ROUTES ===================== */}
          <Route
            element={
              <ProtectedUserRoute>
                <UserLayout />
              </ProtectedUserRoute>
            }
          >
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/verify-news" element={<VerifyNewsPage />} />
            <Route path="/verify-image" element={<VerifyImagePage />} />
            <Route path="/history" element={<PastReportsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/public-verification" element={<PublicVerificationPage />} />
            <Route path="/detect-fake-news" element={<FakeNewsDetector />} />
            <Route path="/analysis-history" element={<AnalysisHistory />} />
          </Route>

          {/* ===================== GUEST ROUTES ===================== */}
          <Route
            element={
              <ProtectedGuestRoute>
                <GuestLayout />
              </ProtectedGuestRoute>
            }
          >
            <Route path="/guest-dashboard" element={<GuestDashboard />} />
            <Route path="/guest-trends" element={<TrendsPage />} />
            <Route path="/guest-verify-news" element={<VerifyNewsPage />} />
          </Route>

          {/* ===================== ADMIN ROUTES ===================== */}
          <Route
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/blockchain-records" element={<BlockchainRecords />} />
            <Route path="/admin/system-stats" element={<SystemStats />} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
