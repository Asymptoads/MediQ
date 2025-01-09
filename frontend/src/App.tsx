import React from "react";
import { Button, Typography } from "@mui/material";
import theme from './theme'
import { ThemeProvider } from "@mui/material/styles";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Typography variant="h1">Hello World</Typography>
            <Button variant="contained">Click me</Button>
        </ThemeProvider>
    );
};

export default App;
