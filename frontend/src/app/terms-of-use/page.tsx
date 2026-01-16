'use client';

import { Box, Container, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

export default function TermsOfUse() {
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
          <Typography color="text.primary">Termos de Uso</Typography>
        </Breadcrumbs>

        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800, mb: 4 }}>
          Termos de Uso
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
              1. Aceitação dos Termos
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Ao acessar e usar o site e os serviços da +Contábil, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve utilizar nossos serviços.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
              2. Descrição dos Serviços
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              A +Contábil oferece serviços de contabilidade digital, consultoria financeira e gestão tributária através de sua plataforma online e atendimento personalizado.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
              3. Responsabilidades do Usuário
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              O usuário é responsável por fornecer informações precisas e completas necessárias para a prestação dos serviços contábeis. A veracidade dos documentos e dados informados é de inteira responsabilidade do cliente.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
              4. Propriedade Intelectual
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Todo o conteúdo presente neste site, incluindo textos, gráficos, logotipos, ícones e software, é de propriedade da +Contábil ou de seus fornecedores de conteúdo e está protegido pelas leis de direitos autorais.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
              5. Limitação de Responsabilidade
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              A +Contábil não será responsável por quaisquer danos diretos, indiretos, incidentais ou consequentes resultantes do uso ou da incapacidade de usar nossos serviços, ou por qualquer erro decorrente de informações incorretas fornecidas pelo usuário.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
              6. Alterações nos Termos
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. Alterações entrarão em vigor imediatamente após sua publicação no site. O uso continuado dos serviços após tais alterações constitui sua aceitação dos novos termos.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
              7. Lei Aplicável
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa decorrente destes termos será resolvida no foro da comarca de São Paulo/SP.
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
