import React from "react";

// Passing a stats object so the Dashboard can feed it real numbers
const Cards = ({ stats }) => {
  return (
    <div
      className="cards"
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        marginBottom: "30px",
      }}
    >
      <div
        className="card"
        style={{
          flex: 1,
          minWidth: "200px",
          padding: "20px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          borderLeft: "5px solid #ffc107",
        }}
      >
        <h4 style={{ color: "#666", margin: "0 0 10px 0" }}>
          Pending Properties
        </h4>
        <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
          {stats?.pending || 0}
        </p>
      </div>

      <div
        className="card"
        style={{
          flex: 1,
          minWidth: "200px",
          padding: "20px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          borderLeft: "5px solid #28a745",
        }}
      >
        <h4 style={{ color: "#666", margin: "0 0 10px 0" }}>
          Approved Properties
        </h4>
        <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
          {stats?.approved || 0}
        </p>
      </div>

      <div
        className="card"
        style={{
          flex: 1,
          minWidth: "200px",
          padding: "20px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          borderLeft: "5px solid #dc3545",
        }}
      >
        <h4 style={{ color: "#666", margin: "0 0 10px 0" }}>
          Rejected Properties
        </h4>
        <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
          {stats?.rejected || 0}
        </p>
      </div>

      <div
        className="card"
        style={{
          flex: 1,
          minWidth: "200px",
          padding: "20px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          borderLeft: "5px solid #007bff",
        }}
      >
        <h4 style={{ color: "#666", margin: "0 0 10px 0" }}>Total Users</h4>
        <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
          {stats?.users || 0}
        </p>
      </div>

      <div
        className="card"
        style={{
          flex: 1,
          minWidth: "200px",
          padding: "20px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          borderLeft: "5px solid #6f42c1",
        }}
      >
        <h4 style={{ color: "#666", margin: "0 0 10px 0" }}>Fraud Reports</h4>
        <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
          {stats?.reports || 0}
        </p>
      </div>
    </div>
  );
};

export default Cards;
