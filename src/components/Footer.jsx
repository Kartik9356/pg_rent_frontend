function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-col brand">
          <h2 className="logo-text">Room Buddy</h2>

          <p className="footer-desc">
            Find your perfect PG, hostel or rental home with comfort,
            safety and zero brokerage.
          </p>

          <div className="social-icons">
            <a href="#" className="icon">🌐</a>
            <a href="#" className="icon">📸</a>
            <a href="#" className="icon">💼</a>
          </div>
        </div>

        {/* LINKS */}
        <div className="footer-col">
          <h3>Explore</h3>
          <ul>
            <li><a href="#">PG for Students</a></li>
            <li><a href="#">Hostels</a></li>
            <li><a href="#">Rental Rooms</a></li>
            <li><a href="#">Flats</a></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">How it Works</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-col newsletter-col">
          <h3>Stay Updated</h3>
          <p>Get latest rooms & offers</p>

          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 PG Rent • Designed with ❤️</p>
      </div>

    </footer>
  );
}

export default Footer;