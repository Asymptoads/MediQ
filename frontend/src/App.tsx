import React from "react";
import { Button, Typography } from "@mui/material";

const App: React.FC = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Welcome to MUI with React and TypeScript
            </Typography>
            <Button variant="contained" color="primary">
                Click Me
            </Button>
        </div>
    );
};

export default App;
