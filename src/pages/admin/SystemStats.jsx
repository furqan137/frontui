import React, { useEffect, useState } from "react";
import "./SystemStats.css";

import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from "chart.js";

import { Line, Pie, Bar } from "react-chartjs-2";

// Register components
ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

export default function SystemStats() {
  const [stats, setStats] = useState({
    total: 1250,
    handled: 900,
    pending: 150,
    flagged: 200,
  });

  // -----------------------------
  //   FAKE BACKEND FOR CHARTS
  // -----------------------------
  const reportsOverview = {
    labels: ["May", "Jun", "Jul", "Sep", "Dec", "Apr", "Apr"],
    datasets: [
      {
        label: "Reports",
        data: [100, 110, 60, 80, 130, 200, 150],
        borderColor: "#1a73e8",
        backgroundColor: "rgba(26,115,232,0.15)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const userActivityPie = {
    labels: ["Active Users", "Returning Users", "Guest Users"],
    datasets: [
      {
        data: [40, 45, 20],
        backgroundColor: ["#1a73e8", "#4aa3ff", "#63cc7f"],
      },
    ],
  };

  const userActivityBar = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Users",
        data: [150, 200, 250, 300, 350, 400, 320],
        backgroundColor: "#1a73e8",
      },
    ],
  };

  const categoryPie = {
    labels: ["News", "Images", "Videos", "Other"],
    datasets: [
      {
        data: [45, 25, 20, 20],
        backgroundColor: ["#1a73e8", "#63cc7f", "#ffbd45", "#ff6a6a"],
      },
    ],
  };

  return (
    <div className="sys-page">

      <h2 className="sys-title">System Statistics</h2>

      {/* -------------------------------
          TOP CARDS
      -------------------------------- */}
      <div className="sys-cards">
        <div className="sys-card blue">
          <h3>{stats.total.toLocaleString()}</h3>
          <p>Total Reports</p>
        </div>

        <div className="sys-card lightblue">
          <h3>{stats.handled.toLocaleString()}</h3>
          <p>Handled</p>
        </div>

        <div className="sys-card gray">
          <h3>{stats.pending.toLocaleString()}</h3>
          <p>Pending</p>
        </div>

        <div className="sys-card red">
          <h3>{stats.flagged.toLocaleString()}</h3>
          <p>Flagged</p>
        </div>
      </div>

      {/* -------------------------------
           CHART BOXES
      -------------------------------- */}
      <div className="sys-grid">
        
        {/* LINE CHART */}
        <div className="sys-box">
          <h3>Reports Overview</h3>
          <Line data={reportsOverview} />
        </div>

        {/* PIE CHART */}
        <div className="sys-box">
          <h3>User Activity</h3>
          <Pie data={userActivityPie} />
        </div>

        {/* BAR CHART */}
        <div className="sys-box">
          <h3>User Activity</h3>
          <Bar data={userActivityBar} />
        </div>

        {/* PIE CATEGORY */}
        <div className="sys-box">
          <h3>Reports by Category</h3>
          <Pie data={categoryPie} />
        </div>

      </div>
    </div>
  );
}
