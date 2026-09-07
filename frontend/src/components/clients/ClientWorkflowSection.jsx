import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CLIENT_WORKFLOW from "../../constants/clientWorkflow";
import { AppSelect, AppButton } from "../common";
import { MASTER_TYPES } from "../../constants/masterTypes";
import { fetchMastersData } from "../../features/master/masterSlice";

function ClientWorkflowSection({ currentStatus, onUpdateStatus, loading }) {
  const [nextStatus, setNextStatus] = useState("select");
  const dispatch = useDispatch();
  const { clientStatus, isFetchingMasters: isFetchingClientStatus = null } =
    useSelector((state) => state.masters);

  useEffect(() => {
    dispatch(fetchMastersData(MASTER_TYPES.CLIENT_STATUS));
  }, []);

  const availableTransitions = CLIENT_WORKFLOW[currentStatus] || [];
  const availableTransitionsOptions = clientStatus
    ? clientStatus
        .filter((cs) => availableTransitions.includes(cs.code))
        .map((cs) => ({ value: cs.id, label: cs.name }))
    : [];

  function handleChangeTransition(e) {
    const value = e.target?.value;
    if (value === "select") return;
    setNextStatus(value);
  }

  const labelCurrentStatus = clientStatus
    ? clientStatus.filter((cs) => cs.code === currentStatus)[0]?.name
    : "";

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
        Current Status: <strong> {labelCurrentStatus}</strong>
      </p>

      {availableTransitions.length > 0 ? (
        <AppSelect
          onChange={handleChangeTransition}
          value={nextStatus}
          options={[
            { label: "Select Transition", value: "select" },
            ...availableTransitionsOptions,
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
        sx={{ ml: 2 }}
      >
        {loading ? "Updating..." : "Update"}
      </AppButton>
    </div>
  );
}

export default ClientWorkflowSection;
