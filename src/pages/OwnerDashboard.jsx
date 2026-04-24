import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function OwnerDashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch properties on load
  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
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

  // 🔥 NEW: Delete Property Function
  const handleDelete = async (propertyId) => {
    // 1. Ask for confirmation so they don't accidentally click it
    if (
      window.confirm(
        "Are you sure you want to permanently delete this listing?",
      )
    ) {
      try {
        // 2. Call your backend delete route
        await api.delete(`/properties/${propertyId}`);

        // 3. Update the UI instantly by filtering out the deleted property
        setProperties(properties.filter((prop) => prop._id !== propertyId));
        alert("Property deleted successfully.");
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete property.");
      }
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", fontSize: "1.2rem" }}>
        Loading your dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "4rem", color: "red", textAlign: "center" }}>
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "70vh",
      }}
    >
      {/* Dashboard Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          paddingBottom: "1rem",
          borderBottom: "2px solid #eaeaea",
        }}
      >
        <h2 style={{ margin: 0 }}>My Dashboard</h2>
        <button
          style={{
            padding: "10px 20px",
            background: "#d4af37",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/owner/add-property")}
        >
          + Add New Property
        </button>
      </div>

      {/* Conditional Rendering: Empty State vs Table */}
      {properties.length === 0 ? (
        // --- ENHANCED EMPTY STATE ---
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            background: "#fdfdfd",
            borderRadius: "12px",
            border: "1px dashed #ccc",
          }}
        >
          <h3 style={{ color: "#555" }}>
            You haven't listed any properties yet!
          </h3>
          <p style={{ color: "#777", marginBottom: "2rem" }}>
            Start reaching seekers by creating your first listing today.
          </p>
          <button
            style={{
              padding: "12px 24px",
              fontSize: "1.1rem",
              background: "#333",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/owner/add-property")}
          >
            Create Your First Listing
          </button>
        </div>
      ) : (
        // --- POPULATED TABLE STATE ---
        <div
          style={{
            overflowX: "auto",
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f8f9fa",
                  borderBottom: "2px solid #ddd",
                }}
              >
                <th style={{ padding: "15px" }}>Title</th>
                <th style={{ padding: "15px" }}>Category</th>
                <th style={{ padding: "15px" }}>Status</th>
                <th style={{ padding: "15px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((prop) => (
                <tr
                  key={prop._id}
                  style={{
                    borderBottom: "1px solid #eee",
                    transition: "background 0.2s",
                  }}
                >
                  <td style={{ padding: "15px", fontWeight: "500" }}>
                    {prop.title}
                  </td>
                  <td style={{ padding: "15px", color: "#666" }}>
                    {prop.propertyCategory}
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
                  <td style={{ padding: "15px", textAlign: "right" }}>
                    <button
                      onClick={() =>
                        navigate(`/owner/edit-property/${prop._id}`)
                      }
                      style={{
                        marginRight: "10px",
                        padding: "6px 12px",
                        background: "#e2e6ea",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "background 0.3s",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.background = "#d6d8db")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.background = "#e2e6ea")
                      }
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(prop._id)}
                      style={{
                        padding: "6px 12px",
                        background: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
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
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard;
