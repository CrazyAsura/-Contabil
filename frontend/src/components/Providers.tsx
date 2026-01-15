'use client';

import { ReactNode, useMemo } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AnimatePresence } from 'framer-motion';
import { Box } from '@mui/material';

import { store, persistor } from '@/store';
import { useAppSelector } from '@/store/hooks';
import { queryClient } from '@/lib/react-query';
import { getTheme } from '@/theme/theme';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface ProvidersProps {
  children: ReactNode;
}

function ThemeApp({ children }: { children: ReactNode }) {
  const themeMode = useAppSelector((state) => state.ui.themeMode);
  const theme = useMemo(() => getTheme(themeMode), [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <AnimatePresence mode="wait">
          <Box component="main" sx={{ flexGrow: 1 }}>
            {children}
          </Box>
        </AnimatePresence>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeApp>
            {children}
          </ThemeApp>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

