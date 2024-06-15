import { SnackMessage } from "../interfaces/snack-message.interface";

export const UNKNOWN_ERROR_MESSAGE =
  "An unknown error occurred. Please try again later.";

export const UNKNOWN_SNACK_MESSAGE: SnackMessage = {
  message: UNKNOWN_ERROR_MESSAGE,
  type: "error",
};
