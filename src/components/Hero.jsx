function Hero() {
    return (
        <section className="hero" id="home">
            <div className="hero-content">
                <h1>Find Your Perfect Room</h1>
                <p>PG | Hostel | Rental Homes for Comfortable Living</p>

                <div className="search-box">
                    <input type="text" placeholder="Enter Location (e.g. Nashik)" />

                    <select>
                        <option value="">Budget</option>
                        <option>₹3000 - ₹5000</option>
                        <option>₹5000 - ₹8000</option>
                        <option>₹8000+</option>
                    </select>

                    <select>
                        <option value="">Room Type</option>
                        <option>PG</option>
                        <option>Hostel</option>
                        <option>Single Room</option>
                        <option>Shared Room</option>
                    </select>

                    <button><a href="#rooms">Search</a></button>
                </div>
            </div>
        </section>
    );
}

export default Hero;