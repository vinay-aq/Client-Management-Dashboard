import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

export const loginAPI = async (data) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, data, {
    withCredentials: true,
  });

  return res.data;
};

export const sessionRestoreAPI = async () => {
  const res = await axios.post(
    `${BASE_URL}/auth/refresh`,
    {},
    {
      withCredentials: true,
    },
  );

  return res.data;
};
