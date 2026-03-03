import React from "react";
import { useNavigate } from "react-router-dom";
import "./GuestDashboard.css";

export default function GuestDashboard() {
  const navigate = useNavigate();

  return (
    <div className="guest-dashboard-wrapper">

      <div className="guest-dashboard-card">

        <h1 className="guest-title">Guest Dashboard</h1>

        <p className="guest-subtitle">
          Explore verification tools without creating an account.
        </p>

        <div className="guest-actions">
          <button
            className="guest-btn"
            onClick={() => navigate("/guest-verify-news")}
          >
            Verify News
          </button>

          <button
            className="guest-btn"
            onClick={() => navigate("/guest-trends")}
          >
            View Trends
          </button>
        </div>

      </div>
    </div>
  );
}
