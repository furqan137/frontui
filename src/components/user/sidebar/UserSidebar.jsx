import React from "react";
import { NavLink } from "react-router-dom";
import "./UserSidebar.css";

import dashboardIcon from "../../../assets/dashboard/icons/Dashboard.png";
import verifyIcon from "../../../assets/dashboard/icons/verify.png";
import uploadIcon from "../../../assets/dashboard/icons/contents.png";
import reportsIcon from "../../../assets/dashboard/icons/reports.png";
import analyticsIcon from "../../../assets/dashboard/icons/analytics.png";
import portalIcon from "../../../assets/dashboard/icons/portal.png";
import menuIcon from "../../../assets/icons/menu.png";

export default function UserSidebar({ collapsed, setCollapsed }) {
  return (
    <aside className={`user-sidebar ${collapsed ? "collapsed" : ""}`}>

      <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
        <img src={menuIcon} alt="toggle" />
      </button>

      <nav className="user-sidebar-nav">

        <NavLink to="/dashboard">
          <img src={dashboardIcon} alt="dash" />
          {!collapsed && "Dashboard"}
        </NavLink>

        <NavLink to="/verify-news">
          <img src={verifyIcon} alt="verify" />
          {!collapsed && "Verify News"}
        </NavLink>

        <NavLink to="/verify-image">
          <img src={uploadIcon} alt="upload" />
          {!collapsed && "Upload Image"}
        </NavLink>

        <NavLink to="/history">
          <img src={reportsIcon} alt="reports" />
          {!collapsed && "Past Reports"}
        </NavLink>

        <NavLink to="/analytics">
          <img src={analyticsIcon} alt="analytics" />
          {!collapsed && "Insights"}
        </NavLink>

        <NavLink to="/public-verification">
          <img src={portalIcon} alt="portal" />
          {!collapsed && "Public Verification"}
        </NavLink>

      </nav>
    </aside>
  );
}
