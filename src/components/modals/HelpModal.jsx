import React from "react";
import OverlayModal from "../OverlayModel";
import "./FeaturesHelp.css";

export default function HelpModal({ onClose }) {
  return (
    <OverlayModal title="Help & Support" onClose={onClose}>
    
          <div className="modal-header">
        <h2>Help & Support</h2>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
      </div>
      <div className="help-list">

        <div className="help-item">
          <h3>How to verify news?</h3>
          <p>Paste the news text and our AI model analyzes credibility.</p>
        </div>

        <div className="help-item">
          <h3>How does image verification work?</h3>
          <p>The system detects manipulation, edits, or AI generation.</p>
        </div>

        <div className="help-item">
          <h3>What is blockchain proof?</h3>
          <p>
            Verification hash is stored on-chain, ensuring immutability.
          </p>
        </div>

        <div className="help-item">
          <h3>Need Additional Help?</h3>
          <p>Email us at <b>support@authenchain.com</b></p>
        </div>

      </div>
    </OverlayModal>
  );
}
