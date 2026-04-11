import React, { useState } from "react";
import { requestRegisterOTP, requestLoginOTP, verifyOTP } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Modal({ type, closeModal }) {
  const [step, setStep] = useState("form"); // form | otp

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "seeker", // ✅ Added role with default
    method: "email", // default OTP method
    otp: "",
  });

  const navigate = useNavigate();

  // 🔥 Handle Submit (Register/Login)
  const handleSubmit = async () => {
    try {
      if (type === "signup") {
        // ✅ Matches exact /users/register payload
        await requestRegisterOTP({
          name: form.name,
          email: form.email,
          phone: form.phone,
          role: form.role,
          method: form.method,
        });
      } else {
        // ✅ Matches exact /users/login payload
        await requestLoginOTP({
          email: form.email,
          method: form.method,
        });
      }

      alert(`OTP Sent to your ${form.method}!`);
      setStep("otp");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error processing request");
    }
  };

  // 🔥 Verify OTP
  const handleVerify = async () => {
    try {
      // ✅ Matches exact /users/verify payload
      const res = await verifyOTP({
        email: form.email,
        otp: form.otp,
      });

      // ✅ FIXED: According to your API doc, the response IS the user object directly, not res.data.user
      const user = res.data;

      // ✅ Store user info locally for UI state (Remember: JWT is safe in HTTP-only cookie!)
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login Successful 🎉");
      closeModal();

      // ✅ Redirect based on the user's role returned from the database
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "owner") {
        navigate("/owner");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div
      className="modal"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div
        className="modal-content"
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          minWidth: "300px",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>
            {step === "otp"
              ? "Enter OTP"
              : type === "login"
                ? "Login"
                : "Signup"}
          </h2>
          <button
            onClick={closeModal}
            style={{
              cursor: "pointer",
              background: "none",
              border: "none",
              fontSize: "1.2rem",
            }}
          >
            ✖
          </button>
        </div>

        {/* FORM STEP */}
        {step === "form" && (
          <>
            {type === "signup" && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Phone Number (+91...)"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {/* ✅ Added Role Selector for Signup */}
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="seeker">
                    I am looking for a room (Seeker)
                  </option>
                  <option value="owner">
                    I want to list my property (Owner)
                  </option>
                </select>
              </>
            )}

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            {/* ✅ Added OTP Delivery Method Selector */}
            <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
              <label>
                <input
                  type="radio"
                  value="email"
                  checked={form.method === "email"}
                  onChange={(e) => setForm({ ...form, method: e.target.value })}
                />{" "}
                Email OTP
              </label>
              <label>
                <input
                  type="radio"
                  value="sms"
                  checked={form.method === "sms"}
                  onChange={(e) => setForm({ ...form, method: e.target.value })}
                />{" "}
                SMS OTP
              </label>
            </div>

            <button
              onClick={handleSubmit}
              style={{ padding: "10px", marginTop: "10px", cursor: "pointer" }}
            >
              Send OTP
            </button>
          </>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <>
            <p style={{ fontSize: "0.9rem", color: "gray" }}>
              Sent to{" "}
              {form.method === "email"
                ? form.email
                : form.phone || "your phone"}
            </p>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              value={form.otp}
              onChange={(e) => setForm({ ...form, otp: e.target.value })}
            />

            <button
              onClick={handleVerify}
              style={{ padding: "10px", marginTop: "10px", cursor: "pointer" }}
            >
              Verify & Login
            </button>
            <button
              onClick={() => setStep("form")}
              style={{
                padding: "10px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              Go Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
