import logo from "../assets/logo.png";

function Navbar({ openLogin, openSignup }) {
  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="Room Buddy Logo" />
      </div>
      

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#rooms">Rooms</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="auth-buttons">
        <button className="login-btn" onClick={openLogin}>Login</button>
        <button className="signup-btn" onClick={openSignup}>Signup</button>
      </div>
    </nav>
  );
}

export default Navbar;