import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [roomType, setRoomType] = useState("All");

  const handleSearch = (e) => {
    e.preventDefault();

    // Build the query string based on what they filled out
    const params = new URLSearchParams();
    if (location.trim()) params.append("city", location.trim());
    if (budget) params.append("maxPrice", budget);
    if (roomType !== "All") params.append("category", roomType);

    // Push them to the Rooms page with the filters applied!
    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <section
      className="hero"
      id="home"
      style={{
        padding: "80px 20px",
        textAlign: "center",
        background:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267') center/cover",
        color: "white",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="hero-content"
        style={{ maxWidth: "800px", width: "100%" }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            marginBottom: "15px",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          Find Your Perfect Room
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "40px",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          PG | Hostel | Rental Homes for Comfortable Living
        </p>

        <form
          onSubmit={handleSearch}
          className="search-box"
          style={{
            display: "flex",
            gap: "10px",
            background: "white",
            padding: "10px",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            flexWrap: "wrap",
            color: "#000",

          }}
        >
          <input
            type="text"
            placeholder="Enter City (e.g. Pune)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              flex: 1,
              minWidth: "150px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem",
              outline: "none",
              cursor: "pointer",
              color: "#000",
              background: "#fff",
            }}
          />

          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            style={{
              flex: 1,
              minWidth: "150px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem",
              outline: "none",
              cursor: "pointer",
              color: "#000",
              background: "#fff",
            }}
          >
            <option value="">Max Budget</option>
            <option value="5000">Up to ₹5,000</option>
            <option value="10000">Up to ₹10,000</option>
            <option value="20000">Up to ₹20,000</option>
            <option value="50000">Up to ₹50,000</option>
          </select>

          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            style={{
              flex: 1,
              minWidth: "150px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="All">Room Type</option>
            <option value="Flat">Flat / Apartment</option>
            <option value="PG">PG / Hostel</option>
          </select>

          <button
            type="submit"
            className="hero-search-btn"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

export default Hero;
