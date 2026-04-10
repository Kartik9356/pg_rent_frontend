import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard"; // Admin
import OwnerDashboard from "../pages/OwnerDashboard";

import ProtectedRoute from "./ProtectedRouter";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Page */}
        <Route path="/" element={<Home />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Owner Dashboard */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute role="owner">
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;