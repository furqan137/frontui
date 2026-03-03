import React from "react";
import "./styles/Footer.css";

import xIcon from "../assets/icons/x-icon.png";
import telegramIcon from "../assets/icons/telegram-icon.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-icons">
        <a href="#" className="footer-icon-box">
          <img src={xIcon} alt="X" className="footer-icon" />
        </a>

        <a href="#" className="footer-icon-box">
          <img src={telegramIcon} alt="Telegram" className="footer-icon" />
        </a>
      </div>

      <p className="footer-copy">
        ©{year} AuthenChain. All rights reserved
      </p>
    </footer>
  );
}
