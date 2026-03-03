import React from "react";
import OverlayModal from "../OverlayModel";
import "./ModalCommon.css";

export default function NotificationsModal({ notifications = [], onClose }) {
  return (
    <OverlayModal onClose={onClose}>
      <div className="modal-content-box">
        <h2 className="modal-title">Notifications</h2>

        <div className="notif-list">
          {notifications.length === 0 ? (
            <p className="notif-empty">No new notifications.</p>
          ) : (
            notifications.map((n, i) => (
              <div key={i} className="notif-item">
                <h4>{n.title}</h4>
                <p>{n.message}</p>
                <span className="notif-time">{n.time}</span>
              </div>
            ))
          )}
        </div>

        <button className="modal-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </OverlayModal>
  );
}
