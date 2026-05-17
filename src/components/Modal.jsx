import React, { useState } from "react";
import { requestRegisterOTP, requestLoginOTP, verifyOTP } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Modal({ type, closeModal, setType }) {
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });


  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "seeker",
    method: "email",
    otp: "",
  });

  const navigate = useNavigate();

  // 🔥 SHOW MESSAGE
  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
  };

  // 🔥 SEND OTP
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (type === "signup") {
        await requestRegisterOTP({
          name: form.name,
          email: form.email,
          phone: form.phone,
          role: form.role,
          method: form.method,
        });
      } else {
        await requestLoginOTP({
          email: form.email,
          method: form.method,
        });
      }

      showMessage(`OTP sent successfully via ${form.method}`);
      setStep("otp");
    } catch (err) {
      showMessage(
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔥 VERIFY OTP
  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await verifyOTP({
        email: form.email,
        otp: form.otp,
      });

      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));

      showMessage("Login Successful 🎉");

      setTimeout(() => {
        closeModal();

        if (user.role === "admin") navigate("/admin");
        else if (user.role === "owner") navigate("/owner");
        else navigate("/");
      }, 1000);
    } catch (err) {
      showMessage(
        err.response?.data?.message || "Invalid OTP",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        {/* MESSAGE */}
        {message.text && (
          <div className={`toast ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* HEADER */}
        <div className="modal-header">
          <h2>
            {step === "otp"
              ? "Enter OTP"
              : type === "login"
              ? "Login"
              : "Signup"}
          </h2>
          <button onClick={closeModal} className="close-btn">✖</button>
        </div>

        {/* FORM */}
        {step === "form" && (
          <>
            {type === "signup" && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />

                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value })
                  }
                >
                  <option value="seeker">Seeker</option>
                  <option value="owner">Owner</option>
                </select>
              </>
            )}

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="email"
                  checked={form.method === "email"}
                  onChange={(e) =>
                    setForm({ ...form, method: e.target.value })
                  }
                />
                Email OTP
              </label>

              <label>
                <input
                  type="radio"
                  value="sms"
                  checked={form.method === "sms"}
                  onChange={(e) =>
                    setForm({ ...form, method: e.target.value })
                  }
                />
                SMS OTP
              </label>
            </div>

            <button
              onClick={handleSubmit}
              className="primary-btn"
              disabled={loading}
            >
              {loading ? <span className="loader"></span> : "Send OTP"}
            </button>
<<<<<<< Updated upstream
=======

            {/* Quick toggle between login and signup for owners */}
            <p
              style={{
                textAlign: "center",
                marginTop: "15px",
                fontSize: "0.9rem",
                cursor: "pointer",
                color: "#007bff",
              }}
              onClick={() => {
                closeModal();

                if (type === "login") {
                  navigate("/owner/signup");
                } else {
                  navigate("/owner/login");
                }
              }}
            >
              {type === "login"
                ? "New Owner? Sign Up Here"
                : "Already an Owner? Login"}
            </p>
>>>>>>> Stashed changes
          </>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <>
            <p className="otp-text">
              Sent to{" "}
              {form.method === "email"
                ? form.email
                : form.phone || "your phone"}
            </p>

            <input
              type="text"
              placeholder="Enter OTP"
              maxLength={6}
              value={form.otp}
              onChange={(e) =>
                setForm({ ...form, otp: e.target.value })
              }
            />

            <button
              onClick={handleVerify}
              className="primary-btn"
              disabled={loading}
            >
              {loading ? <span className="loader"></span> : "Verify & Login"}
            </button>

            <button
              onClick={() => setStep("form")}
              className="secondary-btn"
            >
              Go Back
            </button>
          </>
        )}
      </div>
    </div >
  );
}

export default Modal;