import axiosInstance from "../../services/axiosInstance";

export const fetchDashboardStatsAPI = async () => {
  const res = await axiosInstance.get("/api/dashboard/stats");
  return res.data;
};
