import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchLatestProperties } from "../api/properties";
import { MapPin, IndianRupee, Home, Building2 } from "lucide-react";

function HomeListing() {
  const scrollRef = useRef();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLatestProperties();
        //setRooms(data);
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

  if (loading)
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Loading latest properties...
      </div>
    );
  if (rooms.length === 0) return null; // Don't show the section at all if DB is empty

  return (
    <div
      style={{
        padding: "60px 20px",
        background: "#fcfcfc",
        position: "relative",
      }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "30px",
          }}
        >
          <div>
            <h2
              style={{ margin: "0 0 10px 0", fontSize: "2rem", color: "#333" }}
            >
              Latest Verified Homes
            </h2>
            <p style={{ margin: 0, color: "#666" }}>
              Fresh listings just added to our platform
            </p>
          </div>
          <Link
            to="/rooms"
            style={{
              color: "#d4af37",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            View All ➔
          </Link>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={scrollLeft}
          style={{
            position: "absolute",
            left: "-20px",
            top: "55%",
            transform: "translateY(-50%)",
            zIndex: 10,
            background: "white",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid #ddd",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ◀
        </button>

        {/* SCROLL CONTAINER */}
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: "25px",
            overflowX: "auto",
            scrollBehavior: "smooth",
            paddingBottom: "20px",
          }}
          className="scrollbar-hide" // Assumes you have a CSS class hiding the scrollbar
        >
          {rooms.map((prop) => {
            const displayPrice =
              prop.propertyCategory === "Flat"
                ? prop.flatDetails?.rentAmount
                : prop.roomConfigurations?.[0]?.pricePerBed;

            return (
              <div
                key={prop._id}
                style={{
                  minWidth: "320px",
                  maxWidth: "320px",
                  background: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                  border: "1px solid #eee",
                  flexShrink: 0,
                }}
              >
                <div style={{ height: "200px", position: "relative" }}>
                  <img
                    src={
                      prop.images?.length > 0
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

                <div style={{ padding: "20px" }}>
                  <h3
                    style={{
                      margin: "0 0 10px 0",
                      fontSize: "1.2rem",
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
                      gap: "5px",
                      color: "#666",
                      marginBottom: "15px",
                      fontSize: "0.9rem",
                    }}
                  >
                    <MapPin size={16} color="#d4af37" />{" "}
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
                      paddingTop: "15px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        color: "#111",
                      }}
                    >
                      <IndianRupee size={18} /> {displayPrice}{" "}
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#888",
                          fontWeight: "normal",
                        }}
                      >
                        /mo
                      </span>
                    </div>
                    <Link
                      to={`/rooms/${prop._id}`}
                      style={{
                        padding: "8px 16px",
                        background: "#111",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "6px",
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                      }}
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={scrollRight}
          style={{
            position: "absolute",
            right: "-20px",
            top: "55%",
            transform: "translateY(-50%)",
            zIndex: 10,
            background: "white",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid #ddd",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

export default HomeListing;
