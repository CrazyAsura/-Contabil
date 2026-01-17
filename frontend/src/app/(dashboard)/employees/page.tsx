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
  Stack,
  MenuItem,
  Avatar,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Person as PersonIcon,
  Badge as BadgeIcon,
  Groups as GroupsIcon,
  AdminPanelSettings as AdminIcon,
  AccountBalance as AccountingIcon,
  SupportAgent as SupportIcon,
  Brush as DesignIcon
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersService } from '@/lib/users.service';
import { User } from '@/types/auth';
import { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAppSelector } from '@/store/hooks';

const SECTORS = [
  { value: 'Administrativo', label: 'Administrativo', icon: <AdminIcon />, color: '#1976d2' },
  { value: 'Contábil', label: 'Contábil', icon: <AccountingIcon />, color: '#2e7d32' },
  { value: 'Suporte', label: 'Suporte', icon: <SupportIcon />, color: '#ed6c02' },
  { value: 'Copywrite/Design', label: 'Copywrite/Design', icon: <DesignIcon />, color: '#9c27b0' },
];

export default function EmployeesPage() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: usersService.findAll,
  });

  // Filter users that belong to the same company and are not 'Cliente'
  const employees = useMemo(() => {
    if (!users) return [];
    return users.filter((u: any) => u.companyId === currentUser?.companyId && u.sector !== 'Cliente');
  }, [users, currentUser]);

  const stats = useMemo(() => {
    const total = employees.length;
    const bySector = SECTORS.map(sector => ({
      ...sector,
      count: employees.filter((e: any) => e.sector === sector.value).length
    }));
    return { total, bySector };
  }, [employees]);

  const { control, handleSubmit, reset, setValue } = useForm<Partial<User>>();

  const createMutation = useMutation({
    mutationFn: usersService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      handleClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      usersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      handleClose();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: usersService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleOpen = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('role', user.role);
      setValue('sector', user.sector);
    } else {
      setEditingUser(null);
      reset({
        role: '',
        sector: 'Administrativo',
        companyId: currentUser?.companyId
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
    reset();
  };

  const onSubmit = (data: any) => {
    if (editingUser) {
      updateMutation.mutate({ id: editingUser.id, data });
    } else {
      createMutation.mutate({ ...data, companyId: currentUser?.companyId });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este funcionário?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            Gestão de Funcionários
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Controle de acessos e permissões por setor.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => handleOpen()}
          sx={{ borderRadius: 2, fontWeight: 700, px: 3 }}
        >
          Novo Funcionário
        </Button>
      </Box>

      {/* Indicators */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={0} sx={{ borderRadius: 4, border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                  <GroupsIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>{stats.total}</Typography>
                  <Typography variant="body2" color="text.secondary">Total Funcionários</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        {stats.bySector.map((sector) => (
          <Grid size={{ xs: 12, sm: 6, md: 2.25 }} key={sector.value}>
            <Card elevation={0} sx={{ borderRadius: 4, border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: alpha(sector.color, 0.1), color: sector.color }}>
                    {sector.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>{sector.count}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.2 }}>
                      {sector.label}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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
              <TableCell sx={{ fontWeight: 700 }}>Funcionário</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>E-mail</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Setor</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Cargo</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee: any) => (
              <TableRow key={employee._id} hover>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', width: 32, height: 32 }}>
                      <PersonIcon fontSize="small" />
                    </Avatar>
                    <Typography variant="body2" fontWeight={600}>{employee.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={employee.sector} 
                    size="small"
                    icon={SECTORS.find(s => s.value === employee.sector)?.icon}
                    sx={{ 
                      fontWeight: 700, 
                      borderRadius: 1.5,
                      bgcolor: alpha(SECTORS.find(s => s.value === employee.sector)?.color || '#000', 0.1),
                      color: SECTORS.find(s => s.value === employee.sector)?.color,
                      '& .MuiChip-icon': { color: 'inherit' }
                    }}
                  />
                </TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => handleOpen(employee)} sx={{ color: 'primary.main' }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(employee._id)} sx={{ color: 'error.main' }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {employees.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                  <Typography variant="body2" color="text.secondary">
                    Nenhum funcionário cadastrado.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 4 } }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ fontWeight: 800 }}>
            {editingUser ? 'Editar Funcionário' : 'Novo Funcionário'}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Nome é obrigatório' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nome Completo"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{ required: 'E-mail é obrigatório', pattern: { value: /^\S+@\S+$/i, message: 'E-mail inválido' } }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="E-mail"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              {!editingUser && (
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Senha é obrigatória', minLength: { value: 6, message: 'Mínimo 6 caracteres' } }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Senha"
                      type="password"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
              <Controller
                name="sector"
                control={control}
                rules={{ required: 'Setor é obrigatório' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label="Setor / Área"
                  >
                    {SECTORS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          {option.icon}
                          <Typography variant="body2">{option.label}</Typography>
                        </Stack>
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <Controller
                name="role"
                control={control}
                rules={{ required: 'Cargo é obrigatório' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Cargo"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleClose} sx={{ fontWeight: 700 }}>Cancelar</Button>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ borderRadius: 2, fontWeight: 700, px: 4 }}
              loading={createMutation.isPending || updateMutation.isPending}
            >
              {editingUser ? 'Salvar' : 'Cadastrar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
