import React from "react";
import { useState } from "react";
import CLIENT_WORKFLOW from "../../ constants/clientWorkflow";
import { AppSelect, AppButton} from "../common";

function ClientWorkflowSection({ currentStatus, onUpdateStatus, loading }) {
  const [nextStatus, setNextStatus] = useState("select");
  const availableTransitions = CLIENT_WORKFLOW[currentStatus] || [];

  function handleChangeTransition(e) {
    const value = e.target?.value;
    if (value === "select") return;
    setNextStatus(value);
  }

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
        <AppSelect
          onChange={handleChangeTransition}
          value={nextStatus}
          options={[
            { label: "Select Transition", value: "select" },
            ...availableTransitions.map((tx) => ({ label: tx, value: tx })),
          ]}
        ></AppSelect>
      ) : (
        "No available Transitions"
      )}
      <AppButton
        disabled={loading || !nextStatus}
        onClick={() => {
          onUpdateStatus(nextStatus);
          setNextStatus("select");
        }}
        sx={{ml:2}}
      >
        {loading ? "Updating..." : "Update"}
      </AppButton>
    </div>
  );
}

export default ClientWorkflowSection;
