const activityModel = require("./activity.model");


async function createActivityService(message) {
     await activityModel.create({message});
}


async function fetchActivityService() {
    const activities = await activityModel.find().sort({createdAt: -1}).limit(20);
    return activities;
}


module.exports = {
    fetchActivityService,
    createActivityService
}