'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack,
  Chip,
  Pagination,
  CircularProgress,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { notificationsService, Notification } from '@/lib/notifications.service';
import { usersService, User } from '@/lib/users.service';
import { useAppSelector } from '@/store/hooks';
import { useTheme } from '@mui/material/styles';

export default function ManageNotificationsPage() {
  const theme = useTheme();
  const { user } = useAppSelector((state) => state.auth);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Dialog State
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    recipientId: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const params: any = { page, limit };
      // Se for suporte, o backend já filtra se passarmos o senderId? 
      // Na verdade o requisito diz: "ele só pode fazer o crud com as mensagens que ele manda"
      // No backend eu já implementei essa trava no controller/service.
      // Se for EMPLOYEE (Suporte), vamos filtrar por senderId para facilitar a vista.
      if (user?.role === 'EMPLOYEE') {
        params.senderId = user.id;
      }
      const data = await notificationsService.getAll(params);
      setNotifications(data.items);
      setTotal(data.total);
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await usersService.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchUsers();
  }, [page, user]);

  const handleOpen = (notification?: Notification) => {
    if (notification) {
      setEditingId(notification._id);
      setFormData({
        title: notification.title,
        content: notification.content,
        recipientId: notification.recipientId._id,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        content: '',
        recipientId: '',
      });
    }
    setOpen(true);
    setError(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      if (editingId) {
        await notificationsService.update(editingId, formData);
      } else {
        await notificationsService.create(formData);
      }
      fetchNotifications();
      handleClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao salvar notificação');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta notificação?')) {
      try {
        await notificationsService.delete(id);
        fetchNotifications();
      } catch (error) {
        console.error('Erro ao excluir notificação:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HistoryIcon fontSize="large" color="primary" />
          Gerenciar Notificações
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{ borderRadius: 2 }}
        >
          Nova Notificação
        </Button>
      </Stack>

      <Paper elevation={0} sx={{ borderRadius: 3, border: `1px solid ${theme.palette.divider}`, overflow: 'hidden' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'action.hover' }}>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Destinatário</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notifications.map((n) => (
                  <TableRow key={n._id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">{n.title}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {n.content}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {n.recipientId?.name}
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        {n.recipientId?.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={n.type}
                        size="small"
                        color={n.type === 'ADMIN' ? 'error' : 'info'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={n.read ? 'Lida' : 'Pendente'}
                        size="small"
                        color={n.read ? 'success' : 'warning'}
                      />
                    </TableCell>
                    <TableCell>{formatDate(n.createdAt)}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Editar">
                        <IconButton onClick={() => handleOpen(n)} color="primary" size="small">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton onClick={() => handleDelete(n._id)} color="error" size="small">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
                {notifications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      Nenhuma notificação encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {total > limit && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={Math.ceil(total / limit)}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {editingId ? 'Editar Notificação' : 'Nova Notificação'}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              {error && <Alert severity="error">{error}</Alert>}
              
              <TextField
                select
                label="Destinatário"
                fullWidth
                required
                value={formData.recipientId}
                onChange={(e) => setFormData({ ...formData, recipientId: e.target.value })}
              >
                {users.map((u) => (
                  <MenuItem key={u._id} value={u._id}>
                    {u.name} ({u.email})
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Título"
                fullWidth
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />

              <TextField
                label="Conteúdo"
                fullWidth
                required
                multiline
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              startIcon={<SendIcon />}
            >
              {submitting ? 'Salvando...' : editingId ? 'Salvar Alterações' : 'Enviar Notificação'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
