'use client';

import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Stack,
  Paper,
  useTheme,
  alpha
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 2, textAlign: 'center' }}>
            Fale <span style={{ color: theme.palette.secondary.main }}>Conosco</span>
          </Typography>
          <Typography variant="h5" sx={{ textAlign: 'center', opacity: 0.8, maxWidth: 800, mx: 'auto', fontWeight: 400 }}>
            Estamos prontos para entender seu desafio e propor a melhor solução financeira.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
              Canais de Atendimento
            </Typography>
            <Stack spacing={4}>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Paper sx={{ p: 2, borderRadius: 3, bgcolor: alpha(theme.palette.secondary.main, 0.1), color: 'secondary.main' }}>
                  <EmailIcon />
                </Paper>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">E-mail</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>contato@maiscontabil.com.br</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Paper sx={{ p: 2, borderRadius: 3, bgcolor: alpha(theme.palette.secondary.main, 0.1), color: 'secondary.main' }}>
                  <PhoneIcon />
                </Paper>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Telefone / WhatsApp</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>+55 (11) 99999-9999</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Paper sx={{ p: 2, borderRadius: 3, bgcolor: alpha(theme.palette.secondary.main, 0.1), color: 'secondary.main' }}>
                  <LocationIcon />
                </Paper>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Endereço</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Av. Paulista, 1000 - São Paulo/SP</Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 5, 
                borderRadius: 4, 
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: '0 10px 40px rgba(0,0,0,0.03)'
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>
                Envie uma Mensagem
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Seu Nome" variant="outlined" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Seu E-mail" variant="outlined" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth label="Empresa" variant="outlined" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth label="Assunto" variant="outlined" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth label="Como podemos ajudar?" multiline rows={4} variant="outlined" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    size="large" 
                    endIcon={<SendIcon />}
                    sx={{ 
                      py: 2, 
                      fontWeight: 700, 
                      bgcolor: 'primary.main',
                      '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.9) }
                    }}
                  >
                    Enviar Solicitação
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
