import React from "react";
import "./OverlayModel.css";

export default function OverlayModal({ children, onClose }) {
  return (
    <div className="overlay-modal" onClick={onClose}>
      <div
        className="overlay-content"
        onClick={(e) => e.stopPropagation()} // stops double-overlay bug
      >
        {children}
      </div>
    </div>
  );
}
