import axios from "axios";

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};


const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});


axiosInstance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post("http://localhost:8000/api/auth/refresh",{}, {
          withCredentials: true,
        });
        const newToken = res.data.accessToken;
        setAccessToken(newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        clearAccessToken();
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  },
);

export default axiosInstance;
