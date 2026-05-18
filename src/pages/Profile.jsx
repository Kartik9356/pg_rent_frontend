import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css"; // import global styles

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="contact-page">
        <div className="cta" style={{ maxWidth: "500px" }}>
          <h2 className="cta-title">Access Denied</h2>
          <p style={{ color: "#777", margin: "20px 0" }}>
            Please log in to view your profile page.
          </p>
          <Link to="/" className="home-cta-btn" style={{ textDecoration: "none", display: "inline-flex" }}>
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page" style={{ paddingTop: "140px" }}>
      <div className="cta" style={{ maxWidth: "600px", padding: "40px" }}>
        <h1 className="cta-title" style={{ fontSize: "2.4rem", marginBottom: "5px" }}>
          My Profile
        </h1>
        <p style={{ color: "#b38f24", fontWeight: "700", textTransform: "uppercase", fontSize: "0.9rem", margin: "0 0 30px 0" }}>
          Seeker Account
        </p>

        {/* User Card */}
        <div style={{
          background: "rgba(62, 39, 35, 0.04)",
          border: "1px solid rgba(212, 175, 55, 0.2)",
          borderRadius: "12px",
          padding: "25px",
          textAlign: "left",
          marginBottom: "30px"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <span style={{ fontSize: "0.85rem", color: "#888", display: "block" }}>Full Name</span>
              <strong style={{ fontSize: "1.2rem", color: "#3e2723" }}>{user.name}</strong>
            </div>

            <div>
              <span style={{ fontSize: "0.85rem", color: "#888", display: "block" }}>Email Address</span>
              <strong style={{ fontSize: "1.1rem", color: "#3e2723" }}>{user.email}</strong>
            </div>

            {user.phone && (
              <div>
                <span style={{ fontSize: "0.85rem", color: "#888", display: "block" }}>Phone Number</span>
                <strong style={{ fontSize: "1.1rem", color: "#3e2723" }}>{user.phone}</strong>
              </div>
            )}

            <div>
              <span style={{ fontSize: "0.85rem", color: "#888", display: "block" }}>Account Status</span>
              <span style={{
                background: "linear-gradient(135deg, #d4af37 0%, #b38f24 100%)",
                color: "#1e110e",
                padding: "4px 10px",
                borderRadius: "30px",
                fontSize: "0.78rem",
                fontWeight: "700",
                display: "inline-block",
                marginTop: "4px"
              }}>
                Active Seeker
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/rooms" className="home-cta-btn" style={{ textDecoration: "none", display: "inline-flex" }}>
            Explore Rooms
          </Link>
          <button 
            onClick={() => navigate("/")} 
            className="home-cta-btn" 
            style={{ 
              background: "rgba(62, 39, 35, 0.08)", 
              color: "#3e2723",
              border: "1px solid rgba(62, 39, 35, 0.15)",
              boxShadow: "none",
              textDecoration: "none"
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
