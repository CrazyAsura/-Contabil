import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './LoginAuthDto';

export class UpdateLoginAuthDto extends PartialType(LoginAuthDto) {}