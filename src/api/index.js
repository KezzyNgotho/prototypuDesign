import axios from "axios";
import { store } from "../store/store";

// Function to get the local access token
function getLocalAccessToken() {
  const state = store.getState();
  const accessToken = state.user.accessToken;
  return accessToken;
}

// Create a function to generate Axios instances for different modules
function createModuleAxios(baseURL) {
  const moduleAxios = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add interceptors for authentication
  moduleAxios.interceptors.request.use(
    (config) => {
      const token = getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return moduleAxios;
}
const axiosApi = createModuleAxios(process.env.REACT_APP_BASE_URL);

export { axiosApi };
