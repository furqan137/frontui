import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GuestTopbar.css";

/* LOGO */
import logo from "../../assets/authenchain-logo.png";

/* MODALS (Guest also needs them) */
import FeaturesModal from "../modals/FeaturesModal";
import HelpModal from "../modals/HelpModal";
import AboutModal from "../modals/AboutModal";

export default function GuestTopbar() {
  const navigate = useNavigate();

  /* Modal states */
  const [showFeatures, setShowFeatures] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <header className="guest-topbar">

        {/* LEFT LOGO */}
        <div className="guest-top-left">
          <img src={logo} className="guest-logo" alt="AuthenChain" />
          <span className="guest-brand">AuthenChain</span>
        </div>

        {/* CENTER NAVIGATION */}
        <nav className="guest-top-links">
          <a onClick={() => setShowFeatures(true)}>Features</a>
          <a onClick={() => setShowHelp(true)}>Help</a>
          <a onClick={() => setShowAbout(true)}>About Us</a>
        </nav>

        {/* LOGIN BUTTON */}
        <button className="guest-login-btn" onClick={() => navigate("/login")}>
          Login
        </button>

      </header>

      {/* ========= MODALS ========= */}
      {showFeatures && <FeaturesModal onClose={() => setShowFeatures(false)} />}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </>
  );
}
