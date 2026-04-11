import React, { useState, useEffect } from "react";
import api from "../api/api"; // Your configured Axios instance
import { useNavigate } from "react-router-dom";

function OwnerDashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch properties as soon as the dashboard loads
  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        // Because of withCredentials: true, the backend already knows who is asking!
        const res = await api.get("/properties/my-properties");
        setProperties(res.data);
      } catch (err) {
        setError("Failed to load properties. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProperties();
  }, []);

  if (loading)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Loading your dashboard...
      </div>
    );
  if (error)
    return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h2>My Properties</h2>
        <button
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/owner/add-property")}
        >
          + Add New Property
        </button>
      </div>

      {properties.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            background: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <h3>You haven't listed any properties yet!</h3>
          <p>Click the button above to create your first listing.</p>
        </div>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr
              style={{ background: "#f4f4f4", borderBottom: "2px solid #ddd" }}
            >
              <th style={{ padding: "12px" }}>Title</th>
              <th style={{ padding: "12px" }}>Category</th>
              <th style={{ padding: "12px" }}>Status</th>
              <th style={{ padding: "12px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((prop) => (
              <tr key={prop._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px" }}>{prop.title}</td>
                <td style={{ padding: "12px" }}>{prop.propertyCategory}</td>
                <td style={{ padding: "12px" }}>
                  {/* Dynamic color coding for the status */}
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "0.85rem",
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
                <td style={{ padding: "12px" }}>
                  <button
                    style={{
                      marginRight: "10px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      padding: "5px 10px",
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OwnerDashboard;
