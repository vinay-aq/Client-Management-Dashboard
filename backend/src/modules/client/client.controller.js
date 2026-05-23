const {fetchClients, fetchClientsById,createClientService, updateClientService,deleteClientService } = require("./client.service.js")

async function getClients(req, res, next) {
  let page = Math.max(req.query.page || 1,1);
  let limit = Math.min(req.query.limit || 10, 50);
  let search = req.query.search || "";

  try {
    let data = await fetchClients(page, limit,search);
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

  const avatar = req.file ? `/uploads/${req.file.filename}`: "" ;

  try {
    const client = await createClientService({...req.body, avatar});
    res.status(201).json({...client})
  } catch(err) {
    next(err)
  }

}

async function updateClient(req, res, next) {
   const avatar = req.file ? `/uploads/${req.file.filename}`: "" ;
  const {id} = req.params;
   try {
    const client = await updateClientService(id,{...req.body, avatar});
    res.status(200).json({...client})
  } catch(err) {
    next(err)
  }
}

async function deleteClient(req, res, next) {
  const {id} = req.params;
  try {
    await deleteClientService(id);
    res.status(200).json({success: true, message: "Client deleted successfully"})
  } catch(err) {
    next(err)
  }
}

module.exports = {
  getClients,
  getClientById, 
  createClient,
  updateClient,
  deleteClient
};
