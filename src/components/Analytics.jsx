import React from "react";
import "./style.css";

const Analytics = () => (
  <div className="analytics-container">

    {/* Stats Grid */}
    <div className="stats-grid">
      {[
        { label: "Properties", val: "3" },
        { label: "Bookings", val: "5" },
        { label: "Users", val: "10" },
        { label: "Revenue", val: "₹30,000" }
      ].map((item, idx) => (
        <div key={idx} className="stat-card">
          <p className="stat-label">{item.label}</p>
          <h3 className="stat-value">{item.val}</h3>
        </div>
      ))}
    </div>

    {/* Chart */}
    <div className="chart-container">
      <h3 className="chart-title">Monthly Revenue</h3>

      <div className="chart-box">
        {[5000, 8000, 6000, 9000, 12000].map((h, i) => (
          <div
            key={i}
            className="chart-bar"
            style={{ height: `${(h / 12000) * 100}%` }}
          >
            <span className="chart-label">
              {["Jan", "Feb", "Mar", "Apr", "May"][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Analytics;