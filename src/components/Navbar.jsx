import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Navbar.css";

import logo from "../assets/authenchain-logo.png";
import xIcon from "../assets/icons/x-icon.png";
import telegramIcon from "../assets/icons/telegram-icon.png";
import arrow from "../assets/icons/arrow.png";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="AuthenChain" className="nav-logo" />
        <span className="nav-brand">AuthenChain</span>
      </div>

      <div className="nav-center">
        <a href="#home" className="nav-link">
          Home
        </a>
        <a href="#features" className="nav-link">
          Features
        </a>
        <a href="#toolkit" className="nav-link">
          Toolkit
        </a>
        <a href="#difference" className="nav-link">
          Why Us
        </a>
        <a href="#faqs" className="nav-link">
          FAQs
        </a>
        <a href="#contact" className="nav-link">
          Contact
        </a>
      </div>

      <div className="nav-right">
        <img src={xIcon} className="nav-icon" alt="X Icon" />
        <img src={telegramIcon} className="nav-icon" alt="Telegram Icon" />

        <button className="get-started-btn" onClick={() => navigate("/signup")}>
          Get Started <img src={arrow} alt="Arrow" className="arrow-icon" />
        </button>
      </div>
    </nav>
  );
}
