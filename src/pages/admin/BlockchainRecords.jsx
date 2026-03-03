import React, { useState } from "react";
import "./BlockchainRecords.css";

export default function BlockchainRecords() {
  const [records, setRecords] = useState([
    {
      id: "c8f7a3",
      type: "Text",
      uploader: "user1@example.com",
      status: "Verified",
      timestamp: "2024-04-24 10:15",
    },
    {
      id: "img023",
      type: "Image",
      uploader: "user1@example.com",
      status: "Failed",
      timestamp: "2024-04-24 10:15",
    },
    {
      id: "user2@rx",
      type: "User@ex",
      uploader: "user2@example.com",
      status: "Pending",
      timestamp: "2024-04-24 10:15",
    },
    {
      id: "user3qc",
      type: "Video",
      uploader: "uvbe@exxx.com",
      status: "Verified",
      timestamp: "2024-04-24 10:15",
    },
    {
      id: "abcdefg",
      type: "Text",
      uploader: "user@example.com",
      status: "Failed",
      timestamp: "2024-04-24 11:15",
    },
    {
      id: "abcc8dd",
      type: "Image",
      uploader: "test@example.com",
      status: "Verified",
      timestamp: "2024-04-24 10:18",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [dateRange, setDateRange] = useState("");

  /* ----------------------------
    FILTERED LIST
  ----------------------------- */
  const filteredData = records.filter((r) => {
    const matchSearch =
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.uploader.toLowerCase().includes(search.toLowerCase());

    const matchType = filterType === "All" || r.type === filterType;
    const matchStatus = filterStatus === "All" || r.status === filterStatus;

    return matchSearch && matchType && matchStatus;
  });

  const handleViewDetails = (record) => {
    alert("Viewing blockchain record:\n" + JSON.stringify(record, null, 2));
  };

  return (
    <div className="bc-page">

      <h2 className="bc-title">Blockchain Records</h2>

      {/* SEARCH */}
      <div className="bc-search-box">
        <input
          type="text"
          placeholder="Search Blockchain Record by Hash or QR Code"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FILTERS */}
      <div className="bc-filters">

        <div className="filter-group">
          <label>Content Type</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option>All</option>
            <option>Text</option>
            <option>Image</option>
            <option>Video</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Verification Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All</option>
            <option>Verified</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Date Range</label>
          <input
            type="datetime-local"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bc-table-wrapper">
        <table className="bc-table">
          <thead>
            <tr>
              <th>Record ID</th>
              <th>Content Type</th>
              <th>Uploader</th>
              <th>Verification Status</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.id}</td>
                <td>{rec.type}</td>
                <td>{rec.uploader}</td>

                <td>
                  <span
                    className={`bc-status ${rec.status.toLowerCase()}`}
                  >
                    {rec.status}
                  </span>
                </td>

                <td>{rec.timestamp}</td>

                <td>
                  <button
                    className="bc-view-btn"
                    onClick={() => handleViewDetails(rec)}
                  >
                    View Details
                  </button>
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
