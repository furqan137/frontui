import React from "react";
import OverlayModal from "../OverlayModel";
import "./ProfileInfoModal.css";

export default function ProfileInfoModal({ user, onClose }) {
  if (!user) return null;

  return (
    <OverlayModal onClose={onClose}>
      <div className="profile-info-modal">

        {/* HEADER */}
        <div className="profile-info-header">
          <h2>Profile Information</h2>
          <button className="profile-info-close" onClick={onClose}>✕</button>
        </div>

        {/* AVATAR */}
        <div className="profile-avatar">
          <div className="profile-circle">
            {user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
          </div>
        </div>

        {/* DETAILS */}
        <div className="profile-details">

          <div className="profile-row">
            <span className="profile-label">Full Name:</span>
            <span className="profile-value">{user.displayName || "Unknown User"}</span>
          </div>

          <div className="profile-row">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{user.email}</span>
          </div>

          <div className="profile-row">
            <span className="profile-label">Role:</span>
            <span className="profile-value">{user.role?.toUpperCase() || "USER"}</span>
          </div>

          <div className="profile-row">
            <span className="profile-label">Account Created:</span>
            <span className="profile-value">
              {user.createdAt ? new Date(user.createdAt).toDateString() : "N/A"}
            </span>
          </div>

        </div>

        {/* FOOTER BUTTON */}
        <button className="profile-close-btn" onClick={onClose}>
          Close
        </button>

      </div>
    </OverlayModal>
  );
}
