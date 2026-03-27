import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Listings from "../components/Listing";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import Features from "../components/Features";
import InfoSection from "../components/InfoSection";
import { useState } from "react";
import Modal from "../components/Modal";

function Home() {
    const [modalType, setModalType] = useState(null);

    const openLogin = () => setModalType("login");
    const openSignup = () => setModalType("signup");
    const closeModal = () => setModalType(null);

    return (



        <>
            <Navbar openLogin={openLogin} openSignup={openSignup} />

            {/* Show Modal */}
            {modalType && (
                <Modal type={modalType} closeModal={closeModal} />
            )}
            <Hero />
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

