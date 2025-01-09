import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import { Button, Typography } from "@mui/material";
import theme from './theme';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Pages
import Login from "./components/Login/login";
// import Home from "./pages/Home/home";  // Assuming you have a Home component

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    {/* <Route path="/home" element={<Home />} /> */}
                    <Route path="/login" element={<Login />} />
                    {/* Add other routes here */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
