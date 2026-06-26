import React from "react";

function ActivityTimeline({ activities }) {
  return (
    <div style={{ marginTop: "24px" }}>
      <h3>Activities Timeline</h3>
      {activities.map((act) => (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        >
          <p>
            <strong>{act.message}</strong>{" "}
          </p>
          {act.action === "status_updated" && (
            <>
              <p>
                {act.oldValue?.status} {"->"} {act.newValue?.status}
              </p>{" "}
              <p>By: {act?.actorName}</p>
            </>
          )}
          <small>{new Date(act?.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default ActivityTimeline;
