'use client';

import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  alpha, 
  useTheme,
  Card,
  CardContent,
  Stack,
  Button
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalanceWallet,
  Receipt,
  People,
  Business
} from '@mui/icons-material';
import { useAppSelector } from '@/store/hooks';

export default function DashboardPage() {
  const theme = useTheme();
  const { user } = useAppSelector((state) => state.auth);

  const stats = [
    { label: 'Receita Mensal', value: 'R$ 45.200,00', icon: <TrendingUp />, color: theme.palette.success.main, trend: '+12%' },
    { label: 'Despesas', value: 'R$ 12.840,00', icon: <TrendingDown />, color: theme.palette.error.main, trend: '-5%' },
    { label: 'Saldo Atual', value: 'R$ 32.360,00', icon: <AccountBalanceWallet />, color: theme.palette.primary.main, trend: '+8%' },
    { label: 'Notas Emitidas', value: '124', icon: <Receipt />, color: theme.palette.secondary.main, trend: '+15%' },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Olá, {user?.name}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Aqui está um resumo das atividades da sua empresa hoje.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: 4, 
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                  <Box 
                    sx={{ 
                      p: 1.5, 
                      borderRadius: 3, 
                      bgcolor: alpha(stat.color, 0.1), 
                      color: stat.color,
                      display: 'flex'
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontWeight: 700, 
                      color: stat.trend.startsWith('+') ? 'success.main' : 'error.main',
                      bgcolor: alpha(stat.trend.startsWith('+') ? theme.palette.success.main : theme.palette.error.main, 0.1),
                      px: 1,
                      py: 0.5,
                      borderRadius: 1
                    }}
                  >
                    {stat.trend}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" fontWeight={600}>
                  {stat.label}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              borderRadius: 4, 
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              minHeight: 400,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'background.paper'
            }}
          >
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Fluxo de Caixa (Gráfico)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gráfico será implementado aqui.
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: 4, 
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                bgcolor: 'primary.main',
                color: 'white'
              }}
            >
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Ações Rápidas
              </Typography>
              <Stack spacing={1.5} sx={{ mt: 2 }}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  color="secondary" 
                  startIcon={<Receipt />}
                  sx={{ borderRadius: 2, fontWeight: 700, textTransform: 'none', py: 1 }}
                >
                  Emitir Nova Nota
                </Button>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  sx={{ borderRadius: 2, fontWeight: 700, textTransform: 'none', py: 1, color: 'white', borderColor: alpha('#fff', 0.5) }}
                >
                  Adicionar Despesa
                </Button>
              </Stack>
            </Paper>

            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: 4, 
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
              }}
            >
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Resumo da Equipe
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                    <People />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700}>12 Usuários</Typography>
                    <Typography variant="caption" color="text.secondary">Ativos no sistema</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: alpha(theme.palette.secondary.main, 0.1), color: 'secondary.main' }}>
                    <Business />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700}>3 Empresas</Typography>
                    <Typography variant="caption" color="text.secondary">Vinculadas à sua conta</Typography>
                  </Box>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
