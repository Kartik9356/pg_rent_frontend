function CTA() {
  const handleClick = () => {
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="home-cta">
      <h2>Find Comfort. Find Home.</h2>
      <button onClick={handleClick} className="home-cta-btn">Get Started</button>
    </section>
  );
}

export default CTA;