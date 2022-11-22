import axios from "axios";

const api_eesocake = axios.create({
  baseURL: process.env.REACT_APP_EESOCAKE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api_eesocake.interceptors.request.use(
  function(config) {
    // console.log(`request is : ${config.baseURL + config.url}`, config);
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

api_eesocake.interceptors.response.use(
  function(response) {
    // console.log(`${response.request.responseURL} response is : `, response);
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default api_eesocake;
