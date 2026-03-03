import React from "react";
import StatsCard from "../../components/admin/StatsCard";
import ChartCard from "../../components/admin/ChartCard";
import Table from "../../components/admin/Table";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Verifications",
        data: [120, 160, 280, 200, 250, 320, 360],
        borderColor: "#4A7CFF",
        backgroundColor: "rgba(74,124,255,0.2)",
        tension: 0.4,
      },
    ],
  };

  const recentReports = [
    { user: "John Doe", date: "Apr 22, 2024", status: "Real", type: "Image" },
    { user: "Jane Smith", date: "Apr 21, 2024", status: "Fake", type: "Text" },
    { user: "Jim Brown", date: "Apr 20, 2024", status: "Real", type: "Image" },
    { user: "Anna Lee", date: "Apr 19, 2024", status: "Fake", type: "Image" }
  ];

  return (
    <div className="admin-dashboard">

      {/* Stats Row */}
      <div className="stats-row">
        <StatsCard value="1,560" title="Total Verifications" />
        <StatsCard value="1,080" title="Real" />
        <StatsCard value="72%" title="Real vs Fake" />
      </div>

      {/* Chart + Table */}
      <div className="dashboard-grid">
        <ChartCard title="Verifications" data={lineData} />

        <div className="table-card">
          <h3>Recent Reports</h3>
          <Table
            columns={["User", "Date", "Status", "Type"]}
            data={recentReports}
          />
        </div>
      </div>

    </div>
  );
}
