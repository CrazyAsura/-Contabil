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
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  Login as LoginIcon, 
  Google as GoogleIcon,
  ChevronLeft as BackIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/lib/auth.service';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      router.push('/dashboard');
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

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

            <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
              {loginMutation.isError && (
                <Alert severity="error">
                  { (loginMutation.error as any)?.response?.data?.message || 'Erro ao realizar login. Verifique suas credenciais.' }
                </Alert>
              )}
              <TextField 
                fullWidth 
                label="E-mail" 
                variant="outlined" 
                placeholder="seu@email.com"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={loginMutation.isPending}
              />
              <TextField 
                fullWidth 
                label="Senha" 
                type="password" 
                variant="outlined"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={loginMutation.isPending}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <MuiLink component={Link} href="/reset-password" variant="body2" sx={{ color: 'secondary.main', fontWeight: 600, textDecoration: 'none' }}>
                  Esqueceu a senha?
                </MuiLink>
              </Box>

              <Button 
                fullWidth 
                variant="contained" 
                size="large" 
                type="submit"
                startIcon={loginMutation.isPending ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                disabled={loginMutation.isPending}
                sx={{ 
                  py: 1.8, 
                  fontWeight: 700, 
                  bgcolor: 'primary.main',
                  borderRadius: 2,
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.9) }
                }}
              >
                {loginMutation.isPending ? 'Entrando...' : 'Entrar no Sistema'}
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
                <MuiLink component={Link} href="/register" sx={{ color: 'secondary.main', fontWeight: 700, textDecoration: 'none' }}>
                  Cadastre-se agora
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
