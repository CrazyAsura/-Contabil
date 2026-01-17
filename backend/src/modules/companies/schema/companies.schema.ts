import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Company extends Document {
    @Prop({required: true})
    name: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({default: true})
    isActive: boolean;

    @Prop({ required: true, enum: ['Essencial', 'Pro', 'Premium'], default: 'Essencial' })
    plan: string;

    @Prop({ required: true, unique: true })
    cnpj: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);