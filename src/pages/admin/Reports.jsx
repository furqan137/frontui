import React, { useState } from "react";
import "./Reports.css";

export default function Reports() {
  /* ----------------------------
      MOCK DATA (replace with API)
  -----------------------------*/
  const [reports, setReports] = useState([
    {
      id: 1,
      user: "John Doe",
      reporter: "Alice Smith",
      reason: "Spam",
      status: "Pending",
      date: "2024-04-01",
    },
    {
      id: 2,
      user: "Jane Smith",
      reporter: "Admin",
      reason: "Harassment",
      status: "Pending",
      date: "2024-03-27",
    },
    {
      id: 3,
      user: "Bob Johnson",
      reporter: "Charlie Brown",
      reason: "Hate Speech",
      status: "Pending",
      date: "2024-03-25",
    },
    {
      id: 4,
      user: "Emma Wilson",
      reporter: "Guest User",
      reason: "Misinformation",
      status: "Dismissed",
      date: "2024-03-18",
    },
    {
      id: 5,
      user: "Emma John",
      reporter: "Admin",
      reason: "Spam",
      status: "Dismissed",
      date: "2024-03-18",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterReason, setFilterReason] = useState("All");

  /* ----------------------------
      FILTERED LIST
  -----------------------------*/
  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.reason.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || r.status === filterStatus;

    const matchesReason =
      filterReason === "All" || r.reason === filterReason;

    return matchesSearch && matchesStatus && matchesReason;
  });

  /* ----------------------------
      ACTION HANDLERS
  -----------------------------*/
  const handleResolve = (id) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Resolved" } : r
      )
    );
  };

  const handleDismiss = (id) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Dismissed" } : r
      )
    );
  };

  const handleView = (report) => {
    alert("Viewing report:\n\n" + JSON.stringify(report, null, 2));
  };

  return (
    <div className="reports-page">

      {/* PAGE TITLE + BUTTON */}
      <div className="reports-header">
        <h2>View and Handle User Reports</h2>
        <button className="add-report-btn">+ Add Report</button>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="reports-filters">

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by User or Reason..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-row">
          <div className="filter-group">
            <label>Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>Resolved</option>
              <option>Dismissed</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Reason</label>
            <select
              value={filterReason}
              onChange={(e) => setFilterReason(e.target.value)}
            >
              <option>All</option>
              <option>Spam</option>
              <option>Harassment</option>
              <option>Hate Speech</option>
              <option>Misinformation</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="reports-table-wrapper">
        <table className="reports-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Reported By</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Reported On</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredReports.map((r, index) => (
              <tr key={r.id}>
                <td>{index + 1}</td>
                <td><strong>{r.user}</strong></td>
                <td>{r.reporter}</td>
                <td>{r.reason}</td>

                <td>
                  <span className={`report-status ${r.status.toLowerCase()}`}>
                    {r.status}
                  </span>
                </td>

                <td>{r.date}</td>

                <td className="action-buttons">
                  {/* VIEW */}
                  <button className="view-btn" onClick={() => handleView(r)}>
                    👁 View
                  </button>

                  {/* RESOLVE */}
                  {r.status === "Pending" && (
                    <button className="resolve-btn" onClick={() => handleResolve(r.id)}>
                      Resolve
                    </button>
                  )}

                  {/* DISMISS */}
                  {r.status !== "Dismissed" && (
                    <button className="dismiss-btn" onClick={() => handleDismiss(r.id)}>
                      Dismiss
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="pagination">
          <button>Previous</button>
          <span className="page active">1</span>
          <span className="page">2</span>
          <span className="page">3</span>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
}
