const {fetchDashboardStats} = require("./dashboard.service");

async function getDashboardStats(req, res, next) {
  try {
    const dashboardStats = await fetchDashboardStats();
    res.status(200).json({success: true, ...dashboardStats});
  } catch (err) {
    next(err);
  }
}

module.exports = {getDashboardStats}