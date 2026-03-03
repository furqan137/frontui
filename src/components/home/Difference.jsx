import React, { useState } from "react";
import "./styles/Difference.css";

import diffBG from "../../assets/diff-bg.png";

export default function Difference() {
  const [active, setActive] = useState("verification");

  const content = {
    verification:
      "Every flagged or verified item is immutably stored on blockchain, leaving no room for tampering. AuthenChain verifies text news, images, and videos — a fully integrated AI solution.",
    detection:
      "AuthenChain simultaneously analyzes text, image, audio, and video content to detect manipulation across multiple media types — something generic tools cannot do.",
    bias:
      "AuthenChain operates independently, unaffected by political, social, or corporate biases — ensuring users always receive neutral and reliable verification.",
    reports:
      "Users can upload suspicious content and receive verification insights instantly. AuthenChain empowers the community to fight misinformation together.",
  };

  return (
    <section id="difference" className="difference-section">

      <h3 className="diff-label">AuthenChain vs Generic AI Tools</h3>
      <h2 className="diff-title">Why AuthenChain is Different</h2>

      <div className="difference-layout">

        {/* LEFT TABS */}
        <div className="diff-left">
          <div
            className={`diff-tab ${active === "verification" ? "active" : ""}`}
            onClick={() => setActive("verification")}
          >
            Immutatable Verification
          </div>

          <div
            className={`diff-tab ${active === "detection" ? "active" : ""}`}
            onClick={() => setActive("detection")}
          >
            Cross-Media Detection
          </div>

          <div
            className={`diff-tab ${active === "bias" ? "active" : ""}`}
            onClick={() => setActive("bias")}
          >
            No Bias, No Influence
          </div>

          <div
            className={`diff-tab ${active === "reports" ? "active" : ""}`}
            onClick={() => setActive("reports")}
          >
            User-Driven Reports
          </div>
        </div>

        {/* RIGHT CONTENT BOX */}
        <div className="diff-right">
          <div className="diff-content-box" style={{ backgroundImage: `url(${diffBG})` }}>
            <p key={active} className="diff-text fade">
              {content[active]}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
