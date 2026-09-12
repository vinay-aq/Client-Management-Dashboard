import {
  fetchClients,
  fetchClientsById,
  createClientService,
  updateClientService,
  deleteClientService,
  updateClientWorkflowService,
} from "./client.service.ts";
import type { Request, Response, NextFunction } from "express";

async function getClients(req: Request, res: Response, next: NextFunction) {
    console.log('user', req.user)
  let page = Math.max(Number(req.query.page) || 1, 1);
  let limit = Math.min(Number(req.query.limit) || 10, 50);
  let search = req.query.search || "";

  try {
    let data = await fetchClients(page, limit, search);
    res.status(200).json({ success: true, ...data });
  } catch (err) {
    next(err);
  }
}

async function getClientById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const data = await fetchClientsById(id);
    res.status(200).json({ success: true, ...data });
  } catch (err) {
    next(err);
  }
}

async function createClient(req: Request, res: Response, next: NextFunction) {
  const avatar = req.file ? `/uploads/${req.file.filename}` : "";
  const user = req.user;

  try {
    const client = await createClientService({ ...req.body, avatar, user });
    res.status(201).json({ ...client });
  } catch (err) {
    next(err);
  }
}

async function updateClient(req: Request, res: Response, next: NextFunction) {
  const avatar = req.file ? `/uploads/${req.file.filename}` : "";
  const { id } = req.params;
  const user = req.user;

  try {
    const client = await updateClientService(id, { ...req.body, avatar, user });
    res.status(200).json({ ...client });
  } catch (err) {
    next(err);
  }
}

async function deleteClient(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const user = req.user;
  try {
    await deleteClientService(id, user);
    res
      .status(200)
      .json({ success: true, message: "Client deleted successfully" });
  } catch (err) {
    next(err);
  }
}

async function updateClientWorkflow(req: Request, res: Response, next: NextFunction) {
  const { id : clientId } = req.params;
  const { nextStatusId } = req.body;
  const user = req.user;
  try {
    const updatedClient = await updateClientWorkflowService({clientId, nextStatusId, user});
    res
      .status(200)
      .json({ success: true, message: "Client status updated successfully", client: updatedClient });
  } catch (err) {
    next(err);
  }
}

export {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  updateClientWorkflow,
};
