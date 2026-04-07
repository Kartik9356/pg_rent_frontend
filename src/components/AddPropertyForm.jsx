import { useState } from "react";

const AddPropertyForm = ({ addProperty }) => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    type: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    addProperty(form);
    setForm({ name: "", location: "", price: "", type: "", image: "" });
  };

  return (
    <div className="bg-white p-5 mt-5 border">
      <h3>Add Property</h3>

      <div className="flex gap-5 mt-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border-b w-full p-2"
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="border-b w-full p-2"
        />
      </div>

      <div className="flex gap-5 mt-3">
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border-b w-full p-2"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border-b w-full p-2"
        >
          <option value="">Select Type</option>
          <option value="PG">PG</option>
          <option value="Flat">Flat</option>
        </select>
      </div>

      {/* Dynamic Fields */}
      {form.type === "PG" && (
        <input
          placeholder="Beds Available"
          className="border-b w-full p-2 mt-3"
        />
      )}

      {form.type === "Flat" && (
        <input placeholder="BHK" className="border-b w-full p-2 mt-3" />
      )}

      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="border-b w-full p-2 mt-3"
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-[#d4af37] px-4 py-2"
      >
        Add Property
      </button>
    </div>
  );
};

export default AddPropertyForm;