import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api"; // Ensure this points to your configured Axios instance
import logo from "../assets/Logo.png";

function Navbar({ openLogin, openSignup, user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 1. Tell the backend to destroy the HTTP-only cookie
      await api.post("/users/logout");

      // 2. Clear the frontend local storage
      localStorage.removeItem("user");

      // 3. Update the React state so the Navbar instantly changes
      if (setUser) setUser(null);

      // 4. Redirect the user back to the home page
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      // Fallback: Clear local storage anyway just to be safe
      localStorage.removeItem("user");
      if (setUser) setUser(null);
      navigate("/");
    }
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Room Buddy Logo" />
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="/features">Features</a>
        </li>{" "}
        {/* Keep anchor for on-page scrolling */}
        <li>
          <Link to="/rooms">Rooms</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
          {/* <a href="#contact">Contact</a> */}
        </li>
      </ul>

      <div className="auth-buttons">
        {user ? (
          // --- UI FOR LOGGED IN USERS (OWNERS & ADMINS) ---
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <span style={{ fontWeight: "bold" }}>
              {/*Hi, {user.name.split(" ")[0]}! */}
              Hi, {user?.name?.split(" ")[0] || "User"}!
            </span>

            {/* Smart Routing based on User Role */}
            {user.role === "owner" && (
              <Link to="/owner" className="dash-btn">
                Dashboard
              </Link>
            )}
            {user.role === "admin" && (
              <Link to="/admin" className="dash-btn">
                Admin Panel
              </Link>
            )}

            {/* 🔥 NOTE: The "seeker" role block was removed because seekers don't log in anymore! */}

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          // --- UI FOR GUESTS ---
          <>
            {/* 🔥 NOTE: Text changed to explicitly target Owners and Admins */}
            <button className="login-btn" onClick={openLogin}>
              Owner Login
            </button>
            <button className="signup-btn" onClick={openSignup}>
              List Property
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
