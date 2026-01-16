'use client';

import { Box, Container, Grid, Typography, Link as MuiLink, IconButton, Stack } from '@mui/material';
import Link from 'next/link';
import { Instagram as InstagramIcon, LinkedIn as LinkedInIcon, Email as EmailIcon } from '@mui/icons-material';

const footerItems = [
  { name: 'Inicio', path: '/' },
  { name: 'Serviços', path: '/services' },
  { name: 'Planos', path: '/plans' },
  { name: 'Quem Somos', path: '/about' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contato', path: '/contact' },
  { name: 'Política de Privacidade', path: '/privacy-policy' },
  { name: 'Termos de Uso', path: '/terms-of-use' },
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
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
              Sua contabilidade inteligente, simplificada e segura.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton 
                component="a" 
                href="https://instagram.com" 
                target="_blank" 
                sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: 'secondary.main' } }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                component="a" 
                href="https://linkedin.com" 
                target="_blank" 
                sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: 'secondary.main' } }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton 
                component="a" 
                href="mailto:contato@maiscontabil.com.br" 
                sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: 'secondary.main' } }}
              >
                <EmailIcon />
              </IconButton>
            </Stack>
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
