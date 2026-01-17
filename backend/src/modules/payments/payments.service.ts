import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment as PaymentSchema } from './schema/payments.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

@Injectable()
export class PaymentsService {
  private mpClient: MercadoPagoConfig;

  constructor(
    @InjectModel(PaymentSchema.name) private paymentModel: Model<PaymentSchema>,
    private configService: ConfigService,
  ) {
    this.mpClient = new MercadoPagoConfig({
      accessToken: 'APP_USR-8670849718654189-011320-57a0012f047b703da033fa42992bf172-2557709656',
    });
  }

  async processPayment(paymentData: any) {
    const payment = new Payment(this.mpClient);

    try {
      const response = await payment.create({
        body: {
          transaction_amount: paymentData.transaction_amount,
          token: paymentData.token,
          description: paymentData.description,
          installments: paymentData.installments,
          payment_method_id: paymentData.payment_method_id,
          issuer_id: paymentData.issuer_id,
          payer: {
            email: paymentData.payer.email,
            identification: {
              type: paymentData.payer.identification.type,
              number: paymentData.payer.identification.number,
            },
          },
        },
      });

      // Save payment record
      const newPayment = new this.paymentModel({
        companyId: paymentData.companyId,
        amount: paymentData.transaction_amount,
        description: paymentData.description,
        status: response.status === 'approved' ? 'PAID' : 'PENDING',
        paymentId: response.id?.toString(),
      });
      await newPayment.save();

      return response;
    } catch (error) {
      console.error('Mercado Pago Payment Error:', error);
      throw new BadRequestException('Erro ao processar pagamento');
    }
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

  async findAllByCompany(companyId: string): Promise<PaymentSchema[]> {
    return this.paymentModel.find({ companyId }).exec();
  }
}
