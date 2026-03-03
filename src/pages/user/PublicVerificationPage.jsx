import React, { useState } from "react";
import "./styles/PublicVerificationPage.css";

export default function PublicVerificationPage() {
  const [hash, setHash] = useState("");

  const handleVerify = () => {
    console.log("Verifying:", hash);
  };

  return (
    <div className="pv-page">

      {/* PAGE TITLE */}
      <h1 className="pv-main-title">Public Verification Portal</h1>

      {/* CENTER BOX */}
      <div className="pv-card">

        <div className="pv-icon">🔍</div>

        <h2 className="pv-heading">Public Verification Portal</h2>

        <p className="pv-subtext">
          Use the unique hash or scan the QR code linked to the verified content.
        </p>

        <input
          type="text"
          placeholder="Enter Verification Hash or Scan QR Code"
          className="pv-input"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
        />

        <button className="pv-btn" onClick={handleVerify}>
          Verify Now
        </button>

        <p className="pv-example">
          Need an example? <span>Click here</span>
        </p>

        <button className="pv-camera-btn">
          📷 Open Camera to Scan QR
        </button>
      </div>

      {/* BACK BUTTON — RIGHT ALIGNED */}
      <div className="pv-back-wrapper">
        <button className="pv-back-btn" onClick={() => (window.location.href = "/dashboard")}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
