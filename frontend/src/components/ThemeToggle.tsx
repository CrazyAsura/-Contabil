'use client';

import { IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme } from '@/store/slices/uiSlice';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.ui.themeMode);

  return (
    <IconButton
      onClick={() => dispatch(toggleTheme())}
      sx={{
        width: 40,
        height: 40,
        position: 'relative',
        overflow: 'hidden',
        color: 'secondary.main',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {themeMode === 'light' ? (
          <motion.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={24} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={24} />
          </motion.div>
        )}
      </AnimatePresence>
    </IconButton>
  );
}
