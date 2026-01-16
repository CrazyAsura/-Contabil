'use client';

import { createTheme, PaletteMode } from '@mui/material/styles';

export const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#000000', // Preto
    },
    secondary: {
      main: '#D4AF37', // Dourado
    },
    background: {
      default: mode === 'light' ? '#FFFFFF' : '#0F0F0F',
      paper: mode === 'light' ? '#F5F5F5' : '#1A1A1A',
    },
    text: {
      primary: mode === 'light' ? '#000000' : '#FFFFFF',
      secondary: mode === 'light' ? '#666666' : '#999999',
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
