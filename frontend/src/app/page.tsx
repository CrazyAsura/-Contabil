'use client';

import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Stack,
  useTheme,
  alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  AccountBalance as BankIcon, 
  TrendingUp as GrowthIcon, 
  Business as BusinessIcon, 
  Person as PersonIcon,
  Security as SecurityIcon,
  AutoGraph as AutomationIcon
} from '@mui/icons-material';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export default function Home() {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          pt: { xs: 10, md: 20 }, 
          pb: { xs: 10, md: 15 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background Decoration */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: -100, 
            right: -100, 
            width: 400, 
            height: 400, 
            bgcolor: 'secondary.main', 
            borderRadius: '50%', 
            filter: 'blur(100px)', 
            opacity: 0.15 
          }} 
        />

        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontSize: { xs: '2.5rem', md: '4rem' }, 
                    fontWeight: 800, 
                    lineHeight: 1.2,
                    mb: 2 
                  }}
                >
                  Inteligência Financeira para <span style={{ color: theme.palette.secondary.main }}>Empresas</span> e <span style={{ color: theme.palette.secondary.main }}>Pessoas</span>
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ mb: 4, opacity: 0.9, fontWeight: 400, maxWidth: '90%' }}
                >
                  O SaaS B2B que une contabilidade de alta performance e estratégias de economia real. Simplifique sua gestão e maximize seus lucros.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button 
                    component={Link} 
                    href="/plans" 
                    variant="contained" 
                    size="large"
                    sx={{ 
                      bgcolor: 'secondary.main', 
                      color: 'primary.main', 
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      '&:hover': { bgcolor: '#B8962F' }
                    }}
                  >
                    Começar Agora
                  </Button>
                  <Button 
                    component={Link} 
                    href="/about" 
                    variant="outlined" 
                    size="large"
                    sx={{ 
                      color: 'white', 
                      borderColor: 'white',
                      px: 4,
                      py: 1.5,
                      '&:hover': { borderColor: 'secondary.main', color: 'secondary.main' }
                    }}
                  >
                    Conhecer Soluções
                  </Button>
                </Stack>
              </MotionBox>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <Paper 
                  elevation={24}
                  sx={{ 
                    p: 2, 
                    bgcolor: alpha(theme.palette.common.white, 0.05),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                    borderRadius: 4,
                    width: '100%',
                    maxWidth: 450
                  }}
                >
                  <Box sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      {[
                        { label: 'Economia Mensal', value: 'R$ 12.450', color: theme.palette.secondary.main, icon: <GrowthIcon /> },
                        { label: 'Impostos Recuperados', value: 'R$ 8.200', color: '#4caf50', icon: <BankIcon /> },
                        { label: 'Saúde Financeira', value: 'Excelente', color: '#2196f3', icon: <SecurityIcon /> }
                      ].map((stat, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                          <Box>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>{stat.label}</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Paper>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
            Soluções Dual-Core
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Atendemos as complexidades do mundo corporativo e a agilidade necessária para as finanças pessoais.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionBox
              whileHover={{ y: -10 }}
              sx={{ 
                p: 6, 
                height: '100%', 
                bgcolor: 'white', 
                borderRadius: 4, 
                border: '1px solid #eee',
                boxShadow: '0 10px 40px rgba(0,0,0,0.05)'
              }}
            >
              <BusinessIcon sx={{ fontSize: 48, color: 'primary.main', mb: 3 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Para Empresas</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                BPO financeiro, planejamento tributário avançado e contabilidade consultiva para escalar seu negócio com segurança jurídica e economia de impostos.
              </Typography>
              <Button color="primary" sx={{ fontWeight: 700 }}>Saiba mais →</Button>
            </MotionBox>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionBox
              whileHover={{ y: -10 }}
              sx={{ 
                p: 6, 
                height: '100%', 
                bgcolor: 'primary.main', 
                color: 'white', 
                borderRadius: 4, 
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
              }}
            >
              <PersonIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 3 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Para Você</Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
                Gestão de patrimônio, declaração de IR inteligente e estratégias de economia doméstica para que seu dinheiro trabalhe para você, não o contrário.
              </Typography>
              <Button sx={{ color: 'secondary.main', fontWeight: 700 }}>Saiba mais →</Button>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: '#f9f9f9', py: 15 }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
                Tecnologia que <span style={{ color: theme.palette.secondary.main }}>Pensa</span>
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
                Não somos apenas contabilidade. Somos uma plataforma de economia que utiliza IA para identificar padrões de gastos e oportunidades de redução de custos automáticas.
              </Typography>
              <Stack spacing={3}>
                {[
                  { title: 'Automação Fiscal', desc: 'Integração direta com prefeituras e receita federal.' },
                  { title: 'Relatórios Real-time', desc: 'Sua saúde financeira atualizada a cada segundo.' },
                  { title: 'Suporte Premium', desc: 'Especialistas prontos para guiar suas decisões mais críticas.' }
                ].map((feature, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ width: 8, height: 8, bgcolor: 'secondary.main', borderRadius: '50%', mt: 1.2 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{feature.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{feature.desc}</Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ position: 'relative' }}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    borderRadius: 4, 
                    bgcolor: 'white', 
                    border: '1px solid #eee',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Fluxo de Caixa</Typography>
                    <AutomationIcon color="secondary" />
                  </Box>
                  <Box sx={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 2, px: 2 }}>
                    {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                      <MotionBox
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        sx={{ 
                          flex: 1, 
                          bgcolor: i === 6 ? 'secondary.main' : 'primary.main',
                          borderRadius: '4px 4px 0 0'
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    bottom: -20, 
                    right: -20, 
                    width: '100%', 
                    height: '100%', 
                    bgcolor: 'secondary.main', 
                    borderRadius: 4, 
                    zIndex: 1,
                    opacity: 0.1
                  }} 
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 15, textAlign: 'center' }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          sx={{ 
            p: { xs: 4, md: 8 }, 
            bgcolor: 'primary.main', 
            color: 'white', 
            borderRadius: 6,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
            Pronto para transformar seus números?
          </Typography>
          <Typography variant="h6" sx={{ mb: 5, opacity: 0.8 }}>
            Junte-se a centenas de empresas que já economizaram mais de R$ 2M em impostos e taxas este ano.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              bgcolor: 'secondary.main', 
              color: 'primary.main', 
              fontWeight: 700,
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              '&:hover': { bgcolor: '#B8962F' }
            }}
          >
            Agendar Demonstração Gratuita
          </Button>
        </MotionBox>
      </Container>
    </Box>
  );
}
