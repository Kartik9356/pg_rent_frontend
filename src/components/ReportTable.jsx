import React from "react";
import { AlertTriangle, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const ReportTable = ({ reports = [] }) => {
  if (!Array.isArray(reports)) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#888" }}>
        Invalid report data received.
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
            <th style={{ padding: "15px", color: "#444" }}>
              Reported Property
            </th>
            <th style={{ padding: "15px", color: "#444" }}>Reason</th>
            <th style={{ padding: "15px", color: "#444" }}>Reported By</th>
            <th style={{ padding: "15px", color: "#444" }}>Date</th>
            <th style={{ padding: "15px", color: "#444" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id} style={{ borderBottom: "1px solid #eee" }}>
              <td
                style={{ padding: "15px", fontWeight: "bold", color: "#222" }}
              >
                {report.propertyId?.title || "Unknown Property"}
              </td>
              <td style={{ padding: "15px" }}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "#dc3545",
                    fontWeight: "500",
                  }}
                >
                  <AlertTriangle size={16} /> {report.reason}
                </span>
                {report.description && (
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#666",
                      marginTop: "5px",
                    }}
                  >
                    {report.description}
                  </p>
                )}
              </td>
              <td style={{ padding: "15px", color: "#555" }}>
                {report.reportedBy?.name || "Anonymous"}
              </td>
              <td style={{ padding: "15px", color: "#777" }}>
                {new Date(report.createdAt).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td style={{ padding: "15px" }}>
                {/* Links directly to the single property page so the admin can investigate */}
                <Link
                  to={`/rooms/${report.propertyId?._id}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "6px 12px",
                    background: "#111",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "6px",
                    fontSize: "0.9rem",
                  }}
                >
                  <Eye size={16} /> Inspect
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
