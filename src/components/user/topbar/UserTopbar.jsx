import React, { useState } from "react";
import "./UserTopbar.css";

import { auth } from "../../../firebase";
import { useAuth } from "../../../context/AuthContext";

/* ICONS & LOGOS */
import logo from "../../../assets/authenchain-logo.png";
import profileIcon from "../../../assets/icons/profile.png";
import logoutIcon from "../../../assets/icons/logout2.png";
import bellIcon from "../../../assets/icons/bell2.png";

/* MODALS */
import FeaturesModal from "../../modals/FeaturesModal";
import HelpModal from "../../modals/HelpModal";
import AboutModal from "../../modals/AboutModal";
import SettingsModal from "../../modals/SettingsModal";
import LogoutConfirmModal from "../../modals/LogoutConfirmModal";
import NotificationsModal from "../../modals/NotificationsModal";
import ProfileInfoModal from "../../modals/ProfileInfoModal"; // NEW

export default function UserTopbar() {
  const { currentUser, userProfile } = useAuth();

  /* MODAL STATES */
  const [modal, setModal] = useState(null);

  const openModal = (type) => setModal(type);
  const closeModal = () => setModal(null);

  /* Notifications (example) */
  const notifications = [
    {
      title: "Verification Complete",
      message: "Your news verification report is ready.",
      time: "2 min ago",
    },
    {
      title: "Security Alert",
      message: "New login detected on your account.",
      time: "1 hour ago",
    },
    {
      title: "Feature Update",
      message: "New improvements added to the dashboard.",
      time: "Yesterday",
    },
  ];

  return (
    <>
      {/* ===================== TOPBAR ===================== */}
      <header className="user-topbar">

        {/* LEFT LOGO */}
        <div className="topbar-left">
          <img src={logo} className="topbar-logo" alt="AuthenChain Logo" />
          <span className="topbar-brand">AuthenChain</span>
        </div>

        {/* CENTER LINKS */}
        <nav className="user-top-links">
          <a onClick={() => openModal("features")}>Features</a>
          <a onClick={() => openModal("help")}>Help</a>
          <a onClick={() => openModal("about")}>About Us</a>
          <a onClick={() => openModal("settings")}>Settings</a>
        </nav>

        {/* RIGHT USER SECTION */}
        <div className="user-top-user">

          {/* Notifications */}
          <div className="topbar-notif" onClick={() => openModal("notifications")}>
            <img src={bellIcon} alt="bell" className="notif-icon" />
            <span className="notif-dot"></span>
          </div>

          {/* Profile Info */}
          <img
            src={profileIcon}
            alt="profile"
            className="profile-icon"
            onClick={() => openModal("profile")}
          />

          <span className="user-name">{currentUser?.displayName || "User"}</span>

          {/* Logout */}
          <img
            src={logoutIcon}
            alt="logout"
            className="logout-icon"
            onClick={() => openModal("logout")}
          />
        </div>

      </header>

      {/* ===================== OVERLAY MODALS ===================== */}
      {modal === "features" && <FeaturesModal onClose={closeModal} />}
      {modal === "help" && <HelpModal onClose={closeModal} />}
      {modal === "about" && <AboutModal onClose={closeModal} />}
      {modal === "settings" && <SettingsModal onClose={closeModal} />}

      {modal === "notifications" && (
        <NotificationsModal notifications={notifications} onClose={closeModal} />
      )}

      {modal === "profile" && (
        <ProfileInfoModal
          onClose={closeModal}
          user={{
            displayName: currentUser?.displayName,
            email: currentUser?.email,
            role: userProfile?.role || "user",
            createdAt: userProfile?.createdAt
          }}
        />
      )}

      {modal === "logout" && (
        <LogoutConfirmModal
          onClose={closeModal}
          onLogout={() => {
            auth.signOut();
            closeModal();
          }}
        />
      )}
    </>
  );
}
