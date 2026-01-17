export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  sector: 'Administrativo' | 'Contábil' | 'Suporte' | 'Copywrite/Design' | 'Cliente';
  companyId?: string;
  companyName?: string;
  plan?: 'Essencial' | 'Pro' | 'Premium';
  cpf_cnpj?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginAuthDto {
  email: string;
  password: string;
}

export interface RegisterAuthDto {
  name: string;
  email: string;
  password: string;
  role: string;
  sector: string;
  companyId?: string;
  document?: string;
  address?: {
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  phone?: {
    ddi: string;
    ddd: string;
    number: string;
  };
}
