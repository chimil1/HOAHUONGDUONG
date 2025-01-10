import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("tokenAdmin");
  const userRole = localStorage.getItem("roleAdmin");

  if (!token || userRole === undefined || userRole === null || userRole === 1) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}

export default ProtectedRoute;