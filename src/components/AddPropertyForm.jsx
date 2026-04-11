import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // Your Axios instance

function AddPropertyForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. Setup the State for all text fields
  const [formData, setFormData] = useState({
    title: "",
    propertyCategory: "Flat", // Default to Flat for now
    street: "",
    city: "",
    state: "",
    pincode: "",
    bhkType: "1BHK",
    rentAmount: "",
    depositAmount: "",
    furnishing: "Fully Furnished",
    amenities: "", // We will ask the user for comma-separated amenities (e.g., "WiFi, AC, TV")
  });

  // 2. Setup separate State for the image files
  const [images, setImages] = useState([]);

  // Handle standard text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    // Convert the FileList object into a standard array
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      return;
    }
    setImages(selectedFiles);
  };

  // 3. The Submit Function (The Magic Happens Here)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create a new FormData object (Required for sending files)
      const submitData = new FormData();

      // Append standard strings
      submitData.append("title", formData.title);
      submitData.append("propertyCategory", formData.propertyCategory);

      // IMPORTANT: Nested objects and arrays MUST be stringified!
      submitData.append(
        "address",
        JSON.stringify({
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        }),
      );

      submitData.append(
        "flatDetails",
        JSON.stringify({
          bhkType: formData.bhkType,
          rentAmount: Number(formData.rentAmount),
          depositAmount: Number(formData.depositAmount),
          furnishing: formData.furnishing,
        }),
      );

      // Convert "WiFi, AC" into an array ["WiFi", "AC"] and stringify it
      const amenitiesArray = formData.amenities
        .split(",")
        .map((item) => item.trim());
      submitData.append("generalAmenities", JSON.stringify(amenitiesArray));

      // Append all selected image files using the exact key "images"
      images.forEach((file) => {
        submitData.append("images", file);
      });

      // 4. Send it to the backend!
      await api.post("/properties", submitData, {
        headers: { "Content-Type": "multipart/form-data" }, // CRITICAL HEADER
      });

      alert(
        "Property Uploaded Successfully! It is currently Pending approval.",
      );
      navigate("/owner"); // Send them back to the dashboard
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to upload property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        background: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <h2>Add New Property</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        {/* Basic Info */}
        <input
          type="text"
          name="title"
          placeholder="Property Title (e.g., Cozy 1BHK)"
          onChange={handleChange}
          required
        />

        {/* Address */}
        <h4>Address Details</h4>
        <input
          type="text"
          name="street"
          placeholder="Street / Area"
          onChange={handleChange}
          required
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            required
            style={{ flex: 1 }}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            onChange={handleChange}
            required
            style={{ flex: 1 }}
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
            required
            style={{ flex: 1 }}
          />
        </div>

        {/* Flat Details */}
        <h4>Flat Details</h4>
        <select name="bhkType" onChange={handleChange}>
          <option value="1BHK">1 BHK</option>
          <option value="2BHK">2 BHK</option>
          <option value="3BHK">3 BHK</option>
        </select>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="number"
            name="rentAmount"
            placeholder="Monthly Rent (₹)"
            onChange={handleChange}
            required
            style={{ flex: 1 }}
          />
          <input
            type="number"
            name="depositAmount"
            placeholder="Security Deposit (₹)"
            onChange={handleChange}
            required
            style={{ flex: 1 }}
          />
        </div>

        <select name="furnishing" onChange={handleChange}>
          <option value="Fully Furnished">Fully Furnished</option>
          <option value="Semi-Furnished">Semi-Furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>

        <input
          type="text"
          name="amenities"
          placeholder="Amenities (comma separated: WiFi, AC, TV)"
          onChange={handleChange}
        />

        {/* File Upload */}
        <h4>Upload Images (Max 5)</h4>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          {loading ? "Uploading..." : "Submit Property"}
        </button>
      </form>
    </div>
  );
}

export default AddPropertyForm;
