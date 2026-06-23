import React from "react";
import { useState } from "react";
import CLIENT_WORKFLOW from "../../ constants/clientWorkflow";
import { current } from "@reduxjs/toolkit";

function ClientWorkflowSection({ currentStatus, onUpdateStatus, loading }) {
  const [isUpdatingClientWorkflow, setIsUpdatingClientWorkflow] = useState("");
  const [nextStatus, setNextStatus] = useState("");
  const availableTransitions = CLIENT_WORKFLOW[currentStatus] || [];
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        marginTop: "24px",
        marginBottom: "24px",
        borderRadius: "8px",
      }}
    >
      <h3>Workflow</h3>
      <p>
        Current Status: <strong> {currentStatus}</strong>
      </p>
      {availableTransitions.length > 0 ? (
        <select onChange={(e) => setNextStatus(e.currentTarget.value)}>
          <option value="">Select Transition</option>

          {availableTransitions.map((val) => (
            <option value={val}>{val}</option>
          ))}
        </select>
      ) : (
        "No available Transitions"
      )}
      <button disabled={loading || !nextStatus} onClick={() => onUpdateStatus(nextStatus)}>
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
}

export default ClientWorkflowSection;
