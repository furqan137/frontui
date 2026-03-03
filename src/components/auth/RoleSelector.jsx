import React from "react";
import adminIcon from "../../assets/icons/admin.png";
import userIcon from "../../assets/icons/user.png";

export default function RoleSelector({ currentRole, onRoleSelect }) {
  const roles = [
    { id: "admin", title: "Admin", icon: adminIcon },
    { id: "user", title: "User", icon: userIcon },
  ];

  return (
    <div className="role-selector">
      <p className="role-label">Select Role:</p>

      <div className="role-grid">
        {roles.map((role) => (
          <div
            key={role.id}
            className={`role-card ${
              currentRole === role.id ? "role-active" : ""
            }`}
            onClick={() => onRoleSelect(role.id)}
          >
            <img src={role.icon} alt={role.title} className="role-icon" />
            <span className="role-title">{role.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
