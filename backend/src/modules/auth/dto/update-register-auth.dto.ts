import { PartialType } from '@nestjs/mapped-types';
import { RegisterAuthDto } from './RegisterAuthDto';

export class UpdateRegisterAuthDto extends PartialType(RegisterAuthDto) {}
