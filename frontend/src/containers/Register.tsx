import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const rnameRef = useRef<HTMLInputElement>(null);
  const lnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const auth = useAuth();
  const navigate = useNavigate();

  const onSubmit = async () => {
    const firstName = rnameRef.current?.value;
    const lastName = lnameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passRef.current?.value;
    if (!firstName || !lastName || !email || !password) {
      setError("check your data");
      return;
    }
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });
    if (!response.ok) {
      setError("Please try different credentials");
      return;
    }

    const token = await response.json();
    if (!token) {
      setError("something went wrong data are emp");
      return;
    }

    auth?.login(email, token);
    console.log(token);
    navigate("/");
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 3,
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">Register New Account</Typography>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            border: 1,
            padding: 2,
            borderColor: "#f5f5f5",
            gap: 2,
          }}
        >
          <TextField inputRef={rnameRef} name="fName" label="first Name">
            {" "}
          </TextField>
          <TextField inputRef={lnameRef} name="lName" label="last Name">
            {" "}
          </TextField>
          <TextField inputRef={emailRef} name="email" label="Email">
            {" "}
          </TextField>
          <TextField
            inputRef={passRef}
            name="password"
            type="password"
            label="Password"
          >
            {" "}
          </TextField>
          <Button onClick={onSubmit} variant="contained">
            Register
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};
export default Register;
