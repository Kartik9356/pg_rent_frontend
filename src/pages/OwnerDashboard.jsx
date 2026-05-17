import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

// 🔥 1. Add these missing imports!
import { fetchMyProperties } from "../api/properties";
import api from "../api/api";

function OwnerDashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const data = await fetchMyProperties();
        // Ensure it always sets an array
        const propertyArray = Array.isArray(data) ? data : data.data || [];
        setProperties(propertyArray);
      } catch (err) {
        setError("Failed to load properties. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  const handleDelete = async (propertyId) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this listing?",
      )
    ) {
      try {
        await api.delete(`/properties/${propertyId}`);
        setProperties(properties.filter((prop) => prop._id !== propertyId));
        alert("Property deleted successfully.");
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete property.");
      }
    }
  };

  if (loading) {
    return (
      <div className="loading" style={{ textAlign: "center", padding: "50px" }}>
        Loading your dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="error"
        style={{ textAlign: "center", padding: "50px", color: "red" }}
      >
        {error}
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">My Dashboard</h2>
        <button
          className="add-btn"
          onClick={() => navigate("/owner/add-property")}
        >
          + Add New Property
        </button>
      </div>

      {properties.length === 0 ? (
        <div className="empty-state">
          <h3 className="empty-title">
            You haven't listed any properties yet!
          </h3>
          <p className="empty-text">
            Start reaching seekers by creating your first listing today.
          </p>
          <button
            className="empty-btn"
            onClick={() => navigate("/owner/add-property")}
          >
            Create Your First Listing
          </button>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="dashboard-table">
            <thead className="table-head">
              <tr>
                <th className="th">Title</th>
                <th className="th">Category</th>
                <th className="th">Status</th>
                <th className="th td-actions">Actions</th>
              </tr>
            </thead>

            <tbody>
              {properties.map((prop) => (
                <tr key={prop._id} className="table-row">
                  <td className="td td-title">{prop.title}</td>
                  <td className="td td-category">{prop.propertyCategory}</td>

                  <td className="td">
                    <span
                      className={`status-badge ${
                        prop.status === "Approved"
                          ? "status-approved"
                          : prop.status === "Pending"
                            ? "status-pending"
                            : "status-rejected"
                      }`}
                    >
                      {prop.status}
                    </span>
                  </td>

                  <td className="td td-actions">
                    {/* 🔥 2. Added onClick to the Edit Button */}
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(`/owner/edit-property/${prop._id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(prop._id)}
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
