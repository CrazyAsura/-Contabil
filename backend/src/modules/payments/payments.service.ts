import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './schema/payments.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, Preference } from 'mercadopago';

@Injectable()
export class PaymentsService {
  private mpClient: MercadoPagoConfig;

  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    private configService: ConfigService,
  ) {
    this.mpClient = new MercadoPagoConfig({
      accessToken: 'APP_USR-8670849718654189-011320-57a0012f047b703da033fa42992bf172-2557709656',
    });
  }

  async createPreference(createPaymentDto: CreatePaymentDto) {
    const preference = new Preference(this.mpClient);

    try {
      const response = await preference.create({
        body: {
          items: [
            {
              id: createPaymentDto.documentNumber,
              title: createPaymentDto.description || 'Assinatura +Contábil',
              quantity: 1,
              unit_price: createPaymentDto.amount,
              currency_id: createPaymentDto.currency || 'BRL',
            },
          ],
          external_reference: createPaymentDto.companyId.toString(),
          notification_url: `${this.configService.get('BACKEND_URL')}/payments/webhook`,
          back_urls: {
            success: `${this.configService.get('FRONTEND_URL')}/dashboard?payment=success`,
            failure: `${this.configService.get('FRONTEND_URL')}/dashboard?payment=failure`,
            pending: `${this.configService.get('FRONTEND_URL')}/dashboard?payment=pending`,
          },
          auto_return: 'approved',
        },
      });

      // Save payment record as PENDING
      const newPayment = new this.paymentModel({
        ...createPaymentDto,
        status: 'PENDING',
      });
      await newPayment.save();

      return {
        id: response.id,
        init_point: response.init_point,
      };
    } catch (error) {
      console.error('Mercado Pago Error:', error);
      throw new BadRequestException('Erro ao criar preferência de pagamento');
    }
  }

  async handleWebhook(data: any) {
    // Basic implementation for MP webhook
    if (data.type === 'payment') {
      // In a real scenario, fetch payment details from MP and update local status
      console.log('Payment notification received:', data.data.id);
    }
    return { received: true };
  }

  async findAllByCompany(companyId: string): Promise<Payment[]> {
    return this.paymentModel.find({ companyId }).exec();
  }
}
