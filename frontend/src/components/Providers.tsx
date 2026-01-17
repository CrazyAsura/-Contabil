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
import { usePathname } from 'next/navigation';

interface ProvidersProps {
  children: ReactNode;
}

function ThemeApp({ children }: { children: ReactNode }) {
  const themeMode = useAppSelector((state) => state.ui.themeMode);
  const theme = useMemo(() => getTheme(themeMode), [themeMode]);
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isDashboard = pathname.startsWith('/dashboard') || 
                      pathname.startsWith('/companies') || 
                      pathname.startsWith('/users') ||
                      pathname.startsWith('/invoices') ||
                      pathname.startsWith('/expenses') ||
                      pathname.startsWith('/reports');

  const hideNavFooter = isAuthPage || isDashboard;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {!hideNavFooter && <Navbar />}
        <AnimatePresence mode="wait">
          <Box component="main" sx={{ flexGrow: 1 }}>
            {children}
          </Box>
        </AnimatePresence>
        {!hideNavFooter && <Footer />}
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

