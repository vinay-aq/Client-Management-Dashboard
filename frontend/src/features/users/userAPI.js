import axiosInstance from "../../services/axiosInstance";

export const fetchUsersAPI = async () => {
  const res = await axiosInstance.get(`/api/users`);
  return res.data;
};

export const updateUserRoleByIdAPI = async (id, status) => {
  const res = await axiosInstance.patch(`/api/users/${id}/role`, { status });
  return res.data;
};

export const toggleUserStatusAPI = async (id, isActive) => {
  const res = await axiosInstance.patch(`/api/users/${id}/status`, {
    isActive,
  });
  return res.data;
};
