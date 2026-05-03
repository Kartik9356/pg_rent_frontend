import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const PropertyTable = ({ properties = [], changeStatus }) => {
  // Safety check to prevent .map() crashes
  if (!Array.isArray(properties)) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#888" }}>
        Invalid property data received.
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
      >
        <thead>
          <tr style={{ background: "#f8f9fa", borderBottom: "2px solid #ddd" }}>
            <th style={{ padding: "15px", color: "#444" }}>Property Title</th>
            <th style={{ padding: "15px", color: "#444" }}>Type</th>
            <th style={{ padding: "15px", color: "#444" }}>Location</th>
            <th style={{ padding: "15px", color: "#444" }}>Status</th>
            <th style={{ padding: "15px", color: "#444" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((prop) => (
            <tr key={prop._id} style={{ borderBottom: "1px solid #eee" }}>
              <td
                style={{ padding: "15px", fontWeight: "bold", color: "#222" }}
              >
                {prop.title}
              </td>
              <td style={{ padding: "15px" }}>
                <span
                  style={{
                    background: "#eee",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "0.85rem",
                  }}
                >
                  {prop.propertyCategory}
                </span>
              </td>
              <td style={{ padding: "15px", color: "#555" }}>
                {prop.address?.city || "N/A"}
              </td>
              <td style={{ padding: "15px" }}>
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    background:
                      prop.status === "Approved"
                        ? "#d4edda"
                        : prop.status === "Pending"
                          ? "#fff3cd"
                          : "#f8d7da",
                    color:
                      prop.status === "Approved"
                        ? "#155724"
                        : prop.status === "Pending"
                          ? "#856404"
                          : "#721c24",
                  }}
                >
                  {prop.status}
                </span>
              </td>
              <td style={{ padding: "15px", display: "flex", gap: "10px" }}>
                {prop.status !== "Approved" && (
                  <button
                    onClick={() => changeStatus(prop._id, "Approved")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "6px 12px",
                      background: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    <CheckCircle size={16} /> Approve
                  </button>
                )}
                {prop.status !== "Rejected" && (
                  <button
                    onClick={() => changeStatus(prop._id, "Rejected")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "6px 12px",
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    <XCircle size={16} /> Reject
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyTable;
