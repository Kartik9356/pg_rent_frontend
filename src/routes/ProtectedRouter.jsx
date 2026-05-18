import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // 1. If the user is not logged in at all, kick them to the home page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 2. If the route requires a specific role, and the user doesn't have it, kick them out
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // 3. If they pass the checks, render the component!
  return children;
};

// Exporting it as ProtectedRoute (make sure your AppRouter.jsx imports it with this name!)
export default ProtectedRoute;
