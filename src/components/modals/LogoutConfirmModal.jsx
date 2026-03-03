import React from "react";
import OverlayModal from "../OverlayModel";
import "./ModalCommon.css"; // shared styles (we will create this)

export default function LogoutConfirmModal({ onClose, onLogout }) {
  return (
    <OverlayModal onClose={onClose}>
      <div className="modal-content-box">
        <h2 className="modal-title">Confirm Logout</h2>
        <p className="modal-text">Are you sure you want to log out?</p>

        <div className="modal-btn-row">
          <button className="modal-btn danger" onClick={onLogout}>
            Yes, Logout
          </button>
          <button className="modal-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </OverlayModal>
  );
}
