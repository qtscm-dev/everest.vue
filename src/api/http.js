import axios from "axios";

const instance = axios.create({
  baseURL: "https://dev.qtscm.net",
});

instance.interceptors.request.use(
  function (config) {
    const Authorization = localStorage.getItem("Authorization") || "";
    config.headers.Authorization = Authorization;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
