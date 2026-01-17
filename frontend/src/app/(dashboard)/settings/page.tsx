'use client';

import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Grid, 
  Divider, 
  Switch, 
  FormControlLabel,
  Avatar,
  IconButton,
  Alert,
  Snackbar,
  useTheme
} from '@mui/material';
import { 
  Person as PersonIcon, 
  Brightness4 as DarkModeIcon, 
  Brightness7 as LightModeIcon,
  CloudUpload as UploadIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/authSlice';
import { toggleTheme } from '@/store/slices/uiSlice';
import { authService } from '@/lib/auth.service';
import { useMutation } from '@tanstack/react-query';

export default function SettingsPage() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const themeMode = useAppSelector((state) => state.ui.themeMode);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    cpf_cnpj: user?.cpf_cnpj || '',
  });

  const [notification, setNotification] = useState<{ open: boolean, message: string, severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const updateProfileMutation = useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (data) => {
      dispatch(setUser({ ...user!, ...data }));
      setNotification({
        open: true,
        message: 'Perfil atualizado com sucesso!',
        severity: 'success'
      });
    },
    onError: (error) => {
      console.error('Update error:', error);
      setNotification({
        open: true,
        message: 'Erro ao atualizar perfil.',
        severity: 'error'
      });
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate({
      name: formData.name,
      email: formData.email,
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        Configurações
      </Typography>

      <Grid container spacing={4}>
        {/* Profile Section */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
              <Avatar 
                sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: '1.5rem' }}
              >
                {user?.name?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  {user?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.role} • {user?.plan || 'Sem plano'}
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ mb: 4 }} />

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Nome Completo"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="E-mail"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="CPF / CNPJ (Bloqueado)"
                    name="cpf_cnpj"
                    value={formData.cpf_cnpj}
                    disabled
                    helperText="O documento não pode ser alterado após o cadastro."
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<SaveIcon />}
                    loading={updateProfileMutation.isPending}
                    sx={{ borderRadius: 2, px: 4 }}
                  >
                    Salvar Alterações
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Appearance Section */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
              Aparência
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Personalize como o +Contabil aparece no seu dispositivo.
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {themeMode === 'dark' ? <DarkModeIcon color="primary" /> : <LightModeIcon color="primary" />}
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Modo Escuro
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Alternar entre tema claro e escuro.
                  </Typography>
                </Box>
              </Box>
              <Switch 
                checked={themeMode === 'dark'} 
                onChange={() => dispatch(toggleTheme())} 
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
