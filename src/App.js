import Header from "./components/Header";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import Main from "./components/Main";
import React, { useEffect, useState } from "react";
const customTypography = {
  fontFamily: "unset",
};
const theme = createTheme({
  typography: customTypography,
});

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(
    localStorage.getItem("dark-mode") === "true"
  );

  return (
    <ThemeProvider theme={theme}>
      <>
        <Box
          sx={{
            background: isDarkMode ? "black" : "white",
            width: "100%",
            height: "100vh",
            overflowX: "hidden",
          }}
        >
          {/* Header Component */}
          <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <Main isDarkMode={isDarkMode} />
        </Box>
      </>
    </ThemeProvider>
  );
}

export default App;
