import React from "react";
import OverlayModal from "../OverlayModel";
import "./FeaturesHelp.css";

export default function FeaturesModal({ onClose }) {
  return (
    <OverlayModal title="Platform Features" onClose={onClose}>
      <div className="modal-header">
        <h2>Features</h2>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="feature-list">
        <div className="feature-item">
          <div className="feature-icon"></div>
          <div>
            <h3>AI Fake News Detection</h3>
            <p>Verify text-based news using advanced NLP models.</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon"></div>
          <div>
            <h3>Image Verification</h3>
            <p>Detect manipulated or AI-generated images.</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon"></div>
          <div>
            <h3>Blockchain Proof</h3>
            <p>All verified content is hashed and stored immutably.</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon"></div>
          <div>
            <h3>Analytics Dashboard</h3>
            <p>View insights about misinformation trends.</p>
          </div>
        </div>
      </div>
    </OverlayModal>
  );
}
