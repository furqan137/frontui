// src/guards/ProtectedUserRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedUserRoute({ children }) {
  const { userProfile, loading } = useAuth();

  if (loading) return null; // prevent flash

  if (!userProfile) return <Navigate to="/login" />;
  if (userProfile.role !== "user") return <Navigate to="/" />;

  return children;
}
