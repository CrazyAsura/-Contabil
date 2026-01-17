import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenController } from './refresh-token.controller';
import { RefreshTokenSchema } from './schema/refresh-token.schema';

@Module({
  controllers: [RefreshTokenController],
  providers: [RefreshTokenService],
  imports: [
    MongooseModule.forFeature([
      {
        name: RefreshTokenSchema.name,
        schema: RefreshTokenSchema,
      },
    ]),
  ],
})
export class RefreshTokenModule {}
