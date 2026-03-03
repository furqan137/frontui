import React from "react";
import { NavLink } from "react-router-dom";
import "./GuestSidebar.css";

import menuIcon from "../../assets/icons/menu.png";
import homeIcon from "../../assets/dashboard/icons/Dashboard.png";
import verifyIcon from "../../assets/dashboard/icons/verify.png";
import trendsIcon from "../../assets/dashboard/icons/analytics.png";

export default function GuestSidebar({ collapsed, setCollapsed }) {
  return (
    <aside className={`guest-sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* Sidebar Toggle Button */}
      <button
        className="guest-sidebar-toggle"
        onClick={() => setCollapsed(!collapsed)}
      >
        <img src={menuIcon} alt="toggle" />
      </button>

      {/* Sidebar Navigation */}
      <nav className="guest-sidebar-nav">

        <NavLink to="/guest-dashboard">
          <img src={homeIcon} alt="home" />
          {!collapsed && "Dashboard"}
        </NavLink>

       <NavLink to="/guest-verify-news">
   <img src={verifyIcon} />
   {!collapsed && "Verify News"}
</NavLink>

<NavLink to="/guest-trends">
   <img src={trendsIcon} />
   {!collapsed && "View Trends"}
</NavLink>


      </nav>

    </aside>
  );
}
