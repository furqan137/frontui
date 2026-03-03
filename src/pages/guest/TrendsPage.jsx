// src/pages/guest/TrendsPage.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./TrendsPage.css";

export default function TrendsPage() {
  // Dummy Hourly Detection Rate Data
  const hourlyData = [
    { hour: "1", value: 10 },
    { hour: "2", value: 20 },
    { hour: "3", value: 15 },
    { hour: "4", value: 25 },
    { hour: "5", value: 18 },
    { hour: "6", value: 30 },
    { hour: "7", value: 22 },
  ];

  return (
    <div className="trends-container">

      <h1 className="trends-title">Real-Time Fake News Trends</h1>
      <p className="trends-subtitle">
        Stay updated on the latest fake news activities
      </p>

      {/* ===== GRID WRAPPER ===== */}
      <div className="trends-grid">

        {/* -------- Trending Topics -------- */}
        <div className="trends-card">
          <h2>Trending Topics</h2>

          <div className="trending-list">

            <div className="trend-box">
              <div className="trend-icon fire">🔥</div>
              <h3>Elections 2025</h3>
              <span className="severity high">High</span>
            </div>

            <div className="trend-box">
              <div className="trend-icon bolt">⚡</div>
              <h3>Celebrity Scandals</h3>
              <span className="severity medium">Medium</span>
            </div>

            <div className="trend-box">
              <div className="trend-icon fire">🔥</div>
              <h3>War Misinformation</h3>
              <span className="severity high">High</span>
            </div>

          </div>
        </div>

        {/* -------- Global Hotspots -------- */}
        <div className="trends-card">
          <h2>Global Fake News Hotspots</h2>

          <div className="hotspot-map">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2000px-World_map_-_low_resolution.svg.png"
              alt="world map"
            />
          </div>
        </div>

        {/* -------- Recently Detected -------- */}
        <div className="trends-card">
          <h2>Recently Detected Fake News</h2>

          <table className="trends-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Category</th>
                <th>Location</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>2:01 PM</td>
                <td><strong>Health</strong> Misinformation</td>
                <td>USA</td>
              </tr>

              <tr>
                <td>1:58 PM</td>
                <td><strong>Political</strong> Rumor</td>
                <td>UK</td>
              </tr>

              <tr>
                <td>1:55 PM</td>
                <td><strong>Tech</strong> Fake News</td>
                <td>Germany</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* -------- Hourly Detection Rate -------- */}
        <div className="trends-card">
          <h2>Hourly Detection Rate</h2>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={hourlyData}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4B8BFF"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
