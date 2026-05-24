import React from "react";

function StatusBadge({ status }) {
  const style = {
    active: {
      background: "#d4edda",
      color: "#155724",
    },

    inactive: {
      background: "#f8d7da",
      color: "#721c24",
    },

    pending: {
      background: "#fff3cd",
      color: "#856404",
    },

    suspended: {
      background: "#e2e3e5",
      color: "#383d41",
    },
  };

  return (
    <span
      style={{
        padding: "4px 8px",

        borderRadius: "8px",

        fontSize: "12px",

        fontWeight: "bold",
        

        ...(style[status] || {}),
      }}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
