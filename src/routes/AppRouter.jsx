import React from "react";
import { Routes, Route } from "react-router-dom";

// Import Pages
import Home from "../pages/Home";
import OwnerDashboard from "../pages/OwnerDashboard";
import Dashboard from "../pages/Dashboard";
import AddPropertyForm from "../components/AddPropertyForm";
import Rooms from "../pages/Rooms";
import PropertyDetail from "../pages/PropertyDetail";
import ProtectedRoute from "./ProtectedRouter";
import EditPropertyForm from "../components/EditPropertyForm";

// 🔥 1. IMPORT THE NEW PAGES
import Features from "../pages/Features";
import Contact from "../pages/Contact";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/rooms/:id" element={<PropertyDetail />} />
      // 🔥 2. ADD THE ROUTES FOR PUBLIC PAGES
      <Route path="/features" element={<Features />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/owner"
        element={
          <ProtectedRoute role="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
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
      <Route
        path="/owner/edit-property/:id"
        element={
          <ProtectedRoute role="owner">
            <EditPropertyForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/edit-property/:id"
        element={
          <ProtectedRoute role="admin">
            <EditPropertyForm />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
};

export default AppRouter;
