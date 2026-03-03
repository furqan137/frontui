import React, { useState } from "react";
import OverlayModal from "../OverlayModel";
import "./SettingsModal.css";

export default function SettingsModal({ onClose }) {
  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <OverlayModal title="Settings" onClose={onClose}>
      <div className="settings-section">
        <div className="modal-header">
          <h2>Settings</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* THEME */}
        <div className="settings-item">
          <div>
            <h3>Theme Mode</h3>
            <p>Choose how AuthenChain looks for you.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* EMAIL NOTIFICATIONS */}
        <div className="settings-item">
          <div>
            <h3>Email Alerts</h3>
            <p>Get verification and system activity notifications.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={() => setEmailAlerts(!emailAlerts)}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* PRIVACY */}
        <div className="settings-box">
          <h3>Privacy & Security</h3>
          <p>Your data is encrypted and protected using industry standards.</p>
        </div>
      </div>
    </OverlayModal>
  );
}
