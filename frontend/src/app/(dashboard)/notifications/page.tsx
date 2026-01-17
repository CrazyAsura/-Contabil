'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
  Pagination,
  CircularProgress,
  Divider,
  Button,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  MarkEmailRead as ReadIcon,
  MarkEmailUnread as UnreadIcon,
  Delete as DeleteIcon,
  AdminPanelSettings as AdminIcon,
  SupportAgent as SupportIcon,
} from '@mui/icons-material';
import { notificationsService, Notification } from '@/lib/notifications.service';
import { useTheme } from '@mui/material/styles';

export default function NotificationsPage() {
  const theme = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await notificationsService.getAll({ page, limit });
      setNotifications(data.items);
      setTotal(data.total);
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [page]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationsService.markAsRead(id);
      setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
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
          <NotificationsIcon fontSize="large" color="primary" />
          Minhas Notificações
        </Typography>
      </Stack>

      <Paper elevation={0} sx={{ borderRadius: 3, border: `1px solid ${theme.palette.divider}`, overflow: 'hidden' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : notifications.length === 0 ? (
          <Box sx={{ p: 5, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Você não tem notificações no momento.
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {notifications.map((notification, index) => (
              <React.Fragment key={notification._id}>
                <ListItem
                  sx={{
                    bgcolor: notification.read ? 'transparent' : 'action.hover',
                    transition: 'background-color 0.3s',
                    '&:hover': { bgcolor: 'action.selected' },
                    py: 2,
                  }}
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      {!notification.read && (
                        <Tooltip title="Marcar como lida">
                          <IconButton onClick={() => handleMarkAsRead(notification._id)} color="primary">
                            <ReadIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {/* Usuários comuns não deveriam poder deletar notificações? 
                          O requisito diz "crud de notificações com historico", então vou deixar deletar. */}
                      <Tooltip title="Excluir">
                        <IconButton onClick={() => handleDelete(notification._id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  }
                >
                  <ListItemIcon>
                    {notification.type === 'ADMIN' ? (
                      <AdminIcon color="error" />
                    ) : (
                      <SupportIcon color="info" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="subtitle1" fontWeight={notification.read ? 'normal' : 'bold'}>
                          {notification.title}
                        </Typography>
                        <Chip
                          label={notification.type === 'ADMIN' ? 'Administração' : 'Suporte'}
                          size="small"
                          color={notification.type === 'ADMIN' ? 'error' : 'info'}
                          variant="outlined"
                        />
                      </Stack>
                    }
                    secondary={
                      <Box component="span">
                        <Typography variant="body2" color="text.primary" sx={{ my: 1 }}>
                          {notification.content}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Enviado em: {formatDate(notification.createdAt)} • Por: {notification.senderId?.name || 'Sistema'}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
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
    </Box>
  );
}
