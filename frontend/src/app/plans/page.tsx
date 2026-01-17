'use client';

import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
  Chip
} from '@mui/material';
import { Check as CheckIcon, ShoppingCart as CartIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { paymentsService } from '@/lib/payments.service';
import { useAppSelector } from '@/store/hooks';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const MotionCard = motion(Card);

const plans = [
  {
    id: 'essencial_monthly',
    name: 'Essencial',
    price: 299,
    description: 'Ideal para MEIs e pequenos empreendedores que buscam organização.',
    features: [
      'Contabilidade Digital',
      'Emissão de Guias de Impostos',
      'Folha de Pagamento (até 1 func.)',
      'Suporte via Chat',
      'Relatórios Básicos Mensais'
    ],
    recommended: false,
  },
  {
    id: 'pro_monthly',
    name: 'Pro',
    price: 599,
    description: 'Para empresas em crescimento que precisam de análise consultiva.',
    features: [
      'Tudo do Essencial',
      'Contabilidade Consultiva',
      'Planejamento Tributário Anual',
      'Folha de Pagamento (até 10 func.)',
      'BPO Financeiro Básico',
      'Suporte Prioritário'
    ],
    recommended: true,
  },
  {
    id: 'premium_monthly',
    name: 'Premium',
    price: 1299,
    description: 'Gestão completa e estratégica para médias empresas.',
    features: [
      'Tudo do Pro',
      'BPO Financeiro Completo',
      'Dashboards em Tempo Real',
      'Consultoria Econômica Mensal',
      'Auditoria de Processos',
      'Gerente de Conta Exclusivo'
    ],
    recommended: false,
  },
];

export default function PlansPage() {
  const theme = useTheme();
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const checkoutMutation = useMutation({
    mutationFn: paymentsService.createPreference,
    onSuccess: (data) => {
      window.location.href = data.init_point;
    },
    onError: (error) => {
      console.error('Checkout error:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    }
  });

  const handleSubscribe = (plan: any) => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/plans');
      return;
    }

    if (!user?.companyId) {
      alert('Você precisa estar vinculado a uma empresa para assinar um plano.');
      return;
    }

    checkoutMutation.mutate({
      companyId: user.companyId,
      documentNumber: `PLAN_${plan.id}_${Date.now()}`,
      amount: plan.price,
      description: `Assinatura Plano ${plan.name} - +Contábil`,
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 2, textAlign: 'center' }}>
            Planos e <span style={{ color: theme.palette.secondary.main }}>Preços</span>
          </Typography>
          <Typography variant="h5" sx={{ textAlign: 'center', opacity: 0.8, maxWidth: 800, mx: 'auto', fontWeight: 400 }}>
            Escolha a solução que melhor se adapta ao momento do seu negócio. Transparência total e sem taxas ocultas.
          </Typography>
        </Container>
      </Box>

      {/* Pricing Grid */}
      <Container maxWidth="lg" sx={{ mt: -5 }}>
        <Grid container spacing={4} alignItems="flex-end">
          {plans.map((plan, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                sx={{ 
                  borderRadius: 4,
                  border: plan.recommended ? `2px solid ${theme.palette.secondary.main}` : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  position: 'relative',
                  overflow: 'visible',
                  bgcolor: plan.recommended ? 'white' : 'background.paper',
                  boxShadow: plan.recommended ? theme.shadows[20] : theme.shadows[1]
                }}
              >
                {plan.recommended && (
                  <Chip 
                    label="MAIS POPULAR" 
                    color="secondary" 
                    sx={{ 
                      position: 'absolute', 
                      top: -16, 
                      left: '50%', 
                      transform: 'translateX(-50%)',
                      fontWeight: 700,
                      px: 2
                    }} 
                  />
                )}
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                    {plan.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, height: 40 }}>
                    {plan.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 4 }}>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      R$ {plan.price}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ ml: 1 }}>
                      /mês
                    </Typography>
                  </Box>
                  <List sx={{ mb: 4 }}>
                    {plan.features.map((feature, fIndex) => (
                      <ListItem key={fIndex} disableGutters sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32, color: 'secondary.main' }}>
                          <CheckIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={feature} primaryTypographyProps={{ variant: 'body2' }} />
                      </ListItem>
                    ))}
                  </List>
                  <Button 
                    fullWidth 
                    variant={plan.recommended ? 'contained' : 'outlined'}
                    size="large"
                    onClick={() => handleSubscribe(plan)}
                    loading={checkoutMutation.isPending}
                    sx={{ 
                      mt: 4, 
                      py: 1.5,
                      borderRadius: 3,
                      fontWeight: 800,
                      fontSize: '1rem',
                      textTransform: 'none',
                      bgcolor: plan.recommended ? 'secondary.main' : 'transparent',
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      ...(plan.recommended && {
                        boxShadow: `0 8px 20px -6px ${alpha(theme.palette.primary.main, 0.5)}`,
                      }),
                      '&:hover': {
                        bgcolor: plan.recommended ? '#B8962F' : alpha(theme.palette.primary.main, 0.05),
                        borderColor: 'primary.main'
                      }
                    }}
                  >
                    {plan.recommended ? 'Assinar Agora' : 'Começar Agora'}
                  </Button>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
