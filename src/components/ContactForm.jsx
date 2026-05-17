import React, { useState } from "react";
import axios from "axios";
import "../style.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    date: "",
    timeSlot: "",
    roomType: "",
    message: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );

      alert("Visit Scheduled Successfully!");

      console.log(response.data);

      // Clear Form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        date: "",
        timeSlot: "",
        roomType: "",
        message: "",
      });
    } catch (error) {
      console.log(error);

      alert("Failed to schedule visit");
    }
  };

  return (
    <section id="contact" className="cta">
      <h2 className="cta-title">Schedule a Visit</h2>

      <p className="cta-subtitle">
        Book a visit and explore your future home
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="input-group">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div className="input-group">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Date */}
        <div className="input-group">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Time Slot */}
        <div className="input-group">
          <select
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            required
          >
            <option value="">Select Time Slot</option>

            <option>Morning (9AM - 12PM)</option>

            <option>Afternoon (12PM - 4PM)</option>

            <option>Evening (4PM - 8PM)</option>
          </select>
        </div>

        {/* Room Type */}
        <div className="input-group">
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            required
          >
            <option value="">Room Type</option>

            <option>PG</option>

            <option>Hostel</option>

            <option>Single Room</option>

            <option>Shared Room</option>
          </select>
        </div>

        {/* Message */}
        <div className="input-group">
          <textarea
            name="message"
            placeholder="Any Message..."
            rows="4"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Schedule Visit
        </button>
      </form>
    </section>
  );
}

export default ContactForm;