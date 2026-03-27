function CTA() {
  const handleClick = () => {
    document.getElementById("contact").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="cta">
      <h2>Find Comfort. Find Home.</h2>
      <button onClick={handleClick}>Get Started</button>
    </section>
  );
}

export default CTA;