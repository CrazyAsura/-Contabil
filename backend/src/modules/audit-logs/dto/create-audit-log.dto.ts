import { IsNotEmpty, IsOptional, IsString, IsObject } from 'class-validator';

export class CreateAuditLogDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  action: string;

  @IsNotEmpty()
  @IsString()
  module: string;

  @IsOptional()
  @IsObject()
  oldValue?: any;

  @IsOptional()
  @IsObject()
  newValue?: any;

  @IsOptional()
  @IsString()
  ip?: string;

  @IsOptional()
  @IsString()
  userAgent?: string;

  @IsOptional()
  @IsString()
  companyId?: string;
}
