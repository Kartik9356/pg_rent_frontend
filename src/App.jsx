import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom"; // 🔥 Import Router here
import AppRouter from "./routes/AppRouter";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import api from "./api/api";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/users/profile");
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (err) {
        // Handle error implicitly
        setUser(null);
        localStorage.removeItem("user");
      }
    };
    checkAuth();
  }, []);

  return (
    // 🔥 Wrap the ENTIRE App in the Router
    <Router>
      <div className="App">
        <Navbar
          openLogin={() => setShowLogin(true)}
          openSignup={() => setShowSignup(true)}
          user={user}
          setUser={setUser}
        />

        {showLogin && (
          <Modal type="login" closeModal={() => setShowLogin(false)} />
        )}

        {showSignup && (
          <Modal type="signup" closeModal={() => setShowSignup(false)} />
        )}

        <AppRouter />
      </div>
    </Router>
  );
}

export default App;
