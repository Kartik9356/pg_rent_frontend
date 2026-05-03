import React, { useState } from "react";
import Topbar from "../components/Topbar";
import { MapPin, Phone, Mail, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the data to your backend API
    setStatus("Sending...");

    setTimeout(() => {
      setStatus("Message sent successfully! We will get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setStatus(""), 4000);
    }, 1500);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <Topbar />

      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 20px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1
            style={{ fontSize: "2.5rem", color: "#222", marginBottom: "15px" }}
          >
            Get in Touch
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#666" }}>
            Have a question or need support? We are here to help.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            background: "white",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          {/* Contact Information Sidebar */}
          <div
            style={{
              flex: "1 1 350px",
              background: "#111",
              color: "white",
              padding: "50px 40px",
            }}
          >
            <h3
              style={{
                fontSize: "1.8rem",
                marginBottom: "30px",
                color: "#d4af37",
              }}
            >
              Contact Info
            </h3>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "15px",
                marginBottom: "30px",
              }}
            >
              <MapPin size={24} color="#d4af37" style={{ marginTop: "3px" }} />
              <div>
                <h4 style={{ margin: "0 0 5px 0", fontSize: "1.1rem" }}>
                  Our Office
                </h4>
                <p style={{ margin: 0, color: "#aaa", lineHeight: "1.6" }}>
                  Sinhgad College Campus
                  <br />
                  Pune, Maharashtra 411041
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "15px",
                marginBottom: "30px",
              }}
            >
              <Phone size={24} color="#d4af37" style={{ marginTop: "3px" }} />
              <div>
                <h4 style={{ margin: "0 0 5px 0", fontSize: "1.1rem" }}>
                  Call Us
                </h4>
                <p style={{ margin: 0, color: "#aaa" }}>+91 98765 43210</p>
              </div>
            </div>

            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "15px" }}
            >
              <Mail size={24} color="#d4af37" style={{ marginTop: "3px" }} />
              <div>
                <h4 style={{ margin: "0 0 5px 0", fontSize: "1.1rem" }}>
                  Email Us
                </h4>
                <p style={{ margin: 0, color: "#aaa" }}>support@rentmate.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ flex: "2 1 500px", padding: "50px 40px" }}>
            <h3
              style={{
                fontSize: "1.8rem",
                marginBottom: "20px",
                color: "#222",
              }}
            >
              Send a Message
            </h3>

            {status && (
              <div
                style={{
                  padding: "12px",
                  marginBottom: "20px",
                  borderRadius: "6px",
                  background: status.includes("success")
                    ? "#d4edda"
                    : "#e2e3e5",
                  color: status.includes("success") ? "#155724" : "#383d41",
                }}
              >
                {status}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 200px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "500",
                      color: "#444",
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "1rem",
                    }}
                  />
                </div>
                <div style={{ flex: "1 1 200px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "500",
                      color: "#444",
                    }}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "1rem",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                    color: "#444",
                  }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                    color: "#444",
                  }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    resize: "vertical",
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "Sending..."}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "14px 24px",
                  background: "#111",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  marginTop: "10px",
                  transition: "background 0.2s",
                }}
              >
                <Send size={20} />{" "}
                {status === "Sending..." ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
