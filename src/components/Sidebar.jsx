import React from "react";
import "../sidebar.css";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: "overview", label: "📊 Dashboard Overview" },
    { id: "Pending", label: "⏳ Pending Properties" },
    { id: "Approved", label: "✅ Approved Properties" },
    { id: "Rejected", label: "❌ Rejected Properties" },
    { id: "users", label: "👥 Manage Users" },
    { id: "reports", label: "🚩 Fraud Reports" },
    { id: "visitors", label: "🧍 Visitors" },
  ];

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <div className="sidebar-links">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={activeTab === item.id ? "active" : ""}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
