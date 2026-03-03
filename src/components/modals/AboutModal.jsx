import React from "react";
import OverlayModal from "../OverlayModel";
import "./FeaturesHelp.css";

export default function AboutModal({ onClose }) {
  return (
    <OverlayModal onClose={onClose}>
      <div className="modal-header">
        <h2>About AuthenChain</h2>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="about-section">
        <p className="about-text">
          AuthenChain is a next-generation AI-powered misinformation detection
          platform secured with blockchain proof.
        </p>

        <div className="about-box">
          <h3>What We Provide</h3>
          <ul>
            <li>✔ Real-time news verification</li>
            <li>✔ AI-powered image authenticity checks</li>
            <li>✔ Blockchain-based verification records</li>
            <li>✔ Insightful analytics for patterns & trends</li>
          </ul>
        </div>

        <div className="about-box">
          <h3>Version</h3>
          <p>AuthenChain v1.0.0</p>
        </div>
      </div>
    </OverlayModal>
  );
}
