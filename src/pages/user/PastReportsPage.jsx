import React, { useState } from "react";
import "./styles/PastReportsPage.css";

export default function PastReportsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Dummy data (later replace with backend API)
  const reports = [
    { id: "RPT ROT-012", type: "News Article", date: "2023-03-26", status: "In Progress" },
    { id: "RPT ROT-003", type: "Image", date: "2023-03-28", status: "Resolved" },
    { id: "RPT ROT-004", type: "Video", date: "2023-03-26", status: "In Progress" },
    { id: "RPT ROT-005", type: "News Article", date: "2023-03-28", status: "Resolved" },
    { id: "RPT ROT-006", type: "News Article", date: "2023-03-23", status: "In Progress" },
    { id: "RPT ROT-007", type: "Image", date: "2023-03-24", status: "Resolved" },
  ];

  // Filter logic
  const filteredReports = reports.filter((r) => {
    const matchSearch = r.id.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || r.type === typeFilter;
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="reports-container">

      <h1 className="reports-title">See Past Reports</h1>

      {/* Filters Row */}
      <div className="reports-filters">

        {/* Search Input */}
        <div className="reports-search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Content Type Filter */}
        <select
          className="reports-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option>All</option>
          <option>News Article</option>
          <option>Image</option>
          <option>Video</option>
        </select>

        {/* Status Filter */}
        <select
          className="reports-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
      </div>

      {/* Table */}
      <div className="reports-table">
        <table>
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Content Type</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredReports.map((r, index) => (
              <tr key={index}>
                <td>{r.id}</td>
                <td>{r.type}</td>
                <td>{r.date}</td>

                <td>
                  <span
                    className={`status-badge ${
                      r.status === "Resolved" ? "resolved" : "progress"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>

                <td>
                  <button className="view-btn">View Details</button>
                </td>
              </tr>
            ))}

            {filteredReports.length === 0 && (
              <tr>
                <td colSpan="5" className="no-results">
                  No matching reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
