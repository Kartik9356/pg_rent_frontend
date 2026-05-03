import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import HomeListing from "../components/HomeListing";
import Features from "../components/Features";
import InfoSection from "../components/InfoSection";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  // Check if a user is logged in, and grab their role
  const user = JSON.parse(localStorage.getItem("user"));
  const isOwner = user?.role === "owner";
  const isSeeker = user?.role === "seeker";

  return (
    <>
      {/* 🚀 If they are an owner, show a special banner instead of the search Hero */}
      {isOwner ? (
        <section
          style={{
            padding: "100px 20px",
            textAlign: "center",
            background: "#111",
            color: "white",
            minHeight: "40vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{ fontSize: "3rem", marginBottom: "15px", color: "#d4af37" }}
          >
            Welcome Back, Owner!
          </h1>
          <p
            style={{ fontSize: "1.2rem", marginBottom: "30px", color: "#aaa" }}
          >
            Ready to list a new property and reach thousands of seekers?
          </p>
          <Link
            to="/owner"
            style={{
              padding: "15px 30px",
              background: "#d4af37",
              color: "black",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            Go to My Dashboard
          </Link>
        </section>
      ) : (
        <Hero /> // Show standard search hero for Guests and Seekers
      )}

      {/* The live properties carousel */}
      <HomeListing />

      {/* 🚀 Hide generic info sections if they are already a registered user */}
      {!user && (
        <>
          <Features />
          <InfoSection />
          <CTA />
        </>
      )}

      <Footer />
    </>
  );
}

export default Home;
