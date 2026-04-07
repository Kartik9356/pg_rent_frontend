const Card = ({ title, value }) => {
  return (
    <div className="bg-[#fffaf0] p-5 border-t-4 border-[#d4af37]">
      <h4 className="text-sm text-[#4b2e2e]">{title}</h4>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
};

const Cards = () => {
  return (
    <div className="grid grid-cols-4 gap-5 mt-5">
      <Card title="Properties" value="3" />
      <Card title="Bookings" value="5" />
      <Card title="Users" value="10" />
      <Card title="Revenue" value="₹30,000" />
    </div>
  );
};

export default Cards;