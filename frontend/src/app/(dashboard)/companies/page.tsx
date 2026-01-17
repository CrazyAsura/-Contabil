'use client';

import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  IconButton, 
  Chip,
  alpha,
  useTheme,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { companiesService, Company, CreateCompanyDto } from '@/lib/companies.service';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CompaniesPage() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: companiesService.findAll,
  });

  const { register, handleSubmit, reset, setValue } = useForm<CreateCompanyDto>();

  const createMutation = useMutation({
    mutationFn: companiesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      handleClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateCompanyDto> }) => 
      companiesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      handleClose();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: companiesService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });

  const handleOpen = (company?: Company) => {
    if (company) {
      setEditingCompany(company);
      setValue('name', company.name);
      setValue('email', company.email);
    } else {
      setEditingCompany(null);
      reset();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCompany(null);
    reset();
  };

  const onSubmit = (data: CreateCompanyDto) => {
    if (editingCompany) {
      updateMutation.mutate({ id: editingCompany._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta empresa?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            Empresas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gerencie as empresas cadastradas no sistema.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => handleOpen()}
          sx={{ borderRadius: 2, fontWeight: 700, px: 3 }}
        >
          Nova Empresa
        </Button>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
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
            <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>E-mail</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Data de Cadastro</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies?.map((company) => (
                <TableRow key={company._id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box sx={{ p: 1, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', display: 'flex' }}>
                        <BusinessIcon fontSize="small" />
                      </Box>
                      <Typography variant="body2" fontWeight={600}>{company.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{company.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={company.isActive ? 'Ativa' : 'Inativa'} 
                      size="small"
                      color={company.isActive ? 'success' : 'default'}
                      sx={{ fontWeight: 700, borderRadius: 1.5 }}
                    />
                  </TableCell>
                  <TableCell>{new Date(company.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpen(company)} sx={{ color: 'primary.main' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(company._id)} sx={{ color: 'error.main' }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {companies?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                    <Typography variant="body2" color="text.secondary">
                      Nenhuma empresa encontrada.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 4 } }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ fontWeight: 800 }}>
            {editingCompany ? 'Editar Empresa' : 'Nova Empresa'}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {editingCompany ? 'Atualize as informações da empresa abaixo.' : 'Preencha os dados para cadastrar uma nova empresa.'}
            </Typography>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Nome da Empresa"
                {...register('name', { required: true })}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="E-mail"
                type="email"
                {...register('email', { required: true })}
                variant="outlined"
              />
              {!editingCompany && (
                <TextField
                  fullWidth
                  label="Senha Inicial"
                  type="password"
                  {...register('password', { required: true })}
                  variant="outlined"
                />
              )}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleClose} sx={{ fontWeight: 700 }}>Cancelar</Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={createMutation.isPending || updateMutation.isPending}
              sx={{ borderRadius: 2, fontWeight: 700, px: 3 }}
            >
              {editingCompany ? 'Salvar Alterações' : 'Criar Empresa'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
