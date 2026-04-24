import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import {
  MapPin,
  Building2,
  Trash2,
  UploadCloud,
  Wifi,
  DollarSign,
  Users,
  Image as ImageIcon,
  ArrowLeft,
} from "lucide-react";

function EditPropertyForm() {
  const { id } = useParams(); // Get the property ID from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  // We'll track new images they want to upload, and existing images already on the server
  const [newImages, setNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    propertyCategory: "Flat",
    street: "",
    city: "",
    state: "",
    pincode: "",
    latitude: "",
    longitude: "",
    amenities: "",
    bhkType: "1BHK",
    furnishing: "Fully Furnished",
    rentAmount: "",
    depositAmount: "",
    tenantPreference: "Anyone",
    sharingType: "Single",
    pricePerBed: "",
    depositPerBed: "",
    totalBeds: "",
    availableBeds: "",
    foodIncluded: false,
    genderRestriction: "Boys Only",
  });

  // 🔥 Fetch Existing Data on Load
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`);
        const p = res.data;

        setFormData({
          title: p.title || "",
          propertyCategory: p.propertyCategory || "Flat",
          street: p.address?.street || "",
          city: p.address?.city || "",
          state: p.address?.state || "",
          pincode: p.address?.pincode || "",
          latitude: p.location?.coordinates[1] || "", // Mapbox stores as [long, lat]
          longitude: p.location?.coordinates[0] || "",
          amenities: p.generalAmenities?.join(", ") || "",
          bhkType: p.flatDetails?.bhkType || "1BHK",
          furnishing: p.flatDetails?.furnishing || "Fully Furnished",
          rentAmount: p.flatDetails?.rentAmount || "",
          depositAmount: p.flatDetails?.depositAmount || "",
          tenantPreference: p.flatDetails?.tenantPreference || "Anyone",
          sharingType: p.roomConfigurations?.[0]?.sharingType || "Single",
          pricePerBed: p.roomConfigurations?.[0]?.pricePerBed || "",
          depositPerBed: p.roomConfigurations?.[0]?.depositPerBed || "",
          totalBeds: p.roomConfigurations?.[0]?.totalBeds || "",
          availableBeds: p.roomConfigurations?.[0]?.availableBeds || "",
          foodIncluded: p.roomConfigurations?.[0]?.foodIncluded || false,
          genderRestriction:
            p.roomConfigurations?.[0]?.genderRestriction || "Boys Only",
        });

        setExistingImages(p.images || []);
      } catch (err) {
        setError("Failed to load property data.");
      } finally {
        setFetching(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "foodIncluded"
          ? value === "true"
          : type === "checkbox"
            ? checked
            : value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (existingImages.length + newImages.length + files.length > 5) {
      alert("Max 5 images allowed total.");
      return;
    }
    setNewImages([...newImages, ...files]);
    setPreviewImages([
      ...previewImages,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const handleRemoveNewImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
    URL.revokeObjectURL(previewImages[index]);
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };

  // 🔥 Update Submit Logic to use PUT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("propertyCategory", formData.propertyCategory);
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
        "location",
        JSON.stringify({
          type: "Point",
          coordinates: [Number(formData.longitude), Number(formData.latitude)],
        }),
      );
      submitData.append(
        "generalAmenities",
        JSON.stringify(formData.amenities.split(",").map((a) => a.trim())),
      );

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
      } else {
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

      // If they uploaded new images, send them to the backend
      newImages.forEach((file) => submitData.append("images", file));

      // Call the PUT route instead of POST
      await api.put(`/properties/${id}`, submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Property Updated Successfully! 🚀");
      navigate("/owner");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        Loading property data...
      </div>
    );

  // The rest of this is identical to your AddPropertyForm UI!
  return (
    <div className="container">
      <div className="card">
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
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <h2 className="title">Edit Property</h2>
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="form">
          <h4>
            <Building2 size={20} /> Basic Details
          </h4>
          <div className="row">
            <div className="input-group full">
              <label>Property Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label>Property Type</label>
              {/* Disabled because changing category mid-way can break the schema */}
              <select
                name="propertyCategory"
                value={formData.propertyCategory}
                disabled
                className="input"
                style={{ background: "#eee", cursor: "not-allowed" }}
              >
                <option value="Flat">🏠 Flat</option>
                <option value="PG">🏢 PG / Hostel</option>
              </select>
            </div>
            {formData.propertyCategory === "Flat" && (
              <>
                <div className="input-group">
                  <label>BHK Type</label>
                  <select
                    name="bhkType"
                    value={formData.bhkType}
                    className="input"
                    onChange={handleChange}
                  >
                    <option>1RK</option>
                    <option>1BHK</option>
                    <option>2BHK</option>
                    <option>3BHK</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Furnishing</label>
                  <select
                    name="furnishing"
                    value={formData.furnishing}
                    className="input"
                    onChange={handleChange}
                  >
                    <option>Fully Furnished</option>
                    <option>Semi Furnished</option>
                    <option>Unfurnished</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Tenant Preference</label>
                  <select
                    name="tenantPreference"
                    value={formData.tenantPreference}
                    className="input"
                    onChange={handleChange}
                  >
                    <option>Anyone</option>
                    <option>Bachelors</option>
                    <option>Family</option>
                  </select>
                </div>
              </>
            )}
          </div>

          <h4>
            <MapPin size={20} /> Location Details
          </h4>
          <div className="input-group full">
            <label>Street</label>
            <input
              name="street"
              value={formData.street}
              className="input"
              onChange={handleChange}
              required
            />
          </div>
          <div className="row">
            <div className="input-group">
              <label>City</label>
              <input
                name="city"
                value={formData.city}
                className="input"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>State</label>
              <input
                name="state"
                value={formData.state}
                className="input"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Pincode</label>
              <input
                name="pincode"
                value={formData.pincode}
                className="input"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="input-group">
              <label>Latitude</label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                className="input"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Longitude</label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                className="input"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {formData.propertyCategory === "Flat" && (
            <div className="section flat">
              <h4>
                <DollarSign size={20} /> Pricing
              </h4>
              <div className="row">
                <div className="input-group">
                  <label>Monthly Rent (₹)</label>
                  <input
                    type="number"
                    name="rentAmount"
                    value={formData.rentAmount}
                    className="input"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Deposit (₹)</label>
                  <input
                    type="number"
                    name="depositAmount"
                    value={formData.depositAmount}
                    className="input"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {formData.propertyCategory === "PG" && (
            <div className="section pg">
              <h4>
                <Users size={20} /> PG Details
              </h4>
              <div className="row">
                <div className="input-group">
                  <label>Gender</label>
                  <select
                    name="genderRestriction"
                    value={formData.genderRestriction}
                    className="input"
                    onChange={handleChange}
                  >
                    <option>Boys Only</option>
                    <option>Girls Only</option>
                    <option>Co-ed</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Sharing Type</label>
                  <select
                    name="sharingType"
                    value={formData.sharingType}
                    className="input"
                    onChange={handleChange}
                  >
                    <option>Single</option>
                    <option>Double</option>
                    <option>Triple</option>
                    <option>Dormitory</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="input-group">
                  <label>Price per Bed</label>
                  <input
                    type="number"
                    name="pricePerBed"
                    value={formData.pricePerBed}
                    className="input"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Deposit per Bed</label>
                  <input
                    type="number"
                    name="depositPerBed"
                    value={formData.depositPerBed}
                    className="input"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-group">
                  <label>Total Beds</label>
                  <input
                    type="number"
                    name="totalBeds"
                    value={formData.totalBeds}
                    className="input"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Available Beds</label>
                  <input
                    type="number"
                    name="availableBeds"
                    value={formData.availableBeds}
                    className="input"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Food Included</label>
                  <select
                    name="foodIncluded"
                    value={formData.foodIncluded}
                    className="input"
                    onChange={handleChange}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <h4>
            <Wifi size={20} /> Amenities
          </h4>
          <div className="input-group full">
            <label>Amenities</label>
            <input
              name="amenities"
              value={formData.amenities}
              className="input"
              onChange={handleChange}
            />
          </div>

          <h4>
            <ImageIcon size={20} /> Property Images
          </h4>

          {/* Show Existing Server Images */}
          {existingImages.length > 0 && (
            <div style={{ marginBottom: "15px" }}>
              <label>Current Images on Server:</label>
              <div className="preview-grid">
                {existingImages.map((src, i) => (
                  <div key={i} className="preview-card">
                    <img src={src} alt="existing" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Images */}
          <div
            className="upload-box"
            onClick={() => document.getElementById("file-upload").click()}
          >
            <UploadCloud size={32} />
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <p>Click to add more images</p>
          </div>

          {/* Show New Image Previews */}
          {previewImages.length > 0 && (
            <div className="preview-grid">
              {previewImages.map((src, i) => (
                <div key={i} className="preview-card">
                  <img src={src} alt={`new-preview-${i}`} />
                  <button
                    type="button"
                    className="remove-img-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveNewImage(i);
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button className="btn" disabled={loading} type="submit">
            {loading ? "Saving Changes..." : "Save Updates"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPropertyForm;
