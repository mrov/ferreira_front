// Core
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import {
  Typography,
  Button,
  CardContent,
  Card,
  Box,
  TextField,
  Alert,
} from "@mui/material";

// Services
import authService from "../services/AuthService";

// Assets
import ferreiraLogo from "../assets/fc-big-icon.png";
import "../index.css";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // ForgotPassword states
  const [openModal, setOpenModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginChange = (event: any) => {
    setLogin(event.target.value);
    handleLoginBlur();
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleLoginBlur = () => {
    if (login.trim() === "") {
      setLoginError("Login is required");
    } else {
      setLoginError("");
    }
  };

  const handlePasswordBlur = () => {
    if (password.trim() === "") {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    setShowErrorAlert(false);

    try {
      const response = await authService.login(login, password);
      // Handle the API response
      if (response.status === 200) {
        // Redirect to user list
        navigate("/users");
      } else {
        throw Error(String(response.status));
      }
    } catch (error) {
      // TODO show error when fail to login
      console.error(error);
      setShowErrorAlert(true);
    }
  };

  return (
    <>
      <ForgotPasswordModal
        open={openModal}
        onClose={function (): void {
          setOpenModal(false);
        }}
        onResetPasswordSuccess={function (newPassword): void {
          setShowSuccessAlert(true);
          setOpenModal(false);
          setNewPassword(newPassword);
          
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ minWidth: 275, maxWidth: "30%", textAlign: "center" }}>
          <Card variant="outlined">
            <CardContent>
              {showErrorAlert ? (
                <Alert
                  sx={{ my: 2 }}
                  onClose={() => {
                    setShowErrorAlert(false);
                  }}
                  variant="filled"
                  severity="error"
                >
                  Login ou Senha inválidos
                </Alert>
              ) : (
                <></>
              )}
              {showSuccessAlert ? (
                <Alert
                  sx={{ my: 2 }}
                  onClose={() => {
                    setShowSuccessAlert(false);
                  }}
                  variant="filled"
                  severity="success"
                >
                  Sua senha foi resetada, sua nova senha é: {newPassword}
                </Alert>
              ) : (
                <></>
              )}
              <img
                height={"70%"}
                src={ferreiraLogo}
                alt="Ferreira Costa Logo"
              />
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
                  onBlur={handleLoginBlur}
                  error={Boolean(loginError)}
                  helperText={loginError}
                  required
                />
                <TextField
                  label="Password"
                  fullWidth
                  margin="normal"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                  required
                />
                <Button
                  sx={{ mt: 2 }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </form>
              <Typography align="center" sx={{ pt: 2 }}>
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpenModal(true)}
                >
                  Forgot password?
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  );
}

export default Login;
