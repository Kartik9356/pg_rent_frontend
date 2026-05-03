import React from "react";
import Topbar from "../components/Topbar";
import {
  Search,
  ShieldCheck,
  Home,
  MessageCircle,
  Zap,
  Users,
} from "lucide-react";

const Features = () => {
  const featureList = [
    {
      icon: <Search size={40} color="#007BFF" />,
      title: "Smart Search",
      description:
        "Find your perfect Flat or PG with our advanced location and amenity filters.",
    },
    {
      icon: <ShieldCheck size={40} color="#28A745" />,
      title: "Verified Listings",
      description:
        "Every property is reviewed and approved by our admin team to prevent fraud.",
    },
    {
      icon: <Home size={40} color="#FD7E14" />,
      title: "Zero Brokerage",
      description:
        "Connect directly with property owners and save thousands on broker fees.",
    },
    {
      icon: <MessageCircle size={40} color="#6F42C1" />,
      title: "Direct Communication",
      description:
        "Seamlessly chat with owners or tenants to finalize details quickly.",
    },
    {
      icon: <Zap size={40} color="#FFC107" />,
      title: "Fast Uploads",
      description:
        "Owners can list their properties in under 2 minutes with our streamlined form.",
    },
    {
      icon: <Users size={40} color="#17A2B8" />,
      title: "Roommate Matching",
      description:
        "Looking for a PG? Find listings that match your gender and sharing preferences.",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <Topbar />

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 20px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1
            style={{ fontSize: "2.5rem", color: "#222", marginBottom: "15px" }}
          >
            Why Choose Our Platform?
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#666",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            We bridge the gap between property owners and tenants with a secure,
            fast, and transparent rental experience.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {featureList.map((feature, index) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: "40px 30px",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                textAlign: "center",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div style={{ marginBottom: "20px" }}>{feature.icon}</div>
              <h3
                style={{
                  fontSize: "1.3rem",
                  color: "#333",
                  marginBottom: "15px",
                }}
              >
                {feature.title}
              </h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
