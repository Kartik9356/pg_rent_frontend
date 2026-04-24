import { NavLink } from "react-router-dom";
import "../sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Room Buddy</h2>

      <NavLink to="/admin">Dashboard</NavLink>

      <NavLink to="/owner/add-property">Properties</NavLink>

      <NavLink to="/users">Users</NavLink>

      <NavLink to="/owner">Reports</NavLink>

    </div>
  );
};

export default Sidebar;