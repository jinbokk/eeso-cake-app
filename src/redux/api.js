import axios from "axios";

const api = axios.create({
  // baseURL: `https://eeso-cake-server.herokuapp.com/api`,
  baseURL: `http://localhost:8000/api`,
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
