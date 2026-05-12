import axiosInstance from "../../services/axiosInstance";

export const fetchClientsAPI = async (page, limit) => {
   const res = await axiosInstance.get(`/api/clients?page=${page}&limit=${limit}`);
   return res.data;
}


export const fetchClientByIdAPI = async(id) => {
    const res = await axiosInstance.get(`/api/clients/${id}`);
   return res.data;
}


export const createClientAPI = async (data) => {
  const res = await axiosInstance.post(`/api/clients`, data);
   return res.data;
}

