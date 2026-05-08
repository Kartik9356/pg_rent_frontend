import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPropertyById } from "../api/properties";
import Modal from "../components/Modal";
const adminPhone = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || "919876543210";
const currentUrl = window.location.href;

import {
  MapPin,
  CheckCircle2,
  IndianRupee,
  ArrowLeft,
  MessageCircle,
  Home,
  User,
  ShieldCheck,
  BedDouble,
} from "lucide-react";

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // 🔥 2. Add state to control your Login Modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await fetchPropertyById(id);
        setProperty(data);
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          fontSize: "1.2rem",
          color: "#666",
        }}
      >
        Loading property details...
      </div>
    );

  if (error)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          fontSize: "1.2rem",
          color: "#dc3545",
        }}
      >
        {error}
      </div>
    );

  if (!property) return null;

  // Authentication & Action Logic
  const isLoggedIn = !!localStorage.getItem("user");
  const whatsappMessage = `Hi! I am interested in this property.
  
        *Owner Name:* ${property?.ownerId?.name || "Verified Owner"}
        *Property Name:* ${property?.title}
        *Property ID:* ${property?._id}
        *Property URL:* ${currentUrl}`;

  const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(whatsappMessage)}`;

  const buttonStyle = {
    width: "100%",
    padding: "16px",
    background: "#25D366",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.05rem",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.3s ease",
    textDecoration: "none",
    boxSizing: "border-box",
    boxShadow: "0 4px 15px rgba(37, 211, 102, 0.2)",
  };
  return (
    <div
      style={{
        background: "#f8f9fc",
        minHeight: "100vh",
        paddingBottom: "60px",
      }}
    >
      {/* 🔥 3. Render the Modal conditionally at the top of the page */}
      {/* Note: Change 'onClose' to whatever prop your Modal uses to close itself */}
      {showModal && <Modal onClose={() => setShowModal(false)} />}

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}
      >
        {/* Navigation Bar */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            color: "#555",
            marginBottom: "20px",
            fontWeight: "500",
            transition: "color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#111")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#555")}
        >
          <ArrowLeft size={20} /> Back to Search
        </button>

        <div
          style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {/* ================= LEFT COLUMN: IMAGES & DETAILS ================= */}
          <div style={{ flex: "1 1 650px" }}>
            <div
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "16px",
                boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "450px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "#eee",
                  marginBottom: "15px",
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
                    transition: "opacity 0.3s ease",
                  }}
                />
              </div>

              {property.images && property.images.length > 1 && (
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    overflowX: "auto",
                    paddingBottom: "5px",
                    scrollbarWidth: "thin",
                  }}
                >
                  {property.images.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      style={{
                        minWidth: "90px",
                        height: "70px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        cursor: "pointer",
                        border:
                          selectedImageIndex === index
                            ? "3px solid #111"
                            : "3px solid transparent",
                        opacity: selectedImageIndex === index ? 1 : 0.5,
                        transition: "all 0.2s ease",
                      }}
                    >
                      <img
                        src={img}
                        alt={`thumb-${index}`}
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
            </div>

            <div style={{ marginBottom: "30px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "15px",
                }}
              >
                <span
                  style={{
                    background: "#111",
                    color: "white",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  {property.propertyCategory}
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "#28a745",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    background: "#e6f4ea",
                    padding: "6px 14px",
                    borderRadius: "20px",
                  }}
                >
                  <ShieldCheck size={16} /> Verified
                </span>
              </div>

              <h1
                style={{
                  fontSize: "2.2rem",
                  color: "#1a1a1a",
                  margin: "0 0 15px 0",
                  lineHeight: "1.2",
                }}
              >
                {property.title}
              </h1>

              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#666",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                <MapPin size={22} color="#dc3545" />
                {property.address?.street}, {property.address?.city},{" "}
                {property.address?.state} - {property.address?.pincode}
              </p>
            </div>

            <div
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "16px",
                boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.4rem",
                  color: "#1a1a1a",
                  margin: "0 0 20px 0",
                }}
              >
                Amenities & Facilities
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {property.generalAmenities?.length > 0 ? (
                  property.generalAmenities.map((amenity, index) => (
                    <span
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "#f8f9fa",
                        border: "1px solid #e9ecef",
                        color: "#495057",
                        padding: "10px 18px",
                        borderRadius: "8px",
                        fontSize: "0.95rem",
                        fontWeight: "500",
                      }}
                    >
                      <CheckCircle2 size={18} color="#0d6efd" /> {amenity}
                    </span>
                  ))
                ) : (
                  <span style={{ color: "#888", fontStyle: "italic" }}>
                    No specific amenities listed.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: STICKY CARD ================= */}
          <div style={{ flex: "1 1 380px", position: "sticky", top: "30px" }}>
            <div
              style={{
                background: "white",
                padding: "35px",
                borderRadius: "16px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  marginBottom: "25px",
                  paddingBottom: "25px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <p
                  style={{
                    color: "#666",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    margin: "0 0 5px 0",
                    fontWeight: "bold",
                  }}
                >
                  Monthly Rent
                </p>
                <h2
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "2.8rem",
                    margin: "0",
                    color: "#111",
                  }}
                >
                  <IndianRupee size={36} style={{ marginRight: "-2px" }} />
                  {property.propertyCategory === "Flat"
                    ? property.flatDetails?.rentAmount
                    : property.roomConfigurations?.[0]?.pricePerBed}
                  <span
                    style={{
                      fontSize: "1rem",
                      color: "#888",
                      fontWeight: "normal",
                      marginLeft: "8px",
                    }}
                  >
                    / {property.propertyCategory === "Flat" ? "month" : "bed"}
                  </span>
                </h2>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "15px",
                  marginBottom: "30px",
                }}
              >
                {property.propertyCategory === "Flat" ? (
                  <>
                    <DetailBox
                      icon={<Home size={20} />}
                      label="BHK Type"
                      value={property.flatDetails?.bhkType}
                    />
                    <DetailBox
                      icon={<BedDouble size={20} />}
                      label="Furnishing"
                      value={property.flatDetails?.furnishing}
                    />
                    <DetailBox
                      icon={<IndianRupee size={20} />}
                      label="Deposit"
                      value={`₹${property.flatDetails?.depositAmount}`}
                    />
                    <DetailBox
                      icon={<User size={20} />}
                      label="Allowed"
                      value={property.flatDetails?.tenantPreference}
                    />
                  </>
                ) : (
                  <>
                    <DetailBox
                      icon={<BedDouble size={20} />}
                      label="Sharing"
                      value={property.roomConfigurations?.[0]?.sharingType}
                    />
                    <DetailBox
                      icon={<User size={20} />}
                      label="Gender"
                      value={
                        property.roomConfigurations?.[0]?.genderRestriction
                      }
                    />
                    <DetailBox
                      icon={<IndianRupee size={20} />}
                      label="Deposit"
                      value={`₹${property.roomConfigurations?.[0]?.depositPerBed}`}
                    />
                    <DetailBox
                      icon={<CheckCircle2 size={20} />}
                      label="Food"
                      value={
                        property.roomConfigurations?.[0]?.foodIncluded
                          ? "Included"
                          : "Not Included"
                      }
                    />
                  </>
                )}
              </div>

              <div
                style={{
                  background: "#f8f9fa",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid #eee",
                }}
              >
                <p
                  style={{
                    margin: "0 0 15px 0",
                    fontSize: "0.95rem",
                    color: "#555",
                  }}
                >
                  Listed by{" "}
                  <strong>{property.ownerId?.name || "Verified Owner"}</strong>
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={buttonStyle}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#1ebe5d";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "#25D366";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <MessageCircle size={22} /> Chat on WhatsApp
                </a>

                <p
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    color: "#888",
                    margin: "12px 0 0 0",
                  }}
                >
                  We don't charge any brokerage fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const DetailBox = ({ icon, label, value }) => (
  <div
    style={{
      background: "#f8f9fc",
      padding: "12px 15px",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: "#666",
        fontSize: "0.85rem",
      }}
    >
      {React.cloneElement(icon, { size: 16, color: "#888" })} {label}
    </div>
    <div style={{ fontWeight: "600", color: "#1a1a1a", fontSize: "1rem" }}>
      {value}
    </div>
  </div>
);

export default PropertyDetail;
