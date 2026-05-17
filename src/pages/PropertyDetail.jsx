import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPropertyById } from "../api/properties";


import {
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  IndianRupee,
  ArrowLeft,
} from "lucide-react";

import "../style.css";

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  if (loading) return <div className="loading">Loading details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!property) return null;

  return (
    <div className="property-container">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="back-btn"
      >
        <ArrowLeft size={18} /> Back to Search
      </button>

      <div className="property-layout">

        {/* LEFT */}
        <div className="property-left">

          <div className="main-image-box">
            <img
              src={
                property.images?.length > 0
                  ? property.images[selectedImageIndex]
                  : "https://via.placeholder.com/800x400?text=No+Image"
              }
              alt={property.title}
            />
          </div>

          {property.images && property.images.length > 1 && (
            <div className="thumbnail-row">
              {property.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`thumbnail ${selectedImageIndex === index ? "active" : ""
                    }`}
                >
                  <img src={img} alt={`thumb-${index}`} />
                </div>
              ))}
            </div>
          )}

          <h1 className="property-title">{property.title}</h1>

          <p className="property-location">
            <MapPin size={20} />
            {property.address?.street}, {property.address?.city},{" "}
            {property.address?.state} - {property.address?.pincode}
          </p>

          <hr className="divider" />

          <h3>Amenities</h3>

          <div className="amenities">
            {property.generalAmenities?.length > 0 ? (
              property.generalAmenities.map((amenity, index) => (
                <span key={index} className="amenity">
                  <CheckCircle2 size={16} /> {amenity}
                </span>
              ))
            ) : (
              <span className="no-amenities">
                No specific amenities listed.
              </span>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="property-right">
          <div className="property-card">

            <span className="category-tag">
              {property.propertyCategory}
            </span>

            {property.propertyCategory === "Flat" ? (
              <>
                <h2 className="price">
                  <IndianRupee size={30} />
                  {property.flatDetails?.rentAmount}
                  <span>/ month</span>
                </h2>

                <div className="details-box">
                  <div className="details-row">
                    <span>Deposit:</span>
                    <strong>₹{property.flatDetails?.depositAmount}</strong>
                  </div>

                  <div className="details-row">
                    <span>BHK Type:</span>
                    <strong>{property.flatDetails?.bhkType}</strong>
                  </div>

                  <div className="details-row">
                    <span>Furnishing:</span>
                    <strong>{property.flatDetails?.furnishing}</strong>
                  </div>

                  <div className="details-row">
                    <span>Allowed:</span>
                    <strong>{property.flatDetails?.tenantPreference}</strong>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="price">
                  <IndianRupee size={30} />
                  {property.roomConfigurations?.[0]?.pricePerBed}
                  <span>/ bed</span>
                </h2>

                <div className="details-box">
                  <div className="details-row">
                    <span>Deposit:</span>
                    <strong>
                      ₹{property.roomConfigurations?.[0]?.depositPerBed}
                    </strong>
                  </div>

                  <div className="details-row">
                    <span>Sharing:</span>
                    <strong>
                      {property.roomConfigurations?.[0]?.sharingType}
                    </strong>
                  </div>

                  <div className="details-row">
                    <span>Food Included:</span>
                    <strong>
                      {property.roomConfigurations?.[0]?.foodIncluded
                        ? "Yes"
                        : "No"}
                    </strong>
                  </div>

                  <div className="details-row">
                    <span>Gender:</span>
                    <strong>
                      {property.roomConfigurations?.[0]?.genderRestriction}
                    </strong>
                  </div>
                </div>
              </>
            )}

            <div className="owner-section">
              <h4>Owner Details</h4>

              <p className="owner-name">
                {property.ownerId?.name || "Verified Owner"}
              </p>

              <button className="primary-btn">
                <Phone size={18} /> Show Phone Number
              </button>

              <button className="secondary-btn">
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