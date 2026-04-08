import "../sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Room Buddy</h2>
      <a className="active">Dashboard</a>
      <a>Properties</a>
      <a>Bookings</a>
      <a>Users</a>
    </div>
  );
};

export default Sidebar;