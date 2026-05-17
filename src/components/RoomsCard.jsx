import { useNavigate } from "react-router-dom";


function RoomsCard({ _id, title, price, rating, images }) {
    const navigate = useNavigate();
    return (

        <div className="min-w-[260px] max-w-[260px] cursor-pointer">
            <div onClick={() => navigate(`/property/${_id}`)}></div>
            <div className="relative">
                <img
                    src={images?.[0]}
                    alt={title}
                    className="w-full h-[180px] object-cover rounded-2xl"
                />

                <div className="absolute top-2 right-2 bg-white p-2 rounded-full shadow">
                    ❤️
                </div>

                <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded-full text-sm shadow">
                    Guest favourite
                </div>
            </div>

            <div className="mt-2">
                <h3 className="font-semibold text-sm">{title}</h3>
                <p className="text-gray-600 text-sm">
                    {price} • ⭐ {rating}
                </p>
            </div>
        </div>

    );
}

export default RoomsCard;