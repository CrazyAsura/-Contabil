import { Injectable } from '@nestjs/common';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh-token.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshTokenSchema } from './schema/refresh-token.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectModel(RefreshTokenSchema.name)
    private refreshTokenModel: Model<RefreshTokenSchema>,
  ) {}
  async create(createRefreshTokenDto: CreateRefreshTokenDto) {
    const refreshToken = new this.refreshTokenModel(createRefreshTokenDto);
    return refreshToken.save();
  }
  async findByToken(token: string) {
    return this.refreshTokenModel.findOne({ token });
  }
  async deleteByToken(token: string) {
    return this.refreshTokenModel.deleteOne({ token });
  }
  async deleteByUserId(userId: Types.ObjectId) {
    return this.refreshTokenModel.deleteMany({ userId });
  }
}