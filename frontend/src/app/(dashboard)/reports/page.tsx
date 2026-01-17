'use client';

import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Card,
  CardContent,
  Stack,
  alpha,
  useTheme,
  CircularProgress,
  Divider
} from '@mui/material';
import { 
  Assessment as ReportIcon, 
  Download as DownloadIcon,
  Timeline as TimelineIcon,
  PieChart as ChartIcon,
  Description as FileIcon
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { reportsService } from '@/lib/reports.service';

export default function ReportsPage() {
  const theme = useTheme();

  const { data: reports, isLoading, error } = useQuery({
    queryKey: ['reports'],
    queryFn: reportsService.getAll
  });

  const reportTypes = [
    { title: 'Resumo de Notas', description: 'Visão geral de todas as notas emitidas.', icon: <FileIcon />, type: 'INVOICE_SUMMARY', color: theme.palette.primary.main },
    { title: 'Análise de Despesas', description: 'Detalhamento de gastos por categoria.', icon: <ChartIcon />, type: 'EXPENSE_ANALYSIS', color: theme.palette.error.main },
    { title: 'Relatório Fiscal', description: 'Cálculo de impostos e obrigações.', icon: <TimelineIcon />, type: 'TAX_REPORT', color: theme.palette.warning.main },
    { title: 'Panorama Financeiro', description: 'Fluxo de caixa e saúde financeira.', icon: <ReportIcon />, type: 'FINANCIAL_OVERVIEW', color: theme.palette.success.main },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Relatórios
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Acompanhe o desempenho da sua empresa com relatórios detalhados.
        </Typography>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
        Gerar Novo Relatório
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {reportTypes.map((report, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: 4, 
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.05)',
                  borderColor: alpha(report.color, 0.3)
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box 
                  sx={{ 
                    p: 1.5, 
                    borderRadius: 3, 
                    bgcolor: alpha(report.color, 0.1), 
                    color: report.color,
                    display: 'inline-flex',
                    mb: 2
                  }}
                >
                  {report.icon}
                </Box>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  {report.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {report.description}
                </Typography>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  size="small"
                  sx={{ borderRadius: 2, fontWeight: 700, textTransform: 'none' }}
                >
                  Gerar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
        Relatórios Recentes
      </Typography>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ py: 4 }}>
          <Typography color="error">Erro ao carregar relatórios.</Typography>
        </Box>
      ) : (
        <Stack spacing={2}>
          {reports && reports.length > 0 ? (
            reports.map((report) => (
              <Paper 
                key={report._id}
                elevation={0}
                sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.05), color: 'primary.main' }}>
                    <ReportIcon />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700}>{report.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Gerado em {new Date(report.createdAt).toLocaleString('pt-BR')} • {report.type}
                    </Typography>
                  </Box>
                </Stack>
                <Button 
                  startIcon={<DownloadIcon />} 
                  size="small" 
                  sx={{ fontWeight: 700 }}
                >
                  Download PDF
                </Button>
              </Paper>
            ))
          ) : (
            <Paper 
              elevation={0}
              sx={{ 
                p: 6, 
                borderRadius: 4, 
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                textAlign: 'center'
              }}
            >
              <Typography color="text.secondary">Nenhum relatório gerado recentemente.</Typography>
            </Paper>
          )}
        </Stack>
      )}
    </Box>
  );
}