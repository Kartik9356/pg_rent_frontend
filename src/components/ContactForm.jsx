function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Visit Scheduled Successfully!");
  };

  return (
    <section id="contact" className="cta">
      <h2 style={{fontSize: "xx-large"}}>Schedule a Visit</h2>
      <p style={{fontSize: "xx-large"}}>Book a visit and explore your future home</p>
      <br />

      <form className="contact-form" onSubmit={handleSubmit}>

        <div className="input-group">
          <input type="text" placeholder="Full Name" required />
        </div>

        <div className="input-group">
          <input type="tel" placeholder="Phone Number" required />
        </div>

        <div className="input-group">
          <input type="email" placeholder="Email Address" required />
        </div>

        <div className="input-group">
          <input type="date" required />
        </div>

        <div className="input-group">
          <select required>
            <option value="">Select Time Slot</option>
            <option>Morning (9AM - 12PM)</option>
            <option>Afternoon (12PM - 4PM)</option>
            <option>Evening (4PM - 8PM)</option>
          </select>
        </div>

        <div className="input-group">
          <select required>
            <option value="">Room Type</option>
            <option>PG</option>
            <option>Hostel</option>
            <option>Single Room</option>
            <option>Shared Room</option>
          </select>
        </div>

        <div className="input-group">
          <textarea placeholder="Any Message..." rows="4" />
        </div>

        <button type="submit">Schedule Visit</button>

      </form>
    </section>
  );
}

export default ContactForm;