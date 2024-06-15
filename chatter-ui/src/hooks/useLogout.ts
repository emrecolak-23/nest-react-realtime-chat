import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { logOut as logOutClient } from "../utils/logout";
import { snackVar } from "../constants/snack";
import { UNKNOWN_SNACK_MESSAGE } from "../constants/error";

const logOutApi = async () => {
  return await axios.post("/auth/logout");
};

export const useLogout = () => {
  const { mutate: logOut } = useMutation({
    mutationFn: logOutApi,
    onSuccess: async () => {
      logOutClient();
    },
    onError: (error: Error) => {
      console.error("Logout failed:", error.message);
      snackVar(UNKNOWN_SNACK_MESSAGE);
    },
  });

  return {
    logOut,
  };
};
