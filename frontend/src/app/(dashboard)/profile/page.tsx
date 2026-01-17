'use client';

import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Avatar, 
  Divider, 
  Stack,
  Button,
  useTheme,
  alpha,
  Chip
} from '@mui/material';
import { 
  Person as PersonIcon, 
  Email as EmailIcon, 
  Business as BusinessIcon, 
  Shield as ShieldIcon,
  CalendarMonth as CalendarIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { useAppSelector } from '@/store/hooks';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const theme = useTheme();
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  const infoItems = [
    { icon: <PersonIcon color="primary" />, label: 'Nome Completo', value: user.name },
    { icon: <EmailIcon color="primary" />, label: 'E-mail', value: user.email },
    { icon: <BusinessIcon color="primary" />, label: 'Empresa', value: user.companyName || 'Não vinculada' },
    { icon: <ShieldIcon color="primary" />, label: 'Cargo / Função', value: user.role },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              Meu Perfil
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Gerencie suas informações pessoais e configurações da conta.
            </Typography>
          </Box>
          <Button 
            variant="outlined" 
            startIcon={<EditIcon />}
            sx={{ borderRadius: 2 }}
          >
            Editar Perfil
          </Button>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper 
              sx={{ 
                p: 4, 
                textAlign: 'center', 
                borderRadius: 4,
                bgcolor: 'background.paper',
                boxShadow: `0 10px 40px ${alpha(theme.palette.common.black, 0.05)}`
              }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '3rem',
                  fontWeight: 700,
                  boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`
                }}
              >
                {user.name.charAt(0)}
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {user.email}
              </Typography>
              <Chip 
                label={user.role} 
                color="primary" 
                variant="filled" 
                size="small"
                sx={{ 
                  fontWeight: 600,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main'
                }} 
              />
              
              <Divider sx={{ my: 3 }} />
              
              <Stack spacing={2} textAlign="left">
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarIcon sx={{ fontSize: 14 }} /> Membro desde
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Janeiro de 2024
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Paper 
              sx={{ 
                p: 4, 
                borderRadius: 4,
                bgcolor: 'background.paper',
                boxShadow: `0 10px 40px ${alpha(theme.palette.common.black, 0.05)}`
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Informações Pessoais
              </Typography>
              
              <Grid container spacing={3}>
                {infoItems.map((item, index) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={index}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Box 
                        sx={{ 
                          p: 1.5, 
                          borderRadius: 2, 
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          display: 'flex'
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {item.label}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {item.value}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Segurança
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      Senha
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Última alteração há 3 meses
                    </Typography>
                  </Box>
                  <Button variant="outlined" size="small">Alterar Senha</Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      Autenticação em Duas Etapas
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Adicione uma camada extra de segurança
                    </Typography>
                  </Box>
                  <Button variant="outlined" size="small">Configurar</Button>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
}
