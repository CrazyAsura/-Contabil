import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'O cargo/role é obrigatório' })
  @IsString()
  role: string;

  @IsNotEmpty({ message: 'O setor é obrigatório' })
  @IsEnum(['Administrativo', 'Contábil', 'Suporte', 'Copywrite/Design', 'Cliente'], {
    message: 'Setor inválido',
  })
  sector: string;

  @IsNotEmpty({ message: 'A empresa é obrigatória' })
  @IsString()
  companyId: string;
}
