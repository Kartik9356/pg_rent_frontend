import "../dashboard.css";

const OwnerSidebar = () => {
  return (
    <div className="sidebar">
      <h2>Owner Panel</h2>
      <a className="active">Dashboard</a>
      <a>My Properties</a>
      <a>Bookings</a>
    </div>
  );
};

export default OwnerSidebar;