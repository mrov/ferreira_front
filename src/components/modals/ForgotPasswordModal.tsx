import React, { useState } from "react";

// Components
import { Modal, Button, TextField, Box, Card, Grid } from "@mui/material";
import { recoverPassword } from "../../services/AuthService";

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
  onResetPasswordSuccess: (newPassword: string) => void;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  open,
  onClose,
  onResetPasswordSuccess
}) => {
  const [login, setLogin] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleResetPassword = async () => {
    try {
      // Perform validation
      if (login.trim() === '') {
        setLoginError('Login is required');
        return;
      }
      if (birthDate.trim() === '') {
        setBirthDateError('Birth Date is required');
        return;
      }
      if (email.trim() === '') {
        setEmailError('Email is required');
        return;
      }

      // Make API call to recover password
      const response = await recoverPassword(login, birthDate, email);

      console.log(response)

      if (response.status === 200) {
        // Reset the state and close the modal after successful verification
        setLogin('');
        setBirthDate('');
        setEmail('');
        setLoginError('');
        setBirthDateError('');
        setEmailError('');
        onResetPasswordSuccess(response.data.newPassword);
      }

      // TODO else call an alert saying that any field is invalid

      
    } catch (error) {
      console.error(error);
      // Handle error (e.g., display error message)
    }
  };

  const handleClose = () => {
    // Reset the state and close the modal
    setLogin("");
    setBirthDate("");
    setEmail("");
    setLoginError("");
    setBirthDateError("");
    setEmailError("");
    onClose();
  };

  const handleBlur = () => {
    if (login.trim() === "") {
      setLoginError("Login is required");
    } else {
      setLoginError("");
    }

    if (birthDate.trim() === "") {
      setBirthDateError("Birth Date is required");
    } else {
      setBirthDateError("");
    }

    if (email.trim() === "") {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Card sx={style}>
        <h2>Forgot Password</h2>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              onBlur={handleBlur}
              error={Boolean(loginError)}
              helperText={loginError}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="Birth Date"
              label="Birth Date"
              type="date"
              fullWidth
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              onBlur={handleBlur}
              InputLabelProps={{ shrink: true }}
              error={Boolean(birthDateError)}
              helperText={birthDateError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
              error={Boolean(emailError)}
              helperText={emailError}
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              sx={{ mr: 3 }}
              variant="contained"
              color="primary"
              onClick={handleResetPassword}
            >
              Recover Password
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Modal>
  );
};

export default ForgotPasswordModal;
