import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages
import Home from "../pages/Home";
import OwnerDashboard from "../pages/OwnerDashboard";
import Dashboard from "../pages/Dashboard"; // Assuming this is the Admin dashboard

// Import the Protected Route Component
// Note: You might want to rename ProtectedRouter.jsx to ProtectedRoute.jsx for standard naming conventions
import ProtectedRoute from "./ProtectedRouter";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* 1. PUBLIC ROUTES (Anyone can view) */}
        <Route path="/" element={<Home />} />

        {/* 2. OWNER ROUTES (Only verified owners) */}
        <Route
          path="/owner/*"
          element={
            <ProtectedRoute role="owner">
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        {/* 3. ADMIN ROUTES (Only verified admins) */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Optional: Catch-all route for 404 Not Found */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
