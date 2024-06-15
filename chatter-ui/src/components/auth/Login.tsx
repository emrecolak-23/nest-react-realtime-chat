import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import Auth from "./Auth";

import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const { login, error } = useLogin();

  return (
    <Auth
      submitLabel="Login"
      onSubmit={async (request) => {
        login(request);
      }}
      error={error ? "Invalid email or password" : undefined}
    >
      <Link to="/signup" style={{ alignSelf: "center" }}>
        <MuiLink>Don't have an account?</MuiLink>
      </Link>
    </Auth>
  );
};

export default Login;
