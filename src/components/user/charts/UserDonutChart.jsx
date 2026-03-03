import React from "react";
import "./UserDonutChart.css";

export default function UserDonutChart({ real, fake }) {
  const total = real + fake;

  return (
    <div className="donut-box">
      <svg width="120" height="120" viewBox="0 0 42 42">
        <circle className="donut-ring" cx="21" cy="21" r="15.915" strokeWidth="6" />
        <circle
          className="donut-segment real"
          cx="21" cy="21"
          r="15.915"
          strokeWidth="6"
          strokeDasharray={`${real} ${total}`}
          strokeDashoffset="25"
        />
      </svg>

      <div className="donut-legend">
        <p className="real-text">🟦 Real {real}%</p>
        <p className="fake-text">🟩 Fake {fake}%</p>
      </div>
    </div>
  );
}
