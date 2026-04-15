import Hero from "../components/Hero";
import Listings from "../components/Listing";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import Features from "../components/Features";
import InfoSection from "../components/InfoSection";
import HomeListing from "../components/HomeListing";

function Home() {
  return (
    <>
      {/* Note: Navbar and Modal are removed from here because App.jsx handles them globally! */}
      <Hero />
      <HomeListing />
      <Features />
      <Listings />
      <InfoSection />
      <CTA />
      <ContactForm />
      <Footer />
    </>
  );
}

export default Home;
