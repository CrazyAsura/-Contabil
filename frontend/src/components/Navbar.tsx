'use client';

import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { name: 'Inicio', path: '/' },
  { name: 'Serviços', path: '/services' },
  { name: 'Planos', path: '/plans' },
  { name: 'Quem Somos', path: '/about' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contato', path: '/contact' },
];

export function Navbar() {
  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              fontWeight: 700,
              textDecoration: 'none',
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            +<span style={{ color: '#D4AF37' }}>Contábil</span>
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                href={item.path}
                sx={{ color: 'text.primary', '&:hover': { color: 'secondary.main' } }}
              >
                {item.name}
              </Button>
            ))}
            <Button
              component={Link}
              href="/login"
              variant="contained"
              sx={{
                bgcolor: 'secondary.main',
                color: 'white',
                '&:hover': { bgcolor: '#B8962F' },
                ml: 2,
              }}
            >
              Login
            </Button>
            <ThemeToggle />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
