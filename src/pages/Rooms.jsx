import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchAllProperties } from "../api/properties"; // 🔥 Imported your clean service file!
import {
  MapPin,
  IndianRupee,
  Search,
  Filter,
  Home,
  Building2,
} from "lucide-react";

function Rooms() {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchCity, setSearchCity] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");

  // This function fetches data, optionally using the filters
  const fetchProperties = async () => {
    try {
      setLoading(true);

      // Build the query parameters object
      const params = {};
      if (searchCity.trim()) params.city = searchCity.trim();
      if (category !== "All") params.category = category;
      if (maxPrice) params.maxPrice = Number(maxPrice);

      // 🔥 Clean API call using your new properties.js file
      const data = await fetchAllProperties(params);

      setProperties(data.data || data);
    } catch (err) {
      console.error("Failed to fetch properties", err);
    } finally {
      setLoading(false);
    }
  };

  // Run fetch on initial load
  useEffect(() => {
    // Check if we redirected from the homepage with a city search
    const searchParams = new URLSearchParams(location.search);
    const urlCity = searchParams.get("city");
    if (urlCity) setSearchCity(urlCity);

    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // Handle Filter Submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  // Handle Clear Filters
  const clearFilters = async () => {
    setSearchCity("");
    setCategory("All");
    setMaxPrice("");

    // 🔥 Use the clean API call here as well
    try {
      setLoading(true);
      const data = await fetchAllProperties({}); // Pass empty params to get everything
      setProperties(data.data || data);
    } catch (err) {
      console.error("Failed to clear filters", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "30px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "80vh",
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: "25px" }}>
        <h1 style={{ margin: "0 0 10px 0", color: "#333", fontSize: "2.2rem" }}>
          Explore Properties
        </h1>
        <p style={{ color: "#666", margin: 0, fontSize: "1.1rem" }}>
          Find the perfect flat or PG that fits your lifestyle.
        </p>
      </div>

      {/* THE PREMIUM SEARCH & FILTER BAR */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          marginBottom: "35px",
          border: "1px solid #eee",
          position: "sticky",
          top: "20px",
          zIndex: 100,
        }}
      >
        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            alignItems: "flex-end",
          }}
        >
          {/* Location Search */}
          <div
            style={{
              flex: "1 1 250px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: "bold",
                color: "#555",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Location
            </label>
            <div style={{ position: "relative" }}>
              <MapPin
                size={18}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "12px",
                  color: "#999",
                }}
              />
              <input
                type="text"
                placeholder="Search by City (e.g., Pune)"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div
            style={{
              flex: "1 1 150px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: "bold",
                color: "#555",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Property Type
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "1rem",
                boxSizing: "border-box",
                outline: "none",
                cursor: "pointer",
                background: "white",
              }}
            >
              <option value="All">All Types</option>
              <option value="Flat">Flats / Apartments</option>
              <option value="PG">PGs / Hostels</option>
            </select>
          </div>

          {/* Max Price Filter */}
          <div
            style={{
              flex: "1 1 150px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: "bold",
                color: "#555",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Max Budget (₹)
            </label>
            <div style={{ position: "relative" }}>
              <IndianRupee
                size={16}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "13px",
                  color: "#999",
                }}
              />
              <input
                type="number"
                placeholder="Any"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 35px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "10px", flex: "1 1 200px" }}>
            <button
              type="submit"
              style={{
                flex: 2,
                padding: "12px",
                background: "#d4af37",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                transition: "background 0.3s",
              }}
            >
              <Search size={18} /> Search
            </button>
            <button
              type="button"
              onClick={clearFilters}
              style={{
                flex: 1,
                padding: "12px",
                background: "#f8f9fa",
                color: "#555",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "0.95rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* LISTING GRID */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "80px", color: "#666" }}>
          <h2>Searching properties...</h2>
        </div>
      ) : properties.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px",
            background: "#fdfdfd",
            borderRadius: "12px",
            border: "1px dashed #ccc",
          }}
        >
          <Filter size={40} color="#ccc" style={{ marginBottom: "15px" }} />
          <h3 style={{ color: "#555", margin: "0 0 10px 0" }}>
            No properties match your search.
          </h3>
          <p style={{ color: "#888", margin: 0 }}>
            Try clearing your filters or searching for a different city.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "30px",
          }}
        >
          {properties.map((prop) => {
            const displayPrice =
              prop.propertyCategory === "Flat"
                ? prop.flatDetails?.rentAmount
                : prop.roomConfigurations?.[0]?.pricePerBed;

            return (
              <div
                key={prop._id}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer",
                  border: "1px solid #f4f4f4",
                }}
              >
                {/* Image */}
                <div
                  style={{
                    height: "220px",
                    background: "#eee",
                    position: "relative",
                  }}
                >
                  <img
                    src={
                      prop.images && prop.images.length > 0
                        ? prop.images[0]
                        : "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={prop.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "15px",
                      left: "15px",
                      background:
                        prop.propertyCategory === "Flat" ? "#333" : "#d4af37",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    {prop.propertyCategory === "Flat" ? (
                      <Home size={14} />
                    ) : (
                      <Building2 size={14} />
                    )}
                    {prop.propertyCategory}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: "20px" }}>
                  <h3
                    style={{
                      margin: "0 0 10px 0",
                      fontSize: "1.25rem",
                      color: "#222",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {prop.title}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "#666",
                      marginBottom: "20px",
                      fontSize: "0.95rem",
                    }}
                  >
                    <MapPin size={16} color="#d4af37" />
                    <span>
                      {prop.address?.city}, {prop.address?.state}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid #eee",
                      paddingTop: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                        fontWeight: "bold",
                        fontSize: "1.3rem",
                        color: "#111",
                      }}
                    >
                      <IndianRupee size={20} />
                      {displayPrice}{" "}
                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: "#888",
                          fontWeight: "normal",
                          marginLeft: "4px",
                        }}
                      >
                        /mo
                      </span>
                    </div>

                    <Link
                      to={`/rooms/${prop._id}`}
                      style={{
                        padding: "10px 18px",
                        background: "#111",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "8px",
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        transition: "background 0.2s",
                      }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Rooms;
