// src/components/admin/ChartCard.jsx
import React from "react";
import {
  Line
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register ALL required chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ChartCard() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Site Activity",
        data: [120, 90, 150, 200, 180, 220, 170],
        borderColor: "#4B8BFF",
        backgroundColor: "rgba(75,139,255,0.25)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { color: "#ccc" } },
      y: { ticks: { color: "#ccc" } },
    },
    plugins: {
      legend: { labels: { color: "#fff" } },
    },
  };

  return (
    <div style={{
      background: "#0b132b",
      padding: "20px",
      borderRadius: "12px",
      height: "280px"
    }}>
      <Line data={data} options={options} />
    </div>
  );
}
