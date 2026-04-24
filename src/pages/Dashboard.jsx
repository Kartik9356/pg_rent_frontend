import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Cards from "../components/Cards";
import ChartBox from "../components/Chartbox";
import PropertyTable from "../components/PropertyTable";
import PropertyForm from "../components/PropertyForm";
import "../dashboard.css";


const Dashboard = () => {
  const [properties, setProperties] = useState([
    {
      name: "Room A",
      location: "Delhi",
      price: "5000",
      image: "https://www.futuristarchitecture.com/wp-content/uploads/2019/02/SIMPLE-Hostel-1.jpg",
    },
    {
      name: "Room B",
      location: "Mumbai",
      price: "7000",
      image: "https://www.futuristarchitecture.com/wp-content/uploads/2019/02/SIMPLE-Hostel-1.jpg",
    },
  ]);

  const addProperty = (p) => {
    setProperties([...properties, p]);
  };

  const deleteProperty = (i) => {
    const updated = [...properties];
    updated.splice(i, 1);
    setProperties(updated);
  };

  const editProperty = (i) => {
    const p = properties[i];
    deleteProperty(i);
    alert("Edit values manually in form");
  };

  return (
    <>
      <Sidebar />
      <div className="main">
        <Topbar />
        <Cards />
        {/*  <ChartBox /> */}
        <PropertyTable
          properties={properties}
          deleteProperty={deleteProperty}
          editProperty={editProperty}
        />
        {/*  <PropertyForm addProperty={addProperty} /> */}
      </div>
    </>
  );
};

export default Dashboard;