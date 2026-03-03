import React from "react";
import "./Table.css";

import viewIcon from "../../assets/icons/view.png";
import editIcon from "../../assets/icons/edit.png";
import deleteIcon from "../../assets/icons/delete.png";

export default function Table({ users = [], onView, onEdit, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="admin-table">

        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Registered On</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* EMPTY STATE */}
          {(!users || users.length === 0) && (
            <tr>
              <td colSpan="7" className="empty-state">
                No users found.
              </td>
            </tr>
          )}

          {/* LIST ROWS */}
          {Array.isArray(users) &&
            users.length > 0 &&
            users.map((u, index) => (
              <tr key={u.id || index}>
                <td>{index + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>

                <td>
                  <span className={`status-badge ${u.status?.toLowerCase()}`}>
                    {u.status}
                  </span>
                </td>

                <td>{u.date}</td>

                <td className="table-actions">
                  <img src={viewIcon} alt="view" onClick={() => onView?.(u)} />
                  <img src={editIcon} alt="edit" onClick={() => onEdit?.(u)} />
                  <img src={deleteIcon} alt="delete" onClick={() => onDelete?.(u)} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* BETTER PAGINATION */}
      <div className="pagination">
        <button className="page-btn">Previous</button>

        <span className="page active">1</span>
        <span className="page">2</span>
        <span className="page">3</span>

        <button className="page-btn">Next</button>
      </div>
    </div>
  );
}
