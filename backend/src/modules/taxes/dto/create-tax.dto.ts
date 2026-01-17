import { IsNotEmpty, IsString, IsNumber, IsEnum, IsDateString, IsOptional, IsMongoId } from 'class-validator';

export class CreateTaxDto {
  @IsNotEmpty()
  @IsMongoId()
  companyId: string;

  @IsNotEmpty()
  @IsString()
  taxType: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  period: string;

  @IsOptional()
  @IsEnum(['CALCULATED', 'PAID', 'DISPUTED', 'PENDING'])
  status?: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;

  @IsOptional()
  @IsString()
  taxAuthority?: string;

  @IsOptional()
  @IsString()
  documentUrl?: string;

  @IsOptional()
  @IsMongoId()
  calculatedBy?: string;
}
