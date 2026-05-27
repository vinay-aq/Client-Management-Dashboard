import axiosInstance from "../../services/axiosInstance";

export const getActivities = async () => {
  const res = await axiosInstance.get("/api/activities");
  return res.data;
};
