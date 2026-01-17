import { IsNotEmpty, IsString, IsNumber, IsEnum, IsDateString, IsOptional, IsMongoId } from 'class-validator';

export class CreateRevenueDto {
  @IsNotEmpty()
  @IsMongoId()
  companyId: string;

  @IsOptional()
  @IsMongoId()
  invoiceId?: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsOptional()
  @IsEnum(['PENDING', 'RECEIVED', 'CANCELLED'])
  status?: string;

  @IsOptional()
  @IsDateString()
  receivedAt?: string;

  @IsNotEmpty()
  @IsString()
  source: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsMongoId()
  recordedBy?: string;
}
