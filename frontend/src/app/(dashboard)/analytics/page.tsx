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
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalanceWallet,
  FileDownload,
  Psychology,
  Lightbulb,
  ArrowForward,
  Info
} from '@mui/icons-material';
import { useAppSelector } from '@/store/hooks';
import { useQuery } from '@tanstack/react-query';
import { analyticsService, AnalyticsStats } from '@/lib/analytics.service';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Legend,
  LineChart,
  Line
} from 'recharts';

export default function AnalyticsPage() {
  const theme = useTheme();
  const { user } = useAppSelector((state) => state.auth);
  const companyId = user?.companyId?.toString() || '';

  const { data: stats, isLoading, error } = useQuery<AnalyticsStats>({
    queryKey: ['analytics', companyId],
    queryFn: () => analyticsService.getDashboardStats(companyId),
    enabled: !!companyId,
  });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !stats) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error">Erro ao carregar dados de analytics. Verifique se você tem permissão.</Typography>
      </Box>
    );
  }

  const kpiItems = [
    { label: 'Receita Total (12m)', value: stats.kpis.totalRevenue, icon: <TrendingUp />, color: theme.palette.success.main },
    { label: 'Despesas Totais (12m)', value: stats.kpis.totalExpenses, icon: <TrendingDown />, color: theme.palette.error.main },
    { label: 'Lucro Líquido', value: stats.kpis.netProfit, icon: <AccountBalanceWallet />, color: theme.palette.primary.main },
    { label: 'Margem de Lucro', value: `${stats.kpis.profitMargin.toFixed(1)}%`, icon: <Psychology />, color: theme.palette.secondary.main },
  ];

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} sx={{ mb: 4 }} spacing={2}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>
            Inteligência Financeira 🧠
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Análise avançada com Machine Learning e Deep Learning para sua empresa.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button 
            variant="outlined" 
            startIcon={<FileDownload />} 
            onClick={() => analyticsService.exportPdf(companyId)}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            PDF
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<FileDownload />} 
            onClick={() => analyticsService.exportExcel(companyId)}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Excel
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<FileDownload />} 
            onClick={() => analyticsService.exportCsv(companyId)}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            CSV
          </Button>
        </Stack>
      </Stack>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {kpiItems.map((kpi, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card elevation={0} sx={{ borderRadius: 4, border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, bgcolor: 'background.paper' }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: alpha(kpi.color, 0.1), color: kpi.color, display: 'flex' }}>
                    {kpi.icon}
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      {kpi.label}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {typeof kpi.value === 'number' ? formatCurrency(kpi.value) : kpi.value}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Main Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, height: 450 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={700}>Fluxo de Caixa Mensal</Typography>
              <Tooltip title="Dados baseados nos últimos 12 meses de faturamento e despesas.">
                <IconButton size="small"><Info fontSize="small" /></IconButton>
              </Tooltip>
            </Stack>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.monthlyData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.error.main} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={theme.palette.error.main} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={alpha(theme.palette.divider, 0.1)} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} tickFormatter={(val) => `R$ ${val/1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  formatter={(value: any) => [formatCurrency(Number(value)), '']}
                />
                <Legend iconType="circle" />
                <Area type="monotone" dataKey="revenue" name="Receita" stroke={theme.palette.primary.main} strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="expenses" name="Despesas" stroke={theme.palette.error.main} strokeWidth={3} fillOpacity={1} fill="url(#colorExpenses)" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* AI Predictions */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: 'primary.main', color: 'white' }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <Psychology />
                <Typography variant="h6" fontWeight={700}>Previsão IA (Próximo Mês)</Typography>
              </Stack>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
                Nossa rede neural analisou seu histórico e previu os seguintes valores para o próximo período:
              </Typography>
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>Receita Estimada</Typography>
                  <Typography variant="h5" fontWeight={800}>{formatCurrency(stats.predictions.revenue)}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>Despesa Estimada</Typography>
                  <Typography variant="h5" fontWeight={800}>{formatCurrency(stats.predictions.expenses)}</Typography>
                </Box>
                <Divider sx={{ borderColor: alpha('#fff', 0.2) }} />
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>Lucro Projetado</Typography>
                  <Typography variant="h5" fontWeight={800} sx={{ color: stats.predictions.netProfit >= 0 ? '#afffaf' : '#ffafaf' }}>
                    {formatCurrency(stats.predictions.netProfit)}
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <Lightbulb color="warning" />
                <Typography variant="h6" fontWeight={700}>Insights de Dados</Typography>
              </Stack>
              <List sx={{ p: 0 }}>
                {stats.insights.map((insight, idx) => (
                  <ListItem key={idx} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 32, color: 'primary.main' }}>
                      <ArrowForward fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={insight} 
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 500, color: 'text.primary' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Stack>
        </Grid>

        {/* Performance Chart */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, height: 400 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>Desempenho de Eficiência (Margem %)</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={alpha(theme.palette.divider, 0.1)} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} tickFormatter={(val) => `${val}%`} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey={(d) => d.revenue > 0 ? ((d.revenue - d.expenses) / d.revenue * 100).toFixed(1) : 0} 
                  name="Margem de Lucro %" 
                  stroke={theme.palette.secondary.main} 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: theme.palette.secondary.main, strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
