function InfoSection() {
  return (
    <section className="info-section">

      <div className="info-container">

        {/* LEFT CONTENT */}
        <div className="info-card">
          <h2>Find the Perfect Room for You</h2>
          <p className="subtext">
            Smart living solutions for students & professionals
          </p>

          <div className="info-item">
            <div className="info-icon">🏠</div>
            <div>
              <h4>Easy Booking</h4>
              <p>Book rooms quickly with verified listings.</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">💰</div>
            <div>
              <h4>No Brokerage</h4>
              <p>Save money with zero hidden charges.</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📍</div>
            <div>
              <h4>Prime Locations</h4>
              <p>Stay near your college or office.</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="info-image">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
            alt="Room"
          />
        </div>

      </div>

    </section>
  );
}

export default InfoSection;