'use client';

import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

const footerItems = [
  { name: 'Inicio', path: '/' },
  { name: 'Serviços', path: '/services' },
  { name: 'Planos', path: '/plans' },
  { name: 'Quem Somos', path: '/about' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contato', path: '/contact' },
  { name: 'Login', path: '/login' },
];

export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              +<span style={{ color: '#D4AF37' }}>Contábil</span>
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Sua contabilidade inteligente, simplificada e segura.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Links Rápidos
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {footerItems.map((item) => (
                <MuiLink
                  key={item.path}
                  component={Link}
                  href={item.path}
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    '&:hover': { color: 'secondary.main' },
                    width: 'calc(50% - 8px)',
                  }}
                >
                  {item.name}
                </MuiLink>
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Contato
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              contato@maiscontabil.com.br<br />
              (11) 99999-9999
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 4, color: 'rgba(255, 255, 255, 0.5)' }}>
          © {new Date().getFullYear()} +Contábil. Todos os direitos reservados.
        </Typography>
      </Container>
    </Box>
  );
}
