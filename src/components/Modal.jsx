import React, { useState } from "react";
import { requestRegisterOTP, requestLoginOTP, verifyOTP } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Modal({ type, closeModal }) {
  const [step, setStep] = useState("form"); // form | otp

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    method: "email",
    otp: ""
  });

  const navigate = useNavigate();

  // 🔥 Handle Submit (Register/Login)
  const handleSubmit = async () => {
    try {
      if (type === "signup") {
        await requestRegisterOTP(form);
      } else {
        await requestLoginOTP({
          email: form.email,
          method: form.method
        });
      }

      alert("OTP Sent!");
      setStep("otp");

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error");
    }
  };

  // 🔥 Verify OTP
 const handleVerify = async () => {
  try {
    const res = await verifyOTP({
      email: form.email,
      otp: form.otp
    });

    // ✅ THIS is where JSON is USED
    const user = res.data.user;

    // ✅ store user
    localStorage.setItem("user", JSON.stringify(user));

    alert("Login Successful 🎉");
    closeModal();

    // ✅ redirect based on role
    if (user.role === "admin") {
      navigate("/admin");
    } else if (user.role === "owner") {
      navigate("/owner");
    } else {
      navigate("/");
    }

  } catch {
    alert("Invalid OTP");
  }
};

  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-content">

        {/* TITLE */}
        <h2>
          {step === "otp"
            ? "Enter OTP"
            : type === "login"
            ? "Login"
            : "Signup"}
        </h2>

        {/* FORM STEP */}
        {step === "form" && (
          <>
            {type === "signup" && (
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            )}

            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            {type === "signup" && (
              <input
                type="text"
                placeholder="Phone"
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            )}

            <button onClick={handleSubmit}>
              Send OTP
            </button>
          </>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              onChange={(e) =>
                setForm({ ...form, otp: e.target.value })
              }
            />

            <button onClick={handleVerify}>
              Verify OTP
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Modal;