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
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { 
  PersonAdd as RegisterIcon, 
  Google as GoogleIcon,
  ChevronLeft as BackIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RegisterPage() {
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
          bottom: -150, 
          right: -150, 
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
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
                Crie sua conta
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Junte-se a centenas de empresas que já simplificaram sua contabilidade.
              </Typography>
            </Box>

            <Stack spacing={2.5}>
              <TextField fullWidth label="Nome Completo" variant="outlined" placeholder="Seu nome" />
              <TextField fullWidth label="E-mail" variant="outlined" placeholder="seu@email.com" />
              <TextField fullWidth label="Senha" type="password" variant="outlined" />
              <TextField fullWidth label="Confirmar Senha" type="password" variant="outlined" />
              
              <Box sx={{ textAlign: 'left' }}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label={
                    <Typography variant="body2" color="text.secondary">
                      Eu aceito os{' '}
                      <MuiLink component={Link} href="/terms-of-use" sx={{ color: 'secondary.main', fontWeight: 600 }}>
                        Termos de Uso
                      </MuiLink>
                      {' '}e a{' '}
                      <MuiLink component={Link} href="/privacy-policy" sx={{ color: 'secondary.main', fontWeight: 600 }}>
                        Política de Privacidade
                      </MuiLink>
                    </Typography>
                  }
                />
              </Box>

              <Button 
                fullWidth 
                variant="contained" 
                size="large" 
                startIcon={<RegisterIcon />}
                sx={{ 
                  py: 1.8, 
                  fontWeight: 700, 
                  bgcolor: 'primary.main',
                  borderRadius: 2,
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.9) }
                }}
              >
                Cadastrar Agora
              </Button>

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
                Cadastrar com Google
              </Button>
            </Stack>

            <Box sx={{ mt: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Já possui uma conta?{' '}
                <MuiLink component={Link} href="/login" sx={{ color: 'secondary.main', fontWeight: 700, textDecoration: 'none' }}>
                  Fazer Login
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
