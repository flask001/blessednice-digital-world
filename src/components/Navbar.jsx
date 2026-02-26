import { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";

const NAV_ITEMS = [
  { label: "Dashboard", icon: <DashboardIcon /> },
  { label: "Analytics", icon: <AnalyticsIcon /> },
  { label: "Affiliates", icon: <GroupsIcon /> },
  { label: "Settings", icon: <SettingsIcon /> },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={isScrolled ? 6 : 0}
        sx={{
          backdropFilter: isScrolled ? "blur(14px)" : "none",
          background: isScrolled
            ? "rgba(255,255,255,0.6)"
            : "transparent",
          transition: "all 0.4s ease",
        }}
      >
        <Toolbar  sx={{ height: 60, justifyContent: "space-between" } }>
          {/* LOGO */}
          <Box display="flex" alignItems="center" gap={0.5}>
            <img
              src={Logo}
              alt="Logo"
              style={{ width: 38, height: 38, objectFit: "contain" }}
            />

            {/* ✅ Tailwind Gradient Applied */}
            <h1
              variant="h6"
              className="font-bold bg-gradient-to-tl from-black to-pink-800 bg-clip-text text-transparent"
            >
              Blessednice
               <span className="bg-gradient-to-br from-purple-800 to-black bg-clip-text text-transparent"> digital</span> 
            </h1>
          </Box>

          {/* DESKTOP MENU */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            {NAV_ITEMS.map((item) => (
              <Typography
                key={item.label}
                sx={{
                  color:"black",
                  cursor: "pointer",
                  fontWeight: 500,
                  "&:hover": { color: "purple" },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          {/* MOBILE MENU BUTTON */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }}>
          <Box display="flex" justifyContent="flex-end" p={1}>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {NAV_ITEMS.map((item) => (
              <ListItemButton key={item.label}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}