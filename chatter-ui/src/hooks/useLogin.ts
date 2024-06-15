import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import client from "../constants/apollo-client";
interface LoginRequest {
  email: string;
  password: string;
}

const loginApi = async (request: LoginRequest) => {
  const res = await axios.post(`/auth/login`, request);
  return res.data;
};

export const useLogin = () => {
  const {
    mutate: login,
    error,
    isPending: isLoading,
  } = useMutation({
    mutationFn: ({ email, password }: LoginRequest) =>
      loginApi({ email, password }),
    onSuccess: async () => {
      toast.success("Logged in successfully");
      await client.refetchQueries({ include: "active" });
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
      toast.error(`Login failed: ${error.message}`);
    },
  });

  return {
    login,
    error,
    isLoading,
  };
};
