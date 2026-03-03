import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { WorldMap } from "react-svg-worldmap";
import "./styles/AnalyticsPage.css";

export default function AnalyticsPage() {
  // Pie chart data
  const pieData = [
    { name: "Health", value: 35 },
    { name: "Politics", value: 25 },
    { name: "Entertainment", value: 20 },
    { name: "Technology", value: 20 },
  ];

  const COLORS = ["#4B8BFF", "#A580FF", "#69C2FF", "#4DA3FF"];

  // Line chart data
  const lineData = [
    { day: 1, detections: 150 },
    { day: 2, detections: 120 },
    { day: 3, detections: 200 },
    { day: 4, detections: 170 },
    { day: 5, detections: 160 },
    { day: 6, detections: 210 },
    { day: 7, detections: 180 },
    { day: 8, detections: 160 },
  ];

  // Heatmap data
  const heatmapData = [
    { country: "us", value: 120 },
    { country: "in", value: 95 },
    { country: "pk", value: 70 },
    { country: "gb", value: 55 },
    { country: "ca", value: 60 },
    { country: "au", value: 50 },
  ];

  return (
    <div className="analytics-container">

      {/* Header */}
      <div className="analytics-header-row">
        <h1 className="analytics-title">Statistics Dashboard</h1>

        <select className="filter-dropdown">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Year</option>
        </select>
      </div>

      {/* GRID */}
      <div className="analytics-grid">

        {/* ================= PIE CHART ================= */}
        <div className="analytics-card large-card">
          <h2>Fake News by Category</h2>
          <ResponsiveContainer width="100%" height={270}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ================= HEATMAP ================= */}
        <div className="analytics-card large-card">
          <h2>Location Heatmap</h2>
          <div className="heatmap-wrapper">
            <WorldMap
              color="#4B8BFF"
              valueSuffix=" reports"
              size="responsive"
              data={heatmapData}
            />
          </div>
        </div>

        {/* ================= LINE CHART ================= */}
        <div className="analytics-card large-card">
          <h2>Detection Over Time</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={lineData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="detections"
                stroke="#4B8BFF"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ================= SMALL CARDS ================= */}
        <div className="analytics-card small-card">
          <h2>User Reports</h2>
          <p className="big-number">1,532</p>
        </div>

        <div className="analytics-card small-card">
          <h2>Sources</h2>
          <ul className="source-list">
            <li>news-example.com</li>
            <li>fakeinfo.net</li>
            <li>clickbait-site.com</li>
          </ul>
        </div>

        <div className="analytics-card small-card center-card">
          <button className="export-btn">Export Reports</button>
        </div>

      </div>
    </div>
  );
}
