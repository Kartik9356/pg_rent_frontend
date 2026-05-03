import React from "react";
import PropertyTable from "../components/PropertyTable";
import UserTable from "../components/UserTable";
import ReportTable from "../components/ReportTable"; // <-- New!

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: "overview", label: "📊 Overview" },
    { id: "Pending", label: "⏳ Pending Properties" },
    { id: "Approved", label: "✅ Approved Properties" },
    { id: "Rejected", label: "❌ Rejected Properties" },
    { id: "users", label: "👥 Manage Users" },
    { id: "reports", label: "🚩 Fraud Reports" },
  ];

  return (
    <div
      style={{
        width: "260px",
        background: "#111",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
        position: "fixed",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: "30px", color: "#d4af37" }}
      >
        Admin Panel
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              padding: "15px",
              background: activeTab === item.id ? "#333" : "transparent",
              color: activeTab === item.id ? "#d4af37" : "white",
              border: "none",
              borderRadius: "8px",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: activeTab === item.id ? "bold" : "normal",
              transition: "all 0.2s",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
