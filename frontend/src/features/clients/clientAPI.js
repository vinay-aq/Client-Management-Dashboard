import axiosInstance from "../../services/axiosInstance";

const fetchClientsAPI = async (page, limit) => {
   console.log('fetchClients api run')
   const res = await axiosInstance.get(`/api/clients?page=${page}&limit=${limit}`);
   return res.data;
}

export default fetchClientsAPI;