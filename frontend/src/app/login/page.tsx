'use client';

import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Stack,
  Link as MuiLink,
  useTheme,
  alpha,
  Divider
} from '@mui/material';
import { 
  Login as LoginIcon, 
  Google as GoogleIcon,
  ChevronLeft as BackIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 10,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Decoration */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: -150, 
          left: -150, 
          width: 400, 
          height: 400, 
          bgcolor: alpha(theme.palette.secondary.main, 0.1), 
          borderRadius: '50%', 
          filter: 'blur(100px)',
          zIndex: 0
        }} 
      />
      
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 4, md: 6 }, 
              borderRadius: 6, 
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
              textAlign: 'center'
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                component={Link}
                href="/"
                sx={{
                  fontWeight: 800,
                  textDecoration: 'none',
                  color: 'primary.main',
                  display: 'inline-flex',
                  alignItems: 'center',
                  mb: 2
                }}
              >
                +<span style={{ color: theme.palette.secondary.main }}>Contábil</span>
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                Bem-vindo de volta
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Acesse sua conta para gerenciar suas finanças.
              </Typography>
            </Box>

            <Stack spacing={3}>
              <TextField fullWidth label="E-mail" variant="outlined" placeholder="seu@email.com" />
              <TextField fullWidth label="Senha" type="password" variant="outlined" />
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <MuiLink component={Link} href="#" variant="body2" sx={{ color: 'secondary.main', fontWeight: 600, textDecoration: 'none' }}>
                  Esqueceu a senha?
                </MuiLink>
              </Box>

              <Button 
                fullWidth 
                variant="contained" 
                size="large" 
                startIcon={<LoginIcon />}
                sx={{ 
                  py: 1.8, 
                  fontWeight: 700, 
                  bgcolor: 'primary.main',
                  borderRadius: 2,
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.9) }
                }}
              >
                Entrar no Sistema
              </Button>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 1 }}>
                <Divider sx={{ flex: 1 }} />
                <Typography variant="body2" color="text.secondary">OU</Typography>
                <Divider sx={{ flex: 1 }} />
              </Box>

              <Button 
                fullWidth 
                variant="outlined" 
                size="large" 
                startIcon={<GoogleIcon />}
                sx={{ 
                  py: 1.5, 
                  fontWeight: 600, 
                  color: 'text.primary',
                  borderColor: alpha(theme.palette.divider, 0.2),
                  borderRadius: 2,
                  '&:hover': { borderColor: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.02) }
                }}
              >
                Continuar com Google
              </Button>
            </Stack>

            <Box sx={{ mt: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Não tem uma conta?{' '}
                <MuiLink component={Link} href="/plans" sx={{ color: 'secondary.main', fontWeight: 700, textDecoration: 'none' }}>
                  Conheça nossos planos
                </MuiLink>
              </Typography>
            </Box>

            <Button 
              component={Link} 
              href="/" 
              startIcon={<BackIcon />} 
              sx={{ mt: 3, color: 'text.secondary', textTransform: 'none' }}
            >
              Voltar para a Home
            </Button>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
