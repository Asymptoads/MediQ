import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Jost, sans-serif',
    h1: {
      fontFamily: 'Jost, sans-serif',
    },
    h2: {
      fontFamily: 'Jost, sans-serif',
    },
    h3: {
      fontFamily: 'Jost, sans-serif',
    },
    h4: {
      fontFamily: 'Jost, sans-serif',
    },
    h5: {
      fontFamily: 'Jost, sans-serif',
    },
    h6: {
      fontFamily: 'Jost, sans-serif',
    },
    button: {
      fontFamily: 'Jost, sans-serif',
      textTransform: 'none',  // This prevents uppercase text in buttons
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: 'Jost, sans-serif',
        },
      },
    },
  },
});

export default theme;