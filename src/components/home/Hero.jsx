import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Hero.css";

import bgLogo from "../../assets/authenchain-logo.png";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero">

      {/* Background large logo */}
      <img src={bgLogo} className="hero-bg-logo" alt="AuthenChain Logo" />

      <div className="hero-card">

        {/* Cyber polygon border top */}
        <div className="hero-frame-top"></div>

        <p className="hero-top-text">
          Experience AI News, Image, and Deepfake Detection
        </p>

        <h1 className="hero-title">AuthenChain</h1>

        <p className="hero-desc">
          Experience AuthenChain power: detect fake news, AI-generated images,   
          and deepfake content with real-time blockchain-verified results.
        </p>

        <div className="hero-buttons">
          <button className="hero-btn outline" onClick={() => navigate("/login")}>Login ↗</button>
          <button className="hero-btn glow " onClick={() => navigate("/guest-dashboard")}>Guest Visit</button>
        </div>

        <div className="hero-line"></div>

        <p className="hero-note">
          🔒 Your verification result has been recorded immutably on AuthenChain Blockchain. <br />
          Share your Proof with QR Code or Blockchain Hash.
        </p>

        <p className="hero-footer">
          With AuthenChain by your side, experience clarity and trust in a world full of digital deception.
        </p>

        {/* Bottom cyber frame */}
        <div className="hero-frame-bottom"></div>
      </div>
    </section>
  );
}
