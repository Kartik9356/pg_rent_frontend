import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { 
  Plus, 
  MapPin, 
  Home, 
  Trash2, 
  UploadCloud, 
  Wifi, 
  Building2, 
  DollarSign, 
  Users,
  Image as ImageIcon
} from "lucide-react";

function AddPropertyForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Combine with existing images if total doesn't exceed 5
    const totalImages = images.length + files.length;
    if (totalImages > 5) {
      alert("Max 5 images allowed");
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);
    
    // Create new previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    
    // Revoke the URL to avoid memory leaks
    URL.revokeObjectURL(previewImages[index]);
    
    setImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };

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
        })
      );

      submitData.append(
        "location",
        JSON.stringify({
          type: "Point",
          coordinates: [
            Number(formData.longitude),
            Number(formData.latitude),
          ],
        })
      );

      submitData.append(
        "generalAmenities",
        JSON.stringify(formData.amenities.split(",").map(a => a.trim()))
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
          })
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
          ])
        );
      }

      images.forEach((file) => submitData.append("images", file));

      await api.post("/properties", submitData);

      alert("Property Uploaded 🚀");
      navigate("/owner");
    } catch (err) {
      setError("Upload failed. Please check your data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">List Your Property</h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="form">
          <h4><Building2 size={20} /> Basic Details</h4>
          <div className="row">
            <div className="input-group full">
              <label>Property Title</label>
              <input 
                name="title" 
                placeholder="Ex. Luxury 2BHK in Mumbai" 
                onChange={handleChange} 
                className="input" 
                required 
              />
            </div>
          </div>
          <div className="row">
            <div className="input-group">
              <label>Property Type</label>
              <select name="propertyCategory" onChange={handleChange} className="input">
                <option value="Flat">🏠 Flat</option>
                <option value="PG">🏢 PG / Hostel</option>
              </select>
            </div>
            {formData.propertyCategory === "Flat" && (
              <>
                <div className="input-group">
                  <label>BHK Type</label>
                  <select name="bhkType" className="input" onChange={handleChange}>
                    <option>1BHK</option>
                    <option>2BHK</option>
                    <option>3BHK</option>
                    <option>4BHK+</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Furnishing</label>
                  <select name="furnishing" className="input" onChange={handleChange}>
                    <option>Fully Furnished</option>
                    <option>Semi Furnished</option>
                    <option>Unfurnished</option>
                  </select>
                </div>
              </>
            )}
          </div>

          <h4><MapPin size={20} /> Location Details</h4>
          <div className="input-group full">
            <label>Street Address</label>
            <input name="street" placeholder="Street" className="input" onChange={handleChange} />
          </div>

          <div className="row">
            <div className="input-group">
              <label>City</label>
              <input name="city" placeholder="City" className="input" onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>State</label>
              <input name="state" placeholder="State" className="input" onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Pincode</label>
              <input name="pincode" placeholder="Pincode" className="input" onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label>Latitude</label>
              <input name="latitude" placeholder="Ex. 19.076" className="input" onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Longitude</label>
              <input name="longitude" placeholder="Ex. 72.877" className="input" onChange={handleChange} />
            </div>
          </div>

          {formData.propertyCategory === "Flat" && (
            <div className="section flat">
              <h4><DollarSign size={20} /> Pricing</h4>
              <div className="row">
                <div className="input-group">
                  <label>Monthly Rent (₹)</label>
                  <input name="rentAmount" placeholder="Ex. 25000" className="input" onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Deposit (₹)</label>
                  <input name="depositAmount" placeholder="Ex. 50000" className="input" onChange={handleChange} />
                </div>
              </div>
            </div>
          )}

          {formData.propertyCategory === "PG" && (
            <div className="section pg">
              <h4><Users size={20} /> PG Details</h4>
              <div className="row">
                <div className="input-group">
                  <label>Sharing Type</label>
                  <select name="sharingType" className="input" onChange={handleChange}>
                    <option>Single</option>
                    <option>Double</option>
                    <option>Triple</option>
                    <option>Four+</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Price per Bed (₹)</label>
                  <input name="pricePerBed" placeholder="Rent per bed" className="input" onChange={handleChange} />
                </div>
              </div>
              <div className="row">
                <div className="input-group">
                  <label>Total Beds</label>
                  <input name="totalBeds" placeholder="Capacity" className="input" onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Food Included</label>
                  <select name="foodIncluded" className="input" onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <h4><Wifi size={20} /> Amenities</h4>
          <div className="input-group full">
            <label>Amenities (Comma separated)</label>
            <input name="amenities" placeholder="WiFi, AC, TV, Fridge, Gym..." className="input" onChange={handleChange} />
          </div>

          <h4><ImageIcon size={20} /> Property Images</h4>
          <div 
            className="upload-box" 
            onClick={() => document.getElementById('file-upload').click()}
          >
            <UploadCloud size={32} />
            <input 
              id="file-upload"
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleFileChange} 
              style={{ display: 'none' }}
            />
            <p>Click to upload or drag & drop</p>
            <span>Max 5 images allowed (JPG, PNG)</span>
          </div>

          {/* Preview */}
          {previewImages.length > 0 && (
            <div className="preview-grid">
              {previewImages.map((src, i) => (
                <div key={i} className="preview-card">
                  <img src={src} alt={`preview-${i}`} />
                  <button 
                    type="button" 
                    className="remove-img-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(i);
                    }}
                    title="Remove image"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button className="btn" disabled={loading} type="submit">
            {loading ? "Uploading..." : "Publish Property"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPropertyForm;