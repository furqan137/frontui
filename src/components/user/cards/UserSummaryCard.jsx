import React from "react";
import { Link } from "react-router-dom";
import "./UserSummaryCard.css";

export default function UserSummaryCard({ title, icon, link }) {
  return (
    <Link to={link} className="user-card">
      <div className="user-card-icon">{icon}</div>
      <h4 className="user-card-title">{title}</h4>
    </Link>
  );
}
