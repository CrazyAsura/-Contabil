import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({timestamps: true})
export class User extends Document{
    @Prop({required: true})
    name: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    role: string;

    @Prop({required: true, enum: ['Administrativo', 'Contábil', 'Suporte', 'Copywrite/Design', 'Cliente'], default: 'Cliente'})
    sector: string;

    @Prop({ type: Types.ObjectId, ref: 'Company' ,required: false})
    companyId?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Address' })
    addressId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Phone' })
    phoneId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);