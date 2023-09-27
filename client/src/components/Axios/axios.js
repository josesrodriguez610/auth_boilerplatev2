// First we need to import axios.js
import axios from "axios";
import { useRefreshMutation } from "../../features/auth/authApiSlice";

const axiosInstance = () => {
  const [refresh] = useRefreshMutation();

  let baseURL = "/api/v1/productionTimes";
  const instance = axios.create({
    baseURL: baseURL,
  });

  instance.interceptors.request.use(
    async (config) => {
      const responseToken = await refresh();
      const { accessToken } = await responseToken.data;
      const auth = accessToken ? `Bearer ${accessToken}` : "";
      config.headers["Authorization"] = auth;
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export default axiosInstance;
