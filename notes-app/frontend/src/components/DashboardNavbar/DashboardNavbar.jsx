import { useEffect, useState } from "react";
import "./DashboardNavbar.css";
import axios from "axios";

const DashboardNavbar = () => {
  const [initials, setInitials] = useState();

 
  return (
    <nav className="navbar">
      <h2>Notes</h2>

      <div className="search-bar">
        <input type="text" placeholder="Search anything here" />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="profile">
        <div className="initials"></div>
        <div className="more-details">
          <p>Test User</p>
          <span>Logout</span>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
