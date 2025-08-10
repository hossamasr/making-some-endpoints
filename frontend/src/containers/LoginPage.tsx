import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [error, setError] = useState("")
  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)

  const auth = useAuth()
  const navigate = useNavigate()

  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passRef.current?.value;
    if (!email || !password) {
      setError("check your data")
      return;
    }
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({

        email, password

      })

    })
    if (!response.ok) {
      setError("Please try different credentials")
      return;

    }

    const token = await response.json()
    if (!token) {
      setError("something went wrong data are emp")
      return;
    }

    auth?.login(email, password)
    console.log(token);
    navigate('/')

  }


  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center", mt: 3, justifyContent: "center", flexDirection: "column" }}>
        <Typography variant="h6">Login to Your Account</Typography>
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", border: 1, padding: 2, borderColor: "#f5f5f5", gap: 2 }}>
          <TextField inputRef={emailRef} name="email" label="Email"> </TextField>
          <TextField inputRef={passRef} name="password" type="password" label="Password"> </TextField>
          <Button onClick={onSubmit} variant="contained">Login</Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>


      </Box>

    </Container>
  )
}
export default Login;
