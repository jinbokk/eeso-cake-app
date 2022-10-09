import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  function (config) {
    console.log("request is : ", config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    console.log("response is : ", response);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
