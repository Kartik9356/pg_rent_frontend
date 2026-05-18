import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom"; // 🔥 Import Router here
import AppRouter from "./routes/AppRouter";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import api from "./api/api";
import Footer from "./components/Footer";

function App() {
  const [modalType, setModalType] = useState(null); // 'login' | 'signup' | null
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
          openLogin={() => setModalType("login")}
          openSignup={() => setModalType("signup")}
          user={user}
          setUser={setUser}
        />

        {modalType && (
          <Modal
            type={modalType}
            closeModal={() => setModalType(null)}
            setType={setModalType}
          />
        )}

        <AppRouter />
        {/* ✅ Footer on all pages */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;
