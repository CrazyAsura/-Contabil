import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'taxes' })
export class Tax extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId;

  @Prop({ required: true })
  taxType: string; // VAT, ICMS, IPI, Corporate Tax, etc.

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, default: 'BRL' })
  currency: string;

  @Prop({ required: true })
  period: string; // Format: 'YYYY-MM' or 'YYYY-QQ'

  @Prop({ required: true, enum: ['CALCULATED', 'PAID', 'DISPUTED', 'PENDING'], default: 'PENDING' })
  status: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop()
  taxAuthority: string; // RFB, IRS, etc.

  @Prop()
  documentUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  calculatedBy: Types.ObjectId;
}

export const TaxSchema = SchemaFactory.createForClass(Tax);
