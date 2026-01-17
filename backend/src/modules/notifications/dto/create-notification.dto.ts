import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(['ADMIN', 'SUPPORT'])
  @IsOptional()
  type?: string;

  @IsMongoId()
  @IsNotEmpty()
  recipientId: string;
}
