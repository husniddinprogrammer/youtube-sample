import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  InputBase,
  Avatar,
} from "@mui/material";
import { Menu, Search, Add, YouTube } from "@mui/icons-material";

const Header = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ bgcolor: "#fff", color: "#000", zIndex: (t) => t.zIndex.drawer + 1 }}
      elevation={1}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton>
            <Menu />
          </IconButton>
          <Box onClick={handleHomeClick} sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <YouTube sx={{ fontSize: 28, color: "#FF0000" }} />
            <Typography fontWeight="bold">YouTube</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#f1f1f1",
            px: 2,
            borderRadius: 5,
            width: 400,
          }}
        >
          <InputBase placeholder="Qidiruv" sx={{ flex: 1 }} />
          <Search />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton>
            <Add />
          </IconButton>
          <Avatar>Y</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;