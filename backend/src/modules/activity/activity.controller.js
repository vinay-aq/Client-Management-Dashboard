const { fetchActivityService,fetchActivityByEntityService } = require("./activity.service");

async function getActivity(req, res, next) {
  try {
    const activities = await fetchActivityService();
    res.status(200).json({ success: true, activities });
  } catch (err) {
    next(err);
  }
}

async function fetchActivitiesByEntity(req, res, next) {
  const entityType = req.params.entityType;
  const entityId = req.params.entityId;

  try {
    const activities = await fetchActivityByEntityService({entityType,entityId });
    res.status(200).json({ success: true, activities });
  } catch (err) {
    next(err);
  }
}

module.exports = { getActivity, fetchActivitiesByEntity };
