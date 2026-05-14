import axiosInstance from "../../services/axiosInstance";

export const fetchClientsAPI = async (page, limit, search) => {
  const res = await axiosInstance.get(
    `/api/clients?page=${page}&limit=${limit}&search=${search}`,
  );
  return res.data;
};

export const fetchClientByIdAPI = async (id) => {
  const res = await axiosInstance.get(`/api/clients/${id}`);
  return res.data;
};

export const createClientAPI = async (data) => {
  const res = await axiosInstance.post(`/api/clients`, data);
  return res.data;
};

export const updateClientAPI = async (id, data) => {
  const res = await axiosInstance.put(`/api/clients/${id}`, data);
  return res.data;
};

export const deleteClientAPI = async (id) => {
  const res = await axiosInstance.delete(`/api/clients/${id}`);
  return res.data;
};

