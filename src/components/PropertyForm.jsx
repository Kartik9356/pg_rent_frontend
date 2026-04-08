import { useState } from "react";

const PropertyForm = ({ addProperty }) => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    addProperty(form);
    setForm({ name: "", location: "", price: "", image: "" });
  };

  return (
    <div className="form-section">
      <h3>Add Property</h3>

      <div className="form-row">
        <input id="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input id="location" value={form.location} onChange={handleChange} placeholder="Location" />
      </div>

      <div className="form-row">
        <input id="price" value={form.price} onChange={handleChange} placeholder="Price" />
        <input id="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
      </div>

      <button onClick={handleSubmit}>Add Property</button>
    </div>
  );
};

export default PropertyForm;