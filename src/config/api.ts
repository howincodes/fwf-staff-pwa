import axios from "axios";
// export const isLocal = import.meta.env.VITE_IS_LOCAL == "true" ? true : false;
const isLocal = true

export const WEBSITE_API_URL = isLocal ? 'http://fwf_fasna.test/api/staff' : 'https://fitwithfazna.howincloud.com/api/staff'

export const MEDIA_URL = isLocal
  ? "https://eatkoimages.b-cdn.net"
  : "https://eatkoimages.b-cdn.net";

const apiClient = axios.create({
  baseURL: WEBSITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const { store } = await import("@/store");
      const state = store.getState();
      const token = state.auth?.user?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log(error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
