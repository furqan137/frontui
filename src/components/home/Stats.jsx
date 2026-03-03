import React from "react";
import "./styles/Stats.css";

import newsIcon from "../../assets/icons/news.png";
import imageIcon from "../../assets/icons/images.png";
import verifyIcon from "../../assets/icons/verify.png";

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="stat-box">
        <img src={newsIcon} alt="News" className="stat-icon" />
        <h2 className="stat-num">20K+</h2>
        <p className="stat-label">News Articles Analyzed</p>
      </div>

      <div className="stat-box">
        <img src={imageIcon} alt="Images" className="stat-icon" />
        <h2 className="stat-num">10K+</h2>
        <p className="stat-label">Images Verified</p>
      </div>

      <div className="stat-box">
        <img src={verifyIcon} alt="Blockchain" className="stat-icon" />
        <h2 className="stat-num">30K+</h2>
        <p className="stat-label">Blockchain Verifications Completed</p>
      </div>
    </section>
  );
}
