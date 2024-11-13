import axios from "axios";
import config from "config";
import storage from "services/storage";
import { message } from "antd";

const api = axios.create({
  baseURL: "https://schoolautomaion.fazo-software.uz/api/",
  timeout: 7000,
  timeoutErrorMessage: "timeout"
});

const RefreshToken = localStorage.getItem("refresh-token");

api.defaults.headers.common["Content-Type"] = "application/json; charset=utf-8";

api.interceptors.request.use(
  (configs) => {
    const token = storage.get("token") || "";
    if (token) {
      configs.headers.Authorization = `Bearer ${token}`;
    }
    return configs;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;
    if (response.status === 401) {
      try {
        const { data } = await api.post('/token/refresh/', { refresh: RefreshToken });
        localStorage.setItem("token", data.access);
        localStorage.setItem("refresh-token", data.refresh);
        message.open({
          type: 'success',
          content: "Iltimos qayta urining",
        });
      } catch (refreshError) {
        message.open({
          type: 'error',
          content: "Tizimda xatolik yuz berdi!",
        });
      }
    }
    return Promise.reject(error);
  }
);

export default api;
