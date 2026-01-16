'use client';

import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Stack,
  useTheme,
  alpha,
  Paper
} from '@mui/material';
import { 
  Visibility as VisionIcon, 
  Flag as MissionIcon, 
  Favorite as ValuesIcon,
  Timeline as HistoryIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

const values = [
  {
    title: 'Missão',
    desc: 'Empoderar empresas e indivíduos através de uma gestão financeira inteligente, ética e transparente.',
    icon: <MissionIcon fontSize="large" />,
  },
  {
    title: 'Visão',
    desc: 'Ser a referência nacional em contabilidade digital e consultoria econômica de alto impacto até 2030.',
    icon: <VisionIcon fontSize="large" />,
  },
  {
    title: 'Valores',
    desc: 'Integridade absoluta, inovação constante, foco no cliente e compromisso com o resultado real.',
    icon: <ValuesIcon fontSize="large" />,
  },
];

export default function AboutPage() {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 2, textAlign: 'center' }}>
            Nossa <span style={{ color: theme.palette.secondary.main }}>História</span>
          </Typography>
          <Typography variant="h5" sx={{ textAlign: 'center', opacity: 0.8, maxWidth: 800, mx: 'auto', fontWeight: 400 }}>
            Conheça o time e a filosofia por trás do Projeto +Contábil.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 4 }}>
              Redefinindo a <span style={{ color: theme.palette.secondary.main }}>Contabilidade</span>
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
              O Projeto +Contábil nasceu da necessidade de transformar a contabilidade de um mal necessário em um motor de crescimento. Percebemos que as empresas não precisavam apenas de guias pagas, mas de parceiros estratégicos que entendessem de economia e tecnologia.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
              Hoje, somos uma equipe multidisciplinar de contadores, economistas e desenvolvedores focados em um único objetivo: otimizar cada centavo do seu capital, seja ele corporativo ou pessoal.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: 'relative' }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  borderRadius: 4, 
                  bgcolor: alpha(theme.palette.secondary.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`
                }}
              >
                <Stack spacing={4}>
                  <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                    <HistoryIcon color="secondary" sx={{ fontSize: 40 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>Fundada em 2024</Typography>
                      <Typography variant="body2" color="text.secondary">Iniciamos como uma boutique de consultoria e evoluímos para um ecossistema digital.</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                    <HistoryIcon color="secondary" sx={{ fontSize: 40 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>+500 Clientes</Typography>
                      <Typography variant="body2" color="text.secondary">Empresas de todos os tamanhos confiam em nossa gestão estratégica.</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                    <HistoryIcon color="secondary" sx={{ fontSize: 40 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>R$ 10M+ Otimizados</Typography>
                      <Typography variant="body2" color="text.secondary">Valor real economizado em impostos e taxas para nossos parceiros.</Typography>
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Mission/Vision/Values Grid */}
      <Box sx={{ bgcolor: '#f9f9f9', py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {values.map((item, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <MotionPaper
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  elevation={0}
                  sx={{ 
                    p: 5, 
                    height: '100%', 
                    borderRadius: 4, 
                    textAlign: 'center',
                    border: '1px solid #eee'
                  }}
                >
                  <Box sx={{ color: 'secondary.main', mb: 3 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>{item.title}</Typography>
                  <Typography variant="body1" color="text.secondary">{item.desc}</Typography>
                </MotionPaper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
