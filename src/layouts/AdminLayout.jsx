import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/admin/Sidebar";
import AdminTopbar from "../components/admin/TopBar";

import "./AdminLayout.css";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* MAIN AREA */}
      <div
        className={`admin-main ${collapsed ? "expanded" : ""}`}
      >
        <AdminTopbar />

        {/* PAGE CONTENT */}
        <div className="admin-content">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
