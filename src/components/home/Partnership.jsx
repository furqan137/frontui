import React from "react";
import "./styles/Partnership.css";
import { useNavigate } from "react-router-dom";
import neonIcon from "../../assets/icon-image.png";
import robotHand from "../../assets/robot-hand.jpg";

export default function Partnership() {
  const navigate = useNavigate();
  return (
    <section className="partner-section">

      {/* Floating Neon Icon */}
      <img src={neonIcon} className="partner-floating-icon" alt="neon" />

      {/* Top Text Content */}
      <div className="partner-top">
        <p className="partner-label">Why Partner <span>With Us</span></p>

        <h2 className="partner-heading">Partnering with AuthenChain</h2>

        <p className="partner-text">
          We deliver actionable intelligence by verifying AI-generated media, 
          fake news, and deepfakes before misinformation spreads. Through 
          blockchain-secured records and AI-powered analytics, your community 
          stays one step ahead of digital manipulation.
        </p>
      </div>

      {/* Banner Section */}
      <div className="partner-banner">
        <img src={robotHand} className="partner-banner-img" alt="robot-hand" />

        <div className="partner-banner-overlay">

          <p className="banner-label">Join us</p>

          <h3 className="banner-title">
            Secure Digital Truth with AuthenChain
          </h3>

          <p className="banner-desc">
            Explore the next generation of AI-powered content verification — Detect, log, 
            and share content with proof — all backed by immutable blockchain records.
          </p>

          <div className="banner-buttons">
            <button className="btn-primary" onClick={() => navigate("/signup")}>
              Get Started →
            </button>

            <button className="btn-secondary" onClick={() => navigate("/")}>
              Contact Us
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}
