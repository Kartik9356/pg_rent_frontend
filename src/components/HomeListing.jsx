import { useRef, useEffect, useState } from "react";
import RoomsCard from "./RoomsCard";
// import { getProperties } from "../api/property";
import "../index.css"; // For
import "../data/roomslist"; // For dummy data (if needed)
import { roomslist } from "../data/roomslist";

function HomeListing() {
  const scrollRef = useRef();

  const [rooms, setRooms] = useState([]); // ✅ state added

  // 👇 API CALL HERE
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getProperties();
//         setRooms(res.data); // 👈 IMPORTANT (data.data from API)
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };
//     fetchData();
//   }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="p-6 relative">
      <br />
      <h2 className="section-title">Popular Home In Pune</h2>

      {/* LEFT BUTTON */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 z-10 bg-white p-2 rounded-full shadow"
      >
        ◀
      </button>

      {/* SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {roomslist.map((room) => (
          <RoomsCard key={room._id} {...room} />
        ))}
      </div>

      {/* RIGHT BUTTON */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 z-10 bg-white p-2 rounded-full shadow"
      >
        ▶
      </button>
    </div>
  );
}

export default HomeListing;