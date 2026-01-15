'use client';

import { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Paper } from '@mui/material';

export default function Home() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    fetch(apiUrl)
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 4 }}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 700, color: 'primary.main' }}>
          Bem-vindo ao Projeto <span style={{ color: '#D4AF37' }}>+Contábil</span>
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: 'background.paper', width: '100%', maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            Status do Backend
          </Typography>
          
          {message ? (
            <Typography variant="body1" sx={{ color: 'secondary.main', fontWeight: 600 }}>
              {message}
            </Typography>
          ) : error ? (
            <Typography variant="body1" color="error">
              Erro ao conectar ao backend: {error}
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress size={24} color="secondary" />
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
