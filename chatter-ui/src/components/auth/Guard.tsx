import { ReactNode, useEffect } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { exludedRoutes } from "../../constants/excluded-routes";
import { authenticatedVar } from "../../constants/authenticated";
import { snackVar } from "../../constants/snack";
import { UNKNOWN_SNACK_MESSAGE } from "../../constants/error";
import { usePath } from "../../hooks/usePath";

const Guard = ({ children }: { children: ReactNode }) => {
  const { data: user, error } = useGetMe();
  const { path } = usePath();
  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      if (error.networkError) {
        snackVar(UNKNOWN_SNACK_MESSAGE);
      }
    }
  }, [error]);

  return <>{exludedRoutes.includes(path) ? children : user && children}</>;
};

export default Guard;
