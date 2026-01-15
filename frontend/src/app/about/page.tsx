'use client';

import { Container, Typography } from '@mui/material';

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Quem Somos (About Us)
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Conheça nossa história e nossa missão.
      </Typography>
    </Container>
  );
}
