import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { useState } from "react";
import authService from '../services/AuthService';

import reactLogo from '../assets/react.svg'

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = (event: any) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await authService.login(login, password);
      // Handle the API response
      console.log(response);
    } catch (error) {
      // Handle any error that occurred during the request
      console.error(error);
    }
  };

  return (
    <>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <img src={reactLogo} className="logo react" alt="React logo" />
            <Typography variant="h5" align="center">
              Login
            </Typography>
            <form onSubmit={handleFormSubmit}>
              <TextField
                label="Login"
                fullWidth
                margin="normal"
                value={login}
                onChange={handleLoginChange}
              />
              <TextField
                label="Password"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </form>
            <Typography align="center">
              <a href="#">Forgot password?</a>
            </Typography>
            {login}
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default Login;
