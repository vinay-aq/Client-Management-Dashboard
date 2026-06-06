const { fetchActivityService } = require("./activity.service");

async function getActivity(req, res, next) {
  try {
    const activities = await fetchActivityService();
    res.status(200).json({ success: true, activities });
  } catch (err) {
    next(err);
  }
}

module.exports = { getActivity };
