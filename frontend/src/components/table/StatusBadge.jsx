import React from "react";

function StatusBadge({ status }) {
  const style = {
    lead: {
      background: "#d1ecf1",
      color: "#0c5460",
    },

    contacted: {
      background: "#d6eaf8",
      color: "#1b4f72",
    },

    qualified: {
      background: "#d4edda",
      color: "#155724",
    },

    "proposal sent": {
      background: "#fff3cd",
      color: "#856404",
    },

    approved: {
      background: "#c3e6cb",
      color: "#155724",
    },

    onboarded: {
      background: "#d4edda",
      color: "#155724",
    },

    suspended: {
      background: "#e2e3e5",
      color: "#383d41",
    },

    archived: {
      background: "#f8d7da",
      color: "#721c24",
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
