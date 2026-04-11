import React from "react";
import { Routes, Route } from "react-router-dom";

// Import Pages
import Home from "../pages/Home";
import OwnerDashboard from "../pages/OwnerDashboard";
import Dashboard from "../pages/Dashboard";
import AddPropertyForm from "../components/AddPropertyForm";

// Import Protected Route
import ProtectedRoute from "./ProtectedRouter";

// Notice we removed the <Router> wrapper here!
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/owner/*"
        element={
          <ProtectedRoute role="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role="admin">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/add-property"
        element={
          <ProtectedRoute role="owner">
            <AddPropertyForm />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
};

export default AppRouter;
