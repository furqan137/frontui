// src/routes/ProtectedGuestRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedGuestRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) return null;

  // If user is logged in → block guest pages
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  // Otherwise allow the guest route
  return children;
}
