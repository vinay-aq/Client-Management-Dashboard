import { CLIENT_WORKFLOW } from "../../constants/clientWorkflow.js";

export function isValidClientTransition(currentStatus, nextStatus) {
  return CLIENT_WORKFLOW[currentStatus]?.includes(nextStatus);
}
