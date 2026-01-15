'use client';

import { Container, Typography } from '@mui/material';

export default function ContactPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Contato (Contact)
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Entre em contato conosco.
      </Typography>
    </Container>
  );
}
