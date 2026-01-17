'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Stack,
  Link as MuiLink,
  useTheme,
  alpha,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Autocomplete,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment
} from '@mui/material';
import { 
  PersonAddOutlined as RegisterIcon, 
  ChevronLeft as BackIcon,
  ChevronRight as NextIcon,
  CheckCircleOutline as SuccessIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { IMaskInput } from 'react-imask';
import axios from 'axios';
import { authService } from '@/lib/auth.service';
import { useRouter } from 'next/navigation';

// --- Mask Components (Keep outside to avoid recreation) ---

const CPFMask = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <IMaskInput
    {...props}
    mask="000.000.000-00"
    definitions={{ '#': /[1-9]/ }}
    inputRef={ref}
    onAccept={(value: any) => props.onChange({ target: { name: props.name, value } })}
    overwrite
  />
));
CPFMask.displayName = 'CPFMask';

const CNPJMask = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <IMaskInput
    {...props}
    mask="00.000.000/0000-00"
    inputRef={ref}
    onAccept={(value: any) => props.onChange({ target: { name: props.name, value } })}
    overwrite
  />
));
CNPJMask.displayName = 'CNPJMask';

const CEPMask = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <IMaskInput
    {...props}
    mask="00000-000"
    inputRef={ref}
    onAccept={(value: any) => props.onChange({ target: { name: props.name, value } })}
    overwrite
  />
));
CEPMask.displayName = 'CEPMask';

const PhoneMask = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <IMaskInput
    {...props}
    mask="00000-0000"
    inputRef={ref}
    onAccept={(value: any) => props.onChange({ target: { name: props.name, value } })}
    overwrite
  />
));
PhoneMask.displayName = 'PhoneMask';

const DDIMask = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <IMaskInput
    {...props}
    mask="+00"
    inputRef={ref}
    onAccept={(value: any) => props.onChange({ target: { name: props.name, value } })}
    overwrite
  />
));
DDIMask.displayName = 'DDIMask';

// --- Types & Constants ---

const steps = ['Dados Cadastrais', 'Endereço', 'Contato'];

interface StateIBGE {
  id: number;
  sigla: string;
  nome: string;
}

interface CityIBGE {
  id: number;
  nome: string;
}

// --- Step Components (Defined outside to prevent re-render focus loss) ---

const Step1 = React.memo(({ personType, setPersonType, formData, handleChange, showPassword, setShowPassword }: any) => (
  <Stack spacing={3}>
    <RadioGroup 
      row 
      value={personType} 
      onChange={(e) => setPersonType(e.target.value)}
      sx={{ justifyContent: 'center', mb: 1 }}
    >
      <FormControlLabel 
        value="PF" 
        control={<Radio color="secondary" />} 
        label={<Stack direction="row" alignItems="center" gap={1}><PersonIcon fontSize="small" /> Pessoa Física</Stack>} 
      />
      <FormControlLabel 
        value="PJ" 
        control={<Radio color="secondary" />} 
        label={<Stack direction="row" alignItems="center" gap={1}><BusinessIcon fontSize="small" /> Pessoa Jurídica</Stack>} 
      />
    </RadioGroup>

    <TextField
      fullWidth
      label={personType === 'PF' ? "Nome Completo" : "Razão Social"}
      name="name"
      value={formData.name}
      onChange={handleChange}
      variant="outlined"
    />

    <TextField
      fullWidth
      label={personType === 'PF' ? "CPF" : "CNPJ"}
      name="document"
      value={formData.document}
      onChange={handleChange}
      InputProps={{
        inputComponent: personType === 'PF' ? CPFMask as any : CNPJMask as any,
      }}
    />

    <TextField
      fullWidth
      label="E-mail"
      name="email"
      type="email"
      value={formData.email}
      onChange={handleChange}
    />

    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <TextField
        fullWidth
        label="Senha"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        label="Confirmar Senha"
        name="confirmPassword"
        type={showPassword ? 'text' : 'password'}
        value={formData.confirmPassword}
        onChange={handleChange}
      />
    </Stack>
  </Stack>
));
Step1.displayName = 'Step1';

const Step2 = React.memo(({ formData, setFormData, handleCEPChange, states, cities, loadingStates, loadingCities, loadingCEP, fetchCities, handleChange }: any) => (
  <Stack spacing={3}>
    <Stack direction="row" spacing={2}>
      <TextField
        fullWidth
        label="CEP"
        name="cep"
        value={formData.cep}
        onChange={handleCEPChange}
        InputProps={{
          inputComponent: CEPMask as any,
          endAdornment: loadingCEP ? <CircularProgress size={20} /> : null
        }}
      />
      <TextField
        sx={{ width: '120px' }}
        label="Número"
        name="number"
        value={formData.number}
        onChange={handleChange}
      />
    </Stack>

    <Autocomplete
      freeSolo
      options={[]}
      value={formData.street}
      onInputChange={(_, newValue) => setFormData((prev: any) => ({ ...prev, street: newValue }))}
      renderInput={(params) => <TextField {...params} label="Logradouro/Rua" />}
    />

    <Autocomplete
      freeSolo
      options={[]}
      value={formData.neighborhood}
      onInputChange={(_, newValue) => setFormData((prev: any) => ({ ...prev, neighborhood: newValue }))}
      renderInput={(params) => <TextField {...params} label="Bairro" />}
    />

    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <Autocomplete
        fullWidth
        options={states}
        getOptionLabel={(option) => typeof option === 'string' ? option : `${option.nome} (${option.sigla})`}
        value={states.find((s: any) => s.sigla === formData.state) || null}
        onChange={(_, newValue) => {
          const uf = typeof newValue === 'string' ? newValue : newValue?.sigla || '';
          setFormData((prev: any) => ({ ...prev, state: uf, city: '' }));
          if (uf) fetchCities(uf);
        }}
        loading={loadingStates}
        renderInput={(params) => (
          <TextField {...params} label="Estado" InputProps={{ ...params.InputProps, endAdornment: <>{loadingStates ? <CircularProgress size={20} /> : null}{params.InputProps.endAdornment}</> }} />
        )}
      />

      <Autocomplete
        fullWidth
        options={cities}
        getOptionLabel={(option) => typeof option === 'string' ? option : option.nome}
        value={cities.find((c: any) => c.nome === formData.city) || null}
        onChange={(_, newValue) => {
          const cityName = typeof newValue === 'string' ? newValue : newValue?.nome || '';
          setFormData((prev: any) => ({ ...prev, city: cityName }));
        }}
        loading={loadingCities}
        disabled={!formData.state}
        renderInput={(params) => (
          <TextField {...params} label="Cidade" InputProps={{ ...params.InputProps, endAdornment: <>{loadingCities ? <CircularProgress size={20} /> : null}{params.InputProps.endAdornment}</> }} />
        )}
      />
    </Stack>

    <Autocomplete
      fullWidth
      options={['Brasil', 'Portugal', 'EUA', 'Outros']}
      value={formData.country}
      onChange={(_, newValue) => setFormData((prev: any) => ({ ...prev, country: newValue || 'Brasil' }))}
      renderInput={(params) => <TextField {...params} label="País" />}
    />
  </Stack>
));
Step2.displayName = 'Step2';

const Step3 = React.memo(({ formData, handleChange, personType }: any) => {
  const theme = useTheme();
  return (
    <Stack spacing={3}>
      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 1 }}>
        Insira suas informações de contato para que nossa equipe possa falar com você.
      </Typography>

      <Stack direction="row" spacing={2}>
        <TextField
          label="DDI"
          name="ddi"
          value={formData.ddi}
          onChange={handleChange}
          sx={{ width: '100px' }}
          InputProps={{ inputComponent: DDIMask as any }}
        />
        <TextField
          label="DDD"
          name="ddd"
          value={formData.ddd}
          onChange={handleChange}
          sx={{ width: '100px' }}
          placeholder="11"
        />
        <TextField
          fullWidth
          label="Número do Telefone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          InputProps={{ inputComponent: PhoneMask as any }}
        />
      </Stack>

      <Box sx={{ p: 3, bgcolor: alpha(theme.palette.secondary.main, 0.05), borderRadius: 4, border: `1px dashed ${theme.palette.secondary.main}` }}>
        <Typography variant="subtitle2" color="secondary.main" fontWeight={700} gutterBottom>
          Resumo do Cadastro:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Tipo:</strong> {personType === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}<br />
          <strong>Nome:</strong> {formData.name || '---'}<br />
          <strong>Local:</strong> {formData.city ? `${formData.city} - ${formData.state}` : '---'}
        </Typography>
      </Box>
    </Stack>
  );
});
Step3.displayName = 'Step3';

// --- Main Page Component ---

export default function RegisterPage() {
  const theme = useTheme();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [personType, setPersonType] = useState('PF');
  const [showPassword, setShowPassword] = useState(false);
  
  // API State
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    document: '',
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    country: 'Brasil',
    ddi: '+55',
    ddd: '',
    phone: ''
  });

  // API State
  const [states, setStates] = useState<StateIBGE[]>([]);
  const [cities, setCities] = useState<CityIBGE[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingCEP, setLoadingCEP] = useState(false);

  // --- API Fetching ---

  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        setStates(response.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  const fetchCities = useCallback(async (uf: string) => {
    if (!uf) return;
    setLoadingCities(true);
    try {
      const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`);
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoadingCities(false);
    }
  }, []);

  const handleCEPChange = useCallback(async (e: any) => {
    const value = e.target.value;
    const cep = value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, cep: value }));
    
    if (cep.length === 8) {
      setLoadingCEP(true);
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.data.erro) {
          const { logradouro, bairro, localidade, uf } = response.data;
          setFormData(prev => ({
            ...prev,
            street: logradouro || prev.street,
            neighborhood: bairro || prev.neighborhood,
            city: localidade || prev.city,
            state: uf || prev.state
          }));
          if (uf) fetchCities(uf);
        }
      } catch (error) {
        console.error('Error fetching CEP:', error);
      } finally {
        setLoadingCEP(false);
      }
    }
  }, [fetchCities]);

  // --- Handlers ---

  const handleNext = useCallback(() => {
    if (activeStep === 0) {
      if (!formData.name || !formData.email || !formData.password || !formData.document) {
        setError('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem.');
        return;
      }
    }
    setError(null);
    setActiveStep((prev) => prev + 1);
  }, [activeStep, formData]);

  const handleBack = useCallback(() => {
    setError(null);
    setActiveStep((prev) => prev - 1);
  }, []);

  const handleChange = useCallback((e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  }, [error]);

  const handleRegister = async () => {
    if (!formData.ddd || !formData.phone) {
      setError('Por favor, preencha as informações de contato.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const registerData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'Cliente',
        sector: 'Cliente',
        document: formData.document.replace(/\D/g, ''),
        address: {
          zipCode: formData.cep.replace(/\D/g, ''),
          street: formData.street,
          number: formData.number,
          neighborhood: formData.neighborhood,
          city: formData.city,
          state: formData.state,
        },
        phone: {
          ddi: formData.ddi,
          ddd: formData.ddd.replace(/\D/g, ''),
          number: formData.phone.replace(/\D/g, ''),
        }
      };

      await authService.register(registerData);
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Erro ao realizar cadastro. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const currentStepContent = useMemo(() => {
    switch (activeStep) {
      case 0:
        return (
          <Step1 
            personType={personType} 
            setPersonType={setPersonType} 
            formData={formData} 
            handleChange={handleChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        );
      case 1:
        return (
          <Step2 
            formData={formData} 
            setFormData={setFormData}
            handleCEPChange={handleCEPChange}
            states={states}
            cities={cities}
            loadingStates={loadingStates}
            loadingCities={loadingCities}
            loadingCEP={loadingCEP}
            fetchCities={fetchCities}
            handleChange={handleChange}
          />
        );
      case 2:
        return <Step3 formData={formData} handleChange={handleChange} personType={personType} />;
      default:
        return null;
    }
  }, [activeStep, personType, formData, handleChange, showPassword, handleCEPChange, states, cities, loadingStates, loadingCities, loadingCEP, fetchCities]);

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        bgcolor: 'background.default',
        py: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Decorations */}
      <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, bgcolor: alpha(theme.palette.secondary.main, 0.05), borderRadius: '50%', filter: 'blur(100px)', zIndex: 0 }} />
      <Box sx={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, bgcolor: alpha(theme.palette.primary.main, 0.03), borderRadius: '50%', filter: 'blur(100px)', zIndex: 0 }} />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 3, md: 5 }, 
              borderRadius: 6, 
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: '0 25px 70px rgba(0,0,0,0.04)',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h4"
                component={Link}
                href="/"
                sx={{ fontWeight: 900, textDecoration: 'none', color: 'primary.main', display: 'inline-flex', alignItems: 'center', mb: 1.5 }}
              >
                +<span style={{ color: theme.palette.secondary.main }}>Contábil</span>
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary' }}>
                Criar Nova Conta
              </Typography>
            </Box>

            <Stepper activeStep={activeStep} sx={{ mb: 5, '& .MuiStepIcon-root.Mui-active': { color: 'secondary.main' }, '& .MuiStepIcon-root.Mui-completed': { color: 'primary.main' } }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {error && (
              <Box 
                component={motion.div} 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                sx={{ mb: 3 }}
              >
                <Alert severity="error" onClose={() => setError(null)} sx={{ borderRadius: 2 }}>
                  {error}
                </Alert>
              </Box>
            )}

            {success && (
              <Box 
                component={motion.div} 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                sx={{ mb: 3 }}
              >
                <Alert severity="success" sx={{ borderRadius: 2 }}>
                  Cadastro realizado com sucesso! Redirecionando para o login...
                </Alert>
              </Box>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStepContent}
              </motion.div>
            </AnimatePresence>

            <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
              {activeStep > 0 && (
                <Button 
                  fullWidth 
                  variant="outlined" 
                  onClick={handleBack}
                  disabled={loading || success}
                  startIcon={<BackIcon />}
                  sx={{ py: 1.5, borderRadius: 2, borderColor: alpha(theme.palette.primary.main, 0.2), color: 'text.primary' }}
                >
                  Voltar
                </Button>
              )}
              <Button 
                fullWidth 
                variant="contained" 
                onClick={activeStep === steps.length - 1 ? handleRegister : handleNext}
                disabled={loading || success}
                endIcon={loading ? <CircularProgress size={20} color="inherit" /> : (activeStep === steps.length - 1 ? <SuccessIcon /> : <NextIcon />)}
                sx={{ 
                  py: 1.5, 
                  borderRadius: 2, 
                  bgcolor: 'primary.main', 
                  fontWeight: 700,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.9) }
                }}
              >
                {loading ? 'Processando...' : (activeStep === steps.length - 1 ? 'Concluir Cadastro' : 'Próximo Passo')}
              </Button>
            </Stack>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Já possui uma conta?{' '}
                <MuiLink component={Link} href="/login" sx={{ color: 'secondary.main', fontWeight: 700, textDecoration: 'none' }}>
                  Acessar Login
                </MuiLink>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
