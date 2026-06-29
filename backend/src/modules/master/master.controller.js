
const {fetchMasterService, createMasterService, updateMasterService, deleteMasterService} = require("./master.service");


async function getMasters(req, res, next) {
    const { type } = req.params;
    try {
        const masters = await fetchMasterService(type);
        res.status(201).json({ success: true, masters })
    } catch (err) {
        next(err)
    }

}


async function createMaster(req, res, next) {
    try {
        const master = await createMasterService(req.body);
        res.status(201).json({ success: true, message: "Master created", master })
    } catch (err) {
        next(err)
    }
}


async function updateMaster(req, res, next) {
    try {
        const master = await updateMasterService(req.body);
        res.status(200).json({ success: true, message: "Master updated successfuly", master })
    } catch (err) {
        next(err)
    }

}

async function deleteMaster(req, res, next) {
    const { id: masterId } = req.params;
    try {
        await deleteMasterService(masterId);
        res.status(200).json({ success: true, message: "Master deleted successfuly" })
    } catch (err) {
        next(err)
    }
}





module.exports = {
    getMasters,
    createMaster,
    updateMaster,
    deleteMaster
}