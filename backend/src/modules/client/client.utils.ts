import { CLIENT_WORKFLOW } from "../../constants/clientWorkflow.js";

export function isValidClientTransition(
  currentStatus: string,
  nextStatus: string,
): boolean {
  return CLIENT_WORKFLOW[currentStatus]?.includes(nextStatus);
}
