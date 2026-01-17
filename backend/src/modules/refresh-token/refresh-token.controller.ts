import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh-token.dto';
import { Types } from 'mongoose';

@Controller('refresh-token')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post()
  create(@Body() createRefreshTokenDto: CreateRefreshTokenDto) {
    return this.refreshTokenService.create(createRefreshTokenDto);
  }

  @Get(':token')
  findByToken(@Param('token') token: string) {
    return this.refreshTokenService.findByToken(token);
  }

  @Delete(':token')
  deleteByToken(@Param('token') token: string) {
    return this.refreshTokenService.deleteByToken(token);
  }

  @Delete('user/:userId')
  deleteByUserId(@Param('userId') userId: Types.ObjectId) {
    return this.refreshTokenService.deleteByUserId(userId);
  }
}
