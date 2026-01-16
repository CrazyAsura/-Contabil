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
  AutoGraph as AutomationIcon,
  Description as DocIcon,
  Handshake as PartnerIcon,
  Speed as SpeedIcon
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
          pt: { xs: 10, md: 15 }, 
          pb: { xs: 10, md: 12 },
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
            width: 500, 
            height: 500, 
            bgcolor: 'secondary.main', 
            borderRadius: '50%', 
            filter: 'blur(120px)', 
            opacity: 0.12 
          }} 
        />
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: -50, 
            left: -50, 
            width: 300, 
            height: 300, 
            bgcolor: 'secondary.main', 
            borderRadius: '50%', 
            filter: 'blur(100px)', 
            opacity: 0.08 
          }} 
        />

        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontSize: { xs: '2.8rem', md: '4.5rem' }, 
                    fontWeight: 800, 
                    lineHeight: 1.1,
                    mb: 3,
                    letterSpacing: '-0.02em'
                  }}
                >
                  A Contabilidade que <span style={{ color: theme.palette.secondary.main }}>Impulsiona</span> seu Futuro
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 5, 
                    opacity: 0.85, 
                    fontWeight: 400, 
                    maxWidth: '600px',
                    lineHeight: 1.6
                  }}
                >
                  Unimos tecnologia de ponta e expertise humana para transformar a gestão financeira da sua empresa e da sua vida pessoal.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5}>
                  <Button 
                    component={Link} 
                    href="/plans" 
                    variant="contained" 
                    size="large"
                    sx={{ 
                      bgcolor: 'secondary.main', 
                      color: 'primary.main', 
                      fontWeight: 700,
                      px: 5,
                      py: 2,
                      fontSize: '1.1rem',
                      '&:hover': { bgcolor: '#B8962F', transform: 'translateY(-2px)' },
                      transition: 'all 0.3s'
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
                      borderColor: alpha('#fff', 0.5),
                      px: 5,
                      py: 2,
                      fontSize: '1.1rem',
                      '&:hover': { 
                        borderColor: 'white', 
                        bgcolor: alpha('#fff', 0.05),
                        transform: 'translateY(-2px)' 
                      },
                      transition: 'all 0.3s'
                    }}
                  >
                    Nossa Metodologia
                  </Button>
                </Stack>
              </MotionBox>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    bgcolor: alpha(theme.palette.common.white, 0.03),
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                    borderRadius: 6,
                    width: '100%',
                    maxWidth: 450,
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  <Stack spacing={4}>
                    {[
                      { label: 'Economia em Impostos', value: '+32%', color: theme.palette.secondary.main, icon: <GrowthIcon sx={{ fontSize: 28 }} /> },
                      { label: 'Tempo de Resposta', value: '< 2 horas', color: '#4caf50', icon: <SpeedIcon sx={{ fontSize: 28 }} /> },
                      { label: 'Satisfação dos Clientes', value: '99.8%', color: '#2196f3', icon: <PartnerIcon sx={{ fontSize: 28 }} /> }
                    ].map((stat, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Box 
                          sx={{ 
                            width: 56, 
                            height: 56, 
                            borderRadius: 3, 
                            bgcolor: alpha(stat.color, 0.15),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: stat.color
                          }}
                        >
                          {stat.icon}
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ opacity: 0.6, fontWeight: 500, mb: 0.5 }}>{stat.label}</Typography>
                          <Typography variant="h5" sx={{ fontWeight: 800 }}>{stat.value}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
                {/* Floating element */}
                <MotionBox
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    bgcolor: 'secondary.main',
                    color: 'primary.main',
                    p: 2,
                    borderRadius: 3,
                    boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)',
                    zIndex: 2,
                    fontWeight: 800
                  }}
                >
                  Top 1% BPO 2024
                </MotionBox>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Partners Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 6, borderBottom: '1px solid #eee' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="overline" 
            sx={{ 
              display: 'block', 
              textAlign: 'center', 
              mb: 4, 
              color: 'text.secondary',
              fontWeight: 700,
              letterSpacing: 2
            }}
          >
            CONFIADO POR MAIS DE 500 EMPRESAS EM TODO O BRASIL
          </Typography>
          <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ opacity: 0.5 }}>
             {/* Mock logos */}
             {['FINTECH', 'HEALTHCARE', 'RETAIL', 'LOGISTICS', 'E-COMMERCE'].map((name) => (
               <Grid key={name} size={{ xs: 6, md: 2 }}>
                 <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 900 }}>{name}</Typography>
               </Grid>
             ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, letterSpacing: '-0.02em' }}>
            Soluções Sob Medida
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', fontWeight: 400 }}>
            Entendemos que cada jornada é única. Por isso, separamos nossas especialidades para atender exatamente o que você precisa agora.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionBox
              whileHover={{ y: -12 }}
              sx={{ 
                p: 8, 
                height: '100%', 
                bgcolor: 'white', 
                borderRadius: 6, 
                border: '1px solid #f0f0f0',
                boxShadow: '0 20px 60px rgba(0,0,0,0.03)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                  boxShadow: '0 30px 80px rgba(0,0,0,0.06)'
                }
              }}
            >
              <Box 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 4
                }}
              >
                <BusinessIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>Para Empresas</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 5, fontSize: '1.1rem', lineHeight: 1.7 }}>
                Do BPO financeiro à contabilidade consultiva. Automatizamos sua rotina para que você foque no crescimento, enquanto nós cuidamos da saúde fiscal e jurídica.
              </Typography>
              <Button 
                component={Link}
                href="/services"
                endIcon={<span>→</span>}
                sx={{ 
                  fontWeight: 800, 
                  fontSize: '1rem',
                  p: 0,
                  color: 'primary.main',
                  '&:hover': { bgcolor: 'transparent', gap: 1 }
                }}
              >
                Explorar Soluções Corporativas
              </Button>
            </MotionBox>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionBox
              whileHover={{ y: -12 }}
              sx={{ 
                p: 8, 
                height: '100%', 
                bgcolor: 'primary.main', 
                color: 'white', 
                borderRadius: 6, 
                boxShadow: '0 30px 80px rgba(0,0,0,0.2)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  bgcolor: alpha(theme.palette.secondary.main, 0.2),
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 4
                }}
              >
                <PersonIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>Para Você</Typography>
              <Typography variant="body1" sx={{ mb: 5, opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.7 }}>
                Planejamento sucessório, gestão de investimentos e declaração de IR. Transformamos obrigações em estratégias de acúmulo de patrimônio.
              </Typography>
              <Button 
                component={Link}
                href="/services"
                sx={{ 
                  color: 'secondary.main', 
                  fontWeight: 800,
                  fontSize: '1rem',
                  p: 0,
                  '&:hover': { bgcolor: 'transparent', gap: 1 }
                }}
                endIcon={<span>→</span>}
              >
                Ver Gestão Patrimonial
              </Button>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.02), py: 15 }}>
        <Container maxWidth="lg">
          <Grid container spacing={10} alignItems="center">
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 4, letterSpacing: '-0.02em' }}>
                Tecnologia que <span style={{ color: theme.palette.secondary.main }}>Potencializa</span>
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 6, fontSize: '1.2rem', lineHeight: 1.8 }}>
                Nossa plataforma não é apenas um repositório de documentos. É uma central de inteligência que analisa seus dados em tempo real.
              </Typography>
              <Stack spacing={4}>
                {[
                  { title: 'IA Preditiva', desc: 'Antecipamos fluxos de caixa e sugerimos ajustes antes dos problemas acontecerem.', icon: <AutomationIcon color="secondary" /> },
                  { title: 'Segurança Bancária', desc: 'Dados criptografados com o mesmo padrão utilizado pelas maiores instituições financeiras.', icon: <SecurityIcon color="secondary" /> },
                  { title: 'Dashboard Executivo', desc: 'Acompanhe todos os seus indicadores através de uma interface limpa e intuitiva.', icon: <DocIcon color="secondary" /> }
                ].map((feature, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 3 }}>
                    <Box 
                      sx={{ 
                        width: 48, 
                        height: 48, 
                        borderRadius: 2, 
                        bgcolor: 'white', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                        flexShrink: 0
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>{feature.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{feature.desc}</Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ position: 'relative' }}>
                <MotionBox
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  sx={{ 
                    p: 4, 
                    borderRadius: 6, 
                    bgcolor: 'white', 
                    boxShadow: '0 40px 100px rgba(0,0,0,0.1)',
                    position: 'relative',
                    zIndex: 2,
                    border: '1px solid #f0f0f0'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 6, alignItems: 'center' }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>Fluxo de Caixa Consolidado</Typography>
                      <Typography variant="caption" color="text.secondary">Últimos 7 meses de performance</Typography>
                    </Box>
                    <Box sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), px: 2, py: 1, borderRadius: 2 }}>
                      <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 800 }}>+24.5% este mês</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'flex-end', gap: 2.5, px: 2 }}>
                    {[40, 65, 50, 85, 60, 95, 100].map((h, i) => (
                      <Box key={i} sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                        <MotionBox
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                          sx={{ 
                            width: '100%',
                            bgcolor: i === 6 ? 'secondary.main' : 'primary.main',
                            borderRadius: '8px 8px 4px 4px',
                            boxShadow: i === 6 ? '0 10px 20px rgba(212, 175, 55, 0.3)' : 'none'
                          }}
                        />
                        <Typography variant="caption" sx={{ fontWeight: 700, opacity: 0.4 }}>{['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'][i]}</Typography>
                      </Box>
                    ))}
                  </Box>
                </MotionBox>
                {/* Background shadow element */}
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 40, 
                    right: -30, 
                    width: '100%', 
                    height: '100%', 
                    bgcolor: 'primary.main', 
                    borderRadius: 6, 
                    zIndex: 1,
                    opacity: 0.05
                  }} 
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials (New Section) */}
      <Box sx={{ py: 15, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 800, textAlign: 'center', mb: 10, letterSpacing: '-0.02em' }}>
            O que dizem nossos <span style={{ color: theme.palette.secondary.main }}>parceiros</span>
          </Typography>
          <Grid container spacing={4}>
            {[
              { name: 'Ricardo Silva', role: 'CEO, TechFlow', content: 'A +Contábil mudou nossa percepção sobre contabilidade. Hoje temos dados reais para tomar decisões rápidas.' },
              { name: 'Ana Oliveira', role: 'Diretora Financeira, Innova', content: 'A economia tributária que conseguimos no primeiro ano pagou todo o investimento na plataforma por 5 anos.' },
              { name: 'Marcos Santos', role: 'Empreendedor Solo', content: 'Finalmente um serviço que entende as dores do pequeno empresário com a agilidade do mundo digital.' }
            ].map((testi, i) => (
              <Grid key={i} size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 5, borderRadius: 4, bgcolor: '#fcfcfc', border: '1px solid #f0f0f0', height: '100%' }}>
                  <Typography variant="h2" sx={{ color: 'secondary.main', opacity: 0.3, mb: -2 }}>"</Typography>
                  <Typography variant="body1" sx={{ mb: 4, fontStyle: 'italic', color: 'text.secondary', lineHeight: 1.7 }}>
                    {testi.content}
                  </Typography>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>{testi.name}</Typography>
                    <Typography variant="body2" color="secondary.main" sx={{ fontWeight: 700 }}>{testi.role}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          sx={{ 
            p: { xs: 6, md: 12 }, 
            bgcolor: 'primary.main', 
            color: 'white', 
            borderRadius: 10,
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center'
          }}
        >
          {/* Decorative circles */}
          <Box sx={{ position: 'absolute', top: -50, left: -50, width: 200, height: 200, bgcolor: 'secondary.main', borderRadius: '50%', opacity: 0.1 }} />
          <Box sx={{ position: 'absolute', bottom: -100, right: -50, width: 300, height: 300, bgcolor: 'secondary.main', borderRadius: '50%', opacity: 0.1 }} />

          <Typography variant="h2" sx={{ fontWeight: 800, mb: 4, position: 'relative', zIndex: 1, letterSpacing: '-0.02em' }}>
            Sua jornada para o sucesso financeiro começa aqui.
          </Typography>
          <Typography variant="h5" sx={{ mb: 6, opacity: 0.8, maxWidth: 700, mx: 'auto', fontWeight: 400, position: 'relative', zIndex: 1 }}>
            Agende uma conversa com nossos especialistas e descubra como podemos otimizar seus resultados.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ position: 'relative', zIndex: 1 }}>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                bgcolor: 'secondary.main', 
                color: 'primary.main', 
                fontWeight: 800,
                px: 6,
                py: 2.5,
                fontSize: '1.2rem',
                '&:hover': { bgcolor: '#B8962F', transform: 'scale(1.05)' },
                transition: 'all 0.3s'
              }}
            >
              Agendar Demonstração
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                fontWeight: 700,
                px: 6,
                py: 2.5,
                fontSize: '1.2rem',
                '&:hover': { bgcolor: alpha('#fff', 0.1), borderColor: 'white' }
              }}
            >
              Ver Planos
            </Button>
          </Stack>
        </MotionBox>
      </Container>
    </Box>
  );
}
