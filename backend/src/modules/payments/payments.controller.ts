import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-preference')
  createPreference(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPreference(createPaymentDto);
  }

  @Post('webhook')
  webhook(@Body() data: any) {
    return this.paymentsService.handleWebhook(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('company/:id')
  findAllByCompany(@Param('id') id: string) {
    return this.paymentsService.findAllByCompany(id);
  }
}
