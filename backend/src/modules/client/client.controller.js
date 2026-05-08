const {fetchClients} = require("./client.service.js")

async function getClients(req, res, next) {
  let page = Math.max(req.query.page || 1,1);
  let limit = Math.min(req.query.limit || 10, 50);

  try {
    let data = await fetchClients(page, limit);
    res.status(200).json({success: true,...data });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getClients,
};
