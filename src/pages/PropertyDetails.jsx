import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import "./PropertyDetails.css";

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get("/properties");
        const selected = res.data.data.find(p => p._id === id);
        setProperty(selected);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) return <p className="loading">Loading...</p>;

  return (
    <div className="pd-container">
      <div className="pd-wrapper">

        <h1 className="pd-title">{property.title}</h1>

        <p className="pd-location">
          📍 Pune • Students & Professionals
        </p>

        <div className="pd-badges">
          <span className="pd-badge">Rent</span>
          <span className="pd-badge">PG</span>
          <span className="pd-badge">Boys/Girls</span>
        </div>

        <div className="pd-image-box">
          <img
            src={property.images?.[0]}
            onClick={() => setSelectedImg(property.images[0])}
            className="pd-main-img"
            alt="property"
          />
        </div>

        {selectedImg && (
          <div
            className="pd-modal"
            onClick={() => setSelectedImg(null)}
          >
            <img src={selectedImg} className="pd-modal-img" alt="preview" />
          </div>
        )}

        <div className="pd-grid">

          <div className="pd-left">

            <h2 className="section-title">About</h2>
            <p className="pd-text">
              Perfect stay for students and professionals with PG, rooms & flats.
            </p>

            <h3 className="section-title">Owner</h3>
            <div className="pd-owner">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                className="pd-owner-img"
                alt="owner"
              />
              <div>
                <p className="pd-owner-name">{property.ownerId?.name}</p>
                <p className="pd-owner-phone">
                  📞 {property.ownerId?.phone}
                </p>
              </div>
            </div>

            <h3 className="section-title">Reviews</h3>
            <p className="pd-review">⭐ 5 - Great place, very clean!</p>
            <p className="pd-review">⭐ 4 - Good location</p>

            <h3 className="section-title">Location</h3>
            <iframe
              src="https://maps.google.com/maps?q=pune&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="pd-map"
            ></iframe>
          </div>

          <div className="pd-right">
            <h2 className="pd-price">
              ₹{property.flatDetails?.rentAmount || 5000}/month
            </h2>

            <p className="pd-deposit">Deposit ₹36,000</p>

            <button className="pd-btn-primary">
              Chat Owner
            </button>

            <button className="pd-btn-secondary">
              Book Visit
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;