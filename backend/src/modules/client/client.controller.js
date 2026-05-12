const {fetchClients, fetchClientsById,createClientService } = require("./client.service.js")

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

async function getClientById(req, res, next) {
  
  try {
    const {id} = req.params;
    const data = await fetchClientsById(id);
    res.status(200).json({success: true, ...data})
  } catch (err) {
    next(err)
  }
  
}

async function createClient(req, res, next) {
  try {
    const client = await createClientService(req.body);
    res.status(201).json({...client})
  } catch(err) {
    next(err)
  }

}

module.exports = {
  getClients,
  getClientById, 
  createClient
};
