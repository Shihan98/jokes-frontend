import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deliverJokesApi,
  moderateJokesApi,
  submitJokesApi,
} from "@/services/api.service";
import { JokeSubmission, PendingJoke } from "@/types/jokes";

export const useGetRandomJoke = (type?: string) => {
  const params = type ? { type } : {};

  return useQuery(["get-random-joke", type], async () => {
    const response = await deliverJokesApi.get("/api/jokes/random", { params });
    return response.data;
  });
};

export const useGetPendingJokes = () => {
  return useQuery<PendingJoke[]>(["get-pending-jokes"], async () => {
    const response = await submitJokesApi.get("/api/jokes/pending");
    return response.data;
  });
};

export const useSubmitJoke = () => {
  return useMutation(async (joke: JokeSubmission) => {
    const response = await submitJokesApi.post("/api/jokes", joke);
    return response.data;
  });
};

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const useGetJokesForModeration = () => {
  return useQuery<PendingJoke[]>(["get-jokes-for-moderation"], async () => {
    const response = await moderateJokesApi.get(
      "/api/jokes/moderate",
      getAuthConfig(),
    );
    return response.data;
  });
};

export const useApproveJoke = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (joke: { jokeId: string; content: string; type: string }) => {
      const response = await moderateJokesApi.post(
        "/api/jokes/approve",
        joke,
        getAuthConfig(),
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["get-jokes-for-moderation"]);
      },
    },
  );
};

export const useRejectJoke = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (jokeId: string) => {
      const response = await moderateJokesApi.delete(
        `/api/jokes/reject/${jokeId}`,
        getAuthConfig(),
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["get-jokes-for-moderation"]);
      },
      onError: (error) => {
        console.error("Error in useRejectJoke:", error); // Log error for debugging
      },
    },
  );
};
