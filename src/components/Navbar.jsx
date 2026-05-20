import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api"; // Ensure this points to your configured Axios instance
import logo from "../assets/Logo.png";

function Navbar({ openLogin, openSignup, user, setUser }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const renderAuthButtons = (isMobile) => (
    <div className={isMobile ? "auth-buttons-mobile" : "auth-buttons"}>
      {user ? (
        <div style={{ display: "flex", gap: "15px", alignItems: "center", flexDirection: isMobile ? "column" : "row", width: isMobile ? "100%" : "auto" }}>
          <span style={{ fontWeight: "bold", color: "white" }}>
            Hi, {user?.name?.split(" ")[0] || "User"}!
          </span>

          {/* Smart Routing based on User Role */}
          {user.role === "owner" && (
            <Link to="/owner" className="dash-btn" onClick={() => setMenuOpen(false)} style={{ width: isMobile ? "100%" : "auto", textAlign: "center" }}>
              Dashboard
            </Link>
          )}
          {user.role === "admin" && (
            <Link to="/admin" className="dash-btn" onClick={() => setMenuOpen(false)} style={{ width: isMobile ? "100%" : "auto", textAlign: "center" }}>
              Admin Panel
            </Link>
          )}
          {user.role === "seeker" && (
            <Link to="/profile" className="dash-btn" onClick={() => setMenuOpen(false)} style={{ width: isMobile ? "100%" : "auto", textAlign: "center" }}>
              My Profile
            </Link>
          )}

          <button className="logout-btn" onClick={() => { setMenuOpen(false); handleLogout(); }} style={{ width: isMobile ? "100%" : "auto" }}>
            Logout
          </button>
        </div>
      ) : (
        <>
          <button className="login-btn" onClick={() => { setMenuOpen(false); openLogin(); }}>
            Owner Login
          </button>
          <button className="signup-btn" onClick={() => { setMenuOpen(false); openSignup(); }}>
            List Property
          </button>
        </>
      )}
    </div>
  );

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="logo">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Room Buddy Logo" />
        </Link>
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/features" onClick={() => setMenuOpen(false)}>Features</Link>
        </li>{" "}
        {/* Keep anchor for on-page scrolling */}
        <li>
          <Link to="/rooms" onClick={() => setMenuOpen(false)}>Rooms</Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </li>
        {renderAuthButtons(true)}
      </ul>

      {renderAuthButtons(false)}
    </nav>
  );
}

export default Navbar;
