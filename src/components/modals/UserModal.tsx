import React, { useState } from "react";
import { Button, Modal, TextField, MenuItem, Card, Grid } from "@mui/material";
import { IUserForm, Status } from "../../utils/interfaces/IUser";
import { createUser } from "../../services/UsersService";

interface IUserModalProps {
  open: boolean;
  onClose: () => void;
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

const UserModal: React.FC<IUserModalProps> = ({ open, onClose }) => {
  const [userForm, setUserForm] = useState<IUserForm>({
    name: "",
    login: "",
    email: "",
    phone: "",
    cpf: "",
    dateOfBirth: "",
    motherName: "",
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await createUser(userForm);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Card sx={style}>
        <Grid container spacing={2} justifyContent="flex-start">
          <Grid item xs={12}>
            <h2>Create User</h2>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="name"
              label="Name"
              value={userForm.name}
              onChange={handleFieldChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="login"
              label="Login"
              value={userForm.login}
              onChange={handleFieldChange}
              fullWidth
            />
          </Grid>
          {/* TODO Create a confirm password logic */}
          <Grid item xs={6}>
            <TextField
              name="password"
              label="Password"
              value={userForm.password}
              onChange={handleFieldChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="email"
              label="Email"
              value={userForm.email}
              onChange={handleFieldChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="phone"
              label="Phone"
              value={userForm.phone}
              onChange={handleFieldChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="cpf"
              label="CPF"
              value={userForm.cpf}
              onChange={handleFieldChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              value={userForm.dateOfBirth}
              onChange={handleFieldChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="motherName"
              label="Mother's Name"
              value={userForm.motherName}
              onChange={handleFieldChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Modal>
  );
};

export default UserModal;
