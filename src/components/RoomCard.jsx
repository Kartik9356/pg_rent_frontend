function RoomCard({ img, price, desc }) {
  return (
    <div className="card">
      <img src={img} />
      <div className="card-body">
        <h4>{price}</h4>
        <p>{desc}</p>
        <button>View Details</button>
      </div>
    </div>
  );
}

export default RoomCard;