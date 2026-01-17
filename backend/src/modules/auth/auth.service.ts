import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';
import { CompaniesService } from '../companies/companies.service';
import { RegisterAuthDto } from './dto/RegisterAuthDto';
import { LoginAuthDto } from './dto/LoginAuthDto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private companiesService: CompaniesService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterAuthDto) {
    const userExists = await this.usersService.findByEmail(registerDto.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await argon2.hash(registerDto.password);
    const newUser = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    let plan = 'Essencial';
    if (newUser.companyId) {
      const company = await this.companiesService.findOne(newUser.companyId.toString());
      if (company) {
        plan = company.plan;
      }
    }

    const payload = { sub: newUser._id, email: newUser.email, role: newUser.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        sector: newUser.sector,
        companyId: newUser.companyId,
        cpf_cnpj: newUser.cpf_cnpj,
        plan: plan,
      },
    };
  }

  async login(loginDto: LoginAuthDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await argon2.verify(user.password, loginDto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    let plan = 'Essencial';
    if (user.companyId) {
      const company = await this.companiesService.findOne(user.companyId.toString());
      if (company) {
        plan = company.plan;
      }
    }

    const payload = { sub: user._id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        sector: user.sector,
        companyId: user.companyId,
        cpf_cnpj: user.cpf_cnpj,
        plan: plan,
      },
    };
  }

  async logout() {
    return { message: 'Logged out successfully' };
  }
}
