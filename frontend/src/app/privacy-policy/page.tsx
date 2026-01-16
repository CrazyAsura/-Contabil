'use client';

import { Box, Container, Typography, Breadcrumbs, Link as MuiLink, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import { NavigateNext as NavigateNextIcon, Circle as CircleIcon } from '@mui/icons-material';

export default function PrivacyPolicy() {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 4 }}
        >
          <MuiLink component={Link} underline="hover" color="inherit" href="/">
            Início
          </MuiLink>
          <Typography color="text.primary">Política de Privacidade</Typography>
        </Breadcrumbs>

        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800, mb: 4 }}>
          Política de Privacidade
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
              1. Introdução
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              A +Contábil valoriza a sua privacidade. Esta Política de Privacidade descreve como coletamos, usamos, protegemos e compartilhamos suas informações pessoais ao utilizar nossos serviços e nosso site.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
              2. Coleta de Dados
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Coletamos informações que você nos fornece diretamente, como nome, e-mail, telefone e dados da sua empresa ao solicitar um orçamento ou entrar em contato conosco.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
              3. Uso das Informações
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
              Utilizamos seus dados para:
            </Typography>
            <List sx={{ ml: 2 }}>
              {[
                'Prestar nossos serviços de contabilidade e consultoria;',
                'Enviar comunicações importantes sobre sua conta ou alterações em nossos termos;',
                'Melhorar continuamente nossa plataforma e experiência do usuário;',
                'Cumprir obrigações legais e regulatórias.'
              ].map((text, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 28, color: 'secondary.main' }}>
                    <CircleIcon sx={{ fontSize: 8 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={text} 
                    primaryTypographyProps={{ variant: 'body1', color: 'text.secondary', sx: { lineHeight: 1.7 } }} 
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
              4. Segurança dos Dados
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou alteração. Utilizamos criptografia e protocolos de segurança de padrão bancário.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
              5. Compartilhamento de Informações
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Não vendemos seus dados pessoais a terceiros. Podemos compartilhar informações com parceiros de confiança que nos auxiliam na operação do negócio, desde que concordem em manter a confidencialidade.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
              6. Seus Direitos
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Você tem o direito de acessar, corrigir ou solicitar a exclusão de seus dados pessoais a qualquer momento, conforme garantido pela Lei Geral de Proteção de Dados (LGPD).
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
              7. Contato
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Se tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através do e-mail: contato@maiscontabil.com.br
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mt: 4, fontStyle: 'italic', color: 'text.disabled' }}>
            Última atualização: 15 de Janeiro de 2026.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
