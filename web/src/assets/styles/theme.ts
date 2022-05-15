import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    background: {
      paper: '#fff',
      default: '#fafafa',
    },
    primary: {
      light: '#9c27b0',
      main: '#9c27b0',
      dark: '#9c27b0',
      contrastText: '#fff',
    },
    secondary: {
      light: '#1976d2',
      main: '#1976d2',
      dark: '#1976d2',
      contrastText: 'rgba(0, 0, 0, 1)',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: 'rgba(255, 255, 255, 1)',
    },
    text: {
      primary: 'rgba(0, 0, 0, 1)',
      // secondary:"rgba(221, 221, 221, 1)",
      secondary: '#9c27b0',
      disabled: 'rgba(0, 0, 0, 0.38)',
      // hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
});

export default theme;
