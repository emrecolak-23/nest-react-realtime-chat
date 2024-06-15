import { useState } from "react";
import { Link } from "react-router-dom";
import { Link as MuiLink, TextField } from "@mui/material";
import Auth from "./Auth";

import { useCreateUser } from "../../hooks/useCreateUser";
import { extractErrorMessage } from "../../utils/errors";
import { useLogin } from "../../hooks/useLogin";
import { UNKNOWN_ERROR_MESSAGE } from "../../constants/error";

const Signup = () => {
  const [createUser] = useCreateUser();
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useLogin();

  const handleSubmit = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const user = await createUser({
        variables: {
          createUserInput: {
            email: credentials.email,
            username,
            password: credentials.password,
          },
        },
      });
      user.data?._id;
      setError("");
      login(credentials);
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      if (errorMessage) setError(errorMessage);
      else setError(UNKNOWN_ERROR_MESSAGE);
    }
  };

  return (
    <Auth
      submitLabel="Signup"
      onSubmit={handleSubmit}
      extraFields={[
        <TextField
          type="text"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!error}
          helperText={error}
        />,
      ]}
      error={error ?? undefined}
    >
      <Link to="/login" style={{ alignSelf: "center" }}>
        <MuiLink>Already have an account?</MuiLink>
      </Link>
    </Auth>
  );
};

export default Signup;
