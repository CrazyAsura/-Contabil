'use client';

import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  IconButton,
  alpha,
  useTheme,
  CircularProgress
} from '@mui/material';
import { 
  Add as AddIcon, 
  Visibility as ViewIcon, 
  Download as DownloadIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { invoicesService } from '@/lib/invoices.service';

export default function InvoicesPage() {
  const theme = useTheme();

  const { data: invoices, isLoading, error } = useQuery({
    queryKey: ['invoices'],
    queryFn: invoicesService.getAll
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'success';
      case 'PENDING': return 'warning';
      case 'CANCELLED': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PAID': return 'Pago';
      case 'PENDING': return 'Pendente';
      case 'CANCELLED': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Notas Fiscais
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gerencie e emita suas notas fiscais eletrônicas.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2, px: 3, py: 1, fontWeight: 700 }}
        >
          Nova Nota Fiscal
        </Button>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ py: 4 }}>
          <Typography color="error">Erro ao carregar notas fiscais.</Typography>
        </Box>
      ) : (
        <TableContainer 
          component={Paper} 
          elevation={0} 
          sx={{ 
            borderRadius: 4, 
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            overflow: 'hidden'
          }}
        >
          <Table>
            <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Número</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Empresa</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Data de Emissão</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Valor</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices && invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <TableRow key={invoice._id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', display: 'flex' }}>
                          <ReceiptIcon fontSize="small" />
                        </Box>
                        <Typography variant="body2" fontWeight={600}>
                          {invoice.invoiceNumber}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{invoice.companyId?.name || 'N/A'}</TableCell>
                    <TableCell>{new Date(invoice.issueDate).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={700}>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: invoice.currency }).format(invoice.amount)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusLabel(invoice.status)} 
                        color={getStatusColor(invoice.status) as any}
                        size="small"
                        sx={{ fontWeight: 700, borderRadius: 1.5 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" sx={{ color: 'text.secondary' }}>
                        <ViewIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: 'text.secondary' }}>
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">Nenhuma nota fiscal encontrada.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}