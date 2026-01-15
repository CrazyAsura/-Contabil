'use client';

import { Container, Typography, Box } from '@mui/material';

export default function ServicesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Serviços (Services)
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Nossos serviços contábeis especializados.
      </Typography>
    </Container>
  );
}
