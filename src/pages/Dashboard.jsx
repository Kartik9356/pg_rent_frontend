import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Cards from "../components/Cards";
import ChartSection from "../components/ChartSection";
import PropertyTable from "../components/PropertyTable";
import AddPropertyForm from "../components/AddPropertyForm";



const Dashboard = () => {
  const [properties, setProperties] = useState([]);

  const addProperty = (newProperty) => {
    setProperties([...properties, newProperty]);
  };

  const deleteProperty = (index) => {
    const updated = properties.filter((_, i) => i !== index);
    setProperties(updated);
  };

  return (
    <div className="flex bg-[#f5efe3] min-h-screen text-[#2e1b1b]">
      <Sidebar />

      <div className="ml-[220px] w-full p-6">
        <Topbar />
        <Cards />
        <ChartSection />

        <PropertyTable 
          properties={properties} 
          deleteProperty={deleteProperty} 
        />

        <AddPropertyForm addProperty={addProperty} />
      </div>
    </div>
  );
};

export default Dashboard;