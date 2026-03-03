import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import menuIcon from "../../assets/icons/menu.png";
import dashboardIcon from "../../assets/dashboard/icons/Dashboard.png";
import usersIcon from "../../assets/dashboard/icons/reports.png";       // Manage Users
import reportsIcon from "../../assets/dashboard/icons/verify.png";     // Reports
import blockchainIcon from "../../assets/dashboard/icons/portal.png";  // Blockchain Records
import statsIcon from "../../assets/dashboard/icons/analytics.png";    // System Stats

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* Toggle Btn */}
      <button
        className="admin-sidebar-toggle"
        onClick={() => setCollapsed(!collapsed)}
      >
        <img src={menuIcon} alt="toggle" />
      </button>

      {/* Sidebar Navigation */}
      <nav className="admin-sidebar-nav">

        <NavLink to="/admin">
          <img src={dashboardIcon} alt="dashboard" />
          {!collapsed && "Dashboard"}
        </NavLink>

        <NavLink to="/admin/users">
          <img src={usersIcon} alt="users" />
          {!collapsed && "Manage Users"}
        </NavLink>

        <NavLink to="/admin/reports">
          <img src={reportsIcon} alt="reports" />
          {!collapsed && "Reports"}
        </NavLink>

        <NavLink to="/admin/blockchain-records">
          <img src={blockchainIcon} alt="blockchain" />
          {!collapsed && "Blockchain Records"}
        </NavLink>

        <NavLink to="/admin/system-stats">
          <img src={statsIcon} alt="stats" />
          {!collapsed && "System Stats"}
        </NavLink>

      </nav>
    </aside>
  );
}
