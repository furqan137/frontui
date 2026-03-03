import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import GuestSidebar from "../components/guest/GuestSidebar";
import GuestTopbar from "../components/guest/GuestTopbar";
import "./GuestLayout.css";

export default function GuestLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="guest-layout">

      <GuestTopbar />

      <GuestSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main className={`guest-content ${collapsed ? "collapsed" : ""}`}>
        <Outlet />
      </main>

    </div>
  );
}
