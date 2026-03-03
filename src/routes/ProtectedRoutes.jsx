import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/* ====================== USER ======================= */
export const ProtectedUserRoute = ({ children }) => {
  const { currentUser, role } = useAuth();

  if (!currentUser) return <Navigate to="/login" replace />;
  if (role !== "user") return <Navigate to="/" replace />;

  return children;
};

/* ====================== ADMIN ======================= */
export const ProtectedAdminRoute = ({ children }) => {
  const { currentUser, role } = useAuth();

  if (!currentUser) return <Navigate to="/login" replace />;
  if (role !== "admin") return <Navigate to="/" replace />;

  return children;
};

/* ====================== GUEST ======================= */
/* 👉 No guest role, only allow NOT LOGGED IN users */
export const ProtectedGuestRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return null;

  if (currentUser) return <Navigate to="/" replace />;

  return children;
};
