import React from "react";
import UserSummaryCard from "../../components/user/cards/UserSummaryCard";
import UserDonutChart from "../../components/user/charts/UserDonutChart";
import "./UserDashboard.css";
import { useAuth } from "../../context/AuthContext";

export default function UserDashboard() {
  const { currentUser } = useAuth();

  return (
    <>
      <h1 className="ud-title">Home Dashboard</h1>

      <p className="ud-welcome">
        Welcome, <span>{currentUser?.displayName || "User"}</span>
      </p>

      {/* ACTION CARDS */}
      <div className="ud-actions">
        <UserSummaryCard title="Verify News" icon="📰" link="/verify-news" />
        <UserSummaryCard title="Upload Content" icon="⬆️" link="/verify-image" />
        <UserSummaryCard title="Past Reports" icon="📄" link="/history" />
        <UserSummaryCard title="Insights" icon="📈" link="/analytics" />
      </div>

      <h2 className="ud-section-title">Verification Summary</h2>

      <div className="ud-summary-grid">
        <div className="ud-summary-box">
          <h3>Total Verified</h3>
          <p className="ud-summary-number">12,458</p>
        </div>

        <div className="ud-summary-box">
          <h3>Real / Fake</h3>
          <UserDonutChart real={75} fake={25} />
        </div>
      </div>
    </>
  );
}
