import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get("/properties");

        const selected = res.data.data.find(p => p._id === id);
        setProperty(selected);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) return <p className="p-6">Loading...</p>;

  return (
    <div className="bg-[#f8f6ef] min-h-screen p-6">
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-semibold">
          {property.title}
        </h1>

        <p className="text-gray-500 mb-3">
          📍 Pune • Students & Professionals
        </p>

        {/* BADGES */}
        <div className="flex gap-2 mb-4">
          <span className="bg-yellow-600 text-white px-4 py-1 rounded-full text-sm">Rent</span>
          <span className="bg-yellow-600 text-white px-4 py-1 rounded-full text-sm">PG</span>
          <span className="bg-yellow-600 text-white px-4 py-1 rounded-full text-sm">Boys/Girls</span>
        </div>

        {/* IMAGE */}
        <div className="cursor-pointer">
          <img
            src={property.images?.[0]}
            onClick={() => setSelectedImg(property.images[0])}
            className="w-full rounded-xl hover:scale-105 transition"
          />
        </div>

        {/* MODAL */}
        {selectedImg && (
          <div
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
          >
            <img src={selectedImg} className="max-w-[90%] rounded-xl" />
          </div>
        )}

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">

          {/* LEFT SIDE */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-gray-600 mb-4">
              Perfect stay for students and professionals with PG, rooms & flats.
            </p>

            {/* OWNER */}
            <h3 className="font-semibold mt-4">Owner</h3>
            <div className="flex items-center gap-3 mt-2">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium">{property.ownerId?.name}</p>
                <p className="text-sm text-gray-500">📞 {property.ownerId?.phone}</p>
              </div>
            </div>

            {/* REVIEWS */}
            <h3 className="font-semibold mt-6">Reviews</h3>
            <p className="text-gray-500">⭐ 5 - Great place, very clean!</p>
            <p className="text-gray-500">⭐ 4 - Good location</p>

            {/* MAP */}
            <h3 className="font-semibold mt-6">Location</h3>
            <iframe
              src="https://maps.google.com/maps?q=pune&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[300px] rounded-xl mt-2"
            ></iframe>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white p-6 rounded-xl shadow sticky top-6 h-fit">
            <h2 className="text-xl font-semibold">
              ₹{property.flatDetails?.rentAmount || 5000}/month
            </h2>

            <p className="text-gray-500">Deposit ₹36,000</p>

            <button className="w-full bg-yellow-600 text-white py-2 rounded mt-3">
              Chat Owner
            </button>

            <button className="w-full bg-gray-800 text-white py-2 rounded mt-2">
              Book Visit
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;