import React from "react";
import "./styles/Features.css";

import tracking from "../../assets/icons/tracking.png";
import report from "../../assets/icons/report.png";
import robot from "../../assets/icons/robot.png";
import watchdog from "../../assets/icons/watchdog.png";
import dataIcon from "../../assets/icons/data.png";

export default function Features() {
  return (
    <section id="features" className="features-section">

      {/* =============== TITLE AREA =============== */}
      <h3 className="features-cap-title">AuthenChain AI Capabilities</h3>

      <h2 className="features-main-title">
        AI Research Agent: <span className="highlight">AuthenChain Assistant</span>
      </h2>

      <p className="features-subtext">
        Imagine a system that automatically detects fake content, analyzes multimedia,
        and secures authenticity forever on blockchain.
      </p>

      {/* =============== FEATURE GRID =============== */}
      <div className="features-grid">

        {/* Tracking */}
        <div className="feature-box">
          <div className="feature-border"></div>
          <h4 className="feature-heading">Tracking</h4>
          <p className="feature-desc">
            AuthenChain monitors news articles, images, and videos for manipulation.
            With sharp detection intelligence, users can instantly verify digital content.
          </p>
          <img src={tracking} className="feature-icon" alt="tracking" />
        </div>

        {/* Daily Reports */}
        <div className="feature-box">
          <div className="feature-border"></div>
          <h4 className="feature-heading">Daily Reports</h4>
          <p className="feature-desc">
            AuthenChain compiles verified insights daily — providing blockchain-backed
            reports on fake news, AI-generated images, and deepfake videos.
          </p>
          <img src={report} className="feature-icon" alt="reports" />
        </div>

        {/* Blockchain Verification */}
        <div className="feature-box wide">
          <div className="feature-border"></div>
          <h4 className="feature-heading">Auto Blockchain Verification</h4>
          <p className="feature-desc">
            Every verification result — whether detecting fake news, image tampering,
            or deepfake manipulation — is stored immutably on blockchain forever.
          </p>
          <img src={robot} className="feature-icon" alt="robot" />
        </div>

        {/* Collecting Data */}
        <div className="feature-box">
          <div className="feature-border"></div>
          <h4 className="feature-heading">Collecting Data</h4>
          <p className="feature-desc">
            AuthenChain scrapes fact-check portals, global news sources, and social media.
            It analyzes millions of data points daily to detect manipulated content.
          </p>
          <img src={dataIcon} className="feature-icon" alt="data" />
        </div>

        {/* Watchdog */}
        <div className="feature-box">
          <div className="feature-border"></div>
          <h4 className="feature-heading">Content Integrity Watchdog</h4>
          <p className="feature-desc">
            A digital detective that monitors suspicious content, flags anomalies,
            and alerts users about deepfake or misinformation activity.
          </p>
          <img src={watchdog} className="feature-icon" alt="watchdog" />
        </div>

      </div>

      {/* =============== WHY SECTION =============== */}
      <div className="why-section">
        <div className="why-inner">

          <h3 className="why-label">Why is it So Good?</h3>

          <h2 className="why-title">
            The Only Ally You Need to Detect Fake News,<br />
            Deepfakes, and AI Manipulation.
          </h2>

          <div className="why-list">

            <div className="why-item">
              <h4>- Data Aggregation</h4>
              <p>
                AuthenChain combines fact-check APIs, web scraping, and real-time AI
                detection models into a unified intelligence system.
              </p>
            </div>

            <div className="why-item">
              <h4>- Real-Time Analysis</h4>
              <p>
                News, images, and videos are verified instantly with automatic blockchain proof.
              </p>
            </div>

            <div className="why-item">
              <h4>- Simplifies Complex Detection</h4>
              <p>
                From deepfake scanning to text tampering detection — AuthenChain makes
                complex authenticity checks simple for users.
              </p>
            </div>

            <div className="why-item">
              <h4>- Detect: Trends</h4>
              <p>
                The system identifies emerging fake news patterns, image manipulation
                techniques, and deepfake vectors faster than human analysis.
              </p>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
