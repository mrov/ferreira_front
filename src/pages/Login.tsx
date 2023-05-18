// Core
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import { Typography, Button, CardContent, Card, Box, TextField } from "@mui/material";

// Services
import authService from "../services/AuthService";

// Assets
import ferreiraLogo from "../assets/fc-big-icon.png";
import "../index.css";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      if (response.status === 200) {
        // Redirect to user list
        navigate("/users");
      }
    } catch (error) {
      // TODO show error when fail to login
      console.error(error);
    }
  };

  return (
    <>
      <div style={{width: '100%', height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Box sx={{ minWidth: 275, maxWidth: "30%", textAlign: "center" }}>
          <Card variant="outlined">
            <CardContent>
              <img height={"70%"} src={ferreiraLogo} alt="Ferreira Costa Logo" />
              <Typography variant="h6" align="center">
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
      </div>
    </>
  );
}

export default Login;
