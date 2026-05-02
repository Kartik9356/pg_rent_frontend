import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchLatestProperties } from "../api/properties";
import { MapPin, IndianRupee, Home, Building2 } from "lucide-react";
import "../style.css";

function HomeListing() {
  const scrollRef = useRef();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLatestProperties();
        setRooms(data.properties || data.data || []);
      } catch (error) {
        console.error("Error fetching latest properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="loading-container">
        Loading latest properties...
      </div>
    );
  }

  if (!Array.isArray(rooms) || rooms.length === 0) return null;

  return (
    <div className="home-container">
      <div className="home-inner">

        <div className="home-header">
          <div>
            <h2 className="home-title">Latest Verified Homes</h2>
            <p className="home-subtitle">
              Fresh listings just added to our platform
            </p>
          </div>

          <Link to="/rooms" className="home-link">
            View All ➔
          </Link>
        </div>

        {/* Left Button */}
        <button onClick={scrollLeft} className="scroll-btn scroll-left">
          ◀
        </button>

        {/* Scroll Container */}
        <div ref={scrollRef} className="scroll-container scrollbar-hide">
          {rooms.map((prop) => {
            const displayPrice =
              prop.propertyCategory === "Flat"
                ? prop.flatDetails?.rentAmount
                : prop.roomConfigurations?.[0]?.pricePerBed;

            return (
              <div key={prop._id} className="property-card">

                <div className="card-image">
                  <img
                    src={
                      prop.images?.length > 0
                        ? prop.images[0]
                        : "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={prop.title}
                    className="card-img"
                  />

                  <span
                    className={`badge ${prop.propertyCategory === "Flat"
                        ? "badge-flat"
                        : "badge-room"
                      }`}
                  >
                    {prop.propertyCategory === "Flat" ? (
                      <Home size={14} />
                    ) : (
                      <Building2 size={14} />
                    )}
                    {prop.propertyCategory}
                  </span>
                </div>

                <div className="card-body">
                  <h3 className="card-title">{prop.title}</h3>

                  <div className="card-location">
                    <MapPin size={16} color="#d4af37" />
                    <span>
                      {prop.address?.city}, {prop.address?.state}
                    </span>
                  </div>

                  <div className="card-footer">
                    <div className="price">
                      <IndianRupee size={18} /> {displayPrice}
                      <span className="per-month">/mo</span>
                    </div>

                    <Link
                      to={`/rooms/${prop._id}`}
                      className="view-btn"
                    >
                      View
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Right Button */}
        <button onClick={scrollRight} className="scroll-btn scroll-right">
          ▶
        </button>

      </div>
    </div>
  );
}

export default HomeListing;