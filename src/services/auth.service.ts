import { moderateJokesApi as authApi } from "./api.service";
import { useMutation } from "@tanstack/react-query";

type LoginData = {
  email: string;
  password: string;
};

export const useLoginUser = () => {
  return useMutation((userData: LoginData) =>
    authApi.post("/api/auth/login", userData),
  );
};
