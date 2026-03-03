// src/guards/ProtectedAdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedAdminRoute({ children }) {
  const { userProfile, loading } = useAuth();

  if (loading) return null;

  if (!userProfile) return <Navigate to="/login" />;
  if (userProfile.role !== "admin") return <Navigate to="/" />;

  return children;
}
