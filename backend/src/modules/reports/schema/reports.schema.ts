import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'reports' })
export class Report extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, enum: ['INVOICE_SUMMARY', 'EXPENSE_ANALYSIS', 'TAX_REPORT', 'FINANCIAL_OVERVIEW'] })
  type: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId;

  @Prop({ type: Object })
  parameters: any;

  @Prop({ type: Object })
  data: any;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  generatedBy: Types.ObjectId;
}

export const ReportSchema = SchemaFactory.createForClass(Report);