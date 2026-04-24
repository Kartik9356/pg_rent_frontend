import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  IndianRupee,
  ArrowLeft,
} from "lucide-react";

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 State to track which image is currently selected
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        setError("Property not found or server error.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        Loading details...
      </div>
    );
  if (error)
    return (
      <div style={{ textAlign: "center", padding: "100px", color: "red" }}>
        {error}
      </div>
    );
  if (!property) return null;

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        minHeight: "80vh",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
          color: "#555",
          marginBottom: "20px",
        }}
      >
        <ArrowLeft size={18} /> Back to Search
      </button>

      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {/* LEFT COLUMN: Images & Details */}
        <div style={{ flex: "1 1 600px" }}>
          {/* 🔥 MAIN IMAGE VIEWER */}
          <div
            style={{
              width: "100%",
              height: "450px",
              borderRadius: "12px",
              overflow: "hidden",
              background: "#eee",
              marginBottom: "15px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={
                property.images?.length > 0
                  ? property.images[selectedImageIndex]
                  : "https://via.placeholder.com/800x400?text=No+Image"
              }
              alt={property.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "all 0.3s ease",
              }}
            />
          </div>

          {/* 🔥 CLICKABLE THUMBNAILS */}
          {property.images && property.images.length > 1 && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "30px",
                overflowX: "auto",
                paddingBottom: "10px",
              }}
            >
              {property.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "pointer",
                    border:
                      selectedImageIndex === index
                        ? "3px solid #d4af37"
                        : "2px solid transparent",
                    opacity: selectedImageIndex === index ? 1 : 0.6,
                    transition: "all 0.2s ease",
                  }}
                >
                  <img
                    src={img}
                    alt={`thumbnail-${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          <h1
            style={{
              margin: "0 0 10px 0",
              color: "#333",
              marginTop: property.images?.length <= 1 ? "30px" : "0",
            }}
          >
            {property.title}
          </h1>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              color: "#666",
              fontSize: "1.1rem",
            }}
          >
            <MapPin size={20} /> {property.address?.street},{" "}
            {property.address?.city}, {property.address?.state} -{" "}
            {property.address?.pincode}
          </p>

          <hr
            style={{
              border: "0",
              borderTop: "1px solid #eee",
              margin: "30px 0",
            }}
          />

          {/* Amenities Section */}
          <h3>Amenities</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              marginTop: "15px",
            }}
          >
            {property.generalAmenities?.length > 0 ? (
              property.generalAmenities.map((amenity, index) => (
                <span
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    background: "#fdfaf4",
                    border: "1px solid #f0e6d2",
                    color: "#8b6914",
                    padding: "8px 15px",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                  }}
                >
                  <CheckCircle2 size={16} /> {amenity}
                </span>
              ))
            ) : (
              <span style={{ color: "#888" }}>
                No specific amenities listed.
              </span>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: The Sticky Action Card */}
        <div style={{ flex: "0 1 350px", width: "100%" }}>
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              position: "sticky",
              top: "20px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: "#333",
                color: "white",
                padding: "5px 12px",
                borderRadius: "6px",
                fontSize: "0.8rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "15px",
              }}
            >
              {property.propertyCategory}
            </span>

            {/* Flat Details vs PG Details Logic */}
            {property.propertyCategory === "Flat" ? (
              <>
                <h2
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "2.5rem",
                    margin: "0 0 10px 0",
                    color: "#d4af37",
                  }}
                >
                  <IndianRupee size={30} /> {property.flatDetails?.rentAmount}{" "}
                  <span
                    style={{
                      fontSize: "1rem",
                      color: "#888",
                      fontWeight: "normal",
                      marginLeft: "5px",
                    }}
                  >
                    / month
                  </span>
                </h2>
                <div
                  style={{
                    background: "#f9f9f9",
                    padding: "15px",
                    borderRadius: "8px",
                    margin: "20px 0",
                    fontSize: "0.95rem",
                    color: "#555",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Deposit:</span>{" "}
                    <strong>₹{property.flatDetails?.depositAmount}</strong>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>BHK Type:</span>{" "}
                    <strong>{property.flatDetails?.bhkType}</strong>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Furnishing:</span>{" "}
                    <strong>{property.flatDetails?.furnishing}</strong>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Allowed:</span>{" "}
                    <strong>{property.flatDetails?.tenantPreference}</strong>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "2.5rem",
                    margin: "0 0 10px 0",
                    color: "#d4af37",
                  }}
                >
                  <IndianRupee size={30} />{" "}
                  {property.roomConfigurations?.[0]?.pricePerBed}{" "}
                  <span
                    style={{
                      fontSize: "1rem",
                      color: "#888",
                      fontWeight: "normal",
                      marginLeft: "5px",
                    }}
                  >
                    / bed
                  </span>
                </h2>
                <div
                  style={{
                    background: "#f9f9f9",
                    padding: "15px",
                    borderRadius: "8px",
                    margin: "20px 0",
                    fontSize: "0.95rem",
                    color: "#555",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Deposit:</span>{" "}
                    <strong>
                      ₹{property.roomConfigurations?.[0]?.depositPerBed}
                    </strong>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Sharing:</span>{" "}
                    <strong>
                      {property.roomConfigurations?.[0]?.sharingType}
                    </strong>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Food Included:</span>{" "}
                    <strong>
                      {property.roomConfigurations?.[0]?.foodIncluded
                        ? "Yes"
                        : "No"}
                    </strong>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Gender:</span>{" "}
                    <strong>
                      {property.roomConfigurations?.[0]?.genderRestriction}
                    </strong>
                  </div>
                </div>
              </>
            )}

            {/* Owner Contact Information */}
            <div
              style={{
                marginTop: "30px",
                paddingTop: "20px",
                borderTop: "1px solid #eee",
              }}
            >
              <h4 style={{ margin: "0 0 15px 0" }}>Owner Details</h4>
              <p style={{ margin: "0 0 10px 0", fontWeight: "bold" }}>
                {property.ownerId?.name || "Verified Owner"}
              </p>

              <button
                style={{
                  width: "100%",
                  padding: "15px",
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
                  gap: "10px",
                  marginBottom: "10px",
                  transition: "background 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.background = "#b8962e")}
                onMouseOut={(e) => (e.target.style.background = "#d4af37")}
              >
                <Phone size={18} /> Show Phone Number
              </button>

              <button
                style={{
                  width: "100%",
                  padding: "15px",
                  background: "white",
                  color: "#333",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  transition: "background 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.background = "#f4f4f4")}
                onMouseOut={(e) => (e.target.style.background = "white")}
              >
                <Mail size={18} /> Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
