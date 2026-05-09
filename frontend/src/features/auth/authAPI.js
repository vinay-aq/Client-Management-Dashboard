import axiosInstance from "../../services/axiosInstance";

export const loginAPI = async (data)=> {
  const res = await axiosInstance.post("http://localhost:8000/api/auth/login", data,{
    withCredentials: true
  });

  return res.data;
}



