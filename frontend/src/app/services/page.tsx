'use client';

import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Stack,
  useTheme,
  alpha
} from '@mui/material';
import { 
  Assessment as AuditIcon, 
  AccountBalance as TaxIcon, 
  Insights as ConsultingIcon, 
  BusinessCenter as BPOIcon,
  PointOfSale as PayrollIcon,
  QueryStats as StrategyIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const services = [
  {
    title: 'Contabilidade Consultiva',
    description: 'Transformamos números em decisões estratégicas. Relatórios mensais detalhados para guiar o crescimento do seu negócio.',
    icon: <AuditIcon fontSize="large" />,
  },
  {
    title: 'Planejamento Tributário',
    description: 'Análise profunda para reduzir sua carga tributária legalmente, recuperando créditos e otimizando impostos.',
    icon: <TaxIcon fontSize="large" />,
  },
  {
    title: 'BPO Financeiro',
    description: 'Terceirize sua gestão financeira conosco. Contas a pagar, receber e fluxo de caixa monitorados por especialistas.',
    icon: <BPOIcon fontSize="large" />,
  },
  {
    title: 'Gestão de Folha de Pagamento',
    description: 'Conformidade total com o eSocial e legislações trabalhistas. Processamento ágil e seguro para sua equipe.',
    icon: <PayrollIcon fontSize="large" />,
  },
  {
    title: 'Consultoria Econômica',
    description: 'Análise de viabilidade, valuation e estruturação financeira para captação de recursos ou venda de empresas.',
    icon: <StrategyIcon fontSize="large" />,
  },
  {
    title: 'Abertura e Legalização',
    description: 'Processos ágeis para abrir sua empresa ou regularizar sua situação perante todos os órgãos públicos.',
    icon: <ConsultingIcon fontSize="large" />,
  },
];

export default function ServicesPage() {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 2, textAlign: 'center' }}>
            Nossos <span style={{ color: theme.palette.secondary.main }}>Serviços</span>
          </Typography>
          <Typography variant="h5" sx={{ textAlign: 'center', opacity: 0.8, maxWidth: 800, mx: 'auto', fontWeight: 400 }}>
            Soluções completas em contabilidade e economia, desenhadas para a máxima performance do seu capital.
          </Typography>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: theme.shadows[10] }}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 4,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: 'all 0.3s ease'
                }}
              >
                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <Box sx={{ 
                    color: 'secondary.main', 
                    mb: 3, 
                    display: 'flex', 
                    justifyContent: 'center',
                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    width: 64,
                    height: 64,
                    borderRadius: '16px',
                    alignItems: 'center'
                  }}>
                    {service.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Trust Section */}
      <Box sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.05), py: 10 }}>
        <Container maxWidth="md">
          <Stack spacing={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Por que escolher a <span style={{ color: theme.palette.primary.main }}>+Contábil</span>?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
              Combinamos a precisão da contabilidade tradicional com a agilidade da tecnologia moderna. Nosso compromisso é com o seu resultado final, garantindo que cada centavo seja otimizado.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
