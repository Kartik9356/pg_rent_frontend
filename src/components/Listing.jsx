import RoomCard from "./RoomCard";

function Listings() {
  const rooms = [
    {
      img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      price: "₹5000 / Month",
      desc: "Cozy Single Room"
    },
    {
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      price: "₹7000 / Month",
      desc: "Modern PG"
    },
     {
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      price: "₹7000 / Month",
      desc: "Modern PG"
    },
    {
      img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      price: "₹5000 / Month",
      desc: "Cozy Single Room"
    },
    {
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      price: "₹7000 / Month",
      desc: "Modern PG"
    },
     {
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      price: "₹7000 / Month",
      desc: "Modern PG"
    },
  ];

  return (
    <section id="rooms">
      <h2 className="section-title">Featured Rooms</h2>

      <div className="listings">
        {rooms.map((room, index) => (
          <RoomCard key={index} {...room} />
        ))}
      </div>
    </section>
  );
}

export default Listings;