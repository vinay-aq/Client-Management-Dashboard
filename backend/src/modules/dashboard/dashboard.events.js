const { getIO } = require("../../socket/socket");

function notifyDashboardDataChanged() {
  const io = getIO();
  io.emit("dashboard_stats_updated");
}

module.exports = { notifyDashboardDataChanged };
