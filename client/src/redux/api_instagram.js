import axios from "axios";

const api_instagram = axios.create({
  baseURL: process.env.REACT_APP_INSTAGRAM_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api_instagram.interceptors.request.use(
  function(config) {
    // console.log(`request is : ${config.baseURL + config.url}`, config);
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

api_instagram.interceptors.response.use(
  function(response) {
    // console.log(`${response.request.responseURL} response is : `, response);
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default api_instagram;
