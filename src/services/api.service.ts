import axios from "axios";

const createAxiosInstance = (baseURL: string, withCredentials = false) => {
  const instance = axios.create({
    baseURL,
    withCredentials,
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Or however you store your token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    },
  );

  return instance;
};

// Configure your API URLs
const DELIVER_JOKES_URL =
  process.env.NEXT_PUBLIC_DELIVER_JOKES_URL || "http://localhost:5000";
const SUBMIT_JOKES_URL =
  process.env.NEXT_PUBLIC_SUBMIT_JOKES_URL || "http://localhost:5005";
const MODERATE_JOKES_URL =
  process.env.NEXT_PUBLIC_MODERATE_JOKES_URL || "http://localhost:5001";

// Create instances for each service
export const deliverJokesApi = createAxiosInstance(DELIVER_JOKES_URL);
export const submitJokesApi = createAxiosInstance(SUBMIT_JOKES_URL);
export const moderateJokesApi = createAxiosInstance(MODERATE_JOKES_URL);
