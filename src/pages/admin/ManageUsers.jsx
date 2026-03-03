import React, { useState, useEffect } from "react";
import "./ManageUsers.css";

import StatsCard from "../../components/admin/StatsCard";
import Table from "../../components/admin/Table";

// ICONS
import addIcon from "../../assets/icons/add-user.png";

export default function ManageUsers() {
  // ----------------- USER DATA (Mock — Replace with API Later) -----------------
  const [users, setUsers] = useState([
    {
      id: 1, name: "John Doe", email: "john@example.com",
      role: "Admin", status: "Active", date: "2025-04-01"
    },
    {
      id: 2, name: "Jane Smith", email: "jonn@example.com",
      role: "User", status: "Active", date: "2025-04-01"
    },
    {
      id: 3, name: "Michael Brown", email: "michael@example.com",
      role: "User", status: "Active", date: "2025-04-01"
    },
    {
      id: 4, name: "Emily Johnson", email: "james@example.com",
      role: "Guest", status: "Suspended", date: "2025-04-01"
    },
    {
      id: 5, name: "James Wilson", email: "sarah@example.com",
      role: "Active", status: "Active", date: "2025-04-01"
    },
    {
      id: 6, name: "David Martinez", email: "david@example.com",
      role: "Deactivated", status: "Deactivated", date: "2025-04-01"
    },
    {
      id: 7, name: "Anna White", email: "annawhite@example.com",
      role: "Active", status: "Active", date: "2025-04-01"
    }
  ]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // ----------------- FILTERING LOGIC -----------------
  const filteredUsers = users.filter(u =>
    (u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter ? u.role === roleFilter : true) &&
    (statusFilter ? u.status === statusFilter : true)
  );

  return (
    <div className="manage-users-page">

      <h1 className="page-title">Manage Users</h1>

      {/* TOP STATS ROW */}
      <div className="manage-stats-row">
        <StatsCard title="Total Users" value="120" />
        <StatsCard title="Active Users" value="110" />
        <StatsCard title="Admins" value="10" />
        <StatsCard title="Guests" value="25" />
      </div>

      {/* FILTERS */}
      <div className="manage-filter-row">
        <input
          type="text"
          className="filter-input"
          placeholder="Search by name, email, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filter-select"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Guest">Guest</option>
          <option value="Deactivated">Deactivated</option>
        </select>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Status</option>
          <option value="Active">Active</option>
          <option value="Suspended">Suspended</option>
          <option value="Deactivated">Deactivated</option>
        </select>

        <button className="add-user-btn">
          <img src={addIcon} alt="add" />
          Add New User
        </button>
      </div>

      {/* TABLE */}
      <Table users={filteredUsers} />

    </div>
  );
}
