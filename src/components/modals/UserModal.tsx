import React, { useEffect, useState } from "react";
import { Button, Modal, TextField, Card, Grid } from "@mui/material";
import { IUser, IUserForm } from "../../utils/interfaces/IUser";
import { createUser, editUser } from "../../services/UsersService";
import authService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { mapUserToUserForm } from "../../utils/functions/UserUtils";

interface IUserModalProps {
  user?: Partial<IUser>;
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

const UserModal: React.FC<IUserModalProps> = ({ user, open, onClose }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [userForm, setUserForm] = useState<Partial<IUserForm>>({
    name: "",
    login: "",
    password: "",
    email: "",
    phone: "",
    cpf: "",
    dateOfBirth: "",
    motherName: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.login) {
      setUserForm(mapUserToUserForm(user));
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [user]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      const response = await authService.login(
        userForm.login,
        userForm.password
      );
      if (response.status === 200) {
        // Redirect to user list
        navigate("/users");
      } else {
        throw Error(String(response.status));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!editMode) {
      await createUser(userForm);
    } else {
      await editUser(userForm);
    }

    await handleFormSubmit();

    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const resetFields = () => {
    setUserForm({
      name: "",
      login: "",
      password: "",
      email: "",
      phone: "",
      cpf: "",
      dateOfBirth: "",
      motherName: "",
    });
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        resetFields();
        onClose();
      }}
    >
      <Card sx={style}>
        <Grid container spacing={2} justifyContent="flex-start">
          <Grid item xs={12}>
            <h2>{!editMode ? "Create User" : `Edit User ${user?.name}`}</h2>
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
              type="password"
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
