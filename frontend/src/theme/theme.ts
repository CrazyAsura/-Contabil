'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // ou 'dark' baseado na preferência
    primary: {
      main: '#000000', // Preto
    },
    secondary: {
      main: '#D4AF37', // Dourado
    },
    background: {
      default: '#FFFFFF', // Branco
      paper: '#F5F5F5',
    },
    text: {
      primary: '#000000',
      secondary: '#D4AF37',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
