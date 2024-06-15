import { Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { FC, useState, ReactNode, useEffect } from "react";
import { useGetMe } from "../../hooks/useGetMe";

interface AuthProps {
  submitLabel: string;
  onSubmit: (creadentials: { email: string; password: string }) => void;
  children: ReactNode;
  error?: string;
  extraFields?: ReactNode[];
}

const Auth: FC<AuthProps> = ({
  submitLabel,
  onSubmit,
  children,
  error,
  extraFields,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data]);

  return (
    <Stack
      spacing={3}
      sx={{
        height: "100vh",
        maxWidth: 360,
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <TextField
        type="email"
        label="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!error}
        helperText={error}
      />
      {extraFields}
      <TextField
        type="password"
        label="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!error}
        helperText={error}
      />
      <Button variant="contained" onClick={() => onSubmit({ email, password })}>
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
};

export default Auth;
