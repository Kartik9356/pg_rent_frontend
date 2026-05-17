import React from "react";

const UserTable = ({ users }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          background: "white",
        }}
      >
        <thead>
          <tr style={{ background: "#f8f9fa", borderBottom: "2px solid #ddd" }}>
            <th style={{ padding: "15px" }}>Name</th>
            <th style={{ padding: "15px" }}>Email</th>
            <th style={{ padding: "15px" }}>Phone</th>
            <th style={{ padding: "15px" }}>Role</th>
            <th style={{ padding: "15px" }}>Joined Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              style={{
                borderBottom: "1px solid #eee",
                transition: "background 0.2s",
              }}
            >
              <td
                style={{ padding: "15px", fontWeight: "bold", color: "#333" }}
              >
                {user.name}
              </td>
              <td style={{ padding: "15px", color: "#555" }}>{user.email}</td>
              <td style={{ padding: "15px", color: "#555" }}>
                {user.phone || "N/A"}
              </td>
              <td style={{ padding: "15px" }}>
                {/* Dynamic color coding for user roles */}
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    background:
                      user.role === "admin"
                        ? "#d1ecf1"
                        : user.role === "owner"
                          ? "#d4edda"
                          : "#e2e3e5",
                    color:
                      user.role === "admin"
                        ? "#0c5460"
                        : user.role === "owner"
                          ? "#155724"
                          : "#383d41",
                  }}
                >
                  {user.role}
                </span>
              </td>
              <td style={{ padding: "15px", color: "#777" }}>
                {new Date(user.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
