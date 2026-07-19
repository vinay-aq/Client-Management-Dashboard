import axiosInstance from "../../services/axiosInstance";

export const fetchMastersAPI = async (type) => {
  const res = await axiosInstance.get(`/api/masters?type=${type}`);
  return res.data;
};

export const createMasterAPI = async (master) => {
  const res = await axiosInstance.post("/api/masters", { master });
  return res.data;
};

export const updateMasterAPI = async (master) => {
  const res = await axiosInstance.put(`/api/masters/${id}`, { master });
  return res.data;
};

export const deleteMasterAPI = async () => {
  const res = await axiosInstance.delete(`/api/masters/${id}`);
  return res.data;
};
