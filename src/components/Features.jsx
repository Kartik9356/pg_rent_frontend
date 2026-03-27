function Features() {
  const features = [
    {
      img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      title: "Verified Rooms",
      desc: "Trusted & safe properties"
    },
    {
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      title: "Budget Friendly",
      desc: "Luxury within your budget"
    },
    {
      img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      title: "Comfort Living",
      desc: "Feels like home always"
    }
  ];

  return (
    <section id="features">
      <h2 className="section-title">Why Room Buddy?</h2>

      <div className="features">
        {features.map((item, index) => (
          <div className="feature" key={index}>
            
            <div className="circle-img">
              <img src={item.img} alt={item.title} />
            </div>

            <h3>{item.title}</h3>
            <p>{item.desc}</p>

          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;