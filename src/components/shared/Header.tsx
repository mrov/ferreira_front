import React from 'react';
import Logo from '../../assets/fc-small-icon.png';
import { AppBar, Avatar, Button, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <Toolbar >
        <img src={Logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />
        <Typography variant="h6">Ferreira Challenge</Typography>
        <div style={{ flexGrow: 1 }}></div>
        <IconButton sx={{ p: 0 }}>
            <Avatar alt="User" src="" />
        </IconButton>
        {/* TODO Logout action */}
        <Button onClick={() => {navigate("/login")}} variant="contained" color='primary' endIcon={<LogoutIcon />}>
            Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;