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
  alpha
} from '@mui/material';
import { 
  LockReset as ResetIcon, 
  ChevronLeft as BackIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ResetPasswordPage() {
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
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          width: 600, 
          height: 600, 
          bgcolor: alpha(theme.palette.primary.main, 0.05), 
          borderRadius: '50%', 
          filter: 'blur(120px)',
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
                Recuperar Senha
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Insira seu e-mail e enviaremos um link para você redefinir sua senha.
              </Typography>
            </Box>

            <Stack spacing={3}>
              <TextField 
                fullWidth 
                label="E-mail" 
                variant="outlined" 
                placeholder="seu@email.com"
                InputProps={{
                  startAdornment: <EmailIcon sx={{ color: 'text.disabled', mr: 1 }} />,
                }}
              />
              
              <Button 
                fullWidth 
                variant="contained" 
                size="large" 
                startIcon={<ResetIcon />}
                sx={{ 
                  py: 1.8, 
                  fontWeight: 700, 
                  bgcolor: 'primary.main',
                  borderRadius: 2,
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.9) }
                }}
              >
                Enviar Link de Recuperação
              </Button>
            </Stack>

            <Box sx={{ mt: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Lembrou sua senha?{' '}
                <MuiLink component={Link} href="/login" sx={{ color: 'secondary.main', fontWeight: 700, textDecoration: 'none' }}>
                  Voltar para o Login
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
