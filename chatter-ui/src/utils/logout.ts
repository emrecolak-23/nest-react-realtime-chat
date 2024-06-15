import router from "../components/Routes";
import client from "../constants/apollo-client";
import { authenticatedVar } from "../constants/authenticated";

export const logOut = () => {
  authenticatedVar(false);
  router.navigate("/login");
  client.resetStore();
};
