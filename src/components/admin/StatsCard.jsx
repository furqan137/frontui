import React from "react";
import "./StatsCard.css";

export default function StatsCard({ title, value }) {
  return (
    <div className="stats-card">
      <h3 className="stats-value">{value}</h3>
      <p className="stats-title">{title}</p>
    </div>
  );
}
