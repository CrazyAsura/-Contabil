import { IsNotEmpty, IsString, IsNumber, IsEnum, IsDateString, IsOptional, IsMongoId, IsUrl } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsMongoId()
  companyId: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  @IsEnum(['PENDING', 'PAID', 'CANCELLED'])
  status?: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsOptional()
  @IsUrl()
  @IsString()
  receiptUrl?: string;

  @IsOptional()
  @IsMongoId()
  recordedBy?: string;
}
