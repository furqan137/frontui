import React from "react";
import "./TopBar.css";

import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/authenchain-logo.png";
import adminIcon from "../../assets/icons/admin2.png";
import logoutIcon from "../../assets/icons/logout2.png";
import bellIcon from "../../assets/icons/bell2.png";

export default function AdminTopbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/", { replace: true }); // Go to Landing Page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="admin-topbar">

      {/* LEFT SECTION */}
      <div className="admin-left">
        <img src={logo} className="admin-logo" alt="AuthenChain Logo" />

        <div className="brand-column">
          <span className="brand-main">AuthenChain</span>
          <span className="brand-sub">Admin Panel</span>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="admin-right">

        {/* NOTIFICATIONS */}
        <div className="notif-wrapper">
          <img src={bellIcon} className="notif-icon" alt="Notifications" />
          <span className="notif-badge">3</span>
        </div>

        {/* ADMIN INFO */}
        <div className="admin-info">
          <img src={adminIcon} alt="Admin" className="admin-avatar" />
          <span className="admin-name">Administrator</span>
        </div>

        {/* LOGOUT */}
        <button className="logout-btn" onClick={handleLogout}>
          <img src={logoutIcon} className="logout-icon" alt="Logout" />
          <span>Logout</span>
        </button>

      </div>
    </header>
  );
}
