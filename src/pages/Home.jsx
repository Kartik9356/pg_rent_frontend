import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import HomeListing from "../components/HomeListing";
import Features from "../components/Features";
import InfoSection from "../components/InfoSection";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import "../style.css"; // ✅ import CSS

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isOwner = user?.role === "owner";
  const isSeeker = user?.role === "seeker";

  return (
    <>
      {/* Owner Banner */}
      {isOwner ? (
        <section className="owner-banner">
          <h1 className="owner-title">Welcome Back, Owner!</h1>

          <p className="owner-subtitle">
            Ready to list a new property and reach thousands of seekers?
          </p>

          <Link to="/owner" className="owner-btn">
            Go to My Dashboard
          </Link>
        </section>
      ) : (
        <Hero />
      )}

      {/* Listings */}
      <HomeListing />

      {/* Guest-only sections */}
      {!user && (
        <>
          <Features />
          <InfoSection />
          <CTA />
        </>
      )}


    </>
  );
}

export default Home;