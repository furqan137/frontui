import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../components/user/sidebar/UserSidebar";
import UserTopbar from "../components/user/topbar/UserTopbar";
import "../pages/Dashboard/UserDashboard.css";

export default function UserLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="user-dashboard-layout">
      <UserTopbar />

      <UserSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        className={`user-dashboard-content ${
          collapsed ? "collapsed" : ""
        }`}
      >
        <Outlet /> {/* ← VERY IMPORTANT */}
      </main>
    </div>
  );
}
