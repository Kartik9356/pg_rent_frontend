import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchAllProperties } from "../api/properties";
import {
  MapPin,
  IndianRupee,
  Search,
  Filter,
  Home,
  Building2,
} from "lucide-react";
import "../style.css";

function Rooms() {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchCity, setSearchCity] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchCity.trim()) params.city = searchCity.trim();
      if (category !== "All") params.category = category;
      if (maxPrice) params.maxPrice = Number(maxPrice);

      const data = await fetchAllProperties(params);
      setProperties(data.data || data);
    } catch (err) {
      console.error("Failed to fetch properties", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlCity = searchParams.get("city");
    if (urlCity) setSearchCity(urlCity);
    fetchProperties();
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  const clearFilters = async () => {
    setSearchCity("");
    setCategory("All");
    setMaxPrice("");
    fetchProperties();
  };

  return (
    <div className="rooms-container">

      {/* HEADER */}
      <div className="rooms-header">
        <h1>Explore Properties</h1>
        <p>Find the perfect flat or PG that fits your lifestyle.</p>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <form onSubmit={handleSearch} className="filter-form">

          <div className="filter-group">
            <label>Location</label>
            <div className="input-icon">
              <MapPin size={18} />
              <input
                type="text"
                placeholder="Search by City"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Property Type</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Flat">Flats / Apartments</option>
              <option value="PG">PGs / Hostels</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Max Budget</label>
            <div className="input-icon">
              <IndianRupee size={16} />
              <input
                type="number"
                placeholder="Any"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-actions">
            <button type="submit" className="search-btn">
              <Search size={16} /> Search
            </button>
            <button type="button" onClick={clearFilters} className="clear-btn">
              Clear
            </button>
          </div>

        </form>
      </div>

      {/* LIST */}
      {loading ? (
        <div className="loading">Searching properties...</div>
      ) : properties.length === 0 ? (
        <div className="empty">
          <Filter size={40} />
          <h3>No properties match your search.</h3>
          <p>Try different filters.</p>
        </div>
      ) : (
        <div className="grid">
          {properties.map((prop) => {
            const displayPrice =
              prop.propertyCategory === "Flat"
                ? prop.flatDetails?.rentAmount
                : prop.roomConfigurations?.[0]?.pricePerBed;

            return (
              <div key={prop._id} className="card">

                <div className="card-img">
                  <img
                    src={
                      prop.images?.[0] ||
                      "https://via.placeholder.com/400x300"
                    }
                    alt={prop.title}
                  />
                  <span className="badge">
                    {prop.propertyCategory === "Flat" ? (
                      <Home size={14} />
                    ) : (
                      <Building2 size={14} />
                    )}
                    {prop.propertyCategory}
                  </span>
                </div>

                <div className="card-body">
                  <h3>{prop.title}</h3>

                  <div className="location">
                    <MapPin size={16} />
                    {prop.address?.city}, {prop.address?.state}
                  </div>

                  <div className="card-footer">
                    <div className="price">
                      <IndianRupee size={20} /> {displayPrice}
                      <span>/mo</span>
                    </div>

                    <Link to={`/rooms/${prop._id}`} className="view-btn">
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