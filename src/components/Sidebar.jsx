const Sidebar = () => {
  return (
    <div className="w-[220px] fixed h-full bg-gradient-to-b from-[#4b2e2e] to-[#2e1b1b] text-white p-5">
      <h2 className="text-center text-xl mb-6">Room Buddy</h2>

      {["Dashboard", "Properties", "Bookings", "Users"].map((item, i) => (
        <div
          key={i}
          className={`p-3 cursor-pointer ${
            i === 0 ? "bg-white/10 border-l-4 border-[#d4af37]" : ""
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;