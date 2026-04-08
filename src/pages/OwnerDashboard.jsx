import { useState } from "react";
import OwnerSidebar from "../components/OwnerSidebar";
import OwnerCards from "../components/OwnerCards";
import BookingTable from "../components/BookingTable";
import OwnerPropertyTable from "../components/OwnerPropertyTable";
import PropertyForm from "../components/PropertyForm";
import ChartBox from "../components/Chartbox";
import "../dashboard.css";

const OwnerDashboard = () => {

  // ✅ PROPERTIES STATE
  const [properties, setProperties] = useState([
    {
      name: "Room A",
      location: "Delhi",
      price: "5000",
      image: "https://www.futuristarchitecture.com/wp-content/uploads/2019/02/SIMPLE-Hostel-1.jpg",
    },
  ]);

  // ✅ BOOKINGS STATE
  const [bookings, setBookings] = useState([
    {
      user: "Rahul",
      property: "Room A",
      date: "12 Mar",
      status: "pending",
    },
  ]);

  // ✅ ADD PROPERTY
  const addProperty = (p) => {
    setProperties([...properties, p]);
  };

  // ✅ DELETE PROPERTY
  const deleteProperty = (i) => {
    const updated = [...properties];
    updated.splice(i, 1);
    setProperties(updated);
  };

  // ✅ EDIT PROPERTY
  const editProperty = (i) => {
    const p = properties[i];
    deleteProperty(i);
    alert("Edit in form");
  };

  // ✅ ACCEPT BOOKING
  const acceptBooking = (i) => {
    const updated = [...bookings];
    updated[i].status = "approved";
    setBookings(updated);
  };

  // ✅ REJECT BOOKING
  const rejectBooking = (i) => {
    const updated = [...bookings];
    updated[i].status = "rejected";
    setBookings(updated);
  };

  return (
    <>
      <OwnerSidebar />

      <div className="main">
        <h1>Owner Dashboard</h1>

        <OwnerCards />

        <BookingTable 
          bookings={bookings}
          acceptBooking={acceptBooking}
          rejectBooking={rejectBooking}
        />

        <OwnerPropertyTable
          properties={properties}
          deleteProperty={deleteProperty}
          editProperty={editProperty}
        />

        <ChartBox />

        <PropertyForm addProperty={addProperty} />
      </div>
    </>
  );
};

export default OwnerDashboard;