'use client';

import { 
  Box, 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  useTheme,
  alpha
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'O que é contabilidade consultiva?',
    answer: 'Diferente da contabilidade tradicional que foca apenas em obrigações fiscais, a consultiva utiliza os dados contábeis para analisar a saúde financeira da empresa e sugerir melhorias estratégicas para o crescimento do negócio.',
  },
  {
    question: 'Como funciona a transição para a +Contábil?',
    answer: 'O processo é simples e totalmente digital. Nós cuidamos de toda a migração dos dados do seu contador anterior, garantindo que não haja interrupção nos seus serviços ou prazos fiscais.',
  },
  {
    question: 'Vocês atendem quais tipos de empresas?',
    answer: 'Atendemos desde MEIs e Profissionais Liberais até Médias Empresas (Simples Nacional, Lucro Presumido e Lucro Real) em diversos setores como tecnologia, serviços, comércio e saúde.',
  },
  {
    question: 'O suporte é humanizado ou via bot?',
    answer: 'Apesar de usarmos tecnologia para agilizar processos, nosso suporte é 100% humanizado. Você terá um gerente de conta e especialistas prontos para tirar suas dúvidas via WhatsApp, chat ou reuniões por vídeo.',
  },
  {
    question: 'Como a IA ajuda na redução de custos?',
    answer: 'Nossa plataforma analisa seus padrões de gastos e identifica automaticamente duplicidades, taxas bancárias abusivas e oportunidades de enquadramento tributário mais econômico.',
  },
  {
    question: 'É seguro enviar meus dados financeiros?',
    answer: 'Sim. Utilizamos criptografia de nível bancário e seguimos rigorosamente a LGPD. Seus dados são armazenados em servidores seguros com backups diários.',
  },
];

export default function FaqPage() {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 2, textAlign: 'center' }}>
            Perguntas <span style={{ color: theme.palette.secondary.main }}>Frequentes</span>
          </Typography>
          <Typography variant="h5" sx={{ textAlign: 'center', opacity: 0.8, maxWidth: 800, mx: 'auto', fontWeight: 400 }}>
            Tire suas dúvidas sobre nossos serviços, tecnologia e processos de migração.
          </Typography>
        </Container>
      </Box>

      {/* Accordion Section */}
      <Container maxWidth="md" sx={{ mt: 8 }}>
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Accordion 
              sx={{ 
                mb: 2, 
                borderRadius: '16px !important',
                '&:before': { display: 'none' },
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                overflow: 'hidden'
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="secondary" />}
                sx={{ 
                  px: 4, 
                  py: 1,
                  '&.Mui-expanded': { bgcolor: alpha(theme.palette.secondary.main, 0.05) }
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 4, pb: 3, pt: 1 }}>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </motion.div>
        ))}
      </Container>
    </Box>
  );
}
