import { getIO } from "../../socket/socket.js";

export function notifyDashboardDataChanged() {
  const io = getIO();
  io.emit("dashboard_stats_updated");
}
