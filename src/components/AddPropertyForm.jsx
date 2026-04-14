import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // Your Axios instance

function AddPropertyForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. Comprehensive State matching the Mongoose Schema
  const [formData, setFormData] = useState({
    title: "",
    propertyCategory: "Flat", // 'Flat' or 'PG' drives the UI

    // Address & Map
    street: "",
    city: "",
    state: "",
    pincode: "",
    latitude: "",
    longitude: "",

    // Features
    amenities: "",

    // Flat Specifics
    bhkType: "1BHK",
    furnishing: "Fully Furnished", // Must match Enum exactly
    rentAmount: "",
    depositAmount: "",
    tenantPreference: "Anyone",

    // PG Specifics (Handling 1 room configuration for the form)
    sharingType: "Single",
    pricePerBed: "",
    depositPerBed: "",
    totalBeds: "",
    availableBeds: "",
    foodIncluded: false,
    genderRestriction: "Boys Only",
  });

  const [images, setImages] = useState([]);

  // Smart Handle Change (Supports Checkboxes and standard inputs)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      return;
    }
    setImages(selectedFiles);
  };

  // 3. Submit Logic mapped strictly to Schema
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const submitData = new FormData();

      // Core Strings
      submitData.append("title", formData.title);
      submitData.append("propertyCategory", formData.propertyCategory);

      // JSON Stringified Objects
      submitData.append(
        "address",
        JSON.stringify({
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        }),
      );

      // Mapbox Coordinates format: [longitude, latitude]
      submitData.append(
        "location",
        JSON.stringify({
          type: "Point",
          coordinates: [
            Number(formData.longitude) || 0,
            Number(formData.latitude) || 0,
          ],
        }),
      );

      // Amenities Array
      const amenitiesArray = formData.amenities
        .split(",")
        .map((item) => item.trim());
      submitData.append("generalAmenities", JSON.stringify(amenitiesArray));

      // Append Flat OR PG Details based on selection
      if (formData.propertyCategory === "Flat") {
        submitData.append(
          "flatDetails",
          JSON.stringify({
            bhkType: formData.bhkType,
            furnishing: formData.furnishing,
            rentAmount: Number(formData.rentAmount),
            depositAmount: Number(formData.depositAmount),
            tenantPreference: formData.tenantPreference,
          }),
        );
      } else if (formData.propertyCategory === "PG") {
        // Schema expects an array for roomConfigurations
        submitData.append(
          "roomConfigurations",
          JSON.stringify([
            {
              sharingType: formData.sharingType,
              pricePerBed: Number(formData.pricePerBed),
              depositPerBed: Number(formData.depositPerBed),
              totalBeds: Number(formData.totalBeds),
              availableBeds: Number(formData.availableBeds),
              foodIncluded: formData.foodIncluded,
              genderRestriction: formData.genderRestriction,
            },
          ]),
        );
      }

      // Append Images
      images.forEach((file) => submitData.append("images", file));

      // Send Request
      await api.post("/properties", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Property Uploaded Successfully!");
      navigate("/owner");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to upload property");
    } finally {
      setLoading(false);
    }
  };

  // Inline styling for layout
  const inputStyle = {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    flex: 1,
  };
  const rowStyle = { display: "flex", gap: "10px", marginBottom: "15px" };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "2rem auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ borderBottom: "2px solid #eaeaea", paddingBottom: "10px" }}>
        List Your Property
      </h2>
      {error && (
        <div
          style={{
            background: "#f8d7da",
            color: "#721c24",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px",
          }}
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        {/* === SECTION: BASIC INFO === */}
        <h4>Basic Details</h4>
        <div style={rowStyle}>
          <input
            type="text"
            name="title"
            placeholder="Property Title"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <select
            name="propertyCategory"
            onChange={handleChange}
            value={formData.propertyCategory}
            style={inputStyle}
          >
            <option value="Flat">Full Flat / Apartment</option>
            <option value="PG">PG / Hostel / Co-living</option>
          </select>
        </div>

        {/* === SECTION: ADDRESS & MAP === */}
        <h4>Address & Location</h4>
        <input
          type="text"
          name="street"
          placeholder="Street / Area Name"
          onChange={handleChange}
          required
          style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }}
        />
        <div style={rowStyle}>
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={rowStyle}>
          <input
            type="number"
            step="any"
            name="latitude"
            placeholder="Latitude (e.g., 18.5204)"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="number"
            step="any"
            name="longitude"
            placeholder="Longitude (e.g., 73.8567)"
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* === CONDITIONAL SECTION: FLAT DETAILS === */}
        {formData.propertyCategory === "Flat" && (
          <div
            style={{
              background: "#f8f9fa",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <h4>Flat Specifics</h4>
            <div style={rowStyle}>
              <select name="bhkType" onChange={handleChange} style={inputStyle}>
                <option value="1RK">1 RK</option>
                <option value="1BHK">1 BHK</option>
                <option value="2BHK">2 BHK</option>
                <option value="3BHK">3 BHK</option>
              </select>
              <select
                name="furnishing"
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Semi Furnished">Semi Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
              <select
                name="tenantPreference"
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="Anyone">Anyone</option>
                <option value="Bachelors">Bachelors Only</option>
                <option value="Family">Family Only</option>
              </select>
            </div>
            <div style={rowStyle}>
              <input
                type="number"
                name="rentAmount"
                placeholder="Monthly Rent (₹)"
                onChange={handleChange}
                required
                style={inputStyle}
              />
              <input
                type="number"
                name="depositAmount"
                placeholder="Security Deposit (₹)"
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
          </div>
        )}

        {/* === CONDITIONAL SECTION: PG DETAILS === */}
        {formData.propertyCategory === "PG" && (
          <div
            style={{
              background: "#eef5fc",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <h4>PG / Hostel Specifics</h4>
            <div style={rowStyle}>
              <select
                name="genderRestriction"
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="Boys Only">Boys Only</option>
                <option value="Girls Only">Girls Only</option>
                <option value="Co-ed">Co-ed</option>
              </select>
              <select
                name="sharingType"
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="Single">Single Room</option>
                <option value="Double">Double Sharing</option>
                <option value="Triple">Triple Sharing</option>
                <option value="Dormitory">Dormitory</option>
              </select>
            </div>
            <div style={rowStyle}>
              <input
                type="number"
                name="pricePerBed"
                placeholder="Price Per Bed (₹)"
                onChange={handleChange}
                required
                style={inputStyle}
              />
              <input
                type="number"
                name="depositPerBed"
                placeholder="Deposit Per Bed (₹)"
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
            <div style={rowStyle}>
              <input
                type="number"
                name="totalBeds"
                placeholder="Total Beds in Room"
                onChange={handleChange}
                required
                style={inputStyle}
              />
              <input
                type="number"
                name="availableBeds"
                placeholder="Beds Currently Available"
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                name="foodIncluded"
                checked={formData.foodIncluded}
                onChange={handleChange}
              />
              Food Included in Rent?
            </label>
          </div>
        )}

        {/* === SECTION: AMENITIES & MEDIA === */}
        <h4>Amenities & Media</h4>
        <input
          type="text"
          name="amenities"
          placeholder="Amenities (e.g. WiFi, AC, TV, Lift)"
          onChange={handleChange}
          style={{
            ...inputStyle,
            width: "100%",
            boxSizing: "border-box",
            marginBottom: "10px",
          }}
        />

        <label
          style={{ fontWeight: "bold", fontSize: "0.9rem", color: "#555" }}
        >
          Upload Images (Max 5)
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          required
          style={{ marginBottom: "10px" }}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "15px",
            background: "#111",
            color: "white",
            fontSize: "1.1rem",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          {loading ? "Processing Upload..." : "Submit Property Listing"}
        </button>
      </form>
    </div>
  );
}

export default AddPropertyForm;
