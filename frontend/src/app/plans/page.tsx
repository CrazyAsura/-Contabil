'use client';

import { Container, Typography } from '@mui/material';

export default function PlansPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Planos (Plans)
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Escolha o melhor plano para o seu negócio.
      </Typography>
    </Container>
  );
}
