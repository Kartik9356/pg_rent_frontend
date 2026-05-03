import React from "react";
import "../sidebar.css"; // Ensure your CSS handles the .active class

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <h2 style={{ color: "white", textAlign: "center", marginBottom: "30px" }}>
        Admin Panel
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* We use buttons instead of NavLinks so we can swap components without reloading the page */}
        <button
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
          style={{
            padding: "15px",
            background: activeTab === "overview" ? "#555" : "transparent",
            color: "white",
            border: "none",
            textAlign: "left",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          📊 Dashboard Overview
        </button>

        <button
          className={activeTab === "Pending" ? "active" : ""}
          onClick={() => setActiveTab("Pending")}
          style={{
            padding: "15px",
            background: activeTab === "Pending" ? "#555" : "transparent",
            color: "white",
            border: "none",
            textAlign: "left",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ⏳ Pending Properties
        </button>

        <button
          className={activeTab === "Approved" ? "active" : ""}
          onClick={() => setActiveTab("Approved")}
          style={{
            padding: "15px",
            background: activeTab === "Approved" ? "#555" : "transparent",
            color: "white",
            border: "none",
            textAlign: "left",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ✅ Approved Properties
        </button>

        <button
          className={activeTab === "Rejected" ? "active" : ""}
          onClick={() => setActiveTab("Rejected")}
          style={{
            padding: "15px",
            background: activeTab === "Rejected" ? "#555" : "transparent",
            color: "white",
            border: "none",
            textAlign: "left",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ❌ Rejected Properties
        </button>

        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
          style={{
            padding: "15px",
            background: activeTab === "users" ? "#555" : "transparent",
            color: "white",
            border: "none",
            textAlign: "left",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          👥 Manage Users
        </button>

        <button
          className={activeTab === "reports" ? "active" : ""}
          onClick={() => setActiveTab("reports")}
          style={{
            padding: "15px",
            background: activeTab === "reports" ? "#555" : "transparent",
            color: "white",
            border: "none",
            textAlign: "left",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          🚩 Fraud Reports
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
