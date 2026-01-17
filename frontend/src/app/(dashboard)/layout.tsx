'use client';

import { ReactNode, useState, useEffect } from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Button,
  Divider, 
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  Description as InvoicesIcon,
  Receipt as ExpensesIcon,
  Assessment as ReportsIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Psychology as PsychologyIcon
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import Link from 'next/link';

const drawerWidth = 280;

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', roles: ['SUPER_ADMIN', 'EMPLOYEE', 'USER'] },
    { text: 'Analytics IA', icon: <PsychologyIcon />, path: '/analytics', roles: ['SUPER_ADMIN', 'EMPLOYEE', 'USER'], minPlan: 'Pro' },
    { text: 'Empresas', icon: <BusinessIcon />, path: '/companies', roles: ['SUPER_ADMIN'] },
    { text: 'Usuários', icon: <PeopleIcon />, path: '/users', roles: ['SUPER_ADMIN', 'EMPLOYEE'] },
    { text: 'Funcionários', icon: <PeopleIcon />, path: '/employees', roles: ['USER'] }, // Employees of the company
    { text: 'Notas Fiscais', icon: <InvoicesIcon />, path: '/invoices', roles: ['SUPER_ADMIN', 'EMPLOYEE', 'USER'] },
    { text: 'Despesas', icon: <ExpensesIcon />, path: '/expenses', roles: ['SUPER_ADMIN', 'EMPLOYEE', 'USER'] },
    { text: 'Relatórios', icon: <ReportsIcon />, path: '/reports', roles: ['SUPER_ADMIN', 'EMPLOYEE', 'USER'], minPlan: 'Essencial' },
  ];

  const filteredMenuItems = menuItems.filter(item => {
    // Check role
    const hasRole = item.roles.includes(user?.role || '');
    
    // If it's a USER, also check plan
    if (hasRole && user?.role === 'USER' && item.minPlan) {
      const planOrder = ['Essencial', 'Pro', 'Premium'];
      const userPlanIndex = planOrder.indexOf(user?.plan || 'Essencial');
      const itemPlanIndex = planOrder.indexOf(item.minPlan);
      return userPlanIndex >= itemPlanIndex;
    }
    
    return hasRole;
  });

  const canUpgrade = user?.role === 'USER' && user?.plan !== 'Premium';

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Check if current path is allowed
    const currentMenuItem = menuItems.find(item => item.path === pathname);
    if (currentMenuItem) {
      const hasRole = currentMenuItem.roles.includes(user?.role || '');
      let hasPlan = true;
      
      if (user?.role === 'USER' && currentMenuItem.minPlan) {
        const planOrder = ['Essencial', 'Pro', 'Premium'];
        const userPlanIndex = planOrder.indexOf(user?.plan || 'Essencial');
        const itemPlanIndex = planOrder.indexOf(currentMenuItem.minPlan);
        hasPlan = userPlanIndex >= itemPlanIndex;
      }

      if (!hasRole || !hasPlan) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, user, pathname, router]);

  if (!isAuthenticated) return null;

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && !isMobile && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ marginRight: 2 }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
              {menuItems.find(item => item.path === pathname)?.text || 'Dashboard'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <Tooltip title="Configurações">
              <IconButton color="inherit" component={Link} href="/settings">
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, my: 1.5 }} />
            <Box 
              onClick={handleMenuOpen}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5, 
                cursor: 'pointer',
                p: 0.5,
                borderRadius: 2,
                '&:hover': { bgcolor: alpha(theme.palette.action.hover, 0.1) }
              }}
            >
              <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  {user?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.role}
                </Typography>
              </Box>
              <Avatar 
                sx={{ 
                  width: 35, 
                  height: 35, 
                  bgcolor: 'primary.main',
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}
              >
                {user?.name?.charAt(0)}
              </Avatar>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                elevation: 0,
                sx: {
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                  mt: 1.5,
                  borderRadius: 2,
                  minWidth: 180,
                  '& .MuiMenuItem-root': {
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    mx: 1,
                  }
                },
              }}
            >
              <MenuItem onClick={handleMenuClose} component={Link} href="/profile">
                <ListItemIcon><PeopleIcon fontSize="small" /></ListItemIcon>
                Meu Perfil
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
                Configurações
              </MenuItem>
              <Divider sx={{ my: 1 }} />
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
                Sair
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={open}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: `1px solid ${theme.palette.divider}`,
            bgcolor: 'background.paper',
          },
        }}
      >
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography
            variant="h5"
            component={Link}
            href="/dashboard"
            sx={{
              fontWeight: 900,
              textDecoration: 'none',
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            +<span style={{ color: theme.palette.secondary.main }}>Contábil</span>
          </Typography>
        </Box>
        <Divider />
        <List sx={{ px: 2, py: 2 }}>
          {filteredMenuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  href={item.path}
                  sx={{
                    borderRadius: 2,
                    bgcolor: isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                    color: isActive ? 'primary.main' : 'text.secondary',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: isActive ? 'primary.main' : 'text.secondary',
                    minWidth: 40 
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontWeight: isActive ? 700 : 500,
                      variant: 'body2'
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Box sx={{ mt: 'auto', p: 2 }}>
          {canUpgrade ? (
            <Box sx={{ 
              p: 2, 
              bgcolor: alpha(theme.palette.secondary.main, 0.05), 
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`
            }}>
              <Typography variant="subtitle2" fontWeight={700} color="secondary.main">
                Melhorar Plano
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                Seu plano atual é {user?.plan}. Explore novos recursos!
              </Typography>
              <Button 
                fullWidth 
                size="small" 
                variant="contained" 
                color="secondary"
                component={Link}
                href="/plans"
                sx={{ borderRadius: 1.5, fontWeight: 700, textTransform: 'none' }}
              >
                Ver Planos
              </Button>
            </Box>
          ) : (
            <Box sx={{ 
              p: 2, 
              bgcolor: alpha(theme.palette.primary.main, 0.05), 
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
            }}>
              <Typography variant="subtitle2" fontWeight={700} color="primary.main">
                Suporte Especializado
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                Precisa de ajuda? Fale com nossa equipe agora.
              </Typography>
              <Button 
                fullWidth 
                size="small" 
                variant="contained" 
                color="primary"
                sx={{ borderRadius: 1.5, fontWeight: 700, textTransform: 'none' }}
              >
                Falar com Especialista
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          bgcolor: alpha(theme.palette.background.default, 0.5),
          mt: 8
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
