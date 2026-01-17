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
  Delete as DeleteIcon,
  TrendingDown as ExpenseIcon
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { expensesService } from '@/lib/expenses.service';

export default function ExpensesPage() {
  const theme = useTheme();

  const { data: expenses, isLoading, error } = useQuery({
    queryKey: ['expenses'],
    queryFn: expensesService.getAll
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
            Despesas
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Controle os gastos e saídas da sua empresa.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2, px: 3, py: 1, fontWeight: 700, bgcolor: 'error.main', '&:hover': { bgcolor: 'error.dark' } }}
        >
          Nova Despesa
        </Button>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ py: 4 }}>
          <Typography color="error">Erro ao carregar despesas.</Typography>
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
            <TableHead sx={{ bgcolor: alpha(theme.palette.error.main, 0.05) }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Descrição</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Categoria</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Data</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Valor</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses && expenses.length > 0 ? (
                expenses.map((expense) => (
                  <TableRow key={expense._id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: alpha(theme.palette.error.main, 0.1), color: 'error.main', display: 'flex' }}>
                          <ExpenseIcon fontSize="small" />
                        </Box>
                        <Typography variant="body2" fontWeight={600}>
                          {expense.description}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={expense.category} size="small" variant="outlined" sx={{ borderRadius: 1.5 }} />
                    </TableCell>
                    <TableCell>{new Date(expense.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={700} color="error.main">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: expense.currency }).format(expense.amount)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusLabel(expense.status)} 
                        color={getStatusColor(expense.status) as any}
                        size="small"
                        sx={{ fontWeight: 700, borderRadius: 1.5 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" sx={{ color: 'text.secondary' }}>
                        <ViewIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: 'error.light' }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">Nenhuma despesa encontrada.</Typography>
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