// src/pages/LoginPage.jsx
import React from "react";
import LoginForm from "../components/auth/LoginForm";
import "./styles/LoginPage.css";

import logo from "../assets/authenchain-logo.png";

export default function LoginPage() {
  return (
    <div className="login-wrapper">

      {/* LEFT SIDE */}
      <div className="login-left">
        <img src={logo} alt="AuthenChain" className="login-left-logo" />
        <h1 className="login-left-title">AuthenChain</h1>
        <p className="login-left-text">
          AI-powered verification for a secure<br />
          and trusted digital world.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-card">
          <LoginForm />
        </div>
      </div>

    </div>
  );
}
