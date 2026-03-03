// src/pages/SignupPage.jsx
import React from "react";
import SignupForm from "../components/auth/SignupForm";
import "./styles/SignupPage.css";

import logo from "../assets/authenchain-logo.png";

export default function SignupPage() {
  return (
    <div className="signup-page">

      {/* LEFT SIDE */}
      <div className="signup-left">
        <img src={logo} alt="AuthenChain" className="signup-left-logo" />

        <div className="signup-left-text-wrapper">
          <h1 className="signup-left-title">Join AuthenChain</h1>
          <p className="signup-left-subtitle">
            Create your account and begin your journey<br />
            toward AI-powered and blockchain-protected truth.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="signup-right">
        <div className="signup-card">
          <SignupForm />
        </div>
      </div>

    </div>
  );
}
