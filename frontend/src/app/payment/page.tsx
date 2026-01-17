'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  CircularProgress, 
  Alert,
  Breadcrumbs,
  Link as MuiLink,
  Divider,
  Grid
} from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';
import { paymentsService } from '@/lib/payments.service';
import { useAppSelector } from '@/store/hooks';
import Link from 'next/link';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

// Declare MercadoPago on window
declare global {
  interface Window {
    MercadoPago: any;
  }
}

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const brickContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const planId = searchParams.get('planId');
  const amount = parseFloat(searchParams.get('amount') || '0');
  const description = searchParams.get('description') || 'Assinatura +Contábil';

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/payment&' + searchParams.toString());
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onload = () => {
      initializePaymentBrick();
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script if needed, but usually fine to keep it
    };
  }, [isAuthenticated]);

  const initializePaymentBrick = async () => {
    if (!window.MercadoPago || !brickContainerRef.current) return;

    // TODO: Substituir pela sua Chave Pública (Public Key) do Mercado Pago
    const mp = new window.MercadoPago('APP_USR-77987820-2181-4235-9836-981016629739', {
      locale: 'pt-BR'
    });

    const bricksBuilder = mp.bricks();

    const renderPaymentBrick = async (bricksBuilder: any) => {
      const settings = {
        initialization: {
          amount: amount,
          payer: {
            email: user?.email,
          },
        },
        customization: {
          visual: {
            style: {
              theme: 'default',
            },
          },
          paymentMethods: {
            creditCard: 'all',
            debitCard: 'all',
            ticket: 'all',
            bankTransfer: 'all',
            atm: 'all',
            mercadoPago: 'all',
          },
        },
        callbacks: {
          onReady: () => {
            setLoading(false);
          },
          onSubmit: async ({ selectedPaymentMethod, formData }: any) => {
            setPaymentStatus('processing');
            try {
              const result = await paymentsService.processPayment({
                ...formData,
                companyId: user?.companyId,
                description: description,
              });
              
              if (result.status === 'approved') {
                setPaymentStatus('success');
                setTimeout(() => router.push('/dashboard?payment=success'), 3000);
              } else {
                setPaymentStatus('error');
                setError('O pagamento não foi aprovado. Status: ' + result.status);
              }
            } catch (err) {
              console.error('Payment error:', err);
              setPaymentStatus('error');
              setError('Erro ao processar o pagamento. Tente novamente.');
            }
          },
          onError: (error: any) => {
            console.error('Brick Error:', error);
            setError('Erro ao carregar o checkout do Mercado Pago.');
          },
        },
      };
      
      return bricksBuilder.create('payment', 'paymentBrick_container', settings);
    };

    renderPaymentBrick(bricksBuilder);
  };

  if (!isAuthenticated) return null;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        sx={{ mb: 4 }}
      >
        <MuiLink component={Link} href="/plans" color="inherit" underline="hover">
          Planos
        </MuiLink>
        <Typography color="text.primary">Pagamento</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              Finalizar Assinatura
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {paymentStatus === 'success' && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Pagamento aprovado com sucesso! Redirecionando...
              </Alert>
            )}

            {paymentStatus === 'processing' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
                <CircularProgress sx={{ mb: 2 }} />
                <Typography>Processando seu pagamento...</Typography>
              </Box>
            )}

            <div id="paymentBrick_container" ref={brickContainerRef}>
              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                  <CircularProgress />
                </Box>
              )}
            </div>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 4, bgcolor: 'background.default' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Resumo do Pedido
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Plano Selecionado</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>{description}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Pagamento processado com segurança pelo Mercado Pago.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    }>
      <PaymentContent />
    </Suspense>
  );
}
