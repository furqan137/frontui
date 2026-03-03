import React, { useState } from "react";
import "./styles/Toolkit.css";

export default function Toolkit() {
  const [activeTab, setActiveTab] = useState("research");

  return (
    <section id="toolkit" className="toolkit-section">

      <div className="toolkit-grid-bg"></div>

      <div className="toolkit-inner">

        <h3 className="toolkit-label">Possible Usecases</h3>

        <h2 className="toolkit-title">
          AuthenChain Toolkit: <span className="highlight">Endless Possibilities</span>
        </h2>

        {/* TABS */}
        <div className="toolkit-tabs">
          <button
            className={`tab ${activeTab === "research" ? "active" : ""}`}
            onClick={() => setActiveTab("research")}
          >
            Research and Journalism
          </button>

          <button
            className={`tab ${activeTab === "protection" ? "active" : ""}`}
            onClick={() => setActiveTab("protection")}
          >
            Digital Content Protection
          </button>

          <button
            className={`tab ${activeTab === "scam" ? "active" : ""}`}
            onClick={() => setActiveTab("scam")}
          >
            Scam and Misinformation Defense
          </button>
        </div>

        {/* CONTENT UNDER TABS */}
        <div className="toolkit-content">

          {activeTab === "research" && (
            <p className="toolkit-description fade">
              Before AI-powered manipulation took hold, navigating digital content was simpler.
              But as deepfakes, AI-generated images, and fake news flood the internet,
              AuthenChain emerges as a trusted defense. Combining advanced AI models with
              blockchain technology, we verify, track, and flag content — empowering journalists
              and researchers with authentic information.
            </p>
          )}

          {activeTab === "protection" && (
            <p className="toolkit-description fade">
              Protect brands, archives, and digital assets with blockchain-backed authenticity.
              AuthenChain ensures that your content, images, documents, and media are verified,
              tamper-resistant, and traceable — protecting your digital identity in real-time.
            </p>
          )}

          {activeTab === "scam" && (
            <p className="toolkit-description fade">
              Fake accounts, phishing scams, deepfake fraud, and AI-generated misinformation
              are rising. AuthenChain continuously monitors and flags suspicious activity,
              empowering users to defend themselves against digital threats.
            </p>
          )}

        </div>

      </div>
    </section>
  );
}
