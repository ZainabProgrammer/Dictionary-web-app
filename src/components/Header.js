import {
  Box,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import logo from "../images/logo.svg";
import { Container, Stack } from "@mui/system";
import Dropdown from "./Dropdown";
import moon from "../images/icon-moon.svg";
import purpleMoon from "../images/purpleMoon.png";
import { useEffect } from "react";
const Header = ({ isDarkMode, setIsDarkMode }) => {
  useEffect(() => {
    localStorage.setItem("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <Container
        maxWidth="sm"
        sx={{ background: `${isDarkMode}?hsl(0°, 0%, 2%):white` }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="" />
          <Box
            sx={{
              display: "flex",
              justifyContent: "",

              gap: 2,

              alignItems: "center",
            }}
          >
            <Stack>
              <Dropdown isDarkMode={isDarkMode} />
            </Stack>
            <Stack>
              <Typography
                variant="span"
                sx={{ fontSize: "1.7rem", color: "#7779" }}
              >
                |
              </Typography>
            </Stack>
            <Stack>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      checked={isDarkMode}
                      onChange={handleDarkMode}
                    />
                  }
                />
              </FormGroup>
            </Stack>
            <Stack>
              {isDarkMode ? (
                <img src={purpleMoon} alt="" />
              ) : (
                <img src={moon} alt="" width="20px" />
              )}
            </Stack>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Header;
