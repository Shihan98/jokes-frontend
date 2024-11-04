// import { api } from "@/services/api.service";

// export const getAllPosts = async () => {
//   const { data } = await api.get("/posts");
//   return data;
// };
import {
  deliverJokesApi,
  submitJokesApi,
  moderateJokesApi,
} from "./api.service";

interface Joke {
  id: string | number;
  content: string;
  type: string;
  createdAt?: string;
  submittedAt?: string;
  status?: string;
}

interface JokeSubmission {
  content: string;
  type: string;
}

interface AdminCredentials {
  email: string;
  password: string;
}

// Deliver Jokes Service
export const getRandomJoke = async (type?: string) => {
  const params = type ? { type } : {};
  const { data } = await deliverJokesApi.get("/api/jokes/random", { params });
  return data;
};

export const getJokeTypes = async () => {
  const { data } = await deliverJokesApi.get("/api/jokes/types");
  return data;
};

export const createJoke = async (joke: JokeSubmission) => {
  const { data } = await deliverJokesApi.post("/api/jokes", joke);
  return data;
};

// Submit Jokes Service
export const submitJoke = async (joke: JokeSubmission) => {
  const { data } = await submitJokesApi.post("/api/jokes", joke);
  return data;
};

export const getPendingJokes = async () => {
  const { data } = await submitJokesApi.get("/api/jokes/pending");
  return data;
};

// Moderate Jokes Service
export const adminLogin = async (credentials: AdminCredentials) => {
  const { data } = await moderateJokesApi.post("/api/auth/login", credentials);
  return data;
};

export const getJokesForModeration = async () => {
  const { data } = await moderateJokesApi.get("/api/jokes/moderate");
  return data;
};

export const approveJoke = async (joke: Joke) => {
  const { data } = await moderateJokesApi.post("/api/jokes/approve", joke);
  return data;
};

export const rejectJoke = async (jokeId: string) => {
  const { data } = await moderateJokesApi.delete(`/api/jokes/reject/${jokeId}`);
  return data;
};
